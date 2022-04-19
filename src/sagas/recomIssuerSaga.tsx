import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getRecomIssuerRecieve, getRecomIssuerError } from '../actions/RecomIssuerAction';
import { GET_RECOM_REQUEST } from '../actions/actionTypes';
import { IRecomIssuer } from '../types/RecomIssuerTypes';
import * as apiCall from '../constants';

type RecomGet = SagaReturnType<typeof getRecom>

const getRecom = (data: string, config: any) =>
    axios.get<IRecomIssuer>(apiCall.NEWS_API+data, config);

function* getRecomSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_NEWS,
        },
    }

    try{

        const recomGet: RecomGet = yield call(getRecom, action.payload, config);
        yield put( getRecomIssuerRecieve({ recomIssuer: recomGet.data }) );
        
    } catch (e:any) {

        yield put( getRecomIssuerError({ error: e.message }));

    }
}

function* recomIssuerSaga() {

    yield all([takeLatest(GET_RECOM_REQUEST, getRecomSaga)]);

}

export default recomIssuerSaga;