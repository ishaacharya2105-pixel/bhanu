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
import { Loader2, PlusCircle, Sparkles, Wand2 } from 'lucide-react';
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
import { getContextualExamples } from '@/app/vocabulary/actions';

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
  const [generatedExamples, setGeneratedExamples] = React.useState<string[]>([]);
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
    setGeneratedExamples([]);
    setOpen(false);
  };
  
  const handleGenerateExamples = async () => {
    if (!termValue) {
      form.setError("term", { type: "manual", message: "Please enter a term to generate examples." });
      return;
    }
    setIsGenerating(true);
    setGeneratedExamples([]);
    const result = await getContextualExamples({ word: termValue });
    if (result.usages) {
      setGeneratedExamples(result.usages);
      if (result.usages.length > 0 && !form.getValues('exampleSentence')) {
        form.setValue('exampleSentence', result.usages[0]);
      }
    } else {
      // You can use toast to show error
      console.error(result.error);
    }
    setIsGenerating(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Word
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Word</DialogTitle>
          <DialogDescription>
            Expand your vocabulary by adding a new word with its definition and an
            example.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Term</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ephemeral" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel>Example Sentence</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={handleGenerateExamples} disabled={isGenerating || !termValue}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                  AI Generate
                </Button>
              </div>
              <FormField
                control={form.control}
                name="exampleSentence"
                render={({ field }) => (
                  <FormItem>
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
              {generatedExamples.length > 0 && (
                 <div className="space-y-2 rounded-md border bg-muted/50 p-3">
                   <h4 className="text-sm font-semibold">Suggestions:</h4>
                    {generatedExamples.map((ex, i) => (
                       <p key={i} className="text-sm text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => form.setValue('exampleSentence', ex)}>
                         - {ex}
                       </p>
                    ))}
                 </div>
              )}
            </div>

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
