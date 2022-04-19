import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosVtaEmisRecieve, getFondosVtaEmisError } from '../actions/fondosVtaEmisAction';
import { GET_FONDOS_VTAEMIS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosVtaEmisGet = SagaReturnType<typeof getFondosVtaEmis>

const getFondosVtaEmis = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_OPERACION+data, params);

function* getFondosVtaEmisDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_OPERACION, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }
    try{
        const fondosVtaEmisGet: FondosVtaEmisGet = yield call(getFondosVtaEmis, action.payload.message, config);

        if(fondosVtaEmisGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            const fondosVtaEmisObj = fondosVtaEmisGet.data.response.dsRespuesta;
            yield put( getFondosVtaEmisRecieve({ fondosVtaEmisRespuesta: fondosVtaEmisObj }) );
        } 
        
    } catch (e: any) {

        yield put( getFondosVtaEmisError({ error: e.message }));

    }
}

function* fondosVtaEmisSaga() {

    yield all([takeLatest(GET_FONDOS_VTAEMIS_REQUEST, getFondosVtaEmisDataSaga)]);

}

export default fondosVtaEmisSaga;