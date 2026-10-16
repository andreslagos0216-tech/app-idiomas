// src/components/ProfileScreen.js
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MEDALS, monthlyGift } from '../lib/game';

export const EMOJIS = ['🦉', '🦊', '🐻', '🐼', '🐸', '🐵', '🦁', '🐯', '🐨', '🦄', '🐙', '🐬', '🦋', '🐝', '🌸', '🌻', '🍀', '🌵', '🔥', '⚡', '🌙', '⭐', '🚀', '🎯', '🎸', '🎨', '⚽', '🏆', '🧠', '💎'];

const TIER = { bronze: '#B45309', silver: '#64748B', gold: '#D97706' };

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default function ProfileScreen({ game, name, rank, xp, streak, doneCount, onEmoji, onClaimGift, onLogout }) {
  const gift = monthlyGift(game);
  const earned = MEDALS.filter((m) => !!game.medals[m.id]).length;

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>{game.emoji}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rank}>{rank}</Text>
        <Text style={styles.code}>Código de amigo: {game.code}</Text>
      </View>

      <View style={styles.stats}>
        {[[xp, 'XP'], [doneCount, 'Módulos'], [game.dialogues, 'Diálogos'], [streak, 'Racha 🔥']].map(([v, l]) => (
          <View key={l} style={styles.stat}>
            <Text style={styles.statNum}>{v}</Text>
            <Text style={styles.statLbl}>{l}</Text>
          </View>
        ))}
      </View>

      <Section title="Tu avatar">
        <View style={styles.grid}>
          {EMOJIS.map((e) => (
            <TouchableOpacity key={e} onPress={() => onEmoji(e)} style={[styles.emojiBtn, game.emoji === e && styles.emojiSel]}>
              <Text style={styles.emojiTxt}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Section>

      <Section title="Regalo mensual">
        <View style={styles.gift}>
          <Text style={styles.giftTitle}>🎁 Regalo de {gift.key}</Text>
          <Text style={styles.giftDesc}>Estudiaste {gift.days} días el mes pasado. Con 10 días o más recibes un regalo.</Text>
          {gift.claimed ? (
            <Text style={styles.giftDone}>Ya lo reclamaste ✅</Text>
          ) : gift.available ? (
            <TouchableOpacity style={styles.giftBtn} onPress={onClaimGift}>
              <Text style={styles.giftBtnTxt}>Reclamar 💎 {gift.gems} + ❤️ {gift.hearts}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.giftDesc}>Te faltan {Math.max(10 - gift.days, 0)} días para el próximo regalo.</Text>
          )}
        </View>
      </Section>

      <Section title={'Medallas (' + earned + '/' + MEDALS.length + ')'}>
        <View style={styles.medals}>
          {MEDALS.map((m) => {
            const got = !!game.medals[m.id];
            return (
              <View key={m.id} style={[styles.medal, got && { borderColor: TIER[m.tier] }]}>
                <Text style={[styles.medalIcon, !got && { opacity: 0.25 }]}>{m.icon}</Text>
                <Text style={[styles.medalName, !got && { color: '#94A3B8' }]}>{m.name}</Text>
                <Text style={styles.medalDesc}>{m.desc}</Text>
              </View>
            );
          })}
        </View>
      </Section>

      <TouchableOpacity style={styles.logout} onPress={onLogout}>
        <Text style={styles.logoutTxt}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 100, gap: 16 },
  hero: { alignItems: 'center', gap: 4 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#0284C7' },
  avatarEmoji: { fontSize: 52 },
  name: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginTop: 6 },
  rank: { fontSize: 13, fontWeight: '700', color: '#0284C7' },
  code: { fontSize: 12, color: '#64748B', marginTop: 2 },
  stats: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  statNum: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  statLbl: { fontSize: 11, color: '#64748B', marginTop: 2 },
  section: { gap: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  emojiBtn: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E2E8F0' },
  emojiSel: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  emojiTxt: { fontSize: 24 },
  gift: { backgroundColor: '#FEF3C7', borderRadius: 16, padding: 16, gap: 8 },
  giftTitle: { fontSize: 16, fontWeight: '800', color: '#92400E' },
  giftDesc: { fontSize: 13, color: '#78350F' },
  giftDone: { fontSize: 14, fontWeight: '700', color: '#166534' },
  giftBtn: { backgroundColor: '#D97706', padding: 14, borderRadius: 12, alignItems: 'center' },
  giftBtnTxt: { color: '#FFFFFF', fontWeight: '800' },
  medals: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  medal: { width: '47%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 2, borderColor: '#E2E8F0', gap: 4 },
  medalIcon: { fontSize: 30 },
  medalName: { fontSize: 13, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
  medalDesc: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  logout: { backgroundColor: '#FEF2F2', padding: 14, borderRadius: 12, alignItems: 'center' },
  logoutTxt: { color: '#EF4444', fontWeight: '700' },
});
