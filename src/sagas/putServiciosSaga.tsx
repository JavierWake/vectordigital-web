import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { putServiciosRecieve, putServiciosError } from '../actions/putServiciosAction';
import { PUT_SERVICIOS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type ServiciosGet = SagaReturnType<typeof putServicios>

const putServicios = (data: string, params: any) =>
    axios.put<any>(apiCall.API_CONFIGURA+data, null, params);

const postServicios = (data: string, params: any, bodyString: string) =>
    axios.post<any>(apiCall.API_CONFIGURA+data, bodyString, params);

    

function* putServiciosData(action: any) {


    let ejemplo = {
        "request" : {
            "inputdata" : {
                "dsServicios" : {
                    "tdsServicios" : action.payload.tdsServicios
                }
            }
        }
    }

    let config: any;

    if(action.payload.all) {
        config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            }
        }
    } else {
        config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONFIGURA,
                'canal': action.payload.params[0],
                'cuentasesion': action.payload.params[1],
                'token': action.payload.params[2],
                'id': action.payload.params[3],
            },
            data: ejemplo
        }
    }
    console.log("config", config)

    try{

        let servGet: ServiciosGet;
        if(action.payload.all) {
            servGet = yield call(putServicios, action.payload.message, config);
        } else {
            servGet = yield call(postServicios, action.payload.message, config, JSON.stringify(ejemplo));
        }

        if(servGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( putServiciosRecieve({ response: servGet.data.response }) );
        }  

        
        
    } catch (e : any) {

        yield put( putServiciosError({ error: e.message }));

    }
}


function* putServiciosSaga() {

    yield all([takeLatest(PUT_SERVICIOS_REQUEST, putServiciosData)]);

}

export default putServiciosSaga;