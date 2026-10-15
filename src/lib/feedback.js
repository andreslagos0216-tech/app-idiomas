// src/lib/feedback.js
// Vibración y sonidos cortos. En web se usan tonos generados por el navegador.
import * as Haptics from 'expo-haptics';

let ctx = null;
const audio = () => {
  try {
    if (typeof window === 'undefined') return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch (e) {
    return null;
  }
};

const tone = (freq, dur = 0.12, type = 'sine', vol = 0.15, delay = 0) => {
  const c = audio();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, c.currentTime + delay);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + delay);
  o.stop(c.currentTime + delay + dur + 0.02);
};

export const correct = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  tone(660, 0.1, 'sine', 0.15, 0);
  tone(880, 0.16, 'sine', 0.15, 0.09);
};

export const wrong = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
  tone(220, 0.22, 'sawtooth', 0.08, 0);
};

export const tap = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  tone(520, 0.05, 'triangle', 0.08, 0);
};

export const finish = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'sine', 0.14, i * 0.11));
};
