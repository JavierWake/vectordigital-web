import { POST_PREGUNTA_SECRETA_REQUEST, POST_PREGUNTA_SECRETA_RECEIVE, POST_PREGUNTA_SECRETA_ERROR, RESET_STATE_PREGUNTA_SECRETA } from '../actions/actionTypes';
import { PostPreguntaSecretaRequest, PostPreguntaSecretaReceive, PostPreguntaSecretaError, PostPreguntaSecretaRequestPayload, PostPreguntaSecretaReceivePayload, PostPreguntaSecretaErrorPayload, PostPreguntaSecretaResetPayload, PostPreguntaSecretaReset } from '../types/PostPreguntaSecretaType';

export const postPreguntaSecretaRequest = ( payload: PostPreguntaSecretaRequestPayload ): PostPreguntaSecretaRequest => ({
    type: POST_PREGUNTA_SECRETA_REQUEST,
    payload    
});

export const postPreguntaSecretaRecieve = ( payload: PostPreguntaSecretaReceivePayload ): PostPreguntaSecretaReceive => ({
    type: POST_PREGUNTA_SECRETA_RECEIVE,
    payload
});

export const postPreguntaSecretaError = ( payload: PostPreguntaSecretaErrorPayload ): PostPreguntaSecretaError => ({
    type: POST_PREGUNTA_SECRETA_ERROR,
    payload,
}); 

export const postPreguntaSecretaReset = ( payload: PostPreguntaSecretaResetPayload ): PostPreguntaSecretaReset => ({
    type: RESET_STATE_PREGUNTA_SECRETA,
    payload,
}); 
