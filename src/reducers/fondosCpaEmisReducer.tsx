import * as actionTypes from '../actions/actionTypes';
import { FondosCpaEmisState, FondosCpaEmisActions } from '../types/FondosCpaEmisTypes';

const initialState: FondosCpaEmisState = {
    loading: false,
    fondosCpaEmisRespuesta: {
        ierror: 0,
        cerror: "",
        dsRespuesta: {
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
    },
    error: null,
    message: "",
    params: [],
}

const fondosCpaEmisReducer = ( state = initialState, action: FondosCpaEmisActions ) => {
    //console.log(action);
    //console.log("reducer fd cpa emis");
    switch(action.type){
        case actionTypes.GET_FONDOS_CPAEMIS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_CPAEMIS_RECEIVE:
            return {...state, loading: false, fondosCpaEmisRespuesta: action.payload.fondosCpaEmisRespuesta, error: null};

        case actionTypes.GET_FONDOS_CPAEMIS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };

        case actionTypes.RESET_STATE_OPERACIONES_FONDOS:
            //console.log("reset fondosCpaEmisReducer");
            return { ...initialState };
        default: 
            return { ...state };
    }
}

export default fondosCpaEmisReducer;