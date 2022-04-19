import * as actionTypes from '../actions/actionTypes';
import {PostAllConfigVAActions, PostAllConfigVAState} from '../types/PostAllConfigVAType';

const initialState: PostAllConfigVAState = {
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

const postAllConfigVAReducer = ( state = initialState, action: PostAllConfigVAActions ) => {
    switch(action.type){
        case actionTypes.POST_ALL_CONFIG_VA_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_ALL_CONFIG_VA_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.POST_ALL_CONFIG_VA_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: ""}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postAllConfigVAReducer;