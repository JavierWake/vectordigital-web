import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { putListUltimaError, putListUltimaRecieve } from '../actions/listUltimaAction';
import { PUT_LIST_ULTIMA_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type ListUltimaUser = SagaReturnType<typeof putListUltima>

const putListUltima = (data: string, params: any) =>
    axios.put<any>(apiCall.LISTAS_API+data, null, params);

function* putListUltimaSaga(action: any) {
    
    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_LISTAS,
            'id': action.payload.id,
        },
    }

    try{
        
        const listUser: ListUltimaUser = yield call(putListUltima, action.payload.message, config);

        yield put( putListUltimaRecieve({ response: listUser.data }) );

    } catch (e:any) {

        yield put( putListUltimaError({ error: e.message }));

    }
}

function* listUltimaSaga() {

    yield all([takeLatest(PUT_LIST_ULTIMA_REQUEST, putListUltimaSaga)]);

}

export default listUltimaSaga;