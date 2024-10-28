import { useEffect } from "react";
import {
  BookOption,
  ChapterOption,
  VerseOption,
} from "../types/AppContextTypes";
import { useAtom } from "jotai";
import {
  currentBookAtom,
  currentChapterAtom,
  currentIndexAtom,
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
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);
  const [currentChapter, setCurrentChapter] = useAtom(currentChapterAtom);
  const [currentBook, setCurrentBook] = useAtom(currentBookAtom);

  //temporary
  const [showAnswer, setShowAnswer] = useAtom(showAnswerAtom);
  const [defaultShowAnswer, setDefaultShowAnswer] = useAtom(
    defaultShowAnswerAtom
  );
  const [openGNTData, setOpenGNTData] = useAtom(openGNTDataAtom);
  const [selectedTesters, setSelectedTesters] = useAtom(selectedTestersAtom);
  const [testWordIndices, setTestWordIndices] = useAtom(testWordIndicesAtom);
  const [readingMode, setReadingMode] = useAtom(readingModeAtom);
  

  useEffect(() => {
    if (currentChapter && currentChapter.data) {
      setDisplayWords(currentChapter.data);
      setCurrentIndexAndProcess(0);
    }
  }, [currentBook, currentChapter]);

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
    setCurrentIndex(idx);
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
    onChapterSelect,
    goLeft,
    goRight,
    setCurrentIndexAndProcess,
    onVerseSelect,
    onBookSelect,
  };
};
