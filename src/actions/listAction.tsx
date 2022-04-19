import { LIST_API_REQUEST, LIST_API_RECEIVE, LIST_API_ERROR, LIST_API_RESET } from './actionTypes';
import { GetListRequest, GetReceiveList, GetListError, GetListRequestPayload, GetListReceivePayload, GetListErrorPayload, GetListReset, GetListResetPayload } from '../types/ListTypes';

export const getListRequest = (payload: GetListRequestPayload): GetListRequest => ({
    type: LIST_API_REQUEST,
    payload,    
});

export const getListRecieve = ( payload: GetListReceivePayload ): GetReceiveList => ({
    type: LIST_API_RECEIVE,
    payload,
});

export const getListError = ( payload: GetListErrorPayload ): GetListError => ({
    type: LIST_API_ERROR,
    payload,
}); 


export const getListReset = ( payload: GetListResetPayload ): GetListReset => ({
    type: LIST_API_RESET,
    payload,
});