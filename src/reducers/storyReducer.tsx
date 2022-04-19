import * as actionTypes from '../actions/actionTypes';
import { StoryActions, StoryState } from '../types/ModalNewsTypes';

const initialState: StoryState = {
    modal: null,
    loading: false,
    id: "",
    error: ""
}

const storyReducer =  ( state = initialState, action: StoryActions ) => {
    switch(action.type){
        case actionTypes.STORY_API_REQUEST:
            return { ...state, loading: true, id: action.payload };
        
        case actionTypes.STORY_API_RECEIVE:
            return {...state, loading: false, modal: action.payload.modal, error: null};

        case actionTypes.STORY_API_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default storyReducer;