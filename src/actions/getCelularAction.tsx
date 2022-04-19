import { GET_CELULAR_REQUEST, GET_CELULAR_RECEIVE, GET_CELULAR_ERROR } from '../actions/actionTypes';
import { GetCelularRequest, GetCelularReceive, GetCelularError, GetCelularRequestPayload, GetCelularReceivePayload, GetCelularErrorPayload } from '../types/GetCelularType';

export const getCelularRequest = ( payload: GetCelularRequestPayload ): GetCelularRequest => ({
    type: GET_CELULAR_REQUEST,
    payload    
});

export const getCelularRecieve = ( payload: GetCelularReceivePayload ): GetCelularReceive => ({
    type: GET_CELULAR_RECEIVE,
    payload
});

export const getCelularError = ( payload: GetCelularErrorPayload ): GetCelularError => ({
    type: GET_CELULAR_ERROR,
    payload,
}); 