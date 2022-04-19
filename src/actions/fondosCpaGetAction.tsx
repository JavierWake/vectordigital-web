import { RESET_STATE_OPERACIONES_FONDOS, GET_FONDOS_CPA_REQUEST, GET_FONDOS_CPA_RECEIVE, GET_FONDOS_CPA_ERROR } from '../actions/actionTypes';
import { GetFondosCpaGetRequest, GetFondosCpaGetReceive, GetFondosCpaGetError, GetFondosCpaGetRequestPayload, GetFondosCpaGetReceivePayload, GetFondosCpaGetErrorPayload, GetFondosCpaGetResetPayload, GetFondosCpaGetReset } from '../types/FondosCpaGetTypes';

export const getFondosCpaGetRequest = ( payload: GetFondosCpaGetRequestPayload ): GetFondosCpaGetRequest => ({
    type: GET_FONDOS_CPA_REQUEST,
    payload    
});

export const getFondosCpaGetRecieve = ( payload: GetFondosCpaGetReceivePayload ): GetFondosCpaGetReceive => ({
    type: GET_FONDOS_CPA_RECEIVE,
    payload
});

export const getFondosCpaGetError = ( payload: GetFondosCpaGetErrorPayload ): GetFondosCpaGetError => ({
    type: GET_FONDOS_CPA_ERROR,
    payload,
}); 

export const getFondosCpaGetReset = ( payload: GetFondosCpaGetResetPayload ): GetFondosCpaGetReset => ({
    type: RESET_STATE_OPERACIONES_FONDOS,
    payload,
});