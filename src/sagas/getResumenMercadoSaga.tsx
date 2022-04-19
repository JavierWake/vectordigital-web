import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getResumenMercadoRecieve, getResumenMercadoError } from '../actions/getResumenMercadoAction';
import { GET_RESUMEN_MERCADO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type ResumenMercadoGet = SagaReturnType<typeof getResumenMercadoData>

const getResumenMercadoData = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getResumenMercadoDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{

        const resumenMercadoGet: ResumenMercadoGet = yield call(getResumenMercadoData, action.payload.message, config);

        if(resumenMercadoGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getResumenMercadoRecieve({ ierror: resumenMercadoGet.data.response.ierror, cerror: resumenMercadoGet.data.response.cerror, tdsConfiguracion: resumenMercadoGet.data.response.dsConfiguracion.tdsConfiguracion, tdsEmisoras: resumenMercadoGet.data.response.dsConfiguracion.tdsEmisoras }));
        }  
        
    } catch (e : any) {

        yield put( getResumenMercadoError({ error: e.message }));

    }
}

function* getResumenMercadoSaga() {

    yield all([takeLatest(GET_RESUMEN_MERCADO_REQUEST, getResumenMercadoDataSaga)]);

}

export default getResumenMercadoSaga;