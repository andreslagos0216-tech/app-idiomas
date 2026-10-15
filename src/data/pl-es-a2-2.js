// src/data/pl-es-a2-2.js
// Polaco para hispanohablantes, nivel A2 (módulos 4 a 6).

export const PL_ES_A2_2 = {
  modules: [
    {
      moduleId: 'pl_a2_m4',
      title: 'Módulo 4: Salud',
      icon: '💊',
      grammarNote: 'Boli mnie głowa (Me duele la cabeza). Lekarz (médico), szpital (hospital).',
      listening: ['Boli mnie głowa.', 'Potrzebuję lekarza.'],
      lessons: [
        { id: 'pl_a2_m4_l1', type: 'choice', prompt: { es: '¿Qué significa "Boli mnie głowa"?' }, options: ['Me duele la cabeza', 'Tengo hambre', 'Estoy cansado', 'Tengo frío'], correct: 0, audio: 'Boli mnie głowa' },
        { id: 'pl_a2_m4_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Necesito un médico"' }, answers: ['potrzebuje lekarza', 'potrzebuję lekarza'], audio: 'Potrzebuję lekarza' }
      ]
    },
    {
      moduleId: 'pl_a2_m5',
      title: 'Módulo 5: Aficiones',
      icon: '⚽',
      grammarNote: 'Lubię (me gusta / disfruto). Sport (deporte), muzyka (música), książka (libro).',
      listening: ['Lubię muzykę.', 'Czytam książki.'],
      lessons: [
        { id: 'pl_a2_m5_l1', type: 'choice', prompt: { es: '¿Cómo se dice "libro" en polaco?' }, options: ['Książka', 'Film', 'Muzyka', 'Dom'], correct: 0, audio: 'Książka' },
        { id: 'pl_a2_m5_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Me gusta la música"' }, answers: ['lubie muzyke', 'lubię muzykę'], audio: 'Lubię muzykę' }
      ]
    },
    {
      moduleId: 'pl_a2_m6',
      title: 'Módulo 6: Tren y estación',
      icon: '🚆',
      grammarNote: 'Gdzie jest dworzec? (¿Dónde está la estación?). Bilet do... (Billete para...). Pociąg (tren).',
      listening: ['Gdzie jest dworzec?', 'Bilet do Krakowa, proszę.'],
      lessons: [
        { id: 'pl_a2_m6_l1', type: 'choice', prompt: { es: '¿Cómo preguntas "¿Dónde está la estación?"?' }, options: ['Gdzie jest dworzec?', 'Ile to kosztuje?', 'Co to jest?', 'Kiedy wraca?'], correct: 0, audio: 'Gdzie jest dworzec?' },
        { id: 'pl_a2_m6_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Un billete para Cracovia, por favor"' }, answers: ['bilet do krakowa proszę', 'bilet do krakowa, proszę', 'bilet do krakowa prosze'], audio: 'Bilet do Krakowa, proszę' }
      ]
    }
  ]
};

