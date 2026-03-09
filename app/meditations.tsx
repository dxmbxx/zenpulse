import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { meditations } from '../data/meditations';
import { useAppState } from '../lib/app-context';

export default function MeditationsScreen() {
  const { isSubscribed, selectedPlan } = useAppState();

  return (
    <LinearGradient
      colors={['#07070C', '#15162B', '#241B45', '#120F22']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <FlatList
          data={meditations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerWrap}>
              <View style={styles.heroGlow} />
              <View style={styles.header}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>DAILY LIBRARY</Text>
                </View>

                <Text style={styles.title}>Your meditations</Text>
                <Text style={styles.subtitle}>
                  Breathe deeper, slow down, and choose the ritual your mind
                  needs today.
                </Text>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.aiButton}
                    onPress={() => router.push('/ai')}
                  >
                    <Text style={styles.aiButtonText}>Open AI Mood Feature</Text>
                    <Ionicons name="sparkles" size={18} color="#1D1330" />
                  </Pressable>

                  <Pressable
                    style={styles.planButton}
                    onPress={() => router.push('/paywall')}
                  >
                    <View style={styles.planButtonLeft}>
                      <Ionicons name="pricetag" size={18} color="#E9D5FF" />
                      <Text style={styles.planButtonText}>
                        {isSubscribed ? 'Manage Plan' : 'View Plans'}
                      </Text>
                    </View>

                    <View style={styles.planBadge}>
                      <Text style={styles.planBadgeText}>
                        {selectedPlan === 'yearly' ? 'YEARLY' : 'MONTHLY'}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            const locked = item.premium && !isSubscribed;

            return (
              <Pressable
                style={styles.card}
                onPress={() => {
                  if (locked) {
                    router.push('/paywall');
                  }
                }}
              >
                <Image
                  source={item.image}
                  style={styles.image}
                  contentFit="cover"
                />
                <View style={styles.overlay} />

                <View style={styles.cardContent}>
                  <View style={styles.topRow}>
                    <View style={styles.metaBadge}>
                      <Text style={styles.metaBadgeText}>{item.duration}</Text>
                    </View>

                    {item.premium && (
                      <View
                        style={[
                          styles.premiumTag,
                          locked && styles.premiumTagLocked,
                        ]}
                      >
                        <Text style={styles.premiumTagText}>PREMIUM</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.bottomRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text
                        style={[
                          styles.cardSubtitle,
                          locked && styles.cardSubtitleLocked,
                        ]}
                      >
                        {locked ? 'Locked • Upgrade to listen' : 'Available now'}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.iconWrap,
                        locked && styles.iconWrapLocked,
                      ]}
                    >
                      {locked ? (
                        <Ionicons name="lock-closed" size={18} color="#fff" />
                      ) : (
                        <Ionicons name="play" size={18} color="#fff" />
                      )}
                    </View>
                  </View>

                  {locked && <View style={styles.lockTint} />}
                </View>
              </Pressable>
            );
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 32,
  },
  headerWrap: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 0,
  },
  heroGlow: {
    position: 'absolute',
    top: 10,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(203, 172, 255, 0.16)',
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 10,
  },
  pillText: {
    color: '#E9D5FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    color: '#FAF7FF',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.66)',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
    maxWidth: '95%',
  },
  aiButton: {
    marginTop: 18,
    backgroundColor: '#F3E8FF',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actions: {
    marginTop: 18,
    gap: 12,
  },
  aiButtonText: {
    color: '#1D1330',
    fontSize: 15,
    fontWeight: '800',
  },
  planButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(17,17,31,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  planButtonText: {
    color: '#FAF7FF',
    fontSize: 15,
    fontWeight: '800',
  },
  planBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(216,180,254,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(233,213,255,0.30)',
  },
  planBadgeText: {
    color: '#E9D5FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  card: {
    minHeight: 180,
    aspectRatio: 16 / 9,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: 'rgba(17,17,31,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6,6,10,0.28)',
  },
  cardContent: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  metaBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  premiumTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(249, 250, 251, 0.18)',
  },
  premiumTagLocked: {
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
  },
  premiumTagText: {
    color: '#FDE68A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    marginTop: 4,
  },
  cardSubtitleLocked: {
    color: 'rgba(209,213,219,0.85)',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  iconWrapLocked: {
    backgroundColor: 'rgba(15,23,42,0.8)',
  },
  lockTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,10,30,0.45)',
  },
});