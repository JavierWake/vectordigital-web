import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getHistorialEmisoraRecieve, getHistorialEmisoraError } from '../actions/HistorialEmisoraAction';
import { GET_HISTORIALEMISORA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type HistorialGet = SagaReturnType<typeof getHistorial>

const getHistorial = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getHistorialSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONSULTA, //action.payload.params[0],
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{

        const historialEmisoraData: HistorialGet = yield call(getHistorial, action.payload.message, config);
        
        if(historialEmisoraData.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getHistorialEmisoraRecieve({ 
                response: historialEmisoraData.data.response
            }));
        }  

        
    } catch (e:any) {

        yield put( getHistorialEmisoraError({ error: e.message }));

    }
}

function* historialEmisoraSaga() {

    yield all([takeLatest(GET_HISTORIALEMISORA_REQUEST, getHistorialSaga)]);

}

export default historialEmisoraSaga;