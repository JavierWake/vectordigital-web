import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ChartIndicadoresAnalisisFundamental from './ChartIndicadoresAnalisisFundamental';
import VerReporteFlujoEfectivoCompleto from './VerReporteFlujoEfectivoCompleto';
import GraficaRendimientoHistoricoAnual from './GraficaRendimientoHistoricoAnual';


// Tabla de Resultados
function resultadosData(
  name: string,
  CARG5Y: string,
  pROYECCION: string,
  A2022: string,
  A2021: string,
  A2020: string,
  A2019: string,
  A2018: string,
  A2017: string,
) {
  return { name, CARG5Y, pROYECCION, A2022, A2021, A2020, A2019, A2018, A2017 };
}

const rowsData = [
    resultadosData('Ventas Netas Totales', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'),
    resultadosData('Crecimeinto en Ventas Netas Totales', '', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%'),
    resultadosData('Utilidad Bruta', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'),
    resultadosData('Utilidad de Operación', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'),
    resultadosData('UFAIDA', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'),
    resultadosData('Crecimeinto en UAFIDA', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%'),
    resultadosData('Resultado Neto', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'),
    resultadosData('Crecimeinto en Resultado Neto', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%'),
];

function TableResultados() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="right"><span className='font-semibold'>CARG 5Y</span> </TableCell>
            <TableCell align="right"><span className='font-semibold'>Proyección Final de Año</span></TableCell>
            <TableCell align="right"><span className='font-semibold'>2022</span></TableCell>
            <TableCell align="right"><span className='font-semibold'>2021</span></TableCell>
            <TableCell align="right"><span className='font-semibold'>2020</span></TableCell>
            <TableCell align="right"><span className='font-semibold'>2019</span></TableCell>
            <TableCell align="right"><span className='font-semibold'>2018</span></TableCell>
            <TableCell align="right"><span className='font-semibold'>2017</span></TableCell>
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
              <TableCell align="right">{row.CARG5Y}</TableCell>
              <TableCell align="right">{row.pROYECCION}</TableCell>
              <TableCell align="right">{row.A2022}</TableCell>
              <TableCell align="right">{row.A2021}</TableCell>
              <TableCell align="right">{row.A2020}</TableCell>
              <TableCell align="right">{row.A2019}</TableCell>
              <TableCell align="right">{row.A2018}</TableCell>
              <TableCell align="right">{row.A2017}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Tabla de Balance
function balanceData(
    name: string,
    A2021: string,
    A2020: string,
    A2019: string,
    A2018: string,
    A2017: string,
  ) {
    return { name, A2021, A2020, A2019, A2018, A2017 };
  }
  
  const rowsBalance= [
    balanceData('Activos Totales', 'XX', 'XX', 'XX', 'XX', 'XX'),
    balanceData('Pasivos Totales', 'XX%', 'XX%', 'XX%', 'XX%', 'XX%'),
    balanceData('Capital Contable ', 'XX', 'XX', 'XX', 'XX', 'XX'),
  ];
  
  function TableBalance() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell align="right"><span className='font-semibold'>2021</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2020</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2019</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2018</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2017</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsBalance.map((row) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

// Tabla de Efectivo
function efectivoData(
    name: string,
    A2021: string,
    A2020: string,
    A2019: string,
    A2018: string,
    A2017: string,
  ) {
    return { name, A2021, A2020, A2019, A2018, A2017 };
  }
  
  const rowsEfectivo= [
    efectivoData('Flujos netos de efectivo por actividades de operación', 'XX', 'XX', 'XX', 'XX', 'XX'),
    efectivoData('Flujos netos de efectivo por actividades de inversión', 'XX', 'XX', 'XX', 'XX', 'XX'),
    efectivoData('Flujos netos de efectivo por actividades de financiamiento', 'XX', 'XX', 'XX', 'XX', 'XX'),
    efectivoData('Incremento o disminución neta de efectivo', 'XX', 'XX', 'XX', 'XX', 'XX'),
  ];
  
  function TableEfectivo() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell align="right"><span className='font-semibold'>2021</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2020</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2019</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2018</span></TableCell>
              <TableCell align="right"><span className='font-semibold'>2017</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsEfectivo.map((row) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }



const IndicadoresAnalisisFundamental = ( ) =>{
    const [state, setState] = useState({
        resultados: true,
        general: false,
        efectivo: false,
    })

    const onResultados = ( ) => {
        setState({
            ...state,
            resultados: true,
            general: false,
            efectivo: false,
        })
    }
    const onGeneral = ( ) => {
        setState({
            ...state,
            resultados: false,
            general: true,
            efectivo: false,
        })
    }
    const onEfectivo = ( ) => {
        setState({
            ...state,
            resultados: false,
            general: false,
            efectivo: true,
        })
    }

    const GraficaAnalisisFundamental = () =>{
        if(state.resultados){
            return(
            <section>
                <div className='mb-9'>
                    <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>Estado de Resultados</h2>
                    <div className='inline-block'>
                        <button 
                            className="bg-gray-50 p-1 text-sm text-gray-150 border-1 border-gray-50 mb-4 px-4 rounded-l"
                        >
                            Anual
                        </button>
                        <button 
                            className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 mb-4 px-3 rounded-r"
                        >
                            Trimestral
                        </button>
                    </div>

                    <div className='flex text-sm font-normal'>
                        <ChartIndicadoresAnalisisFundamental
                            resultados={state.resultados} 
                            general={state.general} 
                            efectivo={state.efectivo}
                        />
                        <div className=' pt-6 px-8 pb-10 w-96 h-full border border-gray-200 rounded'>
                            <p className='text-gray-150 pb-1.5 px-0.5 mb-7'>Últimos 12 meses</p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Margen bruto</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Margen de Operación</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Margen EBITDA</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b mb-7'>
                                <span>Margen Neto</span>
                                <span>xx%</span>
                            </p>
                        </div>
                    </div>
                </div>
                <TableResultados/>
            </section>
            )
        }
        else if( state.general ){
            return(
                <section >
                <div className='mb-9'>
                    <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>Del Balance</h2>
                    <div className='inline-block'>
                        <button 
                            className="bg-gray-50 p-1 text-sm text-gray-150 border-1 border-gray-50 mb-4 px-4 rounded-l"
                        >
                            Anual
                        </button>
                        <button 
                            className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 mb-4 px-3 rounded-r"
                        >
                            Trimestral
                        </button>
                    </div>

                    <div className='flex text-sm font-normal'>
                        <ChartIndicadoresAnalisisFundamental
                            resultados={state.resultados} 
                            general={state.general} 
                            efectivo={state.efectivo}
                        />
                        <div className=' pt-6 px-8 pb-10 w-96 h-full border border-gray-200 rounded'>
                            <p className='text-gray-150 pb-1.5 px-0.5 mb-7'>Últimos 12 meses/Último trimestre</p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Prueba ácida</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Pasivos Totales / Activos totales</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Deuda a Largo Plazo a Capital</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Deuda Total a Capital</span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Deuda Neta </span>
                                <span>xx%</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b mb-7'>
                                <span>UFAIDA/Pago de Intereses de Deuda </span>
                                <span>xx%</span>
                            </p>
                        </div>
                    </div>
                </div>
                <TableBalance/>
                </section>
            )
        }
        else{
            return(
            <section>
                <div className='mb-9'>
                    <h2 className='font-semibold text-xl mb-7 inline-block mr-11'>Flujo de Efectivo </h2>
                    <div className='inline-block'>
                        <button 
                            className="bg-gray-50 p-1 text-sm text-gray-150 border-1 border-gray-50 mb-4 px-4 rounded-l"
                        >
                            Anual
                        </button>
                        <button 
                            className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 mb-4 px-3 rounded-r"
                        >
                            Trimestral
                        </button>
                    </div>

                    <div className='flex text-sm font-normal'>
                        <ChartIndicadoresAnalisisFundamental
                            resultados={state.resultados} 
                            general={state.general} 
                            efectivo={state.efectivo}
                        />
                        <div className=' pt-6 px-8 pb-10 w-96 h-full border border-gray-200 rounded'>
                            <p className='text-gray-150 pb-1.5 px-0.5 mb-7'>Últimos 12 meses</p>
                            <p className='flex justify-between pb-1.5 px-0.5 border-b border-gray-300 mb-7'>
                                <span>Flujo de Caja por Acción</span>
                                <span>$2,345</span>
                            </p>
                            <p className='flex justify-between pb-1.5 px-0.5  mb-7'>
                                <span>Flujo de efectivo operativo / Ventas</span>
                                <span>45%</span>
                            </p>

                        </div>
                    </div>
                </div>
                <TableEfectivo/>
            </section>
            )
        }
    }


// -----------------------
    return (
        <React.Fragment>
            <section className='w-full'>
                <h2 className='font-semibold text-xl'>Rendimiento Histórico Anual (cambio en precios)</h2>
                <div className='w-full h-80'>
                    <GraficaRendimientoHistoricoAnual/>
                </div>
            </section>
            <section className='w-full'>
                <h2 className='font-semibold text-xl mb-7'>Indicadores de Análisis Fundamental</h2>
                <div className='flex justify-evenly w-full mb-14 text-sm'>
                    <div className='flex flex-col justify-between text-center h-full'>
                        <p className='font-medium mb-10'>
                            <span className='border-b border-gray-400'>Val. Empresa</span> <br/> UAFIDA
                        </p>
                        <p className='font-medium'>0.0</p>
                    </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Utilidad
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>9.9</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>24.4</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Ventas
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>6.3</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>2.6</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-10'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Val. Contable
                    </p>
                    <p className='font-medium'>11.6</p>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        <span className='border-b border-gray-400 px-4'>Precio</span> <br/> Flujo de Caja
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>7.9</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>0.0</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        Utilidad por <br /> acción
                    </p>
                    <div>
                        <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                        <p className='font-medium'>13.1</p>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-2'>
                        Dividendos por <br/> acción
                    </p>
                    <div className='flex gap-4'>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>UDM</p>
                            <p className='font-medium'>6.3</p>
                        </div>
                        <div>
                            <p className='text-gray-150 text-xs mb-3.5'>Estimado</p>
                            <p className='font-medium'>2.6</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-10'>
                        Val.contable <br/> por acción
                    </p>
                    <p className='font-medium'>2.9</p>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-16'>
                        ROE
                    </p>
                    <p className='font-medium'>0.0</p>
                </div>
                <div className='flex flex-col justify-between text-center h-full'>
                    <p className='font-medium mb-16'>
                        ROA
                    </p>
                    <p className='font-medium'>6.3</p>
                </div>
                </div>

                <div className='text-sm border-b border-gray-400 mb-7'>
                    <button 
                        className={`px-4 ${state.resultados && "text-red-600 border-b-4 border-red-600"}`}
                        onClick={ onResultados }
                    >
                        Estado de Resultados
                    </button>
                    <button 
                        className={`px-4 ${state.general && "text-red-600 border-b-4 border-red-600"}`}
                        onClick={ onGeneral }
                    >
                        Balance General
                    </button>
                    <button 
                        className={`px-4 ${state.efectivo && "text-red-600 border-b-4 border-red-600"}`}
                        onClick={ onEfectivo }
                    >
                        Flujo de Efectivo
                    </button>
                </div>

            <GraficaAnalisisFundamental/>

            <VerReporteFlujoEfectivoCompleto 
                state={state}
            />
            </section>
        </React.Fragment>
    );
}
 
export default IndicadoresAnalisisFundamental