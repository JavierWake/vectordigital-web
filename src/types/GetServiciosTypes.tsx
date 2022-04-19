import { GET_SERVICIOS_REQUEST, GET_SERVICIOS_RECEIVE, GET_SERVICIOS_ERROR } from '../actions/actionTypes';

export interface ItdsServicios {
    IdServicio: number;
    IdServicioString: string;
    activoCelular: boolean;
    activoCorreo: boolean;
    activoVC: boolean;
    activoVMovil: boolean;
    activoWhatsApp: boolean;
    descripcion: string;
    esAndroid: boolean;
    esDescarga: boolean;
    esEmail: boolean;
    esIOS: boolean;
    esSMS: boolean;
    esVC: boolean;
    esVM: boolean;
    esWP: boolean;
    extraClass: string;
    extraConfig: string;
    nombre: string;
    puedeConfigurarCelular: boolean;
    puedeConfigurarCorreo: boolean;
    puedeConfigurarVC: boolean;
    puedeConfigurarVMovil: boolean;
    puedeConfigurarWhatsApp: boolean;
    subtext: string;
}

export interface ItdsCanal {
    Canal: string;
    IdCanal: number;
}

export interface IDsServicios {
    tdsServicios: ItdsServicios[];
    tdsCanal: ItdsCanal[];
}

export interface IResponse {
    ierror: number;
    cerror: string;
    confemail: boolean;
    confcelular: boolean;
    confvc: boolean;
    confwsp: boolean;
    dsServicios: IDsServicios;
}

export interface ServiciosStatus {
    loading: boolean;
    error: string | null;
    message: string;
    params: any[];

    pushSeccion: boolean;
    emailSeccion: boolean;
    whaSeccion: boolean;

    response: IResponse;
}

export interface GetServiciosRequestPayload {
    message: string;
    params: any[];
}

export interface GetServiciosReceivePayload {

    pushSeccion: any;
    emailSeccion: any;
    whaSeccion: boolean;
    
    response: IResponse;
}

export interface GetServiciosErrorPayload {
    error: any | null;
}

export interface GetServiciosRequest {
    type: typeof GET_SERVICIOS_REQUEST;
    payload: GetServiciosRequestPayload;
}

export type GetServiciosReceive = {
    type: typeof GET_SERVICIOS_RECEIVE;
    payload: GetServiciosReceivePayload;
};

export type GetServiciosError = {
    type: typeof GET_SERVICIOS_ERROR;
    payload: GetServiciosErrorPayload;
};

export type serviciosActions =
| GetServiciosRequest
| GetServiciosReceive
| GetServiciosError;