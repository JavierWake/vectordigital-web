import { POST_RESUMEN_MERCADO_REQUEST, POST_RESUMEN_MERCADO_RECEIVE, POST_RESUMEN_MERCADO_ERROR } from '../actions/actionTypes';
import { PostResumenMercadoRequest, PostResumenMercadoReceive, PostResumenMercadoError, PostResumenMercadoRequestPayload, PostResumenMercadoErrorPayload, PostResumenMercadoReceivePayload } from '../types/PostResumenMercadoType';

export const postResumenMercadoRequest = (payload: PostResumenMercadoRequestPayload): PostResumenMercadoRequest => ({
    type: POST_RESUMEN_MERCADO_REQUEST,
    payload    
});

export const postResumenMercadoRecieve = ( payload: PostResumenMercadoReceivePayload ): PostResumenMercadoReceive => ({
    type: POST_RESUMEN_MERCADO_RECEIVE,
    payload
});

export const postResumenMercadoError = ( payload: PostResumenMercadoErrorPayload ): PostResumenMercadoError => ({
    type: POST_RESUMEN_MERCADO_ERROR,
    payload,
});