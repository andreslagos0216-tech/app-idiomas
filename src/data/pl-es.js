// src/data/pl-es.js
// Polaco para hispanohablantes, nivel A1.

export const PL_ES_A1 = {
  id: 'pl-es',
  nativeLang: 'es',
  targetLang: 'pl',
  targetLangCode: 'pl-PL',
  level: 'A1',
  title: 'Polaco para hispanohablantes • A1',
  modules: [
    {
      moduleId: 'pl_a1_m1',
      title: 'Módulo 1: Saludos, presentaciones y cortesía',
      icon: '👋',
      grammarNote: 'Cześć (Hola informal) y Dzień dobry (Buenos días, formal).',
      listening: ['Cześć, jak się masz?', 'Dzień dobry, miło mi.'],
      lessons: [
        { id: 'pl_a1_m1_l1', type: 'choice', prompt: { es: '¿Cómo dices "Hola" de forma informal?' }, options: ['Cześć', 'Dziękuję', 'Dobranoc', 'Przepraszam'], correct: 0, audio: 'Cześć' },
        { id: 'pl_a1_m1_l2', type: 'voice', prompt: { es: 'Repite la frase: "Me llamo Carlos"' }, audio: 'Mam na imię Carlos' },
        { id: 'pl_a1_m1_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Gracias"' }, answers: ['dziękuję', 'dziekuje'], audio: 'Dziękuję' }
      ]
    },
    {
      moduleId: 'pl_a1_m2',
      title: 'Módulo 2: Cafés y restaurantes',
      icon: '☕',
      grammarNote: 'Proszę sirve para pedir algo o decir "por favor".',
      listening: ['Poproszę kawę.', 'Rachunek, proszę.'],
      lessons: [
        { id: 'pl_a1_m2_l1', type: 'choice', prompt: { es: '¿Cómo pides "Un café con leche, por favor"?' }, options: ['Kawa z mlekiem, proszę', 'Herbata', 'Woda', 'Sok'], correct: 0, audio: 'Kawa z mlekiem, proszę' },
        { id: 'pl_a1_m2_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Quiero la cuenta, por favor"' }, answers: ['poproszę rachunek', 'poprosze rachunek'], audio: 'Poproszę rachunek' }
      ]
    },
    {
      moduleId: 'pl_a1_m3',
      title: 'Módulo 3: Números',
      icon: '🔢',
      grammarNote: 'Jeden (1), dwa (2), trzy (3), cztery (4), pięć (5).',
      listening: ['Jeden, dwa, trzy.', 'Cztery, pięć.'],
      lessons: [
        { id: 'pl_a1_m3_l1', type: 'choice', prompt: { es: '¿Cómo se dice "tres"?' }, options: ['Trzy', 'Jeden', 'Pięć', 'Dziesięć'], correct: 0, audio: 'Trzy' }
      ]
    },
    {
      moduleId: 'pl_a1_m4',
      title: 'Módulo 4: Días de la semana',
      icon: '📅',
      grammarNote: 'Poniedziałek (lunes), wtorek (martes), środa (miércoles).',
      listening: ['Poniedziałek, wtorek, środa.', 'Dzisiaj jest piątek.'],
      lessons: [
        { id: 'pl_a1_m4_l1', type: 'choice', prompt: { es: '¿Qué día es "Piątek"?' }, options: ['Viernes', 'Martes', 'Miércoles', 'Domingo'], correct: 0, audio: 'Piątek' }
      ]
    },
    {
      moduleId: 'pl_a1_m5',
      title: 'Módulo 5: Familia',
      icon: '👨‍👩‍👦',
      grammarNote: 'Matka (madre), ojciec (padre), brat (hermano).',
      listening: ['Mój brat ma dwadzieścia lat.', 'To jest moja mama.'],
      lessons: [
        { id: 'pl_a1_m5_l1', type: 'choice', prompt: { es: '¿Cómo se dice "hermano"?' }, options: ['Brat', 'Siostra', 'Tata', 'Dziadek'], correct: 0, audio: 'Brat' }
      ]
    },
    {
      moduleId: 'pl_a1_m6',
      title: 'Módulo 6: Profesiones',
      icon: '💼',
      grammarNote: 'Jestem lekarzem (soy médico), jestem kierowcą (soy conductor).',
      listening: ['Jestem lekarzem.', 'Jestem kierowcą.'],
      lessons: [
        { id: 'pl_a1_m6_l1', type: 'choice', prompt: { es: '¿Cómo se dice "conductor"?' }, options: ['Kierowca', 'Nauczyciel', 'Lekarz', 'Inżynier'], correct: 0, audio: 'Kierowca' }
      ]
    },
    {
      moduleId: 'pl_a1_m7',
      title: 'Módulo 7: La casa',
      icon: '🏠',
      grammarNote: 'Dom (casa), kuchnia (cocina), sypialnia (dormitorio).',
      listening: ['Jestem w kuchni.', 'Sypialnia jest duża.'],
      lessons: [
        { id: 'pl_a1_m7_l1', type: 'choice', prompt: { es: '¿Cómo se dice "cocina"?' }, options: ['Kuchnia', 'Salon', 'Łazienka', 'Ogród'], correct: 0, audio: 'Kuchnia' }
      ]
    },
    {
      moduleId: 'pl_a1_m8',
      title: 'Módulo 8: Ropa',
      icon: '👕',
      grammarNote: 'Koszula (camisa), buty (zapatos), kurtka (chaqueta).',
      listening: ['Mam nowe buty.', 'Ta kurtka jest ciepła.'],
      lessons: [
        { id: 'pl_a1_m8_l1', type: 'choice', prompt: { es: '¿Qué significa "buty"?' }, options: ['Zapatos', 'Camisa', 'Pantalones', 'Sombrero'], correct: 0, audio: 'Buty' }
      ]
    },
    {
      moduleId: 'pl_a1_m9',
      title: 'Módulo 9: Clima',
      icon: '🌤️',
      grammarNote: 'Zima (invierno), lato (verano), pada deszcz (llueve).',
      listening: ['Dzisiaj pada deszcz.', 'Jest gorąco.'],
      lessons: [
        { id: 'pl_a1_m9_l1', type: 'choice', prompt: { es: '¿Cómo se dice "hace calor"?' }, options: ['Jest gorąco', 'Jest zimno', 'Pada deszcz', 'Wieje wiatr'], correct: 0, audio: 'Jest gorąco' }
      ]
    },
    {
      moduleId: 'pl_a1_m10',
      title: 'Módulo 10: Repaso y consolidación A1',
      icon: '🏆',
      grammarNote: 'Repaso de las estructuras de supervivencia del nivel.',
      listening: ['Do widzenia!', 'Do zobaczenia!'],
      lessons: [
        { id: 'pl_a1_m10_l1', type: 'choice', prompt: { es: '¿Qué significa "Do widzenia"?' }, options: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 0, audio: 'Do widzenia' }
      ]
    }
  ]
};