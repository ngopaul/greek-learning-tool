import React, {createContext, useState, useEffect} from 'react';
import {loadDataVersions, loadOpenGNTData, loadRMACDescriptions, loadStudyChunks} from "../utils/dataLoader";
import {getSmartChunksToTest, getChunksToTest} from "../utils/getTestWords";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({children}) => {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [selectedTesters, setSelectedTesters] = useState([]);
  const [gotNewData, setGotNewData] = useState(false);
  const [openGNTData, setOpenGNTData] = useState([]);
  const [strongsMapping, setStrongsMapping] = useState({});
  const [studyChunks, setStudyChunks] = useState([]);
  const [RMACDescriptions, setRMACDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndexRaw] = useState(0);
  const [displayWords, setDisplayWords] = useState([]);
  const [testWordIndices, setTestWordIndices] = useState(new Set());
  const [showAnswer, setShowAnswer] = useState(true);
  const [defaultShowAnswer, setDefaultShowAnswer] = useState(true);
  const [showEnglishInContext, setShowEnglishInContext] = useState(true);
  const [userProgress, setUserProgress] = useState({});
  const [readingMode, setReadingMode] = useState('chapter'); // 'chapter' or 'unit'
  const [testingMode, setTestingMode] = useState('morphology'); // 'morphology' or 'meaning'
  const [smartUnitLearning, setSmartUnitLearning] = useState(true);
  const [correctLog, setCorrectLog] = useState([]); // List of { index: number, correct: boolean }
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [wordInfoOpen, setWordInfoOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verseOptions, setVerseOptions] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showAnswerChecked, setShowAnswerChecked] = useState(true);
  const [startedTesting, setStartedTesting] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [idToAddressMap, setIdToAddressMap] = useState({});
  const [strongToIdMap, setStrongToIdMap] = useState({});
  const [idToDeclensionMap, setIdToDeclensionMap] = useState({});
  const [strongsToDeclensionsToIdsMap, setStrongsToDeclensionsToIdsMap] = useState({})
  // const [currentStrongsAddresses, setCurrentStrongsAddresses] = useState([])

  const currentWord = displayWords[currentIndex]
  const currentStrongsAddresses = strongToIdMap && currentWord ? strongToIdMap[currentWord.StrongsNumber].map(id => idToAddressMap[id]) : [];
  // const currentStrongsAddresses = idToAddressMap && currentWord ? idToAddressMap[currentWord.id] : [];

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

        const getDeclensionFromStrongsNum = (strongsNum) => strongsMapping[strongsNum];

        const strongToIdMap = {}
        const idToAddressMap = {}
        const idToDeclensionMap = {}
        const strongsToDeclensionsToIdsMap = {}
        wordGNTData.map(word => {
          const curStrongsNumber = word.StrongsNumber
          const curPossibleDeclensions = getDeclensionFromStrongsNum(curStrongsNumber);
          const curWordId = word.id;
          const curWordGreek = word.Greek;

          Object.keys(curPossibleDeclensions).map((declension, _) => {
            const curGreekFromDeclension = curPossibleDeclensions[declension].greek
            if (!idToDeclensionMap[curWordId]) {
              idToDeclensionMap[curWordId] = []
            }
            if (!strongsToDeclensionsToIdsMap[curStrongsNumber]) {
              strongsToDeclensionsToIdsMap[curStrongsNumber] = {}
            }
            if (!strongsToDeclensionsToIdsMap[curStrongsNumber][declension]) {
              strongsToDeclensionsToIdsMap[curStrongsNumber][declension] = []
            }
            if (curWordGreek === curGreekFromDeclension) {
              strongsToDeclensionsToIdsMap[curStrongsNumber][declension].push(word)
              // strongsToDeclensionsToIdsMap[curStrongsNumber][declension].push(curWordId)
              // strongsToDeclensionsToIdsMap[curStrongsNumber][declension].push(curWordGreek)
            }
            // console.log(curPossibleDeclensions[declension].greek)
          })
          // console.log(curStrongsNumber)
          if (!strongToIdMap[curStrongsNumber]) {
            strongToIdMap[curStrongsNumber] = []
          }
          
          strongToIdMap[curStrongsNumber].push(word.id)

          if (!idToAddressMap[curWordId]) {
            idToAddressMap[curWordId] = word.BookChapterVerseWord
          }
          // idToAddressMap[curWordId].push(word)
        })
        setIdToAddressMap(idToAddressMap);
        setStrongToIdMap(strongToIdMap);
        setStrongsToDeclensionsToIdsMap(strongsToDeclensionsToIdsMap)

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

  const setCurrentIndex = (idx, newDisplayWords=displayWords, newTestWordIndices=testWordIndices) => {
    if (idx === null || idx === undefined || isNaN(idx) || idx < 0 || idx >= newDisplayWords.length) {
      return;
    }
    setCurrentIndexRaw(idx);
    if (newTestWordIndices.has(idx)) {
      setShowAnswer(false);
    } else if (readingMode === "chapter") {
      setShowAnswer(defaultShowAnswer);
    } else if (readingMode === "unit" && idx !== displayWords.length) {
      setShowAnswer(defaultShowAnswer);
    } else {
      setShowAnswer(true);
    }
  }

  const goLeft = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  }

  const goRight = () => {
    setCurrentIndex(Math.min(currentIndex + 1, displayWords.length - 1));
  }

  const previousTestWord = () => {
    // find the closest previous word that is in the testWordIndices
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
  }

  const nextTestWord = () => {
    // find the closest previous word that is in the testWordIndices
    if (testWordIndices.size === 0) {
      return;
    }
    for (let i = currentIndex + 1; i < displayWords.length; i++) {
      if (testWordIndices.has(i)) {
        const newIndex = Math.min(i, displayWords.length - 1)
        setCurrentIndex(newIndex);
        break;
      }
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayWords.length, defaultShowAnswer, currentIndex, testWordIndices, correctLog]);

  useEffect(() => {
    if (currentChapter && currentChapter.data) {
      setDisplayWords(currentChapter.data);
      // ****** this is curcial because it's causing race conditions and not allowing other set current index from firing.
      // setCurrentIndex(0);
    }
  }, [currentBook, currentChapter]);

  useEffect(() => {
    if (readingMode === 'chapter' && currentChapter && currentChapter.data) {
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


    // const strongToIdMap = {}
    // const idToAddressMap = {}
    // openGNTData.map(word => {
    //   const curStrongsNumber = word.StrongsNumber
    //   const curWordId = word.id;
    //   if (!strongToIdMap[curStrongsNumber]) {
    //     strongToIdMap[curStrongsNumber] = []
    //   }
    //   strongToIdMap[curStrongsNumber].push(word.id)
    //   if (!idToAddressMap[curWordId]) {
    //     idToAddressMap[curWordId] = word.BookChapterVerseWord
    //   }
    // })


    console.log('strongToIdMap:', strongToIdMap);
    console.log('idToAddressMap:', idToAddressMap);
    console.log('openGNTData:', openGNTData)
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
    const initialWordGroupsToTest = [];
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
    setCurrentIndex(0, temporaryDisplayWords, temporaryTestWordIndices);
    setStartedTesting(true);
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
    const oldMarkValue = newCorrectLog[index];
    const alreadyMarked = oldMarkValue !== null;
    newCorrectLog[index] = isCorrect;
    setCorrectLog(newCorrectLog);
    // update userProgress
    const newUserProgress = {...userProgress};
    const word = displayWords[index];
    const studyChunkID = word.StudyChunkID;
    let latterValues = [];
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

  const onBookSelect = (selected) => {
    console.log('currentBook:', currentBook)
    console.log('selecting book:', selected)
    if (selected && selected.value) {
      console.log('about to set book to:', selected)
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
    console.log('selecting chapter:', selected)
    console.log('currentBook:', currentBook)

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

  const moveToBookChapterVerseWord = (bookChapterVerseWord) => {
    for (let i = 0; i < displayWords.length; i++) {
      if (displayWords[i].BookChapterVerseWord === bookChapterVerseWord) {
        setCurrentIndex(i);
        return;
      }
    }
  }

  const onVerseSelect = (selected) => {
    console.log('selecting verse:', selected)
    console.log('currentBook:', currentBook)

    console.log('currentChapter:', currentChapter)
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

  const setBookChapterVerse = (targetBookChapterVerseWord) => {
    const targetBookLabel = "templabel"
    const targetBookValue = targetBookChapterVerseWord.book

    const targetChapterLabel = "tempChapterLabel"
    const targetChapterValue = targetBookChapterVerseWord.chapter

    const targetVerseValue = targetBookChapterVerseWord.verse

    const targetWordValue = targetBookChapterVerseWord.word

    //book
    setCurrentBook({label: targetBookLabel, value: targetBookValue})

    //chapter
      const curChapterData = openGNTData.filter((item) => {
        if (!item) {
          return false;
        }
        const bookChapterVerseWord = item.BookChapterVerseWord;
        if (!bookChapterVerseWord) {
          return false;
        }
        // Extract chapter info from 'OpenTextWord_KEY'
        // Example Key: "〔40.1.1.w1〕" where 40 = Matthew
        return bookChapterVerseWord.book === targetBookValue && bookChapterVerseWord.chapter === targetChapterValue;
      });
      setCurrentChapter({
        bookName: targetBookLabel,
        bookValue: targetBookValue,
        chapterName: targetChapterLabel,
        chapterValue: targetChapterValue,
        data: curChapterData
      });
      setSelectedTesters(selectedTesters); // trigger callback to update testers

      //verse
      for (let i = 0; i < curChapterData.length; i++) {
        if (curChapterData[i].BookChapterVerseWord.verse === targetVerseValue && curChapterData[i].BookChapterVerseWord.word === targetWordValue) {
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


  // pull this out into getGreekVerse in bibleUtils.
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

  const handleChangeReadingMode = (event) => {
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
        testingMode,
        setTestingMode,
        smartUnitLearning,
        handleSetSmartUnitLearning,
        correctLog,
        setCorrectLog,
        settingsOpen,
        setSettingsOpen,
        helpOpen,
        setHelpOpen,
        wordInfoOpen,
        setWordInfoOpen,
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
        idToAddressMap,
        currentWord,
        currentStrongsAddresses,
        moveToBookChapterVerseWord,
        strongToIdMap,
        strongsToDeclensionsToIdsMap,
        setBookChapterVerse,
      }}
    >
      {children}
    </AppContext.Provider>);
};
