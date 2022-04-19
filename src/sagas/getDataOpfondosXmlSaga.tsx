import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getDataOpfondosXmlRecieve, getDataOpfondosXmlError } from '../actions/getDataOpfondosXmlAction';
import { GET_DATA_OPFONDOS_XML_REQUEST } from '../actions/actionTypes';
import * as apiCall from '../constants';
import { AvisoDato, FondoSinSerieConAvisos, GastoDato, OpFondos } from '../types/GetDataOpfondosXmlTypes';

type DataOpfondosXmlGet = SagaReturnType<typeof getDataOpfondosXml>

const getDataOpfondosXml = (config: any) =>
    axios.get<any>(apiCall.URL_DATA_OPFONDOS_XML, config);

function* getDataOpfondosXmlDataSaga(action: any) {

    let config = {
        headers: {
            'Accept': 'application/json',// le mandamos este header para ver si convierte la respuesta a json
        },
    }

    try{
        const dataOpfondosXmlGet: DataOpfondosXmlGet = yield call(getDataOpfondosXml, config);
        
        const dataOpfondosXmlObjString = dataOpfondosXmlGet.data.toString();

        //const dataOpFondosXmlJson = JSON.parse(dataOpfondosXmlObj); // ESTA LINEA MARCA ERROR

        /*
            Doc y tutoriales para convertir xml a json
            (intentar esto antes de instalar un paquete de node)
            https://stackoverflow.com/a/16189815
            https://www.w3schools.com/xml/xml_parser.asp

            PENDIENTE: seguir con logica de conversion de xml a json aqui
        */

        // LOGICA DE CONVERSION DE string xml a json

        const parser = new window.DOMParser();
        const xmlDoc = parser.parseFromString(dataOpfondosXmlObjString,"text/xml");

        const opfondosNode = xmlDoc.getElementsByTagName("opfondos")[0]; //solo hay uno
        
        const gastosNode = opfondosNode.getElementsByTagName("gastos")[0]; //solo hay uno //.childNodes[0].nodeValue;
        const gastosDatoNodes = Array.from(gastosNode.getElementsByTagName("dato")); //"gastos" tiene muchos hijos "dato"
        const gastosDatoJsonArray: GastoDato[] = gastosDatoNodes.map((gastosDatoNode: any) => {
            return {
                emisora: gastosDatoNode.getElementsByTagName("emisora")[0].childNodes[0].nodeValue.toString(),
                serie: gastosDatoNode.getElementsByTagName("serie")[0].childNodes[0].nodeValue.toString(),
                razonfinan: gastosDatoNode.getElementsByTagName("razonfinan")[0].childNodes[0].nodeValue.toString(),
                ptjeadmin: gastosDatoNode.getElementsByTagName("ptjeadmin")[0].childNodes[0].nodeValue.toString(),
            };
        });

        const avisosNode = opfondosNode.getElementsByTagName("avisos")[0]; //solo hay uno //.childNodes[0].nodeValue;
        const avisosDatoNodes = Array.from(avisosNode.getElementsByTagName("dato")); // "avisos" tiene muchos hijos "dato"
        const avisosDatoJsonArray: AvisoDato[] = avisosDatoNodes.map((gastosDatoNode: any) => {
            return {
                liga: gastosDatoNode.getElementsByTagName("liga")[0].childNodes[0].nodeValue.toString(),
                fecha: gastosDatoNode.getElementsByTagName("fecha")[0].childNodes[0].nodeValue.toString(),
                aviso: gastosDatoNode.getElementsByTagName("aviso")[0].childNodes[0].nodeValue.toString(),
            };
        });

        const uniqFondos: GastoDato[] = gastosDatoJsonArray.filter((gastoDatoActual: GastoDato, positionGastoDatoActual: number) => {
            let indexPrimerGastoDato: number = gastosDatoJsonArray.map(item => item.emisora).indexOf(gastoDatoActual.emisora);
            return indexPrimerGastoDato === positionGastoDatoActual;
        });
        
        const fondosSinSerieConAvisosArray: FondoSinSerieConAvisos[] = uniqFondos.map((fondoGastoDatoActual: GastoDato) => {
            return {
                fondo: fondoGastoDatoActual,
                listaAvisos: avisosDatoJsonArray.filter((avisoDato: AvisoDato) => {
                    //metemos en listaAvisos SOLO los avisos donde avisoDato.aviso contenga gastoDatoActual.emisora
                    return avisoDato.aviso.trim().includes(fondoGastoDatoActual.emisora.trim());
                }),
            };
        });

        //este es el objeto que se pasa al estado de dataOpfondosXmlRespuesta
        const opfondosJsonObject: OpFondos = {
            gastos: gastosDatoJsonArray,
            avisos: avisosDatoJsonArray,
            fondosSinSerieConAvisos: fondosSinSerieConAvisosArray,
        };

        yield put( getDataOpfondosXmlRecieve({ dataOpfondosXmlRespuesta: opfondosJsonObject }) );
        
    } catch (e: any) {

        yield put( getDataOpfondosXmlError({ error: e.message }));

    }
}

function* getDataOpfondosXmlSaga() {

    yield all([takeLatest(GET_DATA_OPFONDOS_XML_REQUEST, getDataOpfondosXmlDataSaga)]);

}

export default getDataOpfondosXmlSaga;