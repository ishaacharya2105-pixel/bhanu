'use client';

import { useVocabulary } from '@/lib/hooks/use-vocabulary';
import { AddWordDialog } from './add-word-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export function VocabularyClient() {
  const { words, removeWord } = useVocabulary();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            My Vocabulary
          </h2>
          <p className="text-muted-foreground">
            Here's the list of words you're learning.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AddWordDialog />
        </div>
      </div>
      <div className="rounded-md border bg-card mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Term</TableHead>
              <TableHead>Definition</TableHead>
              <TableHead className="w-[200px]">Added On</TableHead>
              <TableHead className="w-[50px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {words.length > 0 ? (
              words.map((word) => (
                <TableRow key={word.id}>
                  <TableCell className="font-medium">{word.term}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {word.definition}
                  </TableCell>
                  <TableCell>
                    {format(new Date(word.createdAt), 'MMMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={() => removeWord(word.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No words added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
