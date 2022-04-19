import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { deleteAlertasVolatilidadBajaRecieve, deleteAlertasVolatilidadBajaError } from '../actions/deleteAlertasVolatilidadBajaAction';
import { DELETE_ALERTAS_VOLATILIDAD_BAJA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type AlertasVolatilidadBajaDelete = SagaReturnType<typeof deleteAlertasVolatilidadBaja>

const deleteAlertasVolatilidadBaja = (data: string, params: any) =>
    axios.delete<any>(apiCall.API_CONFIGURA+data, params);

function* deleteAlertasVolatilidadBajaDataSaga(action: any) {

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
        const alertasVolatilidadBajaDelete: AlertasVolatilidadBajaDelete = yield call(deleteAlertasVolatilidadBaja, action.payload.message, config);
        const deleteAlertasVolatilidadBajaObj = alertasVolatilidadBajaDelete.data.response;

        if(deleteAlertasVolatilidadBajaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( deleteAlertasVolatilidadBajaRecieve({ deleteAlertasVolatilidadBajaRespuesta: deleteAlertasVolatilidadBajaObj }) );
        }  
        
        
    } catch (e: any) {

        yield put( deleteAlertasVolatilidadBajaError({ error: e.message }));

    }
}

function* deleteAlertasVolatilidadBajaSaga() {

    yield all([takeLatest(DELETE_ALERTAS_VOLATILIDAD_BAJA_REQUEST, deleteAlertasVolatilidadBajaDataSaga)]);

}

export default deleteAlertasVolatilidadBajaSaga;