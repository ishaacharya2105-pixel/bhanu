'use client';

import { VocabularyContext } from '@/providers/vocabulary-provider';
import { useContext } from 'react';

export const useVocabulary = () => {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error('useVocabulary must be used within a VocabularyProvider');
  }
  return context;
};
