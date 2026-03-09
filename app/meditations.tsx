import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { meditations } from '../data/meditations';
import { useAppState } from '../lib/app-context';

export default function MeditationsScreen() {
  const { isSubscribed } = useAppState();

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={meditations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>DAILY LIBRARY</Text>
            <Text style={styles.title}>Your meditations</Text>
            <Text style={styles.subtitle}>
              Breathe deeper, slow down, and choose the ritual your mind needs today.
            </Text>

            <Pressable
              style={styles.aiButton}
              onPress={() => router.push('/ai')}
            >
              <Text style={styles.aiButtonText}>Open AI Mood Feature</Text>
              <Ionicons name="sparkles" size={18} color="#1D1330" />
            </Pressable>
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
              <Image source={item.image} style={styles.image} contentFit="cover" />
              <View style={styles.overlay} />

              <View style={styles.cardContent}>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaBadgeText}>{item.duration}</Text>
                </View>

                <View style={styles.bottomRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>
                      {locked ? 'Premium only' : 'Available now'}
                    </Text>
                  </View>

                  <View style={styles.iconWrap}>
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
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#07070C',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 18,
  },
  eyebrow: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  title: {
    color: '#FAF7FF',
    fontSize: 34,
    lineHeight: 38,
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
  aiButtonText: {
    color: '#1D1330',
    fontSize: 15,
    fontWeight: '800',
  },
  card: {
    height: 190,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#12121A',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6,6,10,0.22)',
  },
  cardContent: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
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
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    marginTop: 4,
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
  lockTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,10,30,0.28)',
  },
});