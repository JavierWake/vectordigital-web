import * as actionTypes from '../actions/actionTypes';
import { DeleteUnfollowActions, DeleteUnfollowState } from '../types/UnfollowListTypes';

const initialState: DeleteUnfollowState = {
    loading: false,
    error: null,
    message: "",
    id: "",
}

const unfollowReducer = ( state = initialState, action: DeleteUnfollowActions ) => {
    switch(action.type){
        case actionTypes.DELETE_UNFOLLOW_REQUEST:
            return { ...state, loading: true, message: action.payload.message, id: action.payload.id };
        
        case actionTypes.DELETE_UNFOLLOW_RECEIVE:
            return {...state, loading: false, error: null};

        case actionTypes.DELETE_UNFOLLOW_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default unfollowReducer;