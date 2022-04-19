import * as actionTypes from '../actions/actionTypes';
import { sellTradeDataActions, SellTradeDataStatus } from '../types/SellTradeDataType';

const initialState: SellTradeDataStatus = {
    loading: false,
    error: null,
    tdstradedata: [
        {
            horariooperacion: "",
            roc: false,
            operaFlujos: false,
            saldo: 0,
            HrInicioBolsa: "",
            HrFinalBolsa: "",
            HrCierreIni: "",
            HrCierreFin: "",
            SelectividadBolsa: false,
            pan: 0
        }
    ],
    tdsEmisoras: [
        {
            Emisora: "",
            Serie: "",
            Mercado: "",
            Posicion: 0,
            EnVenta: 0,
            Precio: 0,
            PreBiva: 0,
            PreSOR: 0,
            Lotes: 0,
            TitPrestatario: 0,
            VarPolitica: "",
            VarPermitida: 0,
            MontoMaximo: 0,
            Favorita: false
        }
    ],
    ttTipoOrdenes: [
        {
            idtipo: 0,
            descripcion: "",
            tipodeorden: "",
            aplicabmv: false,
            aplicabiva: false,
            aplicasor: false
        }
    ],
    message: "",
    params: []
}

const sellTradeDataReducer = (state = initialState, action: sellTradeDataActions) => {
    switch (action.type) {
        case actionTypes.GET_SELL_TRADE_DATA_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };

        case actionTypes.GET_SELL_TRADE_DATA_RECEIVE:
            return { ...state, loading: false, tdstradedata: action.payload.tdstradedata, tdsEmisoras: action.payload.tdsEmisoras, ttTipoOrdenes: action.payload.ttTipoOrdenes, error: null };

        case actionTypes.GET_SELL_TRADE_DATA_ERROR:
            return { ...state, loading: false, tdstradedata: [], tdsEmisoras: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default sellTradeDataReducer;