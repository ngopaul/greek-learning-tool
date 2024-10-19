/**
 * @file bible_utils.js
 * @description Functions for working with the Bible, verses, chapters, etc.
 */

import { BookChapterVerseWord, WordData } from "../types/AppContextTypes";
import { bookNameToChapterCounts } from "./constants";

export const bibleBookAbbreviations: Record<string, string>= {
  "gen": "Genesis",
  "ge": "Genesis",
  "gn": "Genesis",
  "genesis": "Genesis",
  "ex": "Exodus",
  "exod": "Exodus",
  "exo": "Exodus",
  "exodus": "Exodus",
  "lev": "Leviticus",
  "le": "Leviticus",
  "lv": "Leviticus",
  "leviticus": "Leviticus",
  "num": "Numbers",
  "nu": "Numbers",
  "nm": "Numbers",
  "nb": "Numbers",
  "numbers": "Numbers",
  "deut": "Deuteronomy",
  "de": "Deuteronomy",
  "dt": "Deuteronomy",
  "deuteronomy": "Deuteronomy",
  "josh": "Joshua",
  "jos": "Joshua",
  "jsh": "Joshua",
  "joshua": "Joshua",
  "judg": "Judges",
  "jdg": "Judges",
  "jg": "Judges",
  "jdgs": "Judges",
  "judges": "Judges",
  "ruth": "Ruth",
  "rth": "Ruth",
  "ru": "Ruth",
  "1 sam": "1 Samuel",
  "1 sm": "1 Samuel",
  "1 sa": "1 Samuel",
  "1 s": "1 Samuel",
  "1 samuel": "1 Samuel",
  "i sam": "1 Samuel",
  "i sa": "1 Samuel",
  "1sam": "1 Samuel",
  "1sa": "1 Samuel",
  "1s": "1 Samuel",
  "1st samuel": "1 Samuel",
  "1st sam": "1 Samuel",
  "first samuel": "1 Samuel",
  "first sam": "1 Samuel",
  "2 sam": "2 Samuel",
  "2 sm": "2 Samuel",
  "2 sa": "2 Samuel",
  "2 s": "2 Samuel",
  "2 samuel": "2 Samuel",
  "ii sam": "2 Samuel",
  "ii sa": "2 Samuel",
  "2sam": "2 Samuel",
  "2sa": "2 Samuel",
  "2s": "2 Samuel",
  "2nd samuel": "2 Samuel",
  "2nd sam": "2 Samuel",
  "second samuel": "2 Samuel",
  "second sam": "2 Samuel",
  "1 kings": "1 Kings",
  "1 kgs": "1 Kings",
  "1 ki": "1 Kings",
  "1kgs": "1 Kings",
  "1kin": "1 Kings",
  "1ki": "1 Kings",
  "1k": "1 Kings",
  "i kgs": "1 Kings",
  "i ki": "1 Kings",
  "1st kings": "1 Kings",
  "1st kgs": "1 Kings",
  "first kings": "1 Kings",
  "first kgs": "1 Kings",
  "2 kings": "2 Kings",
  "2 kgs": "2 Kings",
  "2 ki": "2 Kings",
  "2kgs": "2 Kings",
  "2kin": "2 Kings",
  "2ki": "2 Kings",
  "2k": "2 Kings",
  "ii kgs": "2 Kings",
  "ii ki": "2 Kings",
  "2nd kings": "2 Kings",
  "2nd kgs": "2 Kings",
  "second kings": "2 Kings",
  "second kgs": "2 Kings",
  "1 chron": "1 Chronicles",
  "1 chr": "1 Chronicles",
  "1 ch": "1 Chronicles",
  "1chron": "1 Chronicles",
  "1chr": "1 Chronicles",
  "1ch": "1 Chronicles",
  "1 chronicles": "1 Chronicles",
  "i chron": "1 Chronicles",
  "i chr": "1 Chronicles",
  "i ch": "1 Chronicles",
  "1st chronicles": "1 Chronicles",
  "1st chron": "1 Chronicles",
  "first chronicles": "1 Chronicles",
  "first chron": "1 Chronicles",
  "2 chron": "2 Chronicles",
  "2 chr": "2 Chronicles",
  "2 ch": "2 Chronicles",
  "2chron": "2 Chronicles",
  "2chr": "2 Chronicles",
  "2ch": "2 Chronicles",
  "2 chronicles": "2 Chronicles",
  "ii chron": "2 Chronicles",
  "ii chr": "2 Chronicles",
  "ii ch": "2 Chronicles",
  "2nd chronicles": "2 Chronicles",
  "2nd chron": "2 Chronicles",
  "second chronicles": "2 Chronicles",
  "second chron": "2 Chronicles",
  "ezra": "Ezra",
  "ezr": "Ezra",
  "ez": "Ezra",
  "neh": "Nehemiah",
  "ne": "Nehemiah",
  "nehemiah": "Nehemiah",
  "est": "Esther",
  "esth": "Esther",
  "es": "Esther",
  "esther": "Esther",
  "job": "Job",
  "jb": "Job",
  "ps": "Psalms",
  "psalm": "Psalms",
  "pslm": "Psalms",
  "psa": "Psalms",
  "psm": "Psalms",
  "pss": "Psalms",
  "psalms": "Psalms",
  "prov": "Proverbs",
  "pro": "Proverbs",
  "prv": "Proverbs",
  "pr": "Proverbs",
  "proverbs": "Proverbs",
  "eccles": "Ecclesiastes",
  "eccle": "Ecclesiastes",
  "ecc": "Ecclesiastes",
  "ec": "Ecclesiastes",
  "qoh": "Ecclesiastes",
  "ecclesiastes": "Ecclesiastes",
  "song": "Song of Solomon",
  "song of songs": "Song of Solomon",
  "sos": "Song of Solomon",
  "so": "Song of Solomon",
  "canticle of canticles": "Song of Solomon",
  "canticles": "Song of Solomon",
  "cant": "Song of Solomon",
  "song of solomon": "Song of Solomon",
  "s.s.": "Song of Solomon",
  "ss": "Song of Solomon",
  "s.o.s.": "Song of Solomon",
  "s. s.": "Song of Solomon",
  "s. o. s.": "Song of Solomon",
  "isa": "Isaiah",
  "is": "Isaiah",
  "isaiah": "Isaiah",
  "jer": "Jeremiah",
  "je": "Jeremiah",
  "jr": "Jeremiah",
  "jeremiah": "Jeremiah",
  "lam": "Lamentations",
  "la": "Lamentations",
  "lamentations": "Lamentations",
  "ezek": "Ezekiel",
  "eze": "Ezekiel",
  "ezk": "Ezekiel",
  "ezekiel": "Ezekiel",
  "dan": "Daniel",
  "da": "Daniel",
  "dn": "Daniel",
  "daniel": "Daniel",
  "hos": "Hosea",
  "ho": "Hosea",
  "hosea": "Hosea",
  "joel": "Joel",
  "jl": "Joel",
  "amos": "Amos",
  "am": "Amos",
  "obad": "Obadiah",
  "ob": "Obadiah",
  "obadiah": "Obadiah",
  "jonah": "Jonah",
  "jnh": "Jonah",
  "jon": "Jonah",
  "mic": "Micah",
  "mc": "Micah",
  "micah": "Micah",
  "nah": "Nahum",
  "na": "Nahum",
  "nahum": "Nahum",
  "hab": "Habakkuk",
  "hb": "Habakkuk",
  "habakkuk": "Habakkuk",
  "zeph": "Zephaniah",
  "zep": "Zephaniah",
  "zp": "Zephaniah",
  "zephaniah": "Zephaniah",
  "hag": "Haggai",
  "hg": "Haggai",
  "haggai": "Haggai",
  "zech": "Zechariah",
  "zec": "Zechariah",
  "zc": "Zechariah",
  "zechariah": "Zechariah",
  "mal": "Malachi",
  "ml": "Malachi",
  "malachi": "Malachi",
  "matt": "Matthew",
  "mt": "Matthew",
  "matthew": "Matthew",
  "mark": "Mark",
  "mrk": "Mark",
  "mar": "Mark",
  "mk": "Mark",
  "mr": "Mark",
  "luke": "Luke",
  "luk": "Luke",
  "lk": "Luke",
  "john": "John",
  "joh": "John",
  "jhn": "John",
  "jn": "John",
  "acts": "Acts",
  "act": "Acts",
  "ac": "Acts",
  "rom": "Romans",
  "ro": "Romans",
  "rm": "Romans",
  "romans": "Romans",
  "1 cor": "1 Corinthians",
  "1 co": "1 Corinthians",
  "i cor": "1 Corinthians",
  "i co": "1 Corinthians",
  "1 corinthians": "1 Corinthians",
  "1cor": "1 Corinthians",
  "1co": "1 Corinthians",
  "i corinthians": "1 Corinthians",
  "1corinthians": "1 Corinthians",
  "1st corinthians": "1 Corinthians",
  "first corinthians": "1 Corinthians",
  "2 cor": "2 Corinthians",
  "2 co": "2 Corinthians",
  "ii cor": "2 Corinthians",
  "ii co": "2 Corinthians",
  "2 corinthians": "2 Corinthians",
  "2cor": "2 Corinthians",
  "2co": "2 Corinthians",
  "ii corinthians": "2 Corinthians",
  "2corinthians": "2 Corinthians",
  "2nd corinthians": "2 Corinthians",
  "second corinthians": "2 Corinthians",
  "gal": "Galatians",
  "ga": "Galatians",
  "galatians": "Galatians",
  "eph": "Ephesians",
  "ephes": "Ephesians",
  "ephesians": "Ephesians",
  "phil": "Philippians",
  "php": "Philippians",
  "pp": "Philippians",
  "philippians": "Philippians",
  "col": "Colossians",
  "co": "Colossians",
  "colossians": "Colossians",
  "1 thess": "1 Thessalonians",
  "1 thes": "1 Thessalonians",
  "1 th": "1 Thessalonians",
  "1 thessalonians": "1 Thessalonians",
  "i thessalonians": "1 Thessalonians",
  "i thess": "1 Thessalonians",
  "i thes": "1 Thessalonians",
  "i th": "1 Thessalonians",
  "1thessalonians": "1 Thessalonians",
  "1thess": "1 Thessalonians",
  "1thes": "1 Thessalonians",
  "1th": "1 Thessalonians",
  "1st thessalonians": "1 Thessalonians",
  "1st thess": "1 Thessalonians",
  "first thessalonians": "1 Thessalonians",
  "first thess": "1 Thessalonians",
  "2 thess": "2 Thessalonians",
  "2 thes": "2 Thessalonians",
  "2 th": "2 Thessalonians",
  "2 thessalonians": "2 Thessalonians",
  "ii thessalonians": "2 Thessalonians",
  "ii thess": "2 Thessalonians",
  "ii thes": "2 Thessalonians",
  "ii th": "2 Thessalonians",
  "2thessalonians": "2 Thessalonians",
  "2thess": "2 Thessalonians",
  "2thes": "2 Thessalonians",
  "2th": "2 Thessalonians",
  "2nd thessalonians": "2 Thessalonians",
  "2nd thess": "2 Thessalonians",
  "second thessalonians": "2 Thessalonians",
  "second thess": "2 Thessalonians",
  "1 tim": "1 Timothy",
  "1 timothy": "1 Timothy",
  "1 ti": "1 Timothy",
  "i timothy": "1 Timothy",
  "i tim": "1 Timothy",
  "i ti": "1 Timothy",
  "1timothy": "1 Timothy",
  "1tim": "1 Timothy",
  "1ti": "1 Timothy",
  "1st timothy": "1 Timothy",
  "1st tim": "1 Timothy",
  "first timothy": "1 Timothy",
  "first tim": "1 Timothy",
  "2 tim": "2 Timothy",
  "2 timothy": "2 Timothy",
  "2 ti": "2 Timothy",
  "ii timothy": "2 Timothy",
  "ii tim": "2 Timothy",
  "ii ti": "2 Timothy",
  "2timothy": "2 Timothy",
  "2tim": "2 Timothy",
  "2ti": "2 Timothy",
  "2nd timothy": "2 Timothy",
  "2nd tim": "2 Timothy",
  "second timothy": "2 Timothy",
  "second tim": "2 Timothy",
  "titus": "Titus",
  "tit": "Titus",
  "ti": "Titus",
  "philem": "Philemon",
  "phm": "Philemon",
  "philemon": "Philemon",
  "pm": "Philemon",
  "heb": "Hebrews",
  "hebrews": "Hebrews",
  "james": "James",
  "jas": "James",
  "jm": "James",
  "1 pet": "1 Peter",
  "1 pe": "1 Peter",
  "1 pt": "1 Peter",
  "1 p": "1 Peter",
  "i pet": "1 Peter",
  "1 peter": "1 Peter",
  "i pt": "1 Peter",
  "i pe": "1 Peter",
  "1peter": "1 Peter",
  "1pet": "1 Peter",
  "1pe": "1 Peter",
  "1pt": "1 Peter",
  "1p": "1 Peter",
  "i peter": "1 Peter",
  "1st peter": "1 Peter",
  "first peter": "1 Peter",
  "2 pet": "2 Peter",
  "2 pe": "2 Peter",
  "2 pt": "2 Peter",
  "2 p": "2 Peter",
  "ii peter": "2 Peter",
  "ii pet": "2 Peter",
  "ii pt": "2 Peter",
  "ii pe": "2 Peter",
  "2peter": "2 Peter",
  "2pet": "2 Peter",
  "2pe": "2 Peter",
  "2pt": "2 Peter",
  "2p": "2 Peter",
  "2nd peter": "2 Peter",
  "second peter": "2 Peter",
  "2 peter": "2 Peter",
  "1 john": "1 John",
  "1 jhn": "1 John",
  "1 jn": "1 John",
  "1 j": "1 John",
  "1john": "1 John",
  "1jhn": "1 John",
  "1joh": "1 John",
  "1jn": "1 John",
  "1jo": "1 John",
  "1j": "1 John",
  "i john": "1 John",
  "i jhn": "1 John",
  "i joh": "1 John",
  "i jn": "1 John",
  "i jo": "1 John",
  "1st john": "1 John",
  "first john": "1 John",
  "2 john": "2 John",
  "2 jhn": "2 John",
  "2 jn": "2 John",
  "2 j": "2 John",
  "2john": "2 John",
  "2jhn": "2 John",
  "2joh": "2 John",
  "2jn": "2 John",
  "2jo": "2 John",
  "2j": "2 John",
  "ii john": "2 John",
  "ii jhn": "2 John",
  "ii joh": "2 John",
  "ii jn": "2 John",
  "ii jo": "2 John",
  "2nd john": "2 John",
  "second john": "2 John",
  "3 john": "3 John",
  "3 jhn": "3 John",
  "3 jn": "3 John",
  "3 j": "3 John",
  "3john": "3 John",
  "3jhn": "3 John",
  "3joh": "3 John",
  "3jn": "3 John",
  "3jo": "3 John",
  "3j": "3 John",
  "iii john": "3 John",
  "iii jhn": "3 John",
  "iii joh": "3 John",
  "iii jn": "3 John",
  "iii jo": "3 John",
  "3rd john": "3 John",
  "third john": "3 John",
  "jude": "Jude",
  "jud": "Jude",
  "jd": "Jude",
  "rev": "Revelation",
  "re": "Revelation",
  "revelation": "Revelation",
  "the revelation": "Revelation"
}

const bibleBookToNumber : Record<string, number> = {
  "Genesis": 1,
  "Exodus": 2,
  "Leviticus": 3,
  "Numbers": 4,
  "Deuteronomy": 5,
  "Joshua": 6,
  "Judges": 7,
  "Ruth": 8,
  "1 Samuel": 9,
  "2 Samuel": 10,
  "1 Kings": 11,
  "2 Kings": 12,
  "1 Chronicles": 13,
  "2 Chronicles": 14,
  "Ezra": 15,
  "Nehemiah": 16,
  "Esther": 17,
  "Job": 18,
  "Psalms": 19,
  "Proverbs": 20,
  "Ecclesiastes": 21,
  "Song of Solomon": 22,
  "Isaiah": 23,
  "Jeremiah": 24,
  "Lamentations": 25,
  "Ezekiel": 26,
  "Daniel": 27,
  "Hosea": 28,
  "Joel": 29,
  "Amos": 30,
  "Obadiah": 31,
  "Jonah": 32,
  "Micah": 33,
  "Nahum": 34,
  "Habakkuk": 35,
  "Zephaniah": 36,
  "Haggai": 37,
  "Zechariah": 38,
  "Malachi": 39,
  "Matthew": 40,
  "Mark": 41,
  "Luke": 42,
  "John": 43,
  "Acts": 44,
  "Romans": 45,
  "1 Corinthians": 46,
  "2 Corinthians": 47,
  "Galatians": 48,
  "Ephesians": 49,
  "Philippians": 50,
  "Colossians": 51,
  "1 Thessalonians": 52,
  "2 Thessalonians": 53,
  "1 Timothy": 54,
  "2 Timothy": 55,
  "Titus": 56,
  "Philemon": 57,
  "Hebrews": 58,
  "James": 59,
  "1 Peter": 60,
  "2 Peter": 61,
  "1 John": 62,
  "2 John": 63,
  "3 John": 64,
  "Jude": 65,
  "Revelation": 66
};

export const bibleNumberToBook = Object.fromEntries(Array.from(Object.entries(bibleBookToNumber), ([book, number]) => [number, book]));

export const bibleBookNameToChapterCounts: Record<string, number> = {
  "genesis": 50,
  "exodus": 40,
  "leviticus": 27,
  "numbers": 36,
  "deuteronomy": 34,
  "joshua": 24,
  "judges": 21,
  "ruth": 4,
  "1 samuel": 31,
  "2 samuel": 24,
  "1 kings": 22,
  "2 kings": 25,
  "1 chronicles": 29,
  "2 chronicles": 36,
  "ezra": 10,
  "nehemiah": 13,
  "esther": 10,
  "job": 42,
  "psalms": 150,
  "proverbs": 31,
  "ecclesiastes": 12,
  "song of songs": 8,
  "isaiah": 66,
  "jeremiah": 52,
  "lamentations": 5,
  "ezekiel": 48,
  "daniel": 12,
  "hosea": 14,
  "joel": 3,
  "amos": 9,
  "obadiah": 1,
  "jonah": 4,
  "micah": 7,
  "nahum": 3,
  "habakkuk": 3,
  "zephaniah": 3,
  "haggai": 2,
  "zechariah": 14,
  "malachi": 4,
  "matthew": 28,
  "mark": 16,
  "luke": 24,
  "john": 21,
  "acts": 28,
  "romans": 16,
  "1 corinthians": 16,
  "2 corinthians": 13,
  "galatians": 6,
  "ephesians": 6,
  "philippians": 4,
  "colossians": 4,
  "1 thessalonians": 5,
  "2 thessalonians": 3,
  "1 timothy": 6,
  "2 timothy": 4,
  "titus": 3,
  "philemon": 1,
  "hebrews": 13,
  "james": 5,
  "1 peter": 5,
  "2 peter": 3,
  "1 john": 5,
  "2 john": 1,
  "3 john": 1,
  "jude": 1,
  "revelation": 22,
};

export const bibleBookVerseCounts: Record<string, number[]> = {
  "1 chronicles": [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29,
    43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30],
  "1 corinthians": [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58,
    24],
  "1 john": [10, 29, 24, 21, 21],
  "1 kings": [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34,
    24, 46, 21, 43, 29, 53],
  "1 peter": [25, 25, 22, 19, 14],
  "1 samuel": [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23,
    58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13],
  "1 thessalonians": [10, 20, 13, 18, 28],
  "1 timothy": [20, 15, 16, 16, 25, 21],
  "2 chronicles": [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19,
    14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33,
    27, 23],
  "2 corinthians": [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14],
  "2 john": [13],
  "2 kings": [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20,
    41, 37, 37, 21, 26, 20, 37, 20, 30],
  "2 peter": [21, 22, 18],
  "2 samuel": [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23,
    29, 33, 43, 26, 22, 51, 39, 25],
  "2 thessalonians": [12, 17, 18],
  "2 timothy": [18, 26, 17, 22],
  "3 john": [14],
  "acts": [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34,
    28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31],
  "amos": [15, 16, 15, 13, 27, 14, 17, 14, 15],
  "colossians": [29, 23, 25, 18],
  "daniel": [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13],
  "deuteronomy": [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23,
    22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12],
  "ecclesiastes": [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14],
  "ephesians": [23, 22, 21, 32, 33, 24],
  "esther": [22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
  "exodus": [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36,
    16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35,
    38, 29, 31, 43, 38],
  "ezekiel": [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63,
    24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15,
    38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35],
  "ezra": [11, 70, 13, 24, 17, 22, 28, 36, 15, 44],
  "galatians": [24, 21, 29, 31, 26, 18],
  "genesis": [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16,
    27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29,
    43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26],
  "habakkuk": [17, 20, 19],
  "haggai": [15, 23],
  "hebrews": [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25],
  "hosea": [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9],
  "isaiah": [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14,
    7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38,
    22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12,
    21, 14, 21, 22, 11, 12, 19, 12, 25, 24],
  "james": [27, 26, 18, 17, 20],
  "jeremiah": [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21,
    27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19,
    32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34],
  "job": [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16,
    21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33,
    24, 41, 30, 24, 34, 17],
  "joel": [20, 32, 21],
  "john": [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26,
    40, 42, 31, 25],
  "jonah": [17, 10, 10, 11],
  "joshua": [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10,
    18, 28, 51, 9, 45, 34, 16, 33],
  "jude": [25],
  "judges": [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31,
    13, 31, 30, 48, 25],
  "lamentations": [22, 22, 66, 22, 22],
  "leviticus": [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34,
    16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34],
  "luke": [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37,
    43, 48, 47, 38, 71, 56, 53],
  "malachi": [14, 17, 18, 6],
  "mark": [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20],
  "matthew": [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28,
    27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20],
  "micah": [16, 13, 12, 13, 15, 16, 20],
  "nahum": [15, 13, 19],
  "nehemiah": [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31],
  "numbers": [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50,
    13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34,
    13],
  "obadiah": [21],
  "philemon": [25],
  "philippians": [30, 30, 21, 23],
  "proverbs": [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33,
    28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31],
  "psalms": [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14,
    9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13,
    17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17,
    12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13,
    19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9,
    5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176,
    7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7,
    12, 15, 21, 10, 20, 14, 9, 6],
  "revelation": [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 18, 18, 20, 8, 21,
    18, 24, 21, 15, 27, 21],
  "romans": [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27],
  "ruth": [22, 23, 18, 22],
  "song of songs": [17, 17, 11, 16, 16, 13, 13, 14],
  "titus": [16, 15, 15],
  "zechariah": [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
  "zephaniah": [18, 15, 20],
};

/**
 * Capitalize the first letter of a Bible book name. Handles books with numbers in their names.
 * @param book {string}
 * @returns {string}
 */
export function capitalizeBook(book : string) {
  if (book.charAt(0).match(/[0-9]/)) {
    // if the first character is a number, captialize the third character
    return (
      book.charAt(0) +
      book.charAt(1) +
      book.charAt(2).toUpperCase() +
      book.slice(3)
    );
  } else {
    // otherwise, capitalize the first character
    return book.charAt(0).toUpperCase() + book.slice(1);
  }
}

/**
 * Get a list of strings (verses) from a book and chapter.
 * Stored on the server in bible/{book name}/{chapter number}.txt
 * @param book {string}
 * @param chapter {number}
 * @returns {string[]}
 */
export function getListOfVerses(book: string, chapter: number) {
  // read from bible/{book name}/{chapter number}.txt
  let verses: string[] = [];
  let request = new XMLHttpRequest();
  request.open("GET", `bible/${book}/${chapter}.txt`, false);
  request.send(null);
  if (request.status === 200) {
    let text = request.responseText;
    verses = text.split("\n");
  }
  return verses;
}

/**
 * Get a list of reading portions from a list of books.
 * A reading portion is a list of two elements representing the start and end of the portion:
 * Each element is a [book, chapter], so a reading portion of a single book would be a list representing
 * the first and last chapters of a book.
 * @param books {string[]}
 * @returns {[string, number][][]}
 * @example
 * getReadingPortionsFromBooks(["Genesis", "Exodus"])
 * // returns [[["Genesis", 1], ["Genesis", 50]], [["Exodus", 1], ["Exodus", 40]]]
 */
export function getReadingPortionsFromBooks(books: string[]) {
  let reading_portions = [];
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let book_reading_portion = [
      [book, 1],
      [book, bookNameToChapterCounts[book]],
    ];
    reading_portions.push(book_reading_portion);
  }
  return reading_portions;
}

/**
 * Standardize a book name into a standard book name.
 * @param book {string} a book name, could be anything and with or without a . at the end
 * @returns {string} a standard book name
 */
export function standardizeBookName(book: string) {
  book = book.toLowerCase();
  let book_without_period = book;
  if (book.charAt(book.length - 1) === ".") {
    book_without_period = book.slice(0, -1);
  }
  return bibleBookAbbreviations[book_without_period] || bibleBookAbbreviations[book] || null;
}

/*
 * Parses a string of verse references into an array of verse strings.
 *
 * Parameters:
 * - input: The string of verse references to parse. Can contain multiple
 *          references separated by semicolons. References can be in the format:
 *          "John 3:16" or "3:16" (will use last specified book)
 *          Example: "John 4:4-6, 8; 5:1; 2 John 3; Jude 1:4; Gen. 2:4"
 * Returns:
 * - An array of verse strings in the format "<book> <chapter>:<verse>"
*/
// TODO (Caleb): I dont think this is being used rn.
export function parseVerseReferences(input : string) : [string, [number, number, number]][] {
  // no bible verse is more than 176
  input = input.replace(/\d+/g, match => {
    return parseInt(match) > 176 ? "176" : match;
  });
  const originalSegments = input.split(';');
  let enhancedSegments : string[] = [];
  let lastBook = "";  // To store the last used book name

  // Preprocess segments to ensure each has a book name
  originalSegments.forEach(segment => {
    segment = segment.trim();
    if (!segment) {
      return;
    }
    const bookMatch = segment.match(/(?:[1-3]\s)?([A-Za-z]+\.? ?){2,}/);
    if (bookMatch) {
      const bookName = bookMatch[0].trim();
      // replace the book in the segment with a standardized book name
      const standardBookName = standardizeBookName(bookName);
      // if the book is not a book in the Bible, don't add it
      if (standardBookName === null) {
        return;
      }
      segment = segment.replace(bookName, standardBookName);
      lastBook = standardBookName;
    } else if (lastBook) {
      segment = lastBook + " " + segment;
    }
    enhancedSegments.push(segment);
  });

  // console.log(enhancedSegments);

  let parsedVerses : [string, [number, number, number]][] = [];

  // Process each segment
  enhancedSegments.forEach(segment => {
    const bookMatch = segment.match(/(?:[1-3]\s)?[A-Za-z]{2,}\.?/);
    const bookName = bookMatch ? bookMatch[0].trim() : "";
    const lowercasedBookName = bookName.toLowerCase();

    // Remove the book name from the segment
    let verseSegment = bookMatch ? segment.replace(bookMatch[0], '').trim() : segment;

    // Handle books with one chapter, where no verseSegment is needed to add the whole chapter
    if (bibleBookNameToChapterCounts[lowercasedBookName] === 1 && !verseSegment) {
      verseSegment = "1:1-" + bibleBookVerseCounts[lowercasedBookName][0].toString();
    }

    const verseMatches = verseSegment.match(/(\d+:)?\d+(-\d+)?/g) || [];
    let lastChapter = "";  // To store the last used chapter number

    verseMatches.forEach(verseMatch => {
      let [chapterPart, versesPart] = verseMatch.includes(':') ? verseMatch.split(':') : ["", verseMatch];
      // if there is no chapterPart, then use the last chapter if it is not null
      if (!chapterPart && lastChapter) {
        chapterPart = lastChapter;
      } else if (!chapterPart && !lastChapter && bibleBookVerseCounts[lowercasedBookName].length === 1) {
        // if there is no chapterPart and no last chapter, then use the first chapter if the books
        // are the one-chapter books
        chapterPart = "1"
      } else if (!chapterPart && !lastChapter) {
        // if there is no chapterPart and no last chapter, then use the whole chapter(s)
        chapterPart = versesPart;
        if (chapterPart.includes('-')) {
          // Handle chapter ranges, where you add all verses from all the chapters in the range
          const [startChapter, endChapter] = chapterPart.split('-').map(Number);
          for (let i = startChapter; i <= endChapter; i++) {
            // if the chapter is out of bounds, then skip
            if (bibleBookVerseCounts[lowercasedBookName].length < i) {
              continue;
            }
            versesPart = "1-" + bibleBookVerseCounts[lowercasedBookName][i - 1].toString();
            const [startVerse, endVerse] = versesPart.split('-').map(Number);
            for (let j = startVerse; j <= endVerse; j++) {
              parsedVerses.push([`${bookName} ${i}:${j}`,
                [bibleBookToNumber[bookName], i, j]]);
            }
          }
          return;
        }
        // otherwise, the chapterPart is correct and has no dash, use all the verses in the chapter
        versesPart = "1-" + bibleBookVerseCounts[lowercasedBookName][parseInt(chapterPart) - 1].toString();
      }
      lastChapter = chapterPart;  // Update lastChapter for the next iteration
      // if the chapter is not in the book, skip this reference
      if (chapterPart && bibleBookVerseCounts[lowercasedBookName].length < parseInt(chapterPart)) {
        return;
      }
      if (versesPart.includes('-')) {
        // Handle verse ranges like "4-6"
        const [startVerse, endVerse] = versesPart.split('-').map(Number);
        for (let i = startVerse; i <= endVerse; i++) {
          // if the verse is out of the size of the chapter, then skip the rest
          if (bibleBookVerseCounts[lowercasedBookName][parseInt(chapterPart) - 1] < i) {
            break;
          }
          parsedVerses.push([`${bookName} ${chapterPart}:${i}`,
            [bibleBookToNumber[bookName], parseInt(chapterPart), i]]);
        }
      } else if (bibleBookVerseCounts[lowercasedBookName][parseInt(chapterPart) - 1] >= parseInt(versesPart)) {
        // Handle standalone verses
        parsedVerses.push([`${bookName} ${chapterPart}:${versesPart}`,
          [bibleBookToNumber[bookName], parseInt(chapterPart), parseInt(versesPart)]]);
      }
    });
  });

  // ensure there are no repeats
  parsedVerses = [...new Set(parsedVerses)];

  return parsedVerses;
}


export const getGreekVerse = (targetBookChapterVerseWord: BookChapterVerseWord, openGNTData : WordData[]) => {
  // const currentWord = displayWords[currentIndex];
  const { book, chapter, verse } = targetBookChapterVerseWord;
  const wordsInChapter = openGNTData.filter(word =>
    word.BookChapterVerseWord.book === book &&
    word.BookChapterVerseWord.chapter === chapter &&
    word.BookChapterVerseWord.verse === verse
  );
  return wordsInChapter.map(wordData => wordData.Greek).join(" ");
}
