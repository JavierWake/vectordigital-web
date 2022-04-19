import * as actionTypes from '../actions/actionTypes';
import {PostCancelaOrdenActions, PostCancelaOrdenState} from '../types/PostCancelaOrdenType';

const initialState: PostCancelaOrdenState = {
    loading: false,
    response: {
        ierror: 0,
        cerror: "",
        dscancelacion: {
            tdscancelacion: [],
        },
    },
    error: null,
    message: "",
    params: [],
    data: {},
}

const postCancelaOrdenReducer = ( state = initialState, action: PostCancelaOrdenActions ) => {
    switch(action.type){
        case actionTypes.POST_CANCELA_ORDEN_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params, data: action.payload.data };
           
        case actionTypes.POST_CANCELA_ORDEN_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};
           
        case actionTypes.POST_CANCELA_ORDEN_ERROR:
            return { ...state, loading: false, response: initialState.response, error: action.payload.error };

        case actionTypes.RESET_STATE_MODIF_CANCEL_ORDENES:
            //console.log("estado postCancelaOrden reseteado en reducer");
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default postCancelaOrdenReducer;