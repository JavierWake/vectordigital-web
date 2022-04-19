import * as actionTypes from '../actions/actionTypes';
import { PostStopLossState, PostStopLossActions } from '../types/PostStopLossType';

const initialState: PostStopLossState = {
    loading: false,
    response: {
        ierror: 0,
        cerror: "",
        dsRespuesta: {
            InstruccionSL: [
                {
                    FolioSL: 0,
                    EmisoraSL: "",
                    SerieSL: "",
                    TitulosSL: 0,
                    TipoSL: "",
                    VigenciaSL: "",
                    Ejecucion: ""
                },
            ],
        },
    },
    error: null,
    message: "",
    params: [],
}

const postStopLossReducer = ( state = initialState, action: PostStopLossActions ) => {
    switch(action.type){
        case actionTypes.POST_STOPLOSS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_STOPLOSS_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.POST_STOPLOSS_ERROR:
            return { ...state, loading: false, response: { ierror: 0, cerror: "", dsRespuesta: { InstruccionSL: "", } }, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postStopLossReducer;