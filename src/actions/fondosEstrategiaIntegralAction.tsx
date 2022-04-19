import { GET_FONDOS_ESTRATEGIA_INTEGRAL_REQUEST, GET_FONDOS_ESTRATEGIA_INTEGRAL_RECEIVE, GET_FONDOS_ESTRATEGIA_INTEGRAL_ERROR } from '../actions/actionTypes';
import { GetFondosEstrategiaIntegralRequest, GetFondosEstrategiaIntegralReceive, GetFondosEstrategiaIntegralError, GetFondosEstrategiaIntegralRequestPayload, GetFondosEstrategiaIntegralReceivePayload, GetFondosEstrategiaIntegralErrorPayload } from '../types/FondosEstrategiaIntegralTypes';

export const getFondosEstrategiaIntegralRequest = ( payload: GetFondosEstrategiaIntegralRequestPayload ): GetFondosEstrategiaIntegralRequest => ({
    type: GET_FONDOS_ESTRATEGIA_INTEGRAL_REQUEST,
    payload    
});

export const getFondosEstrategiaIntegralRecieve = ( payload: GetFondosEstrategiaIntegralReceivePayload ): GetFondosEstrategiaIntegralReceive => ({
    type: GET_FONDOS_ESTRATEGIA_INTEGRAL_RECEIVE,
    payload
});

export const getFondosEstrategiaIntegralError = ( payload: GetFondosEstrategiaIntegralErrorPayload ): GetFondosEstrategiaIntegralError => ({
    type: GET_FONDOS_ESTRATEGIA_INTEGRAL_ERROR,
    payload,
}); 