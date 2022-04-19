import * as actionTypes from '../actions/actionTypes';
import { FondosCpaPutState, FondosCpaPutActions } from '../types/FondosCpaPutTypes';

const initialState: FondosCpaPutState = {
    loading: false,
    fondosCpaPutRespuesta: {
        ierror: 0,
        cerror: "",
        deRespuesta: {
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

const fondosCpaPutReducer = ( state = initialState, action: FondosCpaPutActions ) => {
    switch(action.type){
        case actionTypes.PUT_FONDOS_CPA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_FONDOS_CPA_RECEIVE:
            return {...state, loading: false, fondosCpaPutRespuesta: action.payload.fondosCpaPutRespuesta, error: null};

        case actionTypes.PUT_FONDOS_CPA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
                
        case actionTypes.RESET_STATE_OPERACIONES_FONDOS:
            //console.log("reset fondosCpaPutReducer");
            return { ...initialState };
            
        default: 
            return { ...state };
    }
}

export default fondosCpaPutReducer;