import { POST_PREGUNTA_SECRETA_REQUEST, POST_PREGUNTA_SECRETA_RECEIVE, POST_PREGUNTA_SECRETA_ERROR, RESET_STATE_PREGUNTA_SECRETA } from '../actions/actionTypes';

export interface PostPreguntaSecretaResponse {
    ierror: number;
    cerror: string;
}

export interface PostPreguntaSecretaState {
    loading: boolean;
    postPreguntaSecretaRespuesta: PostPreguntaSecretaResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostPreguntaSecretaRequestPayload {
    message: string;
    params: string[];
}

export interface PostPreguntaSecretaReceivePayload {
    postPreguntaSecretaRespuesta: PostPreguntaSecretaResponse;
}

export interface PostPreguntaSecretaErrorPayload {
    error: string | null;
}

export interface PostPreguntaSecretaResetPayload {
    hacerReset: boolean;
}

export interface PostPreguntaSecretaReset {
    type: typeof RESET_STATE_PREGUNTA_SECRETA;
    payload: PostPreguntaSecretaResetPayload;
}

export interface PostPreguntaSecretaRequest {
    type: typeof POST_PREGUNTA_SECRETA_REQUEST;
    payload: PostPreguntaSecretaRequestPayload;
}

export interface PostPreguntaSecretaReceive {
    type: typeof POST_PREGUNTA_SECRETA_RECEIVE;
    payload: PostPreguntaSecretaReceivePayload;
}

export interface PostPreguntaSecretaError {
    type: typeof POST_PREGUNTA_SECRETA_ERROR;
    payload: PostPreguntaSecretaErrorPayload;
}

export type PostPreguntaSecretaActions = 
| PostPreguntaSecretaRequest
| PostPreguntaSecretaReceive
| PostPreguntaSecretaError
| PostPreguntaSecretaReset;
