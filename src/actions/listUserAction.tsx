import { LIST_USER_REQUEST, LIST_USER_RECEIVE, LIST_USER_ERROR } from '../actions/actionTypes'
import { GetListUserRequest, GetListUserReceive, GetListUserReceivePayload, GetListError, GetListUserErrorPayload } from '../types/UsertListTypes';

export const getListUserRequest = (payload: string): GetListUserRequest => ({
    type: LIST_USER_REQUEST,
    payload
    
});

export const getListUserRecieve = ( payload: GetListUserReceivePayload ): GetListUserReceive => ({
    type: LIST_USER_RECEIVE,
    payload,
});

export const getListUserError = ( payload: GetListUserErrorPayload ): GetListError => ({
    type: LIST_USER_ERROR,
    payload,
}); 
