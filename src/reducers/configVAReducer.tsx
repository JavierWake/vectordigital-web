import * as actionTypes from '../actions/actionTypes';
import { configVAActions, ConfigVAStatus } from '../types/ConfigVAType';

const initialState: ConfigVAStatus = {
    loading: false,
    ierror: null,
    cerror: "",
    mesaAnalisis: [
        {
            "idcategoria": 0,
            "categoria": "",
            "idtipo": 0,
            "descripcion": "",
            "suscrito": false,
            "desc": ""
        }
    ],
    fundamental: [
        {
            "idcategoria": 0,
            "categoria": "",
            "idtipo": 0,
            "descripcion": "",
            "suscrito": false,
            "desc": ""
        }
    ],
    economia: [
        {
            "idcategoria": 0,
            "categoria": "",
            "idtipo": 0,
            "descripcion": "",
            "suscrito": false,
            "desc": ""
        }
    ],
    tecnico: [
        {
            "idcategoria": 0,
            "categoria": "",
            "idtipo": 0,
            "descripcion": "",
            "suscrito": false,
            "desc": ""
        }
    ],
    internacional: [
        {
            "idcategoria": 0,
            "categoria": "",
            "idtipo": 0,
            "descripcion": "",
            "suscrito": false,
            "desc": ""
        }
    ],
    rentaFija: [
        {
            "idcategoria": 0,
            "categoria": "",
            "idtipo": 0,
            "descripcion": "",
            "suscrito": false,
            "desc": ""
        }
    ],
    message: "",
    params: []
}

const configVAReducer = (state = initialState, action: configVAActions) => {
    switch (action.type) {
        case actionTypes.GET_CONFIG_VA_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };

        case actionTypes.GET_CONFIG_VA_RECEIVE:
            return { ...state, loading: false, ierror: action.payload.ierror, cerror: action.payload.cerror, fundamental: action.payload.fundamental, mesaAnalisis: action.payload.mesaAnalisis, tecnico: action.payload.tecnico, economia: action.payload.economia, internacional: action.payload.internacional, rentaFija: action.payload.rentaFija };

        case actionTypes.GET_CONFIG_VA_ERROR:
            return { ...state, loading: false, fundamental: [], mesaAnalisis: [], tecnico: [], economia: [], internacional: [], rentaFija: [], error: action.payload.error };

        default:
            return { ...state };
    }
}

export default configVAReducer;