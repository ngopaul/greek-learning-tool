import {Box, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import Popup from "./Popup";
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import {bibleNumberToBook, getGreekVerse} from "../utils/bibleUtils";
// TODO (Caleb): check this later... 
// @ts-ignore
import strongsGreekDictionary from "../utils/strongs-greek-dictionary";
import { WordData } from "../types/AppContextTypes";

/*
 * Display the strongsMapping information about the current word
 * 1. Get the current word and therefore its strong's number
 * 2. use strongsMapping to get a mapping from strong's number => morphology => {greek: greek, count: count}
 * 3. for each morphology for the appropriate strong's number, show a line that converts the morphology
 * name to something legible (use rmacDescriptions[morphology])
 * 4. also show the greek and the number of usages
 * 5. maybe dynamically calculate the declension/group? TODO
 */
const WordInfoPopup = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const { wordInfoOpen, setWordInfoOpen, currentIndex, displayWords, strongsMapping, RMACDescriptions, strongsToDeclensionsToWordsMap, setBookChapterVerseWord, openGNTData }= context;
  

  const [expandedDeclensions, setExpandedDeclensions] = React.useState<{index: number, words: WordData[]}>()

  const currentWord = displayWords[currentIndex];
  if (!currentWord) {
    return (
      <Popup open={wordInfoOpen} onClose={() => setWordInfoOpen(false)} title="Invalid Word">
        <Typography variant={"h6"}>
          Current Word not Valid
        </Typography>
      </Popup>
    )
  }
  const currentStrongs = currentWord.StrongsNumber;
  const possibleDeclensions = strongsMapping[currentStrongs];
  let strongsEntry = strongsGreekDictionary[currentStrongs];
  if (!strongsEntry) {
    console.log("No strongs entry for " + currentStrongs + " word: ");
    console.log(currentWord);
    strongsEntry = {};
  }

  return (
    <Popup open={wordInfoOpen} onClose={() => setWordInfoOpen(false)}
           title={"Info On: " + currentWord.Greek}>
      <Typography variant="body1">
        {currentWord.Greek}: {RMACDescriptions[currentWord.Morphology]}
      </Typography>
      <hr/>
      <Typography variant="h6">
        {strongsEntry["lemma"]}
      </Typography>
      <Typography variant="body1">
        Meaning: {currentWord.Meaning}
      </Typography>
      <Typography variant="body1">
        Strong's Definition: {strongsEntry["strongs_def"] ? strongsEntry["strongs_def"] : "[none]"}
      </Typography>
      <Typography variant="body1">
        Derivation: {strongsEntry["derivation"] ? strongsEntry["derivation"] : "[none]"}
      </Typography>
      <hr/>
      <Box sx={{"my": 1}}>
        {
          // TODO (Caleb): find type for strongsMapping
          (Object.keys(possibleDeclensions).map((declension, index) => (
            <>
          <Box key={"word-declension-" + index} sx={{py: 1}} 
              onClick={() => {
                console.log('currentWord:', currentWord)
                console.log('strongsMapping', strongsMapping)
                console.log('possibleDeclensions', possibleDeclensions)
                console.log("strong to declension to id")
                console.log(strongsToDeclensionsToWordsMap)
                console.log(strongsToDeclensionsToWordsMap[currentStrongs])
                console.log(strongsToDeclensionsToWordsMap[currentStrongs][declension])
                console.log('biblenumbertobook:', bibleNumberToBook)


                if (expandedDeclensions && expandedDeclensions.index === index) {
                  console.log("click on the oopen one so should close")
                  setExpandedDeclensions(undefined)
                  return;
                }
                
                console.log('setting expandedDeclensions', {
                  index: index,
                  words: strongsToDeclensionsToWordsMap[currentStrongs][declension],
                })
                setExpandedDeclensions({
                  index: index,
                  words: strongsToDeclensionsToWordsMap[currentStrongs][declension],
                })
              }}
          >
            <Typography variant="body1" sx={{flex: 1, textAlign: 'center'}}>
              {RMACDescriptions[declension]}: {possibleDeclensions[declension].greek} ({possibleDeclensions[declension].count})
            </Typography>
            
            
          </Box>
          {expandedDeclensions && expandedDeclensions.index === index ? (
            expandedDeclensions.words.map(word => 
            (
                <Typography variant="body1" sx={{flex: 1, textAlign: 'left'}}
                onClick={() => {
                  console.log("need to go to:", word.BookChapterVerseWord.verse)
                  // moveToBookChapterVerseWord(word.BookChapterVerseWord)
                  setExpandedDeclensions(undefined)
                  setBookChapterVerseWord(word.BookChapterVerseWord)
                  setWordInfoOpen(false)
          console.log('book number:',word.BookChapterVerseWord.book)
                }}
                >
            {word.Greek} | {bibleNumberToBook[word.BookChapterVerseWord.book]} {word.BookChapterVerseWord.chapter}:{word.BookChapterVerseWord.verse} |  <span color="blue" style={{color:"gray"}}>
            {getGreekVerse(word.BookChapterVerseWord, openGNTData)}
            </span>
          </Typography>
              )
            )
          ) 
          : null
        }
        </>
        )))
        }
      </Box>
    </Popup>
  )
}

export default WordInfoPopup;