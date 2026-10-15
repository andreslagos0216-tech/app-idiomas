// src/data/pl-es-a2.js
// Polaco para hispanohablantes, nivel A2.

export const PL_ES_A2 = {
  id: 'pl-es',
  nativeLang: 'es',
  targetLang: 'pl',
  targetLangCode: 'pl-PL',
  level: 'A2',
  title: 'Polaco para hispanohablantes • A2',
  modules: [
    {
      moduleId: 'pl_a2_m1',
      title: 'Módulo 1: Direcciones',
      icon: '🗺️',
      grammarNote: 'Gdzie jest...? (¿Dónde está...?). Idź prosto (Ve recto), w lewo (a la izquierda).',
      listening: ['Gdzie jest apteka?', 'Idź prosto, potem w lewo.'],
      lessons: [
        { id: 'pl_a2_m1_l1', type: 'choice', prompt: { es: '¿Cómo preguntas "¿Dónde está la farmacia?"?' }, options: ['Gdzie jest apteka?', 'Co to jest?', 'Kiedy idziemy?', 'Jak się masz?'], correct: 0, audio: 'Gdzie jest apteka?' },
        { id: 'pl_a2_m1_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Sigue recto"' }, answers: ['idź prosto', 'idz prosto'], audio: 'Idź prosto' }
      ]
    },
    {
      moduleId: 'pl_a2_m2',
      title: 'Módulo 2: Compras y precios',
      icon: '🛍️',
      grammarNote: 'Ile to kosztuje? (¿Cuánto cuesta?). Za drogo (Demasiado caro).',
      listening: ['Ile to kosztuje?', 'To jest za drogo.'],
      lessons: [
        { id: 'pl_a2_m2_l1', type: 'choice', prompt: { es: '¿Cómo preguntas el precio de un producto?' }, options: ['Ile to kosztuje?', 'Gdzie to jest?', 'Kto to kupuje?', 'Jaki kolor?'], correct: 0, audio: 'Ile to kosztuje?' },
        { id: 'pl_a2_m2_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Es demasiado caro"' }, answers: ['to jest za drogo', 'to jest za drogo.'], audio: 'To jest za drogo' }
      ]
    },
    {
      moduleId: 'pl_a2_m3',
      title: 'Módulo 3: En el hotel',
      icon: '🏨',
      grammarNote: 'Mam rezerwację (Tengo una reserva). Pokój (habitación). Klucz (llave).',
      listening: ['Mam rezerwację.', 'Poproszę klucz do pokoju.'],
      lessons: [
        { id: 'pl_a2_m3_l1', type: 'choice', prompt: { es: '¿Cómo dices "Tengo una reserva"?' }, options: ['Mam rezerwację', 'Szukam pokoju', 'Gdzie jest basen?', 'Rachunek, proszę'], correct: 0, audio: 'Mam rezerwację' },
        { id: 'pl_a2_m3_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Una habitación, por favor"' }, answers: ['pokój, proszę', 'pokoj, prosze', 'pokoj proszę'], audio: 'Pokój, proszę' }
      ]
    }
  ]
};
