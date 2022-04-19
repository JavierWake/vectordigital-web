import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getFondosFamiliaRecieve, getFondosFamiliaError } from '../actions/fondosFamiliasAction';
import { GET_FONDOS_FAMILIAS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type FondosFamiliaGet = SagaReturnType<typeof getFondosFamilias>

const getFondosFamilias = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getFondosFamiliasDataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_MERCADO, //action.payload.params[0],
            'canal': action.payload.params[1],
            'cuentasesion': action.payload.params[2],
            'token': action.payload.params[3],
            'id': action.payload.params[4],
        },
    }
    try{
        const fondosFamiliasGet: FondosFamiliaGet = yield call(getFondosFamilias, action.payload.message, config);

        if(fondosFamiliasGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            const fondosFamiliasArray = fondosFamiliasGet.data.response.dsFondos.dsFondos.tdsFamilia;
            yield put( getFondosFamiliaRecieve({ fondosFamiliasList: fondosFamiliasArray }) );
        }
        
        
    } catch (e: any) {

        yield put( getFondosFamiliaError({ error: e.message }));

    }
}

function* fondosFamiliasSaga() {

    yield all([takeLatest(GET_FONDOS_FAMILIAS_REQUEST, getFondosFamiliasDataSaga)]);

}

export default fondosFamiliasSaga;