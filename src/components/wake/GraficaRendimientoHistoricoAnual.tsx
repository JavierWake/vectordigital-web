import React from "react"; 
import { 
VictoryTheme, 
  VictoryVoronoiContainer, 
  VictoryChart, 
  VictoryLabel, 
  VictoryLine, 
  VictoryPortal, 
  VictoryScatter, 
  VictoryTooltip, 
  VictoryContainer
} from "victory"; 

const GraficaRendimientoHistoricoAnual = ( ) =>{ 

    const Data = [
        { x: 2017, y: 1.5 },
        { x: 2018, y: 2 },
        { x: 2019, y: 2.8 },
        { x: 2020, y: 3 },
        { x: 2021, y: 3 },
        { x: 2022, y: 4 }
    ]

    return  ( 
        <VictoryChart
        height={ 300 }
        width={1440}
        domain={{ x: [2016, 2022], y: [1, 4] }}
        containerComponent={ <VictoryContainer responsive={ true }/> }
        >
            <VictoryScatter
                style={{ data: { fill: "#FF5000" } }}
                size={7}
                data={ Data }
            />
        </VictoryChart>
      ); 
} 
export default GraficaRendimientoHistoricoAnual 