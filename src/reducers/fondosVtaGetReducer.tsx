import * as actionTypes from '../actions/actionTypes';
import { FondosVtaGetState, FondosVtaGetActions } from '../types/FondosVtaGetTypes';

const initialState: FondosVtaGetState = {
    loading: false,
    fondosVtaGetRespuesta: {
        ierror: 0,
        cerror: "",
        dsRespuesta: {
            tdsTradeData: [
                /*{
                    Descripcion: "",
                    Emisora: "",
                    Serie: "",
                    Precio: 0,
                    Posicion: 0,
                    PosicionT: 0,
                    Grafica: "",
                    MontoMaximoT: 0,
                    MontoMaximo: 0,
                    FechaOper: "",
                    FechaIng: "",
                    FechaLiq: "",
                    Horario: 0,
                    Operacion: "",
                    Monto: 0,
                    TotalTrade: 0,
                    Titulos: 0,
                    ErrorCd: 0,
                    Mensaje: "",
                    MensajeTrade: "",
                    CteEsp: false,
                    tieneFlijos: false,
                    Folio: 0,
                },*/
            ],
        },
    },
    error: null,
    message: "",
    params: [],
}

const fondosVtaGetReducer = ( state = initialState, action: FondosVtaGetActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_VTA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_VTA_RECEIVE:
            return {...state, loading: false, fondosVtaGetRespuesta: action.payload.fondosVtaGetRespuesta, error: null};

        case actionTypes.GET_FONDOS_VTA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_OPERACIONES_FONDOS:
            //console.log("reset fondosVtaGetReducer");
            return { ...initialState };
        
        default: 
            return { ...state };
    }
}

export default fondosVtaGetReducer;