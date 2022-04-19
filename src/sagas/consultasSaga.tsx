import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getConsultasRecieve, getConsultasError } from '../actions/consultasAction';
import { GET_CONSULTAS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type ConsultasDataGet = SagaReturnType<typeof getConsultas>


const getConsultas = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getConsultasSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONSULTA, //action.payload.params[0],
            'canal': action.payload.params[1],
            'cuentasesion': action.payload.params[2],
            'token': action.payload.params[3],
            'id': action.payload.params[4],
        },
    }
    try{

        const consultasGet: ConsultasDataGet = yield call(getConsultas, action.payload.message, config);
        const resp = consultasGet.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getConsultasRecieve({ response: resp }));
        }   
        
        
    } catch (e:any) {

        yield put( getConsultasError({ error: e.message }));

    }
}

function* consultasSaga() {

    yield all([takeLatest(GET_CONSULTAS_REQUEST, getConsultasSaga)]);

}

export default consultasSaga;
