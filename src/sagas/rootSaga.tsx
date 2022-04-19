import { all, fork } from 'redux-saga/effects';

import listSaga from './listSaga';
import newsSaga from './newsSaga';
import storySaga from './storySaga';
import sectorSaga from './sectorSaga';
import listUserSaga from './listUserSaga';
import StationListSaga from './StationListSaga';
import postIssuerSaga from './postIssuerSaga';
import indexSaga from './indexSaga';
import quotesSaga from './quotesSaga';
import listIssuerSaga from './listIssuerSaga';
import followSaga from './followSaga';
import unfollowSaga from './unfollowSaga';
import searchCompanySaga from './searchCompanySaga';
import ProfileSaga from './ProfileSaga';
import searchIssuerSaga from './searchIssuerSaga';
import createAlertSaga from './createAlertSaga';
import getAlertSaga from './getAlertSaga';
import graphPortfolioSaga from './graphPortfolioSaga';
import resumenSaga from './resumenSaga';
import portfolioSaga from './portfolioSaga';
import postListSaga from './postListSaga';
import changeListSaga from './changeListSaga';
import deleteListSaga from './deleteListSaga';
import deleteIssuerSaga from './deleteIssuerSaga';
import recomIssuerSaga from './recomIssuerSaga';
import ordenesSaga from './ordenesSaga';
import moversSaga from './moversSaga';
import consultasSaga from './consultasSaga';
import editOrdenSaga from './editOrdenSaga';
import folioDatSaga from './folioDataSaga';
import posicionFolioSaga from './posicionFolioSaga';
import emisorasSimilaresSaga from './emisorasSimilaresSaga';
import CarteraSaga from './CarteraSaga';
import buyTradeDataSaga from './buyTradeDataSaga';
import buyIssuerSaga from './buyIssuerSaga';
import sellTradeDataSaga from './sellTradeDataSaga';
import sellIssuerSaga from './sellIssuerSaga';
import poderCompraSaga from './poderCompraSaga';
import multBuyIssuerSaga from './multBuyIssuerSaga';
import multSellIssuerSaga from './multSellIssuerSaga';
import fondosFamiliasSaga from './fondosFamiliasSaga';
import stopLossSaga from './stoplossSaga';
import refintivGraficaSaga from './refintivGraficaSaga';
import fondosCpaEmisSaga from './fondosCpaEmisSaga';
import fondosVtaEmisSaga from './fondosVtaEmisSaga';
import fondosCpaGetSaga from './fondosCpaGetSaga';
import fondosCpaPutSaga from './fondosCpaPutSaga';
import fondosVtaGetSaga from './fondosVtaGetSaga';
import fondosVtaPutSaga from './fondosVtaPutSaga';
import commoditiesSaga from './commoditiesSaga';
import posturasSaga from './posturasSaga';
import ordenesIssuerSaga from './ordenesIssuerSaga';
import getDataOpfondosXmlSaga from './getDataOpfondosXmlSaga';
import loginObjectSaga from './loginObjectSaga';
import getCatalogoListaEmisorasSaga from './getCatalogoListaEmisorasSaga';
import infoEmisoraSaga from './infoEmisoraSaga';
import getCatalogoEmisorasSaga from './getCatalogoEmisorasSaga';
import getConsultaSaldosSaga from './getConsultaSaldosSaga';
import getDepositoBancosSaga from './getDepositoBancosSaga';
import postDepositoSaga from './postDepositoSaga';
import getRetiroInfoSaga from './getRetiroInfoSaga';
import postRetiroSaga from './postRetiroSaga';
import postEmail_PhoneSaga from './Email_PhoneSaga';
import operacionesDiaSaga from './operacionesDiaSaga';
import getEmailSaga from './getEmailSaga';
import putEmailSaga from './putEmailSaga';
import postEmailSaga from './postEmailSaga';
import getCelularSaga from './getCelularSaga';
import putCelularSaga from './putCelularSaga';
import postCelularSaga from './postCelularSaga';
import putCelularReenviaSaga from './putCelularReenviaSaga';
import postRecupera_ValidaSaga from './RecuperaValidaSaga';
import postRecupera_ActualizaSaga from './RecuperaActualizaSaga';
import postPasswordPostSaga from './PasswordPostSaga';
import getPasswordGetSaga from './PasswordGetSaga';
import { postPasswordPostSend } from '../actions/PasswordPostAction';
import fondosMonitorSaga from './fondosMonitorSaga';
import acumuladoSaga from './acumuladoSaga';
import hechosSaga from './hechosSaga';
import postStopLossSaga from './postStopLossSaga';
import fondosEstrategiaIntegralSaga from './fondosEstrategiaIntegralSaga';
import fondosFamDistribucionSaga from './fondosFamDistribucionSaga';
import fondosNuevaFamiliasSaga from './fondosNuevaFamiliasSaga';
import historicoSaga from './historicoSaga';
import catalogoTradingSaga from './catalogoTradingSaga';
import postLogoutSaga from './postLogoutSaga';
import configVASaga from './configVASaga';
import getPreguntaSecretaSaga from './getPreguntaSecretaSaga';
import postPreguntaSecretaSaga from './postPreguntaSecretaSaga';
import historialEmisoraSaga from './historialEmisoraSaga';
import getAlertasEventoSaga from './getAlertasEventoSaga';
import getAlertasVolatilidadSaga from './getAlertasVolatilidadSaga';
import postAlertasEventoAltaSaga from './postAlertasEventoAltaSaga';
import postAlertasVolatilidadAltaSaga from './postAlertasVolatilidadAltaSaga';
import deleteAlertasEventoBajaSaga from './deleteAlertasEventoBajaSaga';
import deleteAlertasVolatilidadBajaSaga from './deleteAlertasVolatilidadBajaSaga';
import putAlertasEstatusSaga from './putAlertasEstatusSaga';
import getCapEmisoraDetalleSaga from './getCapEmisoraDetalleSaga';
import getServiciosSaga from './getServiciosSaga';
import putServiciosSaga from './putServiciosSaga';
import postCancelaOrdenSaga from './postCancelaOrdenSaga';
import getOrdenesCapEstatusSaga from './getOrdenesCapEstatusSaga';
import getResumenMercadoSaga from './getResumenMercadoSaga';
import postConfigVASaga from './postConfigVASaga';
import postAllConfigVASaga from './postAllConfigVASaga';
import postResumenMercadoSaga from './postResumenMercadoSaga';
import getAlertasMiPosicionSaga from './getAlertasMiPosicionSaga';
import putAlertasMiPosicionSaga from './putAlertasMiPosicionSaga';
import getPermisosSaga from './getPermisosSaga';
import issuerListsSaga from './getIssuerListsSaga';
import listUltimaSaga from './listUltimaSaga';
import putServicioSaga from './putServicioSaga';

//const fork: any = Eff.fork; 

export function* rootSaga() {

    yield all(
        [
            fork(listSaga), 
            fork(newsSaga),
            fork(storySaga),
            fork(sectorSaga),
            fork(listUserSaga),
            fork(StationListSaga),
            fork(postIssuerSaga),
            fork(indexSaga),
            fork(quotesSaga),
            fork(listIssuerSaga),
            fork(followSaga),
            fork(unfollowSaga),
            fork(searchCompanySaga),
            fork(ProfileSaga),
            fork(searchIssuerSaga),
            fork(createAlertSaga),
            fork(getAlertSaga),
            fork(graphPortfolioSaga),
            fork(resumenSaga),
            fork(portfolioSaga),
            fork(postListSaga),
            fork(changeListSaga),
            fork(deleteListSaga),
            fork(deleteIssuerSaga),
            fork(recomIssuerSaga),
            fork(ordenesSaga),
            fork(moversSaga),
            fork(consultasSaga),
            fork(editOrdenSaga),
            fork(folioDatSaga),
            fork(posicionFolioSaga),
            fork(emisorasSimilaresSaga),
            fork(CarteraSaga),
            fork(buyTradeDataSaga),
            fork(buyIssuerSaga),
            fork(sellTradeDataSaga),
            fork(sellIssuerSaga),
            fork(poderCompraSaga),
            fork(multBuyIssuerSaga),
            fork(multSellIssuerSaga),
            fork(fondosFamiliasSaga),
            fork(stopLossSaga),
            fork(refintivGraficaSaga),
            fork(fondosCpaEmisSaga),
            fork(fondosVtaEmisSaga),
            fork(fondosCpaGetSaga),
            fork(fondosCpaPutSaga),
            fork(fondosVtaGetSaga),
            fork(fondosVtaPutSaga),
            fork(commoditiesSaga),
            fork(posturasSaga),
            fork(ordenesIssuerSaga),
            fork(getDataOpfondosXmlSaga),
            fork(loginObjectSaga),
            fork(getCatalogoListaEmisorasSaga),
            fork(infoEmisoraSaga),
            fork(getCatalogoEmisorasSaga),
            fork(getConsultaSaldosSaga),
            fork(getDepositoBancosSaga),
            fork(postDepositoSaga),
            fork(getRetiroInfoSaga),
            fork(postRetiroSaga),
            fork(postEmail_PhoneSaga),
            fork(operacionesDiaSaga),
            fork(getEmailSaga),
            fork(putEmailSaga),
            fork(postEmailSaga),
            fork(getCelularSaga),
            fork(putCelularSaga),
            fork(postCelularSaga),
            fork(putCelularReenviaSaga),
            fork(postRecupera_ValidaSaga),
            fork(postRecupera_ActualizaSaga),
            fork(postPasswordPostSaga),
            fork(getPasswordGetSaga),
            fork(fondosMonitorSaga),
            fork(acumuladoSaga),
            fork(hechosSaga),
            fork(postStopLossSaga),
            fork(fondosEstrategiaIntegralSaga),
            fork(fondosFamDistribucionSaga),
            fork(fondosNuevaFamiliasSaga),
            fork(historicoSaga),
            fork(catalogoTradingSaga),
            fork(postLogoutSaga),
            fork(configVASaga),
            fork(getPreguntaSecretaSaga),
            fork(postPreguntaSecretaSaga),
            fork(historialEmisoraSaga),
            fork(getAlertasEventoSaga),
            fork(getAlertasVolatilidadSaga),
            fork(postAlertasEventoAltaSaga),
            fork(postAlertasVolatilidadAltaSaga),
            fork(deleteAlertasEventoBajaSaga),
            fork(deleteAlertasVolatilidadBajaSaga),
            fork(putAlertasEstatusSaga),
            fork(getCapEmisoraDetalleSaga),
            fork(getServiciosSaga),
            fork(putServiciosSaga),
            fork(postCancelaOrdenSaga),
            fork(getOrdenesCapEstatusSaga),
            fork(getResumenMercadoSaga),
            fork(postConfigVASaga),
            fork(postAllConfigVASaga),
            fork(postResumenMercadoSaga),
            fork(getAlertasMiPosicionSaga),
            fork(putAlertasMiPosicionSaga),
            fork(getPermisosSaga),
            fork(issuerListsSaga),
            fork(listUltimaSaga),
            fork(putServicioSaga),
        ]
    );
}