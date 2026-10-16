// src/lib/game.js
// Progreso social y de juego. Los rivales son simulados en el dispositivo.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@mowi_game';
const pad = (n) => String(n).padStart(2, '0');
const dayStr = (d = new Date()) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

export const monthKey = (d = new Date()) => d.getFullYear() + '-' + pad(d.getMonth() + 1);
export const weekKey = (d = new Date()) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((t - y0) / 86400000 + 1) / 7);
  return t.getUTCFullYear() + '-W' + pad(wk);
};
export const daysLeft = (period, d = new Date()) => {
  if (period === 'month') return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() - d.getDate();
  return 7 - (d.getDay() || 7);
};
export const prevMonthKey = (d = new Date()) => monthKey(new Date(d.getFullYear(), d.getMonth() - 1, 1));

const makeCode = () => 'MOWI-' + Math.random().toString(36).slice(2, 6).toUpperCase();
const blank = () => ({ modules: 0, speakOk: 0, dialogues: 0, xp: 0 });

export const defaultGame = () => ({
  code: makeCode(),
  emoji: '🦉',
  friends: [],
  week: { key: weekKey(), ...blank() },
  month: { key: monthKey(), ...blank() },
  totalXp: 0,
  modules: 0,
  speakOk: 0,
  dialogues: 0,
  tournamentsWon: 0,
  medals: {},
  daysByMonth: {},
  claimedGifts: {},
  claimedChallenges: {},
  claimedTournaments: {},
  joined: {},
});

export const touchDay = (g) => {
  const mk = monthKey();
  const today = dayStr();
  const list = g.daysByMonth[mk] || [];
  if (list.includes(today)) return g;
  return { ...g, daysByMonth: { ...g.daysByMonth, [mk]: [...list, today] } };
};

export const loadGame = async () => {
  let g;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    g = raw ? { ...defaultGame(), ...JSON.parse(raw) } : defaultGame();
  } catch (e) {
    g = defaultGame();
  }
  if (g.week.key !== weekKey()) g.week = { key: weekKey(), ...blank() };
  if (g.month.key !== monthKey()) g.month = { key: monthKey(), ...blank() };
  return touchDay(g);
};

export const saveGame = async (g) => {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(g)); } catch (e) {}
};

export const daysThisMonth = (g) => (g.daysByMonth[monthKey()] || []).length;

export const addEvent = (g, type, n = 1) => {
  const next = { ...g, week: { ...g.week }, month: { ...g.month } };
  if (type === 'modules' || type === 'speakOk' || type === 'dialogues' || type === 'xp') {
    next.week[type] += n;
    next.month[type] += n;
  }
  if (type === 'xp') next.totalXp += n;
  if (type === 'modules') next.modules += n;
  if (type === 'speakOk') next.speakOk += n;
  if (type === 'dialogues') next.dialogues += n;
  return next;
};

// Medallas
export const MEDALS = [
  { id: 'first', tier: 'bronze', icon: '🥉', name: 'Primer paso', desc: 'Completa tu primer módulo', test: (s) => s.modules >= 1 },
  { id: 'explorer', tier: 'silver', icon: '🥈', name: 'Explorador', desc: 'Completa 5 módulos', test: (s) => s.modules >= 5 },
  { id: 'master', tier: 'gold', icon: '🥇', name: 'Maestro de módulos', desc: 'Completa 10 módulos', test: (s) => s.modules >= 10 },
  { id: 'voice', tier: 'bronze', icon: '🎤', name: 'Voz clara', desc: 'Pronuncia 10 frases bien', test: (s) => s.speakOk >= 10 },
  { id: 'orator', tier: 'gold', icon: '📣', name: 'Orador', desc: 'Pronuncia 50 frases bien', test: (s) => s.speakOk >= 50 },
  { id: 'dialog1', tier: 'bronze', icon: '💬', name: 'Primera conversación', desc: 'Termina un diálogo', test: (s) => s.dialogues >= 1 },
  { id: 'dialog5', tier: 'silver', icon: '🗣️', name: 'Charlatán', desc: 'Termina 5 diálogos', test: (s) => s.dialogues >= 5 },
  { id: 'streak7', tier: 'silver', icon: '🔥', name: 'Semana imparable', desc: '7 días seguidos', test: (s) => s.streak >= 7 },
  { id: 'streak30', tier: 'gold', icon: '🌋', name: 'Mes de inmersión', desc: '30 días seguidos', test: (s) => s.streak >= 30 },
  { id: 'xp1000', tier: 'silver', icon: '⭐', name: 'Mil puntos', desc: 'Llega a 1000 XP', test: (s) => s.totalXp >= 1000 },
  { id: 'friend', tier: 'bronze', icon: '🤝', name: 'Compañero', desc: 'Agrega a un amigo', test: (s) => s.friends >= 1 },
  { id: 'champ', tier: 'gold', icon: '🏆', name: 'Campeón', desc: 'Gana un torneo', test: (s) => s.tournamentsWon >= 1 },
];

export const checkMedals = (g, streak) => {
  const s = {
    modules: g.modules,
    speakOk: g.speakOk,
    dialogues: g.dialogues,
    streak,
    totalXp: g.totalXp,
    friends: g.friends.length,
    tournamentsWon: g.tournamentsWon,
  };
  const fresh = MEDALS.filter((m) => !g.medals[m.id] && m.test(s));
  const medals = { ...g.medals };
  fresh.forEach((m) => { medals[m.id] = dayStr(); });
  return { game: { ...g, medals }, fresh };
};

// Regalo mensual: se reclama con 10 o más días estudiados el mes anterior
export const monthlyGift = (g) => {
  const key = prevMonthKey();
  const days = (g.daysByMonth[key] || []).length;
  return {
    key,
    days,
    available: days >= 10 && !g.claimedGifts[key],
    claimed: !!g.claimedGifts[key],
    gems: 50 + days * 5,
    hearts: 3,
  };
};

// Desafíos semanales y mensuales
export const CHALLENGES = [
  { id: 'w_modules', period: 'week', label: 'Completa 3 módulos', metric: 'modules', goal: 3, reward: { gems: 40 }, icon: '📘' },
  { id: 'w_speak', period: 'week', label: 'Pronuncia 20 frases bien', metric: 'speakOk', goal: 20, reward: { xp: 100 }, icon: '🎤' },
  { id: 'w_dlg', period: 'week', label: 'Termina 2 diálogos', metric: 'dialogues', goal: 2, reward: { gems: 50 }, icon: '💬' },
  { id: 'm_modules', period: 'month', label: 'Completa 10 módulos', metric: 'modules', goal: 10, reward: { gems: 150, hearts: 3 }, icon: '🏅' },
  { id: 'm_xp', period: 'month', label: 'Gana 1500 XP', metric: 'xp', goal: 1500, reward: { gems: 200 }, icon: '⭐' },
  { id: 'm_days', period: 'month', label: 'Estudia 15 días', metric: 'days', goal: 15, reward: { gems: 250 }, icon: '📅' },
];

export const challengeValue = (g, c) => {
  if (c.metric === 'days') return daysThisMonth(g);
  return (c.period === 'week' ? g.week : g.month)[c.metric] || 0;
};

export const challengeKey = (g, c) => c.id + '-' + (c.period === 'week' ? g.week.key : g.month.key);

// Rivales simulados
export const BOTS = [
  { name: 'Ana M.', emoji: '🌸', base: 620 },
  { name: 'Marek', emoji: '🦊', base: 540 },
  { name: 'Lucía', emoji: '🌻', base: 480 },
  { name: 'Piotr', emoji: '🐻', base: 430 },
  { name: 'Sofía', emoji: '🦋', base: 390 },
  { name: 'Tomasz', emoji: '🚀', base: 350 },
  { name: 'Carmen', emoji: '🍀', base: 300 },
  { name: 'Jakub', emoji: '🎯', base: 260 },
  { name: 'Elena', emoji: '🌙', base: 220 },
  { name: 'Oskar', emoji: '⚡', base: 180 },
];

const seed = (str) => [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100003, 7);
export const botCode = (b) => 'MOWI-' + seed(b.name).toString(36).toUpperCase().padStart(4, '0').slice(0, 4);

const scoreOf = (b, key, metric) => {
  const s = seed(key + b.name);
  if (metric === 'speakOk') return Math.round(b.base / 6) + (s % 25);
  if (metric === 'dialogues') return Math.round(b.base / 90) + (s % 4);
  return b.base + (s % 260);
};

export const rankFor = (g, metric, periodKey, you) => {
  const rows = BOTS.map((b) => ({ id: 'bot-' + b.name, name: b.name, emoji: b.emoji, value: scoreOf(b, periodKey, metric) }));
  rows.push({ id: 'me', name: you.name, emoji: g.emoji, value: you.value, me: true });
  return rows.sort((a, b) => b.value - a.value).map((r, i) => ({ ...r, rank: i + 1 }));
};

// Torneos
export const TOURNAMENTS = [
  { id: 't_xp', name: 'Torneo semanal de XP', icon: '🏆', period: 'week', metric: 'xp', prize: { gems: 100, hearts: 2 }, desc: 'Gana la mayor cantidad de XP esta semana.' },
  { id: 't_voz', name: 'Copa de la pronunciación', icon: '🎤', period: 'week', metric: 'speakOk', prize: { gems: 120 }, desc: 'Más frases pronunciadas correctamente.' },
  { id: 't_dlg', name: 'Liga de diálogos', icon: '💬', period: 'month', metric: 'dialogues', prize: { gems: 200, hearts: 3 }, desc: 'Termina más conversaciones este mes.' },
];

export const periodKeyFor = (t) => (t.period === 'week' ? weekKey() : monthKey());
export const tournamentKey = (t) => t.id + '-' + periodKeyFor(t);
export const tournamentValue = (g, t) => (t.period === 'week' ? g.week : g.month)[t.metric] || 0;

export const claimTournament = (g, t, rank) => {
  const key = tournamentKey(t);
  if (rank > 3 || g.joined[t.id] !== periodKeyFor(t) || g.claimedTournaments[key]) return { game: g, prize: null };
  return { game: { ...g, claimedTournaments: { ...g.claimedTournaments, [key]: true } }, prize: t.prize };
};
