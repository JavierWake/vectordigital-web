import * as actionTypes from '../actions/actionTypes';
import { PostCelularState, PostCelularActions } from '../types/PostCelularType';

const initialState: PostCelularState = {
    loading: false,
    postCelularRespuesta: {
        ierror: 0,
        cerror: "",
        url: "",
        estatus: false,
    },
    error: null,
    message: "",
    params: [],
}

const postCelularReducer = ( state = initialState, action: PostCelularActions ) => {
    switch(action.type){
        case actionTypes.POST_CELULAR_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_CELULAR_RECEIVE:
            return {...state, loading: false, postCelularRespuesta: action.payload.postCelularRespuesta, error: null};

        case actionTypes.POST_CELULAR_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postCelularReducer;