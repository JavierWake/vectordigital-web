import * as actionTypes from '../actions/actionTypes';
import { acumuladoActions, AcumuladoStatus } from '../types/AcumuladoType';

const initialState: AcumuladoStatus = {
    loading: false,
    error: null,
    tdsAcumulado: [
        {
            casa: "",
            comprasOp: 0,
            ventasOp: 0,
            porcentajeOp: 0,
            compraMto: 0,
            compraMtoPorc: 0,
            ventaMto: 0,
            ventaMtoPorc: 0,
            compraTit: 0,
            compraTitPorc: 0,
            ventaTit: 0,
            ventaTitPorc: 0
        }
    ],
    message: "",
    params: []
}

const acumuladoReducer = (state = initialState, action: acumuladoActions) => {
    switch (action.type) {
        case actionTypes.GET_ACUMULADO_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };

        case actionTypes.GET_ACUMULADO_RECEIVE:
            return { ...state, loading: false, tdsAcumulado: action.payload.tdsAcumulado, error: null };

        case actionTypes.GET_ACUMULADO_ERROR:
            return { ...state, loading: false, tdsAcumulado: [], tdsEmisoras: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default acumuladoReducer;