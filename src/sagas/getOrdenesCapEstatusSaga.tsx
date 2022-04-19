import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getOrdenesCapEstatusRecieve, getOrdenesCapEstatusError } from '../actions/getOrdenesCapEstatusAction';
import { GET_ORDENES_CAP_ESTATUS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type OrdenesCapEstatusGet = SagaReturnType<typeof getOrdenesCapEstatus>

const getOrdenesCapEstatus = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getOrdenesCapEstatusDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONSULTA, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    };
    try{
        const ordenesCapEstatusGet: OrdenesCapEstatusGet = yield call(getOrdenesCapEstatus, action.payload.message, config);
        const getOrdenesCapEstatusObj = ordenesCapEstatusGet.data.response;
        
        if(getOrdenesCapEstatusObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getOrdenesCapEstatusRecieve({ getOrdenesCapEstatusRespuesta: getOrdenesCapEstatusObj }) );
        } 
        // console.log("OrdenesCapEstatus resp");
        // console.log(getOrdenesCapEstatusObj)
        
    } catch (e: any) {

        yield put( getOrdenesCapEstatusError({ error: e.message }));

    }
}

function* getOrdenesCapEstatusSaga() {

    yield all([takeLatest(GET_ORDENES_CAP_ESTATUS_REQUEST, getOrdenesCapEstatusDataSaga)]);

}

export default getOrdenesCapEstatusSaga;
