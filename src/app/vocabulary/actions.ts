'use server';

import { generateContextualUsages, GenerateContextualUsagesInput } from '@/ai/flows/generate-contextual-usages';
import { generateWordDetails, GenerateWordDetailsInput } from '@/ai/flows/generate-word-details';


export async function getWordDetails(data: GenerateWordDetailsInput) {
  try {
    const result = await generateWordDetails(data);
    if (!result) {
      return { error: 'Received an invalid response from the AI model.' };
    }
    return result;
  } catch (error) {
    console.error('Error generating word details:', error);
    return { error: 'Failed to generate details. Please check the server logs and try again.' };
  }
}


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
