import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { displayWordsAtom } from '../atoms/bibleDisplayAtoms';
import { AppContext } from '../contexts/AppContext';
import { useNavigation } from './useNavigation';

const WordContext: React.FC = () => {
  const [displayWords] = useAtom(displayWordsAtom);
  const { currentIndex, setCurrentIndexAndProcess } = useNavigation();
  const context = useContext(AppContext);
  if (!context) return null;

  const {
    openGNTData,
    testWordIndices,
    showEnglishInContext,
    showAnswer,
    showAnswerChecked,
  } = context;

  // 1. Bail out if no words or bad index
  if (
    displayWords.length === 0 ||
    currentIndex < 0 ||
    currentIndex >= displayWords.length
  ) {
    return null;
  }

  const currentWord = displayWords[currentIndex];

  // 2. If it's the "finished" marker or has no BCVW, bail out
  if (
    currentWord.StudyChunkID === 'finished round of testing' ||
    !currentWord.BookChapterVerseWord
  ) {
    return null;
  }

  // 3. Destructure safely
  const { book, chapter, verse } = currentWord.BookChapterVerseWord;

  // 4. Collect only those openGNTData entries with a non-null BCVW that match this verse
  const wordsInChapter = openGNTData
    .filter(w => w.BookChapterVerseWord != null)
    .filter(w => {
      const bcw = w.BookChapterVerseWord!;
      return (
        bcw.book === book &&
        bcw.chapter === chapter &&
        bcw.verse === verse
      );
    })
    .map(w => {
      // find its index in displayWords (or null if not found)
      const idx = displayWords.findIndex(dw =>
        dw.BookChapterVerseWord != null &&
        dw.BookChapterVerseWord.book === w.BookChapterVerseWord!.book &&
        dw.BookChapterVerseWord.chapter === w.BookChapterVerseWord!.chapter &&
        dw.BookChapterVerseWord.verse === w.BookChapterVerseWord!.verse &&
        dw.BookChapterVerseWord.word === w.BookChapterVerseWord!.word
      );
      return {
        word: w,
        displayIndex: idx >= 0 ? idx : null,
      };
    });

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mt: 2,
        justifyContent: 'center',
      }}
    >
      {wordsInChapter.map(({ word, displayIndex }, i) => {
        const isCurrent = displayIndex === currentIndex;
        const isTested =
          displayIndex !== null && testWordIndices.has(displayIndex);

        let contextLine: string | null = null;
        if (showEnglishInContext) {
          if (isCurrent) {
            contextLine = showAnswer ? word.English : '?';
          } else if (!showAnswerChecked) {
            contextLine = '?';
          } else {
            contextLine = isTested ? '?' : word.English;
          }
        }

        // Reserve approximate width so “?” vs full English doesn't shrink
        const greekText = word.Greek || '';
        const englishText = word.English || '';
        const maxChars = Math.max(greekText.length, englishText.length);
        const minWidth = `${maxChars}ch`;

        return (
          <Box
            key={i}
            onClick={() =>
              typeof displayIndex === 'number' &&
              setCurrentIndexAndProcess(displayIndex)
            }
            sx={{
              textAlign: 'center',
              cursor: displayIndex !== null ? 'pointer' : 'default',
              minWidth,
            }}
          >
            <Typography
              variant="h6"
              color={isCurrent ? 'red' : 'inherit'}
              sx={{ textDecoration: isTested ? 'underline' : 'none' }}
            >
              {greekText}
            </Typography>

            {showEnglishInContext && contextLine !== null && (
              <Typography
                variant="body2"
                color={isCurrent ? 'red' : 'inherit'}
              >
                {contextLine}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default WordContext;