import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../lib/app-context';

export default function PaywallScreen() {
  const { selectedPlan, setSelectedPlan, buyPremium } = useAppState();

  return (
    <LinearGradient
      colors={['#07070C', '#15162B', '#241B45', '#120F22']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroGlow} />

          <View style={styles.content}>
            <View style={styles.topRow}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>ZENPULSE PREMIUM</Text>
              </View>
            </View>

            <Text style={styles.title}>
              Unlock your{'\n'}deepest calm
            </Text>

            <Text style={styles.subtitle}>
              Personalized meditations, AI mood guidance, and premium rituals
              crafted to help you feel grounded every day.
            </Text>

            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>What’s inside</Text>

              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Unlimited premium sessions</Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>AI mood-based affirmations</Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>
                  Sleep, focus, anxiety & reset tracks
                </Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Exclusive new content every week</Text>
              </View>
            </View>

            <View style={styles.plans}>
              <Pressable
                onPress={() => setSelectedPlan('monthly')}
                style={[
                  styles.planCard,
                  selectedPlan === 'monthly' && styles.planCardActive,
                ]}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>Monthly</Text>
                </View>

                <Text style={styles.planPrice}>$9.99</Text>
                <Text style={styles.planPeriod}>per month</Text>
              </Pressable>

              <Pressable
                onPress={() => setSelectedPlan('yearly')}
                style={[
                  styles.planCard,
                  styles.yearlyCard,
                  selectedPlan === 'yearly' && styles.planCardActive,
                ]}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.bestValue}>BEST VALUE</Text>
                  <Text style={styles.planName}>Yearly</Text>
                </View>

                <Text style={styles.planPrice}>$49.99</Text>
                <Text style={styles.planPeriod}>per year</Text>
                <Text style={styles.planSave}>Save 58%</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.ctaButton}
              onPress={() => {
                buyPremium();
                router.replace('/meditations');
              }}
            >
              <LinearGradient
                colors={['#FDE68A', '#F9A8D4', '#C4B5FD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaText}>Try 7 Days Free</Text>
              </LinearGradient>
            </Pressable>

            <Text style={styles.ctaSubtext}>
              Cancel anytime • Mock purchase for prototype demo
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  heroGlow: {
    position: 'absolute',
    top: 40,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(203, 172, 255, 0.16)',
  },
  topRow: {
    marginTop: 6,
    marginBottom: 22,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillText: {
    color: '#E9D5FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    color: '#FAF7FF',
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '800',
    letterSpacing: -1.2,
  },
  subtitle: {
    marginTop: 14,
    color: 'rgba(255,255,255,0.72)',
    fontSize: 15,
    lineHeight: 24,
    maxWidth: '92%',
  },
  featureCard: {
    marginTop: 26,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  featureTitle: {
    color: '#F5ECFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#D8B4FE',
    marginRight: 12,
  },
  featureText: {
    color: '#EDE9FE',
    fontSize: 15,
  },
  plans: {
    marginTop: 24,
    gap: 14,
  },
  planCard: {
    borderRadius: 28,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  yearlyCard: {
    backgroundColor: 'rgba(24,16,40,0.96)',
    borderColor: '#FDE68A',
  },
  planCardActive: {
    borderColor: '#E9D5FF',
    shadowColor: '#D8B4FE',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  planHeader: {
    marginBottom: 10,
  },
  bestValue: {
    color: '#FDE68A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  planName: {
    color: '#FAF7FF',
    fontSize: 20,
    fontWeight: '700',
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  planPeriod: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 14,
    marginTop: 4,
  },
  planSave: {
    color: '#FDE68A',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
  },
  ctaButton: {
    marginTop: 26,
    borderRadius: 22,
    overflow: 'hidden',
  },
  ctaGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  ctaText: {
    color: '#1D1330',
    fontSize: 16,
    fontWeight: '800',
  },
  ctaSubtext: {
    marginTop: 12,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.45)',
    fontSize: 12,
  },
});