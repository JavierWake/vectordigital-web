import { RESET_STATE_TARJETA_FOLIO, GET_FOLIO_REQUEST, GET_FOLIO_RECEIVE, GET_FOLIO_ERROR } from './actionTypes';
import { FolioDataReset, FolioDataResetPayload, FolioDataRequest, FolioDataReceive, FolioDataError, FolioDataRequestPayload, FolioDataReceivePayload, FolioDataErrorPayload } from '../types/FolioDataTypes';

export const getFolioDataRequest = (payload: FolioDataRequestPayload): FolioDataRequest => ({
    type: GET_FOLIO_REQUEST,
    payload
});

export const getFolioDataRecieve = ( payload: FolioDataReceivePayload ): FolioDataReceive => ({
    type: GET_FOLIO_RECEIVE,
    payload
});

export const getFolioDataError = ( payload: FolioDataErrorPayload ): FolioDataError => ({
    type: GET_FOLIO_ERROR,
    payload,
});

export const getFolioDataReset = ( payload: FolioDataResetPayload ): FolioDataReset => ({
    type: RESET_STATE_TARJETA_FOLIO,
    payload,
});
