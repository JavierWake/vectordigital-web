import { GET_FONDOS_VTAEMIS_REQUEST, GET_FONDOS_VTAEMIS_RECEIVE, GET_FONDOS_VTAEMIS_ERROR } from '../actions/actionTypes';
import { GetFondosVtaEmisRequest, GetFondosVtaEmisReceive, GetFondosVtaEmisError, GetFondosVtaEmisRequestPayload, GetFondosVtaEmisReceivePayload, GetFondosVtaEmisErrorPayload } from '../types/FondosVtaEmisTypes';

export const getFondosVtaEmisRequest = ( payload: GetFondosVtaEmisRequestPayload ): GetFondosVtaEmisRequest => ({
    type: GET_FONDOS_VTAEMIS_REQUEST,
    payload    
});

export const getFondosVtaEmisRecieve = ( payload: GetFondosVtaEmisReceivePayload ): GetFondosVtaEmisReceive => ({
    type: GET_FONDOS_VTAEMIS_RECEIVE,
    payload
});

export const getFondosVtaEmisError = ( payload: GetFondosVtaEmisErrorPayload ): GetFondosVtaEmisError => ({
    type: GET_FONDOS_VTAEMIS_ERROR,
    payload,
}); 