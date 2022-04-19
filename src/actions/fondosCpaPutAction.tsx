import { RESET_STATE_OPERACIONES_FONDOS, PUT_FONDOS_CPA_REQUEST, PUT_FONDOS_CPA_RECEIVE, PUT_FONDOS_CPA_ERROR } from '../actions/actionTypes';
import { PutFondosCpaPutRequest, PutFondosCpaPutReceive, PutFondosCpaPutError, PutFondosCpaPutRequestPayload, PutFondosCpaPutReceivePayload, PutFondosCpaPutErrorPayload, PutFondosCpaPutResetPayload, PutFondosCpaPutReset } from '../types/FondosCpaPutTypes';

export const getFondosCpaPutRequest = ( payload: PutFondosCpaPutRequestPayload ): PutFondosCpaPutRequest => ({
    type: PUT_FONDOS_CPA_REQUEST,
    payload    
});

export const getFondosCpaPutRecieve = ( payload: PutFondosCpaPutReceivePayload ): PutFondosCpaPutReceive => ({
    type: PUT_FONDOS_CPA_RECEIVE,
    payload
});

export const getFondosCpaPutError = ( payload: PutFondosCpaPutErrorPayload ): PutFondosCpaPutError => ({
    type: PUT_FONDOS_CPA_ERROR,
    payload,
}); 

export const getFondosCpaPutReset = ( payload: PutFondosCpaPutResetPayload ): PutFondosCpaPutReset => ({
    type: RESET_STATE_OPERACIONES_FONDOS,
    payload,
});