import * as actionTypes from '../actions/actionTypes';
import {BuyIssuerActions, BuyIssuerState} from '../types/BuyIssuerType';

const initialState: BuyIssuerState = {
    loading: false,
    response: {
        ierror: 0,
        cerror: "",
        dstrade: {
            tdstrade: "",
        }
    },
    error: null,
    message: "",
    params: [],
    data: [],
}

const buyIssuerReducer = ( state = initialState, action: BuyIssuerActions ) => {
    switch(action.type){
        case actionTypes.POST_BUY_ISSUER_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.POST_BUY_ISSUER_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.POST_BUY_ISSUER_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: "", dstrade: { tdstrade: "", } }, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default buyIssuerReducer;