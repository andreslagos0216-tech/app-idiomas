// src/data/registry.js
import { PL_ES_A1 } from './pl-es';
import { PL_ES_A2 } from './pl-es-a2';
import { PL_ES_A2_2 } from './pl-es-a2-2';
import { PL_ES_A2_3 } from './pl-es-a2-3';
import { PL_ES_B1 } from './pl-es-b1';
import { PL_ES_B1_2 } from './pl-es-b1-2';
import { PAIRS } from './pl-pairs';
import { PAIRS_A2 } from './pl-pairs-a2';
import { DIALOGUES } from './dialogues';

// A1 y A2: sin escritura. B1: con dictado y escritura.
const DIDACTIC = { A1: true, A2: true };

const toLesson = (l) => ({
  ...l,
  question: l.question ?? (l.prompt && l.prompt.es) ?? '',
  options: l.options ?? [],
  answers: l.answers ?? (l.correctAnswer ? [l.correctAnswer] : []),
});

function didacticLessons(m, pool, pairsMap) {
  const out = [];
  const pairs = pairsMap[m.moduleId] || [];
  if (pairs.length >= 3) out.push({ id: m.moduleId + '_match', type: 'match', pairs });

  (m.listening || []).forEach((phrase, i) => {
    const d = pool.filter((p) => p !== phrase).slice(0, 2);
    if (d.length < 2) return;
    const pos = i % 3;
    const options = [...d.slice(0, pos), phrase, ...d.slice(pos)];
    out.push({ id: m.moduleId + '_listen' + i, type: 'listen', question: 'Escucha y elige lo que oyes.', audio: phrase, options, correct: pos });
  });

  m.lessons.filter((l) => l.type === 'choice').forEach((l) => out.push(toLesson(l)));

  m.lessons.filter((l) => l.type === 'write').forEach((l) => out.push({
    id: l.id + '_order', type: 'build', prompt: l.prompt, audio: l.audio || (l.answers && l.answers[0]),
  }));

  m.lessons.filter((l) => l.type === 'voice').forEach((l) => out.push({ ...toLesson(l), type: 'speak', audio: l.audio || l.targetPhrase }));

  return out;
}

function advancedLessons(m) {
  return [
    ...(m.listening || []).map((phrase, i) => ({
      id: m.moduleId + '_dict' + i, type: 'dictation', question: 'Escucha y escribe lo que oyes.', audio: phrase, answers: [phrase],
    })),
    ...m.lessons.map((l) => (l.type === 'voice' ? { ...toLesson(l), type: 'speak', audio: l.audio || l.targetPhrase } : toLesson(l))),
  ];
}

function buildLevel(levelId, title, description, modules, pairsMap) {
  const pool = modules.flatMap((m) => m.listening || []);
  return {
    levelId,
    title,
    description,
    modules: modules.map((m) => ({
      ...m,
      moduleTitle: m.moduleTitle ?? m.title,
      levelId,
      lessons: DIDACTIC[levelId] ? didacticLessons(m, pool, pairsMap) : advancedLessons(m),
    })),
  };
}

export const LANGUAGES = {
  pl: {
    id: 'pl',
    name: 'Polaco',
    flag: '🇵🇱',
    levels: [
      buildLevel('A1', 'Nivel A1 • Fundamentos', '10 módulos', PL_ES_A1.modules, PAIRS),
      buildLevel('A2', 'Nivel A2 • Ciudad y viajes', '10 módulos', [...PL_ES_A2.modules, ...PL_ES_A2_2.modules, ...PL_ES_A2_3.modules], PAIRS_A2),
      buildLevel('B1', 'Nivel B1 • Expresión e ideas', '6 módulos', [...PL_ES_B1.modules, ...PL_ES_B1_2.modules], {}),
    ],
  },
};

export const DIALOGUE_LIST = DIALOGUES;
