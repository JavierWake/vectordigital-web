import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getDsPortafolioRecieve, getDsPortafolioError } from '../actions/portfolioAction';
import { GET_POSITION_REQUEST,  } from '../actions/actionTypes';
import { tradingData } from '../types/PortfolioTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PortfolioGet = SagaReturnType<typeof getPortfolio>

const getPortfolio = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getPortfolioSaga(action: any) {

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

        const portfolioGet: PortfolioGet = yield call(getPortfolio, action.payload.message, config);

        
        if(portfolioGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            let tradingData1: any = [];
            let emisoraDescripcion: string[] = [];
            let descr: any;

            portfolioGet.data.response.dsPortafolio.tdsPortafolioCap.filter(row => (row.Serie != "12" && row.Serie != "15") ).map((row:any, i:any) => {
                emisoraDescripcion.push(row.Descripcion);
                descr = row.Descripcion.split(".");
                tradingData1.push({ descripcion: descr[0], titulos: row.TitulosActuales });
            });
            
            const tradingDataF: any = Object.values(tradingData1.reduce((acc:any,cur:any)=>Object.assign(acc,{[cur.descripcion]:cur}),{}))
            
            var unique = emisoraDescripcion.filter((v, i, a) => a.indexOf(v) === i);
            var clean = encodeURIComponent(unique.toString());
            
            yield put( getDsPortafolioRecieve({ dsPortafolio: portfolioGet.data.response.dsPortafolio, emisorasRefinitiv: clean, tradingData: tradingDataF }) );
        } 
        
    } catch (e:any) {

        yield put( getDsPortafolioError({ error: e.message }));

    }
}

function* portfolioSaga() {

    yield all([takeLatest(GET_POSITION_REQUEST, getPortfolioSaga)]);

}

export default portfolioSaga;