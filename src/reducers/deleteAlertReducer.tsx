import * as actionTypes from '../actions/actionTypes';
import {DeleteFollowActions, DeleteAlertState } from '../types/DeleteAlertType';

const initialState: DeleteAlertState = {
    loading: false,
    error: null,
    message: "",
}

const deleteAlertReducer = ( state = initialState, action: DeleteFollowActions ) => {
    switch(action.type){
        case actionTypes.DELETE_ALERT_REQUEST:
            return { ...state, loading: true, message: action.payload.message };
        
        case actionTypes.DELETE_ALERT_RECEIVE:
            return {...state, loading: false, error: null};

        case actionTypes.DELETE_ALERT_ERROR:
            return { ...state, loading: false, error: "" };
        
        default: 
            return { ...state };
    }
}

export default deleteAlertReducer;