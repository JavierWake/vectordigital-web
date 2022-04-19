import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import GraphDonut from '../containers/GraphDonut';

interface propsFromState {
    graphDonutData: any;
    portafolio: boolean;
    textNum?: any;
    textPorc?: any;
    valueNum?: any;
    valuePorc?: any;
    ultAct?: string;
}

type AllProps = propsFromState; 

const GraphDonutContainer: React.FC<AllProps> = ({ graphDonutData, portafolio, textNum, textPorc, valuePorc, valueNum, ultAct }) => {

    const colorGraf = ["red-600", "purple-900", "green-70", "blue-50", "gray-150" ];
    const valueEmisora = ["sPorcentajeVar", "sTitulosActuales", "sValorMercado", "sCostoActual", "sCostoPromedio", "sUtilidad", "sUtilidadPorc", "sTitulosVenta", "sTitulosBloqueados", "sPrecioActual" ];

    return(
        <div>
            {
                portafolio && <div className="flex justify-end px-6 py-2">
                    <p className="text-xs text-gray-500">Últ. Actualización {ultAct}</p>
                </div>
            }
            <div className="flex flex-row px-8 pt-8" >
                <div className={portafolio ? "w-4/12 h-4/12" : "w-3/12 h-3/12"}>
                    <GraphDonut 
                        dataX={portafolio ? valuePorc.PorcPortafolioCap : valueNum} dataY={portafolio ? valuePorc.PorcPortafolioFd : (100-valueNum)} dataZ={portafolio ? valuePorc.PorcPortafolioMd : 0}
                        dataV={portafolio ? 0 : 0} dataW={portafolio ? valuePorc.PorcOperXLiq : 0} 
                        total={ portafolio ? textNum.sTotal : valuePorc }
                        type={portafolio}
                    />
                </div>
                {
                    portafolio ? 
                    <div className="flex items-center">
                        <div className={"flex flex-row mx-auto " + portafolio ? "items-center" : ""}>
                            <div className="mx-2">
                                {
                                    graphDonutData.headings.map((dataShow: any, index: any) => {
                                        return(
                                            <div className={index === 0 ? "pb-3.5" : index === graphDonutData.headings.length -1 ? "pb-3.5" : "pt-1.5 pb-3.5"}>
                                                <label className={"text-black text-sm border-l-4 font-light border-" + colorGraf[index] + " pl-2"}>{dataShow.value}</label>
                                            </div>
                                        );
                                    })
                                }
                            </div>                          
                        </div>
                        <div className={"flex flex-row mx-auto " + portafolio ? "items-center" : ""}>
                            <div className="mx-6">
                                {
                                    graphDonutData.headings.map((dataShow: any, index: any) => {
                                        let value:any = Object.values(textNum)[index+1];
                                        return(
                                            <div className={index === 0 ? "" : "my-3"}>
                                                <label className="text-black text-lg pl-2">{value}</label>
                                            </div>
                                        );
                                    })
                                }
                            </div>                          
                        </div>
                        <div className={"flex flex-row mx-auto " + portafolio ? "items-center" : ""}>
                            <div className="mx-6">
                                {
                                    graphDonutData.headings.map((dataShow: any, index: any) => {
                                        let value:any = Object.values(textPorc)[index];
                                        return(
                                            <div className={index === 0 ? "" : "my-3"}>
                                                <label className="text-black">{value}</label>
                                            </div>
                                        );
                                    })
                                }
                            </div>                          
                        </div>
                    </div>
                    :
                    <div className="flex w-8/12 pl-8">
                        <div className="w-1/2">
                            {
                                graphDonutData.headings.slice(0, 5).map((dataShow: any, index: any) => {
                                    return(
                                        <div className={"flex " + (index === 0 ? "" : "my-3")}>
                                            <label className={"w-1/2 text-sm"}>{dataShow.value}</label><br/>
                                            <label className={"w-1/2 text-black text-base font-medium text-right"}>{textNum[valueEmisora[index]]}</label> 
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="w-1/2 pl-5">
                            {
                                graphDonutData.headings.slice(5, 10).map((dataShow: any, index: any) => {
                                    return(
                                        <div className={"flex " + (index === 0 ? "" : "my-3")}>
                                            <label className={"w-1/2 text-sm"}>{dataShow.value}</label><br/>
                                            <label className={"w-1/2 text-black text-base font-medium text-right"}>{textNum[valueEmisora[index+5]]}</label> 
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
                {/* <div className={"flex flex-row mx-auto " + portafolio ? "items-center" : ""}>
                    <div className="mx-2">
                        {
                            portafolio ?
                                graphDonutData.headings.map((dataShow: any, index: any) => {
                                    return(
                                        <div className={index === 0 ? "pb-3.5" : index === graphDonutData.headings.length -1 ? "pb-3.5" : "pt-1.5 pb-3.5"}>
                                            <label className={"text-black text-sm border-l-4 font-light border-" + colorGraf[index] + " pl-2"}>{dataShow.value}</label>
                                        </div>
                                    );
                                })
                            :
                                graphDonutData.headings.slice(0, 4).map((dataShow: any, index: any) => {
                                    return(
                                        <div className={index === 0 ? "" : "my-3"}>
                                            <label className={"text-base pl-2"}>{dataShow.value}</label><br/>
                                            <label className={"text-black text-lg font-medium"}>{textNum[valueEmisora[index]]}</label> 
                                        </div>
                                    );
                                })
                        }
                    </div>                          
                </div>
                <div className={"flex flex-row mx-auto " + portafolio ? "items-center" : ""}>
                    <div className="mx-6">
                        {
                            portafolio ?
                                graphDonutData.headings.map((dataShow: any, index: any) => {
                                    let value:any = Object.values(textNum)[index+1];
                                    return(
                                        <div className={index === 0 ? "" : "my-3"}>
                                            <label className="text-black text-lg pl-2">{value}</label>
                                        </div>
                                    );
                                })
                            :
                            graphDonutData.headings.slice(4, 8).map((dataShow: any, index: any) => {
                                return(
                                    <div className={index === 0 ? "" : "my-3"}>
                                        <label className={"text-gray-950 text-lg pl-2"}>{dataShow.value}</label><br/>
                                        {
                                            dataShow.key === "dsMkdCapPrecios" ?
                                            <label className={"text-base pl-2"}>
                                                {textPorc[valueEmisora[index+4]]}
                                            </label>
                                            :
                                            <label className={"text-black text-lg font-medium"}>{textNum[valueEmisora[index+4]]}</label>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>                          
                </div>
                <div className={"flex flex-row mx-auto " + portafolio ? "items-center" : ""}>
                    <div className="mx-6">
                        {
                            portafolio ?
                                graphDonutData.headings.map((dataShow: any, index: any) => {
                                    let value:any = Object.values(textPorc)[index];
                                    return(
                                        <div className={index === 0 ? "" : "my-3"}>
                                            <label className="text-black">{value}</label>
                                        </div>
                                    );
                                })
                            :
                            graphDonutData.headings.slice(8).map((dataShow: any, index: any) => {
                                return(
                                    <div className={index === 0 ? "" : "my-3"}>
                                        <label className={"text-gray-950 text-lg pl-2"}>{dataShow.value}</label><br/>
                                        {
                                            dataShow.key === "dsMkdCapPrecios" ?
                                            <label className={"text-black text-base"}>
                                                {textPorc[valueEmisora[index+8]]}
                                            </label>
                                            :
                                            <label className={"text-black text-base"}>{textNum[valueEmisora[index+8]]}</label>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>                          
                </div> */}
            </div>
            {
                portafolio && <div className="flex justify-end px-6 py-2">
                <NavLink to="/resumen">
                    <p className="text-sm text-red-600 cursor-pointer hover:underline">Ver detalle</p>
                </NavLink>
            </div>
            }
        </div>
    );
}

export default GraphDonutContainer;