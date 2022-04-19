import { GET_ORDENES_REQUEST, GET_ORDENES_RECEIVE, GET_ORDENES_ERROR, RESET_STATE_GET_ORDENES } from '../actions/actionTypes';
import { dsOrdenesRequest, dsOrdenesReceive, dsOrdenesError, dsOrdenesRequestPayload, dsOrdenesErrorPayload, dsOrdenesReceivePayload, dsOrdenesReset, dsOrdenesResetPayload } from '../types/OrdenesTypes';

export const getDsOrdenesRequest = (payload: dsOrdenesRequestPayload): dsOrdenesRequest => ({
    type: GET_ORDENES_REQUEST,
    payload    
});

export const getDsOrdenesRecieve = ( payload: dsOrdenesReceivePayload ): dsOrdenesReceive => ({
    type: GET_ORDENES_RECEIVE,
    payload
});

export const getDsOrdenesError = ( payload: dsOrdenesErrorPayload ): dsOrdenesError => ({
    type: GET_ORDENES_ERROR,
    payload,
}); 

export const getDsOrdenesReset = ( payload: dsOrdenesResetPayload ): dsOrdenesReset => ({
    type: RESET_STATE_GET_ORDENES,
    payload,
}); 
