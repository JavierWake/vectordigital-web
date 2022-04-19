import React, {useEffect} from 'react';
import Progressbar from './Progressbar';


//State of the component
interface propsFromState {
    posicionData?: any;
    profundidad: string;
    type: string;
}

type AllProps = propsFromState;


const Posturas: React.FC<AllProps> = ({ posicionData, profundidad, type }) => {
    
    // console.log("Posturas");

    let arr:any;
    let maxBid:any;
    let maxAsk:any;
    let minBid:any;
    let minAsk:any;
    let filteredBid:any;
    let filteredBidSize:any;
    let filteredAskSize:any;
    let filteredAsk:any;
    let newBid:any;
    let newAsk:any;
    let newBidSize:any;
    let newAskSize:any;
    let arrBid:any;
    let arrAsk:any;
    let arrBidSize:any;
    let arrAskSize:any;
    let valueBid:any = [];
    let valueAsk:any
    let valueBidSize:any;
    let valueAskSize:any;
    let differenceBid:any;
    let differenceAsk:any;
    let perValueBid:any;
    let perValueAsk:any;

    if(posicionData != null){

        if(type === "trading") {
            
            arr = posicionData;

            filteredBid = ['BEST_BID1','BEST_BID2','BEST_BID3', 'BEST_BID4','BEST_BID5','BEST_BID6','BEST_BID7','BEST_BID8','BEST_BID9','BEST_BID10'];
            filteredAsk = ['BEST_ASK1','BEST_ASK2','BEST_ASK3', 'BEST_ASK4','BEST_ASK5','BEST_ASK6','BEST_ASK7','BEST_ASK8','BEST_ASK9','BEST_ASK10'];
            
            filteredBidSize = ['BEST_BSIZ1','BEST_BSIZ2','BEST_BSIZ3', 'BEST_BSIZ4','BEST_BSIZ5','BEST_BSIZ6','BEST_BSIZ7','BEST_BSIZ8','BEST_BSIZ9','BEST_BSZ10'];
            filteredAskSize = ['BEST_ASIZ1','BEST_ASIZ2','BEST_ASIZ3', 'BEST_ASIZ4','BEST_ASIZ5','BEST_ASIZ6','BEST_ASIZ7','BEST_ASIZ8','BEST_ASIZ9','BEST_ASZ10'];
            
            newBid = filteredBid
                .reduce((obj:any, key:any) => ({ ...obj, [key]: arr[key] }), {});
            newAsk = filteredAsk
                .reduce((obj:any, key:any) => ({ ...obj, [key]: arr[key] }), {});

            newBidSize = filteredBidSize
                .reduce((obj:any, key:any) => ({ ...obj, [key]: arr[key] }), {});
            newAskSize = filteredAskSize
                .reduce((obj:any, key:any) => ({ ...obj, [key]: arr[key] }), {});        
            

            arrBid = Object.values(newBid);
            arrAsk = Object.values(newAsk);

            arrBidSize = Object.values(newBidSize);
            arrAskSize = Object.values(newAskSize);

            valueBid = arrBid.slice(0,parseInt(profundidad, 10));
            valueAsk = arrAsk.slice(0,parseInt(profundidad, 10));

            valueBidSize = arrBidSize.slice(0,parseInt(profundidad, 10));
            valueAskSize = arrAskSize.slice(0,parseInt(profundidad, 10));


            maxBid = Math.max(...arrBidSize);
            maxAsk = Math.max(...arrAskSize);

            // minBid = Math.min(...arrBid);
            // minAsk = Math.min(...valueAsk);

            // differenceBid = maxBid - minBid;
            // differenceAsk = maxAsk - minAsk;



        } else if(type === "emisora") {
            
            valueBid = Object.values(posicionData.compra).slice(0,parseInt(profundidad, 10));
            valueAsk = Object.values(posicionData.venta).slice(0,parseInt(profundidad, 10));

            perValueBid = Object.values(posicionData.perCompra).slice(0,parseInt(profundidad, 10));
            perValueAsk = Object.values(posicionData.perVenta).slice(0,parseInt(profundidad, 10));

            valueBidSize = Object.values(posicionData.compraVol).slice(0,parseInt(profundidad, 10));
            valueAskSize = Object.values(posicionData.ventaVol).slice(0,parseInt(profundidad, 10));

        }
            

    }

    return(
        <div>
            <div className={"flex flex-row w-full justify-between "  + (type === "trading" ? " my-2" : "") }>
                <div>
                    <p className="text-md font-semibold text-gray-700">Volumen</p>
                </div>
                <div>
                    <span className="text-md font-semibold text-gray-700">Compra</span>
                    <span className="text-md font-semibold text-gray-700"> Venta</span>
                </div>
                <div>
                    <p className="text-md font-semibold text-gray-700">Volumen</p>
                </div>
            </div>
            { type === "trading" ? 
                "" : 
                <div className="flex flex-row justify-between my-2">
                    {/* <div>
                        <p className="text-sm text-gray-400">Utl. 8:32 a.m</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Utl. 8:32 a.m</p>
                    </div> */}
                </div> 
            }
            {
                valueBid.map((row:any, id:any) => {
                    let perCompra:any;
                    let perVenta:any;
                    
                    if(type === "trading") {
                        perCompra = valueBidSize[id]/maxBid;
                        perVenta = valueAskSize[id]/maxAsk;
                    }
                    else{
                        perCompra = perValueBid[id]
                        perVenta = perValueAsk[id]
                    }

                    return (
                        <div className="flex flex-row">
                            <div className="w-40">
                                <span className="m-0 p-0 text-small">{valueBidSize[id].toLocaleString('en-US')}</span>
                            </div>
                            <Progressbar progressPercentage={perCompra*100} progressData={valueBid[id]} type={"compra"} type2={type} />
                            <div className="border-l border-gray-400"></div>
                            <Progressbar progressPercentage={perVenta*100} progressData={valueAsk[id]} type={"venta"} type2={type} />
                            <div className="w-40">
                                <span className="m-0 p-0 text-small">{valueAskSize[id].toLocaleString('en-US')}</span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Posturas;