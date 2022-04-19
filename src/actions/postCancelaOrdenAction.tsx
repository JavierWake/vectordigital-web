import { RESET_STATE_MODIF_CANCEL_ORDENES, POST_CANCELA_ORDEN_REQUEST, POST_CANCELA_ORDEN_RECEIVE, POST_CANCELA_ORDEN_ERROR } from '../actions/actionTypes';
import { PostCancelaOrdenRequest, PostCancelaOrdenReceive, PostCancelaOrdenError, PostCancelaOrdenRequestPayload, PostCancelaOrdenReceivePayload, PostCancelaOrdenErrorPayload, PostCancelaOrdenResetPayload, PostCancelaOrdenReset } from '../types/PostCancelaOrdenType';

export const postCancelaOrdenRequest = (payload: PostCancelaOrdenRequestPayload): PostCancelaOrdenRequest => ({
    type: POST_CANCELA_ORDEN_REQUEST,
    payload
});

export const postCancelaOrdenReceive = (payload: PostCancelaOrdenReceivePayload): PostCancelaOrdenReceive => ({
    type: POST_CANCELA_ORDEN_RECEIVE,
    payload
});

export const postCancelaOrdenError = (payload: PostCancelaOrdenErrorPayload):  PostCancelaOrdenError => ({
    type: POST_CANCELA_ORDEN_ERROR,
    payload
});

export const postCancelaOrdenReset = ( payload: PostCancelaOrdenResetPayload ): PostCancelaOrdenReset => ({
    type: RESET_STATE_MODIF_CANCEL_ORDENES,
    payload,
}); 
