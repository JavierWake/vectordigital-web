import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { deleteAlertasEventoBajaRecieve, deleteAlertasEventoBajaError } from '../actions/deleteAlertasEventoBajaAction';
import { DELETE_ALERTAS_EVENTO_BAJA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type AlertasEventoBajaDelete = SagaReturnType<typeof deleteAlertasEventoBaja>

const deleteAlertasEventoBaja = (data: string, params: any) =>
    axios.delete<any>(apiCall.API_CONFIGURA+data, params);

function* deleteAlertasEventoBajaDataSaga(action: any) {

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
        const alertasEventoBajaDelete: AlertasEventoBajaDelete = yield call(deleteAlertasEventoBaja, action.payload.message, config);
        const deleteAlertasEventoBajaObj = alertasEventoBajaDelete.data.response;

        if(deleteAlertasEventoBajaObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( deleteAlertasEventoBajaRecieve({ deleteAlertasEventoBajaRespuesta: deleteAlertasEventoBajaObj }) );
        }   
        
    } catch (e: any) {

        yield put( deleteAlertasEventoBajaError({ error: e.message }));

    }
}

function* deleteAlertasEventoBajaSaga() {

    yield all([takeLatest(DELETE_ALERTAS_EVENTO_BAJA_REQUEST, deleteAlertasEventoBajaDataSaga)]);

}

export default deleteAlertasEventoBajaSaga;