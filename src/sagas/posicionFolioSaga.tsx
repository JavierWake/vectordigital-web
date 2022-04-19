import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postPosicionFolioRecieve, postPosicionFolioError } from '../actions/posicionFolioAction';
import { POST_POSICION_FOLIO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PosicionFolioPost = SagaReturnType<typeof postFolio>

const postFolio = (data: string, params: any) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data,null, params);

function* postPosicionFolioSaga(action: any) {
    //params = ["6FVeF6F5G76BbEK89Oi1X3LJo8PdUifp7AS6DgrK", "1", "cuentaSesion", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab", "10200"]

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

        const postFolioGet: PosicionFolioPost = yield call(postFolio, action.payload.message, config);
        
        console.log("postFolioGet");
        console.log(postFolioGet);

        const resp = postFolioGet.data.response;
        console.log(resp);

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( postPosicionFolioRecieve({ response: resp }));
        } 

        
    } catch (e : any) {
        console.log("error posicion folio saga");
        console.log(e);
        yield put( postPosicionFolioError({ error: e.message }));

    }
}

function* posicionFolioSaga() {

    yield all([takeLatest(POST_POSICION_FOLIO_REQUEST, postPosicionFolioSaga)]);

}

export default posicionFolioSaga;