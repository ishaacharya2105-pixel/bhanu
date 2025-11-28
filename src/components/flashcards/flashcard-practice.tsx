'use client';

import { useState, useMemo } from 'react';
import { useVocabulary } from '@/lib/hooks/use-vocabulary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Volume2,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export function FlashcardPractice() {
  const { words } = useVocabulary();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const shuffledWords = useMemo(() => {
    if (words.length === 0) return [];
    return [...words].sort(() => Math.random() - 0.5);
  }, [words]);

  const currentWord = shuffledWords[currentIndex];

  if (words.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <BookOpen className="w-16 h-16 mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold">No Words to Practice</h3>
        <p className="text-muted-foreground">
          Add some words to your vocabulary to start practicing with flashcards.
        </p>
      </Card>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledWords.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + shuffledWords.length) % shuffledWords.length
      );
    }, 150);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const progress = ((currentIndex + 1) / shuffledWords.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="perspective-1000">
          <div
            className={cn(
              'relative w-full h-[350px] md:h-[400px] transition-transform duration-700 transform-style-3d',
              isFlipped ? 'rotate-y-180' : ''
            )}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of card */}
            <Card className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 cursor-pointer">
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-bold font-headline">
                  {currentWord.term}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentWord.term);
                  }}
                >
                  <Volume2 className="w-6 h-6" />
                </Button>
              </div>
            </Card>
            {/* Back of card */}
            <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 cursor-pointer bg-secondary">
              <div className="text-center space-y-4">
                <p className="text-lg md:text-xl font-semibold">
                  {currentWord.definition}
                </p>
                <p className="text-md text-muted-foreground italic">
                  "{currentWord.exampleSentence}"
                </p>
              </div>
            </Card>
          </div>
        </div>

        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        `}</style>

        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-center text-muted-foreground">
            Word {currentIndex + 1} of {shuffledWords.length}
          </p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Button variant="outline" size="lg" onClick={handlePrev}>
            <ArrowLeft className="mr-2 h-5 w-5" /> Prev
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button size="lg" onClick={handleNext}>
            Next <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
