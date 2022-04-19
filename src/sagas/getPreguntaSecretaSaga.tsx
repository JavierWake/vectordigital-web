import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getPreguntaSecretaRecieve, getPreguntaSecretaError } from '../actions/getPreguntaSecretaAction';
import { GET_PREGUNTA_SECRETA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PreguntaSecretaGet = SagaReturnType<typeof getPreguntaSecreta>

const getPreguntaSecreta = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getPreguntaSecretaDataSaga(action: any) {

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
        const preguntaSecretaGet: PreguntaSecretaGet = yield call(getPreguntaSecreta, action.payload.message, config);
        const getPreguntaSecretaObj = preguntaSecretaGet.data.response;

        if(getPreguntaSecretaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getPreguntaSecretaRecieve({ getPreguntaSecretaRespuesta: getPreguntaSecretaObj }) );
        }   
        
        
    } catch (e: any) {

        yield put( getPreguntaSecretaError({ error: e.message }));

    }
}

function* getPreguntaSecretaSaga() {

    yield all([takeLatest(GET_PREGUNTA_SECRETA_REQUEST, getPreguntaSecretaDataSaga)]);

}

export default getPreguntaSecretaSaga;