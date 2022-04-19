import * as actionTypes from '../actions/actionTypes';
import { PostRetiroState, PostRetiroActions } from '../types/PostRetiroType';

const initialState: PostRetiroState = {
    loading: false,
    postRetiroRespuesta: {
        ierror: 0,
        cerror: "",
        dsTrade: {
            tdsTrade: [
                {
                    Folio: 0,
                    Monto: 0,
                    Nombre: "",
                    Banco: "",
                    Chequera: "",
                },
            ],
        },
    },
    error: null,
    message: "",
    params: [],
}

const postRetiroReducer = ( state = initialState, action: PostRetiroActions ) => {
    switch(action.type){
        case actionTypes.POST_RETIRO_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_RETIRO_RECEIVE:
            return {...state, loading: false, postRetiroRespuesta: action.payload.postRetiroRespuesta, error: null};

        case actionTypes.POST_RETIRO_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        case actionTypes.RESET_STATE:
            return { ...initialState };

        default: 
            return { ...state };
    }
}

export default postRetiroReducer;