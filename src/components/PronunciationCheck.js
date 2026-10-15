import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const normalize = (s) =>
  s
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
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [heard, setHeard] = useState('');
  const recRef = useRef(null);

  const SR = typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

  const start = () => {
    if (!SR) {
      setStatus('unsupported');
      return;
    }
    const rec = new SR();
    rec.lang = langCode || 'pl-PL';
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    recRef.current = rec;
    setStatus('listening');
    setResult(null);

    rec.onresult = (e) => {
      const alternatives = Array.from(e.results[0]).map((a) => a.transcript);
      const best = alternatives[0] || '';
      setHeard(best);
      const r = scoreAgainst(target, best);
      setResult(r);
      setStatus('done');
      if (r.score >= 70 && onPass) onPass(r.score);
    };
    rec.onerror = (e) => {
      setStatus(e.error === 'not-allowed' ? 'denied' : 'error');
    };
    rec.onend = () => {
      setStatus((s) => (s === 'listening' ? 'error' : s));
    };
    rec.start();
  };

  const stop = () => {
    if (recRef.current) recRef.current.stop();
  };

  return (
    <View style={styles.wrap}>
      {status === 'unsupported' && (
        <Text style={styles.warn}>
          Tu navegador no permite reconocer voz. Prueba en Safari de iPhone o en Chrome.
        </Text>
      )}
      {status === 'denied' && (
        <Text style={styles.warn}>
          Permiso del micrófono denegado. Actívalo en Ajustes → Safari → Micrófono.
        </Text>
      )}
      {status === 'error' && (
        <Text style={styles.warn}>No se escuchó bien. Inténtalo otra vez.</Text>
      )}

      <TouchableOpacity
        style={[styles.micBtn, status === 'listening' && styles.micActive]}
        onPress={status === 'listening' ? stop : start}
      >
        <Ionicons name={status === 'listening' ? 'stop' : 'mic'} size={34} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.hint}>
        {status === 'listening' ? 'Escuchando… pulsa para parar' : 'Pulsa y repite la frase'}
      </Text>

      {status === 'done' && result && (
        <View style={styles.resultBox}>
          <Text style={styles.score}>{result.score}/100</Text>
          <Text style={styles.heard}>Escuché: "{heard}"</Text>
          <View style={styles.wordRow}>
            {result.matched.map((m, i) => (
              <Text key={i} style={[styles.word, m.ok ? styles.wordOk : styles.wordBad]}>
                {m.word}
              </Text>
            ))}
          </View>
          <Text style={styles.verdict}>
            {result.score >= 70 ? '¡Muy bien! Sigue así.' : 'Escucha otra vez y repite más despacio.'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 16, gap: 10 },
  micBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#0284C7', justifyContent: 'center', alignItems: 'center' },
  micActive: { backgroundColor: '#EF4444' },
  hint: { fontSize: 13, color: '#64748B' },
  warn: { fontSize: 13, color: '#B45309', textAlign: 'center' },
  resultBox: { marginTop: 10, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, alignItems: 'center', gap: 8 },
  score: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  heard: { fontSize: 13, color: '#334155' },
  wordRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  word: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 14, fontWeight: '700' },
  wordOk: { backgroundColor: '#DCFCE7', color: '#166534' },
  wordBad: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  verdict: { fontSize: 13, color: '#0F172A', fontWeight: '600' },
});
