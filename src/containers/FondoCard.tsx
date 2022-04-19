import React from 'react';
import { Tooltip } from '@material-ui/core';

//SVGs
import {ReactComponent as MorningStarLogo} from '../assets/morning-star-logo.svg';

//icons
import { MdStar } from "react-icons/md";
import { ITdsFondoData } from '../types/FondosEstrategiaIntegralTypes';
import getNameInitials from '../utils/getNameInitials';
import convertToTitleCase from '../utils/convertToTitleCase';
import convertToAcentos from '../utils/convertToAcentos';

//State of the component
interface propsFromState {
    item: ITdsFondoData;//POR MIENTRAS ANY, PERO DEBO PONER EL TYPE EN TYPES
    sendFondoSeleccionado: (data: string) => void;
}

type AllProps = propsFromState;

const FondoCard: React.FC<AllProps> = ({item, sendFondoSeleccionado}) =>{

    //console.log("fondoCard item");
    //console.log(item);

    let nombreYPuesto: string = item.PortafolioMgrPost;
    let nombre: string = nombreYPuesto;
    let puesto: string = nombreYPuesto;
    let iniciales: string = "VCB";

    if(nombreYPuesto.includes("/")){
        const splitNombrePuesto = nombreYPuesto.split("/");
        if(splitNombrePuesto.length === 2){
            nombre = convertToAcentos(splitNombrePuesto[0].trim());
            puesto = convertToAcentos(splitNombrePuesto[1].trim());
            iniciales = getNameInitials(splitNombrePuesto[0].trim());
        }
    }
    else if(nombreYPuesto.includes(".")){
        const splitNombrePuesto = nombreYPuesto.split(".");
        if(splitNombrePuesto.length === 2){
            nombre = convertToAcentos(splitNombrePuesto[0].trim());
            puesto = convertToAcentos(splitNombrePuesto[1].trim());
            iniciales = getNameInitials(splitNombrePuesto[0].trim());
        }
    }

    nombre = convertToTitleCase(nombre);
    puesto = convertToTitleCase(puesto);

    let linkVideoCortoYT: string = item.LinkVideoCorto;

    //debe ser este formato https://www.youtube.com/embed/codigo
    if(!linkVideoCortoYT.includes("embed")){
        //no esta en el formato correcto
        let nuevoLink: string = "https://www.youtube.com/embed/";
        const splitLink = linkVideoCortoYT.split("/");
        if(splitLink.length > 0){
            nuevoLink += splitLink[splitLink.length - 1];
            linkVideoCortoYT = nuevoLink;
        }
        else{
            //algo paso, debuggear
            linkVideoCortoYT = "";
        }
    }

    //const colorFamFondo = getAccentColorPorFamiliaFondo(item.) //NO SE PUEDE porque item no tiene atributo de familia

    let colorBorderTop: String = "border-red-600";
    let labelBgColor: String = 'bg-red-600';
    let famfondo: string = "Deuda";
    let colorClaro: string = "red-600";
    let colorOscuro: string = "red-600";
    switch(item.Fondo.toLowerCase()){
        case "renta variable":
            colorBorderTop = "border-green-300"; //verde
            labelBgColor = "bg-green-300";
            famfondo = "Renta Variable";
            break;
        case "fondos estratégicos":
        case "income":
        case "equity":
            colorBorderTop = "border-red-600"; //naranja
            labelBgColor = "bg-red-600";
            famfondo = "Fondos Estratégicos";
            break;
        case "cobertura":
        case "vectusd":
            colorBorderTop = "border-green-200"; //celeste
            labelBgColor = "bg-green-200";
            famfondo = "Cobertura";
            break;
        case "deuda":
        case "vectpre":
            colorBorderTop = "border-purple-900"; //azul
            labelBgColor = "bg-purple-900";
            famfondo = "Deuda";
            break;
        default:
            colorBorderTop = "border-red-600"; //naranja
            labelBgColor = "bg-red-600";
            famfondo = "Fondos Estratégicos def";
            break;
    }//switch
//{/*<div className={"shadow-xl border-t-4 p-3 mb-8 " + colorBorderTop}>*/}
    return(
            <a 
                href={item.LinkFichaTecnica.length === 0 ? "#" : item.LinkFichaTecnica} 
                target={item.LinkFichaTecnica.length === 0 ? "" : "_blank"} 
                className="w-11/24 h-28 flex flex-col rounded-lg border border-gray-350 mt-2 hover:shadow-xl cursor-pointer"
            >
                <div id="lineaColorTop" className={"w-full h-2 rounded-lg flex flex-row border-t-2 " + colorBorderTop}></div>
                <div id="contenidoCard" className="pb-2 px-4 w-full h-full flex flex-col place-content-between">
                    <div id="parte1-header-subtitle-desc" className="flex flex-col">
                        <div className="w-full flex flex-row items-center">
                            <div className="w-1/2">
                                <div className="justify-self-center">
                                    <Tooltip title="¡Haz click aquí para precargar este fondo en la caja de operaciones!">
                                        <h2 className="font-sans font-semibold text-base text-left text-gray-800 my-2" onClick={() => sendFondoSeleccionado(item.Fondo)}>{item.Fondo}</h2>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="w-1/4"></div>
                            <div className="w-1/4 flex flex-col px-2">
                                {
                                    (item.Calificacion.trim() != 'NA' && item.Calificacion.trim() != "No Aplica") && <React.Fragment>
                                        <div className="justify-self-center">
                                            <h2 className="font-sans text-xs text-center text-gray-500">{item.Calificacion.trim()}</h2>
                                        </div>
                                        <div>
                                            <h4 className="font-sans text-xxs text-center text-gray-500">Calificación</h4>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            {/*<div>
                                <h2 className="font-sans font-semibold italic text-sm text-gray-800 text-center">{famfondo}</h2>
                            </div>*/}
                            <div>
                                <h4 className="font-sans italic text-xs text-gray-800 text-center">{item.Plazo}</h4>
                            </div>
                        </div>
                        <div className="w-full pt-1 pb-3">
                            <p className="font-sans text-xs text-gray-800">{convertToAcentos(item.DescCorta)}</p>
                        </div>
                    </div>
                    <div id="parte2-video-rend">
                        <div className="flex flex-row">
                            <div className="flex flex-col w-1/2 pr-1 py-2">
                                <div className="flex flex-row w-full justify-start">
                                    <div className={"border-0 rounded-r-full p-1 w-auto flex-none justify-start " + labelBgColor}>
                                        <h4 className="font-sans font-bold text-xs text-gray-100 text-right">{famfondo.toUpperCase()}</h4>
                                    </div>
                                </div>
                                <div className="w-full py-2 h-">
                                    {
                                        linkVideoCortoYT.length > 0 ? 
                                            <iframe width="150" height="80" src={linkVideoCortoYT} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        :
                                            <p className="text-xs text-gray-100">Por el momento, no hay video disponible.</p>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 px-1 py-2">
                                <div className="flex flex-col justify-center">
                                    <h1 className="font-sans font-bold text-xl text-center text-gray-800">{Math.round((item.Rend + Number.EPSILON) * 100) / 100}%</h1>
                                    <h4 className="font-sans text-sm text-center text-gray-800">Rendimiento bruto</h4>
                                    <h4 className="font-sans text-xs text-center text-gray-500">(Últimos 12 meses)</h4>
                                </div>
                                <div className="flex flex-col mt-3">
                                    <div id="estrellas" className="flex flex-row place-self-center ml-2 mb-2">
                                        {
                                            item.EstrellasMS.length == 0 && <React.Fragment>
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                            </React.Fragment>
                                        }
                                        {
                                            item.EstrellasMS.length == 1 && <React.Fragment>
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                            </React.Fragment>
                                        }
                                        {
                                            item.EstrellasMS.length == 2 && <React.Fragment>
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                            </React.Fragment>
                                        }
                                        {
                                            item.EstrellasMS.length == 3 && <React.Fragment>
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                            </React.Fragment>
                                        }
                                        {
                                            item.EstrellasMS.length == 4 && <React.Fragment>
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-gray-350 text-sm" />
                                            </React.Fragment>
                                        }
                                        {
                                            item.EstrellasMS.length == 5 && <React.Fragment>
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                                <MdStar className="text-red-600 text-sm" />
                                            </React.Fragment>
                                        }
                                    </div>
                                    <div className="flex flex-row place-self-center ml-2">
                                        <MorningStarLogo />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="parte3-cita-nombre">
                        <div className="citaVector flex flex-row mt-2">
                            <div className="w-4/24 mr-2">
                                <div className="rounded-full h-12 w-12 p-1 bg-red-300 m-1 flex items-center justify-center">
                                    <p className="text-red-600 text-xs font-bold">{iniciales}</p>
                                </div>
                                {/*<div className="rounded-full h-14 w-14 border border-gray-800 flex items-center justify-center">
                                    <p>{iniciales}</p>
                                </div>*/}
                            </div>
                            <div className="flex flex-col w-20/24 py-2">
                                <p className="font-sans text-xs text-gray-800">“{convertToAcentos(item.GustoFondo).replaceAll("ö", "").replaceAll("ô", "").replaceAll("\"", "").replaceAll("", "").replaceAll("", "")}”</p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col self-end">
                            <p className="font-sans text-xs text-gray-500 text-right">{nombre}</p>
                            {nombre !== puesto && <p className="font-sans text-xs text-gray-500 text-right">{puesto}</p>}
                        </div>
                    </div>
                    
                </div>
            </a>
    );
 }

export default FondoCard;