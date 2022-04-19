import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { connect, useDispatch } from 'react-redux';
import { putAlertasEstatusRequest } from '../actions/putAlertasEstatusAction';
import { RootState } from '../reducers/rootReducer';
import { PutAlertasEstatusState } from '../types/PutAlertasEstatusType';
import { CustomMUISwitch } from './CustomMuiSwitch';
import { BsTrash } from "react-icons/bs";
import * as apiCall from '../constants';

interface AlertaCardProps {
    descripcion: string;
    emisora: string;
    serie: string;
    fecha: string;
    tipo: string;
    estatus: boolean;
    params: string[];
    limiteInf?: string;
    limiteSup?: string;
    eliminarAlertaVolatilidad?: (tp: string, emis: string, ser: string) => void;
    eliminarAlertaEvento?: (emis: string, ser: string) => void;
    putAlertasEstatusRespuesta?: PutAlertasEstatusState;
}

const AlertaCard = ({ descripcion, fecha, tipo, limiteInf, limiteSup, emisora, serie, estatus, params, eliminarAlertaVolatilidad, eliminarAlertaEvento, putAlertasEstatusRespuesta }: AlertaCardProps) => {
    
    //const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(estatus);
    const [isLoadingPutApi, setIsLoadingPutApi] = useState(false);

    const sendIsChecked = (data: boolean) => {
        //console.log("cambiar estatus switch");
        if(data === isChecked){
            return;
        }

        //vamos a mandar llamar el api de alertas/estatus
        setIsLoadingPutApi(true);

        let urlApi = apiCall.API_CONFIGURA + "alertas/estatus?tipo=" + tipo + "&emisora=" + encodeURIComponent(emisora) + "&serie=" + encodeURIComponent(serie) + "&estatus=" + (data === true ? "true" : "false");
        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': params[0],
                'cuentasesion': params[1],
                'token': params[2],
                'id': params[3],
            },
        };

        axios.put<any>(urlApi, null, config)
            .then(respuesta => {
                /*console.log("response api alertas/estatus");
                console.log(respuesta);*/
                if(respuesta.data !== undefined){
                    if(respuesta.data.response !== undefined){
                        if(respuesta.data.response.ierror !== undefined){
                            if(respuesta.data.response.ierror === 0 || respuesta.data.response.ierror === 998){
                                setIsChecked(data);
                            }
                        }
                    }
                }
                setIsLoadingPutApi(false);
            })
            .catch(e => {
                /*console.log("error api alertas/estatus");
                console.log(e);*/
                setIsLoadingPutApi(false);
            });

        //dispatch(putAlertasEstatusRequest({message, params}));
        //setIsChecked(data);
    };

    const eliminarEvento = () => {
        if(tipo === "evento"){
            eliminarAlertaEvento && eliminarAlertaEvento(emisora, serie);
        }
        else{
            eliminarAlertaVolatilidad && eliminarAlertaVolatilidad(tipo, emisora, serie)
        }
    };

    return (
        <div className="alertaPre flex flex-row justify-between items-center hover:shadow-xl border-b border-gray-300 p-3 w-10/24 h-auto my-2 mr-3">
            <div className="w-1/3 h-auto p-2 flex flex-col justify-between">
                <p className="font-sans font-bold text-base">{descripcion}</p>
                <p className="font-sans text-sm text-gray-150">{fecha}</p>
            </div>
            <div className='flex flex-col justify-center'>
                { tipo === "variacion" && <p className="font-sans text-sm text-right">{limiteInf}% al {limiteSup}%</p> }
                { tipo === "precio" &&<p className="font-sans text-sm text-right">${limiteInf} a ${limiteSup}</p> }
                <div className='flex justify-center'>
                    <CustomMUISwitch 
                        checked={isChecked} 
                        disabled={(isLoadingPutApi === true) ? true : false}
                        sendChecked={(nuevoIsChecked: boolean) => sendIsChecked(nuevoIsChecked)} 
                    />
                </div>
                
            </div>
            <div className="flex justify-end items-center">
                <BsTrash 
                    onClick={() => eliminarEvento()} 
                    className="mx-2 text-lg text-gray-150 hover:cursor-pointer hover:text-red-600" 
                />
            </div>
        </div>
    );
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        putAlertasEstatusRespuesta: store.putAlertasEstatusRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getAlertasEventoRequest: () => dispatch(putAlertasEstatusRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertaCard);
  