// src/components/brand/MowiLogo.js
// Logo de Mówi: búho con lazo y sello ą.
// El color del lazo cambia según la racha: azul (0 días), verde (7), dorado (30).
import { View, Text, StyleSheet } from 'react-native';

export const streakColor = (streak) => {
  if (streak >= 30) return '#F59E0B';
  if (streak >= 7) return '#16A34A';
  return '#0284C7';
};

export default function MowiLogo({ size = 96, streak = 0, showSeal = true }) {
  const ribbon = streakColor(streak);
  const ring = size * 1.1;
  return (
    <View style={[styles.wrap, { width: ring, height: ring, borderRadius: ring / 2 }]}>
      <View style={[styles.halo, { width: ring, height: ring, borderRadius: ring / 2 }]} />
      <Text style={{ fontSize: size * 0.72 }}>🦉</Text>
      <View style={[styles.ribbon, { backgroundColor: ribbon, width: size * 0.42, height: size * 0.14, top: size * 0.12 }]} />
      {showSeal && (
        <View style={[styles.seal, { width: size * 0.36, height: size * 0.36, borderRadius: size * 0.18 }]}>
          <Text style={[styles.sealTxt, { fontSize: size * 0.2 }]}>ą</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { justifyContent: 'center', alignItems: 'center' },
  halo: { position: 'absolute', backgroundColor: '#E0F2FE', borderWidth: 3, borderColor: '#BAE6FD' },
  ribbon: { position: 'absolute', borderRadius: 6 },
  seal: { position: 'absolute', right: 0, bottom: 2, backgroundColor: '#F59E0B', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  sealTxt: { color: '#FFFFFF', fontWeight: '900' },
});
