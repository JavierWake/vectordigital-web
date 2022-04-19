import * as actionTypes from '../actions/actionTypes';
import { poderCompraActions, PoderCompraStatus } from '../types/PoderCompraType';

const initialState: PoderCompraStatus = {
    loading: false,
    error: null,
    tdsSaldo: [
        {
            Saldo: 0,
            Fecha: "",
            Disclaimer: ""
        }
    ],
    tdsDetalleFlujos: [
        {
            Descripcion: "",
            Monto: 0,
            Suma: false
        }
    ],
    message: "",
    params: []
}

const poderCompraReducer = (state = initialState, action: poderCompraActions) => {
    switch (action.type) {
        case actionTypes.GET_PODER_COMPRA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };

        case actionTypes.GET_PODER_COMPRA_RECEIVE:
            return { ...state, loading: false, tdsSaldo: action.payload.tdsSaldo, tdsDetalleFlujos: action.payload.tdsDetalleFlujos, error: null };

        case actionTypes.GET_PODER_COMPRA_ERROR:
            return { ...state, loading: false, tdsSaldo: [], tdsDetalleFlujos: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default poderCompraReducer;