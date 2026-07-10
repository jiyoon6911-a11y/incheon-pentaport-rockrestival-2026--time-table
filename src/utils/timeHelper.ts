import { Artist } from "../types";

// Convert "HH:MM" to minutes from 00:00 for easy comparison
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return hours * 60 + minutes;
}

// Convert minutes from 00:00 back to "HH:MM"
export function minutesToTime(mins: number): string {
  const clampedMins = Math.max(0, Math.min(1439, mins));
  const hours = Math.floor(clampedMins / 60);
  const minutes = clampedMins % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

// Check if an artist is playing at the given time
export function isCurrentlyPlaying(artist: Artist, timeStr: string): boolean {
  const currentMins = timeToMinutes(timeStr);
  const startMins = timeToMinutes(artist.startTime);
  const endMins = timeToMinutes(artist.endTime);
  return currentMins >= startMins && currentMins < endMins;
}

// Check if an artist is in the future relative to the given time
export function isFutureArtist(artist: Artist, timeStr: string): boolean {
  const currentMins = timeToMinutes(timeStr);
  const startMins = timeToMinutes(artist.startTime);
  return startMins > currentMins;
}

// Get the currently playing artist for a specific stage
export function getCurrentlyPlayingArtist(
  artists: Artist[],
  stageId: string,
  dayId: string,
  timeStr: string
): Artist | null {
  const stageArtists = artists.filter(
    (a) => a.stageId === stageId && a.dayId === dayId
  );
  return stageArtists.find((a) => isCurrentlyPlaying(a, timeStr)) || null;
}

// Get the next upcoming artist for a specific stage
export function getUpcomingArtist(
  artists: Artist[],
  stageId: string,
  dayId: string,
  timeStr: string
): Artist | null {
  const stageArtists = artists.filter(
    (a) => a.stageId === stageId && a.dayId === dayId && isFutureArtist(a, timeStr)
  );
  // Sort by start time ascending to get the very next one
  stageArtists.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  return stageArtists[0] || null;
}

// Get the previous artist for a specific stage
export function getPreviousArtist(
  artists: Artist[],
  stageId: string,
  dayId: string,
  timeStr: string
): Artist | null {
  const currentMins = timeToMinutes(timeStr);
  const stageArtists = artists.filter(
    (a) => a.stageId === stageId && a.dayId === dayId && timeToMinutes(a.endTime) <= currentMins
  );
  // Sort by end time descending to get the most recent one
  stageArtists.sort((a, b) => timeToMinutes(b.endTime) - timeToMinutes(a.endTime));
  return stageArtists[0] || null;
}

// Calculate minutes remaining or minutes until starting
export function getMinutesDifference(timeStrA: string, timeStrB: string): number {
  return timeToMinutes(timeStrA) - timeToMinutes(timeStrB);
}
