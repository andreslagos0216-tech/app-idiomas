// src/components/TopicPicker.js
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Speech from 'expo-speech';
import { TOPICS } from '../data/topics';

const MAX = 5;

export default function TopicPicker({ initial = [], onDone }) {
  const [sel, setSel] = useState(initial);
  const [preview, setPreview] = useState(null);

  const toggle = (id) => {
    if (sel.includes(id)) { setSel(sel.filter((x) => x !== id)); return; }
    if (sel.length >= MAX) return;
    setSel([...sel, id]);
  };

  const hear = (text) => {
    try { Speech.stop(); Speech.speak(text, { language: 'pl-PL', rate: 0.8 }); } catch (e) {}
  };

  if (preview) {
    return (
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={{ fontSize: 44 }}>{preview.icon}</Text>
        <Text style={styles.title}>{preview.name}</Text>
        <Text style={styles.sub}>Nivel {preview.level} · {preview.subtopics.length} subtemas</Text>
        <Text style={styles.section}>Subtemas que aprenderás</Text>
        <View style={styles.chips}>
          {preview.subtopics.map((s) => (
            <View key={s} style={[styles.chip, { borderColor: preview.color }]}>
              <Text style={styles.chipTxt}>{s}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.section}>Primeras palabras</Text>
        {preview.words.map((w) => (
          <TouchableOpacity key={w.pl} style={styles.word} onPress={() => hear(w.pl)}>
            <Text style={styles.wordPl}>{w.pl}</Text>
            <Text style={styles.wordEs}>{w.es}</Text>
            <Text style={styles.wordHear}>🔊</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.section}>Frase de muestra</Text>
        <TouchableOpacity style={[styles.sample, { borderColor: preview.color }]} onPress={() => hear(preview.sample.pl)}>
          <Text style={styles.samplePl}>{preview.sample.pl}</Text>
          <Text style={styles.sampleEs}>{preview.sample.es}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setPreview(null)}>
          <Text style={styles.btnTxt}>Volver a los temas</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>¿Qué quieres aprender?</Text>
      <Text style={styles.sub}>Elige hasta {MAX} temas. Mówi empezará por tu vida real.</Text>
      <View style={styles.grid}>
        {TOPICS.map((t) => {
          const on = sel.includes(t.id);
          return (
            <View key={t.id} style={[styles.card, { borderColor: on ? t.color : '#E2E8F0', backgroundColor: on ? t.color + '18' : '#FFFFFF' }]}>
              <TouchableOpacity onPress={() => toggle(t.id)}>
                <Text style={styles.icon}>{t.icon}</Text>
                <Text style={styles.name}>{t.name}</Text>
                <Text style={styles.desc}>{t.desc}</Text>
                <Text style={[styles.level, { color: t.color }]}>Nivel {t.level}</Text>
                {on && <Text style={[styles.check, { color: t.color }]}>✓ Elegido</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.previewBtn} onPress={() => setPreview(t)}>
                <Text style={styles.previewTxt}>👀 Vista previa</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <Text style={styles.count}>{sel.length}/{MAX} elegidos</Text>
      <TouchableOpacity style={[styles.btn, sel.length === 0 && styles.btnOff]} disabled={sel.length === 0} onPress={() => onDone(sel)}>
        <Text style={styles.btnTxt}>Empezar con estos temas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 60, gap: 14 },
  title: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  sub: { fontSize: 14, color: '#64748B' },
  section: { fontSize: 13, fontWeight: '800', color: '#334155', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  card: { width: '48%', borderRadius: 18, borderWidth: 2, padding: 12, gap: 4 },
  icon: { fontSize: 30 },
  name: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  desc: { fontSize: 12, color: '#64748B' },
  level: { fontSize: 11, fontWeight: '800', marginTop: 2 },
  check: { fontSize: 12, fontWeight: '800', marginTop: 4 },
  previewBtn: { marginTop: 8, backgroundColor: '#F1F5F9', borderRadius: 10, paddingVertical: 6, alignItems: 'center' },
  previewTxt: { fontSize: 12, fontWeight: '800', color: '#334155' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 2, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  chipTxt: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  word: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  wordPl: { flex: 1, fontSize: 16, fontWeight: '800', color: '#0F172A' },
  wordEs: { fontSize: 14, color: '#475569' },
  wordHear: { fontSize: 18 },
  sample: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 2, gap: 4 },
  samplePl: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  sampleEs: { fontSize: 14, color: '#475569' },
  count: { textAlign: 'center', color: '#64748B', fontWeight: '700' },
  btn: { backgroundColor: '#0284C7', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 4 },
  btnOff: { backgroundColor: '#CBD5E1' },
  btnTxt: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
