import * as actionTypes from '../actions/actionTypes';
import {GetAlertActions, AlertStatus} from '../types/AlertGet';

const initialState: AlertStatus = {
    loading: false,
    alertGet: [],
    error: null,
    message: ""
}

const alertGetReducer = ( state = initialState, action: GetAlertActions ) => {
    switch(action.type){
        case actionTypes.GET_ALERT_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.GET_ALERT_RECEIVE:
            return {...state, loading: false, alertGet: action.payload.alertGet, error: null};

        case actionTypes.GET_ALERT_ERROR:
            return { ...state, loading: false, alertGet: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default alertGetReducer;