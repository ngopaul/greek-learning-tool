import { atom } from 'jotai';
import { BookOption, CurrentChapter, Tester, WordData } from '../types/AppContextTypes';

// Atom to store the current lesson
// export const currentLessonAtom = atom<string | null>(null);


export const displayWordsAtom = atom<WordData[]>([]);

export const currentIndexAtom = atom<number>(0);
export const currentBookAtom = atom<BookOption>();


// below is pasted in.

// export const currentBookAtom = atom<BookOption>();
export const currentChapterAtom = atom<CurrentChapter>();
// export const selectedBookAtom = atom<string>();
// export const chapterOptionsAtom = atom<ChapterOption[]>();
// export const selectedChapterAtom = atom<ChapterOption>();
// export const verseOptionsAtom = atom<VerseOption[]>();
// export const selectedVerseAtom = atom<VerseOption>();

export const selectedTestersAtom = atom<Tester[]>([]);


export const testWordIndicesAtom = atom<Set<number>>();

// export const currentIndexAtom = atom<number>(0);
export const openGNTDataAtom = atom<WordData[]>([]);
// export const startedTestingAtom = atom<boolean>(false);

// remove this later
export const showAnswerAtom = atom<boolean>(false);
export const defaultShowAnswerAtom = atom<boolean>(true);
export const readingModeAtom = atom<"chapter" | "unit">('chapter');



// export const studyChunksAtom = atom<Record<string, StudyChunk[]>>();






// where the ycame froM: 


// const [openGNTData, setOpenGNTData] = useState<WordData[]>([]);

// const [testWordIndices, setTestWordIndices] = useState<Set<number>>(new Set());


// const [selectedTesters, setSelectedTesters] = useState<Tester[]>([]);


// const [currentBook, setCurrentBook] = useState<BookOption>();
// const [currentChapter, setCurrentChapter] = useState<CurrentChapter>();



// const [selectedBook, setSelectedBook] = useState();
//   const [chapterOptions, setChapterOptions] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState();
//   const [verseOptions, setVerseOptions] = useState([]);
//   const [selectedVerse, setSelectedVerse] = useState(null);