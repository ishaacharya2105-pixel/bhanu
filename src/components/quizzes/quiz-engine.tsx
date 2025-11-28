'use client';

import { useVocabulary } from '@/lib/hooks/use-vocabulary';
import { Word } from '@/lib/types';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { BookOpen, CheckCircle, RotateCcw, XCircle } from 'lucide-react';
import { Progress } from '../ui/progress';

const QUIZ_LENGTH = 5;

type QuizQuestion = {
  questionWord: Word;
  options: string[];
  correctAnswer: string;
};

export function QuizEngine() {
  const { words, addQuizAttempt } = useVocabulary();
  const [quizState, setQuizState] = useState<'idle' | 'running' | 'finished'>(
    'idle'
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const score = useMemo(() => {
    if (quizState !== 'finished') return 0;
    return questions.reduce((correct, question, index) => {
      return userAnswers[index] === question.correctAnswer ? correct + 1 : correct;
    }, 0);
  }, [quizState, questions, userAnswers]);

  const startQuiz = () => {
    const quizWords = [...words].sort(() => 0.5 - Math.random()).slice(0, QUIZ_LENGTH);
    const newQuestions: QuizQuestion[] = quizWords.map((word) => {
      const otherWords = words.filter((w) => w.id !== word.id);
      const distractors = [...otherWords]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.definition);
      
      const options = [word.definition, ...distractors].sort(() => 0.5 - Math.random());
      
      return {
        questionWord: word,
        options: options,
        correctAnswer: word.definition,
      };
    });

    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizState('running');
  };
  
  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    setUserAnswers(prev => [...prev, selectedAnswer]);
    setIsAnswered(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizState('finished');
      const finalScore = questions.reduce((correct, question, index) => {
        const finalAnswers = [...userAnswers, selectedAnswer]
        return finalAnswers[index] === question.correctAnswer ? correct + 1 : correct;
      }, 0);
      addQuizAttempt({
        date: new Date().toISOString(),
        score: (finalScore / questions.length) * 100,
        totalQuestions: questions.length,
      });
    }
  }

  if (words.length < 4) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <BookOpen className="w-16 h-16 mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Not Enough Words for a Quiz</h3>
        <p className="text-muted-foreground">
          You need at least 4 words in your vocabulary to start a quiz.
        </p>
      </Card>
    );
  }

  if (quizState === 'idle') {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <h3 className="text-2xl font-semibold mb-4">Ready to test your knowledge?</h3>
        <p className="text-muted-foreground mb-6">A quiz consists of {Math.min(words.length, QUIZ_LENGTH)} questions.</p>
        <Button size="lg" onClick={startQuiz}>Start Quiz</Button>
      </Card>
    );
  }
  
  if (quizState === 'finished') {
    return (
      <Card className="text-center p-8 min-h-[400px] flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-5xl font-bold text-primary my-4">
          {((score / questions.length) * 100).toFixed(0)}%
        </p>
        <p className="text-muted-foreground mb-6">You answered {score} out of {questions.length} questions correctly.</p>
        <Button onClick={startQuiz} size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-center text-lg text-muted-foreground">
          What is the definition of:
        </CardTitle>
        <p className="text-center text-4xl font-bold font-headline">{currentQuestion.questionWord.term}</p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={isAnswered}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {currentQuestion.options.map((option, i) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedAnswer;
            return (
              <Label
                key={i}
                htmlFor={`option-${i}`}
                className={cn(
                  "flex items-start space-x-3 rounded-md border p-4 transition-all cursor-pointer hover:bg-accent/50",
                  isSelected && "border-primary ring-2 ring-primary",
                  isAnswered && isCorrect && "bg-green-100 border-green-400 ring-2 ring-green-400 text-green-900",
                  isAnswered && isSelected && !isCorrect && "bg-red-100 border-red-400 ring-2 ring-red-400 text-red-900"
                )}
              >
                <RadioGroupItem value={option} id={`option-${i}`} className="mt-1" />
                <div className="flex-1">
                  <span>{option}</span>
                   {isAnswered && isSelected && !isCorrect && <XCircle className="inline ml-2 h-4 w-4 text-red-600"/>}
                   {isAnswered && isCorrect && <CheckCircle className="inline ml-2 h-4 w-4 text-green-600"/>}
                </div>
              </Label>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="justify-end">
        {isAnswered ? (
          <Button onClick={handleNextQuestion} size="lg">
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        ) : (
          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} size="lg">
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
