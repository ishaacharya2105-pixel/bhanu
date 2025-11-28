'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCopy, ClipboardCheck, GraduationCap } from 'lucide-react';
import type { QuizAttempt, Word } from '@/lib/types';

type StatsCardsProps = {
  words: Word[];
  quizHistory: QuizAttempt[];
};

export function StatsCards({ words, quizHistory }: StatsCardsProps) {
  const totalWords = words.length;
  const quizzesTaken = quizHistory.length;
  const averageScore =
    quizzesTaken > 0
      ? quizHistory.reduce((acc, curr) => acc + curr.score, 0) / quizzesTaken
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Words</CardTitle>
          <BookCopy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWords}</div>
          <p className="text-xs text-muted-foreground">
            words in your vocabulary
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quizzes Taken</CardTitle>
          <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{quizzesTaken}</div>
          <p className="text-xs text-muted-foreground">
            total quizzes completed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore.toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground">
            average score across all quizzes
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
