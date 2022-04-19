import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postStopLossRecieve, postStopLossError } from '../actions/postStoplossAction';
import { POST_STOPLOSS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type StopLossPost = SagaReturnType<typeof postStopLoss>

const postStopLoss = (data: string, params: any, bodyString: string) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data, bodyString, params);

function* postStopLossDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    let ejemplo = {
        "request" : {
            "stoplossinput" : {
                "SLInput" : action.payload.data
            }
        }
    }

    try{
        const stopLossPost: StopLossPost = yield call(postStopLoss, action.payload.message, config, JSON.stringify(ejemplo));
        const resp = stopLossPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postStopLossRecieve({ response: resp }) );
        }  

        
        
    } catch (e: any) {

        yield put( postStopLossError({ error: e.message }));

    }
}

function* postStopLossSaga() {

    yield all([takeLatest(POST_STOPLOSS_REQUEST, postStopLossDataSaga)]);

}

export default postStopLossSaga;