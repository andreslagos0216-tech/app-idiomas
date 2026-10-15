export const COURSES_DATA = {
  pl: {
    id: 'pl',
    name: 'Polaco',
    flag: '🇵🇱',
    targetAudience: 'Para Hispanohablantes',
    levels: [
      {
        levelId: 'A1',
        title: 'Nivel A1 • Fundamentos y Supervivencia',
        description: '10 Módulos • Supervivencia y Socialización',
        modules: [
          {
            moduleId: 'pl_a1_m1',
            moduleTitle: 'Módulo 1: Saludos, Presentaciones y Cortesía',
            icon: '👋',
            grammarNote: 'Usa "Cześć" (Hola informal) y "Dzień dobry" (Buenos días / Formal).',
            lessons: [
              { id: 'pl_a1_m1_l1', type: 'choice', title: 'Lección 1: Saludos', question: '¿Cómo dices "Hola" de forma informal?', options: ['Cześć', 'Dziękuję', 'Dobranoc', 'Przepraszam'], correct: 0 },
              { id: 'pl_a1_m1_l2', type: 'voice', title: 'Lección 2: Presentación', question: 'Pronuncia: "Mam na imię Carlos"', targetPhrase: 'Mam na imię Carlos', options: ['Micrófono Cuántico'], correct: 0 },
              { id: 'pl_a1_m1_l3', type: 'write', title: 'Lección 3: Ortografía', question: 'Escribe en polaco: "Gracias"', correctAnswer: 'dziękuję' }
            ]
          },
          {
            moduleId: 'pl_a1_m2',
            moduleTitle: 'Módulo 2: Gastronomía, Café y Bares',
            icon: '☕',
            grammarNote: 'La palabra "Proszę" sirve para pedir por favor o entregar algo.',
            lessons: [
              { id: 'pl_a1_m2_l1', type: 'choice', title: 'Lección 1: Pedir Café', question: '¿Cómo pides "Un café con leche, por favor"?', options: ['Kawa z mlekiem, proszę', 'Herbata', 'Woda', 'Sok'], correct: 0 },
              { id: 'pl_a1_m2_l2', type: 'write', title: 'Lección 2: La Cuenta', question: 'Escribe en polaco: "Quiero la cuenta, por favor"', correctAnswer: 'poproszę rachunek' }
            ]
          },
          {
            moduleId: 'pl_a1_m3',
            moduleTitle: 'Módulo 3: Números y Transacciones',
            icon: '🔢',
            grammarNote: 'Jeden (1), dwa (2), trzy (3), cztery (4), pięć (5).',
            lessons: [
              { id: 'pl_a1_m3_l1', type: 'choice', title: 'Lección 1: Dígitos', question: '¿Cómo se escribe el número "tres"?', options: ['Trzy', 'Jeden', 'Pięć', 'Dziesięć'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a1_m4',
            moduleTitle: 'Módulo 4: Días de la Semana y Rutinas',
            icon: '📅',
            grammarNote: 'Poniedziałek (Lunes), Wtorek (Martes), Środa (Miércoles).',
            lessons: [
              { id: 'pl_a1_m4_l1', type: 'choice', title: 'Lección 1: Calendario', question: '¿Qué día es "Piątek"?', options: ['Viernes', 'Martes', 'Miércoles', 'Domingo'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a1_m5',
            moduleTitle: 'Módulo 5: Familia y Entorno Cercano',
            icon: '👨‍👩‍👦',
            grammarNote: 'Matka/Mama (Madre), Ojciec/Tata (Padre), Brat (Hermano).',
            lessons: [
              { id: 'pl_a1_m5_l1', type: 'choice', title: 'Lección 1: Parentesco', question: '¿Cómo se traduce "Hermano"?', options: ['Brat', 'Siostra', 'Tata', 'Dziadek'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a1_m6',
            moduleTitle: 'Módulo 6: Profesiones y Ocupaciones',
            icon: '💼',
            grammarNote: 'Jestem lekarzem (Soy médico) / Jestem kierowcą (Soy conductor).',
            lessons: [
              { id: 'pl_a1_m6_l1', type: 'choice', title: 'Lección 1: Ocupaciones', question: '¿Cómo se dice "Conductor"?', options: ['Kierowca', 'Nauczyciel', 'Lekarz', 'Inżynier'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a1_m7',
            moduleTitle: 'Módulo 7: El Hogar y Habitaciones',
            icon: '🏠',
            grammarNote: 'Dom (Casa), Kuchnia (Cocina), Sypialnia (Dormitorio).',
            lessons: [
              { id: 'pl_a1_m7_l1', type: 'choice', title: 'Lección 1: Habitaciones', question: '¿Cómo se dice "Cocina"?', options: ['Kuchnia', 'Salon', 'Łazienka', 'Ogród'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a1_m8',
            moduleTitle: 'Módulo 8: Ropa e Indumentaria',
            icon: '👕',
            grammarNote: 'Koszula (Camisa), Buty (Zapatos), Kurtka (Chaqueta).',
            lessons: [
              { id: 'pl_a1_m8_l1', type: 'choice', title: 'Lección 1: Vestimenta', question: '¿Qué significa "Buty"?', options: ['Zapatos', 'Camisa', 'Pantalones', 'Sombrero'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a1_m9',
            moduleTitle: 'Módulo 9: Clima y Estaciones del Año',
            icon: '🌤️',
            grammarNote: 'Zima (Invierno), Lato (Verano), Pada deszcz (Llueve).',
            lessons: [
              { id: 'pl_a1_m9_l1', type: 'choice', title: 'Lección 1: Meteorología', question: '¿Cómo se dice "Hace calor"?', options: ['Jest gorąco', 'Jest zimno', 'Pada deszcz', 'Wieje wiatr'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a1_m10',
            moduleTitle: 'Módulo 10: Examen y Consolidación A1',
            icon: '🏆',
            grammarNote: 'Repaso general de estructuras de supervivencia.',
            lessons: [
              { id: 'pl_a1_m10_l1', type: 'choice', title: 'Lección 1: Evaluación final', question: '¿Qué significa "Do widzenia"?', options: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 0 }
            ]
          }
        ]
      },
      {
        levelId: 'A2',
        title: 'Nivel A2 • Orientación Urbana y Viajes',
        description: '10 Módulos • Ciudad, Transporte, Hoteles y Salud',
        modules: [
          {
            moduleId: 'pl_a2_m1',
            moduleTitle: 'Módulo 1: Direcciones y Transporte',
            icon: '🗺️',
            grammarNote: 'Gdzie jest...? (¿Dónde está...?) / Prosto i w lewo (Todo recto y a la izquierda).',
            lessons: [
              { id: 'pl_a2_m1_l1', type: 'choice', title: 'Lección 1: Ubicación', question: '¿Cómo preguntas "¿Dónde está la farmacia?"', options: ['Gdzie jest apteka?', 'Co to jest?', 'Kiedy idziemy?', 'Jak się masz?'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m2',
            moduleTitle: 'Módulo 2: Compras, Tallas y Precios',
            icon: '🛍️',
            grammarNote: 'Ile to kosztuje? (¿Cuánto cuesta?) / Za drogo (Demasiado caro).',
            lessons: [
              { id: 'pl_a2_m2_l1', type: 'choice', title: 'Lección 1: Negociación', question: '¿Cómo preguntas el costo de un producto?', options: ['Ile to kosztuje?', 'Gdzie to jest?', 'Kto to kupuje?', 'Jaki kolor?'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m3',
            moduleTitle: 'Módulo 3: En el Hotel y Alojamientos',
            icon: '🏨',
            grammarNote: 'Rezerwacja pokoju (Reserva de habitación) / Klucz (Llave).',
            lessons: [
              { id: 'pl_a2_m3_l1', type: 'choice', title: 'Lección 1: Recepción', question: '¿Cómo dices "Tengo una reserva"?', options: ['Mam rezerwację', 'Szukam pokoju', 'Gdzie jest basen?', 'Rachunek proszę'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m4',
            moduleTitle: 'Módulo 4: Salud y Emergencias Médicas',
            icon: '💊',
            grammarNote: 'Lekarz (Médico) / Szpital (Hospital) / Boli mnie głowa (Me duele la cabeza).',
            lessons: [
              { id: 'pl_a2_m4_l1', type: 'choice', title: 'Lección 1: Síntomas', question: '¿Qué significa "Boli mnie głowa"?', options: ['Me duele la cabeza', 'Tengo hambre', 'Estoy cansado', 'Tengo frío'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m5',
            moduleTitle: 'Módulo 5: Aficiones y Tiempo Libre',
            icon: '⚽',
            grammarNote: 'Sport (Deporte), Muzyka (Música), Książka (Libro).',
            lessons: [
              { id: 'pl_a2_m5_l1', type: 'choice', title: 'Lección 1: Hobbies', question: '¿Cómo se dice "Libro" en polaco?', options: ['Książka', 'Film', 'Muzyka', 'Dom'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m6',
            moduleTitle: 'Módulo 6: Viajes en Tren y Aeropuerto',
            icon: '✈️',
            grammarNote: 'Bilet lotniczy (Boleto de avión) / Stacja kolejowa (Estación de tren).',
            lessons: [
              { id: 'pl_a2_m6_l1', type: 'choice', title: 'Lección 1: Transporte', question: '¿Qué significa "Bilet lotniczy"?', options: ['Boleto de avión', 'Pasaporte', 'Maleta', 'Taxi'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m7',
            moduleTitle: 'Módulo 7: Tecnología y Comunicaciones',
            icon: '📱',
            grammarNote: 'Telefon (Teléfono) / Internet (Internet) / Hasło (Contraseña).',
            lessons: [
              { id: 'pl_a2_m7_l1', type: 'choice', title: 'Lección 1: Conectividad', question: '¿Qué significa "Hasło"?', options: ['Contraseña', 'Pantalla', 'Cargador', 'Llamada'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m8',
            moduleTitle: 'Módulo 8: Restaurantes y Menús Especiales',
            icon: '🍲',
            grammarNote: 'Menu (Menú), Kelner (Camarero), Napiwek (Propina).',
            lessons: [
              { id: 'pl_a2_m8_l1', type: 'choice', title: 'Lección 1: Servicio', question: '¿Cómo se dice "Camarero"?', options: ['Kelner', 'Kucharz', 'Klient', 'Szef'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m9',
            moduleTitle: 'Módulo 9: Profesiones y Entornos de Trabajo',
            icon: '🏢',
            grammarNote: 'Biuro (Oficina), Spotkanie (Reunión), Szef (Jefe).',
            lessons: [
              { id: 'pl_a2_m9_l1', type: 'choice', title: 'Lección 1: Oficina', question: '¿Qué significa "Spotkanie"?', options: ['Reunión / Encuentro', 'Contrato', 'Oficina', 'Salario'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_a2_m10',
            moduleTitle: 'Módulo 10: Evaluación Final Nivel A2',
            icon: '🏆',
            grammarNote: 'Consolidación de la autonomía elemental en Polonia.',
            lessons: [
              { id: 'pl_a2_m10_l1', type: 'choice', title: 'Lección 1: Examen A2', question: '¿Qué significa "Za drogo"?', options: ['Demasiado caro', 'Muy barato', 'Excelente', 'Cerrado'], correct: 0 }
            ]
          }
        ]
      },
      {
        levelId: 'B1',
        title: 'Nivel B1 • Conversación Fluida y Debates',
        description: '10 Módulos • Opiniones, Emociones, Cultura y Trabajo',
        modules: [
          {
            moduleId: 'pl_b1_m1',
            moduleTitle: 'Módulo 1: Expresar Opiniones y Puntos de Vista',
            icon: '💡',
            grammarNote: 'Moim zdaniem... (En mi opinión) / Zgadzam się z tobą (De acuerdo).',
            lessons: [
              { id: 'pl_b1_m1_l1', type: 'choice', title: 'Lección 1: Debates', question: '¿Cómo dices "En mi opinión esto es excelente"?', options: ['Moim zdaniem to jest świetne', 'Nie mam zdania', 'To jest drogie', 'Gdzie jest dom?'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m2',
            moduleTitle: 'Módulo 2: Sentimientos y Estados de Animo',
            icon: '❤️',
            grammarNote: 'Szczęśliwy (Feliz), Smutny (Triste), Zmęczony (Cansado).',
            lessons: [
              { id: 'pl_b1_m2_l1', type: 'choice', title: 'Lección 1: Emociones', question: '¿Qué significa "Zmęczony"?', options: ['Cansado', 'Feliz', 'Enojado', 'Emocionado'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m3',
            moduleTitle: 'Módulo 3: Narrar Historias en Pasado',
            icon: '⏳',
            grammarNote: 'Byłem (Estuve/Fui) / Zrobiłem (Hice) / Widziałem (Vi).',
            lessons: [
              { id: 'pl_b1_m3_l1', type: 'choice', title: 'Lección 1: Tiempo Pasado', question: '¿Qué significa "Widziałem"?', options: ['Yo vi', 'Yo fui', 'Yo tuve', 'Yo dije'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m4',
            moduleTitle: 'Módulo 4: Planes y Futuro',
            icon: '🔮',
            grammarNote: 'Planuję (Planeo) / Będę robić (Haré / Estaré haciendo).',
            lessons: [
              { id: 'pl_b1_m4_l1', type: 'choice', title: 'Lección 1: Proyectos', question: '¿Qué significa "Planuję wakacje"?', options: ['Planeo unas vacaciones', 'Trabajo duro', 'Compro una casa', 'Estudio polaco'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m5',
            moduleTitle: 'Módulo 5: Cultura y Tradiciones Polacas',
            icon: '🥟',
            grammarNote: 'Pierogi, Barszcz, Wigilia (Nochebuena).',
            lessons: [
              { id: 'pl_b1_m5_l1', type: 'choice', title: 'Lección 1: Gastronomía típica', question: '¿Qué son los "Pierogi"?', options: ['Empanadillas tradicionales rellenas', 'Sopa de remolacha', 'Pan navideño', 'Bebida caliente'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m6',
            moduleTitle: 'Módulo 6: Problemas y Reclamaciones',
            icon: '⚠️',
            grammarNote: 'Reklamacja (Reclamación) / Problem (Problema) / Zwrot pieniędzy (Devolución).',
            lessons: [
              { id: 'pl_b1_m6_l1', type: 'choice', title: 'Lección 1: Servicio al cliente', question: '¿Qué significa "Zwrot pieniędzy"?', options: ['Devolución de dinero', 'Cambio de horario', 'Garantía extendida', 'Descuento'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m7',
            moduleTitle: 'Módulo 7: Educación y Estudios',
            icon: '🎓',
            grammarNote: 'Uniwersytet (Universidad) / Egzamin (Examen) / Dyplom (Título).',
            lessons: [
              { id: 'pl_b1_m7_l1', type: 'choice', title: 'Lección 1: Academia', question: '¿Qué significa "Egzamin"?', options: ['Examen / Prueba', 'Clase', 'Biblioteca', 'Beca'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m8',
            moduleTitle: 'Módulo 8: Ecología y Medio Ambiente',
            icon: '🌱',
            grammarNote: 'Ekologia (Ecología) / Recykling (Reciclaje) / Przyroda (Naturaleza).',
            lessons: [
              { id: 'pl_b1_m8_l1', type: 'choice', title: 'Lección 1: Sostenibilidad', question: '¿Qué significa "Recykling"?', options: ['Reciclaje', 'Contaminación', 'Energía solar', 'Bosque nativo'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m9',
            moduleTitle: 'Módulo 9: Medios de Comunicación y Noticias',
            icon: '📰',
            grammarNote: 'Wiadomości (Noticias) / Gazeta (Periódico) / Wywiad (Entrevista).',
            lessons: [
              { id: 'pl_b1_m9_l1', type: 'choice', title: 'Lección 1: Prensa', question: '¿Qué significa "Wiadomości"?', options: ['Noticias / Mensajes', 'Anuncios', 'Opiniones', 'Artículos'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b1_m10',
            moduleTitle: 'Módulo 10: Evaluación Final Nivel B1',
            icon: '🏆',
            grammarNote: 'Consolidación de la fluidez conversacional intermedia.',
            lessons: [
              { id: 'pl_b1_m10_l1', type: 'choice', title: 'Lección 1: Examen B1', question: '¿Qué significa "Zgadzam się"?', options: ['Estoy de acuerdo', 'No lo sé', 'Imposible', 'Tal vez'], correct: 0 }
            ]
          }
        ]
      },
      {
        levelId: 'B2',
        title: 'Nivel B2 • Ámbito Profesional y Corporativo',
        description: '10 Módulos • Negocios, Contratos, Finanzas y Liderazgo',
        modules: [
          {
            moduleId: 'pl_b2_m1',
            moduleTitle: 'Módulo 1: Entrevistas y Currículum Profesional',
            icon: '💼',
            grammarNote: 'Doświadczenie zawodowe (Experiencia laboral) / Umowa o pracę (Contrato).',
            lessons: [
              { id: 'pl_b2_m1_l1', type: 'choice', title: 'Lección 1: Perfil Profesional', question: '¿Cómo se dice "Experiencia laboral"?', options: ['Doświadczenie zawodowe', 'Szukam pracy', 'Umowa o pracę', 'Wykształcenie'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m2',
            moduleTitle: 'Módulo 2: Negociación de Contratos y Acuerdos',
            icon: '📄',
            grammarNote: 'Warunki umowy (Condiciones del contrato) / Negocjacje (Negociaciones).',
            lessons: [
              { id: 'pl_b2_m2_l1', type: 'choice', title: 'Lección 1: Acuerdos', question: '¿Qué significa "Warunki umowy"?', options: ['Las condiciones del contrato', 'El horario de oficina', 'El salario neto', 'La entrevista'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m3',
            moduleTitle: 'Módulo 3: Finanzas y Contabilidad Corporativa',
            icon: '📈',
            grammarNote: 'Budżet (Presupuesto) / Zysk (Beneficio/Ganancia) / Podatki (Impuestos).',
            lessons: [
              { id: 'pl_b2_m3_l1', type: 'choice', title: 'Lección 1: Economía', question: '¿Qué significa "Zysk"?', options: ['Beneficio / Ganancia', 'Pérdida', 'Inversión', 'Deuda'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m4',
            moduleTitle: 'Módulo 4: Liderazgo y Gestión de Equipos',
            icon: '👥',
            grammarNote: 'Zarządzanie (Gestión) / Lider (Líder) / Zespół (Equipo de trabajo).',
            lessons: [
              { id: 'pl_b2_m4_l1', type: 'choice', title: 'Lección 1: Management', question: '¿Qué significa "Zespół"?', options: ['Equipo de trabajo', 'Proyecto', 'Oficina central', 'Cliente'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m5',
            moduleTitle: 'Módulo 5: Marketing y Estrategias Comerciales',
            icon: '🎯',
            grammarNote: 'Rynek (Mercado) / Klient docelowy (Cliente objetivo) / Reklama (Publicidad).',
            lessons: [
              { id: 'pl_b2_m5_l1', type: 'choice', title: 'Lección 1: Comercial', question: '¿Qué significa "Reklama"?', options: ['Publicidad / Anuncio', 'Venta directa', 'Estudio de mercado', 'Marca'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m6',
            moduleTitle: 'Módulo 6: Presentaciones Ejecutivas y Pitches',
            icon: '📊',
            grammarNote: 'Prezentacja (Presentación) / Wykres (Gráfico) / Wnioski (Conclusiones).',
            lessons: [
              { id: 'pl_b2_m6_l1', type: 'choice', title: 'Lección 1: Oratoria corporativa', question: '¿Qué significa "Wykres"?', options: ['Gráfico / Diagrama', 'Informe escrito', 'Resumen ejecutivo', 'Diapositiva'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m7',
            moduleTitle: 'Módulo 7: Legislación Laboral en Polonia',
            icon: '⚖️',
            grammarNote: 'Kodeks pracy (Código laboral) / Urlop (Vacaciones) / Zwolnienie (Despido/Baja).',
            lessons: [
              { id: 'pl_b2_m7_l1', type: 'choice', title: 'Lección 1: Leyes', question: '¿Qué significa "Urlop"?', options: ['Vacaciones / Permiso', 'Jornada laboral', 'Horas extra', 'Jubilación'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m8',
            moduleTitle: 'Módulo 8: Innovación y Tecnología en la Empresa',
            icon: '💻',
            grammarNote: 'Innowacja (Innovación) / Oprogramowanie (Software) / Bezpieczeństwo (Seguridad).',
            lessons: [
              { id: 'pl_b2_m8_l1', type: 'choice', title: 'Lección 1: Tech', question: '¿Qué significa "Oprogramowanie"?', options: ['Software / Programas', 'Hardware', 'Red interna', 'Base de datos'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m9',
            moduleTitle: 'Módulo 9: Logística y Comercio Internacional',
            icon: '🚢',
            grammarNote: 'Dostawa (Entrega/Envío) / Łańcuch dostaw (Cadena de suministro) / Celna (Aduana).',
            lessons: [
              { id: 'pl_b2_m9_l1', type: 'choice', title: 'Lección 1: Supply Chain', question: '¿Qué significa "Dostawa"?', options: ['Entrega / Envío', 'Almacén', 'Transporte aéreo', 'Factura'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_b2_m10',
            moduleTitle: 'Módulo 10: Evaluación Final Nivel B2',
            icon: '🏆',
            grammarNote: 'Consolidación del polaco profesional y corporativo.',
            lessons: [
              { id: 'pl_b2_m10_l1', type: 'choice', title: 'Lección 1: Examen B2', question: '¿Qué significa "Budżet"?', options: ['Presupuesto', 'Balance', 'Inversión', 'Impuesto'], correct: 0 }
            ]
          }
        ]
      },
      {
        levelId: 'C1',
        title: 'Nivel C1 • Dominio, Modismos y Jerga Nativa',
        description: '10 Módulos • Fraseología avanzada, retórica y cultura polaca',
        modules: [
          {
            moduleId: 'pl_c1_m1',
            moduleTitle: 'Módulo 1: Modismos Coloquiales Avanzados',
            icon: '👑',
            grammarNote: 'Mieć dwie lewe ręce (Ser torpe) / Spoko (Todo tranquilo).',
            lessons: [
              { id: 'pl_c1_m1_l1', type: 'choice', title: 'Lección 1: Fraseología', question: '¿Qué significa "Mieć dwie lewe ręce"?', options: ['Ser muy torpe (tener dos manos izquierdas)', 'Tener habilidad', 'Trabajar rápido', 'Estar cansado'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m2',
            moduleTitle: 'Módulo 2: Retórica y Argumentación Filosófica',
            icon: '🏛️',
            grammarNote: 'Retoryka (Retórica) / Polemika (Polémica) / Hipoteza (Hipótesis).',
            lessons: [
              { id: 'pl_c1_m2_l1', type: 'choice', title: 'Lección 1: Discurso', question: '¿Qué significa "Polemika"?', options: ['Polémica / Debate argumentado', 'Acuerdo unánime', 'Teoría científica', 'Opinión personal'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m3',
            moduleTitle: 'Módulo 3: Literatura y Poesía Polaca',
            icon: '📖',
            grammarNote: 'Literatura (Literatura) / Wiersz (Poema) / Metafora (Metáfora).',
            lessons: [
              { id: 'pl_c1_m3_l1', type: 'choice', title: 'Lección 1: Estilística', question: '¿Qué significa "Wiersz"?', options: ['Poema / Verso', 'Novela', 'Ensayo', 'Prosa'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m4',
            moduleTitle: 'Módulo 4: Humor, Sátira y Doble Sentido',
            icon: '🎭',
            grammarNote: 'Humor (Humor) / Ironia (Ironía) / Sarcazm (Sarcasmo).',
            lessons: [
              { id: 'pl_c1_m4_l1', type: 'choice', title: 'Lección 1: Semántica culta', question: '¿Qué significa "Ironia"?', options: ['Ironía', 'Alegría', 'Tristeza', 'Confusión'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m5',
            moduleTitle: 'Módulo 5: Política y Gobernanza Avanzada',
            icon: '🏛️',
            grammarNote: 'Parlament (Parlamento) / Ustawa (Ley) / Wybory (Elecciones).',
            lessons: [
              { id: 'pl_c1_m5_l1', type: 'choice', title: 'Lección 1: Instituciones', question: '¿Qué significa "Ustawa"?', options: ['Ley / Decreto legislativo', 'Constitución', 'Sentencia judicial', 'Tratado'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m6',
            moduleTitle: 'Módulo 6: Periodismo de Investigación y Ensayo',
            icon: '🎙️',
            grammarNote: 'Śledztwo (Investigación) / Fakty (Hechos) / Komentarz (Comentario).',
            lessons: [
              { id: 'pl_c1_m6_l1', type: 'choice', title: 'Lección 1: Medios', question: '¿Qué significa "Śledztwo"?', options: ['Investigación periodística/policial', 'Reportaje', 'Entrevista', 'Editorial'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m7',
            moduleTitle: 'Módulo 7: Sociología y Tendencias Culturales',
            icon: '🌍',
            grammarNote: 'Społeczeństwo (Sociedad) / Globalizacja (Globalización) / Tradycja (Tradición).',
            lessons: [
              { id: 'pl_c1_m7_l1', type: 'choice', title: 'Lección 1: Estructura social', question: '¿Qué significa "Społeczeństwo"?', options: ['Sociedad', 'Comunidad local', 'Población activa', 'Cultura'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m8',
            moduleTitle: 'Módulo 8: Crítica de Arte y Estética',
            icon: '🖼️',
            grammarNote: 'Sztuka (Arte) / Krytyka (Crítica) / Wystawa (Exposición).',
            lessons: [
              { id: 'pl_c1_m8_l1', type: 'choice', title: 'Lección 1: Exposiciones', question: '¿Qué significa "Wystawa"?', options: ['Exposición / Muestra de arte', 'Galería', 'Museo', 'Subasta'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m9',
            moduleTitle: 'Módulo 9: Psicolingüística y Estructura del Polaco',
            icon: '🧠',
            grammarNote: 'Językoznawstwo (Lingüística) / Fonetyka (Fonética) / Składnia (Sintaxis).',
            lessons: [
              { id: 'pl_c1_m9_l1', type: 'choice', title: 'Lección 1: Ciencia del lenguaje', question: '¿Qué significa "Składnia"?', options: ['Sintaxis', 'Morfología', 'Etimología', 'Ortografía'], correct: 0 }
            ]
          },
          {
            moduleId: 'pl_c1_m10',
            moduleTitle: 'Módulo 10: Maestría y Certificación C1 Suprema',
            icon: '🦉👑',
            grammarNote: 'Dominio absoluto de la lengua polaca a nivel nativo culto.',
            lessons: [
              { id: 'pl_c1_m10_l1', type: 'choice', title: 'Lección 1: Examen Supremo C1', question: '¿Qué evalúa la maestría C1 en polaco?', options: ['Fluidez nativa, modismos y precisión retórica', 'Solo vocabulario básico', 'Gramática infantil', 'Traducción literal'], correct: 0 }
            ]
          }
        ]
      }
    ]
  },
  en: {
    id: 'en',
    name: 'Inglés',
    flag: '🇬🇧',
    targetAudience: 'Para Hispanohablantes',
    levels: [
      {
        levelId: 'A1',
        title: 'Level A1 • Beginner Essentials',
        description: '10 Modules • Fundamentos y Supervivencia',
        modules: [
          {
            moduleId: 'en_a1_m1',
            moduleTitle: 'Module 1: Greetings & Introductions',
            icon: '👋',
            grammarNote: 'Use "Hello", "Hi", and "Nice to meet you".',
            lessons: [
              { id: 'en_a1_m1_l1', type: 'choice', title: 'Lesson 1: Casual Greetings', question: 'How do you say "Hola"?', options: ['Hello', 'Goodbye', 'Please', 'Thanks'], correct: 0 },
              { id: 'en_a1_m1_l2', type: 'write', title: 'Lesson 2: Good Morning', question: 'Write in English: "Buenos días"', correctAnswer: 'good morning' }
            ]
          },
          {
            moduleId: 'en_a1_m2',
            moduleTitle: 'Module 2: The Verb To Be & Pronouns',
            icon: '⚡',
            grammarNote: 'I am, You are, He/She/It is.',
            lessons: [
              { id: 'en_a1_m2_l1', type: 'choice', title: 'Lesson 1: Verb To Be', question: 'Select: "She ___ an engineer."', options: ['is', 'are', 'am', 'be'], correct: 0 }
            ]
          },
          { moduleId: 'en_a1_m3', moduleTitle: 'Module 3: Numbers & Counting', icon: '🔢', grammarNote: 'One, two, three...', lessons: [{ id: 'en_a1_m3_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Three"?', options: ['3', '1', '5', '10'], correct: 0 }] },
          { moduleId: 'en_a1_m4', moduleTitle: 'Module 4: Days of the Week', icon: '📅', grammarNote: 'Monday, Tuesday...', lessons: [{ id: 'en_a1_m4_l1', type: 'choice', title: 'Lesson 1', question: 'What day is "Monday"?', options: ['Lunes', 'Martes', 'Miércoles', 'Jueves'], correct: 0 }] },
          { moduleId: 'en_a1_m5', moduleTitle: 'Module 5: Family Members', icon: '👨‍👩‍👦', grammarNote: 'Mother, father, brother.', lessons: [{ id: 'en_a1_m5_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Brother"?', options: ['Hermano', 'Hermana', 'Padre', 'Madre'], correct: 0 }] },
          { moduleId: 'en_a1_m6', moduleTitle: 'Module 6: Common Jobs', icon: '💼', grammarNote: 'Doctor, teacher, engineer.', lessons: [{ id: 'en_a1_m6_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Teacher"?', options: ['Profesor', 'Médico', 'Piloto', 'Abogado'], correct: 0 }] },
          { moduleId: 'en_a1_m7', moduleTitle: 'Module 7: House & Rooms', icon: '🏠', grammarNote: 'Kitchen, bedroom, bathroom.', lessons: [{ id: 'en_a1_m7_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Kitchen"?', options: ['Cocina', 'Sala', 'Baño', 'Jardín'], correct: 0 }] },
          { moduleId: 'en_a1_m8', moduleTitle: 'Module 8: Clothes & Fashion', icon: '👕', grammarNote: 'Shirt, pants, shoes.', lessons: [{ id: 'en_a1_m8_l1', type: 'choice', title: 'Lesson 1', question: 'What are "Shoes"?', options: ['Zapatos', 'Camisa', 'Pantalones', 'Sombrero'], correct: 0 }] },
          { moduleId: 'en_a1_m9', moduleTitle: 'Module 9: Weather & Climate', icon: '🌤️', grammarNote: 'Sunny, rainy, cold, hot.', lessons: [{ id: 'en_a1_m9_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Hot"?', options: ['Calor / Caliente', 'Frío', 'Lluvia', 'Nieve'], correct: 0 }] },
          { moduleId: 'en_a1_m10', moduleTitle: 'Module 10: A1 Final Exam', icon: '🏆', grammarNote: 'Review A1.', lessons: [{ id: 'en_a1_m10_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Goodbye" mean?', options: ['Adiós', 'Hola', 'Gracias', 'Por favor'], correct: 0 }] }
        ]
      },
      {
        levelId: 'A2',
        title: 'Level A2 • Elementary & Travel',
        description: '10 Modules • City, Transport, Food & Shopping',
        modules: [
          { moduleId: 'en_a2_m1', moduleTitle: 'Module 1: Directions & Transport', icon: '🗺️', grammarNote: 'Where is the...', lessons: [{ id: 'en_a2_m1_l1', type: 'choice', title: 'Lesson 1', question: 'How do you ask "¿Dónde está la estación?"', options: ['Where is the station?', 'What is this?', 'How much?', 'When?'], correct: 0 }] },
          { moduleId: 'en_a2_m2', moduleTitle: 'Module 2: Shopping & Prices', icon: '🛍️', grammarNote: 'How much is it?', lessons: [{ id: 'en_a2_m2_l1', type: 'choice', title: 'Lesson 1', question: 'What does "How much is it?" mean?', options: ['¿Cuánto cuesta?', '¿Dónde está?', '¿Qué es?', '¿Quién es?'], correct: 0 }] },
          { moduleId: 'en_a2_m3', moduleTitle: 'Module 3: Hotel & Booking', icon: '🏨', grammarNote: 'Room reservation.', lessons: [{ id: 'en_a2_m3_l1', type: 'choice', title: 'Lesson 1', question: 'What is a "Reservation"?', options: ['Una reserva', 'Una factura', 'Un mapa', 'Un boleto'], correct: 0 }] },
          { moduleId: 'en_a2_m4', moduleTitle: 'Module 4: Health & Emergencies', icon: '💊', grammarNote: 'Doctor, hospital, pain.', lessons: [{ id: 'en_a2_m4_l1', type: 'choice', title: 'Lesson 1', question: 'What does "I need a doctor" mean?', options: ['Necesito un médico', 'Busco un hotel', 'Quiero agua', 'Tengo frío'], correct: 0 }] },
          { moduleId: 'en_a2_m5', moduleTitle: 'Module 5: Hobbies & Free Time', icon: '⚽', grammarNote: 'Sports, music, movies.', lessons: [{ id: 'en_a2_m5_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Soccer"?', options: ['Fútbol', 'Tenis', 'Natación', 'Básquetbol'], correct: 0 }] },
          { moduleId: 'en_a2_m6', moduleTitle: 'Module 6: Travel & Airport', icon: '✈️', grammarNote: 'Flight ticket, passport.', lessons: [{ id: 'en_a2_m6_l1', type: 'choice', title: 'Lesson 1', question: 'What is a "Passport"?', options: ['Pasaporte', 'Maleta', 'Boleto', 'Aduana'], correct: 0 }] },
          { moduleId: 'en_a2_m7', moduleTitle: 'Module 7: Technology & Phones', icon: '📱', grammarNote: 'Smartphone, internet, Wi-Fi.', lessons: [{ id: 'en_a2_m7_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Password"?', options: ['Contraseña', 'Pantalla', 'Cargador', 'Llamada'], correct: 0 }] },
          { moduleId: 'en_a2_m8', moduleTitle: 'Module 8: Restaurants & Food', icon: '🍲', grammarNote: 'Menu, waiter, tip.', lessons: [{ id: 'en_a2_m8_l1', type: 'choice', title: 'Lesson 1', question: 'What is a "Waiter"?', options: ['Camarero / Mesero', 'Cocinero', 'Cliente', 'Gerente'], correct: 0 }] },
          { moduleId: 'en_a2_m9', moduleTitle: 'Module 9: Office & Workplace', icon: '🏢', grammarNote: 'Meeting, office, boss.', lessons: [{ id: 'en_a2_m9_l1', type: 'choice', title: 'Lesson 1', question: 'What is a "Meeting"?', options: ['Reunión', 'Contrato', 'Oficina', 'Salario'], correct: 0 }] },
          { moduleId: 'en_a2_m10', moduleTitle: 'Module 10: A2 Final Exam', icon: '🏆', grammarNote: 'Review A2.', lessons: [{ id: 'en_a2_m10_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Too expensive" mean?', options: ['Demasiado caro', 'Muy barato', 'Excelente', 'Cerrado'], correct: 0 }] }
        ]
      },
      {
        levelId: 'B1',
        title: 'Level B1 • Intermediate Fluency',
        description: '10 Modules • Opinions, Stories, Travel & Work',
        modules: [
          { moduleId: 'en_b1_m1', moduleTitle: 'Module 1: Expressing Opinions', icon: '💡', grammarNote: 'In my opinion...', lessons: [{ id: 'en_b1_m1_l1', type: 'choice', title: 'Lesson 1', question: 'How do you say "En mi opinión"?', options: ['In my opinion', 'I don’t know', 'That’s expensive', 'Where is home?'], correct: 0 }] },
          { moduleId: 'en_b1_m2', moduleTitle: 'Module 2: Feelings & Emotions', icon: '❤️', grammarNote: 'Happy, sad, tired.', lessons: [{ id: 'en_b1_m2_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Tired" mean?', options: ['Cansado', 'Feliz', 'Enojado', 'Emocionado'], correct: 0 }] },
          { moduleId: 'en_b1_m3', moduleTitle: 'Module 3: Past Stories', icon: '⏳', grammarNote: 'I was, I went, I saw.', lessons: [{ id: 'en_b1_m3_l1', type: 'choice', title: 'Lesson 1', question: 'What does "I saw" mean?', options: ['Yo vi', 'Yo fui', 'Yo tuve', 'Yo dije'], correct: 0 }] },
          { moduleId: 'en_b1_m4', moduleTitle: 'Module 4: Future Plans', icon: '🔮', grammarNote: 'I plan to, I will.', lessons: [{ id: 'en_b1_m4_l1', type: 'choice', title: 'Lesson 1', question: 'What does "I plan to travel" mean?', options: ['Planeo viajar', 'Trabajo duro', 'Compro casa', 'Estudio inglés'], correct: 0 }] },
          { moduleId: 'en_b1_m5', moduleTitle: 'Module 5: Culture & Traditions', icon: '🌍', grammarNote: 'Customs, holidays.', lessons: [{ id: 'en_b1_m5_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Tradition" mean?', options: ['Tradición', 'Fiesta', 'Comida', 'Música'], correct: 0 }] },
          { moduleId: 'en_b1_m6', moduleTitle: 'Module 6: Complaints & Issues', icon: '⚠️', grammarNote: 'Refund, problem, service.', lessons: [{ id: 'en_b1_m6_l1', type: 'choice', title: 'Lesson 1', question: 'What is a "Refund"?', options: ['Reembolso / Devolución', 'Descuento', 'Garantía', 'Factura'], correct: 0 }] },
          { moduleId: 'en_b1_m7', moduleTitle: 'Module 7: Education & Studies', icon: '🎓', grammarNote: 'University, exam, degree.', lessons: [{ id: 'en_b1_m7_l1', type: 'choice', title: 'Lesson 1', question: 'What is an "Exam"?', options: ['Examen', 'Clase', 'Biblioteca', 'Beca'], correct: 0 }] },
          { moduleId: 'en_b1_m8', moduleTitle: 'Module 8: Environment', icon: '🌱', grammarNote: 'Recycling, nature.', lessons: [{ id: 'en_b1_m8_l1', type: 'choice', title: 'Lesson 1', question: 'What is "Recycling"?', options: ['Reciclaje', 'Contaminación', 'Energía solar', 'Bosque'], correct: 0 }] },
          { moduleId: 'en_b1_m9', moduleTitle: 'Module 9: News & Media', icon: '📰', grammarNote: 'News, newspaper, interview.', lessons: [{ id: 'en_b1_m9_l1', type: 'choice', title: 'Lesson 1', question: 'What are "News"?', options: ['Noticias', 'Anuncios', 'Opiniones', 'Artículos'], correct: 0 }] },
          { moduleId: 'en_b1_m10', moduleTitle: 'Module 10: B1 Final Exam', icon: '🏆', grammarNote: 'Review B1.', lessons: [{ id: 'en_b1_m10_l1', type: 'choice', title: 'Lesson 1', question: 'What does "I agree" mean?', options: ['Estoy de acuerdo', 'No sé', 'Imposible', 'Tal vez'], correct: 0 }] }
        ]
      },
      {
        levelId: 'B2',
        title: 'Level B2 • Upper Intermediate Business',
        description: '10 Modules • Corporate, Finance, Leadership & Strategy',
        modules: [
          { moduleId: 'en_b2_m1', moduleTitle: 'Module 1: Job Interviews', icon: '💼', grammarNote: 'Work experience, resume.', lessons: [{ id: 'en_b2_m1_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Work experience" mean?', options: ['Experiencia laboral', 'Búsqueda de empleo', 'Salario neto', 'Contrato'], correct: 0 }] },
          { moduleId: 'en_b2_m2', moduleTitle: 'Module 2: Contract Negotiations', icon: '📄', grammarNote: 'Terms and conditions.', lessons: [{ id: 'en_b2_m2_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Terms of agreement" mean?', options: ['Términos del acuerdo', 'Horario de oficina', 'Salario', 'Entrevista'], correct: 0 }] },
          { moduleId: 'en_b2_m3', moduleTitle: 'Module 3: Corporate Finance', icon: '📈', grammarNote: 'Budget, profit, taxes.', lessons: [{ id: 'en_b2_m3_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Profit" mean?', options: ['Beneficio / Ganancia', 'Pérdida', 'Inversión', 'Deuda'], correct: 0 }] },
          { moduleId: 'en_b2_m4', moduleTitle: 'Module 4: Team Leadership', icon: '👥', grammarNote: 'Management, team leader.', lessons: [{ id: 'en_b2_m4_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Team" mean?', options: ['Equipo', 'Proyecto', 'Oficina', 'Cliente'], correct: 0 }] },
          { moduleId: 'en_b2_m5', moduleTitle: 'Module 5: Marketing Strategy', icon: '🎯', grammarNote: 'Market, target audience.', lessons: [{ id: 'en_b2_m5_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Advertising" mean?', options: ['Publicidad', 'Venta directa', 'Estudio de mercado', 'Marca'], correct: 0 }] },
          { moduleId: 'en_b2_m6', moduleTitle: 'Module 6: Executive Presentations', icon: '📊', grammarNote: 'Pitch, charts, conclusions.', lessons: [{ id: 'en_b2_m6_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Chart" mean?', options: ['Gráfico / Diagrama', 'Informe escrito', 'Resumen', 'Diapositiva'], correct: 0 }] },
          { moduleId: 'en_b2_m7', moduleTitle: 'Module 7: Labor Law & HR', icon: '⚖️', grammarNote: 'Labor code, vacation, layoff.', lessons: [{ id: 'en_b2_m7_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Paid time off" mean?', options: ['Vacaciones pagadas', 'Jornada laboral', 'Horas extra', 'Jubilación'], correct: 0 }] },
          { moduleId: 'en_b2_m8', moduleTitle: 'Module 8: Tech & Innovation', icon: '💻', grammarNote: 'Software, cybersecurity.', lessons: [{ id: 'en_b2_m8_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Software" mean?', options: ['Software / Programas', 'Hardware', 'Red interna', 'Base de datos'], correct: 0 }] },
          { moduleId: 'en_b2_m9', moduleTitle: 'Module 9: Supply Chain & Logistics', icon: '🚢', grammarNote: 'Delivery, supply chain.', lessons: [{ id: 'en_b2_m9_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Delivery" mean?', options: ['Entrega / Envío', 'Almacén', 'Transporte', 'Factura'], correct: 0 }] },
          { moduleId: 'en_b2_m10', moduleTitle: 'Module 10: B2 Final Exam', icon: '🏆', grammarNote: 'Review B2.', lessons: [{ id: 'en_b2_m10_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Budget" mean?', options: ['Presupuesto', 'Balance', 'Inversión', 'Impuesto'], correct: 0 }] }
        ]
      },
      {
        levelId: 'C1',
        title: 'Level C1 • Advanced Phrasal Verbs & Idioms',
        description: '10 Modules • Corporate Phrasal Verbs, Rhetoric & Idioms',
        modules: [
          { moduleId: 'en_c1_m1', moduleTitle: 'Module 1: Corporate Phrasal Verbs', icon: '👑', grammarNote: 'To hash out, to back up.', lessons: [{ id: 'en_c1_m1_l1', type: 'choice', title: 'Lesson 1', question: 'What does "to hash out" mean?', options: ['Discuss thoroughly to reach agreement', 'Throw documents away', 'Make budget error', 'Postpone call'], correct: 0 }] },
          { moduleId: 'en_c1_m2', moduleTitle: 'Module 2: Advanced Rhetoric', icon: '🏛️', grammarNote: 'Debate, hypothesis.', lessons: [{ id: 'en_c1_m2_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Hypothesis" mean?', options: ['Hipótesis', 'Teoría comprobada', 'Hecho real', 'Opinión'], correct: 0 }] },
          { moduleId: 'en_c1_m3', moduleTitle: 'Module 3: English Literature & Poetry', icon: '📖', grammarNote: 'Metaphor, verse, prose.', lessons: [{ id: 'en_c1_m3_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Metaphor" mean?', options: ['Metáfora', 'Rima', 'Ensayo', 'Capítulo'], correct: 0 }] },
          { moduleId: 'en_c1_m4', moduleTitle: 'Module 4: British vs American Humor', icon: '🎭', grammarNote: 'Sarcasm, irony, wit.', lessons: [{ id: 'en_c1_m4_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Sarcasm" mean?', options: ['Sarcasmo', 'Alegría', 'Tristeza', 'Duda'], correct: 0 }] },
          { moduleId: 'en_c1_m5', moduleTitle: 'Module 5: Global Politics', icon: '🏛️', grammarNote: 'Parliament, legislation.', lessons: [{ id: 'en_c1_m5_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Legislation" mean?', options: ['Legislación / Leyes', 'Elecciones', 'Juicio', 'Tratado'], correct: 0 }] },
          { moduleId: 'en_c1_m6', moduleTitle: 'Module 6: Investigative Journalism', icon: '🎙️', grammarNote: 'Investigation, editorial.', lessons: [{ id: 'en_c1_m6_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Editorial" mean?', options: ['Editorial / Artículo de opinión', 'Noticia urgente', 'Entrevista', 'Anuncio'], correct: 0 }] },
          { moduleId: 'en_c1_m7', moduleTitle: 'Module 7: Sociology & Culture', icon: '🌍', grammarNote: 'Society, globalization.', lessons: [{ id: 'en_c1_m7_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Society" mean?', options: ['Sociedad', 'Comunidad', 'Población', 'Cultura'], correct: 0 }] },
          { moduleId: 'en_c1_m8', moduleTitle: 'Module 8: Art & Aesthetics', icon: '🖼️', grammarNote: 'Fine arts, exhibition.', lessons: [{ id: 'en_c1_m8_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Exhibition" mean?', options: ['Exposición de arte', 'Galería', 'Museo', 'Subasta'], correct: 0 }] },
          { moduleId: 'en_c1_m9', moduleTitle: 'Module 9: Psycholinguistics', icon: '🧠', grammarNote: 'Syntax, phonetics.', lessons: [{ id: 'en_c1_m9_l1', type: 'choice', title: 'Lesson 1', question: 'What does "Syntax" mean?', options: ['Sintaxis', 'Morfología', 'Etimología', 'Ortografía'], correct: 0 }] },
          { moduleId: 'en_c1_m10', moduleTitle: 'Module 10: C1 Supreme Mastery', icon: '🦉👑', grammarNote: 'Native fluency & mastery.', lessons: [{ id: 'en_c1_m10_l1', type: 'choice', title: 'Lesson 1', question: 'What does C1 mastery test evaluate?', options: ['Native fluency, idioms and rhetoric precision', 'Basic vocabulary', 'Child grammar', 'Literal translation'], correct: 0 }] }
        ]
      }
    ]
  },
  es: {
    id: 'es',
    name: 'Español',
    flag: '🇪🇸',
    targetAudience: 'Para Polacos e Ingleses',
    levels: [
      {
        levelId: 'A1',
        title: 'Level A1 • Fundamentos del Español',
        description: '10 Modules • Saludos y Supervivencia',
        modules: [
          { moduleId: 'es_a1_m1', moduleTitle: 'Módulo 1: Saludos y Cortesía', icon: '👋', grammarNote: 'Hola, gracias, por favor.', lessons: [{ id: 'es_a1_m1_l1', type: 'choice', title: 'Lección 1', question: '¿Cómo dices "Thank you very much"?', options: ['Muchas gracias', 'Por favor', 'Buenos días', 'Hasta luego'], correct: 0 }] },
          { moduleId: 'es_a1_m2', moduleTitle: 'Módulo 2: El Verbo Ser y Estar', icon: '⚡', grammarNote: 'Yo soy, tú estás...', lessons: [{ id: 'es_a1_m2_l1', type: 'choice', title: 'Lección 1', question: 'Selecciona: "Ella ___ ingeniera."', options: ['es', 'está', 'soy', 'somos'], correct: 0 }] },
          { moduleId: 'es_a1_m3', moduleTitle: 'Módulo 3: Números', icon: '🔢', grammarNote: 'Uno, dos, tres...', lessons: [{ id: 'es_a1_m3_l1', type: 'choice', title: 'Lección 1', question: '¿Qué número es "Tres"?', options: ['3', '1', '5', '10'], correct: 0 }] },
          { moduleId: 'es_a1_m4', moduleTitle: 'Módulo 4: Días de la semana', icon: '📅', grammarNote: 'Lunes, martes...', lessons: [{ id: 'es_a1_m4_l1', type: 'choice', title: 'Lección 1', question: '¿Qué día es "Lunes"?', options: ['Monday', 'Tuesday', 'Friday', 'Sunday'], correct: 0 }] },
          { moduleId: 'es_a1_m5', moduleTitle: 'Módulo 5: La Familia', icon: '👨‍👩‍👦', grammarNote: 'Madre, padre, hermano.', lessons: [{ id: 'es_a1_m5_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es "Hermano"?', options: ['Brother', 'Sister', 'Father', 'Mother'], correct: 0 }] },
          { moduleId: 'es_a1_m6', moduleTitle: 'Módulo 6: Profesiones', icon: '💼', grammarNote: 'Médico, profesor...', lessons: [{ id: 'es_a1_m6_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es "Profesor"?', options: ['Teacher', 'Doctor', 'Pilot', 'Lawyer'], correct: 0 }] },
          { moduleId: 'es_a1_m7', moduleTitle: 'Módulo 7: La Casa', icon: '🏠', grammarNote: 'Cocina, baño...', lessons: [{ id: 'es_a1_m7_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es "Cocina"?', options: ['Kitchen', 'Room', 'Bathroom', 'Garden'], correct: 0 }] },
          { moduleId: 'es_a1_m8', moduleTitle: 'Módulo 8: La Ropa', icon: '👕', grammarNote: 'Camisa, zapatos...', lessons: [{ id: 'es_a1_m8_l1', type: 'choice', title: 'Lección 1', question: '¿Qué son "Zapatos"?', options: ['Shoes', 'Shirt', 'Pants', 'Hat'], correct: 0 }] },
          { moduleId: 'es_a1_m9', moduleTitle: 'Módulo 9: El Clima', icon: '🌤️', grammarNote: 'Calor, frío, lluvia.', lessons: [{ id: 'es_a1_m9_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Hace calor"?', options: ['It is hot', 'It is cold', 'It is raining', 'It is snowing'], correct: 0 }] },
          { moduleId: 'es_a1_m10', moduleTitle: 'Módulo 10: Examen A1', icon: '🏆', grammarNote: 'Repaso A1.', lessons: [{ id: 'es_a1_m10_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Adiós"?', options: ['Goodbye', 'Hello', 'Thanks', 'Please'], correct: 0 }] }
        ]
      },
      {
        levelId: 'A2',
        title: 'Level A2 • Elementare y Ciudad',
        description: '10 Modules • Direcciones, Tiendas y Comida',
        modules: [
          { moduleId: 'es_a2_m1', moduleTitle: 'Módulo 1: La Ciudad y Direcciones', icon: '🗺️', grammarNote: '¿Dónde está...?', lessons: [{ id: 'es_a2_m1_l1', type: 'choice', title: 'Lección 1', question: '¿Cómo preguntas "¿Dónde está el banco?"', options: ['¿Dónde está el banco?', '¿Qué es esto?', '¿Cuánto cuesta?', '¿Cuándo salimos?'], correct: 0 }] },
          { moduleId: 'es_a2_m2', moduleTitle: 'Módulo 2: Compras y Precios', icon: '🛍️', grammarNote: '¿Cuánto cuesta?', lessons: [{ id: 'es_a2_m2_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "¿Cuánto cuesta?"', options: ['How much does it cost?', 'Where is it?', 'What is it?', 'Who are you?'], correct: 0 }] },
          { moduleId: 'es_a2_m3', moduleTitle: 'Módulo 3: Hotel y Reservas', icon: '🏨', grammarNote: 'Reserva de habitación.', lessons: [{ id: 'es_a2_m3_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es una "Reserva"?', options: ['A reservation', 'A bill', 'A map', 'A ticket'], correct: 0 }] },
          { moduleId: 'es_a2_m4', moduleTitle: 'Módulo 4: Salud y Cuerpo', icon: '💊', grammarNote: 'Me duele...', lessons: [{ id: 'es_a2_m4_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Me duele la cabeza"?', options: ['I have a headache', 'I am hungry', 'I am tired', 'I am cold'], correct: 0 }] },
          { moduleId: 'es_a2_m5', moduleTitle: 'Módulo 5: Ocio y Deportes', icon: '⚽', grammarNote: 'Fútbol, música, cine.', lessons: [{ id: 'es_a2_m5_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es "Fútbol"?', options: ['Soccer', 'Tennis', 'Swimming', 'Basketball'], correct: 0 }] },
          { moduleId: 'es_a2_m6', moduleTitle: 'Módulo 6: Viajes y Aeropuerto', icon: '✈️', grammarNote: 'Boleto, pasaporte.', lessons: [{ id: 'es_a2_m6_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es un "Pasaporte"?', options: ['Passport', 'Luggage', 'Ticket', 'Customs'], correct: 0 }] },
          { moduleId: 'es_a2_m7', moduleTitle: 'Módulo 7: Tecnología', icon: '📱', grammarNote: 'Teléfono, internet.', lessons: [{ id: 'es_a2_m7_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es "Contraseña"?', options: ['Password', 'Screen', 'Charger', 'Call'], correct: 0 }] },
          { moduleId: 'es_a2_m8', moduleTitle: 'Módulo 8: Restaurantes', icon: '🍲', grammarNote: 'Menú, camarero, cuenta.', lessons: [{ id: 'es_a2_m8_l1', type: 'choice', title: 'Lección 1', question: '¿Quién es el "Camarero"?', options: ['Waiter', 'Chef', 'Customer', 'Manager'], correct: 0 }] },
          { moduleId: 'es_a2_m9', moduleTitle: 'Módulo 9: La Oficina', icon: '🏢', grammarNote: 'Reunión, jefe.', lessons: [{ id: 'es_a2_m9_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es una "Reunión"?', options: ['Meeting', 'Contract', 'Office', 'Salary'], correct: 0 }] },
          { moduleId: 'es_a2_m10', moduleTitle: 'Módulo 10: Examen A2', icon: '🏆', grammarNote: 'Repaso A2.', lessons: [{ id: 'es_a2_m10_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Demasiado caro"?', options: ['Too expensive', 'Very cheap', 'Excellent', 'Closed'], correct: 0 }] }
        ]
      },
      {
        levelId: 'B1',
        title: 'Level B1 • Intermedio y Conversación',
        description: '10 Modules • Opiniones, Emociones y Viajes',
        modules: [
          { moduleId: 'es_b1_m1', moduleTitle: 'Módulo 1: Opiniones', icon: '💡', grammarNote: 'En mi opinión...', lessons: [{ id: 'es_b1_m1_l1', type: 'choice', title: 'Lección 1', question: '¿Cómo traduces "En mi opinión"?', options: ['In my opinion', 'I don’t know', 'That’s expensive', 'Where is home?'], correct: 0 }] },
          { moduleId: 'es_b1_m2', moduleTitle: 'Módulo 2: Emociones', icon: '❤️', grammarNote: 'Feliz, triste, cansado.', lessons: [{ id: 'es_b1_m2_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Cansado"?', options: ['Tired', 'Happy', 'Angry', 'Excited'], correct: 0 }] },
          { moduleId: 'es_b1_m3', moduleTitle: 'Módulo 3: Historias en Pasado', icon: '⏳', grammarNote: 'Fui, vi, tuve.', lessons: [{ id: 'es_b1_m3_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Yo vi"?', options: ['I saw', 'I went', 'I had', 'I said'], correct: 0 }] },
          { moduleId: 'es_b1_m4', moduleTitle: 'Módulo 4: Futuro y Planes', icon: '🔮', grammarNote: 'Planeo, haré.', lessons: [{ id: 'es_b1_m4_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Planeo viajar"?', options: ['I plan to travel', 'I work hard', 'I buy a house', 'I study Spanish'], correct: 0 }] },
          { moduleId: 'es_b1_m5', moduleTitle: 'Módulo 5: Cultura y Tradiciones', icon: '🌍', grammarNote: 'Costumbres, fiestas.', lessons: [{ id: 'es_b1_m5_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Tradición"?', options: ['Tradition', 'Party', 'Food', 'Music'], correct: 0 }] },
          { moduleId: 'es_b1_m6', moduleTitle: 'Módulo 6: Reclamaciones', icon: '⚠️', grammarNote: 'Devolución, problema.', lessons: [{ id: 'es_b1_m6_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es un "Reembolso"?', options: ['Refund', 'Discount', 'Warranty', 'Invoice'], correct: 0 }] },
          { moduleId: 'es_b1_m7', moduleTitle: 'Módulo 7: Educación', icon: '🎓', grammarNote: 'Universidad, examen.', lessons: [{ id: 'es_b1_m7_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es un "Examen"?', options: ['Exam', 'Class', 'Library', 'Scholarship'], correct: 0 }] },
          { moduleId: 'es_b1_m8', moduleTitle: 'Módulo 8: Medio Ambiente', icon: '🌱', grammarNote: 'Reciclaje, naturaleza.', lessons: [{ id: 'es_b1_m8_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es "Reciclaje"?', options: ['Recycling', 'Pollution', 'Solar energy', 'Forest'], correct: 0 }] },
          { moduleId: 'es_b1_m9', moduleTitle: 'Módulo 9: Noticias y Prensa', icon: '📰', grammarNote: 'Noticias, entrevistas.', lessons: [{ id: 'es_b1_m9_l1', type: 'choice', title: 'Lección 1', question: '¿Qué son "Noticias"?', options: ['News', 'Ads', 'Opinions', 'Articles'], correct: 0 }] },
          { moduleId: 'es_b1_m10', moduleTitle: 'Módulo 10: Examen B1', icon: '🏆', grammarNote: 'Repaso B1.', lessons: [{ id: 'es_b1_m10_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Estoy de acuerdo"?', options: ['I agree', 'I don’t know', 'Impossible', 'Maybe'], correct: 0 }] }
        ]
      },
      {
        levelId: 'B2',
        title: 'Level B2 • Español Profesional',
        description: '10 Modules • Negocios, Finanzas y Liderazgo',
        modules: [
          { moduleId: 'es_b2_m1', moduleTitle: 'Módulo 1: Entrevistas de Trabajo', icon: '💼', grammarNote: 'Experiencia laboral, currículum.', lessons: [{ id: 'es_b2_m1_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Experiencia laboral"?', options: ['Work experience', 'Job search', 'Net salary', 'Contract'], correct: 0 }] },
          { moduleId: 'es_b2_m2', moduleTitle: 'Módulo 2: Negociación de Contratos', icon: '📄', grammarNote: 'Condiciones y acuerdos.', lessons: [{ id: 'es_b2_m2_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Condiciones del contrato"?', options: ['Terms of agreement', 'Office hours', 'Salary', 'Interview'], correct: 0 }] },
          { moduleId: 'es_b2_m3', moduleTitle: 'Módulo 3: Finanzas Corporativas', icon: '📈', grammarNote: 'Presupuesto, beneficios, impuestos.', lessons: [{ id: 'es_b2_m3_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Beneficio"?', options: ['Profit', 'Loss', 'Investment', 'Debt'], correct: 0 }] },
          { moduleId: 'es_b2_m4', moduleTitle: 'Módulo 4: Gestión de Equipos', icon: '👥', grammarNote: 'Liderazgo, equipo.', lessons: [{ id: 'es_b2_m4_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es un "Equipo de trabajo"?', options: ['Team', 'Project', 'Office', 'Client'], correct: 0 }] },
          { moduleId: 'es_b2_m5', moduleTitle: 'Módulo 5: Estrategia de Marketing', icon: '🎯', grammarNote: 'Mercado, publicidad.', lessons: [{ id: 'es_b2_m5_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es la "Publicidad"?', options: ['Advertising', 'Direct sales', 'Market study', 'Brand'], correct: 0 }] },
          { moduleId: 'es_b2_m6', moduleTitle: 'Módulo 6: Presentaciones Ejecutivas', icon: '📊', grammarNote: 'Gráficos y conclusiones.', lessons: [{ id: 'es_b2_m6_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es un "Gráfico"?', options: ['Chart / Diagram', 'Written report', 'Summary', 'Slide'], correct: 0 }] },
          { moduleId: 'es_b2_m7', moduleTitle: 'Módulo 7: Legislación Laboral', icon: '⚖️', grammarNote: 'Código de trabajo, vacaciones.', lessons: [{ id: 'es_b2_m7_l1', type: 'choice', title: 'Lección 1', question: '¿Qué son las "Vacaciones"?', options: ['Paid time off', 'Workday', 'Overtime', 'Retirement'], correct: 0 }] },
          { moduleId: 'es_b2_m8', moduleTitle: 'Módulo 8: Innovación y Tecnología', icon: '💻', grammarNote: 'Software y seguridad.', lessons: [{ id: 'es_b2_m8_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es el "Software"?', options: ['Software / Programs', 'Hardware', 'Internal network', 'Database'], correct: 0 }] },
          { moduleId: 'es_b2_m9', moduleTitle: 'Módulo 9: Logística Global', icon: '🚢', grammarNote: 'Envíos y cadena de suministro.', lessons: [{ id: 'es_b2_m9_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es una "Entrega"?', options: ['Delivery', 'Warehouse', 'Transport', 'Invoice'], correct: 0 }] },
          { moduleId: 'es_b2_m10', moduleTitle: 'Módulo 10: Examen B2', icon: '🏆', grammarNote: 'Repaso B2.', lessons: [{ id: 'es_b2_m10_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es el "Presupuesto"?', options: ['Budget', 'Balance', 'Investment', 'Tax'], correct: 0 }] }
        ]
      },
      {
        levelId: 'C1',
        title: 'Level C1 • Modismos y Español Avanzado',
        description: '10 Modules • Modismos nativos, retórica y literatura',
        modules: [
          { moduleId: 'es_c1_m1', moduleTitle: 'Módulo 1: Modismos Nativos', icon: '👑', grammarNote: 'Estar en su salsa, costar un ojo de la cara.', lessons: [{ id: 'es_c1_m1_l1', type: 'choice', title: 'Lección 1', question: '¿Qué significa "Estar en su salsa"?', options: ['To be in your element / comfortable', 'To cook in kitchen', 'To be lost', 'To eat spicy food'], correct: 0 }] },
          { moduleId: 'es_c1_m2', moduleTitle: 'Módulo 2: Retórica Avanzada', icon: '🏛️', grammarNote: 'Debates e hipótesis.', lessons: [{ id: 'es_c1_m2_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es una "Hipótesis"?', options: ['Hypothesis', 'Proven theory', 'Real fact', 'Opinion'], correct: 0 }] },
          { moduleId: 'es_c1_m3', moduleTitle: 'Módulo 3: Literatura en Español', icon: '📖', grammarNote: 'Metáfora, verso, prosa.', lessons: [{ id: 'es_c1_m3_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es una "Metáfora"?', options: ['Metaphor', 'Rhyme', 'Essay', 'Chapter'], correct: 0 }] },
          { moduleId: 'es_c1_m4', moduleTitle: 'Módulo 4: Humor y Sátira', icon: '🎭', grammarNote: 'Ironía y sarcasmo.', lessons: [{ id: 'es_c1_m4_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es el "Sarcasmo"?', options: ['Sarcasm', 'Joy', 'Sadness', 'Doubt'], correct: 0 }] },
          { moduleId: 'es_c1_m5', moduleTitle: 'Módulo 5: Política y Sociedad', icon: '🏛️', grammarNote: 'Parlamento y leyes.', lessons: [{ id: 'es_c1_m5_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es la "Legislación"?', options: ['Legislation', 'Elections', 'Trial', 'Treaty'], correct: 0 }] },
          { moduleId: 'es_c1_m6', moduleTitle: 'Módulo 6: Periodismo de Investigación', icon: '🎙️', grammarNote: 'Editorial e investigación.', lessons: [{ id: 'es_c1_m6_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es un "Editorial"?', options: ['Editorial / Opinion article', 'Breaking news', 'Interview', 'Ad'], correct: 0 }] },
          { moduleId: 'es_c1_m7', moduleTitle: 'Módulo 7: Sociología y Cultura', icon: '🌍', grammarNote: 'Sociedad global.', lessons: [{ id: 'es_c1_m7_l1', type: 'choice', title: 'Lesson 1', question: '¿Qué es la "Sociedad"?', options: ['Society', 'Community', 'Population', 'Culture'], correct: 0 }] },
          { moduleId: 'es_c1_m8', moduleTitle: 'Módulo 8: Arte y Crítica', icon: '🖼️', grammarNote: 'Exposiciones y galerías.', lessons: [{ id: 'es_c1_m8_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es una "Exposición"?', options: ['Exhibition', 'Gallery', 'Museum', 'Auction'], correct: 0 }] },
          { moduleId: 'es_c1_m9', moduleTitle: 'Módulo 9: Psicolingüística', icon: '🧠', grammarNote: 'Sintaxis y fonética.', lessons: [{ id: 'es_c1_m9_l1', type: 'choice', title: 'Lección 1', question: '¿Qué es la "Sintaxis"?', options: ['Syntax', 'Morphology', 'Etymology', 'Spelling'], correct: 0 }] },
          { moduleId: 'es_c1_m10', moduleTitle: 'Módulo 10: Maestría Suprema C1', icon: '🦉👑', grammarNote: 'Fluidez nativa total.', lessons: [{ id: 'es_c1_m10_l1', type: 'choice', title: 'Lección 1', question: '¿Qué evalúa el nivel C1 supremo?', options: ['Native fluency, idioms and rhetoric precision', 'Basic vocabulary', 'Child grammar', 'Literal translation'], correct: 0 }] }
        ]
      }
    ]
  }
};