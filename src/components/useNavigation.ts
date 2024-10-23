import { useState } from "react";
import { BookOption, CurrentChapter } from "../types/AppContextTypes";



export const useNavigation = () => {

  const [currentBook, setCurrentBook] = useState<BookOption>();
  const [currentChapter, setCurrentChapter] = useState<CurrentChapter>();
  const [currentIndex, setCurrentIndexRaw] = useState(0);
  const [selectedBook, setSelectedBook] = useState();
  const [chapterOptions, setChapterOptions] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState();
  const [verseOptions, setVerseOptions] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);


  const goLeft = () => {
    setCurrentIndexAndProcess(Math.max(currentIndex - 1, 0));
  }

  const goRight = () => {
    setCurrentIndexAndProcess(Math.min(currentIndex + 1, displayWords.length - 1));
  }

  const setCurrentIndexAndProcess = (idx: number, newDisplayWords=displayWords, newTestWordIndices=testWordIndices) => {
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
  return {currentBook, currentChapter, currentIndex, selectedBook, chapterOptions, selectedChapter, verseOptions, selectedVerse, goLeft, goRight, setCurrentIndexAndProcess}
}