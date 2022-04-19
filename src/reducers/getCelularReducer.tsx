import * as actionTypes from '../actions/actionTypes';
import { GetCelularState, GetCelularActions } from '../types/GetCelularType';

const initialState: GetCelularState = {
    loading: false,
    getCelularRespuesta: {
        ierror: 0,
        cerror: "",
        confirmado: false,
        celular: "",
        ostype: "",
        maskcelular: "",
    },
    error: null,
    message: "",
    params: [],
}

const getCelularReducer = ( state = initialState, action: GetCelularActions ) => {
    switch(action.type){
        case actionTypes.GET_CELULAR_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_CELULAR_RECEIVE:
            return {...state, loading: false, getCelularRespuesta: action.payload.getCelularRespuesta, error: null};

        case actionTypes.GET_CELULAR_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getCelularReducer;