import * as actionTypes from '../actions/actionTypes';
import { PutEmailState, PutEmailActions } from '../types/PutEmailType';

const initialState: PutEmailState = {
    loading: false,
    putEmailRespuesta: {
        ierror: 0,
        cerror: "",
    },
    error: null,
    message: "",
    params: [],
}

const putEmailReducer = ( state = initialState, action: PutEmailActions ) => {
    switch(action.type){
        case actionTypes.PUT_EMAIL_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.PUT_EMAIL_RECEIVE:
            return {...state, loading: false, putEmailRespuesta: action.payload.putEmailRespuesta, error: null};

        case actionTypes.PUT_EMAIL_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default putEmailReducer;