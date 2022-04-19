import * as actionTypes from '../actions/actionTypes';
import { hechosActions, HechosStatus } from '../types/HechosType';

const initialState: HechosStatus = {
    loading: false,
    error: null,
    tdsPosturas: [
        {
            Hora: 0,
            HoraPostura: "",
            Folio: 0,
            Compra: "",
            Vende: "",
            Precio: 0,
            Volumen: 0,
            Importe: 0,
            Exchange: "",
        }
    ],
    message: "",
    params: []
}

const hechosReducer = (state = initialState, action: hechosActions) => {
    switch (action.type) {
        case actionTypes.GET_HECHOS_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };

        case actionTypes.GET_HECHOS_RECEIVE:
            return { ...state, loading: false, tdsPosturas: action.payload.tdsPosturas, error: null };

        case actionTypes.GET_HECHOS_ERROR:
            return { ...state, loading: false, tdsPosturas: [], tdsEmisoras: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default hechosReducer;