import { GET_CONFIG_VA_REQUEST, GET_CONFIG_VA_RECEIVE, GET_CONFIG_VA_ERROR } from '../actions/actionTypes';
import { configVARequest, configVAReceive, configVAError, configVARequestPayload, configVAErrorPayload, configVAReceivePayload } from '../types/ConfigVAType';

export const getConfigVARequest = (payload: configVARequestPayload): configVARequest => ({
    type: GET_CONFIG_VA_REQUEST,
    payload    
});

export const getConfigVARecieve = ( payload: configVAReceivePayload ): configVAReceive => ({
    type: GET_CONFIG_VA_RECEIVE,
    payload
});

export const getConfigVAError = ( payload: configVAErrorPayload ): configVAError => ({
    type: GET_CONFIG_VA_ERROR,
    payload,
}); 