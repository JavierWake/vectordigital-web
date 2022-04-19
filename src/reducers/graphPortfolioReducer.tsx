import * as actionTypes from '../actions/actionTypes';
import {GraphPortfolioActions, GraphPortfolioStatus} from '../types/GraphPortfolioTypes';


const initialState: GraphPortfolioStatus = {
    loading: false,
    graphPortfolioMonth1: [{fecha: "", tenencia: 0}],
    valuePortfolio: [{valorPortafolio: 0, rend: 0}],
    error: null,
    message: "",
    params: [],
}

const graphPortfolioReducer = ( state = initialState, action: GraphPortfolioActions ) => {
    switch(action.type){
        case actionTypes.GET_PORTFOLIO_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_PORTFOLIO_RECEIVE:
            return {...state, loading: false, graphPortfolioMonth1: action.payload.graphPortfolioMonth1, error: null};

        case actionTypes.GET_VALUE_RECEIVE:
            return {...state, loading: false, valuePortfolio: action.payload.valuePortfolio, error: null};

        case actionTypes.GET_PORTFOLIO_ERROR:
            return { ...state, loading: false, graphPortfolioMonth1: [{fecha: "", tenencia: 0}], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default graphPortfolioReducer;