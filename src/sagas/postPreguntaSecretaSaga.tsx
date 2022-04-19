import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postPreguntaSecretaRecieve, postPreguntaSecretaError } from '../actions/postPreguntaSecretaAction';
import { POST_PREGUNTA_SECRETA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PreguntaSecretaPost = SagaReturnType<typeof postPreguntaSecreta>

const postPreguntaSecreta = (data: string, params: any) =>
    axios.post<any>(apiCall.API_CONFIGURA+data, null, params);

function* postPreguntaSecretaDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    try{
        const preguntaSecretaPost: PreguntaSecretaPost = yield call(postPreguntaSecreta, action.payload.message, config);
        const postPreguntaSecretaObj = preguntaSecretaPost.data.response;

        if(postPreguntaSecretaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postPreguntaSecretaRecieve({ postPreguntaSecretaRespuesta: postPreguntaSecretaObj }) );
        }  
        
        
    } catch (e: any) {

        yield put( postPreguntaSecretaError({ error: e.message }));

    }
}

function* postPreguntaSecretaSaga() {

    yield all([takeLatest(POST_PREGUNTA_SECRETA_REQUEST, postPreguntaSecretaDataSaga)]);

}

export default postPreguntaSecretaSaga;