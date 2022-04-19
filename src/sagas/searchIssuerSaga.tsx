import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getSearchIssuerRecieve, getSearchIssuerError } from '../actions/SearchIssuerAction';
import { GET_MONITOR_REQUEST } from '../actions/actionTypes';
import { ISearchIssuer } from '../types/SearchIssuer';
import * as apiCall from '../constants';

type SearchIssuerGet = SagaReturnType<typeof getSearchIssuer>

let config = {
    params: {
        token: apiCall.token
    },
}

const getSearchIssuer = (data: string) =>
    axios.get<ISearchIssuer[]>(apiCall.COMPANY_SEARCH + data, config);

function* getSearchIssuerSaga(action: any) {
    try {

        const searchIssuerGet: SearchIssuerGet = yield call(getSearchIssuer, action.payload);
        yield put( getSearchIssuerRecieve({ searchIssuer: searchIssuerGet.data }) );
        
    } catch (e:any) {

        yield put(getSearchIssuerError({ error: e.message }));

    }
}

function* searchIssuerSaga() {

    yield all([takeLatest(GET_MONITOR_REQUEST, getSearchIssuerSaga)]);

}

export default searchIssuerSaga;