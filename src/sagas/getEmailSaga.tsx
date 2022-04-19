import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getEmailRecieve, getEmailError } from '../actions/getEmailAction';
import { GET_EMAIL_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type EmailGet = SagaReturnType<typeof getEmail>

const getEmail = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getEmailDataSaga(action: any) {

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
        const emailGet: EmailGet = yield call(getEmail, action.payload.message, config);
        const getEmailObj = emailGet.data.response;

        if(getEmailObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getEmailRecieve({ getEmailRespuesta: getEmailObj }) );
        }  
        
        
    } catch (e: any) {

        yield put( getEmailError({ error: e.message }));

    }
}

function* getEmailSaga() {

    yield all([takeLatest(GET_EMAIL_REQUEST, getEmailDataSaga)]);

}

export default getEmailSaga;