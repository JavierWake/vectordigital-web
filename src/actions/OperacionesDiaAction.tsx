import { GET_OPERACIONESDIA_REQUEST, GET_OPERACIONESDIA_RECEIVE, GET_OPERACIONESDIA_ERROR } from './actionTypes';
import { OperacionesDiaRequest, OperacionesDiaReceive, OperacionesDiaError, OperacionesDiaRequestPayload, OperacionesDiaErrorPayload, OperacionesDiaReceivePayload } from '../types/OperacionesDiaTypes';

export const getOperacionesDiaRequest = (payload: OperacionesDiaRequestPayload): OperacionesDiaRequest => ({
    type: GET_OPERACIONESDIA_REQUEST,
    payload    
});

export const getOperacionesDiaRecieve = ( payload: OperacionesDiaReceivePayload ): OperacionesDiaReceive => ({
    type: GET_OPERACIONESDIA_RECEIVE,
    payload
});

export const getOperacionesDiaError = ( payload: OperacionesDiaErrorPayload ): OperacionesDiaError => ({
    type: GET_OPERACIONESDIA_ERROR,
    payload,
}); 