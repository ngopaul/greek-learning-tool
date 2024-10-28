import { BookChapterVerseWord } from "./AppContextTypes";

export interface GNTDataEntry {
    Greek: string;
    Morphology: string;
    English: string;
    BookChapterVerseWord: BookChapterVerseWord;
  }

/**
 * Represents a mapping of a morphology ID (string) to its corresponding Greek word and count.
 */
export type MorphologyRecord = Record<string, {greek: string, count: number}>;
  
export interface MappedDataEntry {
    BookChapterVerseWord: BookChapterVerseWord;
    Greek: string;
    Morphology: string;
    English: string;
    Meaning: string;
    StudyChunkID?: string;
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