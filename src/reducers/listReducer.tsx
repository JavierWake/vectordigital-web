import * as actionTypes from '../actions/actionTypes';
import { ListActions, ListState } from '../types/ListTypes';

const initialState: ListState = {
    loading: true,
    list: [{
        list_name: "",
        list_id: "",
        list_size: "",
        vector: false,
        ultima: false,
        emisoras: []
    }],
    error: null,
    message: "",
    id: 0,
};

const listReducer = ( state = initialState, action: ListActions ) => {
    switch(action.type){
        case actionTypes.LIST_API_REQUEST:
            return { ...state, loading: true, message: action.payload.message, id: action.payload.id };
        
        case actionTypes.LIST_API_RECEIVE:
            return {...state, loading: false, list: action.payload.list, error: null};

        case actionTypes.LIST_API_ERROR:
            return { ...state, loading: false, list: initialState.list, error: action.payload.error };

        case actionTypes.LIST_API_RESET:
            //console.log("reset fondosCpaEmisReducer");
            return { ...initialState };
        
        default: 
            return { ...state };
    }
}

export default listReducer;