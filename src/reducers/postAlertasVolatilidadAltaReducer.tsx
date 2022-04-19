import * as actionTypes from '../actions/actionTypes';
import { PostAlertasVolatilidadAltaState, PostAlertasVolatilidadAltaActions } from '../types/PostAlertasVolatilidadAltaType';

const initialState: PostAlertasVolatilidadAltaState = {
    loading: false,
    postAlertasVolatilidadAltaRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const postAlertasVolatilidadAltaReducer = ( state = initialState, action: PostAlertasVolatilidadAltaActions ) => {
    switch(action.type){
        case actionTypes.POST_ALERTAS_VOLATILIDAD_ALTA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_ALERTAS_VOLATILIDAD_ALTA_RECEIVE:
            return {...state, loading: false, postAlertasVolatilidadAltaRespuesta: action.payload.postAlertasVolatilidadAltaRespuesta, error: null};

        case actionTypes.POST_ALERTAS_VOLATILIDAD_ALTA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postAlertasVolatilidadAltaReducer;