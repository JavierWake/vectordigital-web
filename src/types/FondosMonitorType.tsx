import { GET_FONDOS_MONITOR_REQUEST, GET_FONDOS_MONITOR_RECEIVE, GET_FONDOS_MONITOR_ERROR } from '../actions/actionTypes';

export interface ITtCatalogoFam {
    idFamilia: number;
    Descripcion: string;
}

export interface ITdsFondos {
    idFamilia: number;
    Familia: string;
    Emisora: string;
    Serie: string;
    Descripcion: string;
    PrecioActual: number;
    Compra: number;
    Venta: number;
    FechaOper: string;
    FechaLiq: string;
    HoraCompra: string;
    HoraVenta: string;
    RendAno: string;
    RendAcum: string;
    PuedeComprar: boolean;
    PuedeVender: boolean;
    Logo: string;
    fichaLink: string;
    PortafolioMgrPost: string; 
    DescCorta: string;
    DescExtendida: string;
    GustoFondo: string;
    Plazo: string;
    Calificacion: string;
    Benchmark: string;
    Liquidez: string;
    Horario: string;
    RendU12M: string;
    EstrellasMS: string;
    LinkFichaTecnica: string;
    LinkGrafRenU12M: string;
    Caracteristicas: string;
    LinkVideoCorto: string;
    LinkVideoLargo: string;
}

export interface IFdMonitorDsRespuesta {
    ttCatalogoFam: ITtCatalogoFam[];
    tdsFondos: ITdsFondos[];
}

export interface IFondosMonitorRespuesta {
    ierror: number;
    cerror: string;
    dsRespuesta: IFdMonitorDsRespuesta;
}

export interface FondosMonitorState {
    loading: boolean;
    fondosMonitorRespuesta: IFondosMonitorRespuesta;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosMonitorRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosMonitorReceivePayload {
    fondosMonitorRespuesta: IFondosMonitorRespuesta;
}

export interface GetFondosMonitorErrorPayload {
    error: string | null;
}

export interface GetFondosMonitorRequest {
    type: typeof GET_FONDOS_MONITOR_REQUEST;
    payload: GetFondosMonitorRequestPayload;
}

export interface GetFondosMonitorReceive {
    type: typeof GET_FONDOS_MONITOR_RECEIVE;
    payload: GetFondosMonitorReceivePayload;
}

export interface GetFondosMonitorError {
    type: typeof GET_FONDOS_MONITOR_ERROR;
    payload: GetFondosMonitorErrorPayload;
}

export type FondosMonitorActions = 
| GetFondosMonitorRequest
| GetFondosMonitorReceive
| GetFondosMonitorError;
