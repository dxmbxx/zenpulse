export type Mood = '😊' | '😴' | '😟';

export function generateAffirmation(mood: Mood) {
  const promptMap = {
    '😊': 'Write a short meditation affirmation for a user who feels good and wants to stay grounded.',
    '😴': 'Write a short supportive affirmation for a tired user who needs softness and recovery.',
    '😟': 'Write a short calming affirmation for a user who feels anxious and needs peace.',
  };

  const mockResponses = {
    '😊': 'Today feels light. Breathe in gratitude, breathe out pressure, and let your calm guide the day.',
    '😴': 'You do not need to carry everything at once. Slow down, soften your breath, and return to yourself.',
    '😟': 'You are safe in this moment. Inhale peace, exhale tension, and let each breath make more room inside you.',
  };

  return {
    promptUsed: promptMap[mood],
    text: mockResponses[mood],
  };
}