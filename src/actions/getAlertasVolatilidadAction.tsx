import { GET_ALERTAS_VOLATILIDAD_REQUEST, GET_ALERTAS_VOLATILIDAD_RECEIVE, GET_ALERTAS_VOLATILIDAD_ERROR } from '../actions/actionTypes';
import { GetAlertasVolatilidadRequest, GetAlertasVolatilidadReceive, GetAlertasVolatilidadError, GetAlertasVolatilidadRequestPayload, GetAlertasVolatilidadReceivePayload, GetAlertasVolatilidadErrorPayload } from '../types/GetAlertasVolatilidadType';

export const getAlertasVolatilidadRequest = ( payload: GetAlertasVolatilidadRequestPayload ): GetAlertasVolatilidadRequest => ({
    type: GET_ALERTAS_VOLATILIDAD_REQUEST,
    payload    
});

export const getAlertasVolatilidadRecieve = ( payload: GetAlertasVolatilidadReceivePayload ): GetAlertasVolatilidadReceive => ({
    type: GET_ALERTAS_VOLATILIDAD_RECEIVE,
    payload
});

export const getAlertasVolatilidadError = ( payload: GetAlertasVolatilidadErrorPayload ): GetAlertasVolatilidadError => ({
    type: GET_ALERTAS_VOLATILIDAD_ERROR,
    payload,
}); 