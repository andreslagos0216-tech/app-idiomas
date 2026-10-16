// src/lib/topics.js
// Guarda y lee los temas elegidos por el usuario.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@mowi_topics';

export const loadTopics = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveTopics = async (list) => {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
};
