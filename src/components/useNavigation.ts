// src/components/useNavigation.ts
import { useAtom } from 'jotai';
import {
  currentBookAtom,
  currentChapterAtom,
  currentIndexAtom,
  defaultShowAnswerAtom,
  displayWordsAtom,
  openGNTDataAtom,
  readingModeAtom,
  showAnswerAtom,
  testWordIndicesAtom,
} from '../atoms/bibleDisplayAtoms';
import {
  BookOption,
  ChapterOption,
  VerseOption,
} from '../types/AppContextTypes';

export const useNavigation = () => {
  const [currentBook, setCurrentBook]         = useAtom(currentBookAtom);
  const [currentChapter, setCurrentChapter]   = useAtom(currentChapterAtom);
  const [currentIndex, setCurrentIndexRaw]    = useAtom(currentIndexAtom);
  const [displayWords, setDisplayWords]       = useAtom(displayWordsAtom);
  const [openGNTData]                         = useAtom(openGNTDataAtom);
  const [testWordIndices, setTestWordIndices] = useAtom(testWordIndicesAtom);
  const [showAnswer, setShowAnswer]           = useAtom(showAnswerAtom);
  const [defaultShowAnswer]                   = useAtom(defaultShowAnswerAtom);
  const [readingMode]                         = useAtom(readingModeAtom);

  // unified setter that applies the "hide answer if tested" logic
  const setCurrentIndex = (idx: number) => {
    if (idx == null || isNaN(idx) || idx < 0 || idx >= displayWords.length) return;
    setCurrentIndexRaw(idx);
    setShowAnswer(testWordIndices?.has(idx) ? false : defaultShowAnswer);
  };

  /**
   * navigateTo(book?, chapter?, verse?)
   * - if book or chapter changed → reload displayWords + clear test indices
   * - always calls setCurrentIndex( … ) with either the matching verse index, or 0
   */
  const navigateTo = (
    bookOpt?: BookOption,
    chapOpt?: ChapterOption,
    verseOpt?: VerseOption
  ) => {
    // 1) no book = full reset
    if (!bookOpt) {
      setCurrentBook(undefined);
      setCurrentChapter(undefined);
      setDisplayWords([]);
      setTestWordIndices(new Set());
      setCurrentIndexRaw(0);
      setShowAnswer(defaultShowAnswer);
      return;
    }

    const sameBook    = currentBook?.value === bookOpt.value;
    const sameChapter =
      sameBook && currentChapter?.chapterValue === chapOpt?.value;

    // 2) book or chapter changed → reload that chapter
    if (!sameBook || !sameChapter) {
      setCurrentBook(bookOpt);

      if (!chapOpt) {
        // book-only navigation
        setCurrentChapter(undefined);
        setDisplayWords([]);
        setTestWordIndices(new Set());
        setCurrentIndexRaw(0);
        setShowAnswer(defaultShowAnswer);
        return;
      }

      // load the new chapter's words
      const filtered = openGNTData.filter(item => {
        const bcw = item.BookChapterVerseWord;
        return (
          bcw != null &&
          bcw.book === bookOpt.value &&
          bcw.chapter === chapOpt.value
        );
      });

      setCurrentChapter({
        bookName:    bookOpt.label,
        bookValue:   bookOpt.value,
        chapterName: chapOpt.label,
        chapterValue: chapOpt.value,
        data:         filtered,
      });
      setDisplayWords(filtered);
      setTestWordIndices(new Set());

      // pick the verse index (or 0 if none)
      if (verseOpt) {
        const idx = filtered.findIndex(item => {
          const bcw = item.BookChapterVerseWord!;
          return bcw.verse === verseOpt.value;
        });
        setCurrentIndex(idx >= 0 ? idx : 0);
      } else {
        setCurrentIndex(0);
      }
    } else {
      // 3) same book+chapter: only verse may have changed
      if (verseOpt) {
        const idx = displayWords.findIndex(item => {
          const bcw = item.BookChapterVerseWord!;
          return bcw.verse === verseOpt.value;
        });
        if (idx >= 0) setCurrentIndex(idx);
      }
    }
  };

  const goLeft  = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  const goRight = () => setCurrentIndex(Math.min(currentIndex + 1, displayWords.length - 1));

  return {
    currentBook,
    currentChapter,
    currentIndex,
    displayWords,
    navigateTo,
    goLeft,
    goRight,
    setCurrentIndex,
  };
};