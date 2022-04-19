import React, { useEffect } from 'react';
import OpinionAnalystGraph from './OpinionAnalystGraph';
import { IRecomIssuer } from '../types/RecomIssuerTypes';
import { IoMdPricetag } from "react-icons/io";

interface propsFromState {
    recomIssuerItems: IRecomIssuer;
}

type AllProps = propsFromState;

const OpinionAnalyst: React.FC<AllProps> = ({ recomIssuerItems }) => {

    const values = [recomIssuerItems.buy, recomIssuerItems.hold, recomIssuerItems.sell];
    const valuesOrder = values.sort().reverse();

    let texto = "";
    if(valuesOrder[0] == recomIssuerItems.buy){
        texto = "% Comprar"
    }
    else if(valuesOrder[0] == recomIssuerItems.hold){
        texto = "% Mantener"
    }
    else{
        texto = "% Vender"
    }

    return (
        <div>
            <div className="flex flex-row">
                <div className="mr-20">
                    <div className="post-info my-4">
                        <span className="charity">
                            <span className="absolute text-center text-white z-20 pt-12 pl-10" style={{ fontSize: "17px", width: "110px" }}>{(valuesOrder[0] * 100).toFixed(0) + texto}</span>
                            <span><IoMdPricetag style={{ fontSize: "150px" }} className="text-red-600 z-10" /></span>
                        </span>
                        <p className='text-sm text-red-600 pl-4' >{recomIssuerItems.analysts} analistas opinan</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <OpinionAnalystGraph recomIssuerItems={recomIssuerItems} />
                </div>
            </div>
        </div>
    );
}


export default OpinionAnalyst;