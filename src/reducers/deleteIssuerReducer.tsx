import * as actionTypes from '../actions/actionTypes';
import { DeleteIssuerActions, DeleteIssuerState } from '../types/DeleteIssuerTypes';

const initialState: DeleteIssuerState = {
    loading: false,
    error: "",
    message: "",
    id: 0,
    idError: 0,
    messageError: "",
}

const deleteIssuerReducer = ( state = initialState, action: DeleteIssuerActions ) => {
    switch(action.type){
        case actionTypes.DELETE_ISSUER_REQUEST:
            return { ...state, loading: true, message: action.payload.message, id: action.payload.id };
        
        case actionTypes.DELETE_ISSUER_RECEIVE:
            return {...state, loading: false, idError: action.payload.idError, messageError: action.payload.messageError};

        case actionTypes.DELETE_ISSUER_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default deleteIssuerReducer;