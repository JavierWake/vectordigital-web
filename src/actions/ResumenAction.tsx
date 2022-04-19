import { GET_RESUMEN_REQUEST, GET_RESUMEN_RECEIVE, GET_RESUMEN_ERROR } from '../actions/actionTypes';
import { ResumenRequest, ResumenReceive, ResumenRequestPayload, ResumenError, ResumenReceivePayload, ResumenErrorPayload } from '../types/ResumenTypes';

export const getResumenRequest = (payload: ResumenRequestPayload): ResumenRequest => ({
    type: GET_RESUMEN_REQUEST,
    payload
    
});

export const getResumenRecieve = ( payload: ResumenReceivePayload ): ResumenReceive => ({
    type: GET_RESUMEN_RECEIVE,
    payload
});

export const getResumenError = ( payload: ResumenErrorPayload ): ResumenError => ({
    type: GET_RESUMEN_ERROR,
    payload,
}); 