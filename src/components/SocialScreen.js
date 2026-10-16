// src/components/SocialScreen.js
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BOTS, botCode, rankFor, weekKey, daysLeft, TOURNAMENTS, CHALLENGES, challengeValue, challengeKey, periodKeyFor, tournamentValue } from '../lib/game';

const SUB = [['liga', 'Liga'], ['amigos', 'Amigos'], ['torneos', 'Torneos'], ['desafios', 'Desafíos']];
const MEDAL = ['🥇', '🥈', '🥉'];

const Bar = ({ value, goal }) => (
  <View style={styles.bar}>
    <View style={[styles.barFill, { width: Math.min(100, Math.round((value / goal) * 100)) + '%' }]} />
  </View>
);

export default function SocialScreen({ game, name, onAddFriend, onRemoveFriend, onJoin, onClaimTournament, onClaimChallenge }) {
  const [sub, setSub] = useState('liga');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const weekRows = rankFor(game, 'xp', weekKey(), { name, value: game.week.xp });
  const isFriend = (id) => game.friends.includes(id);

  const addByCode = () => {
    const c = code.trim().toUpperCase();
    const b = BOTS.find((x) => botCode(x) === c);
    if (!b) { setMsg('No encontramos ese código. Revísalo y vuelve a intentarlo.'); return; }
    const id = 'bot-' + b.name;
    if (isFriend(id)) { setMsg(b.name + ' ya es tu amigo 🤝'); return; }
    onAddFriend(id);
    setMsg('¡' + b.name + ' ya es tu amigo! 🎉');
    setCode('');
  };

  const renderLiga = () => (
    <View style={styles.list}>
      <Text style={styles.hint}>Ranking semanal de XP · se reinicia en {daysLeft('week')} días</Text>
      {weekRows.map((r) => (
        <View key={r.id} style={[styles.row, r.me && styles.rowMe, isFriend(r.id) && styles.rowFriend]}>
          <Text style={styles.rowRank}>{r.rank <= 3 ? MEDAL[r.rank - 1] : '#' + r.rank}</Text>
          <Text style={styles.rowEmoji}>{r.me ? game.emoji : r.emoji}</Text>
          <Text style={styles.rowName}>{r.me ? name + ' (tú)' : r.name}{isFriend(r.id) ? ' 🤝' : ''}</Text>
          <Text style={styles.rowVal}>{r.value} XP</Text>
        </View>
      ))}
    </View>
  );

  const renderAmigos = () => (
    <View style={styles.list}>
      <View style={styles.addBox}>
        <TextInput
          style={styles.input}
          placeholder="Código MOWI-XXXX"
          placeholderTextColor="#94A3B8"
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addByCode}>
          <Text style={styles.addTxt}>Agregar</Text>
        </TouchableOpacity>
      </View>
      {!!msg && <Text style={styles.msg}>{msg}</Text>}
      <Text style={styles.hint}>Tu código: {game.code}. Códigos de prueba: {BOTS.slice(0, 3).map((b) => botCode(b)).join(' · ')}</Text>
      <Text style={styles.sub}>Tus amigos ({game.friends.length})</Text>
      {game.friends.length === 0 && <Text style={styles.hint}>Aún no tienes amigos. Agrega uno con su código.</Text>}
      {game.friends.map((id) => {
        const b = BOTS.find((x) => 'bot-' + x.name === id);
        if (!b) return null;
        const r = weekRows.find((x) => x.id === id);
        return (
          <View key={id} style={styles.row}>
            <Text style={styles.rowEmoji}>{b.emoji}</Text>
            <Text style={styles.rowName}>{b.name}</Text>
            <Text style={styles.rowVal}>{r ? r.value : 0} XP</Text>
            <TouchableOpacity onPress={() => onRemoveFriend(id)}>
              <Text style={styles.remove}>Quitar</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );

  const renderTorneos = () => (
    <View style={styles.list}>
      {TOURNAMENTS.map((t) => {
        const key = periodKeyFor(t);
        const value = tournamentValue(game, t);
        const rows = rankFor(game, t.metric, key, { name, value });
        const me = rows.find((r) => r.me);
        const joined = game.joined[t.id] === key;
        const claimed = !!game.claimedTournaments[t.id + '-' + key];
        return (
          <View key={t.id} style={styles.card}>
            <Text style={styles.cardTitle}>{t.icon} {t.name}</Text>
            <Text style={styles.cardDesc}>{t.desc}</Text>
            <Text style={styles.hint}>
              Termina en {daysLeft(t.period)} días · Premio top 3: 💎 {t.prize.gems || 0}{t.prize.hearts ? ' ❤️ ' + t.prize.hearts : ''}
            </Text>
            {!joined ? (
              <TouchableOpacity style={styles.primary} onPress={() => onJoin(t)}>
                <Text style={styles.primaryTxt}>Unirme al torneo</Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.sub}>Tu posición: #{me.rank} · {me.value} puntos</Text>
                {rows.slice(0, 3).map((r) => (
                  <View key={r.id} style={[styles.row, r.me && styles.rowMe]}>
                    <Text style={styles.rowRank}>{MEDAL[r.rank - 1]}</Text>
                    <Text style={styles.rowEmoji}>{r.me ? game.emoji : r.emoji}</Text>
                    <Text style={styles.rowName}>{r.me ? name + ' (tú)' : r.name}</Text>
                    <Text style={styles.rowVal}>{r.value}</Text>
                  </View>
                ))}
                {me.rank <= 3 && !claimed && (
                  <TouchableOpacity style={styles.primary} onPress={() => onClaimTournament(t, me.rank)}>
                    <Text style={styles.primaryTxt}>Reclamar premio 🏆</Text>
                  </TouchableOpacity>
                )}
                {claimed && <Text style={styles.hint}>Premio reclamado en este periodo ✅</Text>}
              </>
            )}
          </View>
        );
      })}
    </View>
  );

  const renderDesafios = () => (
    <View style={styles.list}>
      {['week', 'month'].map((per) => (
        <View key={per} style={{ gap: 10 }}>
          <Text style={styles.sub}>
            {per === 'week' ? 'Metas de la semana · ' + daysLeft('week') + ' días' : 'Metas del mes · ' + daysLeft('month') + ' días'}
          </Text>
          {CHALLENGES.filter((c) => c.period === per).map((c) => {
            const v = challengeValue(game, c);
            const claimed = !!game.claimedChallenges[challengeKey(game, c)];
            const ok = v >= c.goal;
            return (
              <View key={c.id} style={styles.card}>
                <Text style={styles.cardTitle}>{c.icon} {c.label}</Text>
                <Text style={styles.hint}>{Math.min(v, c.goal)}/{c.goal}</Text>
                <Bar value={v} goal={c.goal} />
                {claimed ? (
                  <Text style={styles.hint}>Recompensa cobrada ✅</Text>
Get-ChildItem src\lib, src\components, src\data | Select-Object Name, Length
@'
// src/components/SocialScreen.js
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BOTS, botCode, rankFor, weekKey, daysLeft, TOURNAMENTS, CHALLENGES, challengeValue, challengeKey, periodKeyFor, tournamentValue } from '../lib/game';

const SUB = [['liga', 'Liga'], ['amigos', 'Amigos'], ['torneos', 'Torneos'], ['desafios', 'Desafíos']];
const MEDAL = ['🥇', '🥈', '🥉'];

const Bar = ({ value, goal }) => (
  <View style={styles.bar}>
    <View style={[styles.barFill, { width: Math.min(100, Math.round((value / goal) * 100)) + '%' }]} />
  </View>
);

export default function SocialScreen({ game, name, onAddFriend, onRemoveFriend, onJoin, onClaimTournament, onClaimChallenge }) {
  const [sub, setSub] = useState('liga');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const weekRows = rankFor(game, 'xp', weekKey(), { name, value: game.week.xp });
  const isFriend = (id) => game.friends.includes(id);

  const addByCode = () => {
    const c = code.trim().toUpperCase();
    const b = BOTS.find((x) => botCode(x) === c);
    if (!b) { setMsg('No encontramos ese código. Revísalo y vuelve a intentarlo.'); return; }
    const id = 'bot-' + b.name;
    if (isFriend(id)) { setMsg(b.name + ' ya es tu amigo 🤝'); return; }
    onAddFriend(id);
    setMsg('¡' + b.name + ' ya es tu amigo! 🎉');
    setCode('');
  };

  const renderLiga = () => (
    <View style={styles.list}>
      <Text style={styles.hint}>Ranking semanal de XP · se reinicia en {daysLeft('week')} días</Text>
      {weekRows.map((r) => (
        <View key={r.id} style={[styles.row, r.me && styles.rowMe, isFriend(r.id) && styles.rowFriend]}>
          <Text style={styles.rowRank}>{r.rank <= 3 ? MEDAL[r.rank - 1] : '#' + r.rank}</Text>
          <Text style={styles.rowEmoji}>{r.me ? game.emoji : r.emoji}</Text>
          <Text style={styles.rowName}>{r.me ? name + ' (tú)' : r.name}{isFriend(r.id) ? ' 🤝' : ''}</Text>
          <Text style={styles.rowVal}>{r.value} XP</Text>
        </View>
      ))}
    </View>
  );

  const renderAmigos = () => (
    <View style={styles.list}>
      <View style={styles.addBox}>
        <TextInput style={styles.input} placeholder="Código MOWI-XXXX" placeholderTextColor="#94A3B8" value={code} onChangeText={setCode} autoCapitalize="characters" />
        <TouchableOpacity style={styles.addBtn} onPress={addByCode}>
          <Text style={styles.addTxt}>Agregar</Text>
        </TouchableOpacity>
      </View>
      {!!msg && <Text style={styles.msg}>{msg}</Text>}
      <Text style={styles.hint}>Tu código: {game.code}. Códigos de prueba: {BOTS.slice(0, 3).map((b) => botCode(b)).join(' · ')}</Text>
      <Text style={styles.sub}>Tus amigos ({game.friends.length})</Text>
      {game.friends.length === 0 && <Text style={styles.hint}>Aún no tienes amigos. Agrega uno con su código.</Text>}
      {game.friends.map((id) => {
        const b = BOTS.find((x) => 'bot-' + x.name === id);
        if (!b) return null;
        const r = weekRows.find((x) => x.id === id);
        return (
          <View key={id} style={styles.row}>
            <Text style={styles.rowEmoji}>{b.emoji}</Text>
            <Text style={styles.rowName}>{b.name}</Text>
            <Text style={styles.rowVal}>{r ? r.value : 0} XP</Text>
            <TouchableOpacity onPress={() => onRemoveFriend(id)}>
              <Text style={styles.remove}>Quitar</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );

  const renderTorneos = () => (
    <View style={styles.list}>
      {TOURNAMENTS.map((t) => {
        const key = periodKeyFor(t);
        const value = tournamentValue(game, t);
        const rows = rankFor(game, t.metric, key, { name, value });
        const me = rows.find((r) => r.me);
        const joined = game.joined[t.id] === key;
        const claimed = !!game.claimedTournaments[t.id + '-' + key];
        return (
          <View key={t.id} style={styles.card}>
            <Text style={styles.cardTitle}>{t.icon} {t.name}</Text>
            <Text style={styles.cardDesc}>{t.desc}</Text>
            <Text style={styles.hint}>Termina en {daysLeft(t.period)} días · Premio top 3: 💎 {t.prize.gems || 0}{t.prize.hearts ? ' ❤️ ' + t.prize.hearts : ''}</Text>
            {!joined ? (
              <TouchableOpacity style={styles.primary} onPress={() => onJoin(t)}>
                <Text style={styles.primaryTxt}>Unirme al torneo</Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.sub}>Tu posición: #{me.rank} · {me.value} puntos</Text>
                {rows.slice(0, 3).map((r) => (
                  <View key={r.id} style={[styles.row, r.me && styles.rowMe]}>
                    <Text style={styles.rowRank}>{MEDAL[r.rank - 1]}</Text>
                    <Text style={styles.rowEmoji}>{r.me ? game.emoji : r.emoji}</Text>
                    <Text style={styles.rowName}>{r.me ? name + ' (tú)' : r.name}</Text>
                    <Text style={styles.rowVal}>{r.value}</Text>
                  </View>
                ))}
                {me.rank <= 3 && !claimed && (
                  <TouchableOpacity style={styles.primary} onPress={() => onClaimTournament(t, me.rank)}>
                    <Text style={styles.primaryTxt}>Reclamar premio 🏆</Text>
                  </TouchableOpacity>
                )}
                {claimed && <Text style={styles.hint}>Premio reclamado en este periodo ✅</Text>}
              </>
            )}
          </View>
        );
      })}
    </View>
  );

  const renderDesafios = () => (
    <View style={styles.list}>
      {['week', 'month'].map((per) => (
        <View key={per} style={{ gap: 10 }}>
          <Text style={styles.sub}>{per === 'week' ? 'Metas de la semana · ' + daysLeft('week') + ' días' : 'Metas del mes · ' + daysLeft('month') + ' días'}</Text>
          {CHALLENGES.filter((c) => c.period === per).map((c) => {
            const v = challengeValue(game, c);
            const claimed = !!game.claimedChallenges[challengeKey(game, c)];
            const ok = v >= c.goal;
            return (
              <View key={c.id} style={styles.card}>
                <Text style={styles.cardTitle}>{c.icon} {c.label}</Text>
                <Text style={styles.hint}>{Math.min(v, c.goal)}/{c.goal}</Text>
                <Bar value={v} goal={c.goal} />
                {claimed ? (
                  <Text style={styles.hint}>Recompensa cobrada ✅</Text>
                ) : ok ? (
                  <TouchableOpacity style={styles.primary} onPress={() => onClaimChallenge(c)}>
                    <Text style={styles.primaryTxt}>Cobrar recompensa</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.subTabs}>
        {SUB.map(([k, l]) => (
          <TouchableOpacity key={k} style={[styles.subTab, sub === k && styles.subTabOn]} onPress={() => setSub(k)}>
            <Text style={[styles.subTxt, sub === k && styles.subTxtOn]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {sub === 'liga' && renderLiga()}
        {sub === 'amigos' && renderAmigos()}
        {sub === 'torneos' && renderTorneos()}
        {sub === 'desafios' && renderDesafios()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  subTabs: { flexDirection: 'row', gap: 6, padding: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  subTab: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center', backgroundColor: '#F1F5F9' },
  subTabOn: { backgroundColor: '#0284C7' },
  subTxt: { fontSize: 12, fontWeight: '800', color: '#475569' },
  subTxtOn: { color: '#FFFFFF' },
  scroll: { padding: 16, paddingBottom: 100 },
  list: { gap: 10 },
  hint: { fontSize: 12, color: '#64748B' },
  sub: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  rowMe: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  rowFriend: { borderColor: '#16A34A' },
  rowRank: { width: 34, fontSize: 16, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
  rowEmoji: { fontSize: 22 },
  rowName: { flex: 1, fontSize: 14, fontWeight: '700', color: '#0F172A' },
  rowVal: { fontSize: 13, fontWeight: '800', color: '#0369A1' },
  remove: { color: '#EF4444', fontWeight: '700', fontSize: 12 },
  addBox: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', fontSize: 15 },
  addBtn: { backgroundColor: '#0284C7', paddingHorizontal: 16, borderRadius: 12, justifyContent: 'center' },
  addTxt: { color: '#FFFFFF', fontWeight: '800' },
  msg: { fontSize: 13, color: '#0369A1', fontWeight: '700' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, gap: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  cardDesc: { fontSize: 13, color: '#475569' },
  primary: { backgroundColor: '#16A34A', padding: 12, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  primaryTxt: { color: '#FFFFFF', fontWeight: '800' },
  bar: { height: 10, backgroundColor: '#E2E8F0', borderRadius: 5, overflow: 'hidden' },
  barFill: { height: 10, backgroundColor: '#22C55E', borderRadius: 5 },
});
