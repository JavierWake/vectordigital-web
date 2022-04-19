import * as actionTypes from '../actions/actionTypes';
import { stopLossActions, StopLossStatus } from '../types/StoplossType';

const initialState: StopLossStatus = {
    loading: false,
    ierror: null,
    cerror: "",
    CatEmisStopLoss: [
        {
            Emisora: "",
            Serie: false,
            TitDisp: false,
            Preciomax: 0,
            PrecioIni: "",
            PrecioAct: "",
            VariacionIni: "",
            VariacionMax: "",
        }
    ],
    message: "",
    params: []
}

const stopLossReducer = (state = initialState, action: stopLossActions) => {
    switch (action.type) {
        case actionTypes.GET_STOPLOSS_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };

        case actionTypes.GET_STOPLOSS_RECEIVE:
            return { ...state, loading: false, CatEmisStopLoss: action.payload.CatEmisStopLoss, ierror: action.payload.ierror, cerror: action.payload.cerror };

        case actionTypes.GET_STOPLOSS_ERROR:
            return { ...state, loading: false, CatEmisStopLoss: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default stopLossReducer;