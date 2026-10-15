// src/lib/progress.js
// Mide comprensión, velocidad y pronunciación por separado, y la racha de días seguidos.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@mowi_skills';

export const emptySkills = () => ({
  listening: { ok: 0, total: 0 },
  speed: { ok: 0, total: 0 },
  speaking: { ok: 0, total: 0 },
  streak: 0,
  lastDay: null,
});

export const loadSkills = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...emptySkills(), ...JSON.parse(raw) } : emptySkills();
  } catch (e) {
    return emptySkills();
  }
};

export const saveSkills = async (s) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(s));
  } catch (e) {}
};

// Suma un resultado a una habilidad: 'listening', 'speed' o 'speaking'
export const addSkill = (s, skill, ok) => {
  const cur = s[skill] || { ok: 0, total: 0 };
  return { ...s, [skill]: { ok: cur.ok + (ok ? 1 : 0), total: cur.total + 1 } };
};

// Actualiza la racha: suma un día si se estudió ayer, la reinicia si se faltó más de un día
export const touchStreak = (s) => {
  const today = new Date().toDateString();
  if (s.lastDay === today) return s;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const streak = s.lastDay === yesterday ? s.streak + 1 : 1;
  return { ...s, streak, lastDay: today };
};

export const pct = (x) => (x.total ? Math.round((x.ok / x.total) * 100) : 0);
