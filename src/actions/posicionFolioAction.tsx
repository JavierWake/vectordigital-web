import { RESET_STATE_TARJETA_FOLIO, POST_POSICION_FOLIO_REQUEST, POST_POSICION_FOLIO_RECEIVE, POST_POSICION_FOLIO_ERROR } from './actionTypes';
import { PosicionFolioRequest, PosicionFolioReceive, PosicionFolioError, PosicionFolioRequestPayload, PosicionFolioReceivePayload, PosicionFolioErrorPayload, PosicionFolioReset, PosicionFolioResetPayload } from '../types/PosicionFolioTypes';

export const postPosicionFolioRequest = (payload: PosicionFolioRequestPayload): PosicionFolioRequest => ({
    type: POST_POSICION_FOLIO_REQUEST,
    payload
});

export const postPosicionFolioRecieve = ( payload: PosicionFolioReceivePayload ): PosicionFolioReceive => ({
    type: POST_POSICION_FOLIO_RECEIVE,
    payload
});

export const postPosicionFolioError = ( payload: PosicionFolioErrorPayload ): PosicionFolioError => ({
    type: POST_POSICION_FOLIO_ERROR,
    payload,
});

export const postPosicionFolioReset = ( payload: PosicionFolioResetPayload ): PosicionFolioReset => ({
    type: RESET_STATE_TARJETA_FOLIO,
    payload,
});
