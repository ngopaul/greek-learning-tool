import { atom } from 'jotai';
import { WordData } from '../types/AppContextTypes';

// Atom to store the current lesson
// export const currentLessonAtom = atom<string | null>(null);


export const displayWordsAtom = atom<WordData[]>([]);

