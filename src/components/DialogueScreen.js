// src/components/DialogueScreen.js
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as FB from '../lib/feedback';
import TapWords from './TapWords';

const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = b[i]; b[i] = b[j]; b[j] = t;
  }
  return b;
};

export default function DialogueScreen({ dialogue, langCode, translations = true, rate = 0.85, onExit, onComplete }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [showSay, setShowSay] = useState(false);
  const [log, setLog] = useState([]);
  const [finished, setFinished] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  const turn = dialogue.turns[i];
  const total = dialogue.turns.length;
  const order = useMemo(() => shuffle(turn.options.map((_, k) => k)), [i]);
  const answered = picked !== null;

  const speak = (t, r) => {
    try { Speech.stop(); Speech.speak(t, { language: langCode, rate: r || rate }); } catch (e) {}
  };

  useEffect(() => {
    setPicked(null);
    setShowSay(false);
    const t = setTimeout(() => speak(turn.say), 400);
    return () => clearTimeout(t);
  }, [i]);

  const choose = (idx) => {
    if (answered) return;
    setPicked(idx);
    const ok = idx === turn.correct;
    if (ok) {
      FB.correct();
      Animated.sequence([
        Animated.timing(pop, { toValue: 1.05, duration: 120, useNativeDriver: false }),
        Animated.timing(pop, { toValue: 1, duration: 160, useNativeDriver: false }),
      ]).start();
    } else {
      FB.wrong();
      Animated.sequence([
        Animated.timing(shake, { toValue: 12, duration: 50, useNativeDriver: false }),
        Animated.timing(shake, { toValue: -12, duration: 50, useNativeDriver: false }),
        Animated.timing(shake, { toValue: 8, duration: 50, useNativeDriver: false }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: false }),
      ]).start();
    }
    setLog((l) => [...l, { say: turn.say, sayEs: turn.sayEs, you: turn.options[idx].pl, es: turn.options[idx].es, ok }]);
    speak(turn.options[idx].pl);
  };

  const next = () => {
    if (i + 1 < total) { setI(i + 1); return; }
    FB.finish();
    setFinished(true);
  };

  if (finished) {
    const correct = log.filter((l) => l.ok).length;
    const stars = correct === total ? 3 : correct >= Math.ceil(total * 0.6) ? 2 : 1;
    return (
      <ScrollView contentContainerStyle={styles.summary}>
        <Text style={styles.sumIcon}>{dialogue.icon}</Text>
        <Text style={styles.sumTitle}>{dialogue.title}</Text>
        <Text style={styles.stars}>{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</Text>
        <Text style={styles.sumScore}>{correct}/{total} respuestas correctas</Text>
        {log.map((l, k) => (
          <View key={k} style={[styles.sumRow, l.ok ? styles.sumOk : styles.sumBad]}>
            <Text style={styles.sumMark}>{l.ok ? '✅' : '🔁'}</Text>
            <View style={{ flex: 1 }}>
              <TapWords text={l.say} lang={langCode} size={14} align="left" />
              {translations && <Text style={styles.sumEs}>{l.sayEs}</Text>}
              <Text style={styles.sumYou}>Tu respuesta: {l.you}</Text>
              {translations && <Text style={styles.sumEs}>{l.es}</Text>}
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.primary} onPress={() => onComplete(correct, total)}>
          <Text style={styles.primaryTxt}>Terminar conversación</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.top}>
        <TouchableOpacity onPress={onExit}>
          <Ionicons name="close" size={26} color="#64748B" />
        </TouchableOpacity>
        <View style={styles.track}>
          <View style={[styles.fill, { width: Math.round((i / total) * 100) + '%' }]} />
        </View>
        <Text style={styles.count}>{i + 1}/{total}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{dialogue.icon} {dialogue.title}</Text>

        <View style={styles.stages}>
          {dialogue.stages.map((s, k) => (
            <View key={s} style={[styles.stage, k === turn.stage && styles.stageOn, k < turn.stage && styles.stageDone]}>
              <Text style={[styles.stageTxt, k === turn.stage && { color: '#FFFFFF' }]}>{s}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bubble}>
          <TapWords text={turn.say} lang={langCode} size={19} align="left" />
          <View style={styles.bubbleRow}>
            <TouchableOpacity style={styles.listen} onPress={() => speak(turn.say)}>
              <Ionicons name="volume-high" size={20} color="#0284C7" />
              <Text style={styles.listenTxt}>Escuchar</Text>
            </TouchableOpacity>
            {translations && (
              <TouchableOpacity onPress={() => setShowSay(!showSay)}>
                <Text style={styles.listenTxt}>{showSay ? 'Ocultar' : '🇪🇸 Traducción'}</Text>
              </TouchableOpacity>
            )}
          </View>
          {showSay && <Text style={styles.sayEs}>{turn.sayEs}</Text>}
        </View>

        <Text style={styles.prompt}>¿Qué le respondes?</Text>

        <Animated.View style={{ transform: [{ translateX: shake }, { scale: pop }] }}>
          {order.map((idx) => {
            const o = turn.options[idx];
            const isOk = answered && idx === turn.correct;
            const isBad = answered && picked === idx && idx !== turn.correct;
            return (
              <TouchableOpacity
                key={idx}
                disabled={answered}
                onPress={() => choose(idx)}
                style={[styles.option, isOk && styles.optOk, isBad && styles.optBad]}
              >
                <Text style={styles.optTxt}>{o.pl}</Text>
                {answered && translations && <Text style={styles.optEs}>{o.es}</Text>}
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {answered && (
          <View style={[styles.feedback, picked === turn.correct ? styles.fbOk : styles.fbBad]}>
            <Text style={styles.fbTitle}>{picked === turn.correct ? '¡Muy bien! 🎉' : 'Casi. La respuesta era:'}</Text>
            {picked !== turn.correct && <Text style={styles.fbTxt}>{turn.options[turn.correct].pl}</Text>}
            <TouchableOpacity style={styles.primary} onPress={next}>
              <Text style={styles.primaryTxt}>{i + 1 < total ? 'Siguiente' : 'Ver resumen'}</Text>
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
  stages: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  stage: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, backgroundColor: '#E2E8F0' },
  stageOn: { backgroundColor: '#0284C7' },
  stageDone: { backgroundColor: '#BBF7D0' },
  stageTxt: { fontSize: 11, fontWeight: '800', color: '#334155' },
  bubble: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 18, borderWidth: 1, borderColor: '#E2E8F0', gap: 10 },
  bubbleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  listen: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  listenTxt: { color: '#0369A1', fontWeight: '700', fontSize: 13 },
  sayEs: { color: '#475569', fontSize: 14, fontStyle: 'italic' },
  prompt: { fontSize: 13, color: '#64748B', fontWeight: '800', marginTop: 4 },
  option: { padding: 16, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0', marginBottom: 10, gap: 4 },
  optOk: { borderColor: '#16A34A', backgroundColor: '#DCFCE7' },
  optBad: { borderColor: '#DC2626', backgroundColor: '#FEE2E2' },
  optTxt: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  optEs: { fontSize: 13, color: '#475569' },
  feedback: { borderRadius: 16, padding: 16, gap: 8, marginTop: 6 },
  fbOk: { backgroundColor: '#DCFCE7' },
  fbBad: { backgroundColor: '#FEE2E2' },
  fbTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  fbTxt: { fontSize: 15, color: '#334155', fontWeight: '700' },
  primary: { backgroundColor: '#16A34A', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  primaryTxt: { color: '#FFFFFF', fontWeight: '800' },
  summary: { padding: 20, paddingBottom: 60, gap: 12, alignItems: 'center' },
  sumIcon: { fontSize: 48 },
  sumTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  stars: { fontSize: 30 },
  sumScore: { fontSize: 15, fontWeight: '700', color: '#334155' },
  sumRow: { flexDirection: 'row', gap: 10, width: '100%', padding: 12, borderRadius: 14, borderWidth: 1 },
  sumOk: { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
  sumBad: { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' },
  sumMark: { fontSize: 18 },
  sumEs: { fontSize: 13, color: '#475569', marginTop: 2 },
  sumYou: { fontSize: 13, color: '#0F172A', fontWeight: '700', marginTop: 4 },
});
