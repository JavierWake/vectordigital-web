import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getConfigVARecieve, getConfigVAError } from '../actions/configVAAction';
import { GET_CONFIG_VA_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type ConfigVAGet = SagaReturnType<typeof getConfigVAData>

const getConfigVAData = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getConfigVADataSaga(action: any) {

    let config = {
        headers: {
            'x-api-key': apiCall.X_API_KEY_CONFIGURA,
            'canal': action.payload.params[0],
            'cuentasesion': action.payload.params[1],
            'token': action.payload.params[2],
            'id': action.payload.params[3],
        },
    }

    try{

        const configVAGet: ConfigVAGet = yield call(getConfigVAData, action.payload.message, config);

        const mesaAnalisis: any = [];
        const economia: any = [];
        const fundamental: any = [];
        const tecnico: any = [];
        const internacional: any = [];
        const rentaFija: any = [];

        if(configVAGet.data.response.ierror === 92) {
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        } else {
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            configVAGet.data.response.dsAnaSuscripcion.tdsAnaSuscripcion.map((a) =>{
                if(a.idtipo === 8){
                    // Fundamental
                    a["desc"] = "Reporte anticipado de resultados trimestrales de emisoras nacionales"; 
                    fundamental.push(a);
                }
                if(a.idtipo === 9){
                    // Fundamental
                    a["desc"] = "Notas oportunas de eventos de emisoras nacionales y del SIC";
                    fundamental.push(a);
                }
                if(a.idtipo === 11){
                    // Fundamental
                    a["desc"] = "Reporte de resultados trimestrales de emisoras nacionales con análisis de múltiplos y razones clave";
                    fundamental.push(a);
                }
                if(a.idtipo === 32){
                    // Fundamental
                    a["desc"] = "Portafolio de emisoras recomendadas por el equipo de Análisis Fundamental";
                    fundamental.push(a);
                }
                if(a.idtipo === 46){
                    // Fundamental
                    a["desc"] = "Reporte inicial de cobertura por nuestro equipo de análisis de renta variable";
                    fundamental.push(a);
                }
                if(a.idtipo === 22){
                    // Técnico
                    a["desc"] = "Reporte diario de los principales indicadores de mercados globales, de divisas y commodities";
                    tecnico.push(a);
                }
                if(a.idtipo === 23){
                    // Técnico
                    a["desc"] = "Notas oportunas de análisis técnico de emisoras nacionales, sic y divisas";
                    tecnico.push(a);
                }
                if(a.idtipo === 107){
                    // Renta Fija
                    a["desc"] = "Notas relevantes de tasas y mercado de dinero";
                    rentaFija.push(a);
                }
                if(a.idtipo === 5){
                    // Economía
                    a["desc"] = "Notas oportunas de eventos relevantes en la economía mexicana";
                    economia.push(a);
                }
                if(a.idtipo === 19){
                    // Internacional
                    a["desc"] = "Notas relevantes de emisoras y economía internacional";
                    internacional.push(a);
                }
                if(a.idtipo === 13){
                    // Mesa de Análisis
                    a["desc"] = "Resumen matutino de los acontecimientos más importantes en la economía global";
                    mesaAnalisis.push(a);
                }
                if(a.idtipo === 17){
                    // Mesa de Análisis
                    a["desc"] = "Compendio de todos los temas de Vector Análisis en la semana incluyendo recomendaciones y carteras";
                    mesaAnalisis.push(a);
                }
                if(a.idtipo === 49){
                    // Mesa de Análisis
                    a["desc"] = "Presentación semanal de perspectivas de análisis técnico, económico, internacional y renta variable";
                    mesaAnalisis.push(a);
                }
                if(a.idtipo === 68){
                    // Mesa de Análisis
                    a["desc"] = "Reporte con toda la información de mercados y noticias para comenzar el día bursátil";
                    mesaAnalisis.push(a);
                }
                if(a.idtipo === 118){
                    // Mesa de Análisis
                    a["desc"] = "Análisis a fondo y oportuno de temas importantes para tus inversiones";
                    mesaAnalisis.push(a);
                }
                if(a.idtipo === 67){
                    // Fundamental
                    a["desc"] = "Compendio de expectativas para todas las emisoras nacionales que cubre VectorAnálisis";
                    fundamental.push(a);
                }
                if(a.idtipo === 117){
                    // Economía
                    a["desc"] = "Reporte diario de la economía mexicana e Internacional, incluyendo mercado de divisas";
                    economia.push(a);
                }
                if(a.idtipo === 10){
                    // Fundamental
                    a["desc"] = "Resumen de Reporte de resultados trimestrales en una sola hoja";
                    fundamental.push(a);
                }
                if(a.idtipo === 108){
                    // Técnico
                    a["desc"] = "Reporte diario de los principales indicadores de mercados globales, de divisas y commodities";
                    tecnico.push(a);
                }
            }, []);
    
            yield put( getConfigVARecieve({ ierror: configVAGet.data.response.ierror, cerror: configVAGet.data.response.cerror, fundamental: fundamental, mesaAnalisis: mesaAnalisis, tecnico: tecnico, economia: economia, rentaFija: rentaFija, internacional: internacional }));
        }   
        
    } catch (e : any) {

        yield put( getConfigVAError({ error: e.message }));

    }
}

function* configVASaga() {

    yield all([takeLatest(GET_CONFIG_VA_REQUEST, getConfigVADataSaga)]);

}

export default configVASaga;