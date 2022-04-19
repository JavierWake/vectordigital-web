import * as actionTypes from '../actions/actionTypes';
import { PostFollowActions, PostFollowState } from '../types/FollowListTypes';

const initialState: PostFollowState = {
    loading: false,
    error: null,
    message: "",
    params:"",
}

const followReducer = ( state = initialState, action: PostFollowActions ) => {
    switch(action.type){
        case actionTypes.POST_FOLLOW_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_FOLLOW_RECEIVE:
            return {...state, loading: false, error: null};

        case actionTypes.POST_FOLLOW_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default followReducer;