import { GET_MOVERS_REQUEST, GET_MOVERS_RECEIVE, GET_MOVERS_ERROR } from '../actions/actionTypes';
import { GetMoversRequest, GetMoversReceive, GetMoversError, GetMoversRequestPayload, GetMoversReceivePayload, GetMoversErrorPayload } from '../types/MoversType';

export const getMoversRequest = ( payload: GetMoversRequestPayload ): GetMoversRequest => ({
    type: GET_MOVERS_REQUEST,
    payload    
});

export const getMoversRecieve = ( payload: GetMoversReceivePayload ): GetMoversReceive => ({
    type: GET_MOVERS_RECEIVE,
    payload
});

export const getMoversError = ( payload: GetMoversErrorPayload ): GetMoversError => ({
    type: GET_MOVERS_ERROR,
    payload,
}); 