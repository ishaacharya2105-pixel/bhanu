import { FlashcardPractice } from '@/components/flashcards/flashcard-practice';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flashcards | LexiLearn',
  description: 'Practice your vocabulary with interactive flashcards.',
};

export default function FlashcardsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Flashcard Practice
        </h2>
      </div>
      <FlashcardPractice />
    </div>
  );
}
