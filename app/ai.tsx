import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { Mood, generateAffirmation } from '../lib/ai';

const moods: Mood[] = ['😊', '😴', '😟'];

export default function AiScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood>('😊');
  const [result, setResult] = useState<string>('');
  const [promptUsed, setPromptUsed] = useState<string>('');

  return (
    <LinearGradient
      colors={['#07070C', '#15162B', '#241B45', '#120F22']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroGlow} />

          <View style={styles.header}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>AI MOOD</Text>
            </View>

            <Text style={styles.title}>Tune your day</Text>
            <Text style={styles.subtitle}>
              Choose how you feel and let ZenPulse craft a gentle, guided
              affirmation for your current mood.
            </Text>
          </View>

          <View style={styles.moods}>
            {moods.map((mood) => (
              <Pressable
                key={mood}
                onPress={() => setSelectedMood(mood)}
                style={[
                  styles.moodButton,
                  selectedMood === mood && styles.moodButtonActive,
                ]}
              >
                <Text style={styles.moodText}>{mood}</Text>
              </Pressable>
            ))}
          </View>

          <PrimaryButton
            title="Generate my vibe"
            onPress={() => {
              const generated = generateAffirmation(selectedMood);
              setResult(generated.text);
              setPromptUsed(generated.promptUsed);
            }}
          />

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>AI-crafted affirmation</Text>
            <Text style={styles.resultText}>
              {result || 'Your affirmation will appear here after generation.'}
            </Text>
          </View>

          <View style={styles.promptBox}>
            <Text style={styles.promptTitle}>Prompt sent to the model</Text>
            <Text style={styles.promptText}>
              {promptUsed || 'Prompt will appear here after generation.'}
            </Text>
          </View>

          <Pressable onPress={() => router.push('/meditations')}>
            <Text style={styles.back}>← Back to Meditations</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
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
  header: {
    marginBottom: 20,
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
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: '96%',
  },
  moods: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  moodButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(17,17,31,0.96)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  moodButtonActive: {
    borderColor: '#C084FC',
    backgroundColor: 'rgba(216,180,254,0.12)',
  },
  moodText: {
    fontSize: 28,
  },
  resultCard: {
    marginTop: 22,
    backgroundColor: 'rgba(15,15,27,0.9)',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  resultLabel: {
    color: '#C084FC',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
  },
  promptBox: {
    marginTop: 16,
    backgroundColor: 'rgba(17,17,31,0.96)',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  promptTitle: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  promptText: {
    color: '#E5E7EB',
    fontSize: 14,
    lineHeight: 21,
  },
  back: {
    color: '#D8B4FE',
    marginTop: 20,
    fontSize: 15,
    fontWeight: '700',
  },
});