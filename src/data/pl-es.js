// src/data/pl-es.js
// Polaco para hispanohablantes · Nivel A1 · 10 módulos
// Cada módulo tiene nota gramatical, frases de escucha y 4 lecciones.
// El dictado y la repetición se generan automáticamente a partir de "listening".

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
      title: 'Módulo 1: Saludos y presentaciones',
      icon: '👋',
      grammarNote: 'Cześć (hola, informal). Dzień dobry (buenos días, formal). Nazywam się... (me llamo...). Miło mi (encantado).',
      listening: ['Cześć, jak się masz?', 'Dzień dobry, miło mi.', 'Nazywam się Carlos.'],
      lessons: [
        { id: 'pl_a1_m1_l1', type: 'choice', prompt: { es: '¿Cómo dices "Hola" de forma informal?' }, options: ['Cześć', 'Dziękuję', 'Dobranoc', 'Przepraszam'], correct: 0, audio: 'Cześć' },
        { id: 'pl_a1_m1_l2', type: 'choice', prompt: { es: '¿Qué significa "Miło mi"?' }, options: ['Encantado', 'Buenas noches', 'Perdón', 'Gracias'], correct: 0, audio: 'Miło mi' },
        { id: 'pl_a1_m1_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Me llamo Carlos"' }, answers: ['nazywam sie carlos', 'nazywam się carlos'], audio: 'Nazywam się Carlos' },
        { id: 'pl_a1_m1_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Dzień dobry' }
      ]
    },
    {
      moduleId: 'pl_a1_m2',
      title: 'Módulo 2: Cafés y restaurantes',
      icon: '☕',
      grammarNote: 'Poproszę (quisiera, por favor). Rachunek (la cuenta). Proszę (por favor / aquí tiene).',
      listening: ['Poproszę kawę.', 'Rachunek, proszę.', 'Czy mogę zamówić?'],
      lessons: [
        { id: 'pl_a1_m2_l1', type: 'choice', prompt: { es: '¿Cómo pides "Un café, por favor"?' }, options: ['Poproszę kawę', 'Gdzie jest kawa?', 'Dobranoc', 'Miło mi'], correct: 0, audio: 'Poproszę kawę' },
        { id: 'pl_a1_m2_l2', type: 'choice', prompt: { es: '¿Cómo pides la cuenta?' }, options: ['Rachunek, proszę', 'Dzień dobry', 'Przepraszam', 'Do widzenia'], correct: 0, audio: 'Rachunek, proszę' },
        { id: 'pl_a1_m2_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Quiero la cuenta"' }, answers: ['poproszę rachunek', 'poprosze rachunek'], audio: 'Poproszę rachunek' },
        { id: 'pl_a1_m2_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Poproszę kawę' }
      ]
    },
    {
      moduleId: 'pl_a1_m3',
      title: 'Módulo 3: Números',
      icon: '🔢',
      grammarNote: 'Jeden (1), dwa (2), trzy (3), cztery (4), pięć (5), sześć (6), siedem (7), osiem (8), dziewięć (9), dziesięć (10).',
      listening: ['Jeden, dwa, trzy.', 'Cztery, pięć, sześć.', 'Siedem, osiem, dziewięć, dziesięć.'],
      lessons: [
        { id: 'pl_a1_m3_l1', type: 'choice', prompt: { es: '¿Cómo se dice "tres"?' }, options: ['Trzy', 'Jeden', 'Pięć', 'Dziesięć'], correct: 0, audio: 'Trzy' },
        { id: 'pl_a1_m3_l2', type: 'choice', prompt: { es: '¿Qué número es "osiem"?' }, options: ['8', '6', '9', '10'], correct: 0, audio: 'Osiem' },
        { id: 'pl_a1_m3_l3', type: 'write', prompt: { es: 'Escribe en polaco el número 7' }, answers: ['siedem'], audio: 'Siedem' },
        { id: 'pl_a1_m3_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Cztery, pięć' }
      ]
    },
    {
      moduleId: 'pl_a1_m4',
      title: 'Módulo 4: Días de la semana',
      icon: '📅',
      grammarNote: 'Poniedziałek (lunes), wtorek (martes), środa (miércoles), czwartek (jueves), piątek (viernes), sobota (sábado), niedziela (domingo).',
      listening: ['Dzisiaj jest piątek.', 'Jutro jest sobota.', 'W niedzielę nie pracuję.'],
      lessons: [
        { id: 'pl_a1_m4_l1', type: 'choice', prompt: { es: '¿Qué día es "Piątek"?' }, options: ['Viernes', 'Martes', 'Miércoles', 'Domingo'], correct: 0, audio: 'Piątek' },
        { id: 'pl_a1_m4_l2', type: 'choice', prompt: { es: '¿Cómo se dice "domingo"?' }, options: ['Niedziela', 'Sobota', 'Środa', 'Poniedziałek'], correct: 0, audio: 'Niedziela' },
        { id: 'pl_a1_m4_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Hoy es lunes"' }, answers: ['dzisiaj jest poniedzialek', 'dzisiaj jest poniedziałek'], audio: 'Dzisiaj jest poniedziałek' },
        { id: 'pl_a1_m4_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Dzisiaj jest piątek' }
      ]
    },
    {
      moduleId: 'pl_a1_m5',
      title: 'Módulo 5: Familia',
      icon: '👨‍👩‍👦',
      grammarNote: 'Mama (mamá), tata (papá), brat (hermano), siostra (hermana). To jest moja mama (Esta es mi mamá).',
      listening: ['To jest moja mama.', 'Mój brat ma dwadzieścia lat.', 'Moja siostra jest miła.'],
      lessons: [
        { id: 'pl_a1_m5_l1', type: 'choice', prompt: { es: '¿Cómo se dice "hermano"?' }, options: ['Brat', 'Siostra', 'Tata', 'Dziadek'], correct: 0, audio: 'Brat' },
        { id: 'pl_a1_m5_l2', type: 'choice', prompt: { es: '¿Qué significa "Moja mama"?' }, options: ['Mi mamá', 'Mi hermano', 'Mi abuelo', 'Mi tía'], correct: 0, audio: 'Moja mama' },
        { id: 'pl_a1_m5_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Mi hermana"' }, answers: ['moja siostra'], audio: 'Moja siostra' },
        { id: 'pl_a1_m5_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'To jest moja mama' }
      ]
    },
    {
      moduleId: 'pl_a1_m6',
      title: 'Módulo 6: Profesiones',
      icon: '💼',
      grammarNote: 'Jestem lekarzem (soy médico). Jestem kierowcą (soy conductor). Jestem nauczycielem (soy profesor). Se usa "jestem" + profesión.',
      listening: ['Jestem lekarzem.', 'Jestem kierowcą.', 'Jestem nauczycielem.'],
      lessons: [
        { id: 'pl_a1_m6_l1', type: 'choice', prompt: { es: '¿Cómo se dice "conductor"?' }, options: ['Kierowca', 'Nauczyciel', 'Lekarz', 'Inżynier'], correct: 0, audio: 'Kierowca' },
        { id: 'pl_a1_m6_l2', type: 'choice', prompt: { es: '¿Qué significa "Jestem lekarzem"?' }, options: ['Soy médico', 'Soy profesor', 'Soy conductor', 'Soy ingeniero'], correct: 0, audio: 'Jestem lekarzem' },
        { id: 'pl_a1_m6_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Soy profesor"' }, answers: ['jestem nauczycielem'], audio: 'Jestem nauczycielem' },
        { id: 'pl_a1_m6_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Jestem kierowcą' }
      ]
    },
    {
      moduleId: 'pl_a1_m7',
      title: 'Módulo 7: La casa',
      icon: '🏠',
      grammarNote: 'Dom (casa), kuchnia (cocina), sypialnia (dormitorio), łazienka (baño). Jestem w domu (estoy en casa).',
      listening: ['Jestem w domu.', 'Kuchnia jest duża.', 'Sypialnia jest mała.'],
      lessons: [
        { id: 'pl_a1_m7_l1', type: 'choice', prompt: { es: '¿Cómo se dice "cocina"?' }, options: ['Kuchnia', 'Salon', 'Łazienka', 'Ogród'], correct: 0, audio: 'Kuchnia' },
        { id: 'pl_a1_m7_l2', type: 'choice', prompt: { es: '¿Qué significa "łazienka"?' }, options: ['Baño', 'Dormitorio', 'Cocina', 'Jardín'], correct: 0, audio: 'Łazienka' },
        { id: 'pl_a1_m7_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Estoy en casa"' }, answers: ['jestem w domu'], audio: 'Jestem w domu' },
        { id: 'pl_a1_m7_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Kuchnia jest duża' }
      ]
    },
    {
      moduleId: 'pl_a1_m8',
      title: 'Módulo 8: Ropa',
      icon: '👕',
      grammarNote: 'Koszula (camisa), buty (zapatos), kurtka (chaqueta), spodnie (pantalones). Mam (tengo).',
      listening: ['Mam nowe buty.', 'Ta kurtka jest ciepła.', 'Koszula jest niebieska.'],
      lessons: [
        { id: 'pl_a1_m8_l1', type: 'choice', prompt: { es: '¿Qué significa "buty"?' }, options: ['Zapatos', 'Camisa', 'Pantalones', 'Sombrero'], correct: 0, audio: 'Buty' },
        { id: 'pl_a1_m8_l2', type: 'choice', prompt: { es: '¿Cómo se dice "chaqueta"?' }, options: ['Kurtka', 'Koszula', 'Spodnie', 'Czapka'], correct: 0, audio: 'Kurtka' },
        { id: 'pl_a1_m8_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Tengo zapatos nuevos"' }, answers: ['mam nowe buty'], audio: 'Mam nowe buty' },
        { id: 'pl_a1_m8_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Ta kurtka jest ciepła' }
      ]
    },
    {
      moduleId: 'pl_a1_m9',
      title: 'Módulo 9: Clima',
      icon: '🌤️',
      grammarNote: 'Pada deszcz (llueve). Jest zimno (hace frío). Jest gorąco (hace calor). Świeci słońce (hay sol).',
      listening: ['Dzisiaj jest gorąco.', 'Pada deszcz.', 'Świeci słońce.'],
      lessons: [
        { id: 'pl_a1_m9_l1', type: 'choice', prompt: { es: '¿Cómo se dice "hace calor"?' }, options: ['Jest gorąco', 'Jest zimno', 'Pada deszcz', 'Wieje wiatr'], correct: 0, audio: 'Jest gorąco' },
        { id: 'pl_a1_m9_l2', type: 'choice', prompt: { es: '¿Qué significa "Pada deszcz"?' }, options: ['Llueve', 'Nieva', 'Hay sol', 'Hace viento'], correct: 0, audio: 'Pada deszcz' },
        { id: 'pl_a1_m9_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Hace frío"' }, answers: ['jest zimno'], audio: 'Jest zimno' },
        { id: 'pl_a1_m9_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Świeci słońce' }
      ]
    },
    {
      moduleId: 'pl_a1_m10',
      title: 'Módulo 10: Repaso y despedidas',
      icon: '🏆',
      grammarNote: 'Do widzenia (adiós). Do zobaczenia (hasta luego). Dobranoc (buenas noches). Repasa todo lo visto en el nivel.',
      listening: ['Do widzenia!', 'Do zobaczenia!', 'Dobranoc!'],
      lessons: [
        { id: 'pl_a1_m10_l1', type: 'choice', prompt: { es: '¿Qué significa "Do widzenia"?' }, options: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 0, audio: 'Do widzenia' },
        { id: 'pl_a1_m10_l2', type: 'choice', prompt: { es: '¿Cómo te despides hasta luego?' }, options: ['Do zobaczenia', 'Dzień dobry', 'Miło mi', 'Proszę'], correct: 0, audio: 'Do zobaczenia' },
        { id: 'pl_a1_m10_l3', type: 'write', prompt: { es: 'Escribe en polaco: "Gracias"' }, answers: ['dziękuję', 'dziekuje'], audio: 'Dziękuję' },
        { id: 'pl_a1_m10_l4', type: 'voice', prompt: { es: 'Repite la frase' }, audio: 'Do zobaczenia' }
      ]
    }
  ]
};