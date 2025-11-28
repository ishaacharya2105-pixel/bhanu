import { WordMatchGame } from '@/components/games/word-match-game';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games | LexiLearn',
  description: 'Play fun games to improve your vocabulary.',
};

export default function GamesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Word Match
        </h2>
      </div>
      <WordMatchGame />
    </div>
  );
}
