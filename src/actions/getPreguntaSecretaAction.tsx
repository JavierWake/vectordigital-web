import { GET_PREGUNTA_SECRETA_REQUEST, GET_PREGUNTA_SECRETA_RECEIVE, GET_PREGUNTA_SECRETA_ERROR, RESET_STATE_PREGUNTA_SECRETA } from '../actions/actionTypes';
import { GetPreguntaSecretaRequest, GetPreguntaSecretaReceive, GetPreguntaSecretaError, GetPreguntaSecretaRequestPayload, GetPreguntaSecretaReceivePayload, GetPreguntaSecretaErrorPayload, GetPreguntaSecretaResetPayload, GetPreguntaSecretaReset } from '../types/GetPreguntaSecretaType';

export const getPreguntaSecretaRequest = ( payload: GetPreguntaSecretaRequestPayload ): GetPreguntaSecretaRequest => ({
    type: GET_PREGUNTA_SECRETA_REQUEST,
    payload    
});

export const getPreguntaSecretaRecieve = ( payload: GetPreguntaSecretaReceivePayload ): GetPreguntaSecretaReceive => ({
    type: GET_PREGUNTA_SECRETA_RECEIVE,
    payload
});

export const getPreguntaSecretaError = ( payload: GetPreguntaSecretaErrorPayload ): GetPreguntaSecretaError => ({
    type: GET_PREGUNTA_SECRETA_ERROR,
    payload,
}); 

export const getPreguntaSecretaReset = ( payload: GetPreguntaSecretaResetPayload ): GetPreguntaSecretaReset => ({
    type: RESET_STATE_PREGUNTA_SECRETA,
    payload,
}); 
