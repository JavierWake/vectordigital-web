import {PUT_LIST_ULTIMA_REQUEST, PUT_LIST_ULTIMA_RECEIVE, PUT_LIST_ULTIMA_ERROR} from './actionTypes';
import { PutListUltimaRequest, PutListUltimaReceive, PutListUltimaError, PutListUltimaRequestPayload, PutListUltimaReceivePayload, PutListUltimaErrorPayload } from '../types/ListUltimaTypes';

export const putListUltimaRequest = (payload: PutListUltimaRequestPayload): PutListUltimaRequest => ({
    type: PUT_LIST_ULTIMA_REQUEST,
    payload,    
});

export const putListUltimaRecieve = ( payload: PutListUltimaReceivePayload ): PutListUltimaReceive=> ({
    type: PUT_LIST_ULTIMA_RECEIVE,
    payload,
});

export const putListUltimaError = ( payload: PutListUltimaErrorPayload ): PutListUltimaError => ({
    type: PUT_LIST_ULTIMA_ERROR,
    payload,
}); 