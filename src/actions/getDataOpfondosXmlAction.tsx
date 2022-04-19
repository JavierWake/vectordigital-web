import { GET_DATA_OPFONDOS_XML_REQUEST, GET_DATA_OPFONDOS_XML_RECEIVE, GET_DATA_OPFONDOS_XML_ERROR } from '../actions/actionTypes';
import { GetDataOpfondosXmlRequest, GetDataOpfondosXmlReceive, GetDataOpfondosXmlError, GetDataOpfondosXmlRequestPayload, GetDataOpfondosXmlReceivePayload, GetDataOpfondosXmlErrorPayload } from '../types/GetDataOpfondosXmlTypes';

export const getDataOpfondosXmlRequest = ( payload: GetDataOpfondosXmlRequestPayload ): GetDataOpfondosXmlRequest => ({
    type: GET_DATA_OPFONDOS_XML_REQUEST,
    payload    
});

export const getDataOpfondosXmlRecieve = ( payload: GetDataOpfondosXmlReceivePayload ): GetDataOpfondosXmlReceive => ({
    type: GET_DATA_OPFONDOS_XML_RECEIVE,
    payload
});

export const getDataOpfondosXmlError = ( payload: GetDataOpfondosXmlErrorPayload ): GetDataOpfondosXmlError => ({
    type: GET_DATA_OPFONDOS_XML_ERROR,
    payload,
}); 