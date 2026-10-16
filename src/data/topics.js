// src/data/topics.js
// Temas de interés con subtemas, vocabulario y frases de muestra. Cada tema enseña su propio contenido.
export const TOPICS = [
  {
    id: 'compras', icon: '🛒', name: 'Compras y mercado', color: '#16A34A', level: 'A1',
    desc: 'Pan, precios, pagar y pedir en la tienda.',
    subtopics: ['Pedir en la tienda', 'Preguntar precios', 'Pagar', 'Devolver algo'],
    words: [
      { pl: 'chleb', es: 'pan' },
      { pl: 'ile to kosztuje?', es: '¿cuánto cuesta?' },
      { pl: 'drogo', es: 'caro' },
    ],
    sample: { pl: 'Ile to kosztuje?', es: '¿Cuánto cuesta?' },
  },
  {
    id: 'restaurantes', icon: '🍽️', name: 'Restaurantes y cafés', color: '#F97316', level: 'A1',
    desc: 'Pedir, la cuenta y hablar con el camarero.',
    subtopics: ['Pedir comida', 'Pedir bebida', 'La cuenta', 'Reservar mesa'],
    words: [
      { pl: 'kawa', es: 'café' },
      { pl: 'rachunek', es: 'cuenta' },
      { pl: 'poproszę', es: 'quisiera' },
    ],
    sample: { pl: 'Poproszę kawę.', es: 'Quisiera un café.' },
  },
  {
    id: 'viajes', icon: '🚆', name: 'Viajes y transporte', color: '#0EA5E9', level: 'A2',
    desc: 'Billetes, estaciones, direcciones y hoteles.',
    subtopics: ['Comprar billete', 'Preguntar direcciones', 'Hotel', 'Aeropuerto'],
    words: [
      { pl: 'dworzec', es: 'estación' },
      { pl: 'bilet', es: 'billete' },
      { pl: 'w lewo', es: 'a la izquierda' },
    ],
    sample: { pl: 'Gdzie jest dworzec?', es: '¿Dónde está la estación?' },
  },
  {
    id: 'salud', icon: '🏥', name: 'Salud y farmacia', color: '#EF4444', level: 'A2',
    desc: 'Médico, síntomas y farmacia.',
    subtopics: ['Describir síntomas', 'Cita con el médico', 'Farmacia', 'Emergencias'],
    words: [
      { pl: 'lekarz', es: 'médico' },
      { pl: 'boli mnie głowa', es: 'me duele la cabeza' },
      { pl: 'apteka', es: 'farmacia' },
    ],
    sample: { pl: 'Boli mnie głowa.', es: 'Me duele la cabeza.' },
  },
  {
    id: 'trabajo', icon: '🏢', name: 'Trabajo y oficina', color: '#6366F1', level: 'B1',
    desc: 'Reuniones, plazos, correos y entrevistas.',
    subtopics: ['Reuniones', 'Correos cortos', 'Plazos y proyectos', 'Entrevista de trabajo'],
    words: [
      { pl: 'spotkanie', es: 'reunión' },
      { pl: 'projekt', es: 'proyecto' },
      { pl: 'termin', es: 'plazo' },
    ],
    sample: { pl: 'Kiedy projekt będzie gotowy?', es: '¿Cuándo estará listo el proyecto?' },
  },
  {
    id: 'casa', icon: '🏠', name: 'Casa y vecinos', color: '#A16207', level: 'A1',
    desc: 'Hogar, alquiler, vecinos y arreglos.',
    subtopics: ['Hablar de tu casa', 'Alquiler', 'Vecinos', 'Reparaciones'],
    words: [
      { pl: 'dom', es: 'casa' },
      { pl: 'kuchnia', es: 'cocina' },
      { pl: 'klucz', es: 'llave' },
    ],
    sample: { pl: 'Jestem w domu.', es: 'Estoy en casa.' },
  },
  {
    id: 'cultura', icon: '🎵', name: 'Música y cultura', color: '#DB2777', level: 'A2',
    desc: 'Libros, cine, conciertos y gustos.',
    subtopics: ['Gustos', 'Cine', 'Libros', 'Conciertos'],
    words: [
      { pl: 'muzyka', es: 'música' },
      { pl: 'książka', es: 'libro' },
      { pl: 'kino', es: 'cine' },
    ],
    sample: { pl: 'Lubię muzykę.', es: 'Me gusta la música.' },
  },
  {
    id: 'deporte', icon: '⚽', name: 'Deporte y aficiones', color: '#059669', level: 'A2',
    desc: 'Equipos, partidos y entrenar.',
    subtopics: ['Practicar deporte', 'Ver partidos', 'Quedar para jugar'],
    words: [
      { pl: 'sport', es: 'deporte' },
      { pl: 'mecz', es: 'partido' },
      { pl: 'drużyna', es: 'equipo' },
    ],
    sample: { pl: 'Lubię sport.', es: 'Me gusta el deporte.' },
  },
  {
    id: 'amistad', icon: '💬', name: 'Amistad y conversación', color: '#7C3AED', level: 'A1',
    desc: 'Saludar, charlar y quedar con amigos.',
    subtopics: ['Saludar', 'Presentarte', 'Quedar con amigos', 'Charlar del día'],
    words: [
      { pl: 'cześć', es: 'hola' },
      { pl: 'miło mi', es: 'encantado' },
      { pl: 'do zobaczenia', es: 'hasta luego' },
    ],
    sample: { pl: 'Cześć, jak się masz?', es: 'Hola, ¿cómo estás?' },
  },
];

export const topicById = (id) => TOPICS.find((t) => t.id === id);
