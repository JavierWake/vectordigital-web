import { POST_ISSUER_REQUEST, POST_ISSUER_RECEIVE, POST_ISSUER_ERROR } from './actionTypes';
import { PostIssuerRequest, PostIssuerRequestPayload, PostIssuerReceive, PostIssuerReceivePayload, PostIssuerError, PostIssuerErrorPayload } from '../types/PostIssuerTypes';

//Agregar una emisora a una lista

export const postIssuerRequest = (payload: PostIssuerRequestPayload): PostIssuerRequest => ({
    type: POST_ISSUER_REQUEST,
    payload
    
});

export const postIssuerRecieve = (payload: PostIssuerReceivePayload): PostIssuerReceive => ({
    type: POST_ISSUER_RECEIVE,
    payload
});

export const postIssuerError = ( payload: PostIssuerErrorPayload ): PostIssuerError => ({
    type: POST_ISSUER_ERROR,
    payload,
}); 