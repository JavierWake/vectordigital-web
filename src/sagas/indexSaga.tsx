import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getIndexListError, getIndexListReceive } from '../actions/IndexList';
import { LIST_INDEX_REQUEST } from '../actions/actionTypes';
import { IListIndex } from '../types/IndexList';
import * as apiCall from '../constants';

type IndexList = SagaReturnType<typeof getIndex>


const getIndex = (data: string, params: any) =>
    axios.get<IListIndex[]>(apiCall.LISTAS_API + data, params);

function* getIndexSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_LISTAS,
        },
    }


    try {

        const indexList: IndexList = yield call(getIndex, action.payload.message, config);


        yield put( getIndexListReceive({ listIndex: indexList.data }) );
        
    } catch (e:any) {

        yield put(getIndexListError({ error: e.message }));

    }
}

function* indexSaga() {

    yield all([takeLatest(LIST_INDEX_REQUEST, getIndexSaga)]);

}

export default indexSaga;