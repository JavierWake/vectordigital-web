import * as actionTypes from '../actions/actionTypes';
import { PostLogoutState, PostLogoutActions } from '../types/PostLogoutTypes';

const postLogoutInitialState: PostLogoutState = {
    loading: false,
    logoutResponse: {
        cerror: "", 
        ierror: 0,
    },
    error: null,
    message: "",
    params: [],
}

const postLogoutReducer = ( state = postLogoutInitialState, action: PostLogoutActions ) => {
    switch(action.type){
        case actionTypes.POST_LOGOUT_REQUEST:
            return { ...state, loading: true, message: action.payload.message, };
        
        case actionTypes.POST_LOGOUT_RECEIVE:
            return {...state, loading: false, logoutResponse: action.payload.responseApi, params: [],  error: null};

        case actionTypes.POST_LOGOUT_ERROR:
            return { ...state, loading: false, params: [], error: action.payload.error };

        default: 
            return { ...state };
    }
}

export default postLogoutReducer;