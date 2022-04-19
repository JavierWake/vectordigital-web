import * as actionTypes from '../actions/actionTypes';
import { PutCelularReenviaState, PutCelularReenviaActions } from '../types/PutCelularReenviaType';

const initialState: PutCelularReenviaState = {
    loading: false,
    putCelularReenviaRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const putCelularReenviaReducer = ( state = initialState, action: PutCelularReenviaActions ) => {
    switch(action.type){
        case actionTypes.PUT_CELULAR_REENVIA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_CELULAR_REENVIA_RECEIVE:
            return {...state, loading: false, putCelularReenviaRespuesta: action.payload.putCelularReenviaRespuesta, error: null};

        case actionTypes.PUT_CELULAR_REENVIA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default putCelularReenviaReducer;