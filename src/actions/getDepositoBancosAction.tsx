import { GET_DEPOSITO_BANCOS_REQUEST, GET_DEPOSITO_BANCOS_RECEIVE, GET_DEPOSITO_BANCOS_ERROR } from '../actions/actionTypes';
import { GetDepositoBancosRequest, GetDepositoBancosReceive, GetDepositoBancosError, GetDepositoBancosRequestPayload, GetDepositoBancosReceivePayload, GetDepositoBancosErrorPayload } from '../types/GetDepositoBancosType';

export const getDepositoBancosRequest = ( payload: GetDepositoBancosRequestPayload ): GetDepositoBancosRequest => ({
    type: GET_DEPOSITO_BANCOS_REQUEST,
    payload    
});

export const getDepositoBancosRecieve = ( payload: GetDepositoBancosReceivePayload ): GetDepositoBancosReceive => ({
    type: GET_DEPOSITO_BANCOS_RECEIVE,
    payload
});

export const getDepositoBancosError = ( payload: GetDepositoBancosErrorPayload ): GetDepositoBancosError => ({
    type: GET_DEPOSITO_BANCOS_ERROR,
    payload,
}); 