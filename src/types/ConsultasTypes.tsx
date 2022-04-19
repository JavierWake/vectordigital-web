import { GET_CONSULTAS_REQUEST, GET_CONSULTAS_RECEIVE, GET_CONSULTAS_ERROR } from '../actions/actionTypes';



export interface tdsFechas{
    Anio: number;
    Mes: number;
    Descripcion: string;
}

export interface tdsMovimientos{
    Dia: any;
    Operacion: any;
    Descripcion: string;
    Titulos: any;
    Precio: any;
    Cargo: any;
    Abono: any;
    Saldo: any;

}
export interface tdsResumenEfvo{
    Descripcion: string;
    Monto: number;
}

export interface tdsResumenFiscal{
    Descripcion: string;
    Monto: number;
}

export interface IResponse {
    ierror: any;
    cerror: string;
    dsFechas: {
        tdsFechas: tdsFechas[];
    }
    dsMovimientos: {
        tdsMovimientos: tdsMovimientos[];
        tdsResumenEfvo: tdsResumenEfvo[];
        tdsResumenFiscal: tdsResumenFiscal[];
    }
}

export interface ConsultasState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
}

export interface ConsultasReceivePayload {
    response: IResponse;
}

export interface ConsultasErrorPayload {
    error: any | null;
}

export interface ConsultasRequestPayload {
    message: string;
    params: string[];
}

export interface ConsultasRequest {
    type: typeof GET_CONSULTAS_REQUEST;
    payload: ConsultasRequestPayload;
}

export type ConsultasReceive = {
    type: typeof GET_CONSULTAS_RECEIVE;
    payload: ConsultasReceivePayload;
};

export type ConsultasError = {
    type: typeof GET_CONSULTAS_ERROR;
    payload: ConsultasErrorPayload;
};

export type ConsultasActions = 
| ConsultasRequest
| ConsultasReceive
| ConsultasError;