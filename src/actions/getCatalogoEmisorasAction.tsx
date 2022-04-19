import { GET_CATALOGO_EMISORAS_REQUEST, GET_CATALOGO_EMISORAS_RECEIVE, GET_CATALOGO_EMISORAS_ERROR } from '../actions/actionTypes';
import { GetCatalogoEmisorasRequest, GetCatalogoEmisorasReceive, GetCatalogoEmisorasError, GetCatalogoEmisorasRequestPayload, GetCatalogoEmisorasReceivePayload, GetCatalogoEmisorasErrorPayload } from '../types/GetCatalogoEmisotasType';

export const getCatalogoEmisorasRequest = ( payload: GetCatalogoEmisorasRequestPayload ): GetCatalogoEmisorasRequest => ({
    type: GET_CATALOGO_EMISORAS_REQUEST,
    payload    
});

export const getCatalogoEmisorasRecieve = ( payload: GetCatalogoEmisorasReceivePayload ): GetCatalogoEmisorasReceive => ({
    type: GET_CATALOGO_EMISORAS_RECEIVE,
    payload
});

export const getCatalogoEmisorasError = ( payload: GetCatalogoEmisorasErrorPayload ): GetCatalogoEmisorasError => ({
    type: GET_CATALOGO_EMISORAS_ERROR,
    payload,
}); 