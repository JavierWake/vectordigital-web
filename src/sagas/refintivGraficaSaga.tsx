import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getRefinitivGraficaRecieve, getRefinitivGraficaError } from '../actions/refinitivGraficaAction';
import { GET_REFINITIV_GRAFICA_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';

type RefinitivGraficaGet = SagaReturnType<typeof getRefinitivGrafica>

const getRefinitivGrafica = (tipoGrafica: string, simbolo: string, params: any) =>
    /* nuevo formato del url GET: `${url}/${typeChart}/${auth}/${ric}/${RT (que significa realtime) o DELAY}` */
    tipoGrafica === 'SIMPLE' ? axios.get<any>(apiCall.REFINITIV_GRAFICA_SIMPLE + simbolo, params) : axios.get<any>(apiCall.REFINITIV_GRAFICA_COMPLEJA, params);


/*const getRefinitivGrafica = (tipoGrafica: string,  headers: any) => {
    //let url = tipoGrafica == 'SIMPLE' ? apiCall.REFINITIV_GRAFICA_SIMPLE + headers[1] : apiCall.REFINITIV_GRAFICA_COMPLEJA + headers[1];
    let url = tipoGrafica === 'SIMPLE' ? apiCall.REFINITIV_GRAFICA_SIMPLE : apiCall.REFINITIV_GRAFICA_COMPLEJA;
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                const htmlUpd = this.response.replace('<head>', "<head><base href=" + url + " />");
                return htmlUpd;
            } else {
                console.info("Request failed", this);
            }
        }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.setRequestHeader("Authorization", headers[0]);
    xhr.setRequestHeader("Symbol", headers[1]);
    xhr.setRequestHeader("UserType", headers[2]);
    xhr.setRequestHeader("X-Frame-Options", "SAMEORIGIN");
    xhr.send();
    //return xhr.response;
}*/


function* getRefinitivGraficaDataSaga(action: any) {

    let config = {
        headers: {
            'Content-type': "application/x-www-form-urlencoded; charset=UTF-8",
            //'Content-type': "application/json",
            'Authorization': action.payload.params[0], //SSO TOKEN
            'Symbol': action.payload.params[1], //ric
            'UserType': action.payload.params[2], //ej. RT
            'X-Frame-Options': "SAMEORIGIN",
        },
    }

    // console.log("datos llamada refinitiv");
    // console.log("message: " + action.payload.message);
    // console.log("url: " + action.payload.message === 'SIMPLE' ? apiCall.REFINITIV_GRAFICA_SIMPLE + action.payload.params[1] : apiCall.REFINITIV_GRAFICA_COMPLEJA);
    // console.log(config);

    try{
        const refinitivGraficaGet: RefinitivGraficaGet = yield call(getRefinitivGrafica, action.payload.message, action.payload.params[1], config);
        //const refinitivGraficaGet: string = yield call(getRefinitivGrafica, action.payload.message, action.payload.params[1], action.payload.params);
        const refinitivGraficaArray = refinitivGraficaGet.data.replace('<head>', `<head><base href="${action.payload.message === 'SIMPLE' ? apiCall.REFINITIV_GRAFICA_SIMPLE + action.payload.params[1] : apiCall.REFINITIV_GRAFICA_COMPLEJA}" />`);
        yield put( getRefinitivGraficaRecieve({ refinitivGrafica: refinitivGraficaArray }) );
        
    } catch (e: any) {
        // console.log("error");
        // console.log(e);
        yield put( getRefinitivGraficaError({ error: e.message }));

    }
}

function* refintivGraficaSaga() {

    yield all([takeLatest(GET_REFINITIV_GRAFICA_REQUEST, getRefinitivGraficaDataSaga)]);

}

export default refintivGraficaSaga;