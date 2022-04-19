import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postLogoutRecieve, postLogoutError } from '../actions/postLogoutAction';
import { POST_LOGIN_OBJECT_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

type LogoutPost = SagaReturnType<typeof postLogout>

const postLogout = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data, null, params);

function* postLogoutDataSaga(action: any) {
    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    };
    try{

        const LogoutPost: LogoutPost = yield call(postLogout, action.payload.message, config);
        const Logout = LogoutPost.data.response;
        yield put( postLogoutRecieve({ responseApi: Logout }) );
        //console.log("postLoginObjectLogout desde logout saga");
        //yield put(postLoginObjectLogout());
        
    } catch (e: any) {

        yield put( postLogoutError({ error: e.message }));

    }
}

function* postLogoutSaga() {

    yield all([takeLatest(POST_LOGIN_OBJECT_REQUEST, postLogoutDataSaga)]);

}

export default postLogoutSaga;