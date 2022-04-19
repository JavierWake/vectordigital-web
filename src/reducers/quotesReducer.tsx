import * as actionTypes from '../actions/actionTypes';
import { QuotesState, QuotesActions } from '../types/QuotesTypes';

const initialState: QuotesState = {
    loading: false,
    quotesList: [],
    error: null,
    message: [],
    companies: "",
}

const quotesReducer = ( state = initialState, action: QuotesActions ) => {
    switch(action.type){
        case actionTypes.QUOTES_DATA_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.QUOTES_DATA_RECEIVE:
            return {...state, loading: false, quotesList: action.payload.quotesList, error: null};

        case actionTypes.QUOTES_DATA_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default quotesReducer;