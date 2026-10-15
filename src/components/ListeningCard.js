import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const SPEEDS = [
  { label: '🐢 Lenta', rate: 0.5 },
  { label: '▶️ Normal', rate: 0.85 },
  { label: '⚡ Natural', rate: 1.0 },
];

export default function ListeningCard({ phrases, langCode, onFinish, onClose }) {
  const [index, setIndex] = useState(0);
  const phrase = phrases[index] ?? '';
  const isLast = index + 1 >= phrases.length;

  const play = (rate) => {
    Speech.stop();
    Speech.speak(phrase, { language: langCode, rate, pitch: 1.0 });
  };

  const goNext = () => {
    Speech.stop();
    if (isLast) {
      onFinish();
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { Speech.stop(); onClose(); }}>
          <Ionicons name="close" size={26} color="#64748B" />
        </TouchableOpacity>
        <Text style={styles.counter}>ESCUCHA {index + 1} / {phrases.length}</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.hint}>Escucha con atención y repite en voz alta.</Text>
        <Text style={styles.phrase}>{phrase}</Text>

        <View style={styles.speedRow}>
          {SPEEDS.map((s) => (
            <TouchableOpacity key={s.label} style={styles.speedBtn} onPress={() => play(s.rate)}>
              <Text style={styles.speedText}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
        <Text style={styles.nextText}>{isLast ? 'Ir a las lecciones' : 'Siguiente frase'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  counter: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 24, borderWidth: 1, borderColor: '#E2E8F0' },
  hint: { fontSize: 13, color: '#64748B', marginBottom: 12, textAlign: 'center' },
  phrase: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 24, textAlign: 'center' },
  speedRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8 },
  speedBtn: { backgroundColor: '#E0F2FE', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
  speedText: { color: '#0369A1', fontWeight: '700', fontSize: 12 },
  nextBtn: { marginTop: 24, backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  nextText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
