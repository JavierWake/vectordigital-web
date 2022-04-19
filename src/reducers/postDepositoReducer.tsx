import * as actionTypes from '../actions/actionTypes';
import { PostDepositoState, PostDepositoActions } from '../types/PostDepositoType';

const initialState: PostDepositoState = {
    loading: false,
    postDepositoRespuesta: {
        ierror: 0,
        cerror: "",
        dsTrade: {
            tdsTrade: [
                {
                    Folio: 0,
                    Instruccion: "",
                    Monto: 0,
                    BancoDeposito: "",
                    CuentaDeposito: "",
                },
            ],
        },
    },
    error: null,
    message: "",
    params: [],
}

const postDepositoReducer = ( state = initialState, action: PostDepositoActions ) => {
    switch(action.type){
        case actionTypes.POST_DEPOSITO_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.POST_DEPOSITO_RECEIVE:
            return {...state, loading: false, postDepositoRespuesta: action.payload.postDepositoRespuesta, error: null};

        case actionTypes.POST_DEPOSITO_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postDepositoReducer;