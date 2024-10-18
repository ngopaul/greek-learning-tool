import React, {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography, IconButton, Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SimpleTable = ({ data }) => {
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll((prev) => !prev); // Toggle between true and false
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: 'auto', mt: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" component="div" sx={{ p: 0, textAlign: 'center', mr: 1 }}>
          {data[0].title}
        </Typography>
        <IconButton onClick={handleToggleAll} aria-label="toggle-all">
          {toggleAll ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="none"><b>{data[1].col1}</b></TableCell>
            <TableCell padding="none"><b>{data[1].col2}</b></TableCell>
            <TableCell padding="none"><b>{data[1].col3}</b></TableCell>
            <TableCell padding="none"><b>{data[1].col4}</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(2).map((row, index) => (
            <TableRow key={index}>
              <TableCell padding="none"><b>{row.col1}</b></TableCell>
              <TogglingTableCell value={row.col2} alternateValue={"?"} toggleAll={toggleAll} ></TogglingTableCell>
              <TogglingTableCell value={row.col3} alternateValue={"?"} toggleAll={toggleAll} ></TogglingTableCell>
              <TogglingTableCell value={row.col4} alternateValue={"?"} toggleAll={toggleAll} ></TogglingTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Component for a TableCell that toggles between two values
const TogglingTableCell = ({ value, alternateValue, toggleAll }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  // Use an effect to set the state when toggleAll is true
  useEffect(() => {
    setIsToggled(toggleAll);
  }, [toggleAll]);

  return (
    <TableCell
      padding="none"
      onClick={handleClick}
      sx={{
        cursor: 'pointer', // Indicates the cell is clickable
      }}
    >
      {isToggled ? alternateValue : value}
    </TableCell>
  );
};

export default SimpleTable;
