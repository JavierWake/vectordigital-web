import * as actionTypes from '../actions/actionTypes';
import { putServiciosActions, PutServiciosStatus } from '../types/PutServiciosTypes';

const initialState: PutServiciosStatus = {
    loading: false,
    error: "",
    message: "",
    params: [],
    response: {
        ierror: 0,
        cerror: "",
    },
    tdsServicios: [{
        IdServicio: 0,
        IdCanal: "0",
        Activo: false,
    }],
    all: false,
}

const putServiciosReducer = (state = initialState, action: putServiciosActions) => {
    switch (action.type) {
        case actionTypes.PUT_SERVICIOS_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params, tdsServicios: action.payload.tdsServicios, all: action.payload.all };

        case actionTypes.PUT_SERVICIOS_RECEIVE:
            return { ...state, loading: false, response: action.payload.response, error: null };

        case actionTypes.PUT_SERVICIOS_ERROR:
            return { ...state, loading: false, response: {}, error: action.payload.error };

        default:
            return { ...state };
    }
}

export default putServiciosReducer;