import React from "react";
import parse from "html-react-parser";
import { connect, useDispatch } from 'react-redux';

import 'animate.css'
import '../styles/ordenRecibida.css'

import {ReactComponent as VectorTrianguloBlanco} from '../assets/Vector-triangulo-blanco.svg';
import convertToAcentos from "../utils/convertToAcentos";

import { compra } from "../actions/compraAction";
import { venta } from "../actions/ventaAction";

interface OrdenMultProps {
    tipo: string;
    mensajeAPI: string;
    respuestaApi: any;
    setOrdenRecibida: (data: boolean) => void;
}

const OrdenMultRecibida: React.FC<OrdenMultProps> = ({ tipo, mensajeAPI, respuestaApi, setOrdenRecibida }) => {

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(compra(false));
        dispatch(venta(false));
        setOrdenRecibida(false);
    }

    return (
        <div className="w-full bg-red-600 flex flex-col rounded animate__animated animate__fadeIn" style={{ height: "40rem"}}>
            
            <div className="logoBlanco justify-center flex animate__animated animate__backInUp animate__delay-1s">
                <VectorTrianguloBlanco className="w-10"/>
            </div>

            {
                mensajeAPI.length === 0 ?
                    <div className="font-bold text-base text-white text-center mb-2">
                        <p>Operaciones recibidas</p>
                    </div>
                :
                    <div className="font-bold text-base text-white text-center mb-2">
                        <p>Operaciones no satisfactorias</p>
                    </div>
            }
                  
            <div className="ticketBlanco p-3 mx-3 my-2 flex flex-col overflow-hidden rounded bg-white shadow-lg shadow-black">
                {/* <p className="font-bold text-base text-black text-center">Operaciones</p> */}
                <div className="overflow-y-auto my-3">
                {
                    respuestaApi.length !== 0 && respuestaApi.map((orden: any) => {
                        return(
                            <div>
                                <div className="tipoOrden flex flex-col py-1">
                                    <p className="text-sm">{tipo + " " + orden["tipoOrden"]}</p>
                                    <p className="text-xs text-gray-150">Tipo de Orden</p>
                                </div>
                                <div className="numFolio flex flex-col py-1">
                                    <p className="text-sm">{orden["folio"]}</p>
                                    <p className="text-xs text-gray-150">Folio</p>
                                    {
                                        orden["cerror"].length > 0 && <div className="respApi flex flex-col py-2">
                                            <p className="text-xs text-gray-500">Mensaje</p>
                                            <p className="text-sm">{parse(convertToAcentos(orden["cerror"]))}</p>
                                        </div>
                                    }
                                </div>
                                <p className="border-b border-gray-300 my-2 mx-4"></p>
                            </div>
                        )
                    })
                }       
                </div>          
                <button className="btnOrdenRecibida btnAnimacion" onClick={() => onClick()}> <span className="spanOrden" > Continuar </span> </button>               
            </div>
        </div>
    );
}

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        compra: () => dispatch(compra(dispatch)),
        venta: () => dispatch(venta(dispatch)),
    };
};

export default connect(null, mapDispatchToProps)(OrdenMultRecibida);