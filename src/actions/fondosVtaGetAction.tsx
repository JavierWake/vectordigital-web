import { RESET_STATE_OPERACIONES_FONDOS, GET_FONDOS_VTA_REQUEST, GET_FONDOS_VTA_RECEIVE, GET_FONDOS_VTA_ERROR } from '../actions/actionTypes';
import { GetFondosVtaGetRequest, GetFondosVtaGetReceive, GetFondosVtaGetError, GetFondosVtaGetRequestPayload, GetFondosVtaGetReceivePayload, GetFondosVtaGetErrorPayload, GetFondosVtaGetResetPayload, GetFondosVtaGetReset } from '../types/FondosVtaGetTypes';

export const getFondosVtaGetRequest = ( payload: GetFondosVtaGetRequestPayload ): GetFondosVtaGetRequest => ({
    type: GET_FONDOS_VTA_REQUEST,
    payload    
});

export const getFondosVtaGetRecieve = ( payload: GetFondosVtaGetReceivePayload ): GetFondosVtaGetReceive => ({
    type: GET_FONDOS_VTA_RECEIVE,
    payload
});

export const getFondosVtaGetError = ( payload: GetFondosVtaGetErrorPayload ): GetFondosVtaGetError => ({
    type: GET_FONDOS_VTA_ERROR,
    payload,
}); 

export const getFondosVtaGetReset = ( payload: GetFondosVtaGetResetPayload ): GetFondosVtaGetReset => ({
    type: RESET_STATE_OPERACIONES_FONDOS,
    payload,
});