import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getListUserRecieve, getListUserError } from '../actions/listUserAction';
import { LIST_USER_REQUEST } from '../actions/actionTypes';
import { IListUser } from '../types/UsertListTypes';
import * as apiCall from '../constants';

type ListUserGet = SagaReturnType<typeof getListUser>

const getListUser = (data: string, params: any) =>
    axios.get<IListUser[]>(apiCall.LISTAS_API+data, params);

function* getListUserSaga(action: any) {
    
    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_LISTAS,
            'id': action.payload.id,
        },
    }

    try{

        const listGet: ListUserGet = yield call(getListUser, action.payload.message, config);
        yield put( getListUserRecieve({ listUser: listGet.data }) );
        
    } catch (e: any) {

        yield put( getListUserError({ error: e.message }));

    }
}


function* listUserSaga() {

    yield all([takeLatest(LIST_USER_REQUEST, getListUserSaga)]);

}

export default listUserSaga;