import * as actionTypes from '../actions/actionTypes';
import { PasswordGetActions, PasswordGetState } from '../types/PasswordGetType';

const initialState: PasswordGetState = {
    loading: false,
    error: null,
    params:[],
    message: "",
    respuesta: {
        ierror: 0,
        cerror: "",
    },
}

const PasswordGetReducer =  ( state = initialState, action: PasswordGetActions ) => {
    switch(action.type){
        case actionTypes.GET_PASSWORDGET_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.GET_PASSWORDGET_RECEIVE:
            return {...state, loading: false, error: null, respuesta: action.payload.respuesta};

        case actionTypes.GET_PASSWORDGET_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        case actionTypes.RESET_STATE_PASSWORD:
        return { ...initialState };

        default: 
            return { ...state };
    }
}


export default PasswordGetReducer