import { GET_EMISORA_SIMILAR_REQUEST, GET_EMISORA_SIMILAR_RECEIVE, GET_EMISORA_SIMILAR_ERROR } from './actionTypes';
import { GetEmisorasSimilaresRequest, GetEmisorasSimilaresRequestPayload, GetEmisorasSimilaresReceive, GetEmisorasSimilaresReceivePayload, GetEmisorasSimilaresError, GetEmisorasSimilaresErrorPayload } from '../types/EmisorasSimilaresTypes';

export const getEmisorasSimilaresRequest = (payload: GetEmisorasSimilaresRequestPayload): GetEmisorasSimilaresRequest => ({
    type: GET_EMISORA_SIMILAR_REQUEST,
    payload
    
});

export const getEmisorasSimilaresRecieve = ( payload: GetEmisorasSimilaresReceivePayload ): GetEmisorasSimilaresReceive => ({
    type: GET_EMISORA_SIMILAR_RECEIVE,
    payload,
});

export const getEmisorasSimilaresError = ( payload: GetEmisorasSimilaresErrorPayload ): GetEmisorasSimilaresError => ({
    type: GET_EMISORA_SIMILAR_ERROR,
    payload,
}); 