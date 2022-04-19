import * as actionTypes from '../actions/actionTypes';
import { SearchIssuerActions,  SearchIssuerState} from '../types/SearchIssuer';

const initialState: SearchIssuerState = {
    loading: false,
    searchIssuer: [],
    error: null,
    message: ""
}

const searchIssuerReducer = ( state = initialState, action: SearchIssuerActions ) => {
    switch(action.type){
        case actionTypes.GET_MONITOR_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.GET_MONITOR_RECEIVE:
            return {...state, loading: false, searchCompasearchIssuerny: action.payload.searchIssuer, error: null};

        case actionTypes.GET_MONITOR_ERROR:
            return { ...state, loading: false, searchIssuer: [], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default searchIssuerReducer;