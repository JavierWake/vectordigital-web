import { POST_STOPLOSS_REQUEST, POST_STOPLOSS_RECEIVE, POST_STOPLOSS_ERROR } from '../actions/actionTypes';

export interface InstruccionSL {
    FolioSL: number;
    EmisoraSL: string;
    SerieSL: string;
    TitulosSL: number;
    TipoSL: string;
    VigenciaSL: string;
    Ejecucion: string;
}

export interface dsRespuesta {
    InstruccionSL: InstruccionSL[];
}

export interface PostStopLossResponse {
    ierror: number;
    cerror: string;
    dsRespuesta: dsRespuesta;
}

export interface PostStopLossState {
    loading: boolean;
    response: PostStopLossResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostStopLossRequestPayload {
    message: string;
    params: string[];
}

export interface PostStopLossReceivePayload {
    response: PostStopLossResponse;
}

export interface PostStopLossErrorPayload {
    error: string | null;
}

export interface PostStopLossRequest {
    type: typeof POST_STOPLOSS_REQUEST;
    payload: PostStopLossRequestPayload;
}

export interface PostStopLossReceive {
    type: typeof POST_STOPLOSS_RECEIVE;
    payload: PostStopLossReceivePayload;
}

export interface PostStopLossError {
    type: typeof POST_STOPLOSS_ERROR;
    payload: PostStopLossErrorPayload;
}

export type PostStopLossActions = 
| PostStopLossRequest
| PostStopLossReceive
| PostStopLossError;
