import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppContext } from "../contexts/AppContext";

const WordContext = () => {
  const { displayWords, currentIndex, showAnswer, openGNTData, testWordIndices } = useContext(AppContext);

  // If there are no display words, or the current index is invalid, return null
  if (displayWords.length === 0 || !displayWords[currentIndex]) {
    return null;
  }

  const currentWord = displayWords[currentIndex];

  // If the answer shouldn't be shown or the current word is for the finished round, return null
  if (!showAnswer || currentWord.StudyChunkID === "finished round of testing") {
    return null;
  }

  // Get all words in the surrounding chapter using the current word's BookChapterVerseWord
  const { book, chapter, verse } = currentWord.BookChapterVerseWord;

  const wordsInChapter = openGNTData.filter(word =>
    word.BookChapterVerseWord.book === book &&
    word.BookChapterVerseWord.chapter === chapter &&
    word.BookChapterVerseWord.verse === verse
  );

  // add a key to wordsInChapter that tells where the word is in the displayWords array, or -1 if it is not
  // in the displayWords array
  wordsInChapter.forEach((word, index) => {
    word.displayIndex = displayWords.findIndex(w => w.BookChapterVerseWord === word.BookChapterVerseWord);
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap'}}>
      {wordsInChapter.map((word, index) => (
        <Box
          key={index}
          sx={{
            padding: 1,
            color: word === currentWord ? 'red' : 'inherit',
            borderRadius: 1,
          }}
        >
          {/* Greek and English word display */}
          <Box>
            <Typography variant="h6" align="center">{word.Greek}</Typography>
          </Box>
          <Box>
            {/* Don't display the English word if it is not the same as the current word and if is also
            one of the test words
             */}
            {
              (word !== currentWord && testWordIndices.has(word.displayIndex) ? (
                <Typography variant="body1" align="center" sx={{color: 'red'}}>?</Typography>
                ) : (
                  <Typography variant="body1" align="center">{word.English}</Typography>
                )
              )
            }
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WordContext;