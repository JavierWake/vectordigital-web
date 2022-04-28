import React, { useState } from 'react';

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Data(
  name: string,
  A2021: number,
  A2020: number,
  A2019: number,
  A2018: number,
  A2017: number,
  A2016: number,
) {
  return { name, A2021, A2020, A2019, A2018, A2017, A2016 };
}

const rowsData = [
    Data('Revenue', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Revenue', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Cost of RevenueTotal', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Gross Profit', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Selling/General/Admin. Expenses, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Research & Development', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Interest Exp.(Inc.),Net-Operating, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Unusual Expense (Income)', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Other Operating Expenses, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Operating Expense', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Operating Income', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Net Income Before Taxes', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Provision for Income Taxes', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Net Income After Taxes', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Net Income Before Extra. Items', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Net Income', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Adjustments to Net Income', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Income Available to Com Excl ExtraOrd', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Income Available to Com Incl ExtraOrd', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Diluted Net Income', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Diluted Weighted Average Shares', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Diluted EPS Excluding ExtraOrd Items', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('DPS - Common Stock Primary Issue', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Diluted Normalized EPS', 653518, 949380, 597494, 415484, 864442, 718834),
];

const VerReporteFlujoEfectivoCompleto = () => {
    const [open, setOpen] = useState(false)
  return (
    <section>
        <div className='w-full flex justify-between border-b border-gray-300 mb-7'>
            <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>Ver Estado de Resultados Completo </h2>
            <button
                onClick={()=> setOpen( !open )}
            >
                {open 
                    ? (<BsChevronUp/>)
                    : (<BsChevronDown/>)
                }
            </button>
        </div>
        {open && (
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><span className='font-semibold'>Fiscal Period</span></TableCell>
                    <TableCell align="right"><span className='font-semibold'>2021</span></TableCell>
                    <TableCell align="right"><span className='font-semibold'>2020</span></TableCell>
                    <TableCell align="right"><span className='font-semibold'>2019</span></TableCell>
                    <TableCell align="right"><span className='font-semibold'>2018</span></TableCell>
                    <TableCell align="right"><span className='font-semibold'>2017</span></TableCell>
                    <TableCell align="right"><span className='font-semibold'>2016</span></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsData.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.A2021}</TableCell>
                      <TableCell align="right">{row.A2020}</TableCell>
                      <TableCell align="right">{row.A2019}</TableCell>
                      <TableCell align="right">{row.A2018}</TableCell>
                      <TableCell align="right">{row.A2017}</TableCell>
                      <TableCell align="right">{row.A2016}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}
    </section>
  );
}

export default VerReporteFlujoEfectivoCompleto