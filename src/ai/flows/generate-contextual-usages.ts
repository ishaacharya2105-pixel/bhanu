'use server';
/**
 * @fileOverview Generates contextual usages of a given word using a generative AI tool.
 *
 * - generateContextualUsages - A function that generates example sentences for a given word.
 * - GenerateContextualUsagesInput - The input type for the generateContextualUsages function.
 * - GenerateContextualUsagesOutput - The return type for the generateContextualUsages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContextualUsagesInputSchema = z.object({
  word: z.string().describe('The word for which to generate contextual usages.'),
  context: z.string().optional().describe('Optional context to tailor the example sentences.'),
});
export type GenerateContextualUsagesInput = z.infer<typeof GenerateContextualUsagesInputSchema>;

const GenerateContextualUsagesOutputSchema = z.object({
  usages: z.array(z.string()).describe('An array of example sentences using the given word in different contexts.'),
});
export type GenerateContextualUsagesOutput = z.infer<typeof GenerateContextualUsagesOutputSchema>;

export async function generateContextualUsages(input: GenerateContextualUsagesInput): Promise<GenerateContextualUsagesOutput> {
  return generateContextualUsagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContextualUsagesPrompt',
  input: {schema: GenerateContextualUsagesInputSchema},
  output: {schema: GenerateContextualUsagesOutputSchema},
  prompt: `You are a helpful assistant that provides example sentences for a given word, demonstrating its usage in different contexts.

  Word: {{{word}}}
  Context: {{#if context}}{{{context}}}{{else}}general{{/if}}

  Generate 3 example sentences using the word in the specified context. Return the sentences as a JSON array.
  Ensure that the sentences are well-formed and demonstrate different usages of the word.
  `,
});

const generateContextualUsagesFlow = ai.defineFlow(
  {
    name: 'generateContextualUsagesFlow',
    inputSchema: GenerateContextualUsagesInputSchema,
    outputSchema: GenerateContextualUsagesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
