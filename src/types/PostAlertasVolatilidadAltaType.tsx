import { POST_ALERTAS_VOLATILIDAD_ALTA_REQUEST, POST_ALERTAS_VOLATILIDAD_ALTA_RECEIVE, POST_ALERTAS_VOLATILIDAD_ALTA_ERROR } from '../actions/actionTypes';

export interface PostAlertasVolatilidadAltaResponse {
    ierror: number;
    cerror: string;
}

export interface PostAlertasVolatilidadAltaState {
    loading: boolean;
    postAlertasVolatilidadAltaRespuesta: PostAlertasVolatilidadAltaResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostAlertasVolatilidadAltaRequestPayload {
    message: string;
    params: string[];
}

export interface PostAlertasVolatilidadAltaReceivePayload {
    postAlertasVolatilidadAltaRespuesta: PostAlertasVolatilidadAltaResponse;
}

export interface PostAlertasVolatilidadAltaErrorPayload {
    error: string | null;
}

export interface PostAlertasVolatilidadAltaRequest {
    type: typeof POST_ALERTAS_VOLATILIDAD_ALTA_REQUEST;
    payload: PostAlertasVolatilidadAltaRequestPayload;
}

export interface PostAlertasVolatilidadAltaReceive {
    type: typeof POST_ALERTAS_VOLATILIDAD_ALTA_RECEIVE;
    payload: PostAlertasVolatilidadAltaReceivePayload;
}

export interface PostAlertasVolatilidadAltaError {
    type: typeof POST_ALERTAS_VOLATILIDAD_ALTA_ERROR;
    payload: PostAlertasVolatilidadAltaErrorPayload;
}

export type PostAlertasVolatilidadAltaActions = 
| PostAlertasVolatilidadAltaRequest
| PostAlertasVolatilidadAltaReceive
| PostAlertasVolatilidadAltaError;
