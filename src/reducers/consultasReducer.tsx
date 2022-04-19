import * as actionTypes from '../actions/actionTypes';
import {ConsultasActions, ConsultasState} from '../types/ConsultasTypes';


const initialState: ConsultasState = {
    loading: false,
    response: {ierror: '', cerror:'',dsFechas:{tdsFechas: []}, dsMovimientos: {tdsMovimientos:[],tdsResumenEfvo:[], tdsResumenFiscal:[]}},
    error: null,
    message: "",
    params: [],
}

const consultasReducer = ( state = initialState, action: ConsultasActions ) => {
    switch(action.type){
        case actionTypes.GET_CONSULTAS_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.GET_CONSULTAS_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.GET_CONSULTAS_ERROR:
            return { ...state, loading: false, response: {ierror: '', cerror:'',dsFechas:{tdsFechas: []}, dsMovimientos: {tdsMovimientos:[],tdsResumenEfvo:[], tdsResumenFiscal:[]}}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default consultasReducer;