import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getResumenRecieve, getResumenError } from '../actions/ResumenAction';
import { GET_RESUMEN_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type ResumenGet = SagaReturnType<typeof getResumen>

const getResumen = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getResumenSaga(action: any) {
    try{
        
        let config = {
            headers: {
                'x-api-key': apiCall.X_API_KEY_CONSULTA, //action.payload.params[0],
                'canal': action.payload.params[1],
                'cuentasesion': action.payload.params[2],
                'token': action.payload.params[3],
                'id': action.payload.params[4],
            },
        }

        const resumenGet: ResumenGet = yield call(getResumen, action.payload.message, config);

        if(resumenGet.data.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            yield put( getResumenRecieve({ 
                valueNum: {
                    Total: resumenGet.data.Total,
                    TotPortafolioCap: resumenGet.data.TotPortafolioCap,
                    TotPortafolioFd: resumenGet.data.TotPortafolioFd,
                    TotPortafolioMd: resumenGet.data.TotPortafolioMd,
                    TotSaldoEfectivo: resumenGet.data.TotSaldoEfectivo,
                    TotOperXLiq: resumenGet.data.TotOperXLiq
                },
                valuePorc: {
                    PorcPortafolioCap: resumenGet.data.PorcPortafolioCap,
                    PorcPortafolioFd: resumenGet.data.PorcPortafolioFd,
                    PorcPortafolioMd: resumenGet.data.PorcPortafolioMd,
                    PorcOperXLiq: resumenGet.data.PorcOperXLiq
                },
                textNum: {
                    sTotal: resumenGet.data.sTotal,
                    sTotPortafolioCap: resumenGet.data.sTotPortafolioCap,
                    sTotPortafolioFd: resumenGet.data.sTotPortafolioFd,
                    sTotPortafolioMd: resumenGet.data.sTotPortafolioMd,
                    sTotSaldoEfectivo: resumenGet.data.sTotSaldoEfectivo,
                    sTotOperXLiq: resumenGet.data.sTotOperXLiq
                },
                textPorc: {
                    sPorcPortafolioCap: resumenGet.data.sPorcPortafolioCap,
                    sPorcPortafolioFd: resumenGet.data.sPorcPortafolioFd,
                    sPorcPortafolioMd: resumenGet.data.sPorcPortafolioMd,
                    sPorcOperXLiq: resumenGet.data.sPorcOperXLiq
                }, 
                ultActualizacion: resumenGet.data.Fecha,
            }) );
        }  
        
    } catch (e:any) {
        yield put( getResumenError({ error: e.message }));

    }
}

function* resumenSaga() {

    yield all([takeLatest(GET_RESUMEN_REQUEST, getResumenSaga)]);

}

export default resumenSaga;
