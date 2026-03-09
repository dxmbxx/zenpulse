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
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>AI MOOD</Text>
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
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#07070C',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 20,
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
    backgroundColor: '#18181B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272A',
  },
  moodButtonActive: {
    borderColor: '#C084FC',
    backgroundColor: '#2E1065',
  },
  moodText: {
    fontSize: 28,
  },
  resultCard: {
    marginTop: 22,
    backgroundColor: '#18181B',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 18,
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
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
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