// src/lib/feedback.js
import * as Haptics from 'expo-haptics';

let prefs = { sound: true, haptic: true };
export const setPrefs = (p) => { prefs = { ...prefs, ...p }; };

let ctx = null;
const getCtx = () => {
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

const tone = (freq, dur = 0.12, type = 'sine', vol = 0.18, delay = 0) => {
  if (!prefs.sound) return;
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
};

const sweep = (from, to, dur = 0.3, type = 'sawtooth', vol = 0.1, delay = 0) => {
  if (!prefs.sound) return;
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(from, t0);
  o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
};

const vib = (style) => {
  if (!prefs.haptic) return;
  try { Haptics.impactAsync(style).catch(() => {}); } catch (e) {}
};
const note = (type) => {
  if (!prefs.haptic) return;
  try { Haptics.notificationAsync(type).catch(() => {}); } catch (e) {}
};
const later = (ms, fn) => setTimeout(fn, ms);

export const correct = () => {
  tone(523, 0.12, 'triangle', 0.22, 0);
  tone(659, 0.12, 'triangle', 0.22, 0.08);
  tone(784, 0.12, 'triangle', 0.22, 0.16);
  tone(1047, 0.3, 'sine', 0.25, 0.24);
  vib(Haptics.ImpactFeedbackStyle.Light);
  later(90, () => vib(Haptics.ImpactFeedbackStyle.Medium));
  later(180, () => note(Haptics.NotificationFeedbackType.Success));
};

export const wrong = () => {
  sweep(320, 140, 0.32, 'sawtooth', 0.12, 0);
  tone(90, 0.25, 'square', 0.1, 0.05);
  note(Haptics.NotificationFeedbackType.Error);
  later(160, () => vib(Haptics.ImpactFeedbackStyle.Heavy));
};

export const tap = () => {
  tone(740, 0.05, 'sine', 0.1, 0);
  vib(Haptics.ImpactFeedbackStyle.Light);
};

export const finish = () => {
  [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.22, 'triangle', 0.2, i * 0.1));
  tone(1568, 0.5, 'sine', 0.16, 0.55);
  note(Haptics.NotificationFeedbackType.Success);
  later(120, () => vib(Haptics.ImpactFeedbackStyle.Heavy));
  later(260, () => vib(Haptics.ImpactFeedbackStyle.Medium));
  later(400, () => vib(Haptics.ImpactFeedbackStyle.Heavy));
};

export const achievement = () => {
  sweep(600, 1600, 0.45, 'sine', 0.15, 0);
  [880, 1174, 1568].forEach((f, i) => tone(f, 0.2, 'sine', 0.18, 0.3 + i * 0.1));
  note(Haptics.NotificationFeedbackType.Success);
  later(300, () => vib(Haptics.ImpactFeedbackStyle.Heavy));
};

export const levelUp = () => {
  [392, 523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.16, 'square', 0.12, i * 0.11));
  note(Haptics.NotificationFeedbackType.Success);
  later(0, () => vib(Haptics.ImpactFeedbackStyle.Heavy));
  later(400, () => vib(Haptics.ImpactFeedbackStyle.Heavy));
  later(800, () => vib(Haptics.ImpactFeedbackStyle.Heavy));
};
