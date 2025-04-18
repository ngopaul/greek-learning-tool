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

  // Nothing to show unless we're in a valid verse
  if (
    displayWords.length === 0 ||
    currentIndex < 0 ||
    currentIndex >= displayWords.length
  ) {
    return null;
  }

  const currentWord = displayWords[currentIndex];
  if (currentWord.StudyChunkID === 'finished round of testing') {
    return null;
  }

  const { book, chapter, verse } = currentWord.BookChapterVerseWord;

  // Gather all words in this verse, and record their index within displayWords (or null)
  const wordsInChapter = openGNTData
    .filter(
      w =>
        w.BookChapterVerseWord.book === book &&
        w.BookChapterVerseWord.chapter === chapter &&
        w.BookChapterVerseWord.verse === verse
    )
    .map(w => {
      const idx = displayWords.findIndex(
        dw =>
          dw.BookChapterVerseWord.book === w.BookChapterVerseWord.book &&
          dw.BookChapterVerseWord.chapter === w.BookChapterVerseWord.chapter &&
          dw.BookChapterVerseWord.verse === w.BookChapterVerseWord.verse &&
          dw.BookChapterVerseWord.word === w.BookChapterVerseWord.word
      );
      return { word: w, displayIndex: idx >= 0 ? idx : null };
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

        // Determine what to show as the English/context line
        let contextLine: string | null = null;
        if (showEnglishInContext) {
          if (isCurrent) {
            contextLine = showAnswer ? word.English : '?';
          } else if (!showAnswerChecked) {
            // hide all non-current words
            contextLine = '?';
          } else {
            // showAnswerChecked === true
            contextLine = isTested ? '?' : word.English;
          }
        }
        let maxChars = Math.floor(Math.max(word.Greek.length, (word.English ? word.English.length : 0)) * 0.7);
        let minWidth = `${maxChars}ch`;

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
              color: 'inherit',
              minWidth: minWidth,
            }}
          >
            <Typography
              variant="h6"
              color={isCurrent ? 'red' : 'inherit'}
              sx={{
                textDecoration: isTested ? 'underline' : 'none',
              }}
            >
              {word.Greek}
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