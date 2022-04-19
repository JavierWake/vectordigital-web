import { POST_LOGIN_OBJECT_REQUEST, POST_LOGIN_OBJECT_RECEIVE, POST_LOGIN_OBJECT_ERROR, POST_LOGIN_OBJECT_LOGOUT } from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist';
import { PostLoginObjectRequest, PostLoginObjectReceive, PostLoginObjectError, PostLoginObjectRequestPayload, PostLoginObjectReceivePayload, PostLoginObjectErrorPayload, PostLoginObjectRehydratePayload, PostLoginObjectRehydrate, PostLoginObjectLogout } from '../types/LoginObjectTypes';

export const postLoginObjectRehydrate = ( payload: PostLoginObjectRehydratePayload ): PostLoginObjectRehydrate => ({
    type: REHYDRATE,
    payload    
});

export const postLoginObjectRequest = ( payload: PostLoginObjectRequestPayload ): PostLoginObjectRequest => ({
    type: POST_LOGIN_OBJECT_REQUEST,
    payload    
});

export const postLoginObjectRecieve = ( payload: PostLoginObjectReceivePayload ): PostLoginObjectReceive => ({
    type: POST_LOGIN_OBJECT_RECEIVE,
    payload
});

export const postLoginObjectError = ( payload: PostLoginObjectErrorPayload ): PostLoginObjectError => ({
    type: POST_LOGIN_OBJECT_ERROR,
    payload,
}); 

export const postLoginObjectLogout = (): PostLoginObjectLogout => ({
    type: POST_LOGIN_OBJECT_LOGOUT,
}); 