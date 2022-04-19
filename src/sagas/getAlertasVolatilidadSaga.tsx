import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getAlertasVolatilidadRecieve, getAlertasVolatilidadError } from '../actions/getAlertasVolatilidadAction';
import { GET_ALERTAS_VOLATILIDAD_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type AlertasVolatilidadGet = SagaReturnType<typeof getAlertasVolatilidad>

const getAlertasVolatilidad = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getAlertasVolatilidadDataSaga(action: any) {

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
        const alertasVolatilidadGet: AlertasVolatilidadGet = yield call(getAlertasVolatilidad, action.payload.message, config);
        const getAlertasVolatilidadObj = alertasVolatilidadGet.data.response;

        if(getAlertasVolatilidadObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getAlertasVolatilidadRecieve({ getAlertasVolatilidadRespuesta: getAlertasVolatilidadObj }) );
        } 
        
    } catch (e: any) {

        yield put( getAlertasVolatilidadError({ error: e.message }));

    }
}

function* getAlertasVolatilidadSaga() {

    yield all([takeLatest(GET_ALERTAS_VOLATILIDAD_REQUEST, getAlertasVolatilidadDataSaga)]);

}

export default getAlertasVolatilidadSaga;