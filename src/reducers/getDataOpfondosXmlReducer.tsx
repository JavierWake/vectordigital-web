import * as actionTypes from '../actions/actionTypes';
import { DataOpfondosXmlState, GetDataOpfondosXmlActions } from '../types/GetDataOpfondosXmlTypes';

const initialState: DataOpfondosXmlState = {
    loading: false,
    dataOpfondosXmlRespuesta: {
        gastos: [
            {
                emisora: "",
                serie: "",
                razonfinan: "",
                ptjeadmin: "",
            },
        ],
        avisos: [
            {
                liga: "",
                fecha: "",
                aviso: "",
            }
        ],
        fondosSinSerieConAvisos: [
            {
                fondo: {
                    emisora: "",
                    serie: "",
                    razonfinan: "",
                    ptjeadmin: "",
                },
                listaAvisos: [
                    {
                        liga: "",
                        fecha: "",
                        aviso: "",
                    }
                ],
            },
        ],
    },
    error: null,
    message: "",
    params: [],
}

const getDataOpfondosXmlReducer = ( state = initialState, action: GetDataOpfondosXmlActions ) => {
    switch(action.type){
        case actionTypes.GET_DATA_OPFONDOS_XML_REQUEST:
            return { ...state, loading: true, message: action.payload.message };
        
        case actionTypes.GET_DATA_OPFONDOS_XML_RECEIVE:
            return {...state, loading: false, dataOpfondosXmlRespuesta: action.payload.dataOpfondosXmlRespuesta, error: null};

        case actionTypes.GET_DATA_OPFONDOS_XML_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default getDataOpfondosXmlReducer;