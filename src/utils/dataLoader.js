import Papa from 'papaparse';

// Function to parse OpenGNT_keyedFeatures.csv
export const loadOpenGNTData = async () => {
  const response = await fetch('/data/OpenGNT_keyedFeatures.csv');
  const csvData = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        // Map the necessary fields
        const mappedData = results.data.map((item) => {
          // console.log(item);
          // Parse fields as per your CSV structure
          return {
            Greek: parseGreekWord(item["〔TANTT〕"]), // Implement parseGreekWord
            Morphology: parseMorphology(item["〔TANTT〕"]), // Implement parseMorphology
            English: parseEnglishMeaning(item["〔TBESG｜IT｜LT｜ST｜Español〕"]), // Implement parseEnglishMeaning
            // Add other fields if necessary
          };
        });
        resolve(mappedData);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

// Function to parse study_chunks.csv
export const loadStudyChunks = async () => {
  const response = await fetch('/data/study_chunks.csv');
  const csvData = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};

// Implement parsing functions based on your data structure
const parseGreekWord = (tantt) => {
  if (!tantt) {
    return '';
  }
  tantt = tantt.toString();
  // TANNT has values like 〔IMNW=Χριστοῦ=G5547=N-GSM-T; BRSTH=χριστοῦ=G5547=N-GSM-T;〕
  // greek word is the second part of the definition
  tantt =  tantt.slice(1, -1);
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
  // Example parsing logic
  const match = tbessg.match(/〔.*?｜(.*?)｜.*?〕/);
  return match ? match[1] : '';
};