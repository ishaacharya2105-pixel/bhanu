import type { Word } from './types';

export const initialWords: Word[] = [
  {
    id: '1',
    term: 'Ephemeral',
    definition: 'Lasting for a very short time.',
    exampleSentence: 'The beauty of the cherry blossoms is ephemeral.',
    createdAt: new Date('2023-10-26T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    term: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere.',
    exampleSentence: 'Smartphones have become ubiquitous in modern society.',
    createdAt: new Date('2023-10-27T11:30:00Z').toISOString(),
  },
  {
    id: '3',
    term: 'Mellifluous',
    definition: 'A sound that is sweet and musical; pleasant to hear.',
    exampleSentence: 'She had a mellifluous voice that charmed everyone.',
    createdAt: new Date('2023-10-28T14:00:00Z').toISOString(),
  },
  {
    id: '4',
    term: 'Pulchritudinous',
    definition: 'Having great physical beauty.',
    exampleSentence: 'The pulchritudinous landscape took his breath away.',
    createdAt: new Date('2023-10-29T16:45:00Z').toISOString(),
  },
  {
    id: '5',
    term: 'Serendipity',
    definition: 'The occurrence of events by chance in a happy or beneficial way.',
    exampleSentence: 'Finding a rare book in a thrift store was a moment of pure serendipity.',
    createdAt: new Date('2023-10-30T09:00:00Z').toISOString(),
  },
];
