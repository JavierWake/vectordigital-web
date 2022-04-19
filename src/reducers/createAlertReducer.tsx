import * as actionTypes from '../actions/actionTypes';
import { CreateAlertActions, CreateAlertState } from '../types/CreateAlertTypes';

const initialState: CreateAlertState = {
    loading: false,
    error: null,
    message: "",
    params:[],
}

const createAlertReducer = ( state = initialState, action: CreateAlertActions ) => {
    switch(action.type){
        case actionTypes.PUT_ALERT_REQUEST_RANGO:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };

        case actionTypes.PUT_ALERT_REQUEST_VARIACION:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };

        case actionTypes.PUT_ALERT_REQUEST_PRECIO:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };

        case actionTypes.PUT_ALERT_REQUEST_NOTICIA:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_ALERT_RECEIVE:
            return {...state, loading: false, error: null};

        case actionTypes.PUT_ALERT_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default createAlertReducer;