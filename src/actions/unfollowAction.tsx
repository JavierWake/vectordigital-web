import { DELETE_UNFOLLOW_REQUEST, DELETE_UNFOLLOW_RECEIVE, DELETE_UNFOLLOW_ERROR } from '../actions/actionTypes';
import { DeleteUnfollowReceive, DeleteUnfollowRequest, DeleteUnfollowErrorPayload, DeleteUnfollowRequestPayload, DeleteUnfollowError} from '../types/UnfollowListTypes';

export const deleteUnfollowRequest = (payload: DeleteUnfollowRequestPayload): DeleteUnfollowRequest => ({
    type: DELETE_UNFOLLOW_REQUEST,
    payload
    
});

export const deleteUnfollowRecieve = (): DeleteUnfollowReceive => ({
    type: DELETE_UNFOLLOW_RECEIVE
});

export const deleteUnfollowError = ( payload: DeleteUnfollowErrorPayload ): DeleteUnfollowError => ({
    type: DELETE_UNFOLLOW_ERROR,
    payload,
}); 