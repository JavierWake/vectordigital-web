import * as actionTypes from '../actions/actionTypes';
import {OperacionesDiaActions, OperacionesDiaState} from '../types/OperacionesDiaTypes';


const initialState: OperacionesDiaState = {
    loading: false,
    response: {ierror: '', cerror:'',dsOperacionesDia:{tdsOperacionesDia: []}},
    error: null,
    message: "",
    params: [],
}

const operacionesDiaReducer = ( state = initialState, action: OperacionesDiaActions ) => {
    switch(action.type){
        case actionTypes.GET_OPERACIONESDIA_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.GET_OPERACIONESDIA_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.GET_OPERACIONESDIA_ERROR:
            return { ...state, loading: false, response: {ierror: '', cerror:'',dsFechas:{tdsFechas: []}, dsMovimientos: {tdsMovimientos:[],tdsResumenEfvo:[], tdsResumenFiscal:[]}}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default operacionesDiaReducer;
