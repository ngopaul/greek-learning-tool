import Papa from 'papaparse';
import { createHash } from 'crypto-browserify';
import Dexie from 'dexie';

// Initialize Dexie database
const db = new Dexie('OpenGNTDataDB');
db.version(1).stores({
  words: '++id, BookChapterVerseWord, Greek, Morphology, English, StudyChunkID', // Define schema
});

// Function to save data to IndexedDB
const saveToIndexedDB = async (data) => {
  await db.words.clear(); // Clear old data
  await db.words.bulkAdd(data); // Add new data
};

// Function to load data from IndexedDB
const loadFromIndexedDB = async () => {
  return await db.words.toArray(); // Retrieve all stored data
};

/* Function to parse OpenGNT_keyedFeatures.csv
 * Returns a very large list of objects. Each object has the following fields:
 *  Greek: the greek
 *  Morphology: the morphology code (e.g. V-PAI-1S)
 *  English: the english meaning of the word
 *  BookChapterVerseWord: returns that object (with those fields, all of them being integers)
 */
export const loadOpenGNTData = async (studyChunks, sameHash, setLoadProgress) => {
  // if sameHash is true, then load the data from IndexedDB
  if (sameHash) {
    const storedData = await loadFromIndexedDB();
    if (storedData && storedData.length > 0) {
      console.log("Loading OpenGNT data from IndexedDB");
      setLoadProgress(100);
      return storedData;
    }
  }
  console.log("Loading OpenGNT data from server");
  // otherwise, load the data from the server
  const response = await fetch('/data/OpenGNT_keyedFeatures.csv');
  const csvData = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true, complete: async (results) => {
        // Map the necessary fields
        const totalWords = results.data.length;
        let processedWords = 0;
        let sizeBeforeUpdate = totalWords / 100;
        let currentSizeBeforeUpdate = 0;
        const mappedData = [];

        // Instead of using map, loop asynchronously to allow state updates
        for (let item of results.data) {
          const tantt = item["〔TANTT〕"];
          const tbessg = item["〔TBESG｜IT｜LT｜ST｜Español〕"];
          const ognSort = item["〔OGNTsort｜TANTTsort｜OpenTextWord_KEY〕"];
          if (tantt && tbessg && ognSort) {
            // Parse fields as per your CSV structure
            const greek = parseGreekWord(tantt);
            const morphology = parseMorphology(tantt);
            const english = parseEnglishMeaning(tbessg);
            const bookChapterVerseWord = parseBookChapterVerseWord(ognSort);
            const studyChunkID = parseStudyChunkID(studyChunks, greek, morphology);

            mappedData.push({
              BookChapterVerseWord: bookChapterVerseWord,
              Greek: greek,
              Morphology: morphology,
              English: english,
              StudyChunkID: studyChunkID,
            });

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
        resolve(mappedData);
      }, error: (err) => {
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

export const loadStudyChunks = async () => {
  // Get the hash of /data/study_chunks.csv
  const response = await fetch('/data/study_chunks.csv');
  const csvData = await response.text();
  const hash = createHash('sha256').update(csvData).digest('hex');
  // compare hash to hash in localStorage
  const hashIsInLocalStorage = localStorage.getItem('study_chunks_hash') === hash;
  if (hashIsInLocalStorage) {
    console.log("Loading study_chunks.csv from localStorage");
    return [hashIsInLocalStorage, JSON.parse(localStorage.getItem('study_chunks'))];
  }
  console.log("Loading study_chunks.csv from system");
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true, complete: (results) => {
        const data = results.data;
        const unitDict = {};

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
          const entry = {
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

        resolve([hashIsInLocalStorage, unitDict]);
        // Store the hash in localStorage
        localStorage.setItem('study_chunks_hash', hash);
        localStorage.setItem('study_chunks', JSON.stringify(unitDict));
      }, error: (err) => {
        reject(err);
      },
    });
  });
};

export const loadRMACDescriptions = async () => {
  const response = await fetch('/data/OpenGNT_DictRMAC_English.tsv');
  const tsvData = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(tsvData, {
      header: true,        // Treat the first row as headers (RMAC, Description)
      delimiter: "\t",     // Tab-separated values (TSV)
      complete: (results) => {
        // Map the parsed data into a dictionary
        const rmacDict = {};
        results.data.forEach(row => {
          if (row.RMAC) {
            rmacDict[row.RMAC] = row.Description;
          }
        });
        resolve(rmacDict);  // Resolve the dictionary as the final result
      }, error: (err) => {
        reject(err);  // Handle parsing errors
      },
    });
  });
}

// Implement parsing functions based on your data structure
const parseGreekWord = (tantt) => {
  if (!tantt) {
    return '';
  }
  tantt = tantt.toString();
  // TANNT has values like 〔IMNW=Χριστοῦ=G5547=N-GSM-T; BRSTH=χριστοῦ=G5547=N-GSM-T;〕
  // greek word is the second part of the definition
  tantt = tantt.slice(1, -1);
  const definitions = tantt.split(';');
  const definition_parts = definitions[0].split('=');
  return definition_parts[1];
};

const parseMorphology = (tantt) => {
  if (!tantt) {
    return '';
  }
  tantt = tantt.toString();
  // TANNT has values like 〔IMNW=Χριστοῦ=G5547=N-GSM-T; BRSTH=χριστοῦ=G5547=N-GSM-T;〕
  // morphology is the last part of the definition
  tantt = tantt.slice(1, -1);
  const definitions = tantt.split(';');
  const definition_parts = definitions[0].split('=');
  return definition_parts[definition_parts.length - 1];
};

const parseEnglishMeaning = (tbessg) => {
  if (!tbessg) {
    return '';
  }
  const match = tbessg.match(/〔.*?｜(.*?)｜.*?〕/);
  return match ? match[1] : '';
};

/*
 * From the OpenGNT value of "〔OGNTsort｜TANTTsort｜OpenTextWord_KEY〕", return an object with
 * the following fields:
 *  book number: int
 *  chapter number: int
 *  verse number: int
 *  word number: int
 */
const parseBookChapterVerseWord = (sortKeys) => {
  if (!sortKeys) {
    return '';
  }
  // data of the form〔000001｜000001｜40.1.1.w1〕, we want the third one
  sortKeys = sortKeys.toString();
  sortKeys = sortKeys.slice(1, -1);
  const splitKeys = sortKeys.split('｜');
  const openTextWordKey = splitKeys[splitKeys.length - 1];
  const bookChapterVerseWord = openTextWordKey.split('.');
  const book = bookChapterVerseWord[0];
  const chapter = bookChapterVerseWord[1];
  const verse = bookChapterVerseWord[2];
  let word = bookChapterVerseWord[3];
  if (!word) {
    return null;
  }
  word = word.toString();
  return {
    book: parseInt(book),
    chapter: parseInt(chapter),
    verse: parseInt(verse),
    word: parseInt(word.slice(1, word.length))
  }
}

/*
 * Given the studyChunks object
 */
const parseStudyChunkID = (studyChunks, greek, morphology) => {
  for (const [, studyChunksForTester] of Object.entries(studyChunks)) {
    if (studyChunksForTester) {
      // Check each study chunk under this unit
      for (const chunk of studyChunksForTester) {
        const {studyChunkID, morphologies, endings} = chunk;

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

  return null;
}

/*
 * Generate many possible endings and check if the greek words ends with any of them
 * Endings are a string that may contain vowels, and also may contain a special character !
 * which means that the following letter should not be in the ending
 * greekWordEndsWithEnding("κοινωνίαν", "![ιερ]αν") => false
 * greekWordEndsWithEnding("κοινωνίαν", "ιαν") => true
 */
const greekWordEndsWithEnding = (greek, ending) => {
  const vowels_to_possibilities = {
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

  for (let i = ending.length - 1; i >= 0; i--) {
    if (vowels_to_possibilities[ending[i]]) {
      vowelIndices.push(i)
    }
  }

  // Initialize possible endings with the original ending
  let possibleEndings = [ending];

  // If there is a vowel in the ending (lastVowelIndex is not -1)
  for (let vowelIndex of vowelIndices) {
    let possibilities = vowels_to_possibilities[ending[vowelIndex]];

    // Generate multiple endings by replacing the last vowel with each possibility
    possibilities.forEach(vowel => {
      let newEnding = ending.substring(0, vowelIndex) + vowel + ending.substring(vowelIndex + 1);
      possibleEndings.push(newEnding);
    });
  }

  // generate possible endings again with the ability to negate
  let includesNegation = false;
  let smartEndings = [];
  for (let pei = 0; pei < possibleEndings.length; ++pei) {
    let possibleEnding = possibleEndings[pei];
    smartEndings.push([]);
    for (let i = 0; i < possibleEnding.length; i++) {
      if (possibleEnding[i] === '!') {
        includesNegation = true;
        const nextChars = [];
        for (let j = i+2; possibleEnding[j] !== "]"; j++) {
          nextChars.push(possibleEnding[j]);
          ++i;
        }
        smartEndings[pei].push([false, nextChars]);
        i = i + 2;
      } else {
        const currentChar = possibleEnding[i];
        smartEndings[pei].push([true, currentChar]);
      }
    }
  }

  let failedNegationCheck = false;
  for (let smartEnding of smartEndings) {
    if (greek.length >= smartEnding.length) {
      let endingCorrect = true;
      for (let i = greek.length - 1; i > greek.length - 1 - smartEnding.length; --i) {
        const isPositiveMatch = smartEnding[i - greek.length + smartEnding.length][0];
        const charToMatch = smartEnding[i - greek.length + smartEnding.length][1];
        if (isPositiveMatch) {
          if (greek[i] !== charToMatch) {
            endingCorrect = false;
            break;
          }
        } else {
          if (charToMatch.includes(greek[i])) {
            failedNegationCheck = true;
            endingCorrect = false;
            break;
          }
        }
      }
      if (endingCorrect && !includesNegation) {
        return true;
      }
    }
  }
  if (includesNegation && failedNegationCheck) {
    return false;
  } else if (includesNegation && !failedNegationCheck) {
    return true;
  }
  // does not include a negation and did not find a match
  return false;
}