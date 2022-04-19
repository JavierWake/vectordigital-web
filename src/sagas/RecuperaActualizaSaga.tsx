import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';
import { postRecupera_ActualizaRecieve, postRecupera_ActualizaError } from '../actions/RecuperaActualizaAction';
import { POST_RECUPERA_ACTUALIZA_SEND } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostRecupera_ActualizaData = SagaReturnType<typeof postRecupera_Actualiza>

const postRecupera_Actualiza = (data: string, params: any) =>
    axios.post<any>(apiCall.API_CONFIGURA+data,null, params);

function* postRecupera_ActualizaDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[1],
                'cuentasesion': action.payload.params[2],
                'token': action.payload.params[3],
                'id': action.payload.params[4],
            },
        }

        const quotes: PostRecupera_ActualizaData = yield call(postRecupera_Actualiza, action.payload.message, config);

        if(quotes.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postRecupera_ActualizaRecieve({respuesta: quotes.data.response}) );
        }  
       
        
    } catch (e: any) {

        yield put( postRecupera_ActualizaError({ error: e.message }));

    }
}

function* postRecupera_ActualizaSaga() {

    yield all([takeLatest(POST_RECUPERA_ACTUALIZA_SEND, postRecupera_ActualizaDataSaga)]);

}

export default postRecupera_ActualizaSaga;