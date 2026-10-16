// src/App.js
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES, DIALOGUE_LIST } from './data/registry';
import ListeningCard from './components/ListeningCard';
import LessonScreen from './components/LessonScreen';
import DialogueScreen from './components/DialogueScreen';
import MowiLogo from './components/brand/MowiLogo';
import TopicPicker from './components/TopicPicker';
import { loadTopics, saveTopics } from './lib/topics';
import { topicOfModule } from './data/topicMap';
import ProfileScreen from './components/ProfileScreen';
import SocialScreen from './components/SocialScreen';
import FloatingMenu from './components/FloatingMenu';
import * as FB from './lib/feedback';
import { loadReview, saveReview, recordResult, pendingPhrases } from './lib/review';
import { loadSkills, saveSkills, addSkill, touchStreak, pct, emptySkills } from './lib/progress';
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from './lib/settings';
import { loadGame, saveGame, addEvent, checkMedals, monthlyGift, claimTournament, challengeValue, challengeKey, periodKeyFor } from './lib/game';

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
const TABS = [
  ['learn', 'book-outline', 'Aprender'],
  ['social', 'trophy-outline', 'Liga'],
  ['store', 'storefront-outline', 'Tienda'],
  ['profile', 'person-outline', 'Perfil'],
];

const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = b[i]; b[i] = b[j]; b[j] = t;
  }
  return b;
};

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
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS });
  const [game, setGame] = useState(null);
  const [topics, setTopics] = useState([]);
  const [pickingTopics, setPickingTopics] = useState(false);

  const course = LANGUAGES[langKey];
  const levels = course.levels;
  const speakLang = LANG_CODE[langKey];
  const rate = settings.slowVoice ? 0.55 : 0.85;

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
        setSkills(touchStreak(await loadSkills()));
        setTopics(await loadTopics());
        const st = await loadSettings();
        setSettings(st);
        FB.setPrefs(st);
        const gm = await loadGame();
        setGame(gm);
        await saveGame(gm);
      } catch (e) {
        console.log(e);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (loaded) saveReview(review); }, [review, loaded]);
  useEffect(() => { if (loaded) saveSkills(skills); }, [skills, loaded]);

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

  const persistGame = (next) => {
    const r = checkMedals(next, skills.streak);
    setGame(r.game);
    saveGame(r.game);
    if (r.fresh.length) {
      FB.achievement();
      Alert.alert('¡Nueva medalla! 🏅', r.fresh.map((m) => m.icon + ' ' + m.name + ' · ' + m.desc).join('\n'));
    }
  };

  const changeSettings = (s) => {
    setSettings(s);
    saveSettings(s);
    FB.setPrefs(s);
  };

  const register = () => {
    const n = nameInput.trim();
    if (!n) { Alert.alert('Atención', 'Escribe tu nombre.'); return; }
    setName(n);
    setRegistered(true);
    save({ name: n });
    setPickingTopics(true);
  };

  const finishTopics = (list) => {
    setTopics(list);
    saveTopics(list);
    setPickingTopics(false);
  };

  // Los módulos de los temas elegidos van primero. Ningún módulo se oculta.
  const sortByTopics = (mods) => {
    if (!topics.length) return mods;
    const mine = mods.filter((m) => topics.includes(topicOfModule(m.moduleId)));
    const rest = mods.filter((m) => !topics.includes(topicOfModule(m.moduleId)));
    return [...mine, ...rest];
  };

  const levelUnlocked = (i) => i === 0 || levels[i - 1].modules.every((m) => done.includes(m.moduleId));

  const dialogueState = (d) => {
    const lvl = levels.find((l) => l.levelId === d.level);
    if (!lvl) return { locked: true, reason: 'Nivel no disponible' };
    const li = levels.indexOf(lvl);
    if (!levelUnlocked(li)) return { locked: true, reason: 'Desbloquea el nivel ' + d.level + ' primero' };
    const doneInLevel = lvl.modules.filter((m) => done.includes(m.moduleId)).length;
    if (doneInLevel < d.requires) {
      return { locked: true, reason: 'Completa ' + d.requires + ' módulos de ' + d.level + ' (' + doneInLevel + '/' + d.requires + ')' };
    }
    return { locked: false, reason: '' };
  };

  const startModule = (mod, li) => {
    if (!levelUnlocked(li)) { Alert.alert('Nivel bloqueado', 'Completa todos los módulos del nivel anterior.'); return; }
    if (hearts <= 0) { Alert.alert('Sin vidas', 'Recarga tus corazones en la tienda.'); setTab('store'); return; }
    setCurrent(mod);
    setStage('grammar');
  };

  const startReview = () => {
    const pending = pendingPhrases(review);
    if (pending.length === 0) { Alert.alert('Todo dominado', 'No tienes frases pendientes. ¡Sigue con nuevos módulos!'); return; }
    const lessons = pending.slice(0, 8).map((p, i) => ({
      id: 'rev' + i, type: 'speak', audio: p, targetPhrase: p, question: 'Repasa esta frase',
    }));
    setCurrent({ moduleId: 'review', title: 'Repaso de frases difíciles', icon: '🔁', virtual: true, lessons });
    setStage('lesson');
  };

  const startPractice = (kind) => {
    const pool = [];
    levels.forEach((lvl, li) => {
      if (!levelUnlocked(li)) return;
      lvl.modules.forEach((m) => {
        if (!done.includes(m.moduleId)) return;
        m.lessons.forEach((l) => {
          if (kind === 'speak' && l.type === 'speak') pool.push(l);
          if (kind === 'listen' && (l.type === 'listen' || l.type === 'dictation')) pool.push(l);
          if (kind === 'match' && l.type === 'match') pool.push(l);
        });
      });
    });
    if (!pool.length) { Alert.alert('Aún no hay práctica', 'Completa algún módulo para desbloquear este modo.'); return; }
    const titles = { speak: 'Práctica de pronunciación', listen: 'Práctica de escucha', match: 'Práctica de parejas' };
    setCurrent({ moduleId: 'practice-' + kind, title: titles[kind], icon: '🎯', virtual: true, lessons: shuffle(pool).slice(0, 10) });
    setStage('lesson');
  };

  const exit = () => { setStage(null); setCurrent(null); setDialogue(null); };

  const completeModule = () => {
    const real = !current.virtual;
    const first = real && !done.includes(current.moduleId);
    if (first) {
      const nd = [...done, current.moduleId];
      const nx = xp + 150;
      const ng = gems + 50;
      setDone(nd);
      setXp(nx);
      setGems(ng);
      save({ done: nd, xp: nx, gems: ng });
      persistGame(addEvent(addEvent(game, 'modules', 1), 'xp', 150));
    }
    exit();
    Alert.alert(
      first ? '¡Módulo completado! 🎉' : 'Sesión terminada',
      first ? '+150 XP y +50 gemas' : 'Buen trabajo, sigue practicando.'
    );
  };

  const onAnswer = (lessonType, ok, phrase) => {
    if (phrase) setReview((r) => recordResult(r, phrase, ok));
    const skill = lessonType === 'speak' ? 'speaking' : lessonType === 'listen' || lessonType === 'dictation' ? 'listening' : null;
    if (skill) setSkills((s) => addSkill(s, skill, ok));
    if (ok && lessonType === 'speak') persistGame(addEvent(game, 'speakOk', 1));
  };

  const loseHeart = () => {
    FB.wrong();
    const n = Math.max(hearts - 1, 0);
    setHearts(n);
    save({ hearts: n });
  };

  const completeDialogue = (correct, total) => {
    const ok = correct === total;
    const gain = ok ? 40 : 10 + correct * 5;
    const nx = xp + gain;
    const ng = gems + (ok ? 5 : 0);
    setXp(nx);
    setGems(ng);
    save({ xp: nx, gems: ng });
    setSkills((s) => addSkill(addSkill(s, 'listening', correct > 0), 'speaking', ok));
    persistGame(addEvent(addEvent(game, 'dialogues', 1), 'xp', gain));
    exit();
    Alert.alert(ok ? '¡Conversación perfecta! 🎉' : 'Conversación terminada', correct + '/' + total + ' correctas · +' + gain + ' XP');
  };

  const claimGift = () => {
    const gift = monthlyGift(game);
    if (!gift.available) return;
    const ng = gems + gift.gems;
    const nh = hearts + gift.hearts;
    setGems(ng);
    setHearts(nh);
    save({ gems: ng, hearts: nh });
    FB.levelUp();
    persistGame({ ...game, claimedGifts: { ...game.claimedGifts, [gift.key]: true } });
    Alert.alert('¡Regalo mensual! 🎁', '+' + gift.gems + ' 💎 y +' + gift.hearts + ' ❤️');
  };

  const claimChallenge = (c) => {
    const key = challengeKey(game, c);
    if (game.claimedChallenges[key] || challengeValue(game, c) < c.goal) return;
    const r = c.reward;
    let g2 = { ...game, claimedChallenges: { ...game.claimedChallenges, [key]: true } };
    const ng = gems + (r.gems || 0);
    const nh = hearts + (r.hearts || 0);
    const nx = xp + (r.xp || 0);
    if (r.xp) g2 = addEvent(g2, 'xp', r.xp);
    setGems(ng);
    setHearts(nh);
    setXp(nx);
    save({ gems: ng, hearts: nh, xp: nx });
    FB.achievement();
    persistGame(g2);
    Alert.alert('¡Desafío cumplido! 🎯', c.label);
  };

  const joinTournament = (t) => {
    FB.tap();
    persistGame({ ...game, joined: { ...game.joined, [t.id]: periodKeyFor(t) } });
    Alert.alert('¡Estás dentro! 🏟️', 'Cada XP que ganes cuenta para el torneo.');
  };

  const claimTournamentPrize = (t, rank) => {
    const res = claimTournament(game, t, rank);
    if (!res.prize) {
      Alert.alert('Sin premio', 'Debes estar en el top 3 y seguir unido al torneo de este periodo.');
      return;
    }
    const ng = gems + (res.prize.gems || 0);
    const nh = hearts + (res.prize.hearts || 0);
    setGems(ng);
    setHearts(nh);
    save({ gems: ng, hearts: nh });
    const g2 = rank === 1 ? { ...res.game, tournamentsWon: res.game.tournamentsWon + 1 } : res.game;
    FB.levelUp();
    persistGame(g2);
    Alert.alert('¡Premio de torneo! 🏆', '+' + (res.prize.gems || 0) + ' 💎' + (res.prize.hearts ? ' +' + res.prize.hearts + ' ❤️' : ''));
  };

  const addFriend = (id) => {
    if (game.friends.includes(id)) return false;
    FB.correct();
    persistGame({ ...game, friends: [...game.friends, id] });
    return true;
  };

  const removeFriend = (id) => {
    FB.tap();
    persistGame({ ...game, friends: game.friends.filter((f) => f !== id) });
  };

  const setEmoji = (e) => {
    FB.tap();
    persistGame({ ...game, emoji: e });
  };

  const buy = (item) => {
    if (item.id !== 'hearts') { Alert.alert('Próximamente', 'Este objeto llegará en una próxima versión.'); return; }
    if (gems < item.price) { Alert.alert('Gemas insuficientes', 'Completa módulos para ganar gemas.'); return; }
    const ng = gems - item.price;
    setGems(ng);
    setHearts(5);
    save({ gems: ng, hearts: 5 });
    FB.correct();
    Alert.alert('¡Listo!', 'Tus corazones están al máximo.');
  };

  const logout = async () => {
    await AsyncStorage.clear();
    const gm = await loadGame();
    setGame(gm);
    setRegistered(false);
    setName('');
    setDone([]);
    setXp(0);
    setGems(0);
    setHearts(5);
    setTab('learn');
  };

  if (!loaded || !game) return null;

  if (pickingTopics) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <TopicPicker initial={topics} onDone={finishTopics} />
      </SafeAreaView>
    );
  }

  if (!registered) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.center}>
          <MowiLogo size={96} streak={skills.streak} />
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
      <MowiLogo size={34} streak={skills.streak} showSeal={false} />
      <View style={{ flex: 1 }}>
        <Text style={styles.hName}>{name}</Text>
        <Text style={styles.hSub}>{course.flag} {course.name} · Inmersión</Text>
      </View>
      <Pill icon="flame" color="#F97316" value={skills.streak} />
      <Pill icon="heart" color="#EF4444" value={hearts} />
      <Pill icon="diamond" color="#06B6D4" value={gems} />
    </View>
  );

  const renderLearn = () => {
    const gift = monthlyGift(game);
    const pend = pendingPhrases(review).length;
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>{course.flag} {course.name}</Text>
          <Text style={styles.bannerSub}>{rankOf(xp)} · {done.length} módulos · racha {skills.streak} 🔥</Text>
        </View>

        {gift.available && (
          <TouchableOpacity style={styles.giftBanner} onPress={() => setTab('profile')}>
            <Text style={styles.giftTxt}>🎁 Tienes un regalo mensual esperando</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.review} onPress={() => { FB.tap(); startReview(); }}>
          <Text style={{ fontSize: 26 }}>🔁</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.reviewTitle}>Repaso de frases difíciles</Text>
            <Text style={styles.reviewSub}>{pend} frases pendientes</Text>
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
                {sortByTopics(lvl.modules).map((mod) => {
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

        <Text style={styles.sectionTitle}>Conversaciones</Text>
        <Text style={styles.hint}>Se desbloquean al avanzar en cada nivel.</Text>
        {DIALOGUE_LIST.map((d) => {
          const st = dialogueState(d);
          return (
            <TouchableOpacity
              key={d.id}
              style={[styles.dialogCard, st.locked && { opacity: 0.6 }]}
              onPress={() => {
                if (st.locked) { Alert.alert('Bloqueado 🔒', st.reason); return; }
                FB.tap();
                setDialogue(d);
                setStage('dialogue');
              }}
            >
              <Text style={{ fontSize: 28 }}>{st.locked ? '🔒' : d.icon}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{d.title}</Text>
                <Text style={styles.cardDesc}>{d.category} · {d.level} · {d.turns.length} turnos</Text>
                {st.locked && <Text style={styles.lockTxt}>{st.reason}</Text>}
              </View>
              {!st.locked && <Ionicons name="play-circle" size={28} color="#0284C7" />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

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
      <TouchableOpacity onPress={exit}>
        <Text style={styles.link}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderTabs = () => (
    <View style={styles.tabs}>
      {TABS.map(([k, icon, label]) => (
        <TouchableOpacity key={k} style={styles.tab} onPress={() => { FB.tap(); setTab(k); }}>
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
          key={current.moduleId}
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
        <DialogueScreen
          key={dialogue.id}
          dialogue={dialogue}
          langCode={speakLang}
          translations={settings.translations}
          rate={rate}
          onExit={exit}
          onComplete={completeDialogue}
        />
      )}
      {!stage && tab === 'learn' && renderLearn()}
      {!stage && tab === 'social' && (
        <SocialScreen
          game={game}
          name={name}
          onAddFriend={addFriend}
          onRemoveFriend={removeFriend}
          onJoin={joinTournament}
          onClaimTournament={claimTournamentPrize}
          onClaimChallenge={claimChallenge}
        />
      )}
      {!stage && tab === 'store' && renderStore()}
      {!stage && tab === 'profile' && (
        <ProfileScreen
          game={game}
          name={name}
          rank={rankOf(xp)}
          xp={xp}
          streak={skills.streak}
          doneCount={done.length}
          onEmoji={setEmoji}
          onClaimGift={claimGift}
          onLogout={logout}
        />
      )}
      {!stage && (
        <FloatingMenu
          settings={settings}
          onSettings={changeSettings}
          onPractice={(k) => (k === 'review' ? startReview() : startPractice(k))}
        />
      )}
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
  scroll: { padding: 16, paddingBottom: 100 },
  banner: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  bannerSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  giftBanner: { backgroundColor: '#FDE68A', borderRadius: 14, padding: 14, marginBottom: 12 },
  giftTxt: { fontSize: 14, fontWeight: '800', color: '#78350F' },
  review: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', borderRadius: 16, padding: 16, marginBottom: 14 },
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
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 4, marginTop: 4 },
  hint: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  dialogCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  lockTxt: { fontSize: 12, color: '#B45309', fontWeight: '700', marginTop: 4 },
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
  tabs: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  tab: { alignItems: 'center', flex: 1 },
  tabText: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 2 },
});



