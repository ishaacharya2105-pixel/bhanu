'use server';

import { generateContextualUsages, GenerateContextualUsagesInput } from '@/ai/flows/generate-contextual-usages';

export async function getContextualExamples(data: GenerateContextualUsagesInput) {
  try {
    const result = await generateContextualUsages(data);
    if (!result || !result.usages) {
      return { error: 'Received an invalid response from the AI model.' };
    }
    return { usages: result.usages };
  } catch (error) {
    console.error('Error generating contextual usages:', error);
    return { error: 'Failed to generate examples. Please check the server logs and try again.' };
  }
}
