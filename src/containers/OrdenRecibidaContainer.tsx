import React from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import 'animate.css'
import '../styles/ordenRecibida.css'

import {ReactComponent as VectorTrianguloBlanco} from '../assets/Vector-triangulo-blanco.svg';
import convertToAcentos from "../utils/convertToAcentos";

interface OperationsProps {
    folio: string;
    tipoOrden: string;
    respuestaApi: string;
    setOrdenRecibida: (data: boolean) => void;
}

const OrdenRecibidaContainer: React.FC<OperationsProps> = ({ folio, tipoOrden, respuestaApi, setOrdenRecibida }) => {

    
    return (
        <div className="w-full h-521 bg-red-600 flex flex-col rounded animate__animated animate__fadeIn">
            
            <div className="logoBlanco my-4 justify-center flex animate__animated animate__backInUp animate__delay-1s">
                <VectorTrianguloBlanco className="w-20"/>
            </div>

            <div className="font-bold text-lg text-white text-center mb-2">
                <p>Orden recibida</p>
            </div>
                  
            <div className="ticketBlanco p-3 mx-3 my-2 flex flex-col overflow-hidden rounded bg-white shadow-lg shadow-black">

                <p className="font-bold text-base text-black text-center">Operaciones</p>
                <div className="tipoOrden flex flex-col py-1">
                    <p className="text-sm">Tipo de Orden</p>
                    <p className="text-xs text-gray-150">{tipoOrden}</p>
                </div>
                <div className="numFolio flex flex-col py-1 mb-4">
                    <p className="text-sm">Folio</p>
                    <p className="text-xs text-gray-150">{folio}</p>

                        {
                    respuestaApi.length > 0 && <div className="respApi flex flex-col py-1">
                        <p className="text-sm">Mensaje</p>
                        <p className="text-xs">{parse(convertToAcentos(respuestaApi))}</p>
                    </div>
                        }
                </div>
                 
                
                    <button className="btnOrdenRecibida btnAnimacion" onClick={() => setOrdenRecibida(false)}> <span className="spanOrden" > Continuar </span> </button>
               
            </div>
        </div>
    );
}


export default OrdenRecibidaContainer;