import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getIssuerListsRecieve, getIssuerListsError } from '../actions/getIssuerListsAction';
import { GET_ISSUER_LISTS_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type IssuerListsGet = SagaReturnType<typeof getIssuerListsData>

const getIssuerListsData = (data: string, params: any) =>
    axios.get<any>(apiCall.LISTAS_API+data, params);

function* getIssuerListsDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_LISTAS
        }
    }

    try{

        const issuerListsGet: IssuerListsGet = yield call(getIssuerListsData, action.payload.message, config);

        yield put( getIssuerListsRecieve({ listas: issuerListsGet.data }));
        
    } catch (e : any) {

        yield put( getIssuerListsError({ error: e.message }));

    }
}

function* issuerListsSaga() {

    yield all([takeLatest(GET_ISSUER_LISTS_REQUEST, getIssuerListsDataSaga)]);

}

export default issuerListsSaga;