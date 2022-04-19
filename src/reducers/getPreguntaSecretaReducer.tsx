import * as actionTypes from '../actions/actionTypes';
import { GetPreguntaSecretaState, GetPreguntaSecretaActions } from '../types/GetPreguntaSecretaType';

const initialState: GetPreguntaSecretaState = {
    loading: false,
    getPreguntaSecretaRespuesta: {
        ierror: 0,
        cerror: "",
        dsPreguntaSecretas: {
            catPreguntaSecreta: [],
        },
    },
    error: null,
    message: "",
    params: [],
}

const getPreguntaSecretaReducer = ( state = initialState, action: GetPreguntaSecretaActions ) => {
    switch(action.type){
        case actionTypes.GET_PREGUNTA_SECRETA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_PREGUNTA_SECRETA_RECEIVE:
            return {...state, loading: false, getPreguntaSecretaRespuesta: action.payload.getPreguntaSecretaRespuesta, error: null};

        case actionTypes.GET_PREGUNTA_SECRETA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_PREGUNTA_SECRETA:
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default getPreguntaSecretaReducer;