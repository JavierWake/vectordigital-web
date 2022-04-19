import { GET_PORTFOLIO_REQUEST, GET_PORTFOLIO_RECEIVE,  GET_VALUE_RECEIVE, GET_PORTFOLIO_ERROR } from '../actions/actionTypes';
import { GraphPortfolioRequest, GraphPortfolioReceive, GraphPortfolioRequestPayload, GraphPortfolioError, GraphPortfolioReceivePayload, GraphPortfolioErrorPayload, ValuePortfolioReceive, ValuePortfolioReceivePayload } from '../types/GraphPortfolioTypes';

export const getGraphPortfolioRequest = (payload: GraphPortfolioRequestPayload): GraphPortfolioRequest => ({
    type: GET_PORTFOLIO_REQUEST,
    payload
    
});

export const getGraphPortfolioRecieve = ( payload: GraphPortfolioReceivePayload ): GraphPortfolioReceive => ({
    type: GET_PORTFOLIO_RECEIVE,
    payload
});

export const getValuePortfolioRecieve = ( payload: ValuePortfolioReceivePayload ): ValuePortfolioReceive => ({
    type: GET_VALUE_RECEIVE,
    payload
});


export const getGraphPortfolioError = ( payload: GraphPortfolioErrorPayload ): GraphPortfolioError => ({
    type: GET_PORTFOLIO_ERROR,
    payload,
}); 