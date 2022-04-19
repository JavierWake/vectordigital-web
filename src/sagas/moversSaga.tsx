import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { IMoversData} from '../types/MoversType';
import { getMoversRecieve, getMoversError } from '../actions/moversAction';
import { GET_MOVERS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type MoversGet = SagaReturnType<typeof getMovers>

const getMovers = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_API_MERCADO+data, params);

function* getMoversDataSaga(action: any) {

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
        
        const moversAltaGet: MoversGet = yield call(getMovers, action.payload.message+"ALTA", config);

        if(moversAltaGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            const altaArray = moversAltaGet.data.response.dsMayoresCambios.tdsCambios;
            const resp = altaArray.filter( function(item:any) { return item.descripcion != "-" } );

            //const moversArray = bajaArray.concat(altaArray);
            yield put( getMoversRecieve({ moversList: resp }) );
        }   
        
    } catch (e:any) {

        yield put( getMoversError({ error: e.message }));

    }
}

function* moversSaga() {

    yield all([takeLatest(GET_MOVERS_REQUEST, getMoversDataSaga)]);

}

export default moversSaga;