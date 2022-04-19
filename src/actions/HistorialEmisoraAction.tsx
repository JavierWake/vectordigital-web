import { GET_HISTORIALEMISORA_REQUEST, GET_HISTORIALEMISORA_RECEIVE,  GET_VALUE_RECEIVE, GET_HISTORIALEMISORA_ERROR } from '../actions/actionTypes';
import { HistorialEmisoraRequestPayload, HistorialEmisoraReceivePayload, HistorialEmisoraErrorPayload, HistorialEmisoraRequest, HistorialEmisoraReceive, HistorialEmisoraError } from '../types/HistorialEmisoraTypes';

export const getHistorialEmisoraRequest = (payload: HistorialEmisoraRequestPayload): HistorialEmisoraRequest => ({
    type: GET_HISTORIALEMISORA_REQUEST,
    payload
    
});

export const getHistorialEmisoraRecieve = ( payload: HistorialEmisoraReceivePayload ): HistorialEmisoraReceive => ({
    type: GET_HISTORIALEMISORA_RECEIVE,
    payload
});

export const getHistorialEmisoraError = ( payload: HistorialEmisoraErrorPayload ): HistorialEmisoraError => ({
    type: GET_HISTORIALEMISORA_ERROR,
    payload,
}); 