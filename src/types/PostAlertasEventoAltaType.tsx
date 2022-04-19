import { POST_ALERTAS_EVENTO_ALTA_REQUEST, POST_ALERTAS_EVENTO_ALTA_RECEIVE, POST_ALERTAS_EVENTO_ALTA_ERROR } from '../actions/actionTypes';

export interface PostAlertasEventoAltaResponse {
    ierror: number;
    cerror: string;
}

export interface PostAlertasEventoAltaState {
    loading: boolean;
    postAlertasEventoAltaRespuesta: PostAlertasEventoAltaResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostAlertasEventoAltaRequestPayload {
    message: string;
    params: string[];
}

export interface PostAlertasEventoAltaReceivePayload {
    postAlertasEventoAltaRespuesta: PostAlertasEventoAltaResponse;
}

export interface PostAlertasEventoAltaErrorPayload {
    error: string | null;
}

export interface PostAlertasEventoAltaRequest {
    type: typeof POST_ALERTAS_EVENTO_ALTA_REQUEST;
    payload: PostAlertasEventoAltaRequestPayload;
}

export interface PostAlertasEventoAltaReceive {
    type: typeof POST_ALERTAS_EVENTO_ALTA_RECEIVE;
    payload: PostAlertasEventoAltaReceivePayload;
}

export interface PostAlertasEventoAltaError {
    type: typeof POST_ALERTAS_EVENTO_ALTA_ERROR;
    payload: PostAlertasEventoAltaErrorPayload;
}

export type PostAlertasEventoAltaActions = 
| PostAlertasEventoAltaRequest
| PostAlertasEventoAltaReceive
| PostAlertasEventoAltaError;
