import { GET_PREGUNTA_SECRETA_REQUEST, GET_PREGUNTA_SECRETA_RECEIVE, GET_PREGUNTA_SECRETA_ERROR, RESET_STATE_PREGUNTA_SECRETA } from '../actions/actionTypes';

export interface CatPreguntaSecreta {
    Pregunta: number;
    NombrePregunta: string;
    Seleccionada: boolean;
}

export interface DsPreguntaSecretas {
    catPreguntaSecreta: CatPreguntaSecreta[];
}

export interface GetPreguntaSecretaResponse {
    ierror: number;
    cerror: string;
    dsPreguntaSecretas: DsPreguntaSecretas;
}

export interface GetPreguntaSecretaState {
    loading: boolean;
    getPreguntaSecretaRespuesta: GetPreguntaSecretaResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetPreguntaSecretaRequestPayload {
    message: string;
    params: string[];
}

export interface GetPreguntaSecretaReceivePayload {
    getPreguntaSecretaRespuesta: GetPreguntaSecretaResponse;
}

export interface GetPreguntaSecretaErrorPayload {
    error: string | null;
}

export interface GetPreguntaSecretaResetPayload {
    hacerReset: boolean;
}

export interface GetPreguntaSecretaReset {
    type: typeof RESET_STATE_PREGUNTA_SECRETA;
    payload: GetPreguntaSecretaResetPayload;
}

export interface GetPreguntaSecretaRequest {
    type: typeof GET_PREGUNTA_SECRETA_REQUEST;
    payload: GetPreguntaSecretaRequestPayload;
}

export interface GetPreguntaSecretaReceive {
    type: typeof GET_PREGUNTA_SECRETA_RECEIVE;
    payload: GetPreguntaSecretaReceivePayload;
}

export interface GetPreguntaSecretaError {
    type: typeof GET_PREGUNTA_SECRETA_ERROR;
    payload: GetPreguntaSecretaErrorPayload;
}

export type GetPreguntaSecretaActions = 
| GetPreguntaSecretaRequest
| GetPreguntaSecretaReceive
| GetPreguntaSecretaError
| GetPreguntaSecretaReset;
