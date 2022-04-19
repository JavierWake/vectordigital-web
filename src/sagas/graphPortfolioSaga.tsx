import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getGraphPortfolioRecieve, getGraphPortfolioError, getValuePortfolioRecieve } from '../actions/GraphPortfolioAction';
import { GET_PORTFOLIO_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type PortfolioGet = SagaReturnType<typeof getPortfolio>

//let message = "/consulta/graficaportafolio?cuenta=" + cuentaLO + "&temporalidad="+temporalidad+"&periodo="+periodo;

let month1: string = "";
let month2: string = "";
let month3: string = "";
let year1: string = "";

const getPortfolio = (data: string, params: any) =>
    axios.get<any>(apiCall.GET_VECTOR_API+data, params);

function* getGraphPortfolioSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONSULTA, //action.payload.params[0],
            'canal': action.payload.params[1],
            'cuentasesion': action.payload.params[2],
            'token': action.payload.params[3],
            'id': action.payload.params[4],
        },
    }

    month1 = "/consulta/graficaportafolio?cuenta=" + action.payload.message + "&temporalidad=M&periodo=1";

    try{

        const portfolioGetMonth1: PortfolioGet = yield call(getPortfolio, month1, config);

        if(portfolioGetMonth1.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            const respMonth1 = portfolioGetMonth1.data.response.data.dsDwResumen.tdsDwResumenDetalle;

            respMonth1.forEach((id:any) => {delete id.cuenta; delete id.saldoDisp; delete id.saldoPend; delete id.tenenciaANR; delete id.tenenciaMC; delete id.tenenciaMD; delete id.tenenciaOB; delete id.tenenciaRF; delete id.tenenciaRV } );
            
            yield put( getGraphPortfolioRecieve({ 
                graphPortfolioMonth1: respMonth1 
            }));

            yield put( getValuePortfolioRecieve({ valuePortfolio: [{ valorPortafolio: 0, rend:0 }] }) );
        }  

        
    } catch (e:any) {

        yield put( getGraphPortfolioError({ error: e.message }));

    }
}

function* graphPortfolioSaga() {

    yield all([takeLatest(GET_PORTFOLIO_REQUEST, getGraphPortfolioSaga)]);

}

export default graphPortfolioSaga;