import { GET_CAP_EMISORA_DETALLE_REQUEST, GET_CAP_EMISORA_DETALLE_RECEIVE, GET_CAP_EMISORA_DETALLE_ERROR } from '../actions/actionTypes';
import { GetCapEmisoraDetalleRequest, GetCapEmisoraDetalleReceive, GetCapEmisoraDetalleError, GetCapEmisoraDetalleRequestPayload, GetCapEmisoraDetalleReceivePayload, GetCapEmisoraDetalleErrorPayload } from '../types/GetCapEmisoraDetalleType';

export const getCapEmisoraDetalleRequest = ( payload: GetCapEmisoraDetalleRequestPayload ): GetCapEmisoraDetalleRequest => ({
    type: GET_CAP_EMISORA_DETALLE_REQUEST,
    payload    
});

export const getCapEmisoraDetalleRecieve = ( payload: GetCapEmisoraDetalleReceivePayload ): GetCapEmisoraDetalleReceive => ({
    type: GET_CAP_EMISORA_DETALLE_RECEIVE,
    payload
});

export const getCapEmisoraDetalleError = ( payload: GetCapEmisoraDetalleErrorPayload ): GetCapEmisoraDetalleError => ({
    type: GET_CAP_EMISORA_DETALLE_ERROR,
    payload,
}); 