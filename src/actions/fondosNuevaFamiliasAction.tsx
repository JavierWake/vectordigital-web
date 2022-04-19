import { GET_FONDOS_NUEVA_FAMILIAS_REQUEST, GET_FONDOS_NUEVA_FAMILIAS_RECEIVE, GET_FONDOS_NUEVA_FAMILIAS_ERROR } from '../actions/actionTypes';
import { GetFondosNuevaFamiliasRequest, GetFondosNuevaFamiliasReceive, GetFondosNuevaFamiliasError, GetFondosNuevaFamiliasRequestPayload, GetFondosNuevaFamiliasReceivePayload, GetFondosNuevaFamiliasErrorPayload } from '../types/FondosNuevaFamiliasTypes';

export const getFondosNuevaFamiliasRequest = ( payload: GetFondosNuevaFamiliasRequestPayload ): GetFondosNuevaFamiliasRequest => ({
    type: GET_FONDOS_NUEVA_FAMILIAS_REQUEST,
    payload    
});

export const getFondosNuevaFamiliasRecieve = ( payload: GetFondosNuevaFamiliasReceivePayload ): GetFondosNuevaFamiliasReceive => ({
    type: GET_FONDOS_NUEVA_FAMILIAS_RECEIVE,
    payload
});

export const getFondosNuevaFamiliasError = ( payload: GetFondosNuevaFamiliasErrorPayload ): GetFondosNuevaFamiliasError => ({
    type: GET_FONDOS_NUEVA_FAMILIAS_ERROR,
    payload,
}); 