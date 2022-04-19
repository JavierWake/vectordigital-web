import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getHistoricoRecieve, getHistoricoError } from '../actions/historicoAction';
import { GET_HISTORICO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type HistoricoGet = SagaReturnType<typeof getHistorico>

const getHistorico = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getHistoricoSaga(action: any) {

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

        const historicoData: HistoricoGet = yield call(getHistorico, action.payload.message, config);

        if(historicoData.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            const responseData = {
                ierror: historicoData.data.response.ierror,
                cerror: historicoData.data.response.cerror,
                data: {
                    S1: historicoData.data.response.data["1S"],
                    M1: historicoData.data.response.data["1M"],
                    M3: historicoData.data.response.data["3M"],
                    A1: historicoData.data.response.data["1A"],
                    A5: historicoData.data.response.data["5A"],
                    A10: historicoData.data.response.data["10A"],
                }
            }
    
            yield put( getHistoricoRecieve({ 
                response: responseData
            }));
        }   

        
    } catch (e:any) {

        yield put( getHistoricoError({ error: e.message }));

    }
}

function* historicoSaga() {

    yield all([takeLatest(GET_HISTORICO_REQUEST, getHistoricoSaga)]);

}

export default historicoSaga;