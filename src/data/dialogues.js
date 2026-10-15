// src/data/dialogues.js
// Cada diálogo tiene turnos del interlocutor (él habla) y del usuario (elige la respuesta correcta).
export const DIALOGUES = [
  {
    id: 'dlg_super',
    title: 'En el supermercado',
    icon: '🛒',
    category: 'Vida diaria',
    level: 'A1',
    turns: [
      { say: 'Dzień dobry! Czy mogę pomóc?', options: ['Dzień dobry! Poproszę chleb.', 'Dziękuję, nie.', 'Dobranoc.'], correct: 0 },
      { say: 'Oczywiście. Coś jeszcze?', options: ['Tak, poproszę mleko.', 'Do widzenia.', 'Przepraszam, nie rozumiem.'], correct: 0 },
      { say: 'Razem jest dwanaście złotych.', options: ['Proszę.', 'Zimno dziś.', 'Miło mi.'], correct: 0 },
      { say: 'Dziękuję. Do widzenia!', options: ['Do widzenia!', 'Kawa, proszę.', 'Gdzie jest apteka?'], correct: 0 },
    ],
  },
  {
    id: 'dlg_medico',
    title: 'En el médico',
    icon: '🩺',
    category: 'Vida diaria',
    level: 'A2',
    turns: [
      { say: 'Dzień dobry. Co panu dolega?', options: ['Boli mnie głowa.', 'Jestem kierowcą.', 'Poproszę rachunek.'], correct: 0 },
      { say: 'Od kiedy pan się źle czuje?', options: ['Od wczoraj.', 'W poniedziałek.', 'Mam dwadzieścia lat.'], correct: 0 },
      { say: 'Proszę otworzyć usta.', options: ['Dobrze.', 'Nie wiem.', 'Dziękuję bardzo, do widzenia.'], correct: 0 },
      { say: 'Musi pan odpocząć. Proszę wziąć lekarstwo.', options: ['Dobrze, dziękuję.', 'Jestem w domu.', 'Idę do kina.'], correct: 0 },
    ],
  },
  {
    id: 'dlg_oficina',
    title: 'Reunión en la oficina',
    icon: '🏢',
    category: 'Trabajo',
    level: 'B1',
    turns: [
      { say: 'Dzień dobry, zaczynamy spotkanie. Jak się pani czuje?', options: ['Dzień dobry, dobrze, dziękuję.', 'Do widzenia.', 'Jestem głodny.'], correct: 0 },
      { say: 'Czy może pani przedstawić projekt?', options: ['Tak, oczywiście.', 'Nie wiem, dobranoc.', 'Gdzie jest dworzec?'], correct: 0 },
      { say: 'Kiedy projekt będzie gotowy?', options: ['Będzie gotowy w przyszłym tygodniu.', 'Wczoraj byłem w kinie.', 'Mam psa.'], correct: 0 },
      { say: 'Dziękuję za spotkanie. Do zobaczenia!', options: ['Do zobaczenia!', 'Przepraszam, nie rozumiem.', 'Poproszę kawę.'], correct: 0 },
    ],
  },
  {
    id: 'dlg_entrevista',
    title: 'Entrevista de trabajo',
    icon: '💼',
    category: 'Trabajo',
    level: 'B1',
    turns: [
      { say: 'Proszę usiąść. Dlaczego chce pan pracować u nas?', options: ['Bo lubię ten zawód.', 'Bo jestem zmęczony.', 'Bo jem obiad.'], correct: 0 },
      { say: 'Jakie ma pan doświadczenie?', options: ['Pracowałem w biurze przez pięć lat.', 'Byłem w domu wczoraj.', 'Mam nowe buty.'], correct: 0 },
      { say: 'Czy potrafi pan pracować w zespole?', options: ['Tak, potrafię.', 'Nie, nie lubię ludzi.', 'Dziękuję, do widzenia.'], correct: 0 },
      { say: 'Dziękujemy. Odezwiemy się w przyszłym tygodniu.', options: ['Dziękuję, do usłyszenia.', 'Poproszę rachunek.', 'Jest zimno.'], correct: 0 },
    ],
  },
];
