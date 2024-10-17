import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

type TableTitleType = {
  title: string
}
type TableRowType = {
  col1: string,
  col2: string,
  col3: string,
  col4: string,
}

export type TableDataType = [TableTitleType, ...Array<TableRowType>];

const SimpleTable = ({ data }: {data: TableDataType}) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: 'auto', mt: 1 }}>
      {/** TODO (Caleb): investigate this: removed variant="h8" from below because it was causing typescript errors.*/}
      <Typography component="div" sx={{ p: 0, textAlign: 'center' }}>
        {data[0].title}
      </Typography>
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
          {// TODO (Caleb): fix the any...
          data.slice(2).map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell padding="none"><b>{row.col1}</b></TableCell>
              <TableCell padding="none">{row.col2}</TableCell>
              <TableCell padding="none">{row.col3}</TableCell>
              <TableCell padding="none">{row.col4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
