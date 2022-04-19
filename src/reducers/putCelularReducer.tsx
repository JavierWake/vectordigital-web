import * as actionTypes from '../actions/actionTypes';
import { PutCelularState, PutCelularActions } from '../types/PutCelularType';

const initialState: PutCelularState = {
    loading: false,
    putCelularRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const putCelularReducer = ( state = initialState, action: PutCelularActions ) => {
    switch(action.type){
        case actionTypes.PUT_CELULAR_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_CELULAR_RECEIVE:
            return {...state, loading: false, putCelularRespuesta: action.payload.putCelularRespuesta, error: null};

        case actionTypes.PUT_CELULAR_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default putCelularReducer;