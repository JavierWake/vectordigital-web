import { GET_CARTERA_REQUEST, GET_CARTERA_RECEIVE, GET_CARTERA_ERROR } from '../actions/actionTypes';



export interface tdsFechas{
    Anio: number;
    Mes: number;
    Descripcion: string;
}

export interface dsFechas {
    tdsFechas: tdsFechas[];
}

export interface tdsDetalleEncabezado{
    Mercado: any;
    Tipo: string;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
    col7: string;
    col8: string;
    col9: string;
}

export interface tdsDetalleDato{
    Mercado: any;
    Tipo: string;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
    col7: string;
    col8: string;
    col9: string;
}

export interface tdsDetalle{
    Resumen: string;
    Mercado : any;
    Descripcion: string;
    Porcentaje: any;
    Importe: any;
    Disclaimer: string;
    tdsDetalleEncabezado: tdsDetalleEncabezado[] | any; 
    tdsDetalleDato: tdsDetalleDato[] | any; 
}

export interface tdsResumen {
    Resumen: string;
    Descripcion: string;
    Porcentaje: any;
    Importe: any;
    tdsDetalle: tdsDetalle[] | any; 
}

export interface dsResumenHijo {
    tdsResumen: tdsResumen[] | any;
}

export interface dsResumenPadre {
    dsResumen: dsResumenHijo | any;
}

export interface IResponse {
    ierror: any;
    cerror: string;
    dsFechas: dsFechas;
    dsResumen: dsResumenPadre; 
}

export interface CarteraState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: IResponse;
}

export interface CarteraReceivePayload {
    response: IResponse;
}

export interface CarteraErrorPayload {
    error: any | null;
}

export interface CarteraRequestPayload {
    message: string;
    params: string[];
}

export interface CarteraRequest {
    type: typeof GET_CARTERA_REQUEST;
    payload: CarteraRequestPayload;
}

export type CarteraReceive = {
    type: typeof GET_CARTERA_RECEIVE;
    payload: CarteraReceivePayload;
};

export type CarteraError = {
    type: typeof GET_CARTERA_ERROR;
    payload: CarteraErrorPayload;
};

export type CarteraActions = 
| CarteraRequest
| CarteraReceive
| CarteraError;