import { BookChapterVerseWord } from "./AppContextTypes";

export interface GNTDataEntry {
    Greek: string;
    Morphology: string;
    English: string;
    BookChapterVerseWord: BookChapterVerseWord;
  }
  
export interface MappedDataEntry {
    BookChapterVerseWord: BookChapterVerseWord;
    Greek: string;
    Morphology: string;
    English: string;
    Meaning: string;
    StudyChunkID: string;
    StrongsNumber: string;
}
  


export interface StudyChunk {
    identifier: string;
    studyChunkID: string;
    morphologies: string[];
    endings: string[];
  }
  
  export  interface StudyChunkRaw {
    unit: string;
    name: string;
    morphologies:string;
    endings:string;
  }
  
  export interface StudyChunkCSVResult {
    data: StudyChunkRaw[]
  }
  
  export interface RMACEntryRaw {
    RMAC: string;
    Description: string[]
  }
  
  export interface RMACResults {
    data: RMACEntryRaw[]
  }