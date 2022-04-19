import { PUT_CELULAR_REQUEST, PUT_CELULAR_RECEIVE, PUT_CELULAR_ERROR } from '../actions/actionTypes';
import { PutCelularRequest, PutCelularReceive, PutCelularError, PutCelularRequestPayload, PutCelularReceivePayload, PutCelularErrorPayload } from '../types/PutCelularType';

export const putCelularRequest = ( payload: PutCelularRequestPayload ): PutCelularRequest => ({
    type: PUT_CELULAR_REQUEST,
    payload
});

export const putCelularRecieve = ( payload: PutCelularReceivePayload ): PutCelularReceive => ({
    type: PUT_CELULAR_RECEIVE,
    payload
});

export const putCelularError = ( payload: PutCelularErrorPayload ): PutCelularError => ({
    type: PUT_CELULAR_ERROR,
    payload,
}); 