// src/data/pl-es-b1-2.js
// Polaco para hispanohablantes, nivel B1 (módulos 4 a 6).

export const PL_ES_B1_2 = {
  modules: [
    {
      moduleId: 'pl_b1_m4',
      title: 'Módulo 4: Futuro',
      icon: '🔮',
      grammarNote: 'Będę (seré / estaré), będzie (será). Za tydzień (dentro de una semana).',
      listening: ['Będę w domu jutro.', 'Za tydzień jadę do Krakowa.'],
      lessons: [
        { id: 'pl_b1_m4_l1', type: 'choice', prompt: { es: '¿Cómo dices "Estaré en casa mañana"?' }, options: ['Będę w domu jutro', 'Byłem w domu wczoraj', 'Jem w domu', 'Idę do kina'], correct: 0, audio: 'Będę w domu jutro' },
        { id: 'pl_b1_m4_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Dentro de una semana viajo a Cracovia"' }, answers: ['za tydzien jade do krakowa', 'za tydzień jadę do krakowa', 'za tydzień jadę do Krakowa'], audio: 'Za tydzień jadę do Krakowa' }
      ]
    },
    {
      moduleId: 'pl_b1_m5',
      title: 'Módulo 5: Salud y cuerpo',
      icon: '🩺',
      grammarNote: 'Boli mnie... (me duele...). Czuję się źle (me siento mal). Powinienem odpocząć (debería descansar).',
      listening: ['Boli mnie gardło.', 'Czuję się źle, muszę odpocząć.'],
      lessons: [
        { id: 'pl_b1_m5_l1', type: 'choice', prompt: { es: '¿Qué significa "Boli mnie gardło"?' }, options: ['Me duele la garganta', 'Me duele el brazo', 'Tengo sueño', 'Tengo frío'], correct: 0, audio: 'Boli mnie gardło' },
        { id: 'pl_b1_m5_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Me siento mal"' }, answers: ['czuje sie zle', 'czuję się źle'], audio: 'Czuję się źle' }
      ]
    },
    {
      moduleId: 'pl_b1_m6',
      title: 'Módulo 6: Trabajo y estudios',
      icon: '🏢',
      grammarNote: 'Pracuję w biurze (trabajo en una oficina). Studiuję polski (estudio polaco). Muszę + infinitivo (tengo que).',
      listening: ['Pracuję w biurze.', 'Studiuję polski na uniwersytecie.'],
      lessons: [
        { id: 'pl_b1_m6_l1', type: 'choice', prompt: { es: '¿Cómo dices "Trabajo en una oficina"?' }, options: ['Pracuję w biurze', 'Pracuję w szpitalu', 'Jem w biurze', 'Śpię w pracy'], correct: 0, audio: 'Pracuję w biurze' },
        { id: 'pl_b1_m6_l2', type: 'write', prompt: { es: 'Escribe en polaco: "Estudio polaco"' }, answers: ['studiuje polski', 'studiuję polski'], audio: 'Studiuję polski' }
      ]
    }
  ]
};
