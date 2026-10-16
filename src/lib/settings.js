// src/lib/settings.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@mowi_settings';
export const DEFAULT_SETTINGS = { sound: true, haptic: true, translations: true, slowVoice: false };

export const loadSettings = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch (e) {
    return { ...DEFAULT_SETTINGS };
  }
};

export const saveSettings = async (s) => {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
};
