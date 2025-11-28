export type Word = {
  id: string;
  term: string;
  definition: string;
  exampleSentence: string;
  createdAt: string; // ISO string
};

export type QuizAttempt = {
  date: string; // ISO string
  score: number; // percentage
  totalQuestions: number;
};
