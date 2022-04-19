import React from 'react';
import { Emisora } from '../types/GetCatalogoListaEmisorasType';
import { IMoversData } from '../types/MoversType';
import { IndicesArray } from '../types/CommoditiesType';
import { CustomMUITooltip, TooltipTitleContent } from './CustomMuiTooltip';

export interface EmisoraConMover {
    tipo: string;
    emisora: Emisora;
    mover: IMoversData;
}

export interface ElementoConMiniGrafico {
    elemento: EmisoraConMover |IndicesArray;
    srcMiniGrafico: string;
    componenteMiniGrafico: any;
}

//EmisoraTickerBox
interface sentEmisoraProps {
    emisora: EmisoraConMover;
    srcMiniGrafico: string;
    componenteMiniGrafico: any;
}

type AllEmisoraProps = sentEmisoraProps;

const EmisoraTickerBox: React.FC<AllEmisoraProps> = ({emisora, srcMiniGrafico, componenteMiniGrafico}) => {
    return (
        <div className="h-full flex flex-row px-1">
            <div className="flex flex-col mx-2">
                <div className="flex flex-col w-full">
                    <div className="nombreEmisora pb-1 h-8">
                        <CustomMUITooltip 
                            title={<TooltipTitleContent contentText={emisora.emisora.CommonName} />}
                            //placement="bottom-start"
                            arrow
                        >
                            <h1 className="text-red-600 font-semibold text-sm">
                                {emisora.emisora.Emisora + "." + emisora.emisora.Serie}
                            </h1>
                        </CustomMUITooltip>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="datos my-1 flex flex-row w-full justify-between">
                        <div className="valorNegro pr-2">
                            <h2 className="text-xs text-gray-800 font-bold">
                                {Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(emisora.mover.precioactual)}
                            </h2>
                        </div>
                        { 
                            emisora.mover.ptjevar >= 0 
                            ?
                            <div className="valoresVerdes">
                                <h2 className="text-xs text-green">
                                    {emisora.mover.ptjevar}%
                                </h2>
                            </div>
                            :
                            <div className="valoresRojos">
                                <h2 className="text-xs text-red-100">
                                    {emisora.mover.ptjevar}%
                                </h2>
                            </div>
                        }
                    </div>
                    <div className="miniGraf w-full justify-center">
                        {
                            srcMiniGrafico && srcMiniGrafico.startsWith("ND") ? 
                                <div>
                                    {/*<p>No hay src.</p>*/}
                                </div>
                            :
                                <div>
                                    {componenteMiniGrafico}
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="h-3/4 solid border-r border-gray-350 ml-1" />
            </div>
        </div>
    );
};
//------------------------

//IndiceTickerBox
interface sentIndiceProps {
    indice: IndicesArray;
    srcMiniGrafico: string;
    componenteMiniGrafico: any;
}

type AllIndiceProps = sentIndiceProps;

const IndiceTickerBox: React.FC<AllIndiceProps> = ({indice, srcMiniGrafico, componenteMiniGrafico}) => {
    return (
        <div className="h-full flex flex-row px-1">
            <div className="flex flex-col mx-2">
                <div className="flex flex-col w-full">
                    <div className="nombreIndice pb-1 h-8">
                        <CustomMUITooltip 
                            title={<TooltipTitleContent contentText={indice.completeName} />}
                            //placement="bottom-start"
                            arrow
                        >
                            <h1 className="text-red-600 font-semibold text-sm">
                                {indice.name}
                            </h1>
                        </CustomMUITooltip>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="datos my-1 flex flex-row w-full justify-between">
                        <div className="valorNegro pr-2">
                            <h2 className="text-xs text-gray-800 font-semibold">
                                {indice.precio}
                            </h2>
                        </div>
                        { 
                            indice.variacion.toString().startsWith("-") ?
                                <div className="valoresVerdes">
                                    <h2 className="text-xs text-red-100">
                                        {indice.descVariacion}
                                    </h2>
                                </div>
                            :
                                <div className="valoresRojos">
                                    <h2 className="text-xs text-green">
                                        {indice.descVariacion}
                                    </h2>
                                </div>
                        }  
                    </div>
                    <div className="miniGraf w-full justify-center">
                        {
                            srcMiniGrafico && srcMiniGrafico.startsWith("ND") ? 
                                <div>
                                    {/*<p>No hay src.</p>*/}
                                </div>
                            :
                                <div>
                                    {componenteMiniGrafico}
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="h-3/4 solid border-r border-gray-350 ml-1" />
            </div>
        </div>
    );
};
//------------------------


interface sentProps {
    elemento: ElementoConMiniGrafico
}

type AllProps = sentProps;

const TickerBox: React.FC<AllProps> = ({elemento}) => {

    if(elemento == undefined){
        return (
            <div className="p-2">
                {/*<p>Elemento es undefined.</p>*/}
            </div>
        );
    }

    if((elemento.elemento as EmisoraConMover).tipo !== undefined){
        if((elemento.elemento as EmisoraConMover).tipo.toLowerCase() === "emisoraconmover"){
            //si entra al if, el elemento es una emisora
            return (
                <EmisoraTickerBox emisora={(elemento.elemento as EmisoraConMover)} srcMiniGrafico={elemento.srcMiniGrafico} componenteMiniGrafico={elemento.componenteMiniGrafico} />
            );
        }
        else {
            //si entra al if, el elemento es un Indice
            return (
                <IndiceTickerBox indice={(elemento.elemento as IndicesArray)} srcMiniGrafico={elemento.srcMiniGrafico} componenteMiniGrafico={elemento.componenteMiniGrafico} />
            );
        }
    }
    else {
        //si entra al if, el elemento es un Indice
        return (
            <IndiceTickerBox indice={(elemento.elemento as IndicesArray)} srcMiniGrafico={elemento.srcMiniGrafico} componenteMiniGrafico={elemento.componenteMiniGrafico} />
        );
    }
};

export default TickerBox;
