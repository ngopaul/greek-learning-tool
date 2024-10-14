import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppContext } from "../contexts/AppContext";

const WordContext = () => {
  const { displayWords, currentIndex, openGNTData, testWordIndices, setCurrentIndex,
    showEnglishInContext, showAnswer } = useContext(AppContext);

  // If there are no display words, or the current index is invalid, return null
  if (displayWords.length === 0 || !displayWords[currentIndex]) {
    return null;
  }

  const currentWord = displayWords[currentIndex];

  // If the current word is for the finished round, return null
  if (currentWord.StudyChunkID === "finished round of testing") {
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
  wordsInChapter.forEach((word) => {
    word.displayIndex = displayWords.findIndex(w => w.BookChapterVerseWord === word.BookChapterVerseWord);
  });
  wordsInChapter.forEach((word) => {
    if (word.displayIndex === -1) {
      word.displayIndex = null;
    }
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap', marginTop: "20px" }}>
      {wordsInChapter.map((word, index) => (
        <Box
          key={index}
          sx={{
            padding: 0,
            color: word === currentWord ? 'red' : 'inherit',
          }}
          onClick={() => setCurrentIndex(word.displayIndex)}
        >
          {/* Greek and English word display */}
          <Box>
            <Typography variant="h6" align="center">{word.Greek}</Typography>
          </Box>
          {
            showEnglishInContext ? (
              <Box>
                {/* Don't display the English word if it is not the same as the current word and if is also
                one of the test words
                 */}
                {
                  ((
                    (testWordIndices.has(word.displayIndex) && currentIndex !== word.displayIndex)
                      || (currentIndex === word.displayIndex && !showAnswer)
                    ) ? (
                      <Typography variant="body1" align="center" sx={{color: 'red'}}>?</Typography>
                    ) : (
                      <Typography variant="body1" align="center">{word.English}</Typography>
                    )
                  )
                }
              </Box>
            ) : (<></>)
          }
        </Box>
      ))}
    </Box>
  );
};

export default WordContext;