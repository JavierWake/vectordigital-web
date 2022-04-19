import { GET_INFO_EMISORA_REQUEST, GET_INFO_EMISORA_RECEIVE, GET_INFO_EMISORA_ERROR, RESET_STATE_INFO_EMISORA } from './actionTypes';
import { GetInfoEmisoraRequest, GetInfoEmisoraReceive, GetInfoEmisoraError, GetInfoEmisoraRequestPayload, GetInfoEmisoraReceivePayload, GetInfoEmisoraErrorPayload, GetInfoEmisoraResetPayload, GetInfoEmisoraReset } from '../types/InfoEmisoraTypes';

export const getInfoEmisoraRequest = (payload: GetInfoEmisoraRequestPayload): GetInfoEmisoraRequest => ({
    type: GET_INFO_EMISORA_REQUEST,
    payload,    
});

export const getInfoEmisoraRecieve = ( payload: GetInfoEmisoraReceivePayload ): GetInfoEmisoraReceive => ({
    type: GET_INFO_EMISORA_RECEIVE,
    payload,
});

export const getInfoEmisoraError = ( payload: GetInfoEmisoraErrorPayload ): GetInfoEmisoraError => ({
    type: GET_INFO_EMISORA_ERROR,
    payload,
}); 

export const getInfoEmisoraReset = ( payload: GetInfoEmisoraResetPayload ): GetInfoEmisoraReset => ({
    type: RESET_STATE_INFO_EMISORA,
    payload,
}); 
