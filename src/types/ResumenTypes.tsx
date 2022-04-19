import { GET_RESUMEN_REQUEST, GET_RESUMEN_RECEIVE, GET_RESUMEN_ERROR } from '../actions/actionTypes';

export interface IValueNum {
    Total: number;
    TotPortafolioCap: number;
    TotPortafolioFd:number;
    TotPortafolioMd: number;
    TotSaldoEfectivo: number;
    TotOperXLiq: number;
}

export interface IValuePorc {
    PorcPortafolioCap: number;
    PorcPortafolioFd:number;
    PorcPortafolioMd: number;
    PorcOperXLiq: number;
}

export interface ITextNum {
    sTotal: string;
    sTotPortafolioCap: string;
    sTotPortafolioFd:string;
    sTotPortafolioMd: string;
    sTotSaldoEfectivo: string;
    sTotOperXLiq: string;
}

export interface ITextPorc {
    sPorcPortafolioCap: string;
    sPorcPortafolioFd:string;
    sPorcPortafolioMd: string;
    sPorcOperXLiq: string;
}

export interface TdsResumen {
    Resumen: string;
    Descripcion: string;
    Porcentaje: string;
    Importe: string;
    //tdsDetalle: IResumen[];
}

export interface ResumenStatus {
    loading: boolean;
    valueNum: IValueNum;
    valuePorc: IValuePorc;
    textNum: ITextNum;
    textPorc: ITextPorc;
    ultActualizacion: string;
    error: string | null;
    message: string;
    params: string[];
    //tdsResumen: TdsResumen[];
}

export interface ResumenReceivePayload {
    valueNum: IValueNum;
    valuePorc: IValuePorc;
    textNum: ITextNum;
    textPorc: ITextPorc;
    ultActualizacion: string;
}

export interface ResumenErrorPayload {
    error: any | null;
}

export interface ResumenRequestPayload {
    message: string;
    params: string[];
}

export interface ResumenRequest {
    type: typeof GET_RESUMEN_REQUEST;
    payload: ResumenRequestPayload;
}

export type ResumenReceive = {
    type: typeof GET_RESUMEN_RECEIVE;
    payload: ResumenReceivePayload;
};

export type ResumenError = {
    type: typeof GET_RESUMEN_ERROR;
    payload: ResumenErrorPayload;
};

export type ResumenActions = 
| ResumenRequest
| ResumenReceive
| ResumenError;