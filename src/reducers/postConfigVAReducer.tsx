import * as actionTypes from '../actions/actionTypes';
import {PostConfigVAActions, PostConfigVAState} from '../types/PostConfigVAType';

const initialState: PostConfigVAState = {
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

const postConfigVAReducer = ( state = initialState, action: PostConfigVAActions ) => {
    switch(action.type){
        case actionTypes.POST_CONFIG_VA_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_CONFIG_VA_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.POST_CONFIG_VA_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: ""}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postConfigVAReducer;