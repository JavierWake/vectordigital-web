import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getNewsRecieve, getNewsError } from '../actions/newsAction';
import { NEWS_API_REQUEST } from '../actions/actionTypes';
import { INews } from '../types/NewsTypes';
import * as apiCall from '../constants';

type NewsGet = SagaReturnType<typeof getNews>


const getNews = (data: string, config: any) =>
    axios.get<INews[]>(apiCall.NEWS_API+data, config);

function* getNewsSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_NEWS,
            'token': apiCall.token,
        },
    }

    try{

        const newsGet: NewsGet = yield call(getNews, action.payload, config);
        yield put( getNewsRecieve({ news: newsGet.data }) );
        
    } catch (e:any) {

        yield put( getNewsError({ error: e.message }));

    }
}

function* newsSaga() {

    yield all([takeLatest(NEWS_API_REQUEST, getNewsSaga)]);

}

export default newsSaga;