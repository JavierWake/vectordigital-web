import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getListError, getListRecieve } from '../actions/listAction';
import { LIST_API_REQUEST } from '../actions/actionTypes';
import { IList } from '../types/ListTypes';
import * as apiCall from '../constants';

type ListUser = SagaReturnType<typeof getList>

const getList = (data: string, params: any) =>
    axios.get<IList[]>(apiCall.LISTAS_API+data, params);

function* getListSaga(action: any) {
    
    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_LISTAS,
            'id': action.payload.id,
        },
    }

    try{
        
        const listUser: ListUser = yield call(getList, action.payload.message, config);

        yield put( getListRecieve({ list: listUser.data }) );

    } catch (e:any) {

        yield put( getListError({ error: e.message }));

    }
}

function* listSaga() {

    yield all([takeLatest(LIST_API_REQUEST, getListSaga)]);

}

export default listSaga;