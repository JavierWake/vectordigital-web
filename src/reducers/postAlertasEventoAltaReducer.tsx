import * as actionTypes from '../actions/actionTypes';
import { PostAlertasEventoAltaState, PostAlertasEventoAltaActions } from '../types/PostAlertasEventoAltaType';

const initialState: PostAlertasEventoAltaState = {
    loading: false,
    postAlertasEventoAltaRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const postAlertasEventoAltaReducer = ( state = initialState, action: PostAlertasEventoAltaActions ) => {
    switch(action.type){
        case actionTypes.POST_ALERTAS_EVENTO_ALTA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_ALERTAS_EVENTO_ALTA_RECEIVE:
            return {...state, loading: false, postAlertasEventoAltaRespuesta: action.payload.postAlertasEventoAltaRespuesta, error: null};

        case actionTypes.POST_ALERTAS_EVENTO_ALTA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postAlertasEventoAltaReducer;