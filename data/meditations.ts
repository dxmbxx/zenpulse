export type MeditationItem = {
    id: string;
    title: string;
    duration: string;
    image: string;
    premium: boolean;
  };
  
  export const meditations: MeditationItem[] = [
    {
      id: '1',
      title: 'Morning Reset',
      duration: '5 min',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
      premium: false,
    },
    {
      id: '2',
      title: 'Deep Focus',
      duration: '12 min',
      image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop',
      premium: false,
    },
    {
      id: '3',
      title: 'Sleep Drift',
      duration: '18 min',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      premium: true,
    },
    {
      id: '4',
      title: 'Calm Anxiety',
      duration: '10 min',
      image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop',
      premium: true,
    },
    {
      id: '5',
      title: 'Evening Gratitude',
      duration: '7 min',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop',
      premium: true,
    },
  ];