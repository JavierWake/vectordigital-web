import { GET_ALERTAS_EVENTO_REQUEST, GET_ALERTAS_EVENTO_RECEIVE, GET_ALERTAS_EVENTO_ERROR } from '../actions/actionTypes';
import { GetAlertasEventoRequest, GetAlertasEventoReceive, GetAlertasEventoError, GetAlertasEventoRequestPayload, GetAlertasEventoReceivePayload, GetAlertasEventoErrorPayload } from '../types/GetAlertasEventoType';

export const getAlertasEventoRequest = ( payload: GetAlertasEventoRequestPayload ): GetAlertasEventoRequest => ({
    type: GET_ALERTAS_EVENTO_REQUEST,
    payload    
});

export const getAlertasEventoRecieve = ( payload: GetAlertasEventoReceivePayload ): GetAlertasEventoReceive => ({
    type: GET_ALERTAS_EVENTO_RECEIVE,
    payload
});

export const getAlertasEventoError = ( payload: GetAlertasEventoErrorPayload ): GetAlertasEventoError => ({
    type: GET_ALERTAS_EVENTO_ERROR,
    payload,
}); 