'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { QuizAttempt } from '@/lib/types';
import { format } from 'date-fns';

type ProgressChartProps = {
  quizHistory: QuizAttempt[];
};

export function ProgressChart({ quizHistory }: ProgressChartProps) {
  const chartData = quizHistory.map((attempt) => ({
    date: format(new Date(attempt.date), 'MMM d'),
    score: attempt.score,
  }));

  const chartConfig = {
    score: {
      label: 'Score',
      color: 'hsl(var(--chart-1))',
    },
  };

  if (chartData.length === 0) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">
          Take a quiz to see your progress here!
        </p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[350px]">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <defs>
          <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-score)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-score)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="score"
          type="natural"
          fill="url(#fillScore)"
          stroke="var(--color-score)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
