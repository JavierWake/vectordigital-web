import * as actionTypes from '../actions/actionTypes';
import { PostEmailState, PostEmailActions } from '../types/PostEmailType';

const initialState: PostEmailState = {
    loading: false,
    postEmailRespuesta: {
        ierror: 0,
        cerror: "",
        url: "",
        estatus: false,
    },
    error: null,
    message: "",
    params: [],
}

const postEmailReducer = ( state = initialState, action: PostEmailActions ) => {
    switch(action.type){
        case actionTypes.POST_EMAIL_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_EMAIL_RECEIVE:
            return {...state, loading: false, postEmailRespuesta: action.payload.postEmailRespuesta, error: null};

        case actionTypes.POST_EMAIL_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postEmailReducer;