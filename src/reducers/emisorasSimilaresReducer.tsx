import * as actionTypes from '../actions/actionTypes';
import { EmisorasSimilaresActions, EmisorasSimilaresState } from '../types/EmisorasSimilaresTypes';

const initialState: EmisorasSimilaresState = {
    loading: false,
    similares: [ {ticker: "", name: "", percentage: 0, last: 0, currency: ""} ],
    error: null,
    message: ""
}

const emisorasSimilares = ( state = initialState, action: EmisorasSimilaresActions ) => {
    switch(action.type){
        case actionTypes.GET_EMISORA_SIMILAR_REQUEST:
            return { ...state, loading: true, message: action.payload.message };
        
        case actionTypes.GET_EMISORA_SIMILAR_RECEIVE:
            return {...state, loading: false, similares: action.payload.similares, error: null};

        case actionTypes.GET_EMISORA_SIMILAR_ERROR:
            return { ...state, loading: false, similares: [ {ticker: "", name: "", percentage: 0, last: 0, currency: ""} ], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default emisorasSimilares;