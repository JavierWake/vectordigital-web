import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { VictoryVoronoiContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryLine, VictoryTooltip } from 'victory';

import { sendPortafolioValueAction } from '../actions/historicoAction';
import { IResponse } from '../types/HistoricoTypes';

import { ButtonGroup } from 'reactstrap';
import { Button } from 'reactstrap';

import '../styles/filterGrapg.css';

interface propsFromState {
    historico: IResponse;
    textNum: any;
}

type AllProps = propsFromState;

const Grafica: React.FC<AllProps> = ({ historico, textNum }) => {
  
  const dispatch = useDispatch();
  const [periodo, setPeriodo] = useState("S1");

  useEffect(() => {
    dispatch(sendPortafolioValueAction({ portafolioValue: periodo }));
  },[periodo]);
    
  return(
      <div className="">
        <h1 className="font-sans text-2xl font-extralight mt-4">

          {textNum.sTotal}

        </h1>
        <div className="flex">
          <div>
              <div className="bg-white w-full">
                <VictoryChart theme={VictoryTheme.material} 
                  height={320} width={730}
                  padding={{ top: 60, bottom: 60, left: 70, right: 80 }}
                  // padding={{ left: 10 }}
                    containerComponent={
                        <VictoryVoronoiContainer
                          height={320} width={730}
                          labels={({ datum }) => `${datum.Fec}, ${ Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(datum.Ten)}`}
                          labelComponent={<VictoryTooltip cornerRadius={2}  pointerLength={0} flyoutStyle={{ fill: '#F8F8F8', stroke: '#DFDFDF', strokeWidth: 0.2, }}  renderInPortal={false}/>}
                          responsive={true}
                        />
                    }
                >
                    <VictoryAxis
                        // label="Fecha"
                        style={{
                            axisLabel: { padding: 30},
                            axis: {stroke: "transparent"},
                            tickLabels: { fill: "transparent"},
                            //tickLabels: { fill:"#000000", angle: 45},
                            ticks: {stroke: "transparent"}, 
                            grid: { stroke: "transparent"}, 
                        }}
                        tickValues={[]}
                        //maxDomain={{ x: 5 }}
                    />
                    <VictoryAxis dependentAxis
                        // label="Tenencia"
                        offsetX={65}
                        style={{
                            axisLabel: { padding: 20},
                            axis: {stroke: "transparent"},
                            tickLabels: { fill:"#000000", fontSize: 12, padding: 13 },
                            ticks: {stroke: "transparent"}, 
                            grid: { stroke: "#DEDEDE"}, 
                        }}
                        tickFormat = {(t) => `${ Intl.NumberFormat('es-MX').format(t)}`}
                        // tickFormat={({ datum }) => `${ Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(datum)}`}
                        tickValues={[]}
                        //maxDomain={{ x: 7 }}
                    />
                    <VictoryLine
                        width={1000}
                        style={{
                            data: { stroke: "#FF5000" },
                            labels: { stroke: "#DFDFDF", strokeWidth: 0.2, },
                        }}
                        data={ 
                          periodo === "A1" ?
                            historico.data.A1.dsDwResumen.tdsDwResumenDetalle : 
                          periodo === "S1" ?
                            historico.data.S1.dsDwResumen.tdsDwResumenDetalle :
                          periodo === "M1" ?
                            historico.data.M1.dsDwResumen.tdsDwResumenDetalle :
                          periodo === "M3" ?
                            historico.data.M3.dsDwResumen.tdsDwResumenDetalle :
                          periodo === "A5" ?
                            historico.data.A5.dsDwResumen.tdsDwResumenDetalle :
                            historico.data.A10.dsDwResumen.tdsDwResumenDetalle
                        }
                        x="Fec"
                        y="Ten"
                        //padding={{ top: 10, bottom: 10, right: 0, left: 10 }}
                        events={[{
                            target: "data",
                            eventHandlers: {
                              onMouseOver: () => {
                                return [
                                  {
                                    target: "data",
                                    //eventKey: "",
                                    //mutation: () => ({style: {fill: "#999999", width: 50}})
                                  }, {
                                    target: "labels",
                                    mutation: () => ({ active: true })
                                  }
                                ];
                              },
                              onMouseOut: () => {
                                return [
                                  {
                                    target: "data",
                                    mutation: () => {}
                                  }, {
                                    target: "labels",
                                    mutation: () => ({ active: false })
                                  }
                                ];
                              }
                            }
                          }]}

                    />
                </VictoryChart>
              </div>
            <div className="w-full">
              <div>
                <button className={`rounded-md mr-4 p-2 hover:bg-red-600 hover:text-white hover:font-bold cursor-pointer ${periodo === "S1" ? "text-white font-bold bg-red-600" : "text-gray-500 font-bold"}`} onClick={() => {setPeriodo("S1");}}>
                  1S
                </button>
                <button className={`rounded-md mr-4 p-2 hover:bg-red-600 hover:text-white hover:font-bold cursor-pointer ${periodo === "M1" ? "text-white font-bold bg-red-600" : "text-gray-500 font-bold"}`} onClick={() => {setPeriodo("M1");}}>
                  1M
                </button>
                <button className={`rounded-md mr-4 p-2 hover:bg-red-600 hover:text-white hover:font-bold cursor-pointer ${periodo === "M3" ? "text-white font-bold bg-red-600" : "text-gray-500 font-bold"}`} onClick={() => {setPeriodo("M3");}}>
                  3M
                </button>
                <button className={`rounded-md mr-4 p-2 hover:bg-red-600 hover:text-white hover:font-bold cursor-pointer ${periodo === "A1" ? "text-white font-bold bg-red-600" : "text-gray-500 font-bold"}`} onClick={() => {setPeriodo("A1");}}>
                  1A
                </button>
                <button className={`rounded-md mr-4 p-2 hover:bg-red-600 hover:text-white hover:font-bold cursor-pointer ${periodo === "A5" ? "text-white font-bold bg-red-600" : "text-gray-500 font-bold"}`} onClick={() => {setPeriodo("A5");}}>
                  5A
                </button>
                <button className={`rounded-md mr-4 p-2 hover:bg-red-600 hover:text-white hover:font-bold cursor-pointer ${periodo === "A10" ? "text-white font-bold bg-red-600" : "text-gray-500 font-bold"}`} onClick={() => {setPeriodo("A10");}}>
                  10A
                </button>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <p className="text-lg font-bold">Rendimiento</p>
            <div>
                <span className="text-black text-sm font-light">Último mes</span>
                <span className="text-black text-lg pl-2">{historico.data.M1.dsDwResumen.tdsDwResumen[0].Rend}%</span>
            </div>
            <div className="">
                <span className="text-black text-sm font-light">Últimos 12 meses</span>
                <span className="text-black text-lg pl-2">{historico.data.A1.dsDwResumen.tdsDwResumen[0].Rend}%</span>
            </div>
          </div>
        </div>
      </div>
  );
}

  

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
      sendPortafolioValueAction: () => dispatch(sendPortafolioValueAction),
  };
};

export default connect(null, mapDispatchToProps)(Grafica)