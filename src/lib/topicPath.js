// src/lib/topicPath.js
// Construye la ruta de estudio según los temas elegidos.
import { MODULE_TOPIC } from '../data/topicMap';

export const buildTopicPath = (levels, topics) => {
  if (!topics || topics.length === 0) return levels;
  return levels.map((lvl) => {
    const mine = lvl.modules.filter((m) => topics.includes(MODULE_TOPIC[m.moduleId]));
    const rest = lvl.modules.filter((m) => !topics.includes(MODULE_TOPIC[m.moduleId]));
    return { ...lvl, modules: [...mine, ...rest] };
  });
};

export const topicProgress = (levels, topics, done) => {
  const mods = levels.flatMap((l) => l.modules).filter((m) => topics.includes(MODULE_TOPIC[m.moduleId]));
  const finished = mods.filter((m) => done.includes(m.moduleId)).length;
  return { total: mods.length, finished };
};
