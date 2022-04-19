import * as actionTypes from '../actions/actionTypes';
import { RecomIssuerActions, RecomIssuerState } from '../types/RecomIssuerTypes';

const initialState: RecomIssuerState = {
    loading: false,
    recomIssuer: {buy: 0, sell: 0, hold:0, perBuy: 0, perSell: 0, perHold: 0, analysts: 0},
    error: null,
    message: ""
}

const recomIssuerReducer = ( state = initialState, action: RecomIssuerActions ) => {
    switch(action.type){
        case actionTypes.GET_RECOM_REQUEST:
            return { ...state, loading: true, message: action.payload };
        
        case actionTypes.GET_RECOM_RECEIVE:
            return {...state, loading: false, recomIssuer: action.payload.recomIssuer, error: null};

        case actionTypes.GET_RECOM_ERROR:
            return { ...state, loading: false, recomIssuer: {buy: 0, sell: 0, hold:0, perBuy: 0, perSell: 0, perHold: 0, analysts: 0}, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default recomIssuerReducer;