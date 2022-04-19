import * as actionTypes from '../actions/actionTypes';
import { Email_PhoneActions, Email_PhoneState } from '../types/Email&PhoneType';

const initialState: Email_PhoneState = {
    loading: false,
    params: "",
    error: null,
    message: "",
    respuesta: {
        ierror: 0,
        cerror: "",
    },
}

const Email_PhoneReducer =  ( state = initialState, action: Email_PhoneActions ) => {
    switch(action.type){
        case actionTypes.POST_EMAIL_PHONE_SEND:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_EMAIL_PHONE_RECEIVE:
            return {...state, loading: false, error: null, respuesta: action.payload.respuesta};

        case actionTypes.POST_EMAIL_PHONE_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}


export default Email_PhoneReducer