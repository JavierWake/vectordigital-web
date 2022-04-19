import axios from 'axios';
import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';
import { getPasswordGetRecieve, getPasswordGetError } from '../actions/PasswordGetAction';
import { GET_PASSWORDGET_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type getPasswordGetData = SagaReturnType<typeof getPasswordGet>

const getPasswordGet = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data,params);

function* getPasswordGetDataSaga(action: any) {
    try{

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            },
        }


        const quotes: getPasswordGetData = yield call(getPasswordGet, action.payload.message, config);

        if(quotes.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getPasswordGetRecieve({respuesta: quotes.data.response}) );
        }   
        
        
    } catch (e: any) {

        yield put( getPasswordGetError({ error: e.message }));

    }
}

function* getPasswordGetSaga() {

    yield all([takeLatest(GET_PASSWORDGET_REQUEST, getPasswordGetDataSaga)]);

}

export default getPasswordGetSaga;