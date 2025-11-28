'use server';
/**
 * @fileOverview Generates a definition and an example sentence for a given word.
 *
 * - generateWordDetails - A function that generates a definition and example sentence.
 * - GenerateWordDetailsInput - The input type for the generateWordDetails function.
 * - GenerateWordDetailsOutput - The return type for the generateWordDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWordDetailsInputSchema = z.object({
  word: z.string().describe('The word for which to generate details.'),
});
export type GenerateWordDetailsInput = z.infer<typeof GenerateWordDetailsInputSchema>;

const GenerateWordDetailsOutputSchema = z.object({
  definition: z.string().describe('The generated definition of the word.'),
  exampleSentence: z.string().describe('A generated example sentence using the word.'),
});
export type GenerateWordDetailsOutput = z.infer<typeof GenerateWordDetailsOutputSchema>;

export async function generateWordDetails(input: GenerateWordDetailsInput): Promise<GenerateWordDetailsOutput> {
  return generateWordDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWordDetailsPrompt',
  input: {schema: GenerateWordDetailsInputSchema},
  output: {schema: GenerateWordDetailsOutputSchema},
  prompt: `You are an expert lexicographer. For the given word, provide a clear and concise definition and a single example sentence that demonstrates its usage.

  Word: {{{word}}}
  `,
});

const generateWordDetailsFlow = ai.defineFlow(
  {
    name: 'generateWordDetailsFlow',
    inputSchema: GenerateWordDetailsInputSchema,
    outputSchema: GenerateWordDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
