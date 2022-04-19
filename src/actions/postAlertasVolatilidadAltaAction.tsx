import { POST_ALERTAS_VOLATILIDAD_ALTA_REQUEST, POST_ALERTAS_VOLATILIDAD_ALTA_RECEIVE, POST_ALERTAS_VOLATILIDAD_ALTA_ERROR } from '../actions/actionTypes';
import { PostAlertasVolatilidadAltaRequest, PostAlertasVolatilidadAltaReceive, PostAlertasVolatilidadAltaError, PostAlertasVolatilidadAltaRequestPayload, PostAlertasVolatilidadAltaReceivePayload, PostAlertasVolatilidadAltaErrorPayload } from '../types/PostAlertasVolatilidadAltaType';

export const postAlertasVolatilidadAltaRequest = ( payload: PostAlertasVolatilidadAltaRequestPayload ): PostAlertasVolatilidadAltaRequest => ({
    type: POST_ALERTAS_VOLATILIDAD_ALTA_REQUEST,
    payload    
});

export const postAlertasVolatilidadAltaRecieve = ( payload: PostAlertasVolatilidadAltaReceivePayload ): PostAlertasVolatilidadAltaReceive => ({
    type: POST_ALERTAS_VOLATILIDAD_ALTA_RECEIVE,
    payload
});

export const postAlertasVolatilidadAltaError = ( payload: PostAlertasVolatilidadAltaErrorPayload ): PostAlertasVolatilidadAltaError => ({
    type: POST_ALERTAS_VOLATILIDAD_ALTA_ERROR,
    payload,
}); 