import * as actionTypes from '../actions/actionTypes';
import { ReadyStateActions, ReadyState } from '../types/ReadyStateTypes';

const initialState: ReadyState = {
    loading: false,
    readyStateWs: 0,
    error: null,
}

const readyStateReducer = ( state = initialState, action: ReadyStateActions ) => {
    switch(action.type){
        case actionTypes.GET_READYSTATE_REQUEST:
            return { ...state, loading: true };
        
        case actionTypes.GET_READYSTATE_RECEIVE:
            return {...state, loading: false, readyStateWs: action.payload.readyStateWs, error: null};

        case actionTypes.GET_READYSTATE_ERROR:
            return { ...state, loading: false, readyStateWs: 0, error: "" };
        
        default: 
            return { ...state };
    }
}

export default readyStateReducer;