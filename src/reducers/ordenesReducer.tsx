import * as actionTypes from '../actions/actionTypes';
import {dsOrdenesActions, OrdenesStatus} from '../types/OrdenesTypes';

const initialState: OrdenesStatus = {
    loading: false,
    tdsOrdenesFd: [],
    tdsOrdenesCap: [],
    tdsOrdenesEstado: [
        {
            estatusFI: false,
            ResponseFI: "",
            estatusCap: false,
            ResponseCap: "",
            estatusMD: false,
            ResponseMD: "",
        }
    ],
    error: null,
    message: "",
    params: [],
}

const ordenesReducer = ( state = initialState, action: dsOrdenesActions ) => {
    switch(action.type){
        case actionTypes.GET_ORDENES_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_ORDENES_RECEIVE:
            return {...state, loading: false, tdsOrdenesFd: action.payload.tdsOrdenesFd, tdsOrdenesCap: action.payload.tdsOrdenesCap, tdsOrdenesEstado: action.payload.tdsOrdenesEstado, error: null};

        case actionTypes.GET_ORDENES_ERROR:
            return { ...state, loading: false, tdsOrdenesFd: [], tdsOrdenesCap: [], error: action.payload.error };
        
        case actionTypes.RESET_STATE_GET_ORDENES:
            //console.log("estado ordenes reseteado en reducer");
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default ordenesReducer;