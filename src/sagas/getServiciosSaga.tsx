import axios from 'axios';
import { all, call, put, SagaReturnType, takeLatest } from 'redux-saga/effects';

import { getServiciosRecieve, getServiciosError } from '../actions/getServiciosAction';
import { GET_SERVICIOS_REQUEST } from '../actions/actionTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import * as apiCall from '../constants';

type ServiciosGet = SagaReturnType<typeof getServicios>

const getServicios = (data: string, params: any) =>
    axios.get<any>(apiCall.API_CONFIGURA+data, params);

function* getServiciosData(action: any) {

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

        const servGet: ServiciosGet = yield call(getServicios, action.payload.message, config);

        if(servGet.data.response.ierror === 92){
            //token invalido, porque el usuario inicio sesion con su cuenta en otro tab o navegador o dispositivo
            //entonces hacemos este yield, para borrar el obj de login
            yield put(postLoginObjectLogout());
        }
        else{
            //ierror no es 92, entonces el token sigue valido, 
            //hacemos el procesamiento de la respuesta y la mandamos en el yield de receive de la saga
            let data: any = [];
            let subtext: string;

            servGet.data.response.dsServicios.tdsServicios.map((row:any, i:any) => {
                if(row.IdServicio !== 100 && row.IdServicio !== 200 && row.IdServicio !== 250 && row.IdServicio !== 300 && row.IdServicio !== 500 && row.IdServicio !== 400 ) {
                    if(row.IdServicio === 1200) {
                        row.descripcion = "Depósitos y Retiros";
                        row.subtext = "Movimientos de efectivo en cuenta";
                        row.IdServicioString = row.IdServicio.toString();
                    }
                    if(row.IdServicio === 1000) {
                        row.descripcion = "Órdenes de Capitales";
                        row.subtext = "Compra, Venta y Cancelaciones de Capitales";
                        row.IdServicioString = row.IdServicio.toString();
                    }
                    if(row.IdServicio === 1100) {
                        row.descripcion = "Órdenes de Fondos";
                        row.subtext = "Compra y Venta de Fondos";
                        row.IdServicioString = row.IdServicio.toString();
                    }
                    data.push(row);
                }            
            });

            servGet.data.response.dsServicios.tdsServicios = data;
            
            let filter = data.filter(function(value) { return value.IdServicio !== 1400; });
            let filterWha = data.filter(function(value) { return value.IdServicio === 1400; });

            let checkPush: any = Object.values(filter).every((item:any) => item.activoVMovil === true);
            let emailCheck: any = Object.values(filter).every((item:any) => item.activoCorreo === true) ; 
            let whaCheck:any = filterWha[0].activoWhatsApp;


            yield put( getServiciosRecieve({ response: servGet.data.response, pushSeccion: checkPush, emailSeccion: emailCheck, whaSeccion: whaCheck}) );
        }  
        
    } catch (e : any) {

        yield put( getServiciosError({ error: e.message }));

    }
}

function* getServiciosSaga() {

    yield all([takeLatest(GET_SERVICIOS_REQUEST, getServiciosData)]);

}

export default getServiciosSaga;