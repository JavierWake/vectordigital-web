import * as actionTypes from '../actions/actionTypes';
import { resumenMercadoActions, GetResumenMercadoStatus } from '../types/GetResumenMercadoType';

const initialState: GetResumenMercadoStatus = {
    loading: false,
    ierror: null,
    cerror: "",
    tdsConfiguracion: [
        {
            "frecuencia": "",
            "horario": "",
            "posicion": "",
        }
    ],
    tdsEmisoras: [
        {
            "posicion": "",
            "emisora": "",
            "serie": "",
        }
    ],
    message: "",
    params: []
}

const getResumenMercadoReducer = (state = initialState, action: resumenMercadoActions) => {
    switch (action.type) {
        case actionTypes.GET_RESUMEN_MERCADO_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };

        case actionTypes.GET_RESUMEN_MERCADO_RECEIVE:
            return { ...state, loading: false, ierror: action.payload.ierror, cerror: action.payload.cerror, tdsConfiguracion: action.payload.tdsConfiguracion, tdsEmisoras: action.payload.tdsEmisoras };

        case actionTypes.GET_RESUMEN_MERCADO_ERROR:
            return { ...state, loading: false, tdsConfiguracion: [], tdsEmisoras: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default getResumenMercadoReducer;