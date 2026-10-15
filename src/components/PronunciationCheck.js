import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const normalize = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

const scoreAgainst = (target, heard) => {
  const t = normalize(target).split(' ').filter(Boolean);
  const h = normalize(heard).split(' ').filter(Boolean);
  const matched = t.map((w) => ({ word: w, ok: h.includes(w) }));
  const correct = matched.filter((m) => m.ok).length;
  const score = t.length ? Math.round((correct / t.length) * 100) : 0;
  return { score, matched };
};

export default function PronunciationCheck({ target, langCode, onPass }) {
  const [phase, setPhase] = useState('idle');
  const [message, setMessage] = useState('Pulsa el micrófono y repite la frase.');
  const [result, setResult] = useState(null);
  const [heard, setHeard] = useState('');
  const recRef = useRef(null);
  const gotResult = useRef(false);

  const listen = () => {
    const SR = typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

    if (!SR) {
      setPhase('noSupport');
      setMessage('Este navegador no tiene reconocimiento de voz. Usa la autoevaluación de abajo.');
      return;
    }

    try {
      const rec = new SR();
      rec.lang = langCode || 'pl-PL';
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      recRef.current = rec;
      gotResult.current = false;
      setPhase('listening');
      setResult(null);
      setHeard('');
      setMessage('Escuchando… repite la frase ahora.');

      rec.onresult = (e) => {
        gotResult.current = true;
        const text = (e.results[0] && e.results[0][0] && e.results[0][0].transcript) || '';
        setHeard(text);
        setResult(scoreAgainst(target, text));
        setPhase('done');
        setMessage(text ? 'Esto es lo que escuché:' : 'No escuché ninguna palabra.');
      };

      rec.onerror = (e) => {
        gotResult.current = true;
        setPhase('error');
        setMessage(
          e.error === 'not-allowed'
            ? 'Permiso del micrófono denegado. Actívalo en Ajustes → Safari → Micrófono.'
            : 'No funcionó el reconocimiento (' + e.error + '). Usa la autoevaluación.'
        );
      };

      rec.onend = () => {
        if (!gotResult.current) {
          setPhase('error');
          setMessage('No detecté voz. Pulsa el micrófono para intentarlo otra vez.');
        }
      };

      rec.start();
    } catch (err) {
      setPhase('noSupport');
      setMessage('No se pudo iniciar el micrófono. Usa la autoevaluación de abajo.');
    }
  };

  const stop = () => {
    if (recRef.current) recRef.current.stop();
  };

  const selfOk = () => {
    setPhase('done');
    setMessage('¡Muy bien! Marcada como correcta.');
    if (onPass) onPass(100);
  };

  const retry = () => {
    setPhase('idle');
    setResult(null);
    setMessage('Pulsa el micrófono y repite la frase.');
  };

  const hear = () => {
    Speech.stop();
    Speech.speak(target, { language: langCode || 'pl-PL', rate: 0.8 });
  };

  const showSelfCheck = phase === 'done' || phase === 'error' || phase === 'noSupport';

  return (
    <View style={styles.wrap}>
      <Text style={[styles.status, phase === 'error' || phase === 'noSupport' ? styles.statusWarn : null]}>
        {message}
      </Text>

      <TouchableOpacity
        style={[styles.micBtn, phase === 'listening' && styles.micActive]}
        onPress={phase === 'listening' ? stop : listen}
      >
        <Ionicons name={phase === 'listening' ? 'stop' : 'mic'} size={34} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.hearBtn} onPress={hear}>
        <Text style={styles.hearText}>🔊 Escuchar frase</Text>
      </TouchableOpacity>

      {phase === 'done' && result && (
        <View style={styles.resultBox}>
          <Text style={styles.score}>{result.score}/100</Text>
          {heard ? <Text style={styles.heard}>"{heard}"</Text> : null}
          <View style={styles.wordRow}>
            {result.matched.map((m, i) => (
              <Text key={i} style={[styles.word, m.ok ? styles.wordOk : styles.wordBad]}>{m.word}</Text>
            ))}
          </View>
        </View>
      )}

      {showSelfCheck && (
        <View style={styles.selfBox}>
          <Text style={styles.selfTitle}>¿Lo dijiste bien?</Text>
          <View style={styles.selfRow}>
            <TouchableOpacity style={[styles.selfBtn, styles.selfOk]} onPress={selfOk}>
              <Text style={styles.selfBtnText}>✅ Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selfBtn, styles.selfRetry]} onPress={retry}>
              <Text style={styles.selfBtnText}>🔁 Otra vez</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 12, gap: 12, width: '100%' },
  status: { fontSize: 14, color: '#334155', textAlign: 'center' },
  statusWarn: { color: '#B45309' },
  micBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#0284C7', justifyContent: 'center', alignItems: 'center' },
  micActive: { backgroundColor: '#EF4444' },
  hearBtn: { backgroundColor: '#E0F2FE', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  hearText: { color: '#0369A1', fontWeight: '700', fontSize: 13 },
  resultBox: { width: '100%', backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, alignItems: 'center', gap: 8 },
  score: { fontSize: 26, fontWeight: '800', color: '#0F172A' },
  heard: { fontSize: 13, color: '#334155' },
  wordRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  word: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 14, fontWeight: '700' },
  wordOk: { backgroundColor: '#DCFCE7', color: '#166534' },
  wordBad: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  selfBox: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  selfTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  selfRow: { flexDirection: 'row', gap: 10 },
  selfBtn: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12 },
  selfOk: { backgroundColor: '#DCFCE7' },
  selfRetry: { backgroundColor: '#F1F5F9' },
  selfBtnText: { fontWeight: '700', fontSize: 14, color: '#0F172A' },
});
