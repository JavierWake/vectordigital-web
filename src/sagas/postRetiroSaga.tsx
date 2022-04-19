import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postRetiroRecieve, postRetiroError } from '../actions/postRetiroAction';
import { POST_RETIRO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction'; 
import * as apiCall from '../constants';

type RetiroPost = SagaReturnType<typeof postRetiro>

const postRetiro = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data, "", params);

function* postRetiroDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{
        const retiroPost: RetiroPost = yield call(postRetiro, action.payload.message, config);
        const retiroObj = retiroPost.data.response;

        if(retiroObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postRetiroRecieve({ postRetiroRespuesta: retiroObj }) );
        }   
        
        
    } catch (e: any) {

        yield put( postRetiroError({ error: e.message }));

    }
}

function* postRetiroSaga() {

    yield all([takeLatest(POST_RETIRO_REQUEST, postRetiroDataSaga)]);

}

export default postRetiroSaga;