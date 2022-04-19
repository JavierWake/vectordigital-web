import { GET_POSITION_REQUEST, GET_POSITION_RECEIVE, GET_POSITION_ERROR } from '../actions/actionTypes';
import { dsPortafolioRequest, dsPortafolioReceive, dsPortafolioError, dsPortafolioRequestPayload, dsPortafolioErrorPayload, dsPortafolioReceivePayload } from '../types/PortfolioTypes';

export const getDsPortafolioRequest = (payload: dsPortafolioRequestPayload): dsPortafolioRequest => ({
    type: GET_POSITION_REQUEST,
    payload    
});

export const getDsPortafolioRecieve = ( payload: dsPortafolioReceivePayload ): dsPortafolioReceive => ({
    type: GET_POSITION_RECEIVE,
    payload
});

export const getDsPortafolioError = ( payload: dsPortafolioErrorPayload ): dsPortafolioError => ({
    type: GET_POSITION_ERROR,
    payload,
}); 