// src/lib/review.js
// Guarda en el dispositivo las frases que el usuario falló y las marca como dominadas tras dos aciertos seguidos.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@mowi_review';

export const loadReview = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const saveReview = async (data) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {}
};

// Registra un resultado: ok=true suma un acierto, ok=false reinicia la racha de la frase
export const recordResult = (data, phrase, ok) => {
  const cur = data[phrase] || { hits: 0, misses: 0, mastered: false };
  if (ok) {
    cur.hits += 1;
    if (cur.hits >= 2) cur.mastered = true;
  } else {
    cur.misses += 1;
    cur.hits = 0;
    cur.mastered = false;
  }
  return { ...data, [phrase]: cur };
};

// Devuelve las frases pendientes de repaso (fallidas o no dominadas), las más falladas primero
export const pendingPhrases = (data) =>
  Object.entries(data)
    .filter(([, v]) => !v.mastered)
    .sort((a, b) => b[1].misses - a[1].misses)
    .map(([phrase]) => phrase);
