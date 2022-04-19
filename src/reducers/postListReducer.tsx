import * as actionTypes from '../actions/actionTypes';
import { PostListActions, PostListState } from '../types/PostList';

const initialState: PostListState = {
    loading: false,
    error: "",
    message: "",
    id: "",
    idError: 0,
    messageError: "",
    list_id: "",
}

const postListReducer = ( state = initialState, action: PostListActions ) => {
    switch(action.type){
        case actionTypes.POST_LIST_REQUEST: 
            return { ...state, loading: true, message: action.payload.message, error: "", id: action.payload.id }
        
        case actionTypes.POST_LIST_RECEIVE:
            return { ...state, loading: false, messageError: action.payload.messageError, idError: action.payload.idError, list_id: action.payload.list_id };

        case actionTypes.POST_LIST_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default postListReducer;