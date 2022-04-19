import { RESET_STATE_OPERACIONES_FONDOS ,GET_FONDOS_CPAEMIS_REQUEST, GET_FONDOS_CPAEMIS_RECEIVE, GET_FONDOS_CPAEMIS_ERROR } from '../actions/actionTypes';
import { GetFondosCpaEmisRequest, GetFondosCpaEmisReceive, GetFondosCpaEmisError, GetFondosCpaEmisReset, GetFondosCpaEmisRequestPayload, GetFondosCpaEmisReceivePayload, GetFondosCpaEmisErrorPayload, GetFondosCpaEmisResetPayload } from '../types/FondosCpaEmisTypes';

export const getFondosCpaEmisRequest = ( payload: GetFondosCpaEmisRequestPayload ): GetFondosCpaEmisRequest => ({
    type: GET_FONDOS_CPAEMIS_REQUEST,
    payload    
});

export const getFondosCpaEmisRecieve = ( payload: GetFondosCpaEmisReceivePayload ): GetFondosCpaEmisReceive => ({
    type: GET_FONDOS_CPAEMIS_RECEIVE,
    payload
});

export const getFondosCpaEmisError = ( payload: GetFondosCpaEmisErrorPayload ): GetFondosCpaEmisError => ({
    type: GET_FONDOS_CPAEMIS_ERROR,
    payload,
}); 

export const getFondosCpaEmisReset = ( payload: GetFondosCpaEmisResetPayload ): GetFondosCpaEmisReset => ({
    type: RESET_STATE_OPERACIONES_FONDOS,
    payload,
}); 