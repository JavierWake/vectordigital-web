import { DELETE_ISSUER_REQUEST, DELETE_ISSUER_RECEIVE, DELETE_ISSUER_ERROR } from '../actions/actionTypes';
import { DeleteIssuerRequest, DeleteIssuerReceive, DeleteIssuerError, DeleteIssuerErrorPayload, DeleteIssuerReceivePayload, DeleteIssuerRequestPayload } from '../types/DeleteIssuerTypes';

export const deleteIssuerRequest = (payload: DeleteIssuerRequestPayload): DeleteIssuerRequest => ({
    type: DELETE_ISSUER_REQUEST,
    payload
    
});

export const deleteIssuerRecieve = (payload: DeleteIssuerReceivePayload): DeleteIssuerReceive => ({
    type: DELETE_ISSUER_RECEIVE,
    payload
});

export const deleteIssuerError = ( payload: DeleteIssuerErrorPayload ): DeleteIssuerError => ({
    type: DELETE_ISSUER_ERROR,
    payload,
});