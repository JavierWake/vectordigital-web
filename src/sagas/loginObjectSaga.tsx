import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postLoginObjectRecieve, postLoginObjectError } from '../actions/loginObjectAction';
import { POST_LOGIN_OBJECT_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type LoginObjectPost = SagaReturnType<typeof postLoginObject>

const postLoginObject = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data, null, params);

function* postLoginObjectDataSaga(action: any) {
    console.log("saga login object");
    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION,
            'cuenta': action.payload.params[0],
            'password': action.payload.params[1],
            'ipaddress': action.payload.params[2],
            'canal': action.payload.params[3],
            'uuid': action.payload.params[4],
        },
    };
    try{

        const LoginObjectPost: LoginObjectPost = yield call(postLoginObject, action.payload.message, config);
        const LoginObject = LoginObjectPost.data.response;

        if(LoginObject.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postLoginObjectRecieve({ responseApi: LoginObject }) );
        } 
        
        
    } catch (e: any) {

        yield put( postLoginObjectError({ error: e.message }));

    }
}

function* loginObjectSaga() {

    yield all([takeLatest(POST_LOGIN_OBJECT_REQUEST, postLoginObjectDataSaga)]);

}

export default loginObjectSaga;