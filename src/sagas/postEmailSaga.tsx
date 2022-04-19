import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postEmailRecieve, postEmailError } from '../actions/postEmailAction';
import { POST_EMAIL_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type EmailPost = SagaReturnType<typeof postEmail>

const postEmail = (data: string, params: any) =>
    axios.post<any>(apiCall.API_CONFIGURA+data, null, params);

function* postEmailDataSaga(action: any) {

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
        const emailPost: EmailPost = yield call(postEmail, action.payload.message, config);
        const postEmailObj = emailPost.data.response;

        if(postEmailObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postEmailRecieve({ postEmailRespuesta: postEmailObj }) );
        }  
        
    } catch (e: any) {

        yield put( postEmailError({ error: e.message }));

    }
}

function* postEmailSaga() {

    yield all([takeLatest(POST_EMAIL_REQUEST, postEmailDataSaga)]);

}

export default postEmailSaga;