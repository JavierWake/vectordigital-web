import { GET_CATALOGO_LISTA_EMISORAS_REQUEST, GET_CATALOGO_LISTA_EMISORAS_RECEIVE, GET_CATALOGO_LISTA_EMISORAS_ERROR } from '../actions/actionTypes';
import { GetCatalogoListaEmisorasRequest, GetCatalogoListaEmisorasReceive, GetCatalogoListaEmisorasError, GetCatalogoListaEmisorasRequestPayload, GetCatalogoListaEmisorasReceivePayload, GetCatalogoListaEmisorasErrorPayload } from '../types/GetCatalogoListaEmisorasType';

export const getCatalogoListaEmisorasRequest = ( payload: GetCatalogoListaEmisorasRequestPayload ): GetCatalogoListaEmisorasRequest => ({
    type: GET_CATALOGO_LISTA_EMISORAS_REQUEST,
    payload    
});

export const getCatalogoListaEmisorasRecieve = ( payload: GetCatalogoListaEmisorasReceivePayload ): GetCatalogoListaEmisorasReceive => ({
    type: GET_CATALOGO_LISTA_EMISORAS_RECEIVE,
    payload
});

export const getCatalogoListaEmisorasError = ( payload: GetCatalogoListaEmisorasErrorPayload ): GetCatalogoListaEmisorasError => ({
    type: GET_CATALOGO_LISTA_EMISORAS_ERROR,
    payload,
}); 