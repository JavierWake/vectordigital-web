import { GET_PERMISOS_REQUEST, GET_PERMISOS_RECEIVE, GET_PERMISOS_ERROR, GET_PERMISOS_RESET } from '../actions/actionTypes';
import { GetPermisosRequest, GetPermisosReceive, GetPermisosError, GetPermisosRequestPayload, GetPermisosReceivePayload, GetPermisosErrorPayload, GetPermisosResetPayload, GetPermisosReset } from '../types/GetPermisosType';

export const getPermisosRequest = ( payload: GetPermisosRequestPayload ): GetPermisosRequest => ({
    type: GET_PERMISOS_REQUEST,
    payload    
});

export const getPermisosRecieve = ( payload: GetPermisosReceivePayload ): GetPermisosReceive => ({
    type: GET_PERMISOS_RECEIVE,
    payload
});

export const getPermisosError = ( payload: GetPermisosErrorPayload ): GetPermisosError => ({
    type: GET_PERMISOS_ERROR,
    payload,
}); 

export const getPermisosReset = ( payload: GetPermisosResetPayload ): GetPermisosReset => ({
    type: GET_PERMISOS_RESET,
    payload,
}); 
