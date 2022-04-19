import * as actionTypes from '../actions/actionTypes';
import { FondosVtaPutState, FondosVtaPutActions } from '../types/FondosVtaPutTypes';

const initialState: FondosVtaPutState = {
    loading: false,
    fondosVtaPutRespuesta: {
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

const fondosVtaPutReducer = ( state = initialState, action: FondosVtaPutActions ) => {
    switch(action.type){
        case actionTypes.PUT_FONDOS_VTA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_FONDOS_VTA_RECEIVE:
            return {...state, loading: false, fondosVtaPutRespuesta: action.payload.fondosVtaPutRespuesta, error: null};

        case actionTypes.PUT_FONDOS_VTA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_OPERACIONES_FONDOS:
            //console.log("reset fondosVtaPutReducer");
            return { ...initialState };
            
        default: 
            return { ...state };
    }
}

export default fondosVtaPutReducer;