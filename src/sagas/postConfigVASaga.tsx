import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postConfigVARecieve, postConfigVAError } from '../actions/postConfigVAAction';
import { POST_CONFIG_VA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostConfigVAData = SagaReturnType<typeof postConfigVA>

const postConfigVA = (data: string, params: any, bodyString: string) =>
    axios.post<any>(apiCall.API_CONFIGURA+data,bodyString, params);

function* postConfigDataSaga(action: any) {
    try{

        let ejemplo = {
            "request" : {
                "inputdata" : {
                    "dsAnaSuscripcion" : {
                        "tdsAnaSuscripcion" : action.payload.data
                    }
                }
            }
        }

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            },
            data: ejemplo
        }

        const configVAPost: PostConfigVAData = yield call(postConfigVA, action.payload.message, config, JSON.stringify(ejemplo));
        const resp = configVAPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postConfigVARecieve({ response: resp }) );
        } 

        
    } catch (e : any) {

        yield put( postConfigVAError({ error: e.message }));

    }
}

function* postConfigVASaga() {

    yield all([takeLatest(POST_CONFIG_VA_REQUEST, postConfigDataSaga)]);

}

export default postConfigVASaga;