import * as actionTypes from '../actions/actionTypes';
import {PostResumenMercadoActions, PostResumenMercadoState} from '../types/PostResumenMercadoType';

const initialState: PostResumenMercadoState = {
    loading: false,
    response: {
        ierror: null,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
    data: [],
}

const postResumenMercadoReducer = ( state = initialState, action: PostResumenMercadoActions ) => {
    switch(action.type){
        case actionTypes.POST_RESUMEN_MERCADO_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_RESUMEN_MERCADO_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.POST_RESUMEN_MERCADO_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: ""}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postResumenMercadoReducer;