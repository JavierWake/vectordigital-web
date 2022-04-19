import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getSearchCompanyRecieve, getSearchCompanyError } from '../actions/searchCompanyAction';
import { SEARCH_COMPANY_REQUEST } from '../actions/actionTypes';
import { ISearchCompany } from '../types/SearchCompanyTypes';
import * as apiCall from '../constants';

type SearchCompanyGet = SagaReturnType<typeof getSearchCompany>

let config = {
    params: {
        token: apiCall.token
    },
}

const getSearchCompany = (data: string) =>
    axios.get<ISearchCompany[]>(apiCall.COMPANY_SEARCH + data, config);

function* getSearchCompanySaga(action: any) {
    try {

        const searchCget: SearchCompanyGet = yield call(getSearchCompany, action.payload);
        yield put( getSearchCompanyRecieve({ searchCompany: searchCget.data }) );
        
    } catch (e:any) {

        yield put(getSearchCompanyError({ error: e.message }));

    }
}

function* searchCompanySaga() {

    yield all([takeLatest(SEARCH_COMPANY_REQUEST, getSearchCompanySaga)]);

}

export default searchCompanySaga;