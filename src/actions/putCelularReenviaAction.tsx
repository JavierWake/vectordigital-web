import { PUT_CELULAR_REENVIA_REQUEST, PUT_CELULAR_REENVIA_RECEIVE, PUT_CELULAR_REENVIA_ERROR } from '../actions/actionTypes';
import { PutCelularReenviaRequest, PutCelularReenviaReceive, PutCelularReenviaError, PutCelularReenviaRequestPayload, PutCelularReenviaReceivePayload, PutCelularReenviaErrorPayload } from '../types/PutCelularReenviaType';

export const putCelularReenviaRequest = ( payload: PutCelularReenviaRequestPayload ): PutCelularReenviaRequest => ({
    type: PUT_CELULAR_REENVIA_REQUEST,
    payload
});

export const putCelularReenviaRecieve = ( payload: PutCelularReenviaReceivePayload ): PutCelularReenviaReceive => ({
    type: PUT_CELULAR_REENVIA_RECEIVE,
    payload
});

export const putCelularReenviaError = ( payload: PutCelularReenviaErrorPayload ): PutCelularReenviaError => ({
    type: PUT_CELULAR_REENVIA_ERROR,
    payload,
}); 