// src/components/TopicPicker.js
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TOPICS } from '../data/topics';

const MAX = 5;

export default function TopicPicker({ initial = [], onDone }) {
  const [sel, setSel] = useState(initial);

  const toggle = (id) => {
    if (sel.includes(id)) { setSel(sel.filter((x) => x !== id)); return; }
    if (sel.length >= MAX) return;
    setSel([...sel, id]);
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>¿Qué te interesa practicar?</Text>
      <Text style={styles.sub}>Elige hasta {MAX} temas. Mówi empezará por tu vida real.</Text>
      <View style={styles.grid}>
        {TOPICS.map((t) => {
          const on = sel.includes(t.id);
          return (
            <TouchableOpacity
              key={t.id}
              onPress={() => toggle(t.id)}
              style={[styles.card, { borderColor: on ? t.color : '#E2E8F0', backgroundColor: on ? t.color + '18' : '#FFFFFF' }]}
            >
              <Text style={styles.icon}>{t.icon}</Text>
              <Text style={styles.name}>{t.name}</Text>
              <Text style={styles.desc}>{t.desc}</Text>
              {on && <Text style={[styles.check, { color: t.color }]}>✓ Elegido</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.count}>{sel.length}/{MAX} elegidos</Text>
      <TouchableOpacity
        style={[styles.btn, sel.length === 0 && styles.btnOff]}
        disabled={sel.length === 0}
        onPress={() => onDone(sel)}
      >
        <Text style={styles.btnTxt}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 60, gap: 14 },
  title: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  sub: { fontSize: 14, color: '#64748B' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  card: { width: '48%', borderRadius: 18, borderWidth: 2, padding: 14, gap: 4 },
  icon: { fontSize: 30 },
  name: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  desc: { fontSize: 12, color: '#64748B' },
  check: { fontSize: 12, fontWeight: '800', marginTop: 4 },
  count: { textAlign: 'center', color: '#64748B', fontWeight: '700' },
  btn: { backgroundColor: '#0284C7', padding: 16, borderRadius: 14, alignItems: 'center' },
  btnOff: { backgroundColor: '#CBD5E1' },
  btnTxt: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
