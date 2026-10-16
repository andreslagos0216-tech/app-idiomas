// src/data/topicMap.js
// Asigna cada módulo a un tema de interés. Sin modificar los archivos de módulos.
export const MODULE_TOPIC = {
  pl_a1_m1: 'amistad',
  pl_a1_m2: 'restaurantes',
  pl_a1_m3: 'compras',
  pl_a1_m4: 'trabajo',
  pl_a1_m5: 'casa',
  pl_a1_m6: 'trabajo',
  pl_a1_m7: 'casa',
  pl_a1_m8: 'compras',
  pl_a1_m9: 'viajes',
  pl_a1_m10: 'amistad',
  pl_a2_m1: 'viajes',
  pl_a2_m2: 'compras',
  pl_a2_m3: 'viajes',
  pl_a2_m4: 'salud',
  pl_a2_m5: 'cultura',
  pl_a2_m6: 'viajes',
  pl_a2_m7: 'casa',
  pl_a2_m8: 'amistad',
  pl_a2_m9: 'cultura',
  pl_a2_m10: 'viajes',
  pl_b1_m1: 'trabajo',
  pl_b1_m2: 'amistad',
  pl_b1_m3: 'amistad',
  pl_b1_m4: 'trabajo',
  pl_b1_m5: 'salud',
  pl_b1_m6: 'trabajo',
};

export const topicOfModule = (moduleId) => MODULE_TOPIC[moduleId] || null;
