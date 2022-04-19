import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getEmisorasSimilaresRecieve, getEmisorasSimilaresError } from '../actions/emisorasSimilaresAction';
import { GET_EMISORA_SIMILAR_REQUEST } from '../actions/actionTypes';
import { ISimilares } from '../types/EmisorasSimilaresTypes';
import * as apiCall from '../constants';

type similaresGet = SagaReturnType<typeof getSimilares>


const getSimilares = (data: string, config: any) =>
    axios.get<ISimilares[]>(apiCall.NEWS_API+data, config);

function* getSimilaresSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_NEWS,
            'token': apiCall.token,
        },
    }

    try{

        const similaresEmisorasGet: similaresGet = yield call(getSimilares, action.payload.message, config);
        yield put( getEmisorasSimilaresRecieve({ similares: similaresEmisorasGet.data }) );
        
    } catch (e:any) {

        yield put( getEmisorasSimilaresError({ error: e.message }));

    }
}

function* emisorasSimilaresSaga() {

    yield all([takeLatest(GET_EMISORA_SIMILAR_REQUEST, getSimilaresSaga)]);

}

export default emisorasSimilaresSaga;