// scripts/buildSearchIndex.ts
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { bibleBookToNumber, bibleBookAbbreviations } from '../src/utils/bibleUtils';

interface VerseAccumulator {
  book: number;
  chapter: number;
  verse: number;
  greekWords: string[];
  roots: string[];
  contextEnglishWords: string[];
  recoveryEnglish: string;
}

interface VerseDoc {
  id: string;
  book: number;
  chapter: number;
  verse: number;
  greek: string;
  root: string;
  contextEnglish: string;
  recoveryEnglish: string;
  reference: string;        // e.g. "Ephesians 4:16"
  referenceAbbrev: string;  // e.g. "Eph 4:16"
}

// strip Greek diacritics
function normalizeGreek(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// invert book→number map
const numberToBook = Object.entries(bibleBookToNumber)
  .reduce<Record<number,string>>((acc,[name,num]) => {
    acc[num] = name;
    return acc;
  }, {});

// load OGNT CSV
const csv = fs.readFileSync(path.resolve(__dirname,'../public/data/OpenGNT_version3_3.csv'),'utf8');
const { data: rows } = Papa.parse<Record<string,string>>(csv, { header: true });

const verseMap = new Map<string,VerseAccumulator>();

for (const row of rows) {
  const gb = row['〔OGNTk｜OGNTu｜OGNTa｜lexeme｜rmac｜sn〕'];
  const tb = row['〔TBESG｜IT｜LT｜ST｜Español〕'];
  const bc = row['〔Book｜Chapter｜Verse〕'];
  if (!gb || !tb || !bc) continue;

  const parts = gb.slice(1,-1).split('｜');
  const lexeme = parts[3];
  const rmac   = parts[parts.length-2];
  const ctxEng = tb.slice(1,-1).split('｜')[0];

  const [b,c,v] = bc.slice(1,-1).split('｜').map(Number);
  if (!b||!c||!v) continue;
  const id = `${b}|${c}|${v}`;

  if (!verseMap.has(id)) {
    // read the full recovery verse from public/bible
    let recovery = '';
    try {
      const bookName = numberToBook[b].toLowerCase();
      const chapterFile = path.resolve(__dirname, `../public/data/bible/${bookName}/${c}.txt`);
      const lines = fs.readFileSync(chapterFile, 'utf8').split('\n');
      recovery = lines[v - 1] || '';
    } catch {
      recovery = '';
    }

    verseMap.set(id, {
      book: b,
      chapter: c,
      verse: v,
      greekWords: [],
      roots: [],
      contextEnglishWords: [],
      recoveryEnglish: recovery
    });
  }

  const acc = verseMap.get(id)!;
  acc.greekWords.push( normalizeGreek(lexeme) );
  acc.roots.push( normalizeGreek(rmac) );
  acc.contextEnglishWords.push(ctxEng);
}

// now flatten
const docs: VerseDoc[] = Array.from(verseMap.entries()).map(([id, acc]) => {
  const fullName = numberToBook[acc.book];                        // "Ephesians"
  const abbrKey  = fullName.toLowerCase();                        // "ephesians"
  const abbr     = bibleBookAbbreviations[abbrKey] || fullName;   // "Eph"

  return {
    id,
    book:           acc.book,
    chapter:        acc.chapter,
    verse:          acc.verse,
    greek:          acc.greekWords.join(' '),
    root:           acc.roots.join(' '),
    contextEnglish: acc.contextEnglishWords.join(' '),
    recoveryEnglish:acc.recoveryEnglish,
    reference:      `${fullName} ${acc.chapter}:${acc.verse}`,
    referenceAbbrev:`${abbr} ${acc.chapter}:${acc.verse}`,
  };
});

// write out
fs.writeFileSync(
  path.resolve(__dirname,'../public/search-docs.json'),
  JSON.stringify(docs,null,2),
  'utf8'
);

console.log(`Built search-docs.json with ${docs.length} verses.`);