import { GET_STOPLOSS_REQUEST, GET_STOPLOSS_RECEIVE, GET_STOPLOSS_ERROR } from '../actions/actionTypes';
import { stopLossRequest, stopLossReceive, stopLossError, stopLossRequestPayload, stopLossErrorPayload, stopLossReceivePayload } from '../types/StoplossType';

export const getStoplossRequest = (payload: stopLossRequestPayload): stopLossRequest => ({
    type: GET_STOPLOSS_REQUEST,
    payload    
});

export const getStoplossRecieve = ( payload: stopLossReceivePayload ): stopLossReceive => ({
    type: GET_STOPLOSS_RECEIVE,
    payload
});

export const getStoplossError = ( payload: stopLossErrorPayload ): stopLossError => ({
    type: GET_STOPLOSS_ERROR,
    payload,
}); 