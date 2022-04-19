import { CHANGE_LIST_REQUEST, CHANGE_LIST_RECEIVE, CHANGE_LIST_ERROR } from '../actions/actionTypes';
import { ChangeListRequest, ChangeListReceive, ChangeListError, ChangeListRequestPayload, ChangeListErrorPayload } from '../types/ChangeListNameType';

export const changeListRequest = (payload: ChangeListRequestPayload): ChangeListRequest => ({
    type: CHANGE_LIST_REQUEST,
    payload
    
});

export const changeListRecieve = (): ChangeListReceive => ({
    type: CHANGE_LIST_RECEIVE
});

export const changeListError = ( payload: ChangeListErrorPayload ): ChangeListError => ({
    type: CHANGE_LIST_ERROR,
    payload,
});