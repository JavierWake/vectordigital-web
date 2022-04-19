import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postAlertasVolatilidadAltaRecieve, postAlertasVolatilidadAltaError } from '../actions/postAlertasVolatilidadAltaAction';
import { POST_ALERTAS_VOLATILIDAD_ALTA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type AlertasVolatilidadAltaPost = SagaReturnType<typeof postAlertasVolatilidadAlta>

const postAlertasVolatilidadAlta = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

function* postAlertasVolatilidadAltaDataSaga(action: any) {

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
        const alertasVolatilidadAltaPost: AlertasVolatilidadAltaPost = yield call(postAlertasVolatilidadAlta, action.payload.message, config);
        const postAlertasVolatilidadAltaObj = alertasVolatilidadAltaPost.data.response;

        if(postAlertasVolatilidadAltaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postAlertasVolatilidadAltaRecieve({ postAlertasVolatilidadAltaRespuesta: postAlertasVolatilidadAltaObj }) );
        }   
        
        
    } catch (e: any) {

        yield put( postAlertasVolatilidadAltaError({ error: e.message }));

    }
}

function* postAlertasVolatilidadAltaSaga() {

    yield all([takeLatest(POST_ALERTAS_VOLATILIDAD_ALTA_REQUEST, postAlertasVolatilidadAltaDataSaga)]);

}

export default postAlertasVolatilidadAltaSaga;