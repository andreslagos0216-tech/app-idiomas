// src/components/LessonScreen.js
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as FB from '../lib/feedback';

const PASS = 80;
const MAX_TRIES = 3;

const clean = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

const editDist = (a, b) => {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
};

const tolerance = (w) => (w.length >= 6 ? 2 : w.length >= 4 ? 1 : 0);

const analyze = (target, heard) => {
  const t = clean(target).split(' ').filter(Boolean);
  const h = clean(heard).split(' ').filter(Boolean);
  const words = t.map((w) => {
    let best = Infinity;
    h.forEach((x) => { best = Math.min(best, editDist(w, x)); });
    const k = tolerance(w);
    return { word: w, status: best <= k ? 'ok' : best <= k + 1 ? 'close' : 'miss' };
  });
  const pts = words.reduce((a, w) => a + (w.status === 'ok' ? 1 : w.status === 'close' ? 0.5 : 0), 0);
  return { words, score: t.length ? Math.round((pts / t.length) * 100) : 0 };
};

const rot = (arr) => (arr.length > 1 ? [...arr.slice(1), arr[0]] : arr);

const KIND = {
  choice: 'ELIGE LA RESPUESTA',
  listen: 'ESCUCHA Y ELIGE',
  match: 'UNE LAS PAREJAS',
  build: 'ORDENA LA FRASE',
  speak: 'REPITE EN VOZ ALTA',
  dictation: 'DICTADO',
  write: 'ESCRIBE',
};

function CheckBtn({ onPress, disabled }) {
  return (
    <TouchableOpacity style={[styles.check, disabled && styles.checkOff]} disabled={disabled} onPress={onPress}>
      <Text style={styles.checkText}>Comprobar</Text>
    </TouchableOpacity>
  );
}

function ChoiceStep({ lesson, result, finish, speak, listen }) {
  const [sel, setSel] = useState(null);
  useEffect(() => { if (listen) speak(lesson.audio); }, []);
  return (
    <View style={styles.stack}>
      <Text style={styles.question}>{lesson.question}</Text>
      {listen && (
        <TouchableOpacity style={styles.replay} onPress={() => speak(lesson.audio)}>
          <Ionicons name="volume-high" size={26} color="#0284C7" />
          <Text style={styles.replayText}>Escuchar otra vez</Text>
        </TouchableOpacity>
      )}
      {lesson.options.map((o, i) => {
        const isOk = !!result && i === lesson.correct;
        const isBad = !!result && sel === i && !result.ok;
        return (
          <TouchableOpacity
            key={i}
            disabled={!!result}
            style={[styles.option, sel === i && !result && styles.optSel, isOk && styles.optOk, isBad && styles.optBad]}
            onPress={() => { setSel(i); speak(o); }}
          >
            <Text style={styles.optionText}>{o}</Text>
          </TouchableOpacity>
        );
      })}
      {!result && (
        <CheckBtn
          disabled={sel === null}
          onPress={() => finish(sel === lesson.correct, sel === lesson.correct ? '¡Muy bien!' : 'Era: ' + lesson.options[lesson.correct])}
        />
      )}
    </View>
  );
}

function BuildStep({ lesson, result, finish }) {
  const target = lesson.audio || (lesson.answers && lesson.answers[0]) || '';
  const items = target.split(' ').filter(Boolean).map((w, i) => ({ w, id: i }));
  const [bank, setBank] = useState(() => rot(items));
  const [built, setBuilt] = useState([]);
  const quoted = ((lesson.prompt && lesson.prompt.es) || '').match(/"([^"]+)"/);
  const question = quoted ? 'Ordena la frase en polaco: "' + quoted[1] + '"' : 'Ordena las palabras en polaco';

  const add = (it) => { setBank(bank.filter((b) => b.id !== it.id)); setBuilt([...built, it]); };
  const remove = (it) => { setBuilt(built.filter((b) => b.id !== it.id)); setBank([...bank, it]); };
  const check = () => {
    const ok = clean(built.map((b) => b.w).join(' ')) === clean(target);
    finish(ok, ok ? '¡Perfecto!' : 'Frase correcta: ' + target);
  };

  return (
    <View style={styles.stack}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.buildBox}>
        {built.length === 0 && <Text style={styles.hint}>Toca las palabras en orden</Text>}
        <View style={styles.chips}>
          {built.map((it) => (
            <TouchableOpacity key={it.id} disabled={!!result} style={styles.chipUsed} onPress={() => remove(it)}>
              <Text style={styles.chipText}>{it.w}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.chips}>
        {bank.map((it) => (
          <TouchableOpacity key={it.id} disabled={!!result} style={styles.chip} onPress={() => add(it)}>
            <Text style={styles.chipText}>{it.w}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {!result && <CheckBtn disabled={built.length === 0} onPress={check} />}
    </View>
  );
}

function MatchStep({ lesson, onPass, speak }) {
  const pairs = lesson.pairs;
  const [left] = useState(() => pairs.map((p, i) => ({ id: i, text: p.pl })));
  const [right] = useState(() => pairs.map((p, i) => ({ id: i, text: p.es })).reverse());
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState([]);
  const [wrong, setWrong] = useState(null);

  const tap = (side, it) => {
    if (done.includes(it.id)) return;
    if (side === 'l') speak(it.text, 0.9);
    if (!sel || sel.side === side) { setSel({ side, id: it.id }); return; }
    const lId = side === 'l' ? it.id : sel.id;
    const rId = side === 'r' ? it.id : sel.id;
    setSel(null);
    if (lId === rId) {
      const nd = [...done, lId];
      setDone(nd);
      if (nd.length === pairs.length) onPass();
    } else {
      setWrong({ l: lId, r: rId });
      setTimeout(() => setWrong(null), 700);
    }
  };

  const state = (side, id) => {
    if (done.includes(id)) return 'done';
    if (wrong && (side === 'l' ? wrong.l === id : wrong.r === id)) return 'wrong';
    if (sel && sel.side === side && sel.id === id) return 'sel';
    return 'idle';
  };

  const tile = (side, it) => {
    const s = state(side, it.id);
    return (
      <TouchableOpacity
        key={side + it.id}
        disabled={s === 'done'}
        onPress={() => tap(side, it)}
        style={[styles.tile, s === 'sel' && styles.tileSel, s === 'wrong' && styles.tileWrong, s === 'done' && styles.tileDone]}
      >
        <Text style={[styles.tileText, s === 'done' && { color: '#166534' }]}>{it.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.stack}>
      <Text style={styles.question}>Toca una palabra en polaco y después su significado.</Text>
      <View style={styles.matchCols}>
        <View style={styles.col}>{left.map((it) => tile('l', it))}</View>
        <View style={styles.col}>{right.map((it) => tile('r', it))}</View>
      </View>
      <Text style={styles.progressText}>{done.length}/{pairs.length} parejas</Text>
    </View>
  );
}

function SpeakStep({ lesson, langCode, result, finish, speak }) {
  const target = lesson.audio || lesson.targetPhrase || '';
  const [phase, setPhase] = useState('idle');
  const [view, setView] = useState(null);
  const [heard, setHeard] = useState('');
  const [tries, setTries] = useState(0);
  const [msg, setMsg] = useState('Pulsa el micrófono y repite la frase.');
  const rec = useRef(null);
  const settled = useRef(false);
  const count = useRef(0);

  useEffect(() => () => { try { if (rec.current) rec.current.abort(); } catch (e) {} }, []);

  const stopRec = () => { try { if (rec.current) rec.current.stop(); } catch (e) {} };

  const pass = (a, text) => {
    if (settled.current) return;
    settled.current = true;
    setView(a);
    setHeard(text);
    setPhase('ok');
    setMsg('¡Excelente pronunciación! 🎉');
    finish(true, a.score + '/100 · ¡Sigue así!');
  };

  const fail = (a, text) => {
    count.current += 1;
    setTries(count.current);
    setView(a);
    setHeard(text);
    setPhase('fail');
    setMsg(count.current >= MAX_TRIES ? 'Escucha el modelo despacio y vuelve a intentarlo.' : 'Casi. Revisa las palabras en ámbar o rojo.');
  };

  const listen = () => {
    const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SR) {
      setPhase('unsupported');
      setMsg('Este navegador no tiene reconocimiento de voz. Puedes usar "Lo dije bien".');
      return;
    }
    try {
      const r = new SR();
      r.lang = langCode;
      r.interimResults = true;
      r.continuous = false;
      r.maxAlternatives = 3;
      rec.current = r;
      settled.current = false;
      setPhase('listening');
      setView(null);
      setMsg('Te escucho… repite la frase.');

      r.onresult = (e) => {
        let best = null;
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          for (let k = 0; k < res.length; k++) {
            const a = analyze(target, res[k].transcript);
            if (!best || a.score > best.a.score) best = { a, t: res[k].transcript };
          }
        }
        if (!best) return;
        if (best.a.score >= PASS) { stopRec(); pass(best.a, best.t); return; }
        setView(best.a);
        setHeard(best.t);
        if (e.results[e.results.length - 1].isFinal) fail(best.a, best.t);
      };

      r.onerror = (e) => {
        if (e.error === 'aborted') return;
        setPhase('error');
        setMsg(
          e.error === 'not-allowed'
            ? 'Permiso del micrófono denegado. Actívalo en Ajustes → Safari → Micrófono.'
            : e.error === 'no-speech'
            ? 'No te escuché. Acércate y vuelve a intentarlo.'
            : 'Problema con el micrófono (' + e.error + '). Inténtalo otra vez.'
        );
      };

      r.onend = () => { if (!settled.current) setPhase((p) => (p === 'listening' ? 'idle' : p)); };
      r.start();
    } catch (err) {
      setPhase('unsupported');
      setMsg('No se pudo iniciar el micrófono. Puedes usar "Lo dije bien".');
    }
  };

  const selfPass = () => pass({ words: analyze(target, target).words, score: 100 }, target);

  return (
    <View style={styles.speak}>
      <Text style={styles.speakTarget}>{target}</Text>
      <Text style={[styles.status, (phase === 'error' || phase === 'unsupported') && styles.statusWarn]}>{msg}</Text>

      {view && (
        <View style={styles.wordRow}>
          {view.words.map((w, i) => (
            <Text key={i} style={[styles.word, w.status === 'ok' ? styles.wOk : w.status === 'close' ? styles.wClose : styles.wMiss]}>
              {w.word}
            </Text>
          ))}
        </View>
      )}
      {view && <Text style={styles.scoreTxt}>{view.score}/100{heard ? ' · "' + heard + '"' : ''}</Text>}

      {!result && (
        <>
          <TouchableOpacity style={[styles.mic, phase === 'listening' && styles.micOn]} onPress={phase === 'listening' ? stopRec : listen}>
            <Ionicons name={phase === 'listening' ? 'stop' : 'mic'} size={36} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity style={styles.soft} onPress={() => speak(target, 0.85)}>
              <Text style={styles.softText}>🔊 Escuchar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.soft} onPress={() => speak(target, 0.5)}>
              <Text style={styles.softText}>🐢 Lento</Text>
            </TouchableOpacity>
          </View>
          {(phase === 'unsupported' || phase === 'error' || tries >= MAX_TRIES) && (
            <TouchableOpacity style={styles.selfBtn} onPress={selfPass}>
              <Text style={styles.selfText}>✅ Lo dije bien</Text>
            </TouchableOpacity>
          )}
          {tries >= MAX_TRIES && (
            <TouchableOpacity onPress={() => finish(false, 'Practica esta frase más tarde.')}>
              <Text style={styles.link}>Continuar sin superarla</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

function TypeStep({ lesson, result, finish, speak }) {
  const [text, setText] = useState('');
  const dict = lesson.type === 'dictation';
  useEffect(() => { if (dict) speak(lesson.audio); }, []);
  const check = () => {
    const ok = (lesson.answers || []).some((a) => clean(a) === clean(text));
    finish(ok, ok ? '¡Correcto!' : 'Respuesta: ' + ((lesson.answers || [])[0] || ''));
  };
  return (
    <View style={styles.stack}>
      <Text style={styles.question}>{lesson.question || (lesson.prompt && lesson.prompt.es) || ''}</Text>
      {dict && (
        <TouchableOpacity style={styles.replay} onPress={() => speak(lesson.audio)}>
          <Ionicons name="volume-high" size={26} color="#0284C7" />
          <Text style={styles.replayText}>Escuchar otra vez</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        editable={!result}
        autoCapitalize="none"
        placeholder="Escribe aquí..."
        placeholderTextColor="#94A3B8"
      />
      {!result && <CheckBtn disabled={!text.trim()} onPress={check} />}
    </View>
  );
}

function Step({ lesson, langCode, onNext, onWrong, onAnswer }) {
  const [result, setResult] = useState(null);
  const autoNext = lesson.type === 'match';

  const speak = (text, rate = 0.85) => {
    try {
      Speech.stop();
      if (text) Speech.speak(text, { language: langCode, rate });
    } catch (e) {}
  };

  const finish = (ok, note) => {
    setResult({ ok, note });
    ok ? FB.correct() : FB.wrong();
    if (onAnswer) onAnswer(lesson.type, ok, lesson.audio || lesson.targetPhrase || (lesson.answers && lesson.answers[0]));
    if (!ok) onWrong();
  };

  useEffect(() => {
    if (result && result.ok && autoNext) {
      const t = setTimeout(onNext, 1400);
      return () => clearTimeout(t);
    }
  }, [result]);

  const common = { lesson, result, finish, speak, langCode };
  let body = null;
  if (lesson.type === 'choice') body = <ChoiceStep {...common} listen={false} />;
  else if (lesson.type === 'listen') body = <ChoiceStep {...common} listen />;
  else if (lesson.type === 'build') body = <BuildStep {...common} />;
  else if (lesson.type === 'match') body = <MatchStep lesson={lesson} speak={speak} onPass={() => finish(true, '¡Todas las parejas correctas! 🎉')} />;
  else if (lesson.type === 'speak') body = <SpeakStep {...common} />;
  else body = <TypeStep {...common} />;

  const ok = !!result && result.ok;
  return (
    <View style={styles.stack}>
      {body}
      {result && (
        <View style={[styles.feedback, ok ? styles.fbOk : styles.fbBad]}>
          <Text style={[styles.fbTitle, { color: ok ? '#166534' : '#991B1B' }]}>{ok ? '¡Correcto!' : 'Casi…'}</Text>
          {!!result.note && <Text style={styles.fbNote}>{result.note}</Text>}
          <TouchableOpacity style={[styles.cont, { backgroundColor: ok ? '#16A34A' : '#DC2626' }]} onPress={onNext}>
            <Text style={styles.contText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function LessonScreen({ lessons, moduleTitle, langCode, onLoseHeart, onAnswer, onExit, onComplete }) {
  const [idx, setIdx] = useState(0);
  const total = lessons.length;
  const lesson = lessons[idx];
  const next = () => { FB.tap(); idx + 1 < total ? setIdx(idx + 1) : (FB.finish(), onComplete()); };
  if (!lesson) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.top}>
        <TouchableOpacity onPress={onExit}>
          <Ionicons name="close" size={26} color="#64748B" />
        </TouchableOpacity>
        <View style={styles.track}>
          <View style={[styles.fill, { width: Math.round((idx / total) * 100) + '%' }]} />
        </View>
        <Text style={styles.count}>{idx + 1}/{total}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.module}>{moduleTitle}</Text>
        <Text style={styles.kind}>{KIND[lesson.type] || ''}</Text>
        <Step key={idx} lesson={lesson} langCode={langCode} onNext={next} onWrong={onLoseHeart} onAnswer={onAnswer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#F8FAFC' },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  track: { flex: 1, height: 12, backgroundColor: '#E2E8F0', borderRadius: 6, overflow: 'hidden' },
  fill: { height: 12, backgroundColor: '#22C55E', borderRadius: 6 },
  count: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  body: { padding: 20, paddingBottom: 60 },
  module: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  kind: { fontSize: 12, fontWeight: '800', color: '#0284C7', marginTop: 4, marginBottom: 16 },
  stack: { gap: 14, width: '100%' },
  question: { fontSize: 18, fontWeight: '700', color: '#0F172A', lineHeight: 24 },
  option: { padding: 16, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0' },
  optSel: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  optOk: { borderColor: '#16A34A', backgroundColor: '#DCFCE7' },
  optBad: { borderColor: '#DC2626', backgroundColor: '#FEE2E2' },
  optionText: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  replay: { flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start', backgroundColor: '#E0F2FE', padding: 12, borderRadius: 12 },
  replayText: { color: '#0369A1', fontWeight: '700' },
  check: { backgroundColor: '#0284C7', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 6 },
  checkOff: { backgroundColor: '#CBD5E1' },
  checkText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  buildBox: { minHeight: 70, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, borderWidth: 2, borderColor: '#E2E8F0', justifyContent: 'center' },
  hint: { color: '#94A3B8', fontSize: 13, textAlign: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E1' },
  chipUsed: { backgroundColor: '#E0F2FE', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, borderWidth: 2, borderColor: '#0284C7' },
  chipText: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  matchCols: { flexDirection: 'row', gap: 12 },
  col: { flex: 1, gap: 10 },
  tile: { padding: 14, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0', minHeight: 56, justifyContent: 'center' },
  tileSel: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  tileWrong: { borderColor: '#DC2626', backgroundColor: '#FEE2E2' },
  tileDone: { borderColor: '#16A34A', backgroundColor: '#DCFCE7' },
  tileText: { fontSize: 15, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
  progressText: { textAlign: 'center', color: '#64748B', fontWeight: '600' },
  speak: { alignItems: 'center', gap: 14, width: '100%' },
  speakTarget: { fontSize: 22, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
  status: { fontSize: 14, color: '#334155', textAlign: 'center' },
  statusWarn: { color: '#B45309' },
  wordRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  word: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, fontSize: 16, fontWeight: '700', overflow: 'hidden' },
  wOk: { backgroundColor: '#DCFCE7', color: '#166534' },
  wClose: { backgroundColor: '#FEF3C7', color: '#92400E' },
  wMiss: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  scoreTxt: { fontSize: 13, color: '#475569' },
  mic: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#0284C7', justifyContent: 'center', alignItems: 'center' },
  micOn: { backgroundColor: '#EF4444' },
  row: { flexDirection: 'row', gap: 10 },
  soft: { backgroundColor: '#E0F2FE', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
  softText: { color: '#0369A1', fontWeight: '700', fontSize: 13 },
  selfBtn: { backgroundColor: '#F1F5F9', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 },
  selfText: { fontWeight: '700', color: '#0F172A' },
  link: { color: '#64748B', fontWeight: '600', textDecorationLine: 'underline', marginTop: 4 },
  input: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, fontSize: 16, color: '#0F172A', borderWidth: 2, borderColor: '#E2E8F0' },
  feedback: { borderRadius: 16, padding: 16, gap: 8, marginTop: 8 },
  fbOk: { backgroundColor: '#DCFCE7' },
  fbBad: { backgroundColor: '#FEE2E2' },
  fbTitle: { fontSize: 18, fontWeight: '800' },
  fbNote: { fontSize: 14, color: '#334155' },
  cont: { padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 6 },
  contText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});

