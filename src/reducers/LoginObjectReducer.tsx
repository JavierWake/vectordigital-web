import * as actionTypes from '../actions/actionTypes';
import { LoginObjectState, LoginObjectActions } from '../types/LoginObjectTypes';

import { REHYDRATE } from 'redux-persist';

export const loginObjectInitialState: LoginObjectState = {
    loading: false,
    response: {
        cerror: "", 
        ierror: 0,
        dsLogin: {
            tdsListaCuentas: [],
            tdsAvisos: [],
            tdsLogin: [],
            tdsServicios: [],
        },
    },
    error: null,
    message: "",
    params: [],
}

const loginObjectReducer = ( state = loginObjectInitialState, action: LoginObjectActions ) => {
    //console.log("loginObjectReducer");
    //console.log("action: ", action.type);
    switch(action.type){
        case REHYDRATE: //cuando hacen refresh a la pag, volvemos a poner el objeto de login en el store
            //console.log("rehydrate login object action");
            //console.log(action.payload);

            if(action.payload === undefined){
                return { ...state };
            }
            else{
                if(action.payload.loginObjectState === undefined){
                    return { ...state };
                }
                else{
                    if(action.payload.loginObjectState.response === undefined){
                        return { ...state };
                    }
                }
            }
            
            return { 
                ...state, 
                response: action.payload.loginObjectState.response,
            };

        case actionTypes.POST_LOGIN_OBJECT_REQUEST:
            return { ...state, loading: true, message: action.payload.message, };
        
        case actionTypes.POST_LOGIN_OBJECT_RECEIVE:
            return {...state, loading: false, response: action.payload.responseApi, params: [],  error: null};

        case actionTypes.POST_LOGIN_OBJECT_ERROR:
            return { ...state, loading: false, params: [], error: action.payload.error };
        
        case actionTypes.POST_LOGIN_OBJECT_LOGOUT:
            return { ...loginObjectInitialState };

        default: 
            return { ...state };
    }
}

export default loginObjectReducer;