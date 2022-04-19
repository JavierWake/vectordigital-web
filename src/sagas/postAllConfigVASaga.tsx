import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postAllConfigVARecieve, postAllConfigVAError } from '../actions/postAllConfigVAAction';
import { POST_ALL_CONFIG_VA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostAllConfigVAData = SagaReturnType<typeof postAllConfigVA>

const postAllConfigVA = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

function* postAllConfigDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            }
        }

        const configVAPost: PostAllConfigVAData = yield call(postAllConfigVA, action.payload.message, config);
        const resp = configVAPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postAllConfigVARecieve({ response: resp }) );
        } 
        
    } catch (e : any) {

        yield put( postAllConfigVAError({ error: e.message }));

    }
}

function* postAllConfigVASaga() {

    yield all([takeLatest(POST_ALL_CONFIG_VA_REQUEST, postAllConfigDataSaga)]);

}

export default postAllConfigVASaga;