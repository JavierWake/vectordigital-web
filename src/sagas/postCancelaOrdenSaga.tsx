import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postCancelaOrdenReceive, postCancelaOrdenError } from '../actions/postCancelaOrdenAction';
import { POST_CANCELA_ORDEN_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostOrdenData = SagaReturnType<typeof postOrden>

const postOrden = (data: string, params: any, body: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data,body, params);

function* cancelaOrdenSaga(action: any) {
    try{

        let bodyObj = {
            "request" : {
                "tradecancela" : {
                    "dstradecancela" : {
                        "tdstradecancelafolio" : action.payload.data,
                    }
                }
            }
        };

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_OPERACION,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            },
        }

        const postCancelaOrdenPost: PostOrdenData = yield call(postOrden, action.payload.message, config, bodyObj);
        const resp = postCancelaOrdenPost.data.response;
        
        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postCancelaOrdenReceive({ response: resp }) );
        } 
        
        
    } catch (e : any) {

        yield put( postCancelaOrdenError({ error: e.message }));

    }
}

function* postCancelaOrdenSaga() {
    yield all([takeLatest(POST_CANCELA_ORDEN_REQUEST, cancelaOrdenSaga)]);
}

export default postCancelaOrdenSaga;