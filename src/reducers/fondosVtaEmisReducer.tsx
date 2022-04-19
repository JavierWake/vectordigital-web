import * as actionTypes from '../actions/actionTypes';
import { FondosVtaEmisState, FondosVtaEmisActions } from '../types/FondosVtaEmisTypes';

const initialState: FondosVtaEmisState = {
    loading: false,
    fondosVtaEmisRespuesta: {
        tdsConfig: [
            /*{
                horariooperacion: "",
                operaFlujos: "",
                saldo: 0,
            },*/
        ],
        tdsEmisoras: [
            /*{
                Emisora: "",
                Serie: "",
                Descripcion: "",
                IdFamilia: 0,
                TipoRent: "",
                Precio: 0,
                Posicion: 0,
                PosicionT: 0,
                MontoMaximo: 0,
                MontoMaximoT: 0,
                MontoMaximoV: 0,
                MontoMaximoVT: 0,
                Operacion: "",
                Monto: 0,
                FechaIng: "",
                Titulos: 0,
                Total: 0,
                Folio: 0,
                Mensaje: "",
                Horario: "",
                HorarioCierreV: "",
                FechaOper: "",
                FechaLIQ: "",
                RF: false,
                CteEsp: false,
            }*/
        ],
    },
    error: null,
    message: "",
    params: [],
}

const fondosVtaEmisReducer = ( state = initialState, action: FondosVtaEmisActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_VTAEMIS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_VTAEMIS_RECEIVE:
            return {...state, loading: false, fondosVtaEmisRespuesta: action.payload.fondosVtaEmisRespuesta, error: null};

        case actionTypes.GET_FONDOS_VTAEMIS_ERROR:
            return { ...state, loading: false, fondosVtaEmisRespuesta: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default fondosVtaEmisReducer;