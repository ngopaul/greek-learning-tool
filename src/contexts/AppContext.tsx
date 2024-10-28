// @ts-nocheck
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loadDataVersions, loadOpenGNTData, loadRMACDescriptions, loadStudyChunks } from '../utils/dataLoader';
import { getSmartChunksToTest, getChunksToTest } from '../utils/getTestWords';
import { AppContextType, BookOption, ChapterOption, CurrentChapter, Tester, VerseOption, WordData } from '../types/AppContextTypes';
import { StudyChunk } from '../types/dataLoaderTypes';
import { useAtom } from 'jotai';
import { startTestingAtom } from '../atoms/testingAtoms';
import { defaultShowAnswerAtom, displayWordsAtom, openGNTDataAtom, readingModeAtom, selectedTestersAtom, showAnswerAtom, testWordIndicesAtom } from '../atoms/bibleDisplayAtoms';
import { useNavigation } from '../components/useNavigation';



// Create the context with default values
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AppProvider: React.FC<AppProviderProps>  = ({children}) => {
  const { currentChapter, currentIndex, goLeft, goRight, setCurrentIndexAndProcess} = useNavigation();


  // const [selectedTesters, setSelectedTesters] = useState<Tester[]>([]);
  const [selectedTesters, setSelectedTesters] = useAtom(selectedTestersAtom);
  const [gotNewData, setGotNewData] = useState(false);
  // const [openGNTData, setOpenGNTData] = useState<WordData[]>([]);
  const [openGNTData, setOpenGNTData] = useAtom(openGNTDataAtom);
  const [strongsMapping, setStrongsMapping] = useState({});
  // TODO (Caleb (Paul-check): verify removing [] in initi is safe
  const [studyChunks, setStudyChunks] = useState<Record<string, StudyChunk[]>>();
  const [RMACDescriptions, setRMACDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  // const [testWordIndices, setTestWordIndices] = useState<Set<number>>(new Set());
  const [testWordIndices, setTestWordIndices] = useAtom(testWordIndicesAtom);
  // const [showAnswer, setShowAnswer] = useState(true);
  const [showAnswer, setShowAnswer] = useAtom(showAnswerAtom);
  // const [defaultShowAnswer, setDefaultShowAnswer] = useState(true);
  const [defaultShowAnswer, setDefaultShowAnswer] = useAtom(defaultShowAnswerAtom);
  const [showEnglishInContext, setShowEnglishInContext] = useState(true);
  const [userProgress, setUserProgress] = useState<Record<string, boolean[]>>({});
  const [readingMode, setReadingMode] = useAtom(readingModeAtom); 
  const [testingMode, setTestingMode] = useState<"morphology" | "meaning">('morphology'); // 'morphology' or 'meaning'
  const [smartUnitLearning, setSmartUnitLearning] = useState(true);
  const [correctLog, setCorrectLog] = useState<{index: number, correct: boolean}[]>([]); // List of { index: number, correct: boolean } // TODO (Caleb): pull out
  const [wordInfoOpen, setWordInfoOpen] = useState(false);
  
  const [showAnswerChecked, setShowAnswerChecked] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const [startedTesting, setStartedTesting] = useAtom(startTestingAtom);
  const [displayWords, setDisplayWords] = useAtom(displayWordsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataVersionsInfo] = await Promise.all([loadDataVersions()]);
        const needToUpdateFiles = dataVersionsInfo.needToUpdateFiles;
        setGotNewData(dataVersionsInfo.isNewData);
        const [chunks] = await Promise.all([loadStudyChunks(needToUpdateFiles)]);
        const [rmacDescriptions, gntData] = await Promise.all(
          [loadRMACDescriptions(), loadOpenGNTData(chunks, needToUpdateFiles, setLoadProgress)]
        );
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

  useEffect(() => {
    if (readingMode === 'chapter' && currentChapter && currentChapter.data) {
      console.log("calling determineTestwords")
      setCorrectLog(new Array(currentChapter.data.length).fill(null));
      determineTestWords(displayWords);
    }
  }, [selectedTesters, displayWords]);

  

  

  const previousTestWord = () => {
    // find the closest previous word that is in the testWordIndices
    if (testWordIndices.size === 0) {
      return;
    }
    for (let i = currentIndex - 1; i > 0; i--) {
      if (testWordIndices.has(i)) {
        const newIndex = Math.max(i, 0);
        setCurrentIndexAndProcess(newIndex);
        break;
      }
    }
  }

  const nextTestWord = () => {
    // find the closest previous word that is in the testWordIndices
    if (testWordIndices.size === 0) {
      return;
    }
    for (let i = currentIndex + 1; i < displayWords.length; i++) {
      if (testWordIndices.has(i)) {
        const newIndex = Math.min(i, displayWords.length - 1)
        setCurrentIndexAndProcess(newIndex);
        break;
      }
    }
  }

  const flipCard = () => {
    setShowAnswer((prev) => !prev);
  }

  // Handle Keyboard Navigation and Space Key for Toggle
  useEffect(() => {
    const handleKeyDown = (e: { key: string; target: HTMLElement; preventDefault: () => void; }) => {
      if (e.key === 'ArrowRight') {
        goRight();
      } else if (e.key === 'ArrowLeft') {
        goLeft();
      } else if (e.key === '<') {
        previousTestWord();
      } else if (e.key === '>') {
        nextTestWord();
      } else if (e.key === ' ') {
        // prevent scrolling on space
        if (e.target === document.body) {
          e.preventDefault();
        }
        flipCard();
      } else if (e.key === '?') {
        handleHelpClick();
      } else if (e.key === '/') {
        handleSettingsClick();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        markWord(currentIndex, true);
      } else if (e.key === 'ArrowDown') {
        markWord(currentIndex, false);
        e.preventDefault();
      } else if (e.key === ';') {
        printDebug();
      }
    };

    // TODO (Caleb): verify this later.. 
    // @ts-ignore
    window.addEventListener('keydown', handleKeyDown);
    // @ts-ignore
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayWords.length, defaultShowAnswer, currentIndex, testWordIndices, correctLog]);

  

  const printDebug = () => {
    const currentWord = displayWords[currentIndex];
    const { book, chapter, verse } = currentWord.BookChapterVerseWord;
    const wordsInChapter = openGNTData.filter(word =>
      word.BookChapterVerseWord.book === book &&
      word.BookChapterVerseWord.chapter === chapter &&
      word.BookChapterVerseWord.verse === verse
    );
    const currentVerse = wordsInChapter.map(wordData => wordData.Greek).join(" ");
    console.log('currentVerse:', currentVerse);
    console.log('wordsInChapter:', wordsInChapter);
    console.log('currentIndex:', currentIndex);
    console.log('displayWords:', displayWords);
    console.log('testWordIndices:', testWordIndices);
    console.log('selectedTesters:', selectedTesters);
    console.log('selectedTesters:', selectedTesters);
    console.log('currentWord', displayWords[currentIndex]);
    console.log('correctLog:', correctLog);
    console.log('correctLog at currentIndex:', correctLog[currentIndex]);
    console.log('showAnswer:', showAnswer);
  }

  // Function to determine which words to test
  const determineTestWords = (words : WordData[]) => {
    // If no testers are selected, clear the test word indices
    if (selectedTesters.length === 0) {
      setTestWordIndices(new Set());
      return;
    }

    // Create a set to store the indices of words that should be tested
    const testIndices = new Set<number>();

    // Iterate over each word in the words array
    words.forEach((word, index) => {
      const studyChunkID = word.StudyChunkID;

      // Check each selected tester/unit
      selectedTesters.forEach(tester => {
        if (studyChunkID && studyChunkID.includes(" | ") && studyChunkID.split(" | ")[0] === tester.value) {
          testIndices.add(index);
        }
      });
    });

    // Set the test word indices based on the identified indices
    setTestWordIndices(testIndices);
    if (testIndices.has(currentIndex)) {
      setShowAnswer(false);
    } else {
      setShowAnswer(defaultShowAnswer);
    }
  };

  // Load userProgress from localStorage on mount
  useEffect(() => {
    const storedProgress = localStorage.getItem('userProgress');
    if (storedProgress) {
      setUserProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Save userProgress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const startLearning = () => {
    // create a list for each chunk (aka wordGroup) in studyChunks
    const studyChunkLists : Record<string, StudyChunk[]> = {};
    const initialWordGroupsToTest : string[] = [];
    if (!studyChunks) {
      // handle undefined studyChunks
      return;
    }
    for (const [, studyChunksForTester] of Object.entries(studyChunks)) {
      if (studyChunksForTester) {
        // Check each study chunk under this unit
        studyChunksForTester.forEach(chunk => {
          const testerID = chunk.studyChunkID.split(" | ")[0];
          if (selectedTesters.map(tester => tester.value).includes(testerID)) {
            studyChunkLists[chunk.studyChunkID] = [];
            initialWordGroupsToTest.push(chunk.studyChunkID);
          }
        });
      }
    }
    // filter openGNTData for words that match the chunks in studyChunks, placing the results into their respective list
    for (const [studyChunkID, studyChunkList] of Object.entries(studyChunkLists)) {
      const wordsToTest = openGNTData.filter(word => studyChunkID === word.StudyChunkID);
      // shuffle the wordsToTest
      wordsToTest.sort(() => Math.random() - 0.5);
      // TODO (Paul-check): .... 
      studyChunkList.push(...wordsToTest);
    }
    // Use either getSmartWordsToTest or getWordsToTest on the list of chunk names (wordGroups) and the userProgress, to get the wordsToTest
    let chunksToTest;
    initialWordGroupsToTest.sort(() => Math.random() - 0.5);
    const wordGroupsToTest = initialWordGroupsToTest.slice(0, 20);
    if (smartUnitLearning) {
      chunksToTest = getSmartChunksToTest(wordGroupsToTest, userProgress);
    } else {
      chunksToTest = getChunksToTest(wordGroupsToTest, userProgress);
    }
    chunksToTest = chunksToTest.slice(0, 40);
    // Get the displayWords from the chunksToTest, popping the first word off the relevant chunk in studyChunkLists
    const temporaryDisplayWords = [];
    for (const chunkName of chunksToTest) {
      if (studyChunkLists[chunkName].length === 0) {
        console.log("No words left for: ", chunkName);
      } else {
        const word = studyChunkLists[chunkName].shift();
        temporaryDisplayWords.push(word);
      }
    }
    temporaryDisplayWords.push({
      Greek: null,
      Morphology: null,
      English: null,
      BookChapterVerseWord: null,
      StudyChunkID: "finished round of testing"
    })
    // Set currentIndex, displayWords, testWordIndices, showAnswer, correctLog
    setDisplayWords(temporaryDisplayWords);
    const temporaryTestWordIndices = new Set(Array.from(Array(temporaryDisplayWords.length).keys()))
    setTestWordIndices(temporaryTestWordIndices);
    setCurrentIndexAndProcess(0, temporaryDisplayWords, temporaryTestWordIndices);
    setStartedTesting(true);
    // correctLog is a list of booleans the length of displayWords, initialized to null
    // it is used to keep track of whether the user got each word correct or not
    setCorrectLog(new Array(temporaryDisplayWords.length).fill(null));
  };

  const markWord = (index : number, isCorrect : boolean) => {
    if (
      displayWords.length === 0
      || (readingMode === "unit" && currentIndex === displayWords.length - 1)
      || !testWordIndices.has(currentIndex)
    ) {
      return;
    }
    const newCorrectLog = [...correctLog];
    const oldMarkValue = newCorrectLog[index];
    const alreadyMarked = oldMarkValue !== null;
    newCorrectLog[index] = isCorrect;
    setCorrectLog(newCorrectLog);
    // update userProgress
    const newUserProgress = {...userProgress};
    const word = displayWords[index];
    const studyChunkID = word.StudyChunkID;
    let latterValues : boolean[] = [];
    if (alreadyMarked && Array.isArray(newUserProgress[studyChunkID])) {
      // get the index of the last value that was marked as oldMarkValue
      const lastIndex = newUserProgress[studyChunkID].lastIndexOf(oldMarkValue);
      // remove all values from the array after the last index, saving the items in latterValues
      latterValues = newUserProgress[studyChunkID].slice(lastIndex + 1);
      newUserProgress[studyChunkID] = newUserProgress[studyChunkID].slice(0, lastIndex + 1);
      newUserProgress[studyChunkID].pop();
    }
    if (newUserProgress[studyChunkID]) {
      newUserProgress[studyChunkID].push(isCorrect);
      if (newUserProgress[studyChunkID].length > 10) {
        newUserProgress[studyChunkID].shift();
      }
    } else {
      newUserProgress[studyChunkID] = [isCorrect];
    }
    // add the formerValues back to the array
    if (latterValues.length > 0) {
      newUserProgress[studyChunkID].push(...latterValues);
    }
    setUserProgress(newUserProgress);
  };

  const onTesterSelect = (selected : Tester[]) => {
    setSelectedTesters(selected);
  };

  const onSetDefaultShowAnswer = (shouldShow : boolean) => {
    setDefaultShowAnswer(shouldShow);
  }

  const handleCopyClick = () => {
    const currentWord = displayWords[currentIndex];
    const { book, chapter, verse } = currentWord.BookChapterVerseWord;
    const wordsInChapter = openGNTData.filter(word =>
      word.BookChapterVerseWord.book === book &&
      word.BookChapterVerseWord.chapter === chapter &&
      word.BookChapterVerseWord.verse === verse
    );
    const currentVerse = wordsInChapter.map(wordData => wordData.Greek).join(" ");
    navigator.clipboard.writeText(currentVerse);
  }

  const handleCheckboxShowAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setShowAnswerChecked(isChecked);  // Update the state
    onSetDefaultShowAnswer(isChecked);  // Call the callback with the updated value
  };

  const handleChangeReadingMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    switch (value) {
      case "chapter":
        setReadingMode(value);
        break;
      case "unit":
        setReadingMode(value);
        restartLearning();
        break;
      default:
        console.error("tried to set reading mode to something other than chapter or unit: ", value);
    }
  };

  const restartLearning = () => {
    setStartedTesting(false);  // reset the testing
    setDisplayWords([]);
    setTestWordIndices(new Set());
  }

  const handleSetSmartUnitLearning = (value : boolean) => {
    setSmartUnitLearning(value);
    if (readingMode === 'unit') {
      restartLearning();
    }
  }

  return (<AppContext.Provider
      value={{
        selectedTesters,
        setSelectedTesters,
        gotNewData,
        setGotNewData,
        openGNTData,
        setOpenGNTData,
        strongsMapping,
        setStrongsMapping,
        studyChunks,
        setStudyChunks,
        RMACDescriptions,
        setRMACDescriptions,
        loading,
        setLoading,
        testWordIndices,
        setTestWordIndices,
        showAnswer,
        defaultShowAnswer,
        setDefaultShowAnswer,
        userProgress,
        setUserProgress,
        readingMode,
        setReadingMode,
        testingMode,
        setTestingMode,
        smartUnitLearning,
        handleSetSmartUnitLearning,
        correctLog,
        setCorrectLog,
        wordInfoOpen,
        setWordInfoOpen,
        showAnswerChecked,
        setShowAnswerChecked,
        showEnglishInContext,
        setShowEnglishInContext,
        startedTesting,
        setStartedTesting,
        loadProgress,
        setLoadProgress,
        handleCheckboxShowAnswer,
        handleChangeReadingMode,
        startLearning,
        markWord,
        onTesterSelect,
        onSetDefaultShowAnswer,
        handleCopyClick,
        printDebug,
        previousTestWord,
        nextTestWord,
        flipCard,
        restartLearning,
      }}
    >
      {children}
    </AppContext.Provider>);
};
