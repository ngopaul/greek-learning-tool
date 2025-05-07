import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import Popup from './Popup';
import { useAtom } from 'jotai';
import { searchOpenAtom } from '../atoms/headerAtoms';
import FlexSearch from 'flexsearch';
import { useNavigation } from './useNavigation';
import { bibleBookToNumber } from '../utils/bibleUtils';

interface VerseDoc {
  id: string;
  book: number;
  chapter: number;
  verse: number;
  greek: string;
  root: string;
  contextEnglish: string;
  recoveryEnglish: string;
  reference: string;
  referenceAbbrev: string;
}

// invert book→number map
const numberToBook: Record<number, string> = Object.entries(bibleBookToNumber)
  .reduce((acc, [name, num]) => {
    acc[num] = name;
    return acc;
  }, {} as Record<number, string>);

const SearchPopup: React.FC = () => {
  const [open, setOpen]           = useAtom(searchOpenAtom);
  const [query, setQuery]         = useState('');
  const [results, setResults]     = useState<VerseDoc[]>([]);
  const [docs, setDocs]           = useState<Record<string, VerseDoc>>({});
  const [index, setIndex]         = useState<FlexSearch.Index | null>(null);

  const { navigateTo } = useNavigation();

  // ref for the text input
  const inputRef = useRef<HTMLInputElement>(null);

  // whenever the popup opens, focus & select all
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [open]);

  // Build index once
  useEffect(() => {
    fetch('/search-docs.json')
      .then(r => r.json())
      .then((docsArray: VerseDoc[]) => {
        const map: Record<string, VerseDoc> = {};
        const idx = new FlexSearch.Index({ tokenize: 'forward' });

        docsArray.forEach(doc => {
          map[doc.id] = doc;
          const ng = doc.greek
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          const nr = doc.root
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          const ce = doc.contextEnglish.toLowerCase();
          const re = doc.recoveryEnglish.toLowerCase();
          const rf = doc.reference.toLowerCase();
          const ra = doc.referenceAbbrev.toLowerCase();
          idx.add(doc.id, `${ng} ${nr} ${ce} ${re} ${rf} ${ra}`);
        });

        setDocs(map);
        setIndex(idx);
      });
  }, []);

  // Run search on query change
  useEffect(() => {
    const q = query.trim();
    if (!index || !q) {
      setResults([]);
      return;
    }
    const normalized = q
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const ids = index.search(normalized, {limit: 100}) as string[];

    const rawResults = ids.map(id => docs[id]).filter(Boolean);

    // if the user typed “3:16”, “1 Tim 3:16”, “John 2:4”, etc.…
    const verseMatch = query.match(/(\d? ?\w+)\.? (\d+):(\d+)/);
    if (verseMatch) {
      const qBook    = String(verseMatch[1]).toLowerCase();
      const qChapter = Number(verseMatch[2]);
      const qVerse   = Number(verseMatch[3]);

      const head: typeof rawResults = [];
      const tail: typeof rawResults = [];

      rawResults.forEach(doc => {
        // chapter matches, verse matches, and the lowercased book starts with the qBook
        const bookName = numberToBook[doc.book];
        if (doc.chapter === qChapter && doc.verse === qVerse && bookName.toLowerCase().startsWith(qBook)) {
          head.push(doc);
        } else {
          tail.push(doc);
        }
      });
      // return top 50 results
      setResults([...head, ...tail].slice(0, 50));
    } else {
      setResults(rawResults.slice(0, 50));
    }
  }, [query, index, docs]);

  return (
    <Popup open={open} onClose={() => setOpen(false)} title="Search Greek & English">
      <Box sx={{ maxHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Sticky search input */}
        <TextField
          autoFocus
          inputRef={inputRef}
          onFocus={(e) => e.target.select()}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (results.length > 0) {
                const doc = results[0];
                navigateTo(
                  { value: doc.book,    label: numberToBook[doc.book] },
                  { value: doc.chapter, label: String(doc.chapter) },
                  { value: doc.verse,   label: String(doc.verse) }
                );
                setOpen(false);
              }
            }
          }}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search Greek or English…"
          variant="outlined"
          fullWidth
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: 'background.paper',
            mb: 1
          }}
        />

        {/* Scrollable results */}
        <Box sx={{ overflowY: 'auto' }}>
          {results.length === 0 && query ? (
            <Typography sx={{ p: 2 }}>No matches found.</Typography>
          ) : (
            <List>
              {results.map(doc => {
                const bookName = numberToBook[doc.book] ?? doc.book.toString();
                return (
                  <ListItemButton
                    key={doc.id}
                    onClick={() => {
                      navigateTo(
                        { value: doc.book,    label: bookName },
                        { value: doc.chapter, label: String(doc.chapter) },
                        { value: doc.verse,   label: String(doc.verse) }
                      );
                      setOpen(false);
                    }}
                  >
                    <ListItemText
                      primary={`${bookName} ${doc.chapter}:${doc.verse}`}
                      secondary={doc.greek}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          )}
        </Box>
      </Box>
    </Popup>
  );
};

export default SearchPopup;