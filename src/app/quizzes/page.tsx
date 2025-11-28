import { QuizEngine } from '@/components/quizzes/quiz-engine';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quizzes | LexiLearn',
  description: 'Test your vocabulary knowledge with fun quizzes.',
};

export default function QuizzesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Vocabulary Quiz
        </h2>
      </div>
      <QuizEngine />
    </div>
  );
}
