import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loadDataVersions, loadOpenGNTData, loadRMACDescriptions, loadStudyChunks } from '../utils/dataLoader';
import { getSmartChunksToTest, getChunksToTest } from '../utils/getTestWords';

// Define interfaces for data
interface BookChapterVerseWord {
  book: string;
  chapter: number;
  verse: number;
}

interface WordData {
  Greek: string | null;
  Morphology: string | null;
  English: string | null;
  BookChapterVerseWord: BookChapterVerseWord | null;
  StudyChunkID: string | null;
  Meaning: string | null;
}

// Define context type
interface AppContextType {
  currentBook: number; // Replace with more specific type if available
  setCurrentBook: (book: number) => void;
  currentChapter: number;
  setCurrentChapter: (chapter: number) => void;
  selectedTesters: any[]; //TODO:
  setSelectedTesters: (testers: any[]) => void; //TODO
  gotNewData: boolean; //TODO change to hasgotnewdata, tracks whether or not the data is stale
  openGNTData: WordData[];
  studyChunks: any[]; 
  RMACDescriptions: Record<string, any>;
  loading: boolean;
  currentIndex: number;
  displayWords: WordData[];
  testWordIndices: Set<number>;
  showAnswer: boolean;
  defaultShowAnswer: boolean;
  showEnglishInContext: boolean;
  userProgress: Record<string, any>;
  readingMode: string;
  testingMode: string;
  smartUnitLearning: boolean;
  correctLog: (boolean | null)[];
  settingsOpen: boolean;
  helpOpen: boolean;
  wordInfoOpen: boolean;
  selectedBook: any;
  chapterOptions: any[]; // Define more specific type if available
  selectedChapter: any;
  verseOptions: any[];
  selectedVerse: any;
  showAnswerChecked: boolean;
  startedTesting: boolean;
  loadProgress: number;
  setCurrentIndex: (idx: number, newDisplayWords?: WordData[], newTestWordIndices?: Set<number>) => void;
  goLeft: () => void;
  goRight: () => void;
  previousTestWord: () => void;
  nextTestWord: () => void;
  flipCard: () => void;
  determineTestWords: (words: WordData[]) => void;
  markWord: (index: number, isCorrect: boolean) => void;
  onBookSelect: (selected: any) => void;
  onChapterSelect: (selected: any) => void;
  onVerseSelect: (selected: any) => void;
  onTesterSelect: (selected: any[]) => void;
  onSetDefaultShowAnswer: (shouldShow: boolean) => void;
  handleSettingsClick: () => void;
  handleCopyClick: () => void;
  handleHelpClick: () => void;
  handleCheckboxShowAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeReadingMode: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  restartLearning: () => void;
  handleSetSmartUnitLearning: (value: boolean) => void;
}

// Create the context with default values
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentBook, setCurrentBook] = useState<any>(null);
  const [currentChapter, setCurrentChapter] = useState<any>(null);
  const [selectedTesters, setSelectedTesters] = useState<any[]>([]);
  const [gotNewData, setGotNewData] = useState(false);
  const [openGNTData, setOpenGNTData] = useState<WordData[]>([]);
  const [strongsMapping, setStrongsMapping] = useState<Record<string, any>>({});
  const [studyChunks, setStudyChunks] = useState<any[]>([]);
  const [RMACDescriptions, setRMACDescriptions] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndexRaw] = useState(0);
  const [displayWords, setDisplayWords] = useState<WordData[]>([]);
  const [testWordIndices, setTestWordIndices] = useState<Set<number>>(new Set());
  const [showAnswer, setShowAnswer] = useState(true);
  const [defaultShowAnswer, setDefaultShowAnswer] = useState(true);
  const [showEnglishInContext, setShowEnglishInContext] = useState(true);
  const [userProgress, setUserProgress] = useState<Record<string, any>>({});
  const [readingMode, setReadingMode] = useState('chapter');
  const [testingMode, setTestingMode] = useState('morphology');
  const [smartUnitLearning, setSmartUnitLearning] = useState(true);
  const [correctLog, setCorrectLog] = useState<(boolean | null)[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [wordInfoOpen, setWordInfoOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [chapterOptions, setChapterOptions] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [verseOptions, setVerseOptions] = useState<any[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [showAnswerChecked, setShowAnswerChecked] = useState(true);
  const [startedTesting, setStartedTesting] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataVersionsInfo] = await Promise.all([loadDataVersions()]);
        const needToUpdateFiles = dataVersionsInfo.needToUpdateFiles;
        setGotNewData(dataVersionsInfo.isNewData);
        const [chunks] = await Promise.all([loadStudyChunks(needToUpdateFiles)]);
        const [rmacDescriptions, gntData] = await Promise.all([
          loadRMACDescriptions(),
          loadOpenGNTData(chunks, needToUpdateFiles, setLoadProgress),
        ]);
        const wordGNTData = gntData[0];
        const strongsMapping = gntData[1];
        setStrongsMapping(strongsMapping);
        setOpenGNTData(wordGNTData);
        setRMACDescriptions(rmacDescriptions);
        setStudyChunks(chunks);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const setCurrentIndex = (
    idx: number,
    newDisplayWords: WordData[] = displayWords,
    newTestWordIndices: Set<number> = testWordIndices
  ) => {
    if (idx === null || idx === undefined || isNaN(idx) || idx < 0 || idx >= newDisplayWords.length) {
      return;
    }
    setCurrentIndexRaw(idx);
    if (newTestWordIndices.has(idx)) {
      setShowAnswer(false);
    } else if (readingMode === 'chapter') {
      setShowAnswer(defaultShowAnswer);
    } else if (readingMode === 'unit' && idx !== displayWords.length) {
      setShowAnswer(defaultShowAnswer);
    } else {
      setShowAnswer(true);
    }
  };

  const goLeft = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const goRight = () => {
    setCurrentIndex(Math.min(currentIndex + 1, displayWords.length - 1));
  };

  const previousTestWord = () => {
    if (testWordIndices.size === 0) {
      return;
    }
    for (let i = currentIndex - 1; i > 0; i--) {
      if (testWordIndices.has(i)) {
        const newIndex = Math.max(i, 0);
        setCurrentIndex(newIndex);
        break;
      }
    }
  };

  const nextTestWord = () => {
    if (testWordIndices.size === 0) {
      return;
    }
    for (let i = currentIndex + 1; i < displayWords.length; i++) {
      if (testWordIndices.has(i)) {
        const newIndex = Math.min(i, displayWords.length - 1);
        setCurrentIndex(newIndex);
        break;
      }
    }
  };

  const flipCard = () => {
    setShowAnswer((prev) => !prev);
  };

  const determineTestWords = (words: WordData[]) => {
    if (selectedTesters.length === 0) {
      setTestWordIndices(new Set());
      return;
    }
    const testIndices = new Set<number>();
    words.forEach((word, index) => {
      const studyChunkID = word.StudyChunkID;
      selectedTesters.forEach((tester) => {
        if (studyChunkID && studyChunkID.includes(' | ') && studyChunkID.split(' | ')[0] === tester.value) {
          testIndices.add(index);
        }
      });
    });
    setTestWordIndices(testIndices);
  };

  const markWord = (index: number, isCorrect: boolean) => {
    const newLog = [...correctLog];
    newLog[index] = isCorrect;
    setCorrectLog(newLog);
  };

  const onBookSelect = (selected: any) => {
    setSelectedBook(selected);
    setCurrentBook(selected);
  };

  const onChapterSelect = (selected: any) => {
    setSelectedChapter(selected);
    setCurrentChapter(selected);
  };

  const onVerseSelect = (selected: any) => {
    setSelectedVerse(selected);
  };

  const onTesterSelect = (selected: any[]) => {
    setSelectedTesters(selected);
  };

  const onSetDefaultShowAnswer = (shouldShow: boolean) => {
    setDefaultShowAnswer(shouldShow);
  };

  const handleSettingsClick = () => {
    setSettingsOpen((prev) => !prev);
  };

  const handleCopyClick = () => {
    // Placeholder for copy logic
  };

  const handleHelpClick = () => {
    setHelpOpen((prev) => !prev);
  };

  const handleCheckboxShowAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAnswerChecked(event.target.checked);
  };

  const handleChangeReadingMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReadingMode(event.target.value);
  };

  const restartLearning = () => {
    setCurrentIndex(0);
    setCorrectLog([]);
  };

  const handleSetSmartUnitLearning = (value: boolean) => {
    setSmartUnitLearning(value);
  };

  return (
    <AppContext.Provider
      value={{
        currentBook,
        setCurrentBook,
        currentChapter,
        setCurrentChapter,
        selectedTesters,
        setSelectedTesters,
        gotNewData,
        openGNTData,
        studyChunks,
        RMACDescriptions,
        loading,
        currentIndex,
        displayWords,
        testWordIndices,
        showAnswer,
        defaultShowAnswer,
        showEnglishInContext,
        userProgress,
        readingMode,
        testingMode,
        smartUnitLearning,
        correctLog,
        settingsOpen,
        helpOpen,
        wordInfoOpen,
        selectedBook,
        chapterOptions,
        selectedChapter,
        verseOptions,
        selectedVerse,
        showAnswerChecked,
        startedTesting,
        loadProgress,
        setCurrentIndex,
        goLeft,
        goRight,
        previousTestWord,
        nextTestWord,
        flipCard,
        determineTestWords,
        markWord,
        onBookSelect,
        onChapterSelect,
        onVerseSelect,
        onTesterSelect,
        onSetDefaultShowAnswer,
        handleSettingsClick,
        handleCopyClick,
        handleHelpClick,
        handleCheckboxShowAnswer,
        handleChangeReadingMode,
        restartLearning,
        handleSetSmartUnitLearning,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
