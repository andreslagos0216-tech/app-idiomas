// src/components/TapWords.js
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { translateWord } from '../data/glossary';

export default function TapWords({ text = '', lang = 'pl-PL', size = 18, color = '#0F172A', enabled = true, align = 'center' }) {
  const [sel, setSel] = useState(null);
  const words = (text || '').split(' ').filter(Boolean);

  const onWord = (w, i) => {
    if (!enabled) return;
    setSel(sel && sel.i === i ? null : { i, w, es: translateWord(w) });
    try { Speech.stop(); Speech.speak(w, { language: lang, rate: 0.8 }); } catch (e) {}
  };

  return (
    <View style={styles.box}>
      <Text style={[styles.line, { fontSize: size, color, textAlign: align }]}>
        {words.map((w, i) => (
          <Text
            key={i}
            onPress={() => onWord(w, i)}
            style={[enabled && styles.tap, sel && sel.i === i && styles.selected]}
          >
            {w}{i < words.length - 1 ? ' ' : ''}
          </Text>
        ))}
      </Text>
      {sel && (
        <View style={styles.bubble}>
          <Text style={styles.bubbleWord}>{sel.w}</Text>
          <Text style={styles.bubbleEs}>{sel.es || 'Sin traducción en el diccionario todavía'}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: '100%' },
  line: { fontWeight: '700', lineHeight: 28 },
  tap: { textDecorationLine: 'underline', textDecorationStyle: 'dotted', textDecorationColor: '#0284C7' },
  selected: { backgroundColor: '#E0F2FE', color: '#0369A1' },
  bubble: { marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#0F172A', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  bubbleWord: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  bubbleEs: { color: '#BAE6FD', fontSize: 13, marginTop: 2 },
});
