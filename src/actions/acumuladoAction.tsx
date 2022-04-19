import { GET_ACUMULADO_REQUEST, GET_ACUMULADO_RECEIVE, GET_ACUMULADO_ERROR } from '../actions/actionTypes';
import { acumuladoRequest, acumuladoReceive, acumuladoError, acumuladoRequestPayload, acumuladoErrorPayload, acumuladoReceivePayload } from '../types/AcumuladoType';

export const getAcumuladoRequest = (payload: acumuladoRequestPayload): acumuladoRequest => ({
    type: GET_ACUMULADO_REQUEST,
    payload    
});

export const getAcumuladoRecieve = ( payload: acumuladoReceivePayload ): acumuladoReceive => ({
    type: GET_ACUMULADO_RECEIVE,
    payload
});

export const getAcumuladoError = ( payload: acumuladoErrorPayload ): acumuladoError => ({
    type: GET_ACUMULADO_ERROR,
    payload,
}); 