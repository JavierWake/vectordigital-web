import * as actionTypes from '../actions/actionTypes';
import { PostPreguntaSecretaState, PostPreguntaSecretaActions } from '../types/PostPreguntaSecretaType';

const initialState: PostPreguntaSecretaState = {
    loading: false,
    postPreguntaSecretaRespuesta: {
        ierror: -1,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const postPreguntaSecretaReducer = ( state = initialState, action: PostPreguntaSecretaActions ) => {
    switch(action.type){
        case actionTypes.POST_PREGUNTA_SECRETA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_PREGUNTA_SECRETA_RECEIVE:
            return {...state, loading: false, postPreguntaSecretaRespuesta: action.payload.postPreguntaSecretaRespuesta, error: null};

        case actionTypes.POST_PREGUNTA_SECRETA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_PREGUNTA_SECRETA:
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default postPreguntaSecretaReducer;