import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Typography, Box} from '@mui/material';
import {AppContext} from "../contexts/AppContext";
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
  value: number
}

function LinearProgressWithLabel(props: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const StudyProgress = () => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const { readingMode, currentIndex, displayWords } = context;

  if (readingMode === 'chapter') {
    return null;
  }

  return (
    <Box sx={{ width: 'inherit' }}>
      <LinearProgressWithLabel value={Math.min(100, Math.max(0, currentIndex/(displayWords.length - 1) * 100))}/>
    </Box>
  );
}

export default StudyProgress;
