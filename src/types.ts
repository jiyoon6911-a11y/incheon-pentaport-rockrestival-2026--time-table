export interface Artist {
  id: string;
  name: string;
  genre: string;
  startTime: string; // "HH:MM" e.g., "14:20"
  endTime: string;   // "HH:MM" e.g., "15:10"
  description: string;
  imageUrl?: string;
  stageId: string;
  dayId: string; // "day1" | "day2"
}

export interface Stage {
  id: string;
  name: string;
  color: string; // Tailwind class color
  description: string;
}

export interface FestivalDay {
  id: string;
  name: string;
  date: string; // "2026-07-06"
}

export interface Favorite {
  artistId: string;
  alertEnabled: boolean;
}

export interface TimeState {
  isSimulated: boolean;
  simulatedTime: string; // "HH:MM"
  simulatedDayId: string; // "day1" | "day2"
}
