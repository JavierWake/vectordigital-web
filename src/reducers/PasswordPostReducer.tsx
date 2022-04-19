import * as actionTypes from '../actions/actionTypes';
import { PasswordPostActions, PasswordPostState } from '../types/PasswordPostType';

const initialState: PasswordPostState = {
    loading: false,
    params: "",
    error: null,
    message: "",
    respuesta: {
        ierror: 0,
        cerror: "",
    },
}

const PasswordPostReducer =  ( state = initialState, action: PasswordPostActions ) => {
    switch(action.type){
        case actionTypes.POST_PASSWORDPOST_SEND:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_PASSWORDPOST_RECEIVE:
            return {...state, loading: false, error: null, respuesta: action.payload.respuesta};

        case actionTypes.POST_PASSWORDPOST_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}


export default PasswordPostReducer