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

export interface CurrentChapter {
  bookName: string;
  bookValue: number;
  chapterName: string;
  chapterValue: number;
  data: any; // fix
}


// TODO (Caleb): still need to clean up these types. any of the "unknown" or "any" types need to be removed.
// Define context type
export interface AppContextType {
  strongsMapping: Record<string, any>; // TODO: need ot fix.
  setStrongsMapping: (strongsMapping: Record<string, any>) => void;
  selectedTesters: any[]; //TODO:
  setSelectedTesters: (testers: MultiValue<unknown>) => void; //TODO
  gotNewData: boolean; //TODO change to hasgotnewdata, tracks whether or not the data is stale
  setGotNewData: (gotNewData: boolean) => void;
  openGNTData: WordData[];
  setOpenGNTData: (openGNTData: WordData[]) => void;
  studyChunks: any[]; // TODO
  RMACDescriptions: Record<string, string>;
  loading: boolean;
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
  wordInfoOpen: boolean; // TODO: rename bool
  showAnswerChecked: boolean;
  startedTesting: boolean;
  loadProgress: number;
  setWordInfoOpen: (isWordInfoOpen: boolean) => void;
  previousTestWord: () => void;
  nextTestWord: () => void;
  flipCard: () => void;
  determineTestWords: (words: WordData[]) => void;
  markWord: (index: number, isCorrect: boolean) => void;
  onTesterSelect: (testers: MultiValue<unknown>) => void;
  onSetDefaultShowAnswer: (shouldShow: boolean) => void;
  handleCopyClick: () => void;
  handleCheckboxShowAnswer: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeReadingMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startLearning: () => void;
  restartLearning: () => void;
  handleSetSmartUnitLearning: (value: boolean) => void;
  printDebug: () => void;
}
