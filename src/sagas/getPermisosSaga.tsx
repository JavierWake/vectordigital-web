import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getPermisosRecieve, getPermisosError } from '../actions/getPermisosAction';
import { GET_PERMISOS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PermisosGet = SagaReturnType<typeof getPermisos>

const getPermisos = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getPermisosDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    };

    try{
        const permisosGet: PermisosGet = yield call(getPermisos, action.payload.message, config);
        const getPermisosObj = permisosGet.data.response;

        if(getPermisosObj.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getPermisosRecieve({ getPermisosRespuesta: getPermisosObj }) );
        } 

        
        
    } catch (e: any) {

        yield put( getPermisosError({ error: e.message }));

    }
}

function* getPermisosSaga() {

    yield all([takeLatest(GET_PERMISOS_REQUEST, getPermisosDataSaga)]);

}

export default getPermisosSaga;
