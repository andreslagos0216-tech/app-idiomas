// src/data/registry.js
// Reúne todos los niveles y los convierte al formato que usa la app.

import { PL_ES_A1 } from './pl-es';
import { PL_ES_A2 } from './pl-es-a2';
import { PL_ES_A2_2 } from './pl-es-a2-2';
import { PL_ES_A2_3 } from './pl-es-a2-3';
import { PL_ES_B1 } from './pl-es-b1';

const toLesson = (l) => ({
  ...l,
  question: l.question ?? l.prompt?.es ?? '',
  targetPhrase: l.targetPhrase ?? l.audio ?? '',
  options: l.options ?? [],
  answers: l.answers ?? (l.correctAnswer ? [l.correctAnswer] : []),
  correctAnswer: l.correctAnswer ?? (l.answers ? l.answers[0] : ''),
});

const makeDictation = (m) => (m.listening || []).map((phrase, i) => ({
  id: m.moduleId + '_dict' + i, type: 'dictation', question: 'Escucha y escribe lo que oyes.', audio: phrase, answers: [phrase], correctAnswer: phrase,
}));

const makeShadowing = (m) => (m.listening || []).map((phrase, i) => ({
  id: m.moduleId + '_shad' + i, type: 'voice', question: 'Escucha y repite en voz alta.', targetPhrase: phrase, audio: phrase,
}));

const toModule = (m) => ({
  ...m,
  moduleTitle: m.moduleTitle ?? m.title,
  lessons: [...makeDictation(m), ...makeShadowing(m), ...m.lessons.map(toLesson)],
});

export const LANGUAGES = {
  pl: {
    id: 'pl',
    name: 'Polaco',
    flag: '🇵🇱',
    levels: [
      {
        levelId: 'A1',
        title: 'Nivel A1 • Fundamentos',
        description: '10 módulos',
        modules: PL_ES_A1.modules.map(toModule),
      },
      {
        levelId: 'A2',
        title: 'Nivel A2 • Ciudad y viajes',
        description: '10 módulos',
        modules: [...PL_ES_A2.modules, ...PL_ES_A2_2.modules, ...PL_ES_A2_3.modules].map(toModule),
      },
      {
        levelId: 'B1',
        title: 'Nivel B1 • Expresión e ideas',
        description: '3 módulos',
        modules: PL_ES_B1.modules.map(toModule),
      },
    ],
  },
};
