import * as actionTypes from '../actions/actionTypes';
import { ListUltimaActions, ListUltimaState } from '../types/ListUltimaTypes';

const initialState: ListUltimaState = {
    loading: false,
    response: {
        id: 0,
        message: ""
    },
    error: null,
    message: "",
    id: 0,
};

const listUltimaReducer = ( state = initialState, action: ListUltimaActions ) => {
    switch(action.type){
        case actionTypes.PUT_LIST_ULTIMA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, id: action.payload.id };
        
        case actionTypes.PUT_LIST_ULTIMA_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.PUT_LIST_ULTIMA_ERROR:
            return { ...state, loading: false, response: initialState.response, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default listUltimaReducer;