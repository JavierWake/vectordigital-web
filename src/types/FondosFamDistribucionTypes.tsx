import { GET_FONDOS_FAM_DISTRIBUCION_REQUEST, GET_FONDOS_FAM_DISTRIBUCION_RECEIVE, GET_FONDOS_FAM_DISTRIBUCION_ERROR } from '../actions/actionTypes';

export interface ITdsFondoData {
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

export interface IFondoFamDist {
    Fondo: string;
    FondosDesc: string;
    Link: string;
}

export interface IDistribucion {
    Familia: string;
    FondosDesc: string;
    Fondos: IFondoFamDist[];
}

export interface IFamilias {
    Familia: string;
    FamiliaDesc: string;
}

export interface IDistribucionObj {
    Familias: IFamilias[];
    Distribucion: IDistribucion[];
}

export interface IData {
    Distribucion: IDistribucionObj;
}

export interface IFondosFamDistribucionRespuesta {
    ierror: number;
    cerror: string;
    data: IData;
}

export interface FondosFamDistribucionState {
    loading: boolean;
    fondosFamDistribucionRespuesta: IFondosFamDistribucionRespuesta;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosFamDistribucionRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosFamDistribucionReceivePayload {
    fondosFamDistribucionRespuesta: IFondosFamDistribucionRespuesta;
}

export interface GetFondosFamDistribucionErrorPayload {
    error: string | null;
}

export interface GetFondosFamDistribucionRequest {
    type: typeof GET_FONDOS_FAM_DISTRIBUCION_REQUEST;
    payload: GetFondosFamDistribucionRequestPayload;
}

export interface GetFondosFamDistribucionReceive {
    type: typeof GET_FONDOS_FAM_DISTRIBUCION_RECEIVE;
    payload: GetFondosFamDistribucionReceivePayload;
}

export interface GetFondosFamDistribucionError {
    type: typeof GET_FONDOS_FAM_DISTRIBUCION_ERROR;
    payload: GetFondosFamDistribucionErrorPayload;
}

export type FondosFamDistribucionActions = 
| GetFondosFamDistribucionRequest
| GetFondosFamDistribucionReceive
| GetFondosFamDistribucionError;
