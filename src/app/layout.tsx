import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { VocabularyProvider } from '@/providers/vocabulary-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter, Lexend } from 'next/font/google';

export const metadata: Metadata = {
  title: 'LexiLearn',
  description: 'A modern, engaging vocabulary learning app.',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-body antialiased min-h-screen dark',
          inter.variable,
          lexend.variable
        )}
      >
        <VocabularyProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </VocabularyProvider>
      </body>
    </html>
  );
}
