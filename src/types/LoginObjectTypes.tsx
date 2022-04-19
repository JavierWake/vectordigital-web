import { POST_LOGIN_OBJECT_REQUEST, POST_LOGIN_OBJECT_RECEIVE, POST_LOGIN_OBJECT_ERROR, POST_LOGIN_OBJECT_LOGOUT } from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist';

export interface TdsLogin {
    token: string;
    cuentasesion: number;
    cuentacontrato: number;
    id: number;
    perfil: string;
    clase: number;
    Folio: number;
    nombre: string;
    ultAcceso: string;
    serverhttp: string;
    server_webspeed: string;
    idioma: number;
    sesion: number;
    sesiongral: number;
    version: string;
    urlVersion: string;
    forceVersion: boolean;
    debug: string;
}

export interface TdsAvisos {
    IdAviso: number;
    Version: number;
    Titulo: string;
    Contenido: string;
    Obligatorio: boolean;
    Fecha: string;
}

export interface TdsServicios {
    Opera: boolean;
    TiempoReal: boolean;
    Profundidad: boolean;
    VentaCorto: boolean;
    EdoctaOnline: boolean;
}

export interface DsLogin {
    tdsListaCuentas: any[];
    tdsAvisos: TdsAvisos[];
    tdsLogin: TdsLogin[];
    tdsServicios: TdsServicios[];
}

export interface LoginObjectResponse {
    cerror: string;
    ierror: number;
    dsLogin: DsLogin;
    //tdsListaCuentas: any[];
    //tdsAvisos: TdsAvisos[]
}

export interface LoginObjectState {
    loading: boolean;
    response: LoginObjectResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PostLoginObjectRehydratePayload {
    loginObjectState: LoginObjectState;//LoginObjectState;//any; //LoginObjectResponse; //any por mientras
}

export interface PostLoginObjectRequestPayload {
    message: string;
    params: string[];
}

export interface PostLoginObjectReceivePayload {
    responseApi: LoginObjectResponse;
}

export interface PostLoginObjectErrorPayload {
    error: string | null;
}

export interface PostLoginObjectRehydrate {
    type: typeof REHYDRATE;
    payload: PostLoginObjectRehydratePayload;
}

export interface PostLoginObjectRequest {
    type: typeof POST_LOGIN_OBJECT_REQUEST;
    payload: PostLoginObjectRequestPayload;
}

export interface PostLoginObjectReceive {
    type: typeof POST_LOGIN_OBJECT_RECEIVE;
    payload: PostLoginObjectReceivePayload;
}

export interface PostLoginObjectError {
    type: typeof POST_LOGIN_OBJECT_ERROR;
    payload: PostLoginObjectErrorPayload;
}

export interface PostLoginObjectLogout {
    type: typeof POST_LOGIN_OBJECT_LOGOUT;
}

export type LoginObjectActions = 
| PostLoginObjectRehydrate
| PostLoginObjectRequest
| PostLoginObjectReceive
| PostLoginObjectError
| PostLoginObjectLogout;
