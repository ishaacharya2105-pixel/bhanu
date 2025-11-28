import { VocabularyClient } from '@/components/vocabulary/vocabulary-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Vocabulary | LexiLearn',
  description: 'View and manage your learned words.',
};

export default function VocabularyPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <VocabularyClient />
    </div>
  );
}
