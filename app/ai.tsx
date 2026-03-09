import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
      <View style={styles.content}>
        <Text style={styles.title}>AI Mood of the Day</Text>
        <Text style={styles.subtitle}>
          Pick your vibe and generate a short guided affirmation.
        </Text>

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
          <Text style={styles.resultLabel}>AI-crafted for your mood</Text>
          <Text style={styles.resultText}>
            {result || 'Your affirmation will appear here.'}
          </Text>
        </View>

        <View style={styles.promptBox}>
          <Text style={styles.promptTitle}>Mock prompt used</Text>
          <Text style={styles.promptText}>
            {promptUsed || 'Prompt will appear after generation.'}
          </Text>
        </View>

        <Pressable onPress={() => router.push('/meditations')}>
          <Text style={styles.back}>← Back to Meditations</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#A1A1AA',
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
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
    marginTop: 20,
    backgroundColor: '#18181B',
    borderRadius: 24,
    padding: 18,
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
    padding: 16,
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
    marginTop: 18,
    fontSize: 15,
    fontWeight: '700',
  },
});