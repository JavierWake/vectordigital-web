import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getPosturasRecieve, getPosturasError } from '../actions/posturasAction';
import { GET_POSTURAS_REQUEST } from '../actions/actionTypes';
import { IPosturas } from '../types/PosturasTypes';
import * as apiCall from '../constants';

type PosturasaGet = SagaReturnType<typeof getPosturas>

const getPosturas = (data: string, config: any) =>
    axios.get<IPosturas>(apiCall.NEWS_API+data, config);

function* getPosturasSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_NEWS,
        },
        params: {
            bolsa: action.payload.params
        }
    }

    try{

        const postuGet: PosturasaGet = yield call(getPosturas, action.payload.message, config);
        yield put( getPosturasRecieve({ posturas: postuGet.data }) );
        
    } catch (e:any) {

        yield put( getPosturasError({ error: e.message }));

    }
}

function* posturasSaga() {

    yield all([takeLatest(GET_POSTURAS_REQUEST, getPosturasSaga)]);

}

export default posturasSaga;