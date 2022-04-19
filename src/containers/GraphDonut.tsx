import React, { useEffect } from "react";
import { VictoryPie, VictoryTooltip, VictoryLabel } from 'victory';

interface propsFromState {
  dataX: number;
  dataY: number;
  dataZ: number;
  dataV: number;
  dataW: number;
  total: string;
  type?: boolean;
}

type AllProps = propsFromState;

const GraphDonut: React.FC<AllProps> = ({ dataX, dataY, dataZ, dataV, dataW, total, type }) => {

    return(
        <div>
          <svg viewBox="0 30 400 380">
            <VictoryPie name="pie"
              standalone={false}
                labelComponent={
                    <VictoryTooltip
                        cornerRadius={2}
                        pointerLength={0}
                        flyoutStyle={{
                        stroke: "#DFDFDF",
                        strokeWidth: 0.2,
                        fill: "#F8F8F8",
                        }}
                    />
                }
                colorScale={
                  type ?
                    ["#FF5000", "#172A56", "#CEDE22", "#B2E3DE", "#888682"]
                  :
                    ["#FF5000", "#C4C4C4", "#DEDEDE" ]
                }
                innerRadius={165}
                data={[
                    { y: dataX },
                    { y: dataY },
                    { y: dataZ },
                    { y: dataV },
                    { y: dataW },
                ]}
                style={{ labels: {fontSize: "22px", padding: 55} }}
            />
            { type ? 
                <>
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 32 }}
                  x={200} y={200}
                  text={total}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 20 }}
                  x={200} y={235}
                  text={'\n' + "Total"}
                />
                </>
            : 
              <>
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 32 }}
                  x={200} y={200}
                  text={total + '%'}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 20 }}
                  x={200} y={235}
                  text={'\n' + "Portafolio"}
                />
                </>
              // <VictoryLabel
              //   textAnchor="middle"
              //   style={{ fontSize: 40 }}
              //   x={200} y={200}
              //   text={total + "%" + '\n' + "Portafolio"}
              // /> 
           }
            </svg>
        </div>
    );
}
  
export default GraphDonut;