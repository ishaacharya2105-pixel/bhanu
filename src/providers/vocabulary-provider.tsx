'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Word, QuizAttempt } from '@/lib/types';
import { initialWords } from '@/lib/data';

const VOCAB_STORAGE_KEY = 'lexilearn_vocab';
const QUIZ_HISTORY_KEY = 'lexilearn_quiz_history';

type VocabularyContextType = {
  words: Word[];
  addWord: (word: Word) => void;
  removeWord: (wordId: string) => void;
  quizHistory: QuizAttempt[];
  addQuizAttempt: (attempt: QuizAttempt) => void;
};

export const VocabularyContext = createContext<VocabularyContextType | undefined>(
  undefined
);

export function VocabularyProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedVocab = localStorage.getItem(VOCAB_STORAGE_KEY);
      if (storedVocab) {
        setWords(JSON.parse(storedVocab));
      } else {
        setWords(initialWords);
      }
      
      const storedHistory = localStorage.getItem(QUIZ_HISTORY_KEY);
      if (storedHistory) {
        setQuizHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setWords(initialWords);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(words));
      } catch (error) {
         console.error("Failed to save words to localStorage", error);
      }
    }
  }, [words, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(quizHistory));
      } catch (error) {
        console.error("Failed to save quiz history to localStorage", error);
      }
    }
  }, [quizHistory, isLoaded]);

  const addWord = (word: Word) => {
    setWords((prev) => [word, ...prev]);
  };

  const removeWord = (wordId: string) => {
    setWords((prev) => prev.filter((w) => w.id !== wordId));
  };
  
  const addQuizAttempt = (attempt: QuizAttempt) => {
    setQuizHistory(prev => [...prev, attempt].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const value = {
    words,
    addWord,
    removeWord,
    quizHistory,
    addQuizAttempt,
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <VocabularyContext.Provider value={value}>
      {children}
    </VocabularyContext.Provider>
  );
}
