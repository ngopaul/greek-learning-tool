import { useEffect, useState } from "react";
import {
  BookOption,
  ChapterOption,
  CurrentChapter,
  VerseOption,
} from "../types/AppContextTypes";
import { useAtom } from "jotai";
import {
  defaultShowAnswerAtom,
  displayWordsAtom,
  openGNTDataAtom,
  readingModeAtom,
  selectedTestersAtom,
  showAnswerAtom,
  testWordIndicesAtom,
} from "../atoms/bibleDisplayAtoms";

export const useNavigation = () => {
  const [displayWords, setDisplayWords] = useAtom(displayWordsAtom);
  //temporary
  const [showAnswer, setShowAnswer] = useAtom(showAnswerAtom);
  const [defaultShowAnswer, setDefaultShowAnswer] = useAtom(
    defaultShowAnswerAtom
  );
  const [openGNTData, setOpenGNTData] = useAtom(openGNTDataAtom);
  const [selectedTesters, setSelectedTesters] = useAtom(selectedTestersAtom);
  const [testWordIndices, setTestWordIndices] = useAtom(testWordIndicesAtom);
  const [readingMode, setReadingMode] = useAtom(readingModeAtom);

  const [currentBook, setCurrentBook] = useState<BookOption>();
  const [currentChapter, setCurrentChapter] = useState<CurrentChapter>();
  const [currentIndex, setCurrentIndexRaw] = useState(0);
  const [selectedBook, setSelectedBook] = useState<string>();
  const [chapterOptions, setChapterOptions] = useState<ChapterOption[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterOption>();
  const [verseOptions, setVerseOptions] = useState<VerseOption[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<VerseOption>();

  useEffect(() => {
    if (currentChapter && currentChapter.data) {
      setDisplayWords(currentChapter.data);
      setCurrentIndexAndProcess(0);
    }
  }, [currentBook, currentChapter]);

  // useEffect(() => {
  //   if (readingMode === 'chapter' && currentChapter && currentChapter.data) {
  //     setCorrectLog(new Array(currentChapter.data.length).fill(null));
  //     determineTestWords(displayWords);
  //   }
  // }, [selectedTesters, displayWords]);

  const goLeft = () => {
    setCurrentIndexAndProcess(Math.max(currentIndex - 1, 0));
  };

  const goRight = () => {
    setCurrentIndexAndProcess(
      Math.min(currentIndex + 1, displayWords.length - 1)
    );
  };

  const setCurrentIndexAndProcess = (
    idx: number,
    newDisplayWords = displayWords,
    newTestWordIndices = testWordIndices
  ) => {
    if (
      !newTestWordIndices ||
      idx === null ||
      idx === undefined ||
      isNaN(idx) ||
      idx < 0 ||
      idx >= newDisplayWords.length
    ) {
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
  };

  const onBookSelect = (selected: BookOption) => {
    if (selected && selected.value) {
      setCurrentBook(selected);
    } else {
      setCurrentBook(undefined);
    }
    setCurrentChapter(undefined);
    setSelectedTesters([]);
    setCurrentIndexAndProcess(0);
    setDisplayWords([]);
    setTestWordIndices(new Set());
    setShowAnswer(defaultShowAnswer);
  };

  const onChapterSelect = (selected: ChapterOption) => {
    if (!currentBook) {
      // TODO: Handle when book is not selected and selecting chapter here.
      return false;
    }
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
        return (
          bookChapterVerseWord.book === currentBook.value &&
          bookChapterVerseWord.chapter === temporaryCurrentChapter.value
        );
      });
      // console.log(filteredData);
      setCurrentChapter({
        bookName: currentBook.label,
        bookValue: currentBook.value,
        chapterName: temporaryCurrentChapter.label,
        chapterValue: temporaryCurrentChapter.value,
        data: filteredData,
      });
      setSelectedTesters(selectedTesters); // trigger callback to update testers
    } else {
      setCurrentChapter(undefined);
    }
  };

  const onVerseSelect = (selected: VerseOption) => {
    if (!selected) {
      return;
    }
    for (let i = 0; i < displayWords.length; i++) {
      if (displayWords[i].BookChapterVerseWord.verse === selected.value) {
        setCurrentIndexAndProcess(i);
        return;
      }
    }
  };

  return {
    currentChapter,
    currentIndex,
    selectedBook,
    setSelectedBook,
    onChapterSelect,
    chapterOptions,
    setChapterOptions,
    selectedChapter,
    setSelectedChapter,
    verseOptions,
    setVerseOptions,
    selectedVerse,
    setSelectedVerse,
    goLeft,
    goRight,
    setCurrentIndexAndProcess,
    onVerseSelect,
    onBookSelect,
  };
};
