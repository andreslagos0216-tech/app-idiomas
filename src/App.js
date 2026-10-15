import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COURSES_DATA } from './coursesData';
import { PL_ES_A1 } from './data/pl-es';
import ListeningCard from './components/ListeningCard';
import PronunciationCheck from './components/PronunciationCheck';
import { PL_ES_A2 } from './data/pl-es-a2';
import { PL_ES_A2_2 } from './data/pl-es-a2-2';

import { LANGUAGES } from './data/registry';

const COURSES = { ...COURSES_DATA, pl: LANGUAGES.pl };

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedLanguageKey, setSelectedLanguageKey] = useState('pl');
  
  const [unlockedLevel, setUnlockedLevel] = useState('A1');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [hearts, setHearts] = useState(5);
  const [gems, setGems] = useState(720);
  const [xp, setXp] = useState(1950);
  const [streak, setStreak] = useState(19);
  const [activeTab, setActiveTab] = useState('home');

  const [currentModule, setCurrentModule] = useState(null);
  const [listeningDone, setListeningDone] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [writtenInput, setWrittenInput] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const [isInAiChat, setIsInAiChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'ai', text: '🦉 [Mówi AI]: Witaj! Inmersión total activada. ¿Qué módulo practicamos hoy?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const [storeItems] = useState([
    { id: 1, name: 'Vidas Vitales (x5)', price: 40, icon: '❤️', desc: 'Recarga instantánea de corazones.' },
    { id: 2, name: 'Escudo Protector de Racha', price: 90, icon: '🛡️', desc: 'Protege tu racha diaria ante ausencias.' },
    { id: 3, name: 'Multiplicador XP (2x)', price: 120, icon: '⚡', desc: 'Duplica tu ganancia de experiencia.' }
  ]);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('@mowi_username');
      const storedLang = await AsyncStorage.getItem('@mowi_lang');
      const storedUnlocked = await AsyncStorage.getItem('@mowi_unlocked');
      const storedCompleted = await AsyncStorage.getItem('@mowi_completed_lessons');
      const storedXp = await AsyncStorage.getItem('@mowi_xp');
      const storedGems = await AsyncStorage.getItem('@mowi_gems');
      const storedHearts = await AsyncStorage.getItem('@mowi_hearts');

      if (storedName) {
        setUserName(storedName);
        setIsRegistered(true);
      }
      if (storedLang && COURSES_DATA[storedLang]) setSelectedLanguageKey(storedLang);
      if (storedUnlocked) setUnlockedLevel(storedUnlocked);
      if (storedCompleted) setCompletedLessons(JSON.parse(storedCompleted));
      if (storedXp) setXp(parseInt(storedXp, 10));
      if (storedGems) setGems(parseInt(storedGems, 10));
      if (storedHearts) setHearts(parseInt(storedHearts, 10));
    } catch (e) {
      console.log('Error al cargar datos', e);
    }
  };

  const saveData = async (name, lang, level, completed, newXp, newGems, newHearts) => {
    try {
      await AsyncStorage.setItem('@mowi_username', name);
      await AsyncStorage.setItem('@mowi_lang', lang);
      await AsyncStorage.setItem('@mowi_unlocked', level);
      await AsyncStorage.setItem('@mowi_completed_lessons', JSON.stringify(completed));
      await AsyncStorage.setItem('@mowi_xp', newXp.toString());
      await AsyncStorage.setItem('@mowi_gems', newGems.toString());
      await AsyncStorage.setItem('@mowi_hearts', newHearts.toString());
    } catch (e) {
      console.log('Error al guardar datos', e);
    }
  };

  const speakText = (text) => {
    const langMap = { pl: 'pl-PL', en: 'en-US', es: 'es-ES' };
    Speech.speak(text, { language: langMap[selectedLanguageKey] || 'es-ES', pitch: 1.0, rate: 0.95 });
  };

  const handleRegister = () => {
    if (!userName.trim()) {
      Alert.alert('Atención', 'Por favor ingresa tu nombre.');
      return;
    }
    setUnlockedLevel('A1');
    setIsRegistered(true);
    saveData(userName, selectedLanguageKey, 'A1', completedLessons, xp, gems, hearts);
  };

  const startModule = (moduleData) => {
    if (hearts <= 0) {
      Alert.alert('Sin Vidas', 'Tus corazones se han agotado. Visita la tienda.');
      setActiveTab('store');
      return;
    }
    setCurrentModule(moduleData);
    setLessonIdx(0);
    setCurrentLesson(moduleData.lessons[0]);
    setSelectedOption(null);
    setWrittenInput('');
    setIsAnswerChecked(false);
    setIsCorrectAnswer(false);
    setListeningDone(false);
    setShowGrammarModal(true);
  };

  const handleCheckAnswer = () => {
    const currentL = currentLesson;
    let correct = false;

    if (currentL.type === 'choice' || currentL.type === 'dialogue') {
      correct = selectedOption === currentL.correct;
    } else if (currentL.type === 'write' || currentL.type === 'dictation') {
      correct = true;
    }const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
correct = currentL.answers.some((a) => norm(a) === norm(writtenInput));
    setIsAnswerChecked(true);
    setIsCorrectAnswer(correct);

    if (!correct) {
      const newHearts = Math.max(hearts - 1, 0);
      setHearts(newHearts);
      saveData(userName, selectedLanguageKey, unlockedLevel, completedLessons, xp, gems, newHearts);
    }
  };

  const handleNextLesson = () => {
    if (lessonIdx + 1 < currentModule.lessons.length) {
      const nextIdx = lessonIdx + 1;
      setLessonIdx(nextIdx);
      setCurrentLesson(currentModule.lessons[nextIdx]);
      setSelectedOption(null);
      setWrittenInput('');
      setIsAnswerChecked(false);
      setIsCorrectAnswer(false);
    } else {
      const updatedXp = xp + 150;
      const updatedGems = gems + 50;
      const newCompleted = [...completedLessons, currentModule.moduleId];
      
      setXp(updatedXp);
      setGems(updatedGems);
      setCompletedLessons(newCompleted);
      setCurrentModule(null);
      setCurrentLesson(null);

      let newUnlocked = unlockedLevel;
      if (newCompleted.length >= 6 && unlockedLevel === 'A1') newUnlocked = 'A2';
      else if (newCompleted.length >= 12 && unlockedLevel === 'A2') newUnlocked = 'B1';

      setUnlockedLevel(newUnlocked);
      saveData(userName, selectedLanguageKey, newUnlocked, newCompleted, updatedXp, updatedGems, hearts);
      Alert.alert('¡Excelente!', 'Has completado el módulo con éxito. +150 XP y +50 gemas.');
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    const userMsg = { id: Date.now().toString(), sender: 'user', text: userText };
    
    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      const replyText = `🦉 [Mówi AI]: Respuesta procesada en ${currentCourse?.name || ''}. ¡Sigue practicando!`;
      const aiReply = { id: (Date.now() + 1).toString(), sender: 'ai', text: replyText };
      setChatMessages((prev) => [...prev, aiReply]);
      speakText(replyText);
    }, 1000);
  };

  const buyStoreItem = (item) => {
    if (item.id === 1) {
      if (gems >= item.price) {
        const newGems = gems - item.price;
        setGems(newGems);
        setHearts(5);
        saveData(userName, selectedLanguageKey, unlockedLevel, completedLessons, xp, newGems, 5);
        Alert.alert('¡Vidas Restauradas!', 'Tus corazones están al máximo.');
      } else {
        Alert.alert('Gemas Insuficientes', 'Completa más lecciones para ganar gemas.');
      }
      return;
    }

    if (gems >= item.price) {
      const newGems = gems - item.price;
      setGems(newGems);
      saveData(userName, selectedLanguageKey, unlockedLevel, completedLessons, xp, newGems, hearts);
      Alert.alert('¡Adquisición Exitosa!', `Has obtenido: ${item.name}`);
    } else {
      Alert.alert('Gemas Insuficientes', 'Completa más lecciones para ganar gemas.');
    }
  };

  const getUserRank = (totalXp) => {
    if (totalXp < 800) return 'Principiante 📖';
    if (totalXp < 2000) return 'Estudiante Constante ✍️';
    if (totalXp < 4000) return 'Hablante Fluido 🌟';
    return 'Maestro Nativo 👑';
  };

const currentCourse = COURSES[selectedLanguageKey] || COURSES['pl'];
  if (!isRegistered) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ScrollView contentContainerStyle={styles.onboardingScroll}>
          <View style={styles.logoContainer}>
            <Text style={{ fontSize: 64 }}>🦉</Text>
          </View>
          <Text style={styles.mainTitle}>Mówi</Text>
          <Text style={styles.subTitle}>Inmersión Lingüística Inteligente</Text>

          <View style={styles.inputBox}>
            <Text style={styles.label}>¿Cómo te llamas?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Tu nombre..."
              placeholderTextColor="#A0AEC0"
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Selecciona tu idioma de estudio:</Text>
            <View style={styles.langGrid}>
              {Object.keys(COURSES_DATA).map((lKey) => (
                <TouchableOpacity
                  key={lKey}
                  style={[styles.langCard, selectedLanguageKey === lKey && styles.langSelected]}
                  onPress={() => setSelectedLanguageKey(lKey)}
                >
                  <Text style={{ fontSize: 28 }}>{COURSES_DATA[lKey].flag}</Text>
                  <Text style={styles.langText}>{COURSES_DATA[lKey].name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
            <Text style={styles.primaryButtonText}>Comenzar Inmersión</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.headerUserBox}>
          <View style={styles.avatarMini}>
            <Text style={{ fontSize: 18 }}>🦉</Text>
          </View>
          <View>
            <Text style={styles.headerUserName}>{userName}</Text>
            <Text style={styles.headerCourseName}>{currentCourse.flag} {currentCourse.name} (Inmersión)</Text>
          </View>
        </View>

        <View style={styles.headerStatsRow}>
          <View style={styles.statPill}>
            <Ionicons name="heart" size={14} color="#EF4444" />
            <Text style={[styles.statText, { color: '#EF4444' }]}>{hearts}</Text>
          </View>
          <View style={styles.statPill}>
            <Ionicons name="flame" size={14} color="#F97316" />
            <Text style={[styles.statText, { color: '#F97316' }]}>{streak}</Text>
          </View>
          <View style={styles.statPill}>
            <Ionicons name="diamond" size={14} color="#06B6D4" />
            <Text style={[styles.statText, { color: '#06B6D4' }]}>{gems}</Text>
          </View>
        </View>
      </View>

      {isInAiChat ? (
        <View style={styles.aiChatContainer}>
          <View style={styles.aiChatTopBar}>
            <TouchableOpacity onPress={() => setIsInAiChat(false)}>
              <Ionicons name="arrow-back" size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.aiChatTitle}>Tutor IA Mówi 🦉</Text>
            <TouchableOpacity onPress={() => speakText("Tutor listo.")}>
              <Ionicons name="volume-high" size={22} color="#0284C7" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            {chatMessages.map((msg) => (
              <View
                key={msg.id}
                style={[styles.bubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAi]}
              >
                <TouchableOpacity onPress={() => speakText(msg.text)}>
                  <Text style={msg.sender === 'user' ? styles.textUser : styles.textAi}>
                    {msg.text} {msg.sender === 'ai' ? '🔊' : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.aiChatBottomBar}>
            <TextInput
              style={styles.aiChatInput}
              placeholder="Escribe tu mensaje..."
              placeholderTextColor="#94A3B8"
              value={inputMessage}
              onChangeText={setInputMessage}
            />
            <TouchableOpacity style={styles.aiSendBtn} onPress={handleSendMessage}>
              <Ionicons name="send" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      ) : currentLesson && currentModule && listeningDone ? (
        <View style={styles.lessonContainer}>
          <View style={styles.lessonTopBar}>
            <TouchableOpacity onPress={() => { setCurrentModule(null); setCurrentLesson(null); }}>
              <Ionicons name="close" size={26} color="#64748B" />
            </TouchableOpacity>
            <Text style={styles.lessonProgressCounter}>
              LECCIÓN {lessonIdx + 1} / {currentModule.lessons.length}
            </Text>
            <TouchableOpacity onPress={() => speakText(currentLesson.question)}>
              <Ionicons name="volume-medium" size={24} color="#0284C7" />
            </TouchableOpacity>
          </View>

          <View style={styles.lessonCard}>
            <View style={styles.badgeType}>
              <Text style={styles.badgeTypeText}>
                {currentLesson.type === 'choice' && 'SELECCIÓN MÚLTIPLE'}
                {currentLesson.type === 'voice' && 'PRONUNCIACIÓN'}
                {currentLesson.type === 'write' && 'ESCRITURA'}
                {currentLesson.type === 'dictation' && 'DICTADO'}
                {currentLesson.type === 'arrange' && 'ORDENAR ORACIÓN'}
                {currentLesson.type === 'dialogue' && 'DIÁLOGO'}
              </Text>
            </View>

            <Text style={styles.lessonQText}>{currentLesson.question}</Text>

            {(currentLesson.type === 'choice' || currentLesson.type === 'dialogue') && (
              <View style={{ gap: 12 }}>
                {currentLesson.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentLesson.correct;
                  let optStyle = styles.optionBtn;
                  if (isAnswerChecked) {
                    if (isSelected && isCorrect) optStyle = [styles.optionBtn, styles.optCorrect];
                    else if (isSelected && !isCorrect) optStyle = [styles.optionBtn, styles.optWrong];
                    else if (isCorrect) optStyle = [styles.optionBtn, styles.optCorrect];
                  }
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={optStyle}
                      disabled={isAnswerChecked}
                      onPress={() => {
                        speakText(opt);
                        setSelectedOption(idx);
                      }}
                    >
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {(currentLesson.type === 'write' || currentLesson.type === 'dictation') && (
              <View style={{ gap: 14 }}>
                {currentLesson.type === 'dictation' && (
                  <TouchableOpacity style={styles.primaryButton} onPress={() => speakText(currentLesson.audio)}>
                    <Text style={styles.primaryButtonText}>🔊 Escuchar frase</Text>
                  </TouchableOpacity>
                )}
                <TextInput
                  style={styles.writeInput}
                  placeholder="Escribe la respuesta..."
                  placeholderTextColor="#94A3B8"
                  value={writtenInput}
                  onChangeText={setWrittenInput}
                  editable={!isAnswerChecked}
                />
                {isAnswerChecked && (
                  <Text style={{ color: isCorrectAnswer ? '#10B981' : '#EF4444', fontWeight: '700' }}>
                    {isCorrectAnswer ? '¡Correcto!' : `Respuesta correcta: "${currentLesson.correctAnswer}"`}
                  </Text>
                )}
              </View>
            )}

            {currentLesson.type === 'voice' && (
              <PronunciationCheck target={currentLesson.targetPhrase || currentLesson.audio} langCode={{ pl: 'pl-PL', en: 'en-US', es: 'es-ES' }[selectedLanguageKey] || 'pl-PL'} onPass={() => {}} />
            )}

            {false && (
              <View style={{ alignItems: 'center', paddingVertical: 20, gap: 16 }}>
                <TouchableOpacity style={styles.micButton} onPress={() => speakText(currentLesson.targetPhrase)}>
                  <Ionicons name="mic" size={36} color="#0284C7" />
                </TouchableOpacity>
                <Text style={{ color: '#64748B', fontSize: 13, textAlign: 'center' }}>
                  Toca el micrófono y pronuncia la frase.
                </Text>
              </View>
            )}

            {!isAnswerChecked ? (
              <TouchableOpacity
                style={[styles.primaryButton, { marginTop: 24 }]}
                onPress={() => {
                  if (currentLesson.type === 'voice' || currentLesson.type === 'arrange') {
                    setIsAnswerChecked(true);
                    setIsCorrectAnswer(true);
                  } else {
                    handleCheckAnswer();
                  }
                }}
              >
                <Text style={styles.primaryButtonText}>Comprobar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.primaryButton, { marginTop: 24, backgroundColor: isCorrectAnswer ? '#10B981' : '#EF4444' }]} onPress={handleNextLesson}>
                <Text style={styles.primaryButtonText}>Continuar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : currentModule && !listeningDone ? (
        <ListeningCard
          phrases={currentModule.listening || []}
          langCode={{ pl: 'pl-PL', en: 'en-US', es: 'es-ES' }[selectedLanguageKey] || 'es-ES'}
          onFinish={() => setListeningDone(true)}
          onClose={() => { setCurrentModule(null); setCurrentLesson(null); }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.bannerPremium}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>Curso: {currentCourse.name}</Text>
              <Text style={styles.bannerSub}>Progreso: {getUserRank(xp)}</Text>
            </View>
            <TouchableOpacity style={styles.bannerAiBtn} onPress={() => setIsInAiChat(true)}>
              <Ionicons name="chatbubbles-outline" size={22} color="#0284C7" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Módulos de Aprendizaje</Text>

          {currentCourse?.levels?.map((lvl) => {
            const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1'];
            const isLevelLocked = levelsOrder.indexOf(lvl.levelId) > levelsOrder.indexOf(unlockedLevel);

            return (
              <View key={lvl.levelId} style={[styles.levelCard, isLevelLocked && { opacity: 0.5 }]}>
                <View style={styles.levelHeader}>
                  <Text style={styles.levelTitle}>{lvl.title}</Text>
                </View>
                <Text style={styles.levelDesc}>{lvl.description}</Text>

                <View style={styles.modulesGrid}>
                  {lvl.modules.map((mod) => {
                    const isCompleted = completedLessons.includes(mod.moduleId);
                    return (
                      <TouchableOpacity
                        key={mod.moduleId}
                        style={[styles.moduleNode, isCompleted && styles.nodeCompleted]}
                        onPress={() => {
                          if (isLevelLocked) {
                            Alert.alert('Nivel Bloqueado', 'Completa los niveles anteriores.');
                          } else {
                            startModule(mod);
                          }
                        }}
                      >
                        <Text style={{ fontSize: 24, marginBottom: 4 }}>{isCompleted ? '✅' : mod.icon || '📘'}</Text>
                        <Text style={styles.moduleNodeTitle} numberOfLines={2}>{mod.moduleTitle}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      {activeTab === 'store' && !currentLesson && !isInAiChat && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Tienda Mówi</Text>
          {storeItems.map((item) => (
            <View key={item.id} style={styles.storeItem}>
              <Text style={{ fontSize: 32 }}>{item.icon}</Text>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.storeItemTitle}>{item.name}</Text>
                <Text style={styles.storeItemDesc}>{item.desc}</Text>
              </View>
              <TouchableOpacity style={styles.buyBtn} onPress={() => buyStoreItem(item)}>
                <Text style={styles.buyBtnText}>💎 {item.price}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {activeTab === 'profile' && !currentLesson && !isInAiChat && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileContainer}>
            <View style={styles.profileAvatar}>
              <Text style={{ fontSize: 40 }}>🦉</Text>
            </View>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileRank}>{getUserRank(xp)}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{xp}</Text>
                <Text style={styles.statLabel}>XP Total</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{streak}</Text>
                <Text style={styles.statLabel}>Racha</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.settingsBtn} onPress={() => setShowSettingsModal(true)}>
              <Text style={styles.settingsBtnText}>Configuración de Idioma</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={async () => {
                await AsyncStorage.clear();
                setIsRegistered(false);
                setUserName('');
              }}
            >
              <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal visible={showSettingsModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Idioma de Estudio</Text>
            <View style={{ gap: 10, marginVertical: 16 }}>
              {Object.keys(COURSES_DATA).map((lKey) => (
                <TouchableOpacity
                  key={lKey}
                  style={[styles.langCard, selectedLanguageKey === lKey && styles.langSelected]}
                  onPress={() => {
                    setSelectedLanguageKey(lKey);
                    saveData(userName, lKey, unlockedLevel, completedLessons, xp, gems, hearts);
                    setShowSettingsModal(false);
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{COURSES_DATA[lKey].flag}</Text>
                  <Text style={styles.langText}>{COURSES_DATA[lKey].name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setShowSettingsModal(false)}>
              <Text style={styles.primaryButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showGrammarModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nota Gramatical</Text>
            <Text style={styles.modalDesc}>{currentModule?.grammarNote}</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setShowGrammarModal(false)}>
              <Text style={styles.primaryButtonText}>Comenzar Módulo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!currentLesson && !isInAiChat && (
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('home')}>
            <Ionicons name="book-outline" size={22} color={activeTab === 'home' ? '#0284C7' : '#94A3B8'} />
            <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabActive]}>Aprender</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('store')}>
            <Ionicons name="storefront-outline" size={22} color={activeTab === 'store' ? '#0284C7' : '#94A3B8'} />
            <Text style={[styles.tabLabel, activeTab === 'store' && styles.tabActive]}>Tienda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('profile')}>
            <Ionicons name="person-outline" size={22} color={activeTab === 'profile' ? '#0284C7' : '#94A3B8'} />
            <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabActive]}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  onboardingScroll: { padding: 24, alignItems: 'center', justifyContent: 'center', flexGrow: 1 },
  logoContainer: {
    width: 90, height: 90, borderRadius: 45, backgroundColor: '#E0F2FE',
    justifyContent: 'center', alignItems: 'center', marginBottom: 16
  },
  mainTitle: { fontSize: 32, fontWeight: '800', color: '#0F172A', letterSpacing: 0.5 },
  subTitle: { fontSize: 13, color: '#64748B', marginBottom: 30, fontWeight: '500' },
  inputBox: { width: '100%', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 },
  textInput: {
    backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 14,
    borderRadius: 12, fontSize: 15, color: '#0F172A', borderWidth: 1, borderColor: '#E2E8F0'
  },
  langGrid: { flexDirection: 'row', gap: 10 },
  langCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12,
    borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', gap: 8
  },
  langSelected: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  langText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  primaryButton: {
    width: '100%', backgroundColor: '#0284C7', paddingVertical: 16,
    borderRadius: 14, alignItems: 'center', marginTop: 10, shadowColor: '#0284C7', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4
  },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  headerUserBox: { flexDirection: 'row', alignItems: 'center' },
  avatarMini: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0F2FE',
    justifyContent: 'center', alignItems: 'center', marginRight: 10
  },
  headerUserName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  headerCourseName: { fontSize: 11, color: '#64748B', fontWeight: '500' },
  headerStatsRow: { flexDirection: 'row', gap: 8 },
  statPill: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4
  },
  statText: { fontSize: 12, fontWeight: '700' },
  scrollContent: { padding: 20, paddingBottom: 90 },
  bannerPremium: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18,
    marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  bannerSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  bannerAiBtn: { backgroundColor: '#E0F2FE', borderRadius: 20, padding: 8 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 14 },
  levelCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
    marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0'
  },
  levelHeader: { marginBottom: 4 },
  levelTitle: { fontSize: 14, fontWeight: '700', color: '#0284C7' },
  levelDesc: { fontSize: 12, color: '#64748B', marginBottom: 12 },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between'
  },
  moduleNode: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 4
  },
  nodeCompleted: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  moduleNodeTitle: { fontSize: 12, fontWeight: '600', color: '#1E293B', textAlign: 'center', height: 32 },
  storeItem: {
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: '#E2E8F0'
  },
  storeItemTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  storeItemDesc: { fontSize: 11, color: '#64748B', marginTop: 2 },
  buyBtn: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  buyBtnText: { color: '#0369A1', fontWeight: '700', fontSize: 12 },
  aiChatContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  aiChatTopBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0'
  },
  aiChatTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  bubble: { maxWidth: '85%', padding: 12, borderRadius: 14, marginBottom: 10 },
  bubbleUser: { alignSelf: 'flex-end', backgroundColor: '#0284C7' },
  bubbleAi: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  textUser: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
  textAi: { color: '#0F172A', fontSize: 13, lineHeight: 18 },
  aiChatBottomBar: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', gap: 8
  },
  aiChatInput: {
    flex: 1, backgroundColor: '#F8FAFC', color: '#0F172A',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16,
    fontSize: 13, borderWidth: 1, borderColor: '#E2E8F0'
  },
  aiSendBtn: { backgroundColor: '#0284C7', padding: 10, borderRadius: 16 },
  lessonContainer: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  lessonTopBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  lessonProgressCounter: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  lessonCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  badgeType: { backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 10 },
  badgeTypeText: { color: '#0369A1', fontSize: 9, fontWeight: '700' },
  lessonQText: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 20, lineHeight: 22 },
  optionBtn: { padding: 14, borderRadius: 12, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0' },
  optCorrect: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  optWrong: { backgroundColor: '#FEF2F2', borderColor: '#EF4444' },
  optionText: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  writeInput: { backgroundColor: '#F8FAFC', padding: 14, borderRadius: 12, color: '#0F172A', fontSize: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  micButton: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#E0F2FE',
    borderWidth: 1, borderColor: '#0284C7', justifyContent: 'center', alignItems: 'center'
  },
  profileContainer: { alignItems: 'center', paddingTop: 10 },
  profileAvatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0F2FE',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12
  },
  profileName: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  profileRank: { fontSize: 12, fontWeight: '600', color: '#0284C7', marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 12, width: '100%', marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: '#FFFFFF', padding: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  statNumber: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: '500' },
  settingsBtn: { backgroundColor: '#F1F5F9', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 10 },
  settingsBtnText: { color: '#334155', fontWeight: '600', fontSize: 13 },
  logoutBtn: { backgroundColor: '#FEF2F2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 30 },
  logoutBtnText: { color: '#EF4444', fontWeight: '600', fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  modalDesc: { fontSize: 13, color: '#64748B', lineHeight: 20, marginBottom: 20 },
  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
    backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9'
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 10, color: '#94A3B8', marginTop: 2, fontWeight: '600' },
  tabActive: { color: '#0284C7', fontWeight: '700' }
});






