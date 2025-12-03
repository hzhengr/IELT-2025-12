export enum IeltsPart {
  Part1 = "Part 1",
  Part2 = "Part 2",
  Part3 = "Part 3",
}

export interface Topic {
  id: string;
  title: string;
  part: IeltsPart;
  tags?: string[]; // e.g., "New", "Old"
  questions: string[]; // For Part 1 & 3
  cues?: string[]; // Specifically for Part 2
}

export interface FeedbackData {
  scoreEstimate: string;
  transcription: string;
  betterVersion: string;
  keyVocabulary: string[];
  pronunciationTips: string;
  superordinateTerms?: string[]; // Specific for Part 3 logic
}

export interface Message {
  role: 'user' | 'ai';
  content?: string;
  audioUrl?: string;
  feedback?: FeedbackData;
  isLoading?: boolean;
}