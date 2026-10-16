// src/data/topics.js
// Temas de interés y vida práctica. Cada uno tiene un color propio y un emoji.
export const TOPICS = [
  { id: 'compras', icon: '🛒', name: 'Compras y mercado', color: '#16A34A', desc: 'Pan, precios, pagar y pedir.' },
  { id: 'restaurantes', icon: '🍽️', name: 'Restaurantes y cafés', color: '#F97316', desc: 'Pedir, la cuenta, mesas.' },
  { id: 'viajes', icon: '🚆', name: 'Viajes y transporte', color: '#0EA5E9', desc: 'Billetes, estaciones, direcciones.' },
  { id: 'salud', icon: '🏥', name: 'Salud y farmacia', color: '#EF4444', desc: 'Médico, síntomas, farmacia.' },
  { id: 'trabajo', icon: '🏢', name: 'Trabajo y oficina', color: '#6366F1', desc: 'Reuniones, plazos, equipo.' },
  { id: 'casa', icon: '🏠', name: 'Casa y vecinos', color: '#A16207', desc: 'Hogar, alquiler, vecinos.' },
  { id: 'cultura', icon: '🎵', name: 'Música y cultura', color: '#DB2777', desc: 'Libros, cine, conciertos.' },
  { id: 'deporte', icon: '⚽', name: 'Deporte y aficiones', color: '#059669', desc: 'Equipos, partidos, entrenar.' },
  { id: 'amistad', icon: '💬', name: 'Amistad y conversación', color: '#7C3AED', desc: 'Charlar, quedar, saludar.' },
];

export const topicById = (id) => TOPICS.find((t) => t.id === id);
