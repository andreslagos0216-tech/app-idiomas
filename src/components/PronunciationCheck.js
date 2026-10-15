import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const PASS = 80;
const MAX_TRIES = 3;

const clean = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

// Distancia de edición entre dos palabras (cuántas letras cambian)
const dist = (a, b) => {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[b.length];
};

// Palabras largas toleran más errores de una letra
const tolerance = (w) => (w.length >= 6 ? 2 : w.length >= 4 ? 1 : 0);

// Compara cada palabra de la frase objetivo con lo que se oyó
const analyze = (target, heard) => {
  const t = clean(target).split(' ').filter(Boolean);
  const h = clean(heard).split(' ').filter(Boolean);
  const words = t.map((w) => {
    let best = Infinity;
    h.forEach((x) => { best = Math.min(best, dist(w, x)); });
    const tol = tolerance(w);
    const status = best <= tol ? 'ok' : best <= tol + 1 ? 'close' : 'miss';
    return { word: w, status };
  });
  const points = words.reduce(
    (acc, w) => acc + (w.status === 'ok' ? 1 : w.status === 'close' ? 0.5 : 0),
    0
  );
  const score = t.length ? Math.round((points / t.length) * 100) : 0;
  return { words, score };
};

export default function PronunciationCheck({ target, langCode, onPass, onSkip }) {
  const [phase, setPhase] = useState('idle');
  const [live, setLive] = useState(null);
  const [final, setFinal] = useState(null);
  const [heard, setHeard] = useState('');
  const [tries, setTries] = useState(0);
  const [msg, setMsg] = useState('Pulsa el micrófono y repite la frase.');
  const recRef = useRef(null);
  const gotFinal = useRef(false);
  const triesRef = useRef(0);
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (phase === 'pass') {
      scale.setValue(0);
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: false }).start();
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      if (recRef.current) recRef.current.abort();
    };
  }, []);

  useEffect(() => {
    setPhase('idle');
    setLive(null);
    setFinal(null);
    setHeard('');
    setTries(0);
    triesRef.current = 0;
    setMsg('Pulsa el micrófono y repite la frase.');
  }, [target]);

  const getSR = () =>
    typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

  const decide = (res) => {
    setFinal(res);
    setLive(null);
    if (res.score >= PASS) {
      setPhase('pass');
      setMsg('¡Excelente pronunciación! 🎉');
      if (onPass) onPass(res.score);
    } else {
      triesRef.current += 1;
      setTries(triesRef.current);
      setPhase('fail');
      setMsg(
        triesRef.current >= MAX_TRIES
          ? 'Escucha el modelo despacio y vuelve a intentarlo.'
          : 'Casi. Mira las palabras en rojo y ámbar y vuelve a intentarlo.'
      );
    }
  };

  const listen = () => {
    const SR = getSR();
    if (!SR) {
      setPhase('noSupport');
      setMsg('Este navegador no tiene reconocimiento de voz. Usa los botones de abajo.');
      return;
    }
    try {
      const rec = new SR();
      rec.lang = langCode || 'pl-PL';
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 3;
      recRef.current = rec;
      gotFinal.current = false;
      setLive(null);
      setFinal(null);
      setHeard('');
      setPhase('listening');
      setMsg('Te escucho… repite la frase.');

      rec.onresult = (e) => {
        let interim = '';
        let bestFinal = null;
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) {
            Array.from(r).forEach((alt) => {
              const a = analyze(target, alt.transcript);
              if (!bestFinal || a.score > bestFinal.score) {
                bestFinal = { ...a, text: alt.transcript };
              }
            });
          } else {
            interim += r[0].transcript + ' ';
          }
        }
        if (bestFinal) {
          gotFinal.current = true;
          setHeard(bestFinal.text);
          decide(bestFinal);
        } else if (interim) {
          setLive(analyze(target, interim));
        }
      };

      rec.onerror = (e) => {
        gotFinal.current = true;
        if (e.error === 'aborted') return;
        setPhase('error');
        if (e.error === 'not-allowed') {
          setMsg('Permiso del micrófono denegado. Actívalo en Ajustes → Safari → Micrófono.');
        } else if (e.error === 'no-speech') {
          setMsg('No te escuché. Acércate al micrófono y repite.');
        } else {
          setMsg('Hubo un problema con el micrófono (' + e.error + '). Inténtalo otra vez.');
        }
      };

      rec.onend = () => {
        if (!gotFinal.current) {
          setPhase((p) => (p === 'listening' ? 'idle' : p));
          setMsg('No detecté voz. Pulsa el micrófono para intentarlo otra vez.');
        }
      };

      rec.start();
    } catch (err) {
      setPhase('noSupport');
      setMsg('No se pudo iniciar el micrófono. Usa los botones de abajo.');
    }
  };

  const stop = () => {
    if (recRef.current) recRef.current.stop();
  };

  const hearModel = (rate) => {
    Speech.stop();
    Speech.speak(target, { language: langCode || 'pl-PL', rate });
  };

  const showWords = phase === 'listening' ? live : final;
  const chipStyle = (status) =>
    status === 'ok' ? styles.wordOk : status === 'close' ? styles.wordClose : status === 'miss' ? styles.wordBad : styles.wordNeutral;

  return (
    <View style={styles.wrap}>
      <Text style={[styles.status, (phase === 'error' || phase === 'noSupport') && styles.statusWarn]}>
        {msg}
      </Text>

      {showWords && (
        <View style={styles.wordRow}>
          {showWords.words.map((w, i) => (
            <Text key={i} style={[styles.word, chipStyle(phase === 'listening' ? (w.status === 'ok' ? 'ok' : 'neutral') : w.status)]}>
              {w.word}
            </Text>
          ))}
        </View>
      )}

      {phase === 'listening' && live && (
        <Text style={styles.live}>Puntuación en vivo: {live.score}/100</Text>
      )}

      {phase === 'pass' && (
        <Animated.View style={[styles.celebrate, { transform: [{ scale }] }]}>
          <Text style={styles.celebrateEmoji}>🎉 ⭐ 🎉</Text>
          <Text style={styles.celebrateText}>{final ? final.score : 0}/100 · ¡Sigue así!</Text>
        </Animated.View>
      )}

      {phase === 'fail' && final && (
        <Text style={styles.score}>
          {final.score}/100 · Escuchaste: "{heard}"
        </Text>
      )}

      <TouchableOpacity
        style={[styles.micBtn, phase === 'listening' && styles.micActive]}
        onPress={phase === 'listening' ? stop : listen}
        disabled={phase === 'pass'}
      >
        <Ionicons name={phase === 'listening' ? 'stop' : 'mic'} size={34} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={styles.hearBtn} onPress={() => hearModel(0.85)}>
          <Text style={styles.hearText}>🔊 Escuchar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hearBtn} onPress={() => hearModel(0.5)}>
          <Text style={styles.hearText}>🐢 Lento</Text>
        </TouchableOpacity>
      </View>

      {phase === 'fail' && tries >= MAX_TRIES && onSkip && (
        <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
          <Text style={styles.skipText}>Continuar sin superarla</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 12, gap: 12, width: '100%' },
  status: { fontSize: 14, color: '#334155', textAlign: 'center' },
  statusWarn: { color: '#B45309' },
  wordRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  word: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, fontSize: 16, fontWeight: '700', overflow: 'hidden' },
  wordOk: { backgroundColor: '#DCFCE7', color: '#166534' },
  wordClose: { backgroundColor: '#FEF3C7', color: '#92400E' },
  wordBad: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  wordNeutral: { backgroundColor: '#F1F5F9', color: '#475569' },
  live: { fontSize: 13, color: '#64748B' },
  score: { fontSize: 13, color: '#334155', textAlign: 'center' },
  celebrate: { alignItems: 'center', gap: 4, paddingVertical: 8 },
  celebrateEmoji: { fontSize: 32 },
  celebrateText: { fontSize: 16, fontWeight: '800', color: '#15803D' },
  micBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#0284C7', justifyContent: 'center', alignItems: 'center' },
  micActive: { backgroundColor: '#EF4444' },
  row: { flexDirection: 'row', gap: 10 },
  hearBtn: { backgroundColor: '#E0F2FE', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
  hearText: { color: '#0369A1', fontWeight: '700', fontSize: 13 },
  skipBtn: { paddingVertical: 10, paddingHorizontal: 16 },
  skipText: { color: '#64748B', fontWeight: '600', fontSize: 13, textDecorationLine: 'underline' },
});
