import * as actionTypes from '../actions/actionTypes';
import {ResumenActions, ResumenStatus} from '../types/ResumenTypes';

const initialState: ResumenStatus = {
    loading: false,
    valueNum: {
        Total: 0,
        TotPortafolioCap: 0,
        TotPortafolioFd:0,
        TotPortafolioMd: 0,
        TotSaldoEfectivo: 0,
        TotOperXLiq: 0,
    },
    valuePorc: {
        PorcPortafolioCap: 0,
        PorcPortafolioFd:0,
        PorcPortafolioMd: 0,
        PorcOperXLiq: 0,
    },
    textNum: {
        sTotal: "0",
        sTotPortafolioCap: "0",
        sTotPortafolioFd:"0",
        sTotPortafolioMd: "0",
        sTotSaldoEfectivo: "0",
        sTotOperXLiq: "0",
    },
    textPorc: {
        sPorcPortafolioCap: "0",
        sPorcPortafolioFd:"0",
        sPorcPortafolioMd: "0",
        sPorcOperXLiq: "0"
    },
    ultActualizacion: "",
    error: null,
    message: "",
    params: [],
}

const resumenReducer = ( state = initialState, action: ResumenActions ) => {
    switch(action.type){
        case actionTypes.GET_RESUMEN_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_RESUMEN_RECEIVE:
            return {...state, loading: false, valueNum: action.payload.valueNum, valuePorc: action.payload.valuePorc, textNum: action.payload.textNum, textPorc: action.payload.textPorc, ultActualizacion: action.payload.ultActualizacion, error: null};

        case actionTypes.GET_RESUMEN_ERROR:
            return { ...state, loading: false, resumen: {}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default resumenReducer;