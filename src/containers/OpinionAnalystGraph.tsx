import React, { useEffect } from 'react';
import Progressbar from './Progressbar';
import { IRecomIssuer } from '../types/RecomIssuerTypes';

interface propsFromState {
    recomIssuerItems: IRecomIssuer;
}

type AllProps = propsFromState; 

const OpinionAnalystGraph: React.FC<AllProps> = ({ recomIssuerItems }) => {

    const values = [recomIssuerItems.buy, recomIssuerItems.hold, recomIssuerItems.sell];
    const valuesSort = values.sort(function(a, b){return a-b});

    const colores = ["bg-gray-400","bg-gray-600","bg-red-600"]

    return(
        <div>
            <div className="flex flex-col">
                <div className="my-4">
                    <Progressbar progressPercentage={recomIssuerItems.buy*100} progressData={recomIssuerItems.buy} type={"analistaCompra"} color={colores[valuesSort.indexOf(recomIssuerItems.buy)]} />
                    <p className={"text-sm " + (valuesSort.indexOf(recomIssuerItems.buy) === 2 ? "text-red-600" : "")}><span className='text-base font-medium'>{recomIssuerItems.perBuy}</span> Compra</p>
                </div>
                <div className="my-4">
                    <Progressbar progressPercentage={recomIssuerItems.hold*100} progressData={recomIssuerItems.hold} type={"analistaMantener"} color={colores[valuesSort.indexOf(recomIssuerItems.hold)]} />
                    <p className={"text-sm " + (valuesSort.indexOf(recomIssuerItems.hold) === 2 ? "text-red-600" : "")}><span className='text-base font-medium'>{recomIssuerItems.perHold}</span> Mantener</p>
                </div>
                <div className="my-4">
                    <Progressbar progressPercentage={recomIssuerItems.sell*100} progressData={recomIssuerItems.sell} type={"analistaVender"} color={colores[valuesSort.indexOf(recomIssuerItems.sell)]} />
                    <p className={"text-sm " + (valuesSort.indexOf(recomIssuerItems.sell) === 2 ? "text-red-600" : "")}><span className='text-base font-medium'>{recomIssuerItems.perSell}</span> Vender</p>
                </div>
            </div>
        </div>
    );
}


export default OpinionAnalystGraph;