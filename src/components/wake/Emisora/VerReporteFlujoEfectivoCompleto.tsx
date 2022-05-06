import React, { useState, useEffect } from 'react';

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

const rowsDataResultados = [
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
const rowsDataGenearal = [
    Data('Cash & Equivalents', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Short Term Investments', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Cash and Short Term Investments', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Accounts Receivable - Trade, Net', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Receivables, Net', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Inventory', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Prepaid Expenses', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Other Current Assets, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Current Assets', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Property/Plant/Equipment, Total - Net', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Goodwill, Net', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Intangibles, Net', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Long Term Investments', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Note Receivable - Long Term', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Other Long Term Assets, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Assets', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Accounts Payable', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Accrued Expenses', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Current Port. of LT Debt/Capital Leases', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Other Current liabilities, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Current Liabilities', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Long Term Debt', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Long Term Debt', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Debt', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Minority Interest', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Other Liabilities, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Liabilities', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Common Stock, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Retained Earnings (Accumulated Deficit)', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Treasury Stock - Common', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Other Equity, Total', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Equity', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Liabilities & Shareholders Equity', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Total Common Shares Outstanding', 653518, 949380, 597494, 415484, 864442, 718834),
    Data('Tangible Book Value per Share, Common Eq', 653518, 949380, 597494, 415484, 864442, 718834),
];
const rowsDataEfectivo = [
  Data('Net Income/Starting Line', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Depreciation/Depletion', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Non-Cash Items', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Changes in Working Capital', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Cash from Operating Activities', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Capital Expenditures', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Other Investing Cash Flow Items, Total', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Cash from Investing Activities', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Other Investing Cash Flow Items, Total', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Cash from Investing Activities', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Financing Cash Flow Items', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Total Cash Dividends Paid', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Issuance (Retirement) of Stock, Net', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Issuance (Retirement) of Debt, Net', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Cash from Financing Activities', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Foreign Exchange Effects', 653518, 949380, 597494, 415484, 864442, 718834),
  Data('Net Change in Cash', 653518, 949380, 597494, 415484, 864442, 718834),
];

const VerReporteFlujoEfectivoCompleto = ({ state }) => {
    const [open, setOpen] = useState(false)

    const [data, setData] = useState({
      title: "Ver Estado de Resultados Completo",
      data: rowsDataResultados
    })

    useEffect(()=>{
      if(state.resultados){
        setData({
          ...data,
          title: "Ver Estado de Resultados Completo",
          data: rowsDataResultados
        })
      }else if(state.general) {
        setData({
          ...data,
          title: "Ver Balance General Completo",
          data: rowsDataGenearal
        })
      }else if(state.efectivo){
        setData({
          ...data,
          title: "Ver Reporte de Flujo de Efectivo Completo",
          data: rowsDataEfectivo
        })
      }
    },[state])

  return (
    <section>
        <div className='w-full flex justify-between border-b border-gray-300 my-12'>
            <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>{data.title}</h2>
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
                  {data.data.map((row) => (
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