import { GET_FONDOS_NUEVA_FAMILIAS_REQUEST, GET_FONDOS_NUEVA_FAMILIAS_RECEIVE, GET_FONDOS_NUEVA_FAMILIAS_ERROR } from '../actions/actionTypes';

export interface ITdsFondoNuevaFamilias {
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
    RendU12M: string;
}

export interface ITdsFamilia {
    Tipo: string;
    descripcion: string;
    tdsFondo: ITdsFondoNuevaFamilias[]
}

export interface IDsFondos {
    tdsFamilia: ITdsFamilia[];
}

export interface IObjVacio {

}

export interface IDsFondosObj {
    dsFondos: IDsFondos | IObjVacio;
}

export interface IFondosNuevaFamiliasRespuesta {
    ierror: number;
    cerror: string;
    dsFondos: IDsFondosObj;
} 

export interface FondosNuevaFamiliasState {
    loading: boolean;
    fondosNuevaFamiliasRespuesta: IFondosNuevaFamiliasRespuesta;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetFondosNuevaFamiliasRequestPayload {
    message: string;
    params: string[];
}

export interface GetFondosNuevaFamiliasReceivePayload {
    fondosNuevaFamiliasRespuesta: IFondosNuevaFamiliasRespuesta;
}

export interface GetFondosNuevaFamiliasErrorPayload {
    error: string | null;
}

export interface GetFondosNuevaFamiliasRequest {
    type: typeof GET_FONDOS_NUEVA_FAMILIAS_REQUEST;
    payload: GetFondosNuevaFamiliasRequestPayload;
}

export interface GetFondosNuevaFamiliasReceive {
    type: typeof GET_FONDOS_NUEVA_FAMILIAS_RECEIVE;
    payload: GetFondosNuevaFamiliasReceivePayload;
}

export interface GetFondosNuevaFamiliasError {
    type: typeof GET_FONDOS_NUEVA_FAMILIAS_ERROR;
    payload: GetFondosNuevaFamiliasErrorPayload;
}

export type FondosNuevaFamiliasActions = 
| GetFondosNuevaFamiliasRequest
| GetFondosNuevaFamiliasReceive
| GetFondosNuevaFamiliasError;
