import { GET_RESUMEN_MERCADO_REQUEST, GET_RESUMEN_MERCADO_RECEIVE, GET_RESUMEN_MERCADO_ERROR } from '../actions/actionTypes';
import { resumenMercadoRequest, resumenMercadoReceive, resumenMercadoError, resumenMercadoRequestPayload, resumenMercadoErrorPayload, resumenMercadoReceivePayload } from '../types/GetResumenMercadoType';

export const getResumenMercadoRequest = (payload: resumenMercadoRequestPayload): resumenMercadoRequest => ({
    type: GET_RESUMEN_MERCADO_REQUEST,
    payload    
});

export const getResumenMercadoRecieve = ( payload: resumenMercadoReceivePayload ): resumenMercadoReceive => ({
    type: GET_RESUMEN_MERCADO_RECEIVE,
    payload
});

export const getResumenMercadoError = ( payload: resumenMercadoErrorPayload ): resumenMercadoError => ({
    type: GET_RESUMEN_MERCADO_ERROR,
    payload,
}); 