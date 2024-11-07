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

export type SimpleTableData = [
  { title: string; numColumns: number },
  string[], // Header row
  ...string[][] // Body rows
];

export type SimpleTableProps = {
  data: SimpleTableData
}

const SimpleTable = ({ data } : SimpleTableProps) => {
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll((prev) => !prev); // Toggle between true and false
  };

  const [meta, headers, ...rows] = data;
  
  const headerCells = headers.map((cell, index) => (
    <TableCell padding="none" key={`header-${index}`}>
      <b>{cell}</b>
    </TableCell>
  ));

  const dummyArray = Array(meta.numColumns).fill(null);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: 'auto', mt: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" component="div" sx={{ p: 0, textAlign: 'center', mr: 1 }}>
          {meta.title}
        </Typography>
        <IconButton onClick={handleToggleAll} aria-label="toggle-all">
          {toggleAll ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>{headerCells}</TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              <TableCell padding="none">
                <b>{row[0]}</b>
              </TableCell>
              {dummyArray.map((_, colIndex) =>
                row[colIndex + 1] ? (
                  <TogglingTableCell
                    value={row[colIndex + 1]}
                    alternateValue="?"
                    toggleAll={toggleAll}
                    key={`cell-${colIndex}`}
                  />
                ) : (
                  <TableCell padding="none" key={`cell-${colIndex}`}></TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Component for a TableCell that toggles between two values
const TogglingTableCell = ({ value, alternateValue, toggleAll } : {value: string; alternateValue: string; toggleAll: boolean}) => {
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
    // TODO (Caleb): verify why?
    // @ts-ignore
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
