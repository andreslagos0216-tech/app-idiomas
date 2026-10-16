// src/data/dialogues.js
// Conversaciones por etapas. Cada una se desbloquea al avanzar en su nivel (requires = módulos necesarios).
export const DIALOGUES = [
  {
    id: 'dlg_super',
    title: 'En el supermercado',
    icon: '🛒',
    category: 'Vida diaria',
    level: 'A1',
    requires: 2,
    stages: ['Saludo', 'Necesidad', 'Pago', 'Despedida'],
    turns: [
      { stage: 0, say: 'Dzień dobry! Czy mogę pomóc?', sayEs: '¡Buenos días! ¿Puedo ayudarle?', options: [
        { pl: 'Dzień dobry! Poproszę chleb.', es: '¡Buenos días! Quisiera pan.' },
        { pl: 'Dziękuję, nie.', es: 'Gracias, no.' },
        { pl: 'Dobranoc.', es: 'Buenas noches.' },
      ], correct: 0 },
      { stage: 1, say: 'Oczywiście. Coś jeszcze?', sayEs: 'Claro. ¿Algo más?', options: [
        { pl: 'Tak, poproszę mleko.', es: 'Sí, quisiera leche.' },
        { pl: 'Do widzenia.', es: 'Adiós.' },
        { pl: 'Przepraszam, nie rozumiem.', es: 'Perdón, no entiendo.' },
      ], correct: 0 },
      { stage: 2, say: 'Razem jest dwanaście złotych.', sayEs: 'En total son doce zlotys.', options: [
        { pl: 'Proszę.', es: 'Aquí tiene.' },
        { pl: 'Zimno dziś.', es: 'Hace frío hoy.' },
        { pl: 'Miło mi.', es: 'Encantado.' },
      ], correct: 0 },
      { stage: 3, say: 'Dziękuję. Do widzenia!', sayEs: 'Gracias. ¡Adiós!', options: [
        { pl: 'Do widzenia!', es: '¡Adiós!' },
        { pl: 'Kawa, proszę.', es: 'Café, por favor.' },
        { pl: 'Gdzie jest apteka?', es: '¿Dónde está la farmacia?' },
      ], correct: 0 },
    ],
  },
  {
    id: 'dlg_medico',
    title: 'En el médico',
    icon: '🩺',
    category: 'Vida diaria',
    level: 'A2',
    requires: 4,
    stages: ['Llegada', 'Síntomas', 'Consejo', 'Despedida'],
    turns: [
      { stage: 0, say: 'Dzień dobry. Co panu dolega?', sayEs: 'Buenos días. ¿Qué le pasa?', options: [
        { pl: 'Boli mnie głowa.', es: 'Me duele la cabeza.' },
        { pl: 'Jestem kierowcą.', es: 'Soy conductor.' },
        { pl: 'Poproszę rachunek.', es: 'La cuenta, por favor.' },
      ], correct: 0 },
      { stage: 1, say: 'Od kiedy pan się źle czuje?', sayEs: '¿Desde cuándo se siente mal?', options: [
        { pl: 'Od wczoraj.', es: 'Desde ayer.' },
        { pl: 'W poniedziałek.', es: 'El lunes.' },
        { pl: 'Mam dwadzieścia lat.', es: 'Tengo veinte años.' },
      ], correct: 0 },
      { stage: 2, say: 'Musi pan odpocząć. Proszę wziąć lekarstwo.', sayEs: 'Tiene que descansar. Tome la medicina.', options: [
        { pl: 'Dobrze, dziękuję.', es: 'Bien, gracias.' },
        { pl: 'Jestem w domu.', es: 'Estoy en casa.' },
        { pl: 'Idę do kina.', es: 'Voy al cine.' },
      ], correct: 0 },
      { stage: 3, say: 'Do widzenia. Proszę wrócić za tydzień.', sayEs: 'Adiós. Vuelva dentro de una semana.', options: [
        { pl: 'Do widzenia, dziękuję.', es: 'Adiós, gracias.' },
        { pl: 'Dobranoc.', es: 'Buenas noches.' },
        { pl: 'Lubię czytać.', es: 'Me gusta leer.' },
      ], correct: 0 },
    ],
  },
  {
    id: 'dlg_oficina',
    title: 'Reunión en la oficina',
    icon: '🏢',
    category: 'Trabajo',
    level: 'B1',
    requires: 3,
    stages: ['Bienvenida', 'Proyecto', 'Plazo', 'Cierre'],
    turns: [
      { stage: 0, say: 'Dzień dobry, zaczynamy spotkanie. Jak się pani czuje?', sayEs: 'Buenos días, empezamos la reunión. ¿Cómo se siente?', options: [
        { pl: 'Dzień dobry, dobrze, dziękuję.', es: 'Buenos días, bien, gracias.' },
        { pl: 'Do widzenia.', es: 'Adiós.' },
        { pl: 'Jestem głodny.', es: 'Tengo hambre.' },
      ], correct: 0 },
      { stage: 1, say: 'Czy może pani przedstawić projekt?', sayEs: '¿Puede presentar el proyecto?', options: [
        { pl: 'Tak, oczywiście.', es: 'Sí, claro.' },
        { pl: 'Nie wiem, dobranoc.', es: 'No sé, buenas noches.' },
        { pl: 'Gdzie jest dworzec?', es: '¿Dónde está la estación?' },
      ], correct: 0 },
      { stage: 2, say: 'Kiedy projekt będzie gotowy?', sayEs: '¿Cuándo estará listo el proyecto?', options: [
        { pl: 'Będzie gotowy w przyszłym tygodniu.', es: 'Estará listo la próxima semana.' },
        { pl: 'Wczoraj byłem w kinie.', es: 'Ayer fui al cine.' },
        { pl: 'Mam psa.', es: 'Tengo un perro.' },
      ], correct: 0 },
      { stage: 3, say: 'Dziękuję za spotkanie. Do zobaczenia!', sayEs: 'Gracias por la reunión. ¡Hasta luego!', options: [
        { pl: 'Do zobaczenia!', es: '¡Hasta luego!' },
        { pl: 'Przepraszam, nie rozumiem.', es: 'Perdón, no entiendo.' },
        { pl: 'Poproszę kawę.', es: 'Quisiera un café.' },
      ], correct: 0 },
    ],
  },
  {
    id: 'dlg_entrevista',
    title: 'Entrevista de trabajo',
    icon: '💼',
    category: 'Trabajo',
    level: 'B1',
    requires: 3,
    stages: ['Bienvenida', 'Experiencia', 'Equipo', 'Cierre'],
    turns: [
      { stage: 0, say: 'Proszę usiąść. Dlaczego pan chce pracować u nas?', sayEs: 'Siéntese. ¿Por qué quiere trabajar con nosotros?', options: [
        { pl: 'Bo lubię ten zawód.', es: 'Porque me gusta esta profesión.' },
        { pl: 'Bo jestem zmęczony.', es: 'Porque estoy cansado.' },
        { pl: 'Bo jem obiad.', es: 'Porque como la comida.' },
      ], correct: 0 },
      { stage: 1, say: 'Jakie ma pan doświadczenie?', sayEs: '¿Qué experiencia tiene?', options: [
        { pl: 'Pracowałem w biurze przez pięć lat.', es: 'Trabajé en una oficina durante cinco años.' },
        { pl: 'Byłem w domu wczoraj.', es: 'Ayer estuve en casa.' },
        { pl: 'Mam nowe buty.', es: 'Tengo zapatos nuevos.' },
      ], correct: 0 },
      { stage: 2, say: 'Czy potrafi pan pracować w zespole?', sayEs: '¿Sabe trabajar en equipo?', options: [
        { pl: 'Tak, potrafię.', es: 'Sí, sé hacerlo.' },
        { pl: 'Nie, nie lubię ludzi.', es: 'No, no me gustan las personas.' },
        { pl: 'Dziękuję, do widzenia.', es: 'Gracias, adiós.' },
      ], correct: 0 },
      { stage: 3, say: 'Dziękujemy. Odezwiemy się w przyszłym tygodniu.', sayEs: 'Gracias. Le avisaremos la próxima semana.', options: [
        { pl: 'Dziękuję, do usłyszenia.', es: 'Gracias, hasta pronto.' },
        { pl: 'Poproszę rachunek.', es: 'La cuenta, por favor.' },
        { pl: 'Jest zimno.', es: 'Hace frío.' },
      ], correct: 0 },
    ],
  },
];
