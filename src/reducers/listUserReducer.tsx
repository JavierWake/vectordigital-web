import * as actionTypes from '../actions/actionTypes';
import {ListUserActions, ListUserState} from '../types/UsertListTypes';

const initialState: ListUserState = {
    loading: false,
    listUser: [],
    error: null,
    message: "",
    id: 0,
}

const listUserReducer = ( state = initialState, action: ListUserActions ) => {
    switch(action.type){
        case actionTypes.LIST_USER_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.LIST_USER_RECEIVE:
            return {...state, loading: false, listUser: action.payload.listUser, error: null};

        case actionTypes.LIST_USER_ERROR:
            return { ...state, loading: false, news: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default listUserReducer;