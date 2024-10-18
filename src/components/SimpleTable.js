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

  const numberOfColumns = data[0].numColumns;
  const header = [];
  for (let i = 0; i < numberOfColumns; i++) {
    header.push(
      <TableCell padding="none" key={"header-" + i}><b>{data[1][i]}</b></TableCell>
    );
  }
  const dummyArray = Array(numberOfColumns).fill(null);

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
            {header}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(2).map((row, row_index) => (
            <TableRow key={"row"+row_index}>
              <TableCell padding="none"><b>{row[0]}</b></TableCell>
              {
                dummyArray.map((_, col_index) => (
                  row[col_index + 1] ? (
                    <TogglingTableCell value={row[col_index + 1]} alternateValue={"?"} toggleAll={toggleAll} key={"cell-" + col_index}/>
                  ) : (
                    <TableCell padding="none" key={"cell-" + col_index}></TableCell>
                  )

                ))
              }
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
      px={1}
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
