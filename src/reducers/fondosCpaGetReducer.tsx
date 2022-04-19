import * as actionTypes from '../actions/actionTypes';
import { FondosCpaGetState, FondosCpaGetActions } from '../types/FondosCpaGetTypes';

const initialState: FondosCpaGetState = {
    loading: false,
    fondosCpaGetRespuesta: {
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

const fondosCpaGetReducer = ( state = initialState, action: FondosCpaGetActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_CPA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_CPA_RECEIVE:
            return {...state, loading: false, fondosCpaGetRespuesta: action.payload.fondosCpaGetRespuesta, error: null};

        case actionTypes.GET_FONDOS_CPA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_OPERACIONES_FONDOS:
            //console.log("reset fondosCpaGetReducer");
            return { ...initialState };
            
        default: 
            return { ...state };
    }
}

export default fondosCpaGetReducer;