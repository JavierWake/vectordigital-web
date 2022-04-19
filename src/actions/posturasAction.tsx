import { GET_POSTURAS_REQUEST, GET_POSTURAS_RECEIVE, GET_POSTURAS_ERROR } from './actionTypes';
import { GetPosturasRequest, GetPosturasRequestPayload, GetPosturasReceive, GetPosturasReceivePayload, GetPosturasError, GetPosturasErrorPayload } from '../types/PosturasTypes';

export const getPosturasRequest = (payload: GetPosturasRequestPayload): GetPosturasRequest => ({
    type: GET_POSTURAS_REQUEST,
    payload
});

export const getPosturasRecieve = ( payload: GetPosturasReceivePayload ): GetPosturasReceive => ({
    type: GET_POSTURAS_RECEIVE,
    payload,
});

export const getPosturasError = ( payload: GetPosturasErrorPayload ): GetPosturasError => ({
    type: GET_POSTURAS_ERROR,
    payload,
}); 
