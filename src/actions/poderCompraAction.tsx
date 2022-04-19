import { GET_PODER_COMPRA_REQUEST, GET_PODER_COMPRA_RECEIVE, GET_PODER_COMPRA_ERROR } from '../actions/actionTypes';
import { poderCompraRequest, poderCompraReceive, poderCompraError, poderCompraRequestPayload, poderCompraErrorPayload, poderCompraReceivePayload } from '../types/PoderCompraType';

export const getPoderCompraRequest = (payload: poderCompraRequestPayload): poderCompraRequest => ({
    type: GET_PODER_COMPRA_REQUEST,
    payload    
});

export const getPoderCompraRecieve = ( payload: poderCompraReceivePayload ): poderCompraReceive => ({
    type: GET_PODER_COMPRA_RECEIVE,
    payload
});

export const getPoderCompraError = ( payload: poderCompraErrorPayload ): poderCompraError => ({
    type: GET_PODER_COMPRA_ERROR,
    payload,
}); 