import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { PortfolioStatus } from '../types/PortfolioTypes';
import { Tooltip } from '@material-ui/core';
import '../styles/styles.css';

import type {
  SimpleTableDataTypes,
  SimpleTableHeading,
} from '../types/SimpleTable';

export interface SimpleTableProps {
  color: 'red' | 'blue';
  tabsData: SimpleTableDataTypes | any;
  extend: boolean;
  key: number;
  portfolio?: PortfolioStatus;
  portfalioValue: boolean;
  positionValue?: any;
  type: string;
  sendEmisoraSeleccionada?: (data: string) => void;
}

const SimpleTable: React.FC<SimpleTableProps> = ({ tabsData, extend, portfolio,  portfalioValue,  positionValue, type, sendEmisoraSeleccionada}) => {

  const [ option, setOption ] = useState("");
  const [ textoTooltip, setTextoTooltip ] = useState("");
  const [redirectRic, setRedirectRic] = useState("");
  const [checkRic, setCheckRic] = useState(false);

  const sendTextoTooltip = (data: string) => {
    if(textoTooltip === data){
      return;
    }
    setTextoTooltip(data);
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    if(type === "capitales") {
      setOption("sVariacion")
    }

    if(type === "fondos") {
      //setOption("UltimoPrecio")
      if(sendEmisoraSeleccionada != undefined){
        sendTextoTooltip("¡Haz click en el nombre del fondo para precargarlo en la caja de operaciones!");
      }
      setOption("sUltimoPrecio")
    }

  },[]);

  const sendPerfilEmisora = (data : string) => {
    setRedirectRic(data);
    setCheckRic(true);
  }

  function handleSelect(e: any) {
    setOption(e.target.value);
  }

  if(checkRic){
    return <Redirect push to={'/emisora/' + redirectRic } />
  }

  return (
    <div className='overflow-y-auto w-full bg-white rounded relative h-96'>
      {
        Object.keys(positionValue).length === 0 ? 
        <div className="w-full h-full pt-4">
          <p className="text-center font-semibold text-md">No hay datos</p>
        </div>
        :
        <table className='border-collapse table-auto w-full whitespace-no-wrap bg-white '>
          <thead>
            <tr className='text-center sticky top-0 bg-white'>
              {tabsData.headings.map((heading: SimpleTableHeading) => {
                return (
                  <th
                    key={heading.key + heading.value}
                    className={(('relative flex-1 top-0 border-b border-gray-300 w-max py-2 px-2 font-bold tracking-wider text-xs ') + ((heading.key === 'sVariacion' || heading.key === 'sUltimoPrecio') ? " bg-red-600" : ""))}
                  >
                    {heading.key === 'sVariacion' ? (
                      <select className='font-bold w-full' name='select' id="selectPositions" onChange={ handleSelect }>
                        <option value='sVariacion'>Retorno diario</option>
                        <option value='sCostoPromedio'>Costo promedio</option>
                        <option value='sCostoActual'>Costo de compra</option>
                        <option value='sUltimoPrecio'>Precio actual</option>
                        <option value='sUtilidad'>Ganancia ($)</option>
                        <option value='sUtilidadPorc'>Ganancia (%)</option>
                        <option value='sTitulosVenta'>Títulos en venta</option>
                        <option value='sTitulosBloqueados'>Títulos bloqueados</option>
                        <option value='sValorMercado'>Valor de mercado</option>
                      </select>
                    ) : heading.key === 'sUltimoPrecio' ? (
                      <select className='font-bold w-full' name='select' id="selectPositions" onChange={ handleSelect }>
                        <option value='sUtilidad'>Ganancia ($)</option>
                        <option value='sCostoPromedio'>Costo promedio</option>
                        <option value='sCostoCompra'>Costo de compra</option>
                        <option value='sUltimoPrecio'>Precio de valuación</option>
                        <option value='sUtilidadPorc'>Ganancia (%)</option>
                        <option value='sTitulosVenta'>Titulos en venta</option>
                        <option value='sTitulosBloqueados'>Titulos bloqueados</option>
                        <option value='sValorMercado'>Valor de mercado</option>
                      </select>
                    ) : heading.key === 'lastHeader2' ? (
                      <select className='font-bold w-full' name='select'>
                        <option  value='value1'>Titulos</option>
                        <option value='value2'>Fecha Vencimiento</option>
                        <option value='value3'>Días transcurridos</option>
                        <option value='value3'>Calificación</option>
                        <option value='value3'>Calificadora</option>
                        <option value='value3'>Rendimiento</option>
                        <option value='value3'>Valor de inversión</option>
                        <option value='value3'>Ingresos acumulados</option>
                        <option value='value3'>
                          Valor actualizado de inversión
                        </option>
                        <option value='value3'>Interés / Cupón corrido</option>
                        <option value='value3'>Intereses pagados</option>
                        <option value='value3'>Costo tasa</option>
                        <option value='value3'>Mercado</option>
                      </select>
                    ) : (
                      heading.value
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {
              portfalioValue ? positionValue?.map((row: any, index:number) => {  
                const rowComponent = (
                  <tr key={index} className='text-center' onClick={() => {
                    if(sendEmisoraSeleccionada != undefined){
                      sendEmisoraSeleccionada(row.Descripcion)
                    }
                  }} >
                    {tabsData.headings.map((column: any) => {
                        return (
                          <td
                            key={row[column.key]}
                            className={
                              'p-2 text-xs' +
                              (column.fontWeight ? 'font-bold ' : ' ') +
                              (extend
                                ? 'bg-gray-200 border-b-2 border-gray-300'
                                : ' ') + ( column.key != "Descripcion" ? " text-right pr-2 " : "")
                            }
                          >
                            {type === "capitales" && column.key == "Descripcion" ?
                               <p className="cursor-pointer" onClick={() => sendPerfilEmisora(row[column.key])}>{row[column.key]}</p>
                              :
                              (column.key === "sUltimoPrecio"  || column.key === "sVariacion" ) ? row[option] :
                              row[column.key]
                            }
                            {/* {
                              (column.key === "sUltimoPrecio"  || column.key === "sVariacion" ) ? row[option] :
                              row[column.key]
                            } */}
                          </td>
                        );
                      })}
                  </tr>
                );
                
                return (
                  textoTooltip.length === 0 ?
                    /* no hay tooltip, entonces no ponemos el componente de Tooltip */
                    rowComponent
                  :
                    /* hay tooltip, entonces ponemos el componente de tooltip */
                    <Tooltip title={textoTooltip}>
                      {rowComponent}
                    </Tooltip>
                );
              })
              :
              tabsData.rows.map((row: any, index: number) => {
                return (
                  <tr key={index}>
                    {tabsData.headings.map((column: any) => {
                      return (
                        <td
                          key={row[column.key]}
                          className={
                            'p-2 text-xs' +
                            (column.fontWeight ? 'font-bold ' : ' ') +
                            (extend
                              ? 'bg-gray-200 border-b-2 border-gray-300'
                              : ' ')
                          }
                        >
                          {row[column.key]}
                          
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            }
          </tbody>
        </table>
    }
    </div>
  );
};

//Get data from store
const mapStateToProps = ( store: RootState ) => {
  return {
      portfolio: store.portfolio
  };
};

export default connect(mapStateToProps, null)(SimpleTable);