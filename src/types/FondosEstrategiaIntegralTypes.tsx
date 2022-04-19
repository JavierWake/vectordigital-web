import { GET_FONDOS_ESTRATEGIA_INTEGRAL_REQUEST, GET_FONDOS_ESTRATEGIA_INTEGRAL_RECEIVE, GET_FONDOS_ESTRATEGIA_INTEGRAL_ERROR } from '../actions/actionTypes';

export interface ITdsFondoData {
    Fondo: string;
    Emisora: string;
    Serie: string;

    //nuevos atributos
    Benchmark: string;
    Calificacion: string;
    Caracteristicas: string;
    DescCorta: string;
    DescExtendida: string;
    EstrellasMS: string;
    GustoFondo: string;
    Horario: string; 
    LinkFichaTecnica: string;
    LinkGrafRenU12M: string;
    LinkVideoCorto: string;
    LinkVideoLargo: string;
    Liquidez: string; 
    PortafolioMgrPost: string;
    Plazo: string;
    RendU12M: string;
    Rend: number;
}

export interface IData {
    tdsFondo: ITdsFondoData[];
}

export interface IFondosEstrategiaIntegralRespuesta {
    ierror: number;
    cerror: string;
    data: IData;
}

export interface FondosEstrategiaIntegralState {
    loading: boolean;
    fondosEstrategiaIntegralRespuesta: IFondosEstrategiaIntegralRespuesta;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosEstrategiaIntegralRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosEstrategiaIntegralReceivePayload {
    fondosEstrategiaIntegralRespuesta: IFondosEstrategiaIntegralRespuesta;
}

export interface GetFondosEstrategiaIntegralErrorPayload {
    error: string | null;
}

export interface GetFondosEstrategiaIntegralRequest {
    type: typeof GET_FONDOS_ESTRATEGIA_INTEGRAL_REQUEST;
    payload: GetFondosEstrategiaIntegralRequestPayload;
}

export interface GetFondosEstrategiaIntegralReceive {
    type: typeof GET_FONDOS_ESTRATEGIA_INTEGRAL_RECEIVE;
    payload: GetFondosEstrategiaIntegralReceivePayload;
}

export interface GetFondosEstrategiaIntegralError {
    type: typeof GET_FONDOS_ESTRATEGIA_INTEGRAL_ERROR;
    payload: GetFondosEstrategiaIntegralErrorPayload;
}

export type FondosEstrategiaIntegralActions = 
| GetFondosEstrategiaIntegralRequest
| GetFondosEstrategiaIntegralReceive
| GetFondosEstrategiaIntegralError;
