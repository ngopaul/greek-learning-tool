import Papa from 'papaparse';
// import { createHash } from 'crypto-browserify';
import Dexie from 'dexie';
import { MappedDataEntry, RMACResults, StudyChunk, StudyChunkCSVResult } from '../types/dataLoaderTypes';

// Initialize Dexie database
const db = new Dexie('OpenGNTDataDB');
db.version(1).stores({
  words: '++id, BookChapterVerseWord, Greek, Morphology, English, StudyChunkID, StrongsNumber', // Define schema
});

// Function to save data to IndexedDB
const saveToIndexedDB = async (data : MappedDataEntry[]) => {
  // TODO (Caleb): see why these are errors... they weren't erros when it was javascript.
  // @ts-ignore
  await db.words.clear(); // Clear old data
  // @ts-ignore
  await db.words.bulkAdd(data); // Add new data
};

// Function to load data from IndexedDB
const loadFromIndexedDB = async () => {
  // TODO (Caleb): see why these are errors... they weren't erros when it was javascript.
  // @ts-ignore
  return await db.words.toArray(); // Retrieve all stored data
};

export const loadDataVersions = async () => {
  // return true if data version is different from local cache, and what to set gotNewData to
  const response = await fetch('/data/data_versions.txt');
  const dataVersions = await response.text();
  const localStorageDataVersion = localStorage.getItem('dataVersion');
  const isSameVersion = localStorageDataVersion === dataVersions;
  if (isSameVersion) {
    console.log("Data version same - Loading data from local cache");
    return {
      needToUpdateFiles: false,
      isNewData: false,
    }
  }
  localStorage.setItem('dataVersion', dataVersions);
  console.log("Data version different - Loading data from server");
  if (localStorageDataVersion) {
    return {
      needToUpdateFiles: true,
      isNewData: true,
    }
  }
  return {
    needToUpdateFiles: true,
    isNewData: false,
  }
}



/* Function to parse OpenGNT_keyedFeatures.csv
 * Returns a very large list of objects. Each object has the following fields:
 *  Greek: the greek
 *  Morphology: the morphology code (e.g. V-PAI-1S)
 *  English: the english meaning of the word
 *  BookChapterVerseWord: returns that object (with those fields, all of them being integers)
 */
// TODO (Caleb): any...
export const loadOpenGNTData = async (studyChunks: StudyChunk[], needToUpdateFiles: boolean, setLoadProgress : React.Dispatch<React.SetStateAction<number>>): Promise<any> => {
  console.log("Loading OpenGNT data");
  // if sameHash is true, then load the data from IndexedDB
  if (!needToUpdateFiles) {
    const storedData = await loadFromIndexedDB();
    if (storedData && storedData.length > 0) {
      setLoadProgress(100);
      // TODO (Caleb): modified to add ?? "" to catch null. Verify if its ok.
      return [storedData, JSON.parse(localStorage.getItem('strongs_mapping') ?? "")];
    }
  }
  // otherwise, load the data from the server
  const response = await fetch('/data/OpenGNT_version3_3.csv');
  const csvData = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      // TODO (Caleb): this ignore shoudlnt be here. we should write out the model for OpenGNT_version3_3
      // @ts-ignore
      header: true, complete: async (results) => {
        // Map the necessary fields
        const totalWords = results.data.length;
        let processedWords = 0;
        let sizeBeforeUpdate = totalWords / 100;
        let currentSizeBeforeUpdate = 0;
        const mappedData : MappedDataEntry[] = [];
        const strongsMapping: Record<string, Record<string, any>> = {};

        // Instead of using map, loop asynchronously to allow state updates
        let previousWordIdx = 0;
        let currentBook = 40;
        let currentChapter = 1;
        let currentVerse = 1;
        for (let item of results.data) {
          const greekBreakdown  = item["〔OGNTk｜OGNTu｜OGNTa｜lexeme｜rmac｜sn〕"];
          const tbessg = item["〔TBESG｜IT｜LT｜ST｜Español〕"];
          const bookChapterVerse = item["〔Book｜Chapter｜Verse〕"];
          if (greekBreakdown && tbessg && bookChapterVerse) {
            // Parse fields as per your CSV structure
            const greek = parseGreekWord(greekBreakdown);
            const morphology = parseMorphology(greekBreakdown);
            const strongsNumber = parseStrongsNumber(greekBreakdown);
            const [rootMeaning, english] = parseEnglishMeaning(tbessg);
            const bookChapterVerseWord = parseBookChapterVerseWord(previousWordIdx, bookChapterVerse, currentBook, currentChapter, currentVerse);
            if (!bookChapterVerseWord) {
              // TODO (Caleb): verify this is correct error throwing.
              throw Error("bookChapterVerseWord was null in loadOpenGNT");
            }
            currentBook = bookChapterVerseWord.book;
            currentChapter = bookChapterVerseWord.chapter;
            currentVerse = bookChapterVerseWord.verse;
            previousWordIdx = bookChapterVerseWord.word;

            const studyChunkID = parseStudyChunkID(studyChunks, greek, morphology);

            mappedData.push({
              BookChapterVerseWord: bookChapterVerseWord,
              Greek: greek,
              Morphology: morphology,
              English: english,
              Meaning: rootMeaning,
              StudyChunkID: studyChunkID,
              StrongsNumber: strongsNumber
            });

            if (strongsMapping[strongsNumber]) {
              if (strongsMapping[strongsNumber][morphology]) {
                // add to the morphology dictionary's count
                strongsMapping[strongsNumber][morphology].count += 1
              } else {
                strongsMapping[strongsNumber][morphology] = {
                  greek: greek,
                  count: 1
                }
              }
            } else {
              strongsMapping[strongsNumber] = {}
              strongsMapping[strongsNumber][morphology] = {
                greek: greek,
                count: 1
              }
            }

            // Increment the processed words and update progress
            processedWords++;

            // Allow React to update the progress by yielding control
            if (currentSizeBeforeUpdate < sizeBeforeUpdate) {
              currentSizeBeforeUpdate++;
            } else {
              // Yield control to React to update the progress
              setLoadProgress(Math.round((processedWords / totalWords) * 100));
              await new Promise((resolve) => setTimeout(resolve, 0));
              currentSizeBeforeUpdate = 0;
            }
          }
        }
        // Save the processed data to IndexedDB
        await saveToIndexedDB(mappedData);
        localStorage.setItem('strongs_mapping', JSON.stringify(strongsMapping));
        resolve([mappedData, strongsMapping]);
        // TOOD (Caleb): any...
      }, error: (err: any) => {
        reject(err);
      },
    });
  });
};




/*
 * Parse study_chunks.csv
 * Returns a mapping from unit_name to a list of objects with fields:
 *  identifier: a name that represents what is being tested, like "ω verbs Active 1st Person Singular"
 *  studyChunkID: the studyChunkID formed from the unit_name and the identifier
 *  morphologies: the list of morphologies that should be tested in this study chunk
 *  endings: what the word must end with in order to be tested by this study chunk
 */

export const loadStudyChunks = async (needToUpdateFiles: boolean): Promise<Record<string, StudyChunk[]>> => {
  // Get the hash of /data/study_chunks.csv
  console.log("Loading study_chunks.csv");
  const response = await fetch('/data/study_chunks.csv');
  const csvData = await response.text();
  if (!needToUpdateFiles) {
    const localStorageStudyChunks = localStorage.getItem('study_chunks');
    if (!localStorageStudyChunks) {
      throw Error("Nothing was loaded from local storage for study_chunks.... ")
    }
    return JSON.parse(localStorageStudyChunks);
  }
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true, complete: (results :StudyChunkCSVResult) => {
        const data = results.data;
        const unitDict : Record<string, StudyChunk[]>= {};

        data.forEach(row => {
          const {unit, name, morphologies, endings} = row;
          if (!row || !unit) {
            return;
          }

          // Parse morphologies and endings by splitting them at '|'
          const identifier = name ? name.toString() : "";
          const morphologiesList = morphologies ? morphologies.split('|') : [];
          const endingsList = endings ? endings.split('|') : [];

          // Create the dictionary entry for this row
          const entry: StudyChunk = {
            identifier: identifier,
            studyChunkID: unit + " | " + identifier,
            morphologies: morphologiesList,
            endings: endingsList
          };

          // If the unit doesn't exist yet in the dictionary, create it
          if (!unitDict[unit]) {
            unitDict[unit] = [];
          }

          // Add the entry to the appropriate unit
          unitDict[unit].push(entry);
        });

        localStorage.setItem('study_chunks', JSON.stringify(unitDict));
        resolve(unitDict);
        // TODO (Caleb): any...
      }, error: (err : any) => {
        reject(err);
      },
    });
  });
};

export const loadRMACDescriptions = async (): Promise<Record<string, string[]>> => {
  console.log("Loading RMAC descriptions");
  const response = await fetch('/data/OpenGNT_DictRMAC_English.tsv');
  const tsvData = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(tsvData, {
      header: true,        // Treat the first row as headers (RMAC, Description)
      delimiter: "\t",     // Tab-separated values (TSV)
      complete: (results : RMACResults) => {
        // Map the parsed data into a dictionary
        const rmacDict: Record<string, string[]> = {};
        results.data.forEach(row => {
          if (row.RMAC) {
            rmacDict[row.RMAC] = row.Description;
          }
        });
        resolve(rmacDict);  // Resolve the dictionary as the final result
        // TODO (Caleb): any...
      }, error: (err: any) => {
        reject(err);  // Handle parsing errors
      },
    });
  });
}

// Implement parsing functions based on your data structure
const parseGreekWord = (greekBreakdown: string) => {
  if (!greekBreakdown) {
    return '';
  }
  greekBreakdown = greekBreakdown.toString();
  // has values like 〔βιβλοϲ｜Βιβλος｜Βίβλος｜βίβλος｜N-NSF｜G976〕
  // greek word is the third part of the definition
  greekBreakdown = greekBreakdown.slice(1, -1);
  const parts = greekBreakdown.split('｜');
  return parts[2];
};

const parseMorphology = (greekBreakdown: string) => {
  if (!greekBreakdown) {
    return '';
  }
  greekBreakdown = greekBreakdown.toString();
  // has values like 〔βιβλοϲ｜Βιβλος｜Βίβλος｜βίβλος｜N-NSF｜G976〕
  // morphology is the second to last part of the definition
  greekBreakdown = greekBreakdown.slice(1, -1);
  const parts = greekBreakdown.split('｜');
  return parts[parts.length - 2];
};

const parseStrongsNumber = (greekBreakdown: string) => {
  if (!greekBreakdown) {
    return '';
  }
  greekBreakdown = greekBreakdown.toString();
  // has values like 〔βιβλοϲ｜Βιβλος｜Βίβλος｜βίβλος｜N-NSF｜G976〕
  // strongs number is the last part of the definition
  greekBreakdown = greekBreakdown.slice(1, -1);
  const parts = greekBreakdown.split('｜');
  return parts[parts.length - 1];
};

const parseEnglishMeaning = (tbessg : string) => {
  if (!tbessg) {
    return '';
  }
  const tbessgValues = tbessg.slice(1, -1).split('｜');
  return [tbessgValues[0], tbessgValues[1]];
};

/*
 * From the OpenGNT value of "〔40｜1｜1〕", return an object with
 * the following fields:
 *  book number: int
 *  chapter number: int
 *  verse number: int
 *  word number: int
 */
const parseBookChapterVerseWord = (previousWordIdx : number, bookChapterVerse : string, previousBook: number, previousChapter: number, previousVerse: number) => {
  if (!bookChapterVerse || previousWordIdx === null || previousWordIdx === undefined) {
    return null;
  }
  // bookChapterVerse of the form〔40｜1｜1〕, we want the third one
  const bookChapterVerseArr = bookChapterVerse.slice(1, -1).split('｜');
  const book = parseInt(bookChapterVerseArr[0]);
  const chapter = parseInt(bookChapterVerseArr[1]);
  const verse = parseInt(bookChapterVerseArr[2]);
  if (!book || !chapter || !verse) {
    return null;
  }
  if (book !== previousBook
    || chapter !== previousChapter
    || verse !== previousVerse
  ) {
    return {
      book: book,
      chapter: chapter,
      verse: verse,
      word: 1
    }
  }
  return {
    book: book,
    chapter: chapter,
    verse: verse,
    word: previousWordIdx + 1
  }
}

/*
 * Given the studyChunks object
 */
const parseStudyChunkID = (studyChunks : StudyChunk[], greek : string, morphology : string) => {
  for (const [, studyChunksForTester] of Object.entries(studyChunks)) {
    if (studyChunksForTester) {
      // Check each study chunk under this unit
      // TODO (Caleb) (Paul-check) : potential error??? added [] around studyChunksForTester 
      for (const chunk of [studyChunksForTester]) {
        // TODO (Caleb): remove the casting! "as StudyCHunk"
        const {studyChunkID, morphologies, endings} = chunk as StudyChunk;

        // Check if the word's morphology is in the list of morphologies
        const morphologyMatches = morphologies.includes(morphology);

        if (!morphologyMatches) {
          continue;
        }

        // Check if the word's Greek ending matches any ending in the chunk
        const endingMatches = endings.some(ending => greekWordEndsWithEnding(greek, ending));

        // If both conditions are met, add the word's index to the set
        if (endingMatches) {
          return studyChunkID;
        }
      }
    }
  }
  // TODO (Caleb) (Paul-check): verify that this should never be possible. this used to return null.
  throw Error("could not get studyChunkID");
}

/*
 * Generate many possible endings and check if the greek words ends with any of them
 * Endings are a string that may contain vowels, and also may contain a special character !
 * which means that the following letter should not be in the ending
 * greekWordEndsWithEnding("κοινωνίαν", "![ιερ]αν") => false
 * greekWordEndsWithEnding("κοινωνίαν", "ιαν") => true
 * greekWordEndsWithEnding("Βίβλος", "![ιερ]α") => false
 * greekWordEndsWithEnding("Βίβλος", "ης") => false
 * greekWordEndsWithEnding("Βίβλος", "ος") => true
 * greekWordEndsWithEnding("ἡ", "ἡ") => true
 * greekWordEndsWithEnding("ἡ", "τῆς") => false
 * greekWordEndsWithEnding("τῆς", "ἡ") => false
 */
const greekWordEndsWithEnding = (greek : string, ending : string) => {
  const vowels_to_possibilities: Record<string, string[]> = {
    "α": ["ὰ", "ά", "ᾶ"],
    "ᾳ": ["ᾷ", "ᾲ", "ᾴ"],
    "ε": ["έ", "ὲ"],
    "ι": ["ί", "ὶ", "ϊ", "ῖ"],
    "ο": ["ό", "ὸ"],
    "υ": ["ῦ", "ὺ", "ύ", "ϋ"],
    "η": ["ὴ", "ή", "ῆ"],
    "ῃ": ["ῇ", "ῄ", "ῂ"],
    "ῳ": ["ῷ", "ῲ", "ῴ"],
    "ω": ["ῶ", "ὼ", "ώ"]
  }
  // Find the last vowel in the ending based on the keys in vowels_to_possibilities
  let vowelIndices = []

  const getCharPossilibities = (char: string) => {
    const charPossibilities = [];
    charPossibilities.push(char);
    if (vowels_to_possibilities[char]) {
      for (const vowelVariation of vowels_to_possibilities[char]) {
        charPossibilities.push(vowelVariation);
      }
    }
    return charPossibilities;
  }

  for (let i = ending.length - 1; i >= 0; i--) {
    if (vowels_to_possibilities[ending[i]]) {
      vowelIndices.push(i)
    }
  }

  // generate possible endings again with the ability to negate
  let includesNegation = false;
  let smartEnding : [boolean, Set<string>][] = [];
  for (let i = 0; i < ending.length; i++) {
    if (ending[i] === '!') {
      includesNegation = true;
      const nextChars = new Set<string>();
      for (let j = i+2; ending[j] !== "]"; j++) {
        getCharPossilibities(ending[j]).forEach(item => nextChars.add(item))
        ++i;
      }
      smartEnding.push([false, nextChars]);
      i = i + 2;
    } else {
      const currentChar = ending[i];
      const nextChars = new Set(getCharPossilibities(currentChar));
      smartEnding.push([true, nextChars]);
    }
  }

  // iterate backwards through smartEnding, and backwards through the greek.length
  if (greek.length < smartEnding.length) {
    return false;
  } else {
    for (let i = greek.length - 1; i > greek.length - 1 - smartEnding.length; --i) {
      const isPositiveMatch = smartEnding[i - greek.length + smartEnding.length][0];
      const charSet = smartEnding[i - greek.length + smartEnding.length][1];
      if (isPositiveMatch) {
        if (!charSet.has(greek[i])) {
          return false;
        }
      } else {
        if (charSet.has(greek[i])) {
          return false;
        }
      }
    }
  }
  return true;
}