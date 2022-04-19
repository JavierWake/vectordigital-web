import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postDepositoRecieve, postDepositoError } from '../actions/postDepositoAction';
import { POST_DEPOSITO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type DepositoPost = SagaReturnType<typeof postDeposito>

const postDeposito = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data, "", params);

function* postDepositoDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION, //action.payload.params[0],
            'canal': action.payload.params[1],
            'cuentasesion': action.payload.params[2],
            'token': action.payload.params[3],
            'id': action.payload.params[4],
        },
    }
    try{
        const depositoPost: DepositoPost = yield call(postDeposito, action.payload.message, config);
        const depositoObj = depositoPost.data.response;

        if(depositoObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postDepositoRecieve({ postDepositoRespuesta: depositoObj }) );
        }  
        
        
    } catch (e: any) {

        yield put( postDepositoError({ error: e.message }));

    }
}

function* postDepositoSaga() {

    yield all([takeLatest(POST_DEPOSITO_REQUEST, postDepositoDataSaga)]);

}

export default postDepositoSaga;