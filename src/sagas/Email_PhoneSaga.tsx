import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';
import { postEmail_PhoneRecieve, postEmail_PhoneError } from '../actions/postEmail_PhoneAction';
import { POST_EMAIL_PHONE_SEND } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostEmail_PhoneData = SagaReturnType<typeof postEmail_Phone>

const postEmail_Phone = (data: string, params: any) =>
    axios.post<any>(apiCall.API_CONFIGURA+data,null, params);

function* postEmail_PhoneDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[1],
                'cuentasesion': action.payload.params[2],
                'token': action.payload.params[3],
                'id': action.payload.params[4],
            },
        }

        const quotes: PostEmail_PhoneData = yield call(postEmail_Phone, action.payload.message, config);

        if(quotes.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postEmail_PhoneRecieve({respuesta: quotes.data.response}) );
        }  
        
        
    } catch (e: any) {

        yield put( postEmail_PhoneError({ error: e.message }));

    }
}

function* postEmail_PhoneSaga() {

    yield all([takeLatest(POST_EMAIL_PHONE_SEND, postEmail_PhoneDataSaga)]);

}

export default postEmail_PhoneSaga;