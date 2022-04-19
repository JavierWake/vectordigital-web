import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { postMultBuyIssuerReceive, postMultBuyIssuerError } from '../actions/multBuyIssuerAction';
import { POST_MULT_BUY_ISSUER_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PostMultBuyIssuerData = SagaReturnType<typeof postMultBuyIssuer>

const postMultBuyIssuer = (data: string, params: any, bodyString: string) =>
    axios.post<any>(apiCall.GET_API_OPERACION+data,bodyString, params);

function* postMultBuyIssuerSaga(action: any) {
    try{

        let ejemplo = {
            "request" : {
                "tradeinput" : {
                    "dstrademultinput" : {
                        "tdstrademultinput" : action.payload.data
                    }
                }
            }
        }

        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_OPERACION,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            },
            data: ejemplo
        }

        const multBuyIssuerPost: PostMultBuyIssuerData = yield call(postMultBuyIssuer, action.payload.message, config, JSON.stringify(ejemplo));
        const resp = multBuyIssuerPost.data.response;

        if(resp.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            if(!("dstrade" in resp)){
                resp["dstrade"] = { "tdstrade" : ""}
            }
            yield put( postMultBuyIssuerReceive({ response: resp }) );
        }   
        
    } catch (e : any) {

        yield put( postMultBuyIssuerError({ error: e.message }));

    }
}

function* multBuyIssuerSaga() {

    yield all([takeLatest(POST_MULT_BUY_ISSUER_REQUEST, postMultBuyIssuerSaga)]);

}

export default multBuyIssuerSaga;