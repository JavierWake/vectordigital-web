import * as actionTypes from '../actions/actionTypes';
import { BursState, BursActions } from '../types/BursType';

const initialState: BursState = {
    loading: false,
    listTicker: [],
    error: null,
    message: "",
}

const bursReducer = ( state = initialState, action: BursActions ) => {
    switch(action.type){
        case actionTypes.GET_BURS_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.GET_BURS_RECIEVE:
            return {...state, loading: false, listTicker: action.payload.listTicker, error: null};

        case actionTypes.GET_BURS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default bursReducer;