import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getCapEmisoraDetalleRecieve, getCapEmisoraDetalleError } from '../actions/getCapEmisoraDetalleAction';
import { GET_CAP_EMISORA_DETALLE_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type CapEmisoraDetalleGet = SagaReturnType<typeof getCapEmisoraDetalle>

const getCapEmisoraDetalle = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getCapEmisoraDetalleDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_MERCADO, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    try{
        const capEmisoraDetalleGet: CapEmisoraDetalleGet = yield call(getCapEmisoraDetalle, action.payload.message, config);
        const getCapEmisoraDetalleObj = capEmisoraDetalleGet.data.response;

        if(getCapEmisoraDetalleObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getCapEmisoraDetalleRecieve({ getCapEmisoraDetalleRespuesta: getCapEmisoraDetalleObj }) );
        }   

        
    } catch (e: any) {

        yield put( getCapEmisoraDetalleError({ error: e.message }));

    }
}

function* getCapEmisoraDetalleSaga() {

    yield all([takeLatest(GET_CAP_EMISORA_DETALLE_REQUEST, getCapEmisoraDetalleDataSaga)]);

}

export default getCapEmisoraDetalleSaga;