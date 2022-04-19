import { GET_FONDOS_FAMILIAS_REQUEST, GET_FONDOS_FAMILIAS_RECEIVE, GET_FONDOS_FAMILIAS_ERROR } from '../actions/actionTypes';

export interface IFondoData {
    Orden: number;
    Grupo: number;
    Emisora: string;
    Serie: string;
    Tipo: string;
    Califica: string;
    Precio: number;
    Var12: string;
    Var1: string;
    Var7dias: string;
    VarAnual: string;
    VarDia: string;
    Var90dias: string;
    Var180dias: string;
    Titulos: number;
    FechaCirc: string;
    FechaPrecio: string;
    Familia: string;
    Prospecto: string;
    Cartera: string;
    Fondo_VCB: boolean;
    Activos: string;
    Clasifica: string;
    Adquirientes: string;
    RazonFin: string;
    Administracion: string;
    presentacion: string;

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
}

export interface IFondosFamiliasData {
    Tipo: string;
    descripcion: string;
    tdsFondo: IFondoData[];
} 

export interface FondosFamiliasState {
    loading: boolean;
    fondosFamiliasList: IFondosFamiliasData[];
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosFamiliasRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosFamiliasReceivePayload {
    fondosFamiliasList: IFondosFamiliasData[];
}

export interface GetFondosFamiliasErrorPayload {
    error: string | null;
}

export interface GetFondosFamiliasRequest {
    type: typeof GET_FONDOS_FAMILIAS_REQUEST;
    payload: GetFondosFamiliasRequestPayload;
}

export interface GetFondosFamiliasReceive {
    type: typeof GET_FONDOS_FAMILIAS_RECEIVE;
    payload: GetFondosFamiliasReceivePayload;
}

export interface GetFondosFamiliasError {
    type: typeof GET_FONDOS_FAMILIAS_ERROR;
    payload: GetFondosFamiliasErrorPayload;
}

export type FondosFamiliasActions = 
| GetFondosFamiliasRequest
| GetFondosFamiliasReceive
| GetFondosFamiliasError;
