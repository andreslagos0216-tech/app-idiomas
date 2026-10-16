// src/components/FloatingMenu.js
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FloatingMenu({ settings, onSettings, onPractice }) {
  const [open, setOpen] = useState(false);
  const toggle = (k) => onSettings({ ...settings, [k]: !settings[k] });
  const go = (kind) => { setOpen(false); onPractice(kind); };

  const Row = ({ label, icon, k }) => (
    <TouchableOpacity style={styles.row} onPress={() => toggle(k)}>
      <Ionicons name={icon} size={20} color="#0284C7" />
      <Text style={styles.rowTxt}>{label}</Text>
      <View style={[styles.pill, settings[k] ? styles.on : styles.off]}>
        <Text style={styles.pillTxt}>{settings[k] ? 'ON' : 'OFF'}</Text>
      </View>
    </TouchableOpacity>
  );

  const Practice = ({ label, kind }) => (
    <TouchableOpacity style={styles.practice} onPress={() => go(kind)}>
      <Text style={styles.practiceTxt}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)} activeOpacity={0.85}>
        <Ionicons name="options" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setOpen(false)} />
          <View style={styles.sheet}>
            <Text style={styles.title}>🎧 Sonidos y práctica</Text>
            <Row label="Sonidos" icon="volume-high" k="sound" />
            <Row label="Vibración" icon="phone-portrait" k="haptic" />
            <Row label="Traducción al tocar" icon="language" k="translations" />
            <Row label="Voz lenta" icon="speedometer" k="slowVoice" />
            <Text style={styles.section}>Práctica libre</Text>
            <Practice label="🎤 Pronunciación" kind="speak" />
            <Practice label="👂 Escucha" kind="listen" />
            <Practice label="🔗 Parejas" kind="match" />
            <Practice label="🔁 Frases difíciles" kind="review" />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute', right: 16, bottom: 78, width: 54, height: 54, borderRadius: 27,
    backgroundColor: '#0284C7', justifyContent: 'center', alignItems: 'center', elevation: 6,
    shadowColor: '#0284C7', shadowOpacity: 0.3, shadowRadius: 8,
  },
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22, gap: 10 },
  title: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  section: { fontSize: 12, fontWeight: '800', color: '#64748B', marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  rowTxt: { flex: 1, fontSize: 15, fontWeight: '700', color: '#0F172A' },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  on: { backgroundColor: '#DCFCE7' },
  off: { backgroundColor: '#E2E8F0' },
  pillTxt: { fontSize: 12, fontWeight: '800', color: '#0F172A' },
  practice: { backgroundColor: '#E0F2FE', padding: 14, borderRadius: 14 },
  practiceTxt: { fontSize: 15, fontWeight: '700', color: '#0369A1' },
});
