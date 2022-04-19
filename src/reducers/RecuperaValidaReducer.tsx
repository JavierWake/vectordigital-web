import * as actionTypes from '../actions/actionTypes';
import { Recupera_ValidaActions, Recupera_ValidaState } from '../types/RecuperaValidaTypes';

const initialState: Recupera_ValidaState = {
    loading: false,
    params: "",
    error: null,
    message: "",
    respuesta: {
        ierror: 0,
        cerror: "",
    },
}

const Recupera_ValidaReducer =  ( state = initialState, action: Recupera_ValidaActions ) => {
    switch(action.type){
        case actionTypes.POST_RECUPERA_VALIDA_SEND:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_RECUPERA_VALIDA_RECEIVE:
            return {...state, loading: false, error: null, respuesta: action.payload.respuesta};

        case actionTypes.POST_RECUPERA_VALIDA_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}


export default Recupera_ValidaReducer