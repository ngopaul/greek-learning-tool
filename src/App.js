import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WordDisplay from './components/WordDisplay';
import MorphologyBanner from './components/MorphologyBanner';
import {Container, CircularProgress, Typography} from '@mui/material';
import { loadOpenGNTData, loadStudyChunks } from './utils/dataLoader';

function App() {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [selectedTesters, setSelectedTesters] = useState([]);
  const [openGNTData, setOpenGNTData] = useState([]);
  const [studyChunks, setStudyChunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayWords, setDisplayWords] = useState([]);
  const [testWordIndices, setTestWordIndices] = useState(new Set());
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gntData, chunks] = await Promise.all([loadOpenGNTData(), loadStudyChunks()]);
        setOpenGNTData(gntData);
        setStudyChunks(chunks);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBookSelect = (selected) => {
    if (selected && selected.value) {
      setCurrentBook(selected);
    } else {
      setCurrentBook(null);
    }
    setCurrentChapter(null);
    setSelectedTesters([]);
    setCurrentIndex(0);
    setDisplayWords([]);
    setTestWordIndices(new Set());
    setShowAnswer(false);
  }

  const handleChapterSelect = (selected) => {
    if (selected) {
      setCurrentChapter(selected);
      const temporaryCurrentChapter = selected;
      const filteredData = openGNTData.filter((item) => {
        if (!item) {
          return false;
        }
        const sortKey = item["〔OGNTsort｜TANTTsort｜OpenTextWord_KEY〕"];
        if (!sortKey) {
          return false;
        }
        // Extract chapter info from 'OpenTextWord_KEY'
        // Example Key: "〔40.1.1.w1〕" where 40 = Matthew
        const keyMatch = sortKey.match(/(\d+)\.(\d+)\.(\d+)\.w\d+/);
        if (keyMatch) {
          const bookNumber = keyMatch[1];
          const chapterNumber = keyMatch[2];
          return (
            bookNumber === currentBook.value && chapterNumber === temporaryCurrentChapter.value
          );
        }
        return false;
      });
      setCurrentChapter(
        {
          bookName: currentBook.label,
          bookValue: currentBook.value,
          chapterName: temporaryCurrentChapter.label,
          chapterValue: temporaryCurrentChapter.value,
          data: filteredData
        });
    } else {
      setCurrentChapter(null);
    }
  };

  const handleTesterSelect = (selected) => {
    setSelectedTesters(selected);
    // TODO: Update tester settings
  };

  // Handle Keyboard Navigation and Space Key for Toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(prev + 1, displayWords.length - 1));
        if (testWordIndices.has(currentIndex)) {
          setShowAnswer(false);
        } else {
          setShowAnswer(true);
        }
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
        if (testWordIndices.has(currentIndex)) {
          setShowAnswer(false);
        } else {
          setShowAnswer(true);
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        if (testWordIndices.has(currentIndex)) {
          setShowAnswer((prev) => !prev);
        } else {
          setShowAnswer(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayWords.length]);

  useEffect(() => {
    if (currentChapter && currentChapter.data) {
      setDisplayWords(currentChapter.data);
      setCurrentIndex(0);
      determineTestWords(currentChapter.data);
    }
  }, [currentChapter, selectedTesters]);

  // Function to determine which words to test
  const determineTestWords = (words) => {
    if (selectedTesters.length === 0) {
      setTestWordIndices(new Set());
      return;
    }

    const testerMorphologies = selectedTesters.flatMap((tester) => {
      const chunk = studyChunks.find((c) => c.name === tester.value);
      return chunk ? chunk.morphologies.split(' | ') : [];
    });

    const testerEndings = selectedTesters.flatMap((tester) => {
      const chunk = studyChunks.find((c) => c.name === tester.value);
      return chunk ? chunk.endings.split(' | ') : [];
    });

    const testIndices = new Set();

    words.forEach((word, index) => {
      // Check if word matches at least one morphology and one ending
      const matchesMorphology = testerMorphologies.some((morph) => word.Morphology.includes(morph));
      const matchesEnding = testerEndings.some((ending) => word.Greek.endsWith(ending));
      if (matchesMorphology && matchesEnding) {
        testIndices.add(index);
      }
    });

    setTestWordIndices(testIndices);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: '20%' }}>
        <CircularProgress />
        <Typography variant="h6">Loading Data...</Typography>
      </Container>
    );
  }

  return (
    <div>
      <Header onBookSelect={handleBookSelect} onChapterSelect={handleChapterSelect} onTesterSelect={handleTesterSelect} />
      <Container>
        <WordDisplay
          currentChapter={currentChapter}
          displayWords={displayWords}
          currentIndex={currentIndex}
          showAnswer={showAnswer}
        />
        <MorphologyBanner
          currentChapter={currentChapter}
          currentIndex={currentIndex}
          displayWords={displayWords}
          testWordIndices={testWordIndices}
          showAnswer={showAnswer}
        />
      </Container>
    </div>
  );
}

export default App;
