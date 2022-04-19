import { GET_FONDOS_FAM_DISTRIBUCION_REQUEST, GET_FONDOS_FAM_DISTRIBUCION_RECEIVE, GET_FONDOS_FAM_DISTRIBUCION_ERROR } from '../actions/actionTypes';
import { GetFondosFamDistribucionRequest, GetFondosFamDistribucionReceive, GetFondosFamDistribucionError, GetFondosFamDistribucionRequestPayload, GetFondosFamDistribucionReceivePayload, GetFondosFamDistribucionErrorPayload } from '../types/FondosFamDistribucionTypes';

export const getFondosFamDistribucionRequest = ( payload: GetFondosFamDistribucionRequestPayload ): GetFondosFamDistribucionRequest => ({
    type: GET_FONDOS_FAM_DISTRIBUCION_REQUEST,
    payload    
});

export const getFondosFamDistribucionRecieve = ( payload: GetFondosFamDistribucionReceivePayload ): GetFondosFamDistribucionReceive => ({
    type: GET_FONDOS_FAM_DISTRIBUCION_RECEIVE,
    payload
});

export const getFondosFamDistribucionError = ( payload: GetFondosFamDistribucionErrorPayload ): GetFondosFamDistribucionError => ({
    type: GET_FONDOS_FAM_DISTRIBUCION_ERROR,
    payload,
}); 