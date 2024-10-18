import { SetStateAction } from "react";
import { MultiValue } from "react-select";

// Define interfaces for data
export interface BookChapterVerseWord {
  book: number;
  chapter: number;
  verse: number;
  word: number;
}

export interface BookOption {
  value: number;
  label: string;
}

export interface WordData {
  Greek: string;
  Morphology: string;
  English: string;
  BookChapterVerseWord: BookChapterVerseWord;
  StudyChunkID: string; // TODO (Caleb): verify that this is actually string;
  Meaning: string;
  displayIndex: number | null;
  StrongsNumber: string; // This name is confusing because it's a string.
}

export interface ChapterOption {
  value: number;
  label: string;
}

export interface VerseOption {
  value: number;
  label: string;
}

export interface Tester {
  value: string;
}

// setCurrentChapter({
//   bookName: currentBook.label,
//   bookValue: currentBook.value,
//   chapterName: temporaryCurrentChapter.label,
//   chapterValue: temporaryCurrentChapter.value,
//   data: filteredData
// });

export interface CurrentChapter {
  bookName: string;
  bookValue: number;
  chapterName: string;
  chapterValue: number;
  data: any; // fix
}

// Define context type
export interface AppContextType {
  strongsMapping: Record<string, any>; // TODO: need ot fix.
  setStrongsMapping: (strongsMapping: Record<string, any>) => void;
  currentBook?: number;
  setCurrentBook: (book: SetStateAction<undefined>) => void;
  currentChapter?: CurrentChapter;
  setCurrentChapter: (
    chapter: SetStateAction<CurrentChapter | undefined>
  ) => void;
  selectedTesters: any[]; //TODO:
  setSelectedTesters: (testers: MultiValue<unknown>) => void; //TODO
  gotNewData: boolean; //TODO change to hasgotnewdata, tracks whether or not the data is stale
  setGotNewData: (gotNewData: boolean) => void;
  openGNTData: WordData[];
  setOpenGNTData: (openGNTData: WordData[]) => void;
  studyChunks: any[]; // TODO
  RMACDescriptions: Record<string, string>;
  loading: boolean;
  currentIndex: number;
  displayWords: WordData[];
  testWordIndices: Set<number>;
  showAnswer: boolean;
  defaultShowAnswer: boolean;
  showEnglishInContext: boolean; // TOOD: reanme
  setShowEnglishInContext: (showEnglishInContext: boolean) => void;
  userProgress: Record<string, any>; // TODO
  readingMode: "chapter" | "unit"; // show Paul
  testingMode: "morphology" | "meaning";
  setTestingMode: (testingMode: "morphology" | "meaning") => void;
  smartUnitLearning: boolean; // TODO: rename bool
  correctLog: (boolean | null)[];
  settingsOpen: boolean; // TODO: rename bool
  setSettingsOpen: (settinsOpen: boolean) => void;
  helpOpen: boolean; // TOOD: rename bool "isHelpOpen"
  setHelpOpen: (helpOpen: boolean) => void;
  wordInfoOpen: boolean; // TODO: rename bool
  selectedBook?: string;
  setSelectedBook: (selectedBook: string) => void;
  chapterOptions: ChapterOption[];
  setChapterOptions: (chapterOptions: ChapterOption[]) => void;
  selectedChapter?: ChapterOption;
  setSelectedChapter: (selectedChapter?: ChapterOption) => void;
  verseOptions: VerseOption[];
  setVerseOptions: (verseOptions: VerseOption[]) => void;
  selectedVerse: VerseOption;
  setSelectedVerse: (selectedVerse?: VerseOption) => void;
  showAnswerChecked: boolean;
  startedTesting: boolean;
  loadProgress: number;
  setCurrentIndex: (
    idx: number,
    newDisplayWords?: WordData[],
    newTestWordIndices?: Set<number>
  ) => void;
  setWordInfoOpen: (isWordInfoOpen: boolean) => void;
  goLeft: () => void;
  goRight: () => void;
  previousTestWord: () => void;
  nextTestWord: () => void;
  flipCard: () => void;
  determineTestWords: (words: WordData[]) => void;
  markWord: (index: number, isCorrect: boolean) => void;
  onBookSelect: (selected: BookOption) => void
  onChapterSelect: (selected: any) => void;
  onVerseSelect: (selected: any) => void;
  onTesterSelect: (testers: MultiValue<unknown>) => void;
  onSetDefaultShowAnswer: (shouldShow: boolean) => void;
  handleSettingsClick: () => void;
  handleCopyClick: () => void;
  handleHelpClick: () => void;
  handleCheckboxShowAnswer: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeReadingMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startLearning: () => void;
  // TODO (Caleb): what is this restart learning vs startlearning??
  restartLearning: () => void;
  handleSetSmartUnitLearning: (value: boolean) => void;
  printDebug: () => void;
  chartsOpen: boolean;
  setChartsOpen: (chartsOpen: boolean) => void;
  handleChartsClick: () => void;
}
