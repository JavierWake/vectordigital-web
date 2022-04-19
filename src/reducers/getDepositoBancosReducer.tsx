import * as actionTypes from '../actions/actionTypes';
import { GetDepositoBancosState, GetDepositoBancosActions } from '../types/GetDepositoBancosType';

const initialState: GetDepositoBancosState = {
    loading: false,
    depositoBancosRespuesta: {
        ierror: 0,
        cerror: "",
        dsDeposito: {
            tdsTradeData: [
                {
                    saldo: 0,
                    hroperacion: "",
                    clabe: "",
                },
            ],
            tdsBancos: [
                {
                    Banco: 0,
                    Nombre: "",
                }
            ],
            tdsBancosChequera: [
                {
                    Banco: 0,
                    Nombre: "",
                    Chequera: "",
                }
            ],
        },
    },
    error: null,
    message: "",
    params: [],
}

const getDepositoBancosReducer = ( state = initialState, action: GetDepositoBancosActions ) => {
    switch(action.type){
        case actionTypes.GET_DEPOSITO_BANCOS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_DEPOSITO_BANCOS_RECEIVE:
            return {...state, loading: false, depositoBancosRespuesta: action.payload.depositoBancosRespuesta, error: null};

        case actionTypes.GET_DEPOSITO_BANCOS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getDepositoBancosReducer;