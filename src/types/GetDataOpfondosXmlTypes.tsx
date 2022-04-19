import { GET_DATA_OPFONDOS_XML_REQUEST, GET_DATA_OPFONDOS_XML_RECEIVE, GET_DATA_OPFONDOS_XML_ERROR } from '../actions/actionTypes';

export interface GastoDato {
    emisora: string;
    serie: string;
    razonfinan: string;
    ptjeadmin: string;
}

export interface AvisoDato {
    liga: string;
    fecha: string;
    aviso: string;
}

export interface FondoSinSerieConAvisos {
    fondo: GastoDato;
    listaAvisos: AvisoDato[];
}

export interface OpFondos {
    gastos: GastoDato[];
    avisos: AvisoDato[];
    fondosSinSerieConAvisos: FondoSinSerieConAvisos[];
}

export interface DataOpfondosXmlState {
    loading: boolean;
    dataOpfondosXmlRespuesta: OpFondos;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetDataOpfondosXmlRequestPayload {
    message: string;
}

export interface GetDataOpfondosXmlReceivePayload {
    dataOpfondosXmlRespuesta: OpFondos;
}

export interface GetDataOpfondosXmlErrorPayload {
    error: string | null;
}

export interface GetDataOpfondosXmlRequest {
    type: typeof GET_DATA_OPFONDOS_XML_REQUEST;
    payload: GetDataOpfondosXmlRequestPayload;
}

export interface GetDataOpfondosXmlReceive {
    type: typeof GET_DATA_OPFONDOS_XML_RECEIVE;
    payload: GetDataOpfondosXmlReceivePayload;
}

export interface GetDataOpfondosXmlError {
    type: typeof GET_DATA_OPFONDOS_XML_ERROR;
    payload: GetDataOpfondosXmlErrorPayload;
}

export type GetDataOpfondosXmlActions = 
| GetDataOpfondosXmlRequest
| GetDataOpfondosXmlReceive
| GetDataOpfondosXmlError;
