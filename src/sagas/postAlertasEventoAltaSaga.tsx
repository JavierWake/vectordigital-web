import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postAlertasEventoAltaRecieve, postAlertasEventoAltaError } from '../actions/postAlertasEventoAltaAction';
import { POST_ALERTAS_EVENTO_ALTA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type AlertasEventoAltaPost = SagaReturnType<typeof postAlertasEventoAlta>

const postAlertasEventoAlta = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

function* postAlertasEventoAltaDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    };

    try{
        const alertasEventoAltaPost: AlertasEventoAltaPost = yield call(postAlertasEventoAlta, action.payload.message, config);
        const postAlertasEventoAltaObj = alertasEventoAltaPost.data.response;

        if(postAlertasEventoAltaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postAlertasEventoAltaRecieve({ postAlertasEventoAltaRespuesta: postAlertasEventoAltaObj }) );
        }   
        
        
    } catch (e: any) {

        yield put( postAlertasEventoAltaError({ error: e.message }));

    }
}

function* postAlertasEventoAltaSaga() {

    yield all([takeLatest(POST_ALERTAS_EVENTO_ALTA_REQUEST, postAlertasEventoAltaDataSaga)]);

}

export default postAlertasEventoAltaSaga;