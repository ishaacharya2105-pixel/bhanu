'use client';

import { useState, useEffect, useMemo } from 'react';
import { useVocabulary } from '@/lib/hooks/use-vocabulary';
import { Word } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, BookOpen, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const GAME_LENGTH = 5;

type GameRound = {
  word: Word;
  definitions: string[];
  correctDefinition: string;
};

export function WordMatchGame() {
  const { words } = useVocabulary();
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>(
    'idle'
  );
  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(
    null
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    const gameWords = [...words]
      .sort(() => 0.5 - Math.random())
      .slice(0, GAME_LENGTH);
    const newRounds = gameWords.map((word) => {
      const otherWords = words.filter((w) => w.id !== word.id);
      const distractors = [...otherWords]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.definition);
      const definitions = [word.definition, ...distractors].sort(
        () => 0.5 - Math.random()
      );
      return {
        word: word,
        definitions: definitions,
        correctDefinition: word.definition,
      };
    });
    setRounds(newRounds);
    setCurrentRoundIndex(0);
    setSelectedDefinition(null);
    setIsAnswered(false);
    setScore(0);
    setGameState('playing');
  };

  const handleSelectDefinition = (definition: string) => {
    if (isAnswered) return;
    setSelectedDefinition(definition);
    setIsAnswered(true);
    if (definition === rounds[currentRoundIndex].correctDefinition) {
      setScore((s) => s + 1);
    }
  };

  const handleNextRound = () => {
    if (currentRoundIndex < rounds.length - 1) {
      setCurrentRoundIndex((i) => i + 1);
      setSelectedDefinition(null);
      setIsAnswered(false);
    } else {
      setGameState('finished');
    }
  };

  if (words.length < 4) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <BookOpen className="w-16 h-16 mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Not Enough Words for a Game</h3>
        <p className="text-muted-foreground">
          You need at least 4 words in your vocabulary to play.
        </p>
      </Card>
    );
  }

  if (gameState === 'idle') {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <h3 className="text-2xl font-semibold mb-4">
          Match the word to its definition!
        </h3>
        <p className="text-muted-foreground mb-6">
          This game consists of {Math.min(words.length, GAME_LENGTH)} rounds.
        </p>
        <Button size="lg" onClick={startGame}>
          Start Game
        </Button>
      </Card>
    );
  }

  if (gameState === 'finished') {
    return (
      <Card className="text-center p-8 min-h-[400px] flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold mb-2">Game Over!</h3>
        <p className="text-5xl font-bold text-primary my-4">
          {score}/{rounds.length}
        </p>
        <p className="text-muted-foreground mb-6">
          You matched {score} out of {rounds.length} words correctly.
        </p>
        <Button onClick={startGame} size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </Card>
    );
  }

  const currentRound = rounds[currentRoundIndex];

  return (
    <Card className="p-6 md:p-8">
      <div className="text-center mb-8">
        <p className="text-lg text-muted-foreground">What is the definition of:</p>
        <h2 className="text-5xl font-bold font-headline mt-2">
          {currentRound.word.term}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentRound.definitions.map((def, i) => {
          const isCorrect = def === currentRound.correctDefinition;
          const isSelected = def === selectedDefinition;
          return (
            <Button
              key={i}
              variant="outline"
              className={cn(
                'h-auto py-4 px-6 text-left justify-start whitespace-normal transition-all duration-300 transform hover:scale-105',
                isAnswered && isCorrect && 'bg-green-100 border-green-400 text-green-900',
                isAnswered && isSelected && !isCorrect && 'bg-red-100 border-red-400 text-red-900'
              )}
              onClick={() => handleSelectDefinition(def)}
              disabled={isAnswered}
            >
              {def}
              {isAnswered && isCorrect && (
                <Check className="ml-auto h-6 w-6 text-green-600" />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <X className="ml-auto h-6 w-6 text-red-600" />
              )}
            </Button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-8 flex flex-col items-center">
          <div className="mb-4 text-center">
            {selectedDefinition === currentRound.correctDefinition ? (
              <p className="text-2xl font-bold text-green-600 animate-pulse">Correct!</p>
            ) : (
              <div>
                <p className="text-2xl font-bold text-red-600">Not quite!</p>
                <p className="text-md text-muted-foreground mt-2">
                  The correct definition is: "{currentRound.correctDefinition}"
                </p>
              </div>
            )}
          </div>
          <Button onClick={handleNextRound} size="lg">
            {currentRoundIndex === rounds.length - 1
              ? 'Finish Game'
              : 'Next Word'}
          </Button>
        </div>
      )}
    </Card>
  );
}
