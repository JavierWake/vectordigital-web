import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getStoryError, getStoryRecieve } from '../actions/storyAction';
import { STORY_API_REQUEST } from '../actions/actionTypes';
import { IModalNews } from '../types/ModalNewsTypes';
import * as apiCall from '../constants';

type StoryNews = SagaReturnType<typeof getStory>

const getStory = (data: string, config: any) =>
    axios.get<IModalNews>(apiCall.NEWS_API+data, config);


function* getStorySaga(action: any) {
    
    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_NEWS,
            'token': apiCall.token,
        },
    }
    
    try{

        const storyNews: StoryNews = yield call(getStory, action.payload, config);
        yield put( getStoryRecieve({ modal: storyNews.data }) );
        
    } catch (e:any) {

        yield put( getStoryError({ error: e.message }));

    }
}

function* storySaga() {

    yield all([takeLatest(STORY_API_REQUEST, getStorySaga)]);

}

export default storySaga;