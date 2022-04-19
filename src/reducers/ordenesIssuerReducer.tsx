import * as actionTypes from '../actions/actionTypes';
import {ordenesIssuerActions, OrdenesIssuerStatus} from '../types/OrdenesIssuerTypes';

const initialState: OrdenesIssuerStatus = {
    loading: false,
    response: { ierror:0, cerror: "", dsOrdenes: { tdsOrdenesCapResponse: [] }, dsPortafolio: { tdsPortafolioCap: [] }, dsOperacionesDia: { tdsOperacionesDia: [] } },
    error: null,
    message: "",
    params: [],
}

const ordenesIssuerReducer = ( state = initialState, action: ordenesIssuerActions ) => {
    switch(action.type){
        case actionTypes.GET_ORDENES_ISSUER_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_ORDENES_ISSUER_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.GET_ORDENES_ISSUER_ERROR:
            return { ...state, loading: false, response: {ierror:0, cerror: "", dsOrdenes: { tdsOrdenesCapResponse: [] }, dsPortafolio: { tdsPortafolioCap: [] }, dsOperacionesDia: { tdsOperacionesDia: [] }}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default ordenesIssuerReducer;