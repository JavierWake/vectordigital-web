import React, { useState, useEffect } from 'react';
import { Tooltip } from '@material-ui/core';
import { IDistribucion, IDistribucionObj, IFamilias, IFondoFamDist } from '../types/FondosFamDistribucionTypes';
import getAccentColorPorFamiliaFondo from '../utils/getAccentColorsPorFondo';
import convertToAcentos from '../utils/convertToAcentos';

//State of the component
interface props {
    sendFondoSeleccionado: (data: string) => void;
    famDistObjeto: IDistribucionObj;
}

type AllProps = props;

const OfertaFondos: React.FC<AllProps> = ({sendFondoSeleccionado, famDistObjeto}) =>{

    //HOOKS 

    //estos son los bools encargados de activar los colores en las barras
    const [deudaActivado, activarDeuda] = useState(true);
    const [coberturaActivado, activarCobertura] = useState(false);
    const [rentaVariableActivado, activarRentaVariable] = useState(false);
    const [fondosEstrategicosActivado, activarFondosEstrategicos] = useState(false);

    //HOOKS - usando FamDist
    const [familiasEnDist, setFamiliasEnDist] = useState<IFamilias[]>([]);
    const [distribucionesEnDist, setDistribucionesEnDist] = useState<IDistribucion[]>([]);
    const [familiaDistSelec, setFamiliaDistSelec] = useState<IFamilias | undefined>(undefined);
    const [productosDisponiblesUnicosDist, setProductosDisponiblesUnicosDist] = useState<IFondoFamDist[]>([]);

    const sendProductosDisponiblesUnicosDist = (data: IFondoFamDist[]) => {
        if(productosDisponiblesUnicosDist === data){
            return;
        }
        setProductosDisponiblesUnicosDist(data);
    };

    const sendFamiliaDistSelec = (data: IFamilias) => {
        if(familiaDistSelec === data){
            return;
        }
        setFamiliaDistSelec(data);
    };

    const sendFamiliasEnDist = (data: IFamilias[]) => {
        if(familiasEnDist === data){
            return;
        }
        setFamiliasEnDist(data);
    };

    const sendDistribucionesEnDist = (data: IDistribucion[]) => {
        if(distribucionesEnDist === data){
            return;
        }
        setDistribucionesEnDist(data);
    };

    const sendActivarDeuda = (data: boolean) => {
        if(deudaActivado === data){
            return;
        }
        activarDeuda(data);
    };

    const sendActivarCobertura = (data: boolean) => {
        if(coberturaActivado === data){
            return;
        }
        activarCobertura(data);
    };

    const sendActivarRentaVariable = (data: boolean) => {
        if(rentaVariableActivado === data){
            return;
        }
        activarRentaVariable(data);
    };

    const sendActivarFondosEstrategicos = (data: boolean) => {
        if(fondosEstrategicosActivado === data){
            return;
        }
        activarFondosEstrategicos(data);
    };

    useEffect(() => {
        //console.log("fam dist obj OfertaFondos");
        //console.log(famDistObjeto);
        if(famDistObjeto != undefined){
            if(famDistObjeto.Distribucion != undefined){
                if(famDistObjeto.Distribucion.length > 0){
                    sendDistribucionesEnDist(famDistObjeto.Distribucion);
                }
            }
            if(famDistObjeto.Familias != undefined){
                if(famDistObjeto.Familias.length > 0){
                    sendFamiliasEnDist(famDistObjeto.Familias);
                }
            }
        }
    }, [famDistObjeto]);

    useEffect(() => {
        if(familiasEnDist.length > 0 && distribucionesEnDist.length > 0){
            //hay datos para trabajar

            let famEnDistSelecFilter: IFamilias[];
            let distribucionSelecFilter: IDistribucion[];
            
            if(deudaActivado){
                //buscamos la familia de DEUDA
                famEnDistSelecFilter = familiasEnDist.filter((familia: IFamilias) => {
                    return familia.Familia.trim() === "Deuda";
                });
                distribucionSelecFilter = distribucionesEnDist.filter((distribucion: IDistribucion) => {
                    return distribucion.Familia.trim() === "Deuda";
                });

                let productosDispDist: IFondoFamDist[] = [];

                distribucionSelecFilter.map((dist: IDistribucion) => {
                    productosDispDist.push(...dist.Fondos);
                });

                if(famEnDistSelecFilter.length > 0 && distribucionSelecFilter.length > 0){
                    //SENDs
                    sendFamiliaDistSelec(famEnDistSelecFilter[0]);
                    sendProductosDisponiblesUnicosDist(productosDispDist);
                }
            }
            else if(coberturaActivado){
                //buscamos la familia de COBERTURA
                famEnDistSelecFilter = familiasEnDist.filter((familia: IFamilias) => {
                    return familia.Familia.trim() === "Cobertura";
                });
                distribucionSelecFilter = distribucionesEnDist.filter((distribucion: IDistribucion) => {
                    return distribucion.Familia.trim() === "Cobertura";
                });

                let productosDispDist: IFondoFamDist[] = [];

                distribucionSelecFilter.map((dist: IDistribucion) => {
                    productosDispDist.push(...dist.Fondos);
                });

                if(famEnDistSelecFilter.length > 0 && distribucionSelecFilter.length > 0){
                    //SENDs
                    sendFamiliaDistSelec(famEnDistSelecFilter[0]);
                    sendProductosDisponiblesUnicosDist(productosDispDist);
                }
            }
            else if(rentaVariableActivado){
                //buscamos la familia de RENTA VARIABLE
                famEnDistSelecFilter = familiasEnDist.filter((familia: IFamilias) => {
                    return familia.Familia.trim() === "Renta Variable";
                });
                distribucionSelecFilter = distribucionesEnDist.filter((distribucion: IDistribucion) => {
                    return distribucion.Familia.trim() === "Renta Variable";
                });

                
                let productosDispDist: IFondoFamDist[] = [];

                distribucionSelecFilter.map((dist: IDistribucion) => {
                    productosDispDist.push(...dist.Fondos);
                });

                if(famEnDistSelecFilter.length > 0 && distribucionSelecFilter.length > 0){
                    //SENDs
                    sendFamiliaDistSelec(famEnDistSelecFilter[0]);
                    sendProductosDisponiblesUnicosDist(productosDispDist);
                }
            }
            else if(fondosEstrategicosActivado){
                //buscamos la familia de FONDOS ESTRATEGICOS
                famEnDistSelecFilter = familiasEnDist.filter((familia: IFamilias) => {
                    return familia.Familia.trim() === "Fondos Estrategicos";
                });
                distribucionSelecFilter = distribucionesEnDist.filter((distribucion: IDistribucion) => {
                    return distribucion.Familia.trim() === "Fondos Estrategicos";
                });

                
                let productosDispDist: IFondoFamDist[] = [];

                distribucionSelecFilter.map((dist: IDistribucion) => {
                    productosDispDist.push(...dist.Fondos);
                });

                if(famEnDistSelecFilter.length > 0 && distribucionSelecFilter.length > 0){
                    //SENDs
                    sendFamiliaDistSelec(famEnDistSelecFilter[0]);
                    sendProductosDisponiblesUnicosDist(productosDispDist);
                }
            }
            else {
                //por alguna razon no esta activada ninguna familia, activamos DEUDA y ponemos datos de DEUDA
                //buscamos la familia de FONDOS ESTRATEGICOS
                famEnDistSelecFilter = familiasEnDist.filter((familia: IFamilias) => {
                    return familia.Familia.trim() === "Fondos Estrategicos";
                });
                distribucionSelecFilter = distribucionesEnDist.filter((distribucion: IDistribucion) => {
                    return distribucion.Familia.trim() === "Fondos Estrategicos";
                });

                
                let productosDispDist: IFondoFamDist[] = [];

                distribucionSelecFilter.map((dist: IDistribucion) => {
                    productosDispDist.push(...dist.Fondos);
                });

                if(famEnDistSelecFilter.length > 0 && distribucionSelecFilter.length > 0){
                    //SENDs
                    sendFamiliaDistSelec(famEnDistSelecFilter[0]);
                    sendProductosDisponiblesUnicosDist(productosDispDist);
                }
            }

        }//if lengths
    }, [
        familiasEnDist, 
        distribucionesEnDist, 
        /* cuando cambia alguna de las secciones de este componente */
        deudaActivado, 
        coberturaActivado, 
        rentaVariableActivado, 
        fondosEstrategicosActivado,
    ]);

    //COLORES LIGHT Y DARK PARA CADA SECCION
    let deudaColorLight: string = "purple-850";
    let deudaColorDark: string = "purple-900";
    let deudaColorTexto: string = "purple-900";
    let coberturaColorLight: string = "green-150";
    let coberturaColorDark: string = "green-200";
    let coberturaColorTexto: string = "green-200";
    let rentaVariableColorLight: string = "green-250";
    let rentaVariableColorDark: string = "green-300";
    let rentaVariableColorTexto: string = "green-300";
    let fondosEstrategicosColorLight: string = "red-550";
    let fondosEstrategicosColorDark: string = "red-600";
    let fondosEstrategicosColorTexto: string = "red-600";

    let tituloColor: string = "purple-900";

    const colorLightDesactivado: string = "gray-650";
    const colorDarkDesactivado: string = "gray-350";
    const colorTextoDesactivado: string = "gray-150";

    //ACTIVAR COLORES SEGUN FAM ACTIVADA
    if(deudaActivado){
        const deudaColores = getAccentColorPorFamiliaFondo("Deuda");
        tituloColor = deudaColores.darkColor;

        deudaColorLight = deudaColores.lightColor;
        deudaColorDark = deudaColores.darkColor;
        deudaColorTexto = deudaColores.darkColor;

        coberturaColorLight = colorLightDesactivado;
        coberturaColorDark = colorDarkDesactivado;
        coberturaColorTexto = colorTextoDesactivado;

        rentaVariableColorLight = colorLightDesactivado;
        rentaVariableColorDark = colorDarkDesactivado;
        rentaVariableColorTexto = colorTextoDesactivado;

        fondosEstrategicosColorLight = colorLightDesactivado;
        fondosEstrategicosColorDark = colorDarkDesactivado;
        fondosEstrategicosColorTexto = colorTextoDesactivado;

    }
    else if(coberturaActivado){
        const coberturaColores = getAccentColorPorFamiliaFondo("Cobertura");
        tituloColor = coberturaColores.darkColor;

        deudaColorLight = colorLightDesactivado;
        deudaColorDark = colorDarkDesactivado;
        deudaColorTexto = colorTextoDesactivado;

        coberturaColorLight = coberturaColores.lightColor;
        coberturaColorDark = coberturaColores.darkColor;
        coberturaColorTexto = coberturaColores.darkColor;

        rentaVariableColorLight = colorLightDesactivado;
        rentaVariableColorDark = colorDarkDesactivado;
        rentaVariableColorTexto = colorTextoDesactivado;

        fondosEstrategicosColorLight = colorLightDesactivado;
        fondosEstrategicosColorDark = colorDarkDesactivado;
        fondosEstrategicosColorTexto = colorTextoDesactivado;
    }
    else if(rentaVariableActivado){
        const rentaVariableColores = getAccentColorPorFamiliaFondo("Renta Variable");
        tituloColor = rentaVariableColores.darkColor;

        deudaColorLight = colorLightDesactivado;
        deudaColorDark = colorDarkDesactivado;
        deudaColorTexto = colorTextoDesactivado;

        coberturaColorLight = colorLightDesactivado;
        coberturaColorDark = colorDarkDesactivado;
        coberturaColorTexto = colorTextoDesactivado;

        rentaVariableColorLight = rentaVariableColores.lightColor;
        rentaVariableColorDark = rentaVariableColores.darkColor;
        rentaVariableColorTexto = rentaVariableColores.darkColor;
        
        fondosEstrategicosColorLight = colorLightDesactivado;
        fondosEstrategicosColorDark = colorDarkDesactivado;
        fondosEstrategicosColorTexto = colorTextoDesactivado;

    }
    else if(fondosEstrategicosActivado){
        const fondosEstrategicosColores = getAccentColorPorFamiliaFondo("Fondos Estratégicos");
        tituloColor = fondosEstrategicosColores.darkColor;

        deudaColorLight = colorLightDesactivado;
        deudaColorDark = colorDarkDesactivado;
        deudaColorTexto = colorTextoDesactivado;

        coberturaColorLight = colorLightDesactivado;
        coberturaColorDark = colorDarkDesactivado;
        coberturaColorTexto = colorTextoDesactivado; 

        rentaVariableColorLight = colorLightDesactivado;
        rentaVariableColorDark = colorDarkDesactivado;
        rentaVariableColorTexto = colorTextoDesactivado;

        fondosEstrategicosColorLight = fondosEstrategicosColores.lightColor;
        fondosEstrategicosColorDark = fondosEstrategicosColores.darkColor;
        fondosEstrategicosColorTexto = fondosEstrategicosColores.darkColor;
        
    }

    let graficaDistribucionesComponte = (
        <div></div>
    );

    if(distribucionesEnDist.length > 0){
        let widthDe24: number = 24; // este es el num de width total

        graficaDistribucionesComponte = (
            <div className="nuevaGraficaDist flex flex-row w-full py-1">
                <div className="h-full flex flex-col justify-center">
                    <p className="transform -rotate-90 py-4 text-center">Volatilidad</p>
                </div>
                <div className="flex flex-col">
                    <div className="border-dashed border-l border-b border-gray-350 w-full p-2">
                        <div className="barras flex flex-col w-full">
                            {
                                distribucionesEnDist.length > 0 && distribucionesEnDist.map((dist: IDistribucion) => {
                                    const splitFondosDesc = dist.FondosDesc.split(",");
                                    const newFondosDesc = splitFondosDesc.join(", ");
                                    
                                    const widthDeLaBarra: string = "w-" + widthDe24.toString() + "/24";

                                    widthDe24--;

                                    let colorLight: string = "";
                                    let colorDark: string = "";
                                    let colorTexto: string = "";
                                    switch(dist.Familia.trim()){
                                        case "Deuda":
                                            colorLight = deudaColorLight;
                                            colorDark = deudaColorDark;
                                            colorTexto = deudaColorTexto;
                                            break;
                                        case "Renta Variable":
                                            colorLight = rentaVariableColorLight;
                                            colorDark = rentaVariableColorDark;
                                            colorTexto = rentaVariableColorTexto;
                                            break;
                                        case "Cobertura":
                                            colorLight = coberturaColorLight;
                                            colorDark = coberturaColorDark;
                                            colorTexto = coberturaColorTexto;
                                            break;
                                        case "Fondos Estrategicos":
                                            colorLight = fondosEstrategicosColorLight;
                                            colorDark = fondosEstrategicosColorDark;
                                            colorTexto = fondosEstrategicosColorTexto;
                                            break;
                                        default:
                                            colorLight = deudaColorLight;
                                            colorDark = deudaColorDark;
                                            colorTexto = deudaColorTexto;
                                            break;
                                    }

                                    return (
                                        <div key={dist.FondosDesc + colorDark} className={widthDeLaBarra + " p-1 m-1 border-l-4 rounded-r-md border-" + colorDark + " bg-" + colorLight}>
                                            <h3 className={"p-1 text-sm font-bold text-" + colorTexto}>{newFondosDesc}</h3>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <p className="py-2 text-center">Horizonte</p>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="w-full flex flex-col">
            <div className="botones w-2/3 p-1 flex flex-row justify-between space-x-4">
                <div className="btnDeuda flex flex-row px-1 pt-1 rounded cursor-pointer border-purple-900 border-l-4"
                    onClick={() => {
                        sendActivarDeuda(true);
                        sendActivarCobertura(false);
                        sendActivarRentaVariable(false);
                        sendActivarFondosEstrategicos(false);
                    }}
                >
                    <div className={"text-xs ml-2 pb-1 " + (deudaActivado ? "border-purple-900 border-b-2 font-bold" : "font-medium")}>Deuda</div>
                </div>
                <div className="btnCobertura flex flex-row px-1 pt-1 rounded cursor-pointer border-green-200 border-l-4"
                    onClick={() => {
                        sendActivarDeuda(false);
                        sendActivarCobertura(true);
                        sendActivarRentaVariable(false);
                        sendActivarFondosEstrategicos(false);
                    }}
                >
                    <div className={"text-xs ml-2 pb-1 " + (coberturaActivado ? "border-green-200 border-b-2 font-bold" : "font-medium")}>Cobertura</div>
                </div>
                <div className="btnRentaVariable flex flex-row px-1 pt-1 rounded cursor-pointer border-green-300 border-l-4"
                    onClick={() => {
                        sendActivarDeuda(false);
                        sendActivarCobertura(false);
                        sendActivarRentaVariable(true);
                        sendActivarFondosEstrategicos(false);
                    }}
                >
                    <div className={"text-xs ml-2 pb-1 " + (rentaVariableActivado ? "border-green-300 border-b-2 font-bold" : "font-medium")}>Renta Variable</div>
                </div>
                <div className="btnFondosEstr flex flex-row px-1 pt-1 rounded cursor-pointer border-red-600 border-l-4"
                    onClick={() => {
                        sendActivarDeuda(false);
                        sendActivarCobertura(false);
                        sendActivarRentaVariable(false);
                        sendActivarFondosEstrategicos(true);
                    }}
                >
                    <div className={"text-xs ml-2 pb-1 " + (fondosEstrategicosActivado ? "border-red-600 border-b-2 font-bold" : "font-medium")}>Fondos Estratégicos</div>
                </div>
            </div>
            <div className="graficaYProdDisp flex flex-row w-full">
                <div className="descGrafica flex flex-col w-2/3 p-1">
                    <div className="nombreCategoria">
                        {
                            familiaDistSelec != undefined && <h1 className={"py-2 text-base font-bold text-" + tituloColor}>{convertToAcentos(familiaDistSelec.Familia)}</h1>
                        }
                    </div>
                    <div className="descripcion p-2">
                        {
                            familiaDistSelec != undefined && <p className="text-sm font-sans text-gray-800">{convertToAcentos(familiaDistSelec.FamiliaDesc)}</p>
                        }
                    </div>
                    {graficaDistribucionesComponte}
                </div>
                <div className="listaFondos w-1/3 h-full flex flex-col p-2">
                    
                    <div className="listaProductosDisponibles h-521 overflow-y-auto mt-24 flex flex-col pr-2 items-center">
                        {
                            productosDisponiblesUnicosDist.length > 0 && productosDisponiblesUnicosDist.map(function(r: IFondoFamDist){
                                return (
                                    <a key={r.Fondo} href={r.Link.length === 0 ? "#" : r.Link} target={r.Link.length === 0 ? "" : "_blank"} 
                                        className="w-22/24 flex flex-col border-b-2 m-2 hover:shadow-xl p-2">
                                        <Tooltip title="¡Haz click aquí para precargar este fondo en la caja de operaciones!">
                                            <h1 className="font-sans text-base text-gray-900 pb-1 text-center" onClick={() => sendFondoSeleccionado(r.Fondo)}>{r.Fondo}</h1>
                                        </Tooltip>
                                        <p className="font-sans text-sm text-gray-350 pb-3">{r.FondosDesc}</p>
                                        {
                                            familiaDistSelec != undefined && <p className={"font-sans text-center text-sm text-gray-500"}>{convertToAcentos(familiaDistSelec.Familia)}</p>
                                        }
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
 }

export default OfertaFondos;