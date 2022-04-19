import * as actionTypes from '../actions/actionTypes';
import { DeleteListActions, DeleteListState } from '../types/DeleteListTypes';

const initialState: DeleteListState = {
    loading: false,
    error: "",
    message: "",
    id: 0,
    idError: 0,
    messageError: "",
}

const deleteListReducer = ( state = initialState, action: DeleteListActions ) => {
    switch(action.type){
        case actionTypes.DELETE_LIST_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.DELETE_LIST_RECEIVE:
            return {...state, loading: false, error: "", idError: action.payload.idError, messageError: action.payload.messageError};

        case actionTypes.DELETE_LIST_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default deleteListReducer;