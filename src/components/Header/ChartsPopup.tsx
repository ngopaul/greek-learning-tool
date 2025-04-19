import React, { useContext } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Popup from '../Popup';
import { unitNameToTables } from '../../utils/ChapterTables';
import { AppContext } from '../../contexts/AppContext';
import { useAtom } from 'jotai';
import { displayWordsAtom } from '../../atoms/bibleDisplayAtoms';
import { chartsOpenAtom } from '../../atoms/headerAtoms';
import { useNavigation } from '../useNavigation';

const ChartsPopup: React.FC = () => {
  const [displayWords] = useAtom(displayWordsAtom);
  const [chartsOpen, setChartsOpen] = useAtom(chartsOpenAtom);
  const { currentIndex } = useNavigation();
  const context = useContext(AppContext);
  if (!context) return null;
  const { RMACDescriptions } = context;

  // Grab the current word (or undefined)
  const currentWord = displayWords[currentIndex];
  const isFinished =
    !currentWord ||
    currentWord.StudyChunkID === 'finished round of testing';

  return (
    <Popup
      open={chartsOpen}
      onClose={() => setChartsOpen(false)}
      title="Grammar Tables"
    >
      <Box p={2}>
        {isFinished ? (
          <Typography>No grammar tables available for this item.</Typography>
        ) : (() => {
          // Extract unit and table lookup
          const { StudyChunkID, Greek, Morphology } = currentWord!;

          if (!StudyChunkID) {
            return (
              <Typography>
                No grammar tables available for this item.
              </Typography>
            );
          }

          const unit = StudyChunkID.split(' | ')[0];
          const tables = unitNameToTables[unit];

          if (tables) {
            return (
              <>
                <Typography variant="h6" gutterBottom>
                  Grammar Tables for {Greek} – {RMACDescriptions[Morphology]}
                </Typography>
                <Box>{tables}</Box>
              </>
            );
          } else {
            return (
              <Typography>
                This word ({Greek} – {RMACDescriptions[Morphology]}) is not yet part of any textbook
                grammar chart, so there are no grammar tables to display.
              </Typography>
            );
          }
        })()}
      </Box>
    </Popup>
  );
};

export default ChartsPopup;