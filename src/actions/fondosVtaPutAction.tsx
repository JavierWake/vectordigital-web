import { RESET_STATE_OPERACIONES_FONDOS, PUT_FONDOS_VTA_REQUEST, PUT_FONDOS_VTA_RECEIVE, PUT_FONDOS_VTA_ERROR } from '../actions/actionTypes';
import { PutFondosVtaPutRequest, PutFondosVtaPutReceive, PutFondosVtaPutError, PutFondosVtaPutRequestPayload, PutFondosVtaPutReceivePayload, PutFondosVtaPutErrorPayload, PutFondosVtaPutResetPayload, PutFondosVtaPutReset } from '../types/FondosVtaPutTypes';

export const getFondosVtaPutRequest = ( payload: PutFondosVtaPutRequestPayload ): PutFondosVtaPutRequest => ({
    type: PUT_FONDOS_VTA_REQUEST,
    payload    
});

export const getFondosVtaPutRecieve = ( payload: PutFondosVtaPutReceivePayload ): PutFondosVtaPutReceive => ({
    type: PUT_FONDOS_VTA_RECEIVE,
    payload
});

export const getFondosVtaPutError = ( payload: PutFondosVtaPutErrorPayload ): PutFondosVtaPutError => ({
    type: PUT_FONDOS_VTA_ERROR,
    payload,
}); 

export const getFondosVtaPutReset = ( payload: PutFondosVtaPutResetPayload ): PutFondosVtaPutReset => ({
    type: RESET_STATE_OPERACIONES_FONDOS,
    payload,
});
