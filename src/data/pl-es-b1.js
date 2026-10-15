// src/data/pl-es-b1.js
// Polaco para hispanohablantes, nivel B1 (módulos 1 a 3).

export const PL_ES_B1 = {
  modules: [
    {
      moduleId: 'pl_b1_m1',
      title: 'Módulo 1: Pasado (pasado simple)',
      icon: '⏪',
      grammarNote: 'El pasado se forma con -ł, -ła, -ło según el género: byłem (yo fui, masc.), byłam (yo fui, fem.). Wczoraj (ayer).',
      listening: ['Wczoraj byłem w kinie.', 'Byłam w domu.'],
      lessons: [
        { id: 'pl_b1_m1_l1', type: 'choice', prompt: { es: '¿Cómo dices "Ayer fui al cine" (hombre)?' }, options: ['Wczoraj byłem w kinie', 'Jutro idę do kina', 'Dzisiaj jem', 'Teraz śpię'], correct: 0, audio: 'Wczoraj byłem w kinie' },
        { id: 'pl_b1_m1_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Ayer estuve en casa" (mujer)' }, answers: ['wczoraj bylam w domu', 'wczoraj byłam w domu'], audio: 'Wczoraj byłam w domu' }
      ]
    },
    {
      moduleId: 'pl_b1_m2',
      title: 'Módulo 2: Opiniones',
      icon: '💬',
      grammarNote: 'Myślę, że... (Creo que...). Podoba mi się (Me gusta). Nie podoba mi się (No me gusta).',
      listening: ['Myślę, że to dobry pomysł.', 'Podoba mi się ta książka.'],
      lessons: [
        { id: 'pl_b1_m2_l1', type: 'choice', prompt: { es: '¿Cómo dices "Creo que es buena idea"?' }, options: ['Myślę, że to dobry pomysł', 'Nie wiem', 'Jestem głodny', 'Gdzie jest dworzec?'], correct: 0, audio: 'Myślę, że to dobry pomysł' },
        { id: 'pl_b1_m2_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Me gusta este libro"' }, answers: ['podoba mi sie ta ksiazka', 'podoba mi się ta książka'], audio: 'Podoba mi się ta książka' }
      ]
    },
    {
      moduleId: 'pl_b1_m3',
      title: 'Módulo 3: Pedir favores y disculparse',
      icon: '🙏',
      grammarNote: 'Czy mógłbyś...? (¿Podrías...?). Przepraszam, nie rozumiem (Perdón, no entiendo).',
      listening: ['Czy mógłbyś mi pomóc?', 'Przepraszam, nie rozumiem.'],
      lessons: [
        { id: 'pl_b1_m3_l1', type: 'choice', prompt: { es: '¿Cómo dices "Perdón, no entiendo"?' }, options: ['Przepraszam, nie rozumiem', 'Dziękuję bardzo', 'Do widzenia', 'Dobranoc'], correct: 0, audio: 'Przepraszam, nie rozumiem' },
        { id: 'pl_b1_m3_l2', type: 'write', prompt: { es: 'Escribe en polaco: "¿Podrías ayudarme?" (formal)' }, answers: ['czy moglbys mi pomoc', 'czy mógłbyś mi pomóc', 'czy mogłbyś mi pomóc'], audio: 'Czy mógłbyś mi pomóc?' }
      ]
    }
  ]
};
