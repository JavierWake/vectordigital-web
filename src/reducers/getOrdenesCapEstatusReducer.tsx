import * as actionTypes from '../actions/actionTypes';
import { GetOrdenesCapEstatusState, GetOrdenesCapEstatusActions } from '../types/GetOrdenesCapEstatusType';

const initialState: GetOrdenesCapEstatusState = {
    loading: false,
    getOrdenesCapEstatusRespuesta: {
        ierror: 0,
        cerror: "",
        dsOrdenesCap: {
            dsOrdenesCap: {
                tdsOrdenesCap: [],
            },
        },
        dsOrdenesCapPend: {
            dsOrdenesCapPend: {
                tdsOrdenesCapPend: [],
            },
        },
        dsPortafolioCap: {},
    },
    error: null,
    message: "",
    params: [],
};

const getOrdenesCapEstatusReducer = ( state = initialState, action: GetOrdenesCapEstatusActions ) => {
    switch(action.type){
        case actionTypes.GET_ORDENES_CAP_ESTATUS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_ORDENES_CAP_ESTATUS_RECEIVE:
            return {...state, loading: false, getOrdenesCapEstatusRespuesta: action.payload.getOrdenesCapEstatusRespuesta, error: null};

        case actionTypes.GET_ORDENES_CAP_ESTATUS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE_GET_ORDENES:
            return { ...initialState };

        default: 
            return { ...state };
    }
};

export default getOrdenesCapEstatusReducer;
