import * as actionTypes from '../actions/actionTypes';
import { PostIssuerActions, PostIssuerState } from '../types/PostIssuerTypes';

//Agregar una emisora a una lista

const initialState: PostIssuerState = {
    loading: false,
    error: null,
    message: "",
    id: "",
    idRespuesta: 0,
    messageRespueta: "",
}

const postIssuerReducer =  ( state = initialState, action: PostIssuerActions ) => {
    switch(action.type){
        case actionTypes.POST_ISSUER_REQUEST:
            return { ...state, loading: true, message: action.payload, id: action.payload.id };
        
        case actionTypes.POST_ISSUER_RECEIVE:
            return {...state, loading: false, error: null, idRespuesta: action.payload.idRespuesta, messageRespueta: action.payload.messageRespueta  };

        case actionTypes.POST_ISSUER_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postIssuerReducer;