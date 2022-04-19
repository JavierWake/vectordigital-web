import * as actionTypes from '../actions/actionTypes';
import { NewsActions, NewsState } from '../types/NewsTypes';

const initialState: NewsState = {
    loading: false,
    news: [{id: "", title: "", desc: "", time: "", tags: [], prov: ""} ],
    error: null,
    message: ""
}

const newsReducer = ( state = initialState, action: NewsActions ) => {
    switch(action.type){
        case actionTypes.NEWS_API_REQUEST:
            return { ...state, loading: true, message: action.payload };
        case actionTypes.NEWS_API_RECEIVE:
            return {...state, loading: false, news: action.payload.news, error: null};

        case actionTypes.NEWS_API_ERROR:
            return { ...state, loading: false, news: [{id: "", title: "", desc: "", time: "", tags: [], prov: ""}], error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default newsReducer;