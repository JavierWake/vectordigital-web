import { GET_CARTERA_REQUEST, GET_CARTERA_RECEIVE, GET_CARTERA_ERROR } from '../actions/actionTypes';
import { CarteraRequest, CarteraReceive, CarteraError, CarteraRequestPayload, CarteraErrorPayload, CarteraReceivePayload } from '../types/CarteraTypes';

export const getCarteraRequest = (payload: CarteraRequestPayload): CarteraRequest => ({
    type: GET_CARTERA_REQUEST,
    payload    
});

export const getCarteraRecieve = ( payload: CarteraReceivePayload ): CarteraReceive => ({
    type: GET_CARTERA_RECEIVE,
    payload
});

export const getCarteraError = ( payload: CarteraErrorPayload ): CarteraError => ({
    type: GET_CARTERA_ERROR,
    payload,
}); 