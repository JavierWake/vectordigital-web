import * as actionTypes from '../actions/actionTypes';
import { ChangeListActions, ChangeListState } from '../types/ChangeListNameType';

const initialState: ChangeListState = {
    loading: false,
    error: null,
    message: "",
    params:"",
}

const changeListReducer = ( state = initialState, action: ChangeListActions ) => {
    switch(action.type){
        case actionTypes.CHANGE_LIST_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.CHANGE_LIST_RECEIVE:
            return {...state, loading: false, error: null};

        case actionTypes.CHANGE_LIST_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default changeListReducer;