import { RESET_STATE_MODIF_CANCEL_ORDENES, POST_ORDEN_REQUEST, POST_ORDEN_RECEIVE, POST_ORDEN_ERROR } from '../actions/actionTypes';
import { EditOrdenRequest, EditOrdenReceive, EditOrdenError, EditOrdenRequestPayload, EditOrdenReceivePayload, EditOrdenErrorPayload, EditOrdenResetPayload, EditOrdenReset } from '../types/EditOrdenTypes';

export const postEditOrdenRequest = (payload: EditOrdenRequestPayload): EditOrdenRequest => ({
    type: POST_ORDEN_REQUEST,
    payload
});

export const postEditOrdenReceive = (payload: EditOrdenReceivePayload): EditOrdenReceive => ({
    type: POST_ORDEN_RECEIVE,
    payload
});

export const postEditOrdenError = (payload: EditOrdenErrorPayload):  EditOrdenError => ({
    type: POST_ORDEN_ERROR,
    payload
});

export const postEditOrdenReset = ( payload: EditOrdenResetPayload ): EditOrdenReset => ({
    type: RESET_STATE_MODIF_CANCEL_ORDENES,
    payload,
}); 
