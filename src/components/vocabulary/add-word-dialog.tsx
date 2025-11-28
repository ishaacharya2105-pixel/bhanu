'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useVocabulary } from '@/lib/hooks/use-vocabulary';
import React from 'react';
import { getWordDetails } from '@/app/vocabulary/actions';

const formSchema = z.object({
  term: z.string().min(1, 'Term is required.'),
  definition: z.string().min(1, 'Definition is required.'),
  exampleSentence: z.string().min(1, 'Example sentence is required.'),
});

type AddWordFormValues = z.infer<typeof formSchema>;

export function AddWordDialog() {
  const { addWord } = useVocabulary();
  const [open, setOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const form = useForm<AddWordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: '',
      definition: '',
      exampleSentence: '',
    },
  });

  const termValue = form.watch('term');

  const onSubmit = (values: AddWordFormValues) => {
    addWord({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...values,
    });
    form.reset();
    setOpen(false);
  };
  
  const handleGenerateDetails = async () => {
    if (!termValue) {
      form.setError("term", { type: "manual", message: "Please enter a term to generate details." });
      return;
    }
    setIsGenerating(true);
    const result = await getWordDetails({ word: termValue });
    if (result && !result.error && result.definition && result.exampleSentence) {
      form.setValue('definition', result.definition);
      form.setValue('exampleSentence', result.exampleSentence);
    } else {
      // You can use toast to show error
      console.error(result.error);
    }
    setIsGenerating(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        form.reset();
      }
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Word
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Word</DialogTitle>
          <DialogDescription>
            Expand your vocabulary by adding a new word. You can fill it out manually or use AI to help.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
               <FormLabel>Term</FormLabel>
                <div className="flex items-center space-x-2">
                    <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                        <FormControl>
                            <Input placeholder="e.g., Ephemeral" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={handleGenerateDetails} disabled={isGenerating || !termValue}>
                        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4"/>}
                        <span className="sr-only">Generate with AI</span>
                    </Button>
                </div>
            </div>

            <FormField
              control={form.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Definition</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Lasting for a very short time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
                control={form.control}
                name="exampleSentence"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Example Sentence</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., The beauty of the cherry blossoms is ephemeral."
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Word</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
