import * as actionTypes from '../actions/actionTypes';
import { ListIndexState, ListIndexActions } from '../types/IndexList';

const initialState: ListIndexState = {
    loading: false,
    listIndex: [
        {
            list_name: "",
            list_id: "",
            list_size: "",
            emisoras: [],
        }
    ],
    error: null,
    message: "",
}

const indexList = ( state = initialState, action: ListIndexActions ) => {
    switch(action.type){
        case actionTypes.LIST_INDEX_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.LIST_INDEX_RECEIVE:
            return {...state, loading: false, listIndex: action.payload.listIndex, 
                error: null};

        case actionTypes.LIST_INDEX_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default indexList;