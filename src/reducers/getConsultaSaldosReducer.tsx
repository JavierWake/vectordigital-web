import * as actionTypes from '../actions/actionTypes';
import { GetConsultaSaldosState, GetConsultaSaldosActions } from '../types/GetConsultaSaldosType';

const initialState: GetConsultaSaldosState = {
    loading: false,
    consultaSaldosRespuesta: {
        ierror: 0,
        cerror: "",
        dsSaldos: {
            tdsSaldoEfectivo: [
                {
                    cuenta: 0,
                    nombre: "",
                    numprom: "",
                    saldo: 0,
                    saldo24: 0,
                    saldo48: 0,
                    saldo72: 0,
                    Fsaldo: "",
                    Fsaldo24: "",
                    Fsaldo48: "",
                    Fsaldo72: "",
                    suma: 0,
                },
            ],
            tdsCapCpa: [
                {
                    cuenta: 0,
                    esquema: "",
                    saldo: 0,
                }
            ],
        },
    },
    error: null,
    message: "",
    params: [],
}

const getConsultaSaldosReducer = ( state = initialState, action: GetConsultaSaldosActions ) => {
    switch(action.type){
        case actionTypes.GET_CONSULTA_SALDOS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_CONSULTA_SALDOS_RECEIVE:
            return {...state, loading: false, consultaSaldosRespuesta: action.payload.consultaSaldosRespuesta, error: null};

        case actionTypes.GET_CONSULTA_SALDOS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getConsultaSaldosReducer;