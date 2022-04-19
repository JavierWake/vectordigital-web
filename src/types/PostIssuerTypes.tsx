import { POST_ISSUER_REQUEST, POST_ISSUER_RECEIVE, POST_ISSUER_ERROR } from '../actions/actionTypes';

//Agregar una emisora a una lista

export interface PostIssuerState {
    loading: boolean;
    error: string | null;
    message: string;
    id: any;
    idRespuesta: number;
    messageRespueta: string;
}

export interface PostIssuerRequestPayload {
    message: string;
    id: any;
}

export interface PostIssuerReceivePayload {
    idRespuesta: number;
    messageRespueta: string;
}

export interface PostIssuerErrorPayload {
    error: string;
}

export interface PostIssuerRequest {
    type: typeof POST_ISSUER_REQUEST;
    payload: PostIssuerRequestPayload;
}

export type PostIssuerReceive = {
    type: typeof POST_ISSUER_RECEIVE;
    payload: PostIssuerReceivePayload;
};

export type PostIssuerError = {
    type: typeof POST_ISSUER_ERROR;
    payload: PostIssuerErrorPayload;
};

export type PostIssuerActions = 
| PostIssuerRequest
| PostIssuerReceive
| PostIssuerError;