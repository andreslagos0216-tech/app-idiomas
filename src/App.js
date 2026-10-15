// src/App.js
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES, DIALOGUE_LIST } from './data/registry';
import ListeningCard from './components/ListeningCard';
import LessonScreen from './components/LessonScreen';
import DialogueScreen from './components/DialogueScreen';
import * as FB from './lib/feedback';
import { loadReview, saveReview, recordResult, pendingPhrases } from './lib/review';
import { loadSkills, saveSkills, addSkill, touchStreak, pct, emptySkills } from './lib/progress';

const LANG_CODE = { pl: 'pl-PL', en: 'en-US', es: 'es-ES' };
const LANG_OPTIONS = [
  { key: 'pl', name: 'Polaco', flag: '🇵🇱', ready: true },
  { key: 'en', name: 'Inglés', flag: '🇬🇧', ready: false },
  { key: 'es', name: 'Español', flag: '🇪🇸', ready: false },
];
const KEYS = ['@mowi_name', '@mowi_lang', '@mowi_done', '@mowi_xp', '@mowi_gems', '@mowi_hearts'];
const STORE = [
  { id: 'hearts', name: 'Vidas (x5)', price: 40, icon: '❤️', desc: 'Recarga tus corazones.' },
  { id: 'shield', name: 'Escudo de racha', price: 90, icon: '🛡️', desc: 'Próximamente.' },
  { id: 'xp2', name: 'XP doble', price: 120, icon: '⚡', desc: 'Próximamente.' },
];

const rankOf = (xp) =>
  xp < 800 ? 'Principiante 📖' : xp < 2000 ? 'Estudiante constante ✍️' : xp < 4000 ? 'Hablante fluido 🌟' : 'Maestro 👑';

const Pill = ({ icon, color, value }) => (
  <View style={styles.pill}>
    <Ionicons name={icon} size={14} color={color} />
    <Text style={[styles.pillText, { color }]}>{value}</Text>
  </View>
);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [name, setName] = useState('');
  const [langKey, setLangKey] = useState('pl');
  const [done, setDone] = useState([]);
  const [xp, setXp] = useState(0);
  const [gems, setGems] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [tab, setTab] = useState('learn');
  const [stage, setStage] = useState(null);
  const [current, setCurrent] = useState(null);
  const [dialogue, setDialogue] = useState(null);
  const [review, setReview] = useState({});
  const [skills, setSkills] = useState(emptySkills());

  const course = LANGUAGES[langKey];
  const levels = course.levels;
  const speakLang = LANG_CODE[langKey];

  useEffect(() => {
    (async () => {
      try {
        const pairs = await AsyncStorage.multiGet(KEYS);
        const [n, l, d, x, g, h] = pairs.map((p) => p[1]);
        if (n) { setName(n); setRegistered(true); }
        if (l && LANGUAGES[l]) setLangKey(l);
        if (d) setDone(JSON.parse(d));
        if (x) setXp(parseInt(x, 10));
        if (g) setGems(parseInt(g, 10));
        if (h) setHearts(parseInt(h, 10));
        setReview(await loadReview());
        const sk = await loadSkills();
        setSkills(touchStreak(sk));
      } catch (e) {
        console.log(e);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { saveReview(review); }, [review]);
  useEffect(() => { saveSkills(skills); }, [skills]);

  const save = (p) => {
    const v = { name, langKey, done, xp, gems, hearts, ...p };
    AsyncStorage.multiSet([
      ['@mowi_name', v.name],
      ['@mowi_lang', v.langKey],
      ['@mowi_done', JSON.stringify(v.done)],
      ['@mowi_xp', String(v.xp)],
      ['@mowi_gems', String(v.gems)],
      ['@mowi_hearts', String(v.hearts)],
    ]).catch((e) => console.log(e));
  };

  const register = () => {
    const n = nameInput.trim();
    if (!n) { Alert.alert('Atención', 'Escribe tu nombre.'); return; }
    setName(n);
    setRegistered(true);
    save({ name: n });
  };

  const levelUnlocked = (i) => i === 0 || levels[i - 1].modules.every((m) => done.includes(m.moduleId));

  const startModule = (mod, li) => {
    if (!levelUnlocked(li)) { Alert.alert('Nivel bloqueado', 'Completa todos los módulos del nivel anterior.'); return; }
    if (hearts <= 0) { Alert.alert('Sin vidas', 'Recarga tus corazones en la tienda.'); setTab('store'); return; }
    setCurrent(mod);
    setStage('grammar');
  };

  const exit = () => { setStage(null); setCurrent(null); setDialogue(null); };

  const completeModule = () => {
    const first = !done.includes(current.moduleId);
    const nd = first ? [...done, current.moduleId] : done;
    const nx = first ? xp + 150 : xp;
    const ng = first ? gems + 50 : gems;
    setDone(nd);
    setXp(nx);
    setGems(ng);
    save({ done: nd, xp: nx, gems: ng });
    exit();
    Alert.alert(
      first ? '¡Módulo completado! 🎉' : 'Repaso terminado',
      first ? '+150 XP y +50 gemas' : 'Sigue practicando para afianzarlo.'
    );
  };

  // Llamado por LessonScreen en cada respuesta: registra frases falladas y habilidades
  const onAnswer = (lessonType, ok, phrase) => {
    if (phrase) setReview((r) => recordResult(r, phrase, ok));
    const skill = lessonType === 'speak' ? 'speaking' : lessonType === 'listen' || lessonType === 'dictation' ? 'listening' : null;
    if (skill) setSkills((s) => addSkill(s, skill, ok));
  };

  const loseHeart = () => {
    FB.wrong();
    const n = Math.max(hearts - 1, 0);
    setHearts(n);
    save({ hearts: n });
  };

  const completeDialogue = (correct, total) => {
    const ok = correct === total;
    const gain = ok ? 40 : 15;
    const nx = xp + gain;
    setXp(nx);
    save({ xp: nx });
    setSkills((s) => addSkill(addSkill(s, 'listening', correct > 0), 'speaking', ok));
    exit();
    Alert.alert(ok ? '¡Diálogo perfecto! 🎉' : 'Diálogo terminado', `${correct}/${total} respuestas correctas · +${gain} XP`);
  };

  const startReview = () => {
    const pending = pendingPhrases(review);
    if (pending.length === 0) { Alert.alert('Todo dominado', 'No tienes frases pendientes. ¡Sigue con nuevos módulos!'); return; }
    const lessons = pending.slice(0, 8).map((p, i) => ({
      id: 'rev' + i, type: 'speak', audio: p, targetPhrase: p, question: 'Repasa esta frase',
    }));
    setCurrent({ moduleId: 'review', title: 'Repaso de frases difíciles', icon: '🔁', lessons, grammarNote: 'Repasa las frases que te costaron. Dos aciertos seguidos y se dan por dominadas.' });
    setStage('lesson');
  };

  const buy = (item) => {
    if (item.id !== 'hearts') { Alert.alert('Próximamente', 'Este objeto llegará en una próxima versión.'); return; }
    if (gems < item.price) { Alert.alert('Gemas insuficientes', 'Completa módulos para ganar gemas.'); return; }
    const ng = gems - item.price;
    setGems(ng);
    setHearts(5);
    save({ gems: ng, hearts: 5 });
    Alert.alert('¡Listo!', 'Tus corazones están al máximo.');
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setRegistered(false);
    setName('');
    setDone([]);
    setXp(0);
    setGems(0);
    setHearts(5);
    setTab('learn');
  };

  if (!loaded) return null;

  if (!registered) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.center}>
          <View style={styles.owl}><Text style={{ fontSize: 56 }}>🦉</Text></View>
          <Text style={styles.brand}>Mówi</Text>
          <Text style={styles.tagline}>Escucha, repite y habla con fluidez</Text>
          <Text style={styles.label}>¿Cómo te llamas?</Text>
          <TextInput style={styles.input} placeholder="Tu nombre..." placeholderTextColor="#A0AEC0" value={nameInput} onChangeText={setNameInput} />
          <Text style={styles.label}>Idioma que quieres aprender</Text>
          <View style={styles.langRow}>
            {LANG_OPTIONS.map((o) => (
              <TouchableOpacity
                key={o.key}
                style={[styles.langCard, langKey === o.key && styles.langSel, !o.ready && { opacity: 0.45 }]}
                onPress={() => (o.ready ? setLangKey(o.key) : Alert.alert('Próximamente', o.name + ' llegará en una próxima versión.'))}
              >
                <Text style={{ fontSize: 24 }}>{o.flag}</Text>
                <Text style={styles.langName}>{o.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.primary} onPress={register}>
            <Text style={styles.primaryText}>Comenzar Inmersión</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const header = (
    <View style={styles.header}>
      <View style={styles.avatar}><Text style={{ fontSize: 18 }}>🦉</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.hName}>{name}</Text>
        <Text style={styles.hSub}>{course.flag} {course.name} · Inmersión</Text>
      </View>
      <Pill icon="flame" color="#F97316" value={skills.streak} />
      <Pill icon="heart" color="#EF4444" value={hearts} />
      <Pill icon="diamond" color="#06B6D4" value={gems} />
    </View>
  );

  const renderLearn = () => (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>{course.name}</Text>
        <Text style={styles.bannerSub}>{rankOf(xp)} · {done.length} módulos · racha {skills.streak} días</Text>
      </View>

      <TouchableOpacity style={styles.reviewCard} onPress={() => { FB.tap(); startReview(); }}>
        <Text style={{ fontSize: 26 }}>🔁</Text>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.reviewTitle}>Repaso de frases difíciles</Text>
          <Text style={styles.reviewSub}>{pendingPhrases(review).length} frases pendientes</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#B45309" />
      </TouchableOpacity>

      <View style={styles.skillCard}>
        <Text style={styles.skillTitle}>Tu progreso</Text>
        {[['Comprensión auditiva', skills.listening], ['Velocidad de respuesta', skills.speed], ['Pronunciación', skills.speaking]].map(([label, x]) => (
          <View key={label} style={{ marginTop: 10 }}>
            <Text style={styles.skillLbl}>{label} · {pct(x)}%</Text>
            <View style={styles.track}><View style={[styles.fill, { width: pct(x) + '%' }]} /></View>
          </View>
        ))}
      </View>

      {levels.map((lvl, li) => {
        const unlocked = levelUnlocked(li);
        const count = lvl.modules.filter((m) => done.includes(m.moduleId)).length;
        return (
          <View key={lvl.levelId} style={[styles.levelCard, !unlocked && { opacity: 0.5 }]}>
            <Text style={styles.levelTitle}>{unlocked ? '' : '🔒 '}{lvl.title}</Text>
            <Text style={styles.levelDesc}>{count}/{lvl.modules.length} módulos · {lvl.description}</Text>
            <View style={styles.grid}>
              {lvl.modules.map((mod) => {
                const ok = done.includes(mod.moduleId);
                return (
                  <TouchableOpacity key={mod.moduleId} style={[styles.node, ok && styles.nodeDone]} onPress={() => { FB.tap(); startModule(mod, li); }}>
                    <Text style={styles.nodeIcon}>{ok ? '✅' : mod.icon || '📘'}</Text>
                    <Text style={styles.nodeTitle} numberOfLines={2}>{mod.moduleTitle}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      <Text style={styles.sectionTitle}>Diálogos reales</Text>
      {DIALOGUE_LIST.map((d) => (
        <TouchableOpacity key={d.id} style={styles.dialogCard} onPress={() => { FB.tap(); setDialogue(d); setStage('dialogue'); }}>
          <Text style={{ fontSize: 28 }}>{d.icon}</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.cardTitle}>{d.title}</Text>
            <Text style={styles.cardDesc}>{d.category} · {d.level} · {d.turns.length} turnos</Text>
          </View>
          <Ionicons name="play-circle" size={28} color="#0284C7" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderStore = () => (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.sectionTitle}>Tienda Mówi</Text>
      {STORE.map((it) => (
        <View key={it.id} style={styles.card}>
          <Text style={{ fontSize: 30 }}>{it.icon}</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.cardTitle}>{it.name}</Text>
            <Text style={styles.cardDesc}>{it.desc}</Text>
          </View>
          <TouchableOpacity style={styles.buy} onPress={() => buy(it)}>
            <Text style={styles.buyText}>💎 {it.price}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView contentContainerStyle={[styles.scroll, { alignItems: 'center' }]}>
      <View style={styles.owl}><Text style={{ fontSize: 40 }}>🦉</Text></View>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileRank}>{rankOf(xp)}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statNum}>{xp}</Text><Text style={styles.statLbl}>XP</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>{done.length}</Text><Text style={styles.statLbl}>Módulos</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>{skills.streak}</Text><Text style={styles.statLbl}>Racha</Text></View>
      </View>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderGrammar = () => (
    <ScrollView contentContainerStyle={styles.grammar}>
      <Text style={{ fontSize: 56 }}>{current.icon || '📘'}</Text>
      <Text style={styles.grammarTitle}>{current.title}</Text>
      <View style={styles.grammarBox}>
        <Text style={styles.grammarLabel}>Nota clave</Text>
        <Text style={styles.grammarText}>{current.grammarNote}</Text>
      </View>
      <TouchableOpacity style={styles.primary} onPress={() => setStage('listen')}>
        <Text style={styles.primaryText}>Empezar módulo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={exit}><Text style={styles.link}>Volver</Text></TouchableOpacity>
    </ScrollView>
  );

  const renderTabs = () => (
    <View style={styles.tabs}>
      {[['learn', 'book-outline', 'Aprender'], ['store', 'storefront-outline', 'Tienda'], ['profile', 'person-outline', 'Perfil']].map(([k, icon, label]) => (
        <TouchableOpacity key={k} style={styles.tab} onPress={() => setTab(k)}>
          <Ionicons name={icon} size={22} color={tab === k ? '#0284C7' : '#94A3B8'} />
          <Text style={[styles.tabText, tab === k && { color: '#0284C7' }]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      {!stage && header}
      {stage === 'grammar' && current && renderGrammar()}
      {stage === 'listen' && current && (
        <ListeningCard phrases={current.listening || []} langCode={speakLang} onFinish={() => setStage('lesson')} onClose={exit} />
      )}
      {stage === 'lesson' && current && (
        <LessonScreen
          key={current.moduleId + (current.moduleId === 'review' ? Date.now() : '')}
          lessons={current.lessons}
          moduleTitle={current.title}
          langCode={speakLang}
          onLoseHeart={loseHeart}
          onAnswer={onAnswer}
          onExit={exit}
          onComplete={completeModule}
        />
      )}
      {stage === 'dialogue' && dialogue && (
        <DialogueScreen dialogue={dialogue} langCode={speakLang} onExit={exit} onComplete={completeDialogue} />
      )}
      {!stage && tab === 'learn' && renderLearn()}
      {!stage && tab === 'store' && renderStore()}
      {!stage && tab === 'profile' && renderProfile()}
      {!stage && renderTabs()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { padding: 24, alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
  owl: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  brand: { fontSize: 32, fontWeight: '800', color: '#0F172A' },
  tagline: { fontSize: 13, color: '#64748B', marginBottom: 28 },
  label: { alignSelf: 'stretch', fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 8, marginTop: 14 },
  input: { alignSelf: 'stretch', backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, fontSize: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  langRow: { alignSelf: 'stretch', flexDirection: 'row', gap: 10 },
  langCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0' },
  langSel: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  langName: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginTop: 4 },
  primary: { alignSelf: 'stretch', backgroundColor: '#0284C7', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 18 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  hName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  hSub: { fontSize: 11, color: '#64748B' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 6 },
  pillText: { fontSize: 12, fontWeight: '700' },
  scroll: { padding: 16, paddingBottom: 90 },
  banner: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  bannerSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  reviewCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', borderRadius: 16, padding: 16, marginBottom: 14 },
  reviewTitle: { fontSize: 14, fontWeight: '800', color: '#92400E' },
  reviewSub: { fontSize: 12, color: '#B45309', marginTop: 2 },
  skillCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  skillTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  skillLbl: { fontSize: 12, color: '#475569', fontWeight: '600', marginBottom: 4 },
  track: { height: 10, backgroundColor: '#E2E8F0', borderRadius: 5, overflow: 'hidden' },
  fill: { height: 10, backgroundColor: '#22C55E', borderRadius: 5 },
  levelCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  levelTitle: { fontSize: 14, fontWeight: '800', color: '#0284C7' },
  levelDesc: { fontSize: 12, color: '#64748B', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  node: { width: '48%', backgroundColor: '#F8FAFC', borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 2, borderColor: '#E2E8F0' },
  nodeDone: { borderColor: '#16A34A', backgroundColor: '#ECFDF5' },
  nodeIcon: { fontSize: 24, marginBottom: 4 },
  nodeTitle: { fontSize: 12, fontWeight: '700', color: '#1E293B', textAlign: 'center', minHeight: 32 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 12, marginTop: 4 },
  dialogCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  cardDesc: { fontSize: 11, color: '#64748B', marginTop: 2 },
  buy: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  buyText: { color: '#0369A1', fontWeight: '800', fontSize: 12 },
  grammar: { padding: 24, alignItems: 'center', gap: 14 },
  grammarTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
  grammarBox: { alignSelf: 'stretch', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' },
  grammarLabel: { fontSize: 12, fontWeight: '800', color: '#0284C7', marginBottom: 6 },
  grammarText: { fontSize: 15, color: '#0F172A', lineHeight: 22 },
  link: { color: '#64748B', fontWeight: '600', textDecorationLine: 'underline', marginTop: 8 },
  tabs: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 62, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  tab: { alignItems: 'center' },
  tabText: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 2 },
  profileName: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginTop: 8 },
  profileRank: { fontSize: 13, fontWeight: '700', color: '#0284C7', marginBottom: 18 },
  statsRow: { flexDirection: 'row', gap: 10, width: '100%', marginBottom: 18 },
  statBox: { flex: 1, backgroundColor: '#FFFFFF', padding: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  statNum: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  statLbl: { fontSize: 11, color: '#64748B', marginTop: 2 },
  logout: { backgroundColor: '#FEF2F2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, width: '100%', alignItems: 'center' },
  logoutText: { color: '#EF4444', fontWeight: '700' },
});
