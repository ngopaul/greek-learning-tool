import React, {createContext, useState, useEffect} from 'react';
import {loadOpenGNTData, loadRMACDescriptions, loadStudyChunks} from "../utils/dataLoader";
import {getSmartChunksToTest, getChunksToTest} from "../utils/getTestWords";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({children}) => {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [selectedTesters, setSelectedTesters] = useState([]);
  const [openGNTData, setOpenGNTData] = useState([]);
  const [studyChunks, setStudyChunks] = useState([]);
  const [RMACDescriptions, setRMACDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayWords, setDisplayWords] = useState([]);
  const [testWordIndices, setTestWordIndices] = useState(new Set());
  const [showAnswer, setShowAnswer] = useState(true);
  const [defaultShowAnswer, setDefaultShowAnswer] = useState(true);
  const [userProgress, setUserProgress] = useState({});
  const [readingMode, setReadingMode] = useState('chapter'); // 'chapter' or 'unit'
  const [smartUnitLearning, setSmartUnitLearning] = useState(true);
  const [correctLog, setCorrectLog] = useState([]); // List of { index: number, correct: boolean }
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verseOptions, setVerseOptions] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showAnswerChecked, setShowAnswerChecked] = useState(true);
  const [startedTesting, setStartedTesting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sameHashAndChunks] = await Promise.all([loadStudyChunks()]);
        const sameHash = sameHashAndChunks[0];
        const chunks = sameHashAndChunks[1];
        const [gntData, rmacDescriptions] = await Promise.all([loadOpenGNTData(chunks, sameHash), loadRMACDescriptions()]);
        setOpenGNTData(gntData);
        setRMACDescriptions(rmacDescriptions);
        setStudyChunks(chunks);

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const goLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    if (testWordIndices.has(currentIndex - 1)) {
      setShowAnswer(false);
    } else if (currentIndex > 0) {
      setShowAnswer(defaultShowAnswer);
    }
  }

  const goRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, displayWords.length - 1));
    if (testWordIndices.has(currentIndex + 1)) {
      setShowAnswer(false);
    } else if (currentIndex + 1 < displayWords.length) {
      setShowAnswer(defaultShowAnswer);
    }
  }

  const previousTestWord = () => {
    // find the closest previous word that is in the testWordIndices
    if (testWordIndices.size === 0) {
      return;
    }
    let i = currentIndex - 1;
    for (i = currentIndex - 1; i > 0; i--) {
      if (testWordIndices.has(i)) {
        break;
      }
    }
    const newIndex = Math.max(i, 0);
    setCurrentIndex(newIndex);
    if (testWordIndices.has(newIndex)) {
      setShowAnswer(false);
    } else {
      setShowAnswer(defaultShowAnswer);
    }
  }

  const nextTestWord = () => {
    // find the closest previous word that is in the testWordIndices
    if (testWordIndices.size === 0) {
      return;
    }
    let i = currentIndex + 1;
    for (i = currentIndex + 1; i < displayWords.length; i++) {
      if (testWordIndices.has(i)) {
        break;
      }
    }
    const newIndex = Math.min(i, displayWords.length - 1)
    setCurrentIndex(newIndex);
    if (testWordIndices.has(newIndex)) {
      setShowAnswer(false);
    } else {
      setShowAnswer(defaultShowAnswer);
    }
  }

  const flipCard = () => {
    setShowAnswer((prev) => !prev);
  }

  // Handle Keyboard Navigation and Space Key for Toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goRight();
      } else if (e.key === 'ArrowLeft') {
        goLeft();
      } else if (e.key === '<') {
        previousTestWord();
      } else if (e.key === '>') {
        nextTestWord();
      } else if (e.key === ' ') {
        flipCard();
      } else if (e.key === '?') {
        handleHelpClick();
      } else if (e.key === '/') {
        handleSettingsClick();
      } else if (e.key === 'ArrowUp') {
        markWord(currentIndex, true);
      } else if (e.key === 'ArrowDown') {
        markWord(currentIndex, false);
      } else if (e.key === ';') {
        printDebug();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayWords.length, defaultShowAnswer, currentIndex, testWordIndices, correctLog]);

  useEffect(() => {
    if (currentChapter && currentChapter.data) {
      setDisplayWords(currentChapter.data);
      setCurrentIndex(0);
    }
  }, [currentBook, currentChapter]);

  useEffect(() => {
    if (currentChapter && currentChapter.data) {
      setCorrectLog(new Array(currentChapter.data.length).fill(null));
      determineTestWords(displayWords);
    }
  }, [selectedTesters, displayWords]);

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
    console.log('selectedBook:', selectedBook);
    console.log('selectedChapter:', selectedChapter);
    console.log('selectedVerse:', selectedVerse);
    console.log('selectedTesters:', selectedTesters);
    console.log('currentWord', displayWords[currentIndex]);
    console.log('correctLog:', correctLog);
    console.log('correctLog at currentIndex:', correctLog[currentIndex]);
    console.log('showAnswer:', showAnswer);
  }

  // Function to determine which words to test
  const determineTestWords = (words) => {
    // If no testers are selected, clear the test word indices
    if (selectedTesters.length === 0) {
      setTestWordIndices(new Set());
      return;
    }

    // Create a set to store the indices of words that should be tested
    const testIndices = new Set();

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
    const studyChunkLists = {};
    let wordGroupsToTest = [];
    for (const [unitName, studyChunksForTester] of Object.entries(studyChunks)) {
      if (studyChunksForTester) {
        // Check each study chunk under this unit
        studyChunksForTester.forEach(chunk => {
          const testerID = chunk.studyChunkID.split(" | ")[0];
          if (selectedTesters.map(tester => tester.value).includes(testerID)) {
            studyChunkLists[chunk.studyChunkID] = [];
            wordGroupsToTest.push(chunk.studyChunkID);
          }
        });
      }
    }
    // filter openGNTData for words that match the chunks in studyChunks, placing the results into their respective list
    for (const [studyChunkID, studyChunkList] of Object.entries(studyChunkLists)) {
      const wordsToTest = openGNTData.filter(word => studyChunkID === word.StudyChunkID);
      // shuffle the wordsToTest
      wordsToTest.sort(() => Math.random() - 0.5);
      studyChunkList.push(...wordsToTest);
    }
    // Use either getSmartWordsToTest or getWordsToTest on the list of chunk names (wordGroups) and the userProgress, to get the wordsToTest
    let chunksToTest;
    wordGroupsToTest.sort(() => Math.random() - 0.5);
    wordGroupsToTest = wordGroupsToTest.slice(0, 20);
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
    setCurrentIndex(0);
    const temporaryTestWordIndices = new Set(Array.from(Array(temporaryDisplayWords.length).keys()))
    setTestWordIndices(temporaryTestWordIndices);
    setStartedTesting(true);
    setShowAnswer(false);
    // correctLog is a list of booleans the length of displayWords, initialized to null
    // it is used to keep track of whether the user got each word correct or not
    setCorrectLog(new Array(temporaryDisplayWords.length).fill(null));
  };

  const markWord = (index, isCorrect) => {
    if (
      displayWords.length === 0
      || (readingMode === "unit" && currentIndex === displayWords.length - 1)
      || !testWordIndices.has(currentIndex)
    ) {
      return;
    }
    const newCorrectLog = [...correctLog];
    const alreadyMarked = newCorrectLog[index] !== null;
    newCorrectLog[index] = isCorrect;
    setCorrectLog(newCorrectLog);
    // update userProgress
    const newUserProgress = {...userProgress};
    const word = displayWords[index];
    const studyChunkID = word.StudyChunkID;
    if (alreadyMarked && Array.isArray(newUserProgress[studyChunkID])) {
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
    setUserProgress(newUserProgress);
  };

  const onBookSelect = (selected) => {
    if (selected && selected.value) {
      setCurrentBook(selected);
    } else {
      setCurrentBook(null);
    }
    setCurrentChapter(null);
    setSelectedTesters([]);
    setCurrentIndex(0);
    setDisplayWords([]);
    setTestWordIndices(new Set());
    setShowAnswer(defaultShowAnswer);
  }

  const onChapterSelect = (selected) => {
    if (selected) {
      const temporaryCurrentChapter = selected;
      // console.log(openGNTData);
      // console.log(currentBook.value, temporaryCurrentChapter.value);
      const filteredData = openGNTData.filter((item) => {
        if (!item) {
          return false;
        }
        const bookChapterVerseWord = item.BookChapterVerseWord;
        if (!bookChapterVerseWord) {
          return false;
        }
        // Extract chapter info from 'OpenTextWord_KEY'
        // Example Key: "〔40.1.1.w1〕" where 40 = Matthew
        return bookChapterVerseWord.book === currentBook.value && bookChapterVerseWord.chapter === temporaryCurrentChapter.value;
      });
      // console.log(filteredData);
      setCurrentChapter({
        bookName: currentBook.label,
        bookValue: currentBook.value,
        chapterName: temporaryCurrentChapter.label,
        chapterValue: temporaryCurrentChapter.value,
        data: filteredData
      });
      setSelectedTesters(selectedTesters); // trigger callback to update testers
    } else {
      setCurrentChapter(null);
    }
  };

  const onVerseSelect = (selected) => {
    if (!selected) {
      return;
    }
    for (let i = 0; i < displayWords.length; i++) {
      if (displayWords[i].BookChapterVerseWord.verse === selected.value) {
        setCurrentIndex(i);
        return;
      }
    }
  }

  const onTesterSelect = (selected) => {
    setSelectedTesters(selected);
  };

  const onSetDefaultShowAnswer = (shouldShow) => {
    setDefaultShowAnswer(shouldShow);
  }

  const handleSettingsClick = () => {
    setHelpOpen(false);
    setSettingsOpen((value) => (!value));
  };

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

  const handleHelpClick = () => {
    setSettingsOpen(false);
    setHelpOpen((value) => (!value));
  };

  const handleCheckboxShowAnswer = (event) => {
    const isChecked = event.target.checked;
    setShowAnswerChecked(isChecked);  // Update the state
    onSetDefaultShowAnswer(isChecked);  // Call the callback with the updated value
  };

  const handleRadioChange = (event) => {
    const newReadingMode = event.target.value;
    restartLearning();
    setReadingMode(newReadingMode);
  };

  const restartLearning = () => {
    setStartedTesting(false);  // reset the testing
    setDisplayWords([]);
    setTestWordIndices(new Set());
  }

  const handleSetSmartUnitLearning = (value) => {
    setSmartUnitLearning(value);
    if (readingMode === 'unit') {
      restartLearning();
    }
  }

  return (<AppContext.Provider
      value={{
        currentBook,
        setCurrentBook,
        currentChapter,
        setCurrentChapter,
        selectedTesters,
        setSelectedTesters,
        openGNTData,
        setOpenGNTData,
        studyChunks,
        setStudyChunks,
        RMACDescriptions,
        setRMACDescriptions,
        loading,
        setLoading,
        currentIndex,
        setCurrentIndex,
        displayWords,
        setDisplayWords,
        testWordIndices,
        setTestWordIndices,
        showAnswer,
        defaultShowAnswer,
        setDefaultShowAnswer,
        userProgress,
        setUserProgress,
        readingMode,
        setReadingMode,
        smartUnitLearning,
        handleSetSmartUnitLearning,
        correctLog,
        setCorrectLog,
        settingsOpen,
        setSettingsOpen,
        helpOpen,
        setHelpOpen,
        selectedBook,
        setSelectedBook,
        chapterOptions,
        setChapterOptions,
        selectedChapter,
        setSelectedChapter,
        verseOptions,
        setVerseOptions,
        setSelectedVerse,
        showAnswerChecked,
        setShowAnswerChecked,
        startedTesting,
        setStartedTesting,
        handleCheckboxShowAnswer,
        handleRadioChange,
        startLearning,
        markWord,
        onBookSelect,
        onChapterSelect,
        onVerseSelect,
        onTesterSelect,
        onSetDefaultShowAnswer,
        handleSettingsClick,
        handleCopyClick,
        printDebug,
        handleHelpClick,
        goRight,
        goLeft,
        previousTestWord,
        nextTestWord,
        flipCard,
        restartLearning,
      }}
    >
      {children}
    </AppContext.Provider>);
};
