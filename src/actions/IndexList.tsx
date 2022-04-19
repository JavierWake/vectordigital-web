import { LIST_INDEX_REQUEST, LIST_INDEX_RECEIVE, LIST_INDEX_ERROR } from './actionTypes';
import { GetListIndexRequest, GetListIndexRequestPayload, GetListIndexReceive, GetListIndexReceivePayload, GetListIndexError, GetListIndexErrorPayload } from '../types/IndexList';

export const getIndexListRequest = (payload: GetListIndexRequestPayload): GetListIndexRequest => ({
    type: LIST_INDEX_REQUEST,
    payload
    
});

export const getIndexListReceive = ( payload: GetListIndexReceivePayload ): GetListIndexReceive => ({
    type: LIST_INDEX_RECEIVE,
    payload,
});

export const getIndexListError = ( payload: GetListIndexErrorPayload ): GetListIndexError => ({
    type: LIST_INDEX_ERROR,
    payload,
}); 