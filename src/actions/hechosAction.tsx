import { GET_HECHOS_REQUEST, GET_HECHOS_RECEIVE, GET_HECHOS_ERROR } from '../actions/actionTypes';
import { hechosRequest, hechosReceive, hechosError, hechosRequestPayload, hechosErrorPayload, hechosReceivePayload } from '../types/HechosType';

export const getHechosRequest = (payload: hechosRequestPayload): hechosRequest => ({
    type: GET_HECHOS_REQUEST,
    payload    
});

export const getHechosRecieve = ( payload: hechosReceivePayload ): hechosReceive => ({
    type: GET_HECHOS_RECEIVE,
    payload
});

export const getHechosError = ( payload: hechosErrorPayload ): hechosError => ({
    type: GET_HECHOS_ERROR,
    payload,
}); 