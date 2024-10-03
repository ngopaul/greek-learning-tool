import Papa from 'papaparse';

/* Function to parse OpenGNT_keyedFeatures.csv
 * Returns a very large list of objects. Each object has the following fields:
 *  Greek: the greek
 *  Morphology: the morphology code (e.g. V-PAI-1S)
 *  English: the english meaning of the word
 *  BookChapterVerseWord: returns that object (with those fields, all of them being integers)
 */
export const loadOpenGNTData = async (studyChunks) => {
  const response = await fetch('/data/OpenGNT_keyedFeatures.csv');
  const csvData = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true, complete: (results) => {
        // Map the necessary fields
        const mappedData = results.data.filter((item) => {
          return (item["〔TANTT〕"] && item["〔TBESG｜IT｜LT｜ST｜Español〕"] && item["〔OGNTsort｜TANTTsort｜OpenTextWord_KEY〕"])
        }).map((item) => {
          // Parse fields as per your CSV structure
          const greek = parseGreekWord(item["〔TANTT〕"]);
          const morphology = parseMorphology(item["〔TANTT〕"]);
          const english = parseEnglishMeaning(item["〔TBESG｜IT｜LT｜ST｜Español〕"]);
          const bookChapterVerseWord = parseBookChapterVerseWord(item["〔OGNTsort｜TANTTsort｜OpenTextWord_KEY〕"]);
          const studyChunkID = parseStudyChunkID(studyChunks, greek, morphology);
          return {
            Greek: greek,
            Morphology: morphology,
            English: english,
            BookChapterVerseWord: bookChapterVerseWord,
            StudyChunkID: studyChunkID
          };
        });
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
  const response = await fetch('/data/study_chunks.csv');
  const csvData = await response.text();

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

        resolve(unitDict);
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
  let studyChunkIDtoReturn = null;

  for (const [unitName, studyChunksForTester] of Object.entries(studyChunks)) {
    if (studyChunksForTester) {
      // Check each study chunk under this unit
      studyChunksForTester.forEach(chunk => {
        const {studyChunkID, morphologies, endings} = chunk;

        // Check if the word's morphology is in the list of morphologies
        const morphologyMatches = morphologies.includes(morphology);

        // Check if the word's Greek ending matches any ending in the chunk
        const endingMatches = endings.some(ending => greek.endsWith(ending));

        // If both conditions are met, add the word's index to the set
        if (morphologyMatches && endingMatches) {
          studyChunkIDtoReturn = studyChunkID;
        }
      });
    }
  }

  return studyChunkIDtoReturn;
}