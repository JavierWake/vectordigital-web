import React, { useState } from 'react';
import parse from "html-react-parser";

import { IFondoData, IFondosFamiliasData } from '../types/FondosFamiliasTypes';
import { Dropdown } from "../containers/Dropdown";
import { MdStar } from "react-icons/md";
import { Tooltip } from '@material-ui/core';
import { ITdsFondoNuevaFamilias } from '../types/FondosNuevaFamiliasTypes';
import convertToAcentos from '../utils/convertToAcentos';

//State of the component
interface propsFromState {
    item: ITdsFondoNuevaFamilias;
    color: String;
    estrellas: number;
    sendFondoSeleccionado: (data: string) => void;
}

type AllProps = propsFromState;

const NuestrosProductosFondosCard: React.FC<AllProps> = ({color, item, estrellas, sendFondoSeleccionado}) =>{

    return(
        <a 
            className="w-11/24 flex flex-col rounded-lg border border-gray-350 mt-4 hover:shadow-xl cursor-pointer" 
            href={item.presentacion.length === 0 ? "#" : item.presentacion} 
            target={item.presentacion.length === 0 ? "" : "_blank"}
        >
            <div id="lineaColorTop" className={"w-full h-2 rounded-lg flex flex-row border-t-2 " + color}></div>
            <div id="contenidoCard" className="px-4 w-full h-full flex flex-col">
                <div className="headerCard w-full flex flex-row">
                    <div className="w-3/4 my-2">
                        <div className="flex flex-col justify-self-center">
                            <Tooltip title="¡Haz click aquí para precargar este fondo en la caja de operaciones!">
                                <h2 className="font-sans font-semibold text-base text-left text-gray-800 my-2" onClick={() => sendFondoSeleccionado(item.Emisora)}>{item.Emisora}</h2>
                            </Tooltip>
                            {/*<h3 className="font-sans font-bold italic text-xs text-right text-gray-800">{item.Familia}</h3>*/}
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-row justify-end pl-2 my-2">
                        {
                            (item.Califica.trim() != 'NA' && item.Califica.trim() != "No Aplica") && <div className="flex flex-col">
                                <div className="justify-self-center">
                                    <h2 className="font-sans text-sm text-center text-gray-500">{item.Califica}</h2>
                                </div>
                                <div>
                                    <h4 className="font-sans text-xxs text-center text-gray-500">Calificación</h4>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="subtitleHeader w-full flex flex-row">
                    <div className="w-3/4">
                        <h2 className="font-sans font-bold italic text-sm text-gray-800">{parse(convertToAcentos(item.Familia))}</h2>
                    </div>
                    <div className="w-1/4 flex flex-col pr-2">
                        {
                            item.RendU12M.length > 0 && <>
                                <h2 className="font-sans italic text-2xl text-center text-gray-800">{item.RendU12M.includes("%") ? item.RendU12M : (Math.round((parseFloat(item.RendU12M) + Number.EPSILON) * 100) / 100) + "%"}</h2>
                                <h3 className="font-sans italic text-xxs text-center text-gray-500">(Últimos 12 meses)</h3>
                            </>
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <h3 className="font-sans italic text-xs text-gray-800">{item.Plazo}</h3>
                </div>
                <div className="estrellasVideo flex flex-row mt-2">
                    <div className="flex flex-row w-1/2 py-2">
                        <div className="flex flex-row space-between">
                            <div id="estrellas" className="flex flex-row place-self-center items-center">
                                {
                                    estrellas == 0 && <React.Fragment>
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                    </React.Fragment>
                                }
                                {
                                    estrellas == 1 && <React.Fragment>
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                    </React.Fragment>
                                }
                                {
                                    estrellas == 2 && <React.Fragment>
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                    </React.Fragment>
                                }
                                {
                                    estrellas == 3 && <React.Fragment>
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                    </React.Fragment>
                                }
                                {
                                    estrellas == 4 && <React.Fragment>
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-gray-350 text-sm" />
                                    </React.Fragment>
                                }
                                {
                                    estrellas == 5 && <React.Fragment>
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                        <MdStar className="text-red-600 text-sm" />
                                    </React.Fragment>
                                }
                                <h3 className="font-sans italic text-xs text-gray-500 ml-1">MorningStar</h3>
                            </div>
                        </div>
                    </div>
                    <div className="verVideo w-1/2 text-right pl-3">
                        {
                            item.LinkVideoCorto.length > 0 && <a href={item.LinkVideoCorto} target="_blank">
                                <p className="text-sm text-red-600 cursor-pointer hover:underline text-right">Ver video</p>
                            </a>
                        }
                    </div>
                </div>
            </div>
        </a>
    );
 }

export default NuestrosProductosFondosCard;