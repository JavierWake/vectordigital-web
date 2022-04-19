import * as actionTypes from '../actions/actionTypes';
import { GetRetiroInfoState, GetRetiroInfoActions } from '../types/GetRetiroInfoType';

const initialState: GetRetiroInfoState = {
    loading: false,
    retiroInfoRespuesta: {
        ierror: 0,
        cerror: "",
        dsTradeData: {
            tdsTradeData: [
                {
                    SaldoActual: 0,
                    SaldoCapCpa: 0,
                    saldo: 0,
                    hroperacion: "",
                    tieneFlujos: false,
                },
            ],
            tdsChequeras: [
                {
                    titular: 0,
                    titularNombre: "",
                    banco: "",
                    chequera: "",
                }
            ],
        },
    },
    error: null,
    message: "",
    params: [],
}

const getRetiroInfoReducer = ( state = initialState, action: GetRetiroInfoActions ) => {
    switch(action.type){
        case actionTypes.GET_RETIRO_INFO_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_RETIRO_INFO_RECEIVE:
            return {...state, loading: false, retiroInfoRespuesta: action.payload.retiroInfoRespuesta, error: null};

        case actionTypes.GET_RETIRO_INFO_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE:
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default getRetiroInfoReducer;