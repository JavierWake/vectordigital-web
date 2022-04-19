import { POST_ALERTAS_EVENTO_ALTA_REQUEST, POST_ALERTAS_EVENTO_ALTA_RECEIVE, POST_ALERTAS_EVENTO_ALTA_ERROR } from '../actions/actionTypes';
import { PostAlertasEventoAltaRequest, PostAlertasEventoAltaReceive, PostAlertasEventoAltaError, PostAlertasEventoAltaRequestPayload, PostAlertasEventoAltaReceivePayload, PostAlertasEventoAltaErrorPayload } from '../types/PostAlertasEventoAltaType';

export const postAlertasEventoAltaRequest = ( payload: PostAlertasEventoAltaRequestPayload ): PostAlertasEventoAltaRequest => ({
    type: POST_ALERTAS_EVENTO_ALTA_REQUEST,
    payload    
});

export const postAlertasEventoAltaRecieve = ( payload: PostAlertasEventoAltaReceivePayload ): PostAlertasEventoAltaReceive => ({
    type: POST_ALERTAS_EVENTO_ALTA_RECEIVE,
    payload
});

export const postAlertasEventoAltaError = ( payload: PostAlertasEventoAltaErrorPayload ): PostAlertasEventoAltaError => ({
    type: POST_ALERTAS_EVENTO_ALTA_ERROR,
    payload,
}); 