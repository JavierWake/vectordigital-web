import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
    persistReducer,
    persistStore,
} from 'redux-persist';

import listReducer from './listReducer';
import newsReducer from './newsReducer';
import storyReducer from './storyReducer';
import sectorReducer from './sectorReducer';
import listUserReducer from './listUserReducer';
import StationListReducer from './StationListReducer';
import postIssuerReducer from './postIssuerReducer';
import indexList from './indexList';
import quoteReducer from './quotesReducer';
import listIssuerReducer from './listIssuerReducer';
import mercadoReducer from './mercadoReducer';
import followReducer from './followReducer';
import unfollowReducer from './unfollowReducer';
import searchCompanyReducer from './searchCompanyReducer';
import ProfileIssuerReducer from './ProfileIssuerReducer'
import searchIssuerReducer from './searchIssuerReducer';
import createAlertReducer from './createAlertReducer';
import alertGetReducer from './alertGetReducer';
import graphPortfolioReducer from './graphPortfolioReducer';
import resumenReducer from './resumenReducer';
import portfolioReducer from './portfolioReducer';
import postListReducer from './postListReducer';
import changeListReducer from './changeListReducer';
import deleteListReducer from './deleteListReducer';
import deleteIssuerReducer from './deleteIssuerReducer';
import recomIssuerReducer from './recomIssuerReducer';
import ordenesReducer from './ordenesReducer';
import moversReducer from './moversReducer';
import consultasReducer from './consultasReducer';
import multipleOrdersReducer from './multipleOrdersReducer';
import editOrdenReducer from './editOrdenReducer';
import folioDataReducer from './folioDataReducer';
import posicionFolioReducer from './posicionFolioReducer';
import emisorasSimilaresReducer from './emisorasSimilaresReducer';
import CarteraReducer from './CarteraReducer';
import buyTradeDataReducer from './buyTradeDataReducer';
import buyIssuerReducer from './buyIssuerReducer';
import sellTradeDataReducer from './sellTradeDataReducer';
import sellIssuerReducer from './sellIssuerReducer';
import poderCompraReducer from './poderCompraReducer';
import multipleBuyReducer from './multipleBuyReducer';
import multBuyIssuerReducer from './multBuyIssuerReducer';
import stopLossReducer from './stoplossReducer';
import fondosFamiliasReducer from './fondosFamiliasReducer';
import fondosCpaEmisReducer from './fondosCpaEmisReducer';
import fondosVtaEmisReducer from './fondosVtaEmisReducer';
import fondosCpaGetReducer from './fondosCpaGetReducer';
import fondosCpaPutReducer from './fondosCpaPutReducer';
import fondosVtaGetReducer from './fondosVtaGetReducer';
import fondosVtaPutReducer from './fondosVtaPutReducer';
import commoditiesReducer from './commoditiesReducer';
import posturasReducer from './posturasReducer';
import ordenesIssuerReducer from './ordenesIssuerReducer';
import refinitivGraficaReducer from './refinitivGraficaReducer';
import multSellIssuerReducer from './multSellIssuerReducer';
import compraReducer from './compraReducer';
import ventaReducer from './ventaReducer';
import getDataOpfondosXmlReducer from './getDataOpfondosXmlReducer';
import loginObjectReducer from './LoginObjectReducer';
import getCatalogoListaEmisorasReducer from './getCatalogoListaEmisorasReducer';
import infoEmisoraReducer from './infoEmisoraReducer';
import catalogoEmisorasReducer from './getCatalogoEmisorasReducer';
import getConsultaSaldosReducer from './getConsultaSaldosReducer';
import getDepositoBancosReducer from './getDepositoBancosReducer';
import postDepositoReducer from './postDepositoReducer';
import getRetiroInfoReducer from './getRetiroInfoReducer';
import postRetiroReducer from './postRetiroReducer';
import Email_PhoneReducer from './Email_PhoneReducer';
import operacionesDiaReducer from './operacionesDiaReducer';
import getEmailReducer from './getEmailReducer';
import putEmailReducer from './putEmailReducer';
import postEmailReducer from './postEmailReducer';
import getCelularReducer from './getCelularReducer';
import putCelularReducer from './putCelularReducer';
import postCelularReducer from './postCelularReducer';
import putCelularReenviaReducer from './putCelularReenviaReducer';
import Recupera_ValidaReducer from './RecuperaValidaReducer';
import Recupera_ActualizaReducer from './RecuperaActualizaReducer';
import PasswordPostReducer from './PasswordPostReducer';
import PasswordGetReducer from './PasswordGetReducers';
import fondosMonitorReducer from './fondosMonitorReducer';
import acumuladoReducer from './acumuladoReducer';
import hechosReducer from './hechosReducer';
import postStopLossReducer from './postStopLossReducer';
import fondosEstrategiaIntegralReducer from './fondosEstrategiaIntegralReducer';
import fondosFamDistribucionReducer from './fondosFamDistribucionReducer';
import fondosNuevaFamiliasReducer from './fondosNuevaFamiliasReducer';
import historicoReducer from './historicoReducer';
import catalogoTradingReducer from './catalogoTradingReducer';
import postLogoutReducer from './postLogoutReducer';
import historialEmisoraReducer from './historialEmisoraReducer';
import readyStateReducer from './readyStateReducer';
import configVAReducer from './configVAReducer';
import getPreguntaSecretaReducer from './getPreguntaSecretaReducer';
import postPreguntaSecretaReducer from './postPreguntaSecretaReducer';
import getAlertasEventoReducer from './getAlertasEventoReducer';
import getAlertasVolatilidadReducer from './getAlertasVolatilidadReducer';
import postAlertasEventoAltaReducer from './postAlertasEventoAltaReducer';
import postAlertasVolatilidadAltaReducer from './postAlertasVolatilidadAltaReducer';
import deleteAlertasEventoBajaReducer from './deleteAlertasEventoBajaReducer';
import deleteAlertasVolatilidadBajaReducer from './deleteAlertasVolatilidadBajaReducer';
import putAlertasEstatusReducer from './putAlertasEstatusReducer';
import getCapEmisoraDetalleReducer from './getCapEmisoraDetalleReducer';
import getServiciosReducer from '../reducers/getServiciosReducer';
import putServiciosReducer from '../reducers/putServiciosReducer';
import postCancelaOrdenReducer from './postCancelaOrdenReducer';
import getOrdenesCapEstatusReducer from './getOrdenesCapEstatusReducer';
import getResumenMercadoReducer from './getResumenMercadoReducer';
import postConfigVAReducer from './postConfigVAReducer';
import postAllConfigVAReducer from './postAllConfigVAReducer';
import postResumenMercadoReducer from './postResumenMercadoReducer';
import getAlertasMiPosicionReducer from './getAlertasMiPosicionReducer';
import putAlertasMiPosicionReducer from './putAlertasMiPosicionReducer';
import getPermisosReducer from './getPermisosReducer';
import issuerListsReducer from './getIssuerListsReducer';
import listUltimaReducer from './listUltimaReducer';
import putServicioReducer from './putServicioReducer';

const rootReducer = combineReducers({
    list: listReducer,
    news: newsReducer,
    modal: storyReducer,
    sector: sectorReducer,
    listUser: listUserReducer,
    StationList: StationListReducer,
    postIssuer: postIssuerReducer,
    indexList: indexList,
    quotesList: quoteReducer,
    listIssuer: listIssuerReducer,
    mercado: mercadoReducer,
    followList: followReducer,
    unfollowList: unfollowReducer,
    searchCompany: searchCompanyReducer,
    profileData: ProfileIssuerReducer,
    searchIssuer: searchIssuerReducer,
    createAlert: createAlertReducer,
    getAlert: alertGetReducer,
    graphPortfolio: graphPortfolioReducer,
    resumen: resumenReducer,
    portfolio: portfolioReducer,
    postList: postListReducer,
    changeList: changeListReducer,
    deleteList: deleteListReducer,
    deleteIssuer: deleteIssuerReducer,
    recomIssuer: recomIssuerReducer,
    ordenes: ordenesReducer,
    moversList: moversReducer,
    consultas: consultasReducer,
    multipleOrders: multipleOrdersReducer,
    editOrden: editOrdenReducer,
    folioData: folioDataReducer,
    posicionFolio: posicionFolioReducer,
    emisorasSimilares: emisorasSimilaresReducer,
    cartera : CarteraReducer,
    buyTradeData: buyTradeDataReducer,
    buyIssuerReducer: buyIssuerReducer,
    sellTradeDataReducer: sellTradeDataReducer,
    sellIssuerReducer: sellIssuerReducer,
    poderCompra: poderCompraReducer,
    multipleBuy: multipleBuyReducer,
    multBuyIssuer: multBuyIssuerReducer,
    fondosFamiliasList: fondosFamiliasReducer,
    stopLossReducer: stopLossReducer,
    refinitivGrafica: refinitivGraficaReducer,
    fondosCpaEmisRespuesta: fondosCpaEmisReducer,
    fondosVtaEmisRespuesta: fondosVtaEmisReducer,
    fondosCpaGetRespuesta: fondosCpaGetReducer,
    fondosCpaPutRespuesta: fondosCpaPutReducer,
    fondosVtaGetRespuesta: fondosVtaGetReducer,
    fondosVtaPutRespuesta: fondosVtaPutReducer,
    commodities: commoditiesReducer,
    posturas: posturasReducer,
    ordenesIssuer: ordenesIssuerReducer,
    compra: compraReducer,
    venta: ventaReducer,
    multSellIssuer: multSellIssuerReducer,
    dataOpfondosXmlRespuesta: getDataOpfondosXmlReducer,
    loginObjectState: loginObjectReducer,
    catalogoListaEmisorasRespuesta: getCatalogoListaEmisorasReducer,
    infoEmisora: infoEmisoraReducer,
    catalogoEmisorasRespuesta: catalogoEmisorasReducer,
    consultaSaldosRespuesta: getConsultaSaldosReducer,
    depositoBancosRespuesta: getDepositoBancosReducer,
    postDepositoRespuesta: postDepositoReducer,
    retiroInfoRespuesta: getRetiroInfoReducer,
    postRetiroRespuesta: postRetiroReducer,
    authIdentifica: Email_PhoneReducer,
    operacionesDia: operacionesDiaReducer,
    getEmailRespuesta: getEmailReducer,
    putEmailRespuesta: putEmailReducer,
    postEmailRespuesta: postEmailReducer,
    getCelularRespuesta: getCelularReducer,
    putCelularRespuesta: putCelularReducer,
    postCelularRespuesta: postCelularReducer,
    putCelularReenviaRespuesta: putCelularReenviaReducer,
    Recupera_Valida: Recupera_ValidaReducer,
    Recupera_Actualiza: Recupera_ActualizaReducer,
    PasswordPost: PasswordPostReducer,
    PasswordGet: PasswordGetReducer,
    fondosMonitorRespuesta: fondosMonitorReducer,
    acumulado: acumuladoReducer,
    hechos: hechosReducer,
    postStopLoss: postStopLossReducer,
    fondosEstrategiaIntegralRespuesta: fondosEstrategiaIntegralReducer,
    fondosFamDistribucionRespuesta: fondosFamDistribucionReducer,
    fondosNuevaFamiliasRespuesta: fondosNuevaFamiliasReducer,
    historico: historicoReducer,
    catalogoTrading: catalogoTradingReducer,
    logoutRespuesta: postLogoutReducer,
    historialEmisora: historialEmisoraReducer,
    readyState: readyStateReducer,
    configVA: configVAReducer,
    getPreguntaSecretaRespuesta: getPreguntaSecretaReducer,
    postPreguntaSecretaRespuesta: postPreguntaSecretaReducer,
    getAlertasEventoRespuesta: getAlertasEventoReducer,
    getAlertasVolatilidadRespuesta: getAlertasVolatilidadReducer,
    postAlertasEventoAltaRespuesta: postAlertasEventoAltaReducer,
    postAlertasVolatilidadAltaRespuesta: postAlertasVolatilidadAltaReducer,
    deleteAlertasEventoBajaRespuesta: deleteAlertasEventoBajaReducer,
    deleteAlertasVolatilidadBajaRespuesta: deleteAlertasVolatilidadBajaReducer,
    putAlertasEstatusRespuesta: putAlertasEstatusReducer,
    getCapEmisoraDetalleRespuesta: getCapEmisoraDetalleReducer,
    servicios: getServiciosReducer,
    putServicios: putServiciosReducer,
    postCancelaOrdenEstado: postCancelaOrdenReducer,
    getOrdenesCapEstatusRespuesta: getOrdenesCapEstatusReducer,
    getResumenMercado: getResumenMercadoReducer,
    postConfigVA: postConfigVAReducer,
    postAllConfigVA: postAllConfigVAReducer,
    postResumenMercado: postResumenMercadoReducer,
    getAlertasMiPosicionRespuesta: getAlertasMiPosicionReducer,
    putAlertasMiPosicionRespuesta: putAlertasMiPosicionReducer,
    getPermisosRespuesta: getPermisosReducer,
    issuerLists: issuerListsReducer,
    listUltima: listUltimaReducer,
    putServicio: putServicioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/*
    cuando el usuario hace logout, se ejecuta el if que esta dentro de la 
    siguiente funcion para resetear el store de redux-saga completo!!!
*/
/*const rootReducer: Reducer = (state: RootState, action: any) => {
    console.log("rootReducer");
    console.log(state);
    console.log(action);
    console.log("appReducer: ");
    console.log(appReducer);

    if(state === undefined){
        console.log("state es undefined");
        return; //hacer return sin nada hace que el estado completo sea undefined, ni siquiera queda la misma estructura, solo es undefined
    }

    if(action.type === "persist/REHYDRATE"){
        console.log("rehydrate");
        return;//hacer return sin nada hace que el estado completo sea undefined, ni siquiera queda la misma estructura, solo es undefined
    }
    else if(action.type === POST_LOGOUT_RECEIVE || action.type === POST_LOGIN_OBJECT_LOGOUT){
        //aqui se resetea el store completo!!!
        storage.removeItem("persist:root");
        state = {} as RootState;
    }
    return appReducer(state, action);
};*/

export default rootReducer;