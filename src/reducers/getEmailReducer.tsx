import * as actionTypes from '../actions/actionTypes';
import { GetEmailState, GetEmailActions } from '../types/GetEmailType';

const initialState: GetEmailState = {
    loading: false,
    getEmailRespuesta: {
        ierror: 0,
        cerror: "",
        estatus: "",
        email: "",
    },
    error: null,
    message: "",
    params: [],
}

const getEmailReducer = ( state = initialState, action: GetEmailActions ) => {
    switch(action.type){
        case actionTypes.GET_EMAIL_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_EMAIL_RECEIVE:
            return {...state, loading: false, getEmailRespuesta: action.payload.getEmailRespuesta, error: null};

        case actionTypes.GET_EMAIL_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getEmailReducer;