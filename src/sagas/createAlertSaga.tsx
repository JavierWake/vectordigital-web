import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { createAlertRecieve, createAlertError } from '../actions/createAlertAction';
import { PUT_ALERT_REQUEST_VARIACION  } from '../actions/actionTypes';
import * as apiCall from '../constants';

function* putAlertVariaciontSaga(action: any): any{
    try{

        //console.log("hola", action.payload[1].tipo);
        const callPut = () => {
            axios.put(apiCall.CREATE_ALERT+action.payload[0], null, {params: {
                tipo: action.payload[1].tipo,
                ticker: action.payload[1].ticker,
                vigencia: action.payload[1].vigencia,
                frecuencia: action.payload[1].frecuencia,
                fecha_creada: action.payload[1].fecha_creada,
                valor: action.payload[1].valor,
                tipo_v: action.payload[1].tipo_v,
                movimiento:action.payload[1].movimiento
            }})
        }

        yield call(callPut);
        yield put( createAlertRecieve() );

    } catch (e:any) {

        yield put( createAlertError({ error: e.message }));

    }
}

function* createAlertSaga() {

    yield all([takeLatest(PUT_ALERT_REQUEST_VARIACION, putAlertVariaciontSaga)]);

}

export default createAlertSaga;