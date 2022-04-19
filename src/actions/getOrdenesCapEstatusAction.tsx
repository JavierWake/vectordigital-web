import { GET_ORDENES_CAP_ESTATUS_REQUEST, GET_ORDENES_CAP_ESTATUS_RECEIVE, GET_ORDENES_CAP_ESTATUS_ERROR, RESET_STATE_GET_ORDENES } from '../actions/actionTypes';
import { GetOrdenesCapEstatusRequest, GetOrdenesCapEstatusReceive, GetOrdenesCapEstatusError, GetOrdenesCapEstatusRequestPayload, GetOrdenesCapEstatusReceivePayload, GetOrdenesCapEstatusErrorPayload, GetOrdenesCapEstatusResetPayload, GetOrdenesCapEstatusReset } from '../types/GetOrdenesCapEstatusType';

export const getOrdenesCapEstatusRequest = ( payload: GetOrdenesCapEstatusRequestPayload ): GetOrdenesCapEstatusRequest => ({
    type: GET_ORDENES_CAP_ESTATUS_REQUEST,
    payload    
});

export const getOrdenesCapEstatusRecieve = ( payload: GetOrdenesCapEstatusReceivePayload ): GetOrdenesCapEstatusReceive => ({
    type: GET_ORDENES_CAP_ESTATUS_RECEIVE,
    payload
});

export const getOrdenesCapEstatusError = ( payload: GetOrdenesCapEstatusErrorPayload ): GetOrdenesCapEstatusError => ({
    type: GET_ORDENES_CAP_ESTATUS_ERROR,
    payload,
}); 

export const getOrdenesCapEstatusReset = ( payload: GetOrdenesCapEstatusResetPayload ): GetOrdenesCapEstatusReset => ({
    type: RESET_STATE_GET_ORDENES,
    payload,
}); 
