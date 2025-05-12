import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
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

  const { RMACDescriptions, selectedTesters } = context;

  const currentWord = displayWords[currentIndex];
  const isFinished =
    !currentWord ||
    currentWord.StudyChunkID === 'finished round of testing';

  let fallbackHTML = (
    <>
      <Typography variant="body1" gutterBottom>
        No grammar tables available for this item.
      </Typography>
    </>
  );

  if (selectedTesters.length >= 1) {
    const fallbackUnit = selectedTesters[0].value;
    const fallbackTables = unitNameToTables[fallbackUnit];

    fallbackHTML = fallbackTables ? (
      <>
        <Typography variant="body1" gutterBottom>
          Showing the grammar table for the first selected unit (
          {fallbackUnit}):
        </Typography>
       <Box>{fallbackTables}</Box>
      </>
    ) : (
      <Typography>No grammar tables available for this item.</Typography>
    );
  }

  
  return (
    <Popup
      open={chartsOpen}
      onClose={() => setChartsOpen(false)}
      title="Grammar Tables"
    >
      <Box p={2}>
        {isFinished ? (
          fallbackHTML
        ) : (() => {
          const { StudyChunkID, Greek, Morphology } = currentWord!;
          if (!Greek) {
            return fallbackHTML;
          } else if (!StudyChunkID) {
            return (
              <>
                <Typography variant="h6" gutterBottom>
                  No Grammar Tables for {Greek} – {RMACDescriptions[Morphology]}
                </Typography>
                <Box>{fallbackHTML}</Box>
              </>
            )
          }

          const wordUnit = StudyChunkID.split(' | ')[0];
          const wordTables = unitNameToTables[wordUnit];

          // 1) If there are direct tables for this word's unit, show them
          if (wordTables) {
            return (
              <>
                <Typography variant="h6" gutterBottom>
                  Grammar Tables for {Greek} – {RMACDescriptions[Morphology]}
                </Typography>
                <Box>{wordTables}</Box>
              </>
            );
          }

          // 2) Otherwise, if exactly one unit is selected, show that unit's tables if they exist
          return (
            <>
              <Typography variant="h6" gutterBottom>
                No Grammar Tables for {Greek} – {RMACDescriptions[Morphology]}
              </Typography>
              <Box>{fallbackHTML}</Box>
            </>
          );

        })()}
      </Box>
    </Popup>
  );
};

export default ChartsPopup;