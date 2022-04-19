import { DELETE_LIST_REQUEST, DELETE_LIST_RECEIVE, DELETE_LIST_ERROR } from '../actions/actionTypes';
import { DeleteListRequest, DeleteListReceive, DeleteListError, DeleteListErrorPayload,DeleteListReceivePayload, DeleteListRequestPayload  } from '../types/DeleteListTypes';

export const deleteListRequest = (payload: DeleteListRequestPayload): DeleteListRequest => ({
    type: DELETE_LIST_REQUEST,
    payload,
    
});

export const deleteListRecieve = (payload: DeleteListReceivePayload): DeleteListReceive => ({
    type: DELETE_LIST_RECEIVE,
    payload,
});

export const deleteListError = ( payload: DeleteListErrorPayload ): DeleteListError => ({
    type: DELETE_LIST_ERROR,
    payload,
});