import * as actionTypes from '../actions/actionTypes';
import { Recupera_ActualizaActions, Recupera_ActualizaState } from '../types/RecuperaActualizaType';

const initialState: Recupera_ActualizaState = {
    loading: false,
    params: "",
    error: null,
    message: "",
    respuesta: {
        ierror: 0,
        cerror: "",
    },
}

const Recupera_ActualizaReducer =  ( state = initialState, action: Recupera_ActualizaActions ) => {
    switch(action.type){
        case actionTypes.POST_RECUPERA_ACTUALIZA_SEND:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_RECUPERA_ACTUALIZA_RECEIVE:
            return {...state, loading: false, error: null, respuesta: action.payload.respuesta};

        case actionTypes.POST_RECUPERA_ACTUALIZA_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}


export default Recupera_ActualizaReducer