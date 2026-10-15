// src/data/pl-es-a2-3.js
// Polaco para hispanohablantes, nivel A2 (módulos 7 a 10).

export const PL_ES_A2_3 = {
  modules: [
    {
      moduleId: 'pl_a2_m7',
      title: 'Módulo 7: Rutina diaria',
      icon: '⏰',
      grammarNote: 'Wstaję (me levanto), jem śniadanie (desayuno). Rano (por la mañana), wieczorem (por la noche).',
      listening: ['Wstaję rano.', 'Jem śniadanie o siódmej.'],
      lessons: [
        { id: 'pl_a2_m7_l1', type: 'choice', prompt: { es: '¿Qué significa "Wstaję rano"?' }, options: ['Me levanto por la mañana', 'Me acuesto tarde', 'Desayuno', 'Trabajo'], correct: 0, audio: 'Wstaję rano' },
        { id: 'pl_a2_m7_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Desayuno por la mañana"' }, answers: ['jem sniadanie rano', 'jem śniadanie rano'], audio: 'Jem śniadanie rano' }
      ]
    },
    {
      moduleId: 'pl_a2_m8',
      title: 'Módulo 8: Tiempo y clima',
      icon: '🌦️',
      grammarNote: 'Jest ciepło (hace calor), jest zimno (hace frío), pada (llueve).',
      listening: ['Dzisiaj jest ciepło.', 'Jutro będzie padać.'],
      lessons: [
        { id: 'pl_a2_m8_l1', type: 'choice', prompt: { es: '¿Cómo se dice "Hace frío"?' }, options: ['Jest zimno', 'Jest ciepło', 'Pada', 'Wieje'], correct: 0, audio: 'Jest zimno' },
        { id: 'pl_a2_m8_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Mañana va a llover"' }, answers: ['jutro bedzie padac', 'jutro będzie padać'], audio: 'Jutro będzie padać' }
      ]
    },
    {
      moduleId: 'pl_a2_m9',
      title: 'Módulo 9: Planes y futuro',
      icon: '📆',
      grammarNote: 'Jutro (mañana), w weekend (el fin de semana). Idę do kina (voy al cine).',
      listening: ['Jutro idę do kina.', 'W weekend jadę do Krakowa.'],
      lessons: [
        { id: 'pl_a2_m9_l1', type: 'choice', prompt: { es: '¿Qué significa "Jutro"?' }, options: ['Mañana', 'Ayer', 'Hoy', 'Pronto'], correct: 0, audio: 'Jutro' },
        { id: 'pl_a2_m9_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Voy al cine mañana"' }, answers: ['jutro ide do kina', 'jutro idę do kina'], audio: 'Jutro idę do kina' }
      ]
    },
    {
      moduleId: 'pl_a2_m10',
      title: 'Módulo 10: Repaso A2',
      icon: '🏆',
      grammarNote: 'Repaso de direcciones, compras, hotel, salud, aficiones, tren, rutina, clima y planes.',
      listening: ['Gdzie jest hotel?', 'Ile to kosztuje, proszę?'],
      lessons: [
        { id: 'pl_a2_m10_l1', type: 'choice', prompt: { es: '¿Qué significa "Ile to kosztuje?"' }, options: ['¿Cuánto cuesta?', '¿Dónde está?', '¿Qué es?', '¿Cuándo?'], correct: 0, audio: 'Ile to kosztuje' }
      ]
    }
  ]
};
