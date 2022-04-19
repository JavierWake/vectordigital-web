import { GET_FONDOS_FAMILIAS_REQUEST, GET_FONDOS_FAMILIAS_RECEIVE, GET_FONDOS_FAMILIAS_ERROR } from '../actions/actionTypes';
import { GetFondosFamiliasRequest, GetFondosFamiliasReceive, GetFondosFamiliasError, GetFondosFamiliasRequestPayload, GetFondosFamiliasReceivePayload, GetFondosFamiliasErrorPayload } from '../types/FondosFamiliasTypes';

export const getFondosFamiliaRequest = ( payload: GetFondosFamiliasRequestPayload ): GetFondosFamiliasRequest => ({
    type: GET_FONDOS_FAMILIAS_REQUEST,
    payload    
});

export const getFondosFamiliaRecieve = ( payload: GetFondosFamiliasReceivePayload ): GetFondosFamiliasReceive => ({
    type: GET_FONDOS_FAMILIAS_RECEIVE,
    payload
});

export const getFondosFamiliaError = ( payload: GetFondosFamiliasErrorPayload ): GetFondosFamiliasError => ({
    type: GET_FONDOS_FAMILIAS_ERROR,
    payload,
}); 