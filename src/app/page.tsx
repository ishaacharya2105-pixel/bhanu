'use client';

import { useVocabulary } from '@/lib/hooks/use-vocabulary';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardPage() {
  const { words, quizHistory } = useVocabulary();
  const welcomeImage = PlaceHolderImages.find(
    (img) => img.id === 'dashboard-welcome'
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
          {welcomeImage && (
            <Image
              src={welcomeImage.imageUrl}
              alt={welcomeImage.description}
              fill
              className="object-cover"
              data-ai-hint={welcomeImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-6 md:p-10 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white font-headline shadow-lg">
              Welcome to LexiLearn
            </h1>
            <p className="text-lg md:text-xl text-white/90 mt-2 max-w-2xl">
              Your personal space to grow your vocabulary. Keep learning!
            </p>
          </div>
        </div>

        <StatsCards words={words} quizHistory={quizHistory} />

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Quiz Performance</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ProgressChart quizHistory={quizHistory} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
