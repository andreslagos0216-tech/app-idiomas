// src/components/DialogueScreen.js
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as FB from '../lib/feedback';

export default function DialogueScreen({ dialogue, langCode, onExit, onComplete }) {
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const [picked, setPicked] = useState(null);
  const [ok, setOk] = useState(null);
  const pop = useRef(new Animated.Value(1)).current;
  const turn = dialogue.turns[i];
  const total = dialogue.turns.length;

  const speak = (text, rate = 0.85) => {
    try { Speech.stop(); Speech.speak(text, { language: langCode, rate }); } catch (e) {}
  };

  useEffect(() => { speak(turn.say); }, [i]);

  const choose = (idx) => {
    if (ok !== null) return;
    setPicked(idx);
    const right = idx === turn.correct;
    setOk(right);
    right ? FB.correct() : FB.wrong();
    Animated.sequence([
      Animated.timing(pop, { toValue: 1.06, duration: 120, useNativeDriver: false }),
      Animated.timing(pop, { toValue: 1, duration: 120, useNativeDriver: false }),
    ]).start();
    setLog([...log, { say: turn.say, you: turn.options[idx], ok: right }]);
    speak(turn.options[idx]);
  };

  const next = () => {
    if (i + 1 < total) {
      setI(i + 1);
      setPicked(null);
      setOk(null);
    } else {
      FB.finish();
      onComplete(log.filter((l) => l.ok).length, total);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.top}>
        <TouchableOpacity onPress={onExit}><Ionicons name="close" size={26} color="#64748B" /></TouchableOpacity>
        <View style={styles.track}><View style={[styles.fill, { width: Math.round((i / total) * 100) + '%' }]} /></View>
        <Text style={styles.count}>{i + 1}/{total}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{dialogue.icon} {dialogue.title}</Text>
        <View style={styles.bubbleLeft}>
          <Text style={styles.bubbleText}>{turn.say}</Text>
          <TouchableOpacity onPress={() => speak(turn.say)}>
            <Ionicons name="volume-high" size={22} color="#0284C7" />
          </TouchableOpacity>
        </View>
        <Text style={styles.prompt}>¿Qué respondes?</Text>
        {turn.options.map((o, idx) => {
          const isOk = ok !== null && idx === turn.correct;
          const isBad = ok === false && picked === idx;
          return (
            <Animated.View key={idx} style={{ transform: [{ scale: picked === idx ? pop : 1 }] }}>
              <TouchableOpacity
                disabled={ok !== null}
                style={[styles.option, isOk && styles.optOk, isBad && styles.optBad]}
                onPress={() => choose(idx)}
              >
                <Text style={styles.optText}>{o}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
        {ok !== null && (
          <View style={[styles.feedback, ok ? styles.fbOk : styles.fbBad]}>
            <Text style={styles.fbTitle}>{ok ? '¡Muy bien! 🎉' : 'La respuesta correcta era:'}</Text>
            {!ok && <Text style={styles.fbText}>{turn.options[turn.correct]}</Text>}
            <TouchableOpacity style={styles.cont} onPress={next}>
              <Text style={styles.contText}>{i + 1 < total ? 'Siguiente' : 'Terminar diálogo'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#F8FAFC' },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  track: { flex: 1, height: 12, backgroundColor: '#E2E8F0', borderRadius: 6, overflow: 'hidden' },
  fill: { height: 12, backgroundColor: '#22C55E', borderRadius: 6 },
  count: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  body: { padding: 20, paddingBottom: 60, gap: 14 },
  title: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  bubbleLeft: { alignSelf: 'flex-start', maxWidth: '88%', backgroundColor: '#FFFFFF', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', alignItems: 'center', gap: 10 },
  bubbleText: { fontSize: 17, fontWeight: '700', color: '#0F172A', flexShrink: 1 },
  prompt: { fontSize: 13, color: '#64748B', fontWeight: '700', marginTop: 4 },
  option: { padding: 16, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0', marginBottom: 10 },
  optOk: { borderColor: '#16A34A', backgroundColor: '#DCFCE7' },
  optBad: { borderColor: '#DC2626', backgroundColor: '#FEE2E2' },
  optText: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  feedback: { borderRadius: 16, padding: 16, gap: 8, marginTop: 6 },
  fbOk: { backgroundColor: '#DCFCE7' },
  fbBad: { backgroundColor: '#FEE2E2' },
  fbTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  fbText: { fontSize: 15, color: '#334155', fontWeight: '600' },
  cont: { backgroundColor: '#16A34A', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  contText: { color: '#FFFFFF', fontWeight: '800' },
});
