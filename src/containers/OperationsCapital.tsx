import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import parse from "html-react-parser";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import Loading from "../components/Loading";
import ModalPoderCompra from "./ModalPoderCompra";
import { Dropdown } from "./Dropdown";
import { Digit } from "./Digit";
import PopOver from "./PopOver";
import { DigitDataTitulos, DigitDataPrice, DigitDataDif, DigitDataPer } from "../mocks/DigitData";

import { DataSearchGraficador, SearchGraficador } from '../containers/SearchGraficador';
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';
import { getCatalogoEmisorasRequest } from '../actions/getCatalogoEmisorasAction';

import { MdClose, MdKeyboardArrowLeft } from "react-icons/md";

import { multipleOrders } from "../actions/multipleOrdersAction";
import { compra } from "../actions/compraAction";
import { venta } from "../actions/ventaAction";
import { getBuyTradeDataRequest } from '../actions/buyTradeDataAction';
import { postBuyIssuerRequest } from '../actions/buyIssuerAction';
import { postSellIssuerRequest } from '../actions/sellIssuerAction';
import { multipleBuyAdd } from "../actions/multipleBuyAction";
import { multipleBuyDeleteAll } from "../actions/multipleBuyAction";
import { getStoplossRequest } from "../actions/stoplossAction";
import { postStopLossRequest } from "../actions/postStoplossAction";
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { getConsultaSaldosRequest } from '../actions/getConsultaSaldosAction';

import { IMultipleBuy } from "../types/MultipleBuyType";
import { LoginObjectState } from "../types/LoginObjectTypes";
import ModalFolioTarjetaForm from "./ModalFolioTarjetaForm";
import { PosicionFolioState } from '../types/PosicionFolioTypes';
import { GetConsultaSaldosState } from '../types/GetConsultaSaldosType';
import convertToAcentos from "../utils/convertToAcentos";

interface OperationsCapitalProps {
    loginObject?: LoginObjectState;
    multipleOrder: any;
    multipleBuys: IMultipleBuy[];
    emisoraRecibida: string;
    serieRecibida: string;
    buyTradeData: any;
    buyIssuer: any;
    sellIssuer: any;
    ventaStore: any;
    compraStore: any;
    stopLossData: any;
    postStoplossData: any;
    catalogoEmisorasRespuesta: CatalogoEmisorasState;
    postPosicionFolio?: PosicionFolioState;
    sendOrdenRecibida?: (folio: string, tipoOrden: string, operacion: string, respuestaApi: string) => void;
    consultaSaldosRespuesta?: GetConsultaSaldosState;
}

const OperationsCapital: React.FC<OperationsCapitalProps> = ({ loginObject, multipleOrder, multipleBuys, emisoraRecibida, serieRecibida, buyTradeData, buyIssuer, sellIssuer, compraStore, ventaStore, stopLossData, postStoplossData, catalogoEmisorasRespuesta, postPosicionFolio, sendOrdenRecibida, consultaSaldosRespuesta }) => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                        const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                        const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                        const canal = "999";
                        const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                        
                        sendCtaCtoDispatch(cuentaLO);
                        sendParamsDispatch([ canal, cuentaSesionLO.toString(), tokenLO, idLO.toString() ]); //idLO.toString() ]);
                    
                    }

                    if(catalogoEmisorasRespuesta != undefined){
                        if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                            if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length === 0){
                                //el catalogo de emisoras no ha sido consultado
                                //llamar dispatch para el catalogo de emisoras
                                let message = "catalogo/emisora/catalogo";
                                dispatch(getCatalogoEmisorasRequest({message}));
                            }
                        }
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en operationscapital, lo mandamos al login");
                    history.push("/");
                }
            }
            else{
                if(loginObject.response.ierror === 92) {
                  dispatch(postLoginObjectLogout());
                  history.push("/");
                } else {
                  //el usuario no esta loggeado, lo mandamos al login
                  console.log("usuario no loggeado en appbar, lo mandamos al login");
                  history.push("/");
                }
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en operationscapital, lo mandamos al login");
            history.push("/");
        }
    },[]);

    //HOOKS - para llamadas del dispatch
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [errorDatosDispatch, setErrorDatosDispatch] = useState("");

    const sendParamsDispatch = (data: string[]) => {
        if(data.length === 0){
            return
        }
        if(data.includes("")){
            return;
        }
        if(paramsDispatch === data){
            return;
        }
        setParamsDispatch(data);
    };

    const sendCtaCtoDispatch = (data: string) => {
        if(data.length === 0){
            return;
        }
        if(ctaCtoDispatch === data){
            return;
        }
        setCtaCtoDispatch(data);
    };

    const sendErrorDispatch = (data: string) => {
        if(errorDatosDispatch === data){
            return;
        }
        setErrorDatosDispatch(data);
    };

    const limpiarEstados = () => {
        // Limpiar todos los estados
        setOrden("Limitada");
        setComprar(false);
        setVender(false);
        setTime(false);
        setTitulos("1");
        setPrice("1");
        setDif("1");
        setPer("1");
        setVigencia(1);
        setHr("08");
        setMin("30");
        setAdvanced(false);
        setAgregar(multipleOrder);
        setAdvancedVenta(ventaStore);
        setAdvancedCompra(compraStore);
        setId(1);
        setBmv(0);
        setBiva(0);
        setTituDisp(0);
        setRes("");
        setFolio("");
        setMontoAprox(0.0);
        setAdvancedOrden("Limitada");
        setAdvancedId(1);
        setTipoSL("slprecio");
        setVarSL("1");
        setPriceSL("1");
        setTitulosSL("1");
        setPrecioShow(1);
        setResOrdenSL("");
        setFolioSL(0);
        setOrdenesPosibles([{id : "", option : ""}]);
        setHorario("");
        setFakFok("FAK");
        setErrorCompraVenta(false);
        setErrorVenta(false);
        setErrorVigencia(false);
        setErrorHora(false);
        setErrorMin(false);
        setPrecioActivacion("1");
        setModal2(false);
        setModal4(false);
        setModal5(false);
        setModal6(false);
    }

    //HOOKS
    const [orden, setOrden] = useState("Limitada");
    const [comprar, setComprar] = useState(false);
    const [vender, setVender] = useState(false);
    const [time, setTime] = useState(false);
    const [titulos, setTitulos] = useState("1");
    const [price, setPrice] = useState("1");
    const [dif, setDif] = useState("1");
    const [per, setPer] = useState("1");
    const [vigencia, setVigencia] = useState(1);
    const [hr, setHr] = useState("08");
    const [min, setMin] = useState("30");
    const [issuer, setIssuer] = useState("");
    const [advanced, setAdvanced] = useState(false);
    const [agregar, setAgregar] = useState(multipleOrder);
    const [advancedVenta, setAdvancedVenta] = useState(ventaStore);
    const [advancedCompra, setAdvancedCompra] = useState(compraStore);
    const [id, setId] = useState(1);
    const [bmv, setBmv] = useState(0);
    const [biva, setBiva] = useState(0);
    const [tituDisp, setTituDisp] = useState(0);
    const [res, setRes] = useState("");
    const [folio, setFolio] = useState("");
    const [montoAprox, setMontoAprox] = useState(0.0);
    const [advancedOrden, setAdvancedOrden] = useState("Limitada");
    const [advancedId, setAdvancedId] = useState(1);
    const [tipoSL, setTipoSL] = useState("slprecio");
    const [varSL, setVarSL] = useState("1");
    const [priceSL, setPriceSL] = useState("1");
    const [titulosSL, setTitulosSL] = useState("1");
    const [precioShow, setPrecioShow] = useState(1);
    const [resOrdenSL, setResOrdenSL] = useState("");
    const [folioSL, setFolioSL] = useState(0);
    const [ordenesPosibles, setOrdenesPosibles] = useState([{id : "", option : ""}]);
    const [horario, setHorario] = useState("");
    const [fakFok, setFakFok] = useState("FAK");
    const [errorCompraVenta, setErrorCompraVenta] = useState(false);
    const [errorVenta, setErrorVenta] = useState(false);
    const [errorVigencia, setErrorVigencia] = useState(false);
    const [errorHora, setErrorHora] = useState(false);
    const [errorMin, setErrorMin] = useState(false);
    const [emisora, setEmisora] = useState(emisoraRecibida);
    const [serie, setSerie] = useState(serieRecibida);
    const [precioActivacion, setPrecioActivacion] = useState("1");
    const [errorAgregar, setErrorAgregar] = useState(false);
    const [errorCVTarjeta, setErrorCVTarjeta] = useState(false); // Si se estaba haciendo una compra/venta y falta num de la tarjeta
    const [ordenesAvanzadas, setOrdenesAvanzadas] = useState([{id : "", option : ""}]);
    const [bolsa, setBolsa] = useState("");
    const [advancedBolsa, setAdvancedBolsa] = useState("");
    const [ordenRecibida, setOrdenRecibida] = useState(false);
    const [checarConfirmar, setChecarConfirmar] = useState(false);
    const [errorOperaciones, setErrorOperaciones] = useState("");
    const [poderCompraPC, setPoderCompraPC] = useState("-");
    const [checkPoderCompra, setCheckPodercompra] = useState(false);
    const [clickConfirmarSL, setClickConfirmarSL] = useState(false);

    const [errorNumByTradeData, setErrorNumByTradeData] = useState("");
    const [errorTextoApi, setErrorTextoApi] = useState("");
    const [modalFolioTarjetaOpen, setModalFolioTarjetaOpen] = useState(false);

    // Search de Emisora
    const [listaCatEmisoras, setListaCatEmisoras] = useState<Emisora[]>([]);
    const [emisoraObjSeleccionada, setEmisoraObjSeleccionada] = useState<Emisora>({
        PrimaryRIC: "",
        Emisora: "",
        CommonName: "",
        RIC: "",
        Serie: "",
        TechRules: "",
    });
    const [didUserSelectedOption, setDidUserSelectedOption] = useState(true);
    const [seEnviaPrimeraEmisora, setSeEnviaPrimeraEmisora] = useState(true);

    // Modales
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    const [modal4, setModal4] = useState(false);
    const toggle4 = () => setModal4(!modal4);
    const [modal5, setModal5] = useState(false);
    const toggle5 = () => setModal5(!modal5);
    const [modal6, setModal6] = useState(false);
    const toggle6 = () => setModal6(!modal6);

    useEffect(() => {
        if(emisoraRecibida !== "" && serieRecibida !== ""){
            setEmisora(emisoraRecibida);
            setSerie(serieRecibida);
            setIssuer(emisoraRecibida + "." + serieRecibida);
            setErrorCompraVenta(false);
            let emisoraSeleccionadaRICArray: Emisora[] = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(function(item: Emisora){
                return (item.Emisora.trim() == emisoraRecibida && item.Serie.trim() == serieRecibida );
            });

            if(emisoraSeleccionadaRICArray.length > 0){
                //se encontro la emisora
                sendEmisoraSeleccionada(emisoraSeleccionadaRICArray[0]);
                sendDidUserSelectedOption(true);
            }
        }
        else{
            setEmisora(emisoraRecibida);
            setSerie(serieRecibida);
            setIssuer("");
            // Limpiar estados
            limpiarEstados();
            setErrorCompraVenta(true);
        }        
    }, [emisoraRecibida, serieRecibida]);

    useEffect(() => {
        if(issuer !== "" && advanced){
            if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
                let message = "stoploss/emis?cuenta=" + ctaCtoDispatch;
                let params = paramsDispatch;
                let res = { message, params };

                dispatch(getStoplossRequest(res));
            }
        }
    }, [advanced]);

    useEffect(() => {
        if(issuer !== ""){
            if(!stopLossData.loading && stopLossData.ierror !== 0){
                setModal6(true);
                sendAdvanced();
            }
            else if(!stopLossData.loading && stopLossData.CatEmisStopLoss.length > 1 && advanced){
                const findIssuerStop = stopLossData.CatEmisStopLoss.filter((i: any) => {
                    return i.Emisora == emisora  && i.Serie == serie;
                });

                if(findIssuerStop.length === 0){
                    setModal2(true);
                    sendAdvanced();
                }
                else{
                    setPrecioShow(parseFloat(findIssuerStop[0].PrecioAct) * .995);
                    setPriceSL(findIssuerStop[0].PrecioAct);
                }
            }
        }
    }, [stopLossData.loading]);

    useEffect(() => {
        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
            if(issuer !== "" && modalFolioTarjetaOpen === false){
                if(advancedCompra || advancedVenta || advanced){
                    // Se cambió la emisora dentro de Compras/Ventas Multiples o Stoploss
                    setAdvancedOrden("Limitada");
                    setAdvancedId(1);
                    setTipoSL("slprecio");
                    setVarSL("1");
                    setPriceSL("1");
                    setTitulosSL("1");
                    setPrecioShow(1);
                    setResOrdenSL("");
                    setFolioSL(0);
                    setTitulos("1");
                    setPrice("1");
                    setVigencia(1);
                    setHr("08");
                    setMin("30");
                    setMontoAprox(0.0);
                    setErrorVigencia(false);
                    setErrorHora(false);
                    setErrorMin(false);
                    setErrorAgregar(false);
                    setErrorVenta(false);

                    if(advanced){
                        // Se cambió emisora dentro de stoploss
                        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
                            let message = "stoploss/emis?cuenta=" + ctaCtoDispatch;
                            let params = paramsDispatch;        
                            let res = { message, params };

                            dispatch(getStoplossRequest(res));
                        }
                    }
                }
                else{
                    // Reiniciar estados cuando hay cambio de emisora
                    limpiarEstados();
                }

                let issuerPrueba: string = issuer;

                const splitIssuer: string[] = issuerPrueba.split(".");

                if(splitIssuer.length === 2){
                    //let message = "/tradecap/cpaemis?cuenta=" + cuentaLO + "&emisora=" + emisora + "&serie=" + serie;
                    let message = "/tradecap/cpaemis?cuenta=" + ctaCtoDispatch + "&emisora=" + splitIssuer[0] + "&serie=" + splitIssuer[1];
                    let params = paramsDispatch;
                    let a = { message, params };
                    dispatch(getBuyTradeDataRequest(a));
                }
            }
        }
    }, [issuer, ctaCtoDispatch, paramsDispatch]);

    useEffect(() => {
        if(issuer !== ""){
            if(!buyTradeData.loading){ // && buyTradeData.errorNumApi.toString() !== "998"){ // -> Fuera del horario de operaciones
                if(buyTradeData.errorNumApi === 50){
                    // error en API porque falta numero de la tarjeta
                    setModalFolioTarjetaOpen(true);
                }
                else if(buyTradeData.errorNumApi !== 0 && buyTradeData.errorNumApi !== 998){
                    // Hubo un error en la API
                    setBmv(0);
                    setBiva(0);
                    setTituDisp(0);
                    setPrice("0");
                    setMontoAprox(0);
                    setErrorCompraVenta(true);
                    sendErrorTextoApi(buyTradeData.errorTextoApi.toString());
                    setModal5(true);

                    if(advancedCompra || advancedVenta || advanced){
                        // Hubo error dentro de Compras/Ventas Multiples o Stoploss
                        setErrorAgregar(true);
                    }
                }
                else if(buyTradeData.tdsEmisoras.length !== 0 && buyTradeData.tdsEmisoras[0]["Emisora"] !== ""){
                    if(buyTradeData.errorNumApi === 998){
                        // Fuera del horario de operaciones
                        setErrorOperaciones(buyTradeData.errorTextoApi);
                    }

                    setBmv(buyTradeData.tdsEmisoras[0]["Precio"]);
                    setBiva(buyTradeData.tdsEmisoras[0]["PreBiva"]);
                    setTituDisp(buyTradeData.tdsEmisoras[0]["Posicion"]);
                    setPrice(buyTradeData.tdsEmisoras[0]["PreSOR"].toFixed(2));
                    setPrecioActivacion((Number(buyTradeData.tdsEmisoras[0]["PreSOR"]) * 1.005).toFixed(2).toString());
                    setMontoAprox(Number(buyTradeData.tdsEmisoras[0]["PreSOR"]));
                    setErrorCompraVenta(false);
                    setModal5(false);
                    setHorario(buyTradeData.tdstradedata[0]["horariooperacion"]);
                    setCheckPodercompra(buyTradeData.tdstradedata[0]["operaFlujos"]);

                    if(buyTradeData.tdsEmisoras[0]["Posicion"] === 0){
                        setErrorVenta(true);
                    }
                    

                    // Setear ordenes con lo que regresa la api
                    let ordenesAPI = [{id : "", option : ""}];
                    ordenesAPI.pop();
    
                    buyTradeData.ttTipoOrdenes.map((o) => {
                        if(o.aplicabiva){
                            let nuevaOrden = {
                                "id" : o.idtipo,
                                "option" : parse(o.descripcion).toString(),
                                "bolsa": "BIVA"
                            }
                            
                            ordenesAPI.push(nuevaOrden);
                        }
                        if(o.aplicabmv){
                            let nuevaOrden = {
                                "id" : o.idtipo,
                                "option" : parse(o.descripcion).toString(),
                                "bolsa": "BMV"
                            }
                            
                            ordenesAPI.push(nuevaOrden);
                        }
                        if(o.aplicasor){
                            let nuevaOrden = {
                                "id" : o.idtipo,
                                "option" : parse(o.descripcion).toString(),
                                "bolsa": "SOR"
                            }
                            
                            ordenesAPI.push(nuevaOrden);
                        }
                    });
    
                    // Agregar operaciones avanzadas al dropdown
                    let ordenCpaMult = {
                        "id" : "-1",
                        "option" : "Operaciones Avanzadas"
                    }

                    ordenesAPI.push(ordenCpaMult);

                    let ultimoId = ordenesAPI.slice(-1)[0]["id"];
                    ordenCpaMult = {
                        "id" : ultimoId + 1,
                        "option" : "Compras Múltiples"
                    }
    
                    ordenesAPI.push(ordenCpaMult);
                    
                    let ordenVtaMult = {
                        "id" : ultimoId + 2,
                        "option" : "Ventas Múltiples"
                    }
    
                    ordenesAPI.push(ordenVtaMult);
                    
                    let ordenStoploss = {
                        "id" : ultimoId + 3,
                        "option" : "Ordenes de Stop Loss"
                    }
    
                    ordenesAPI.push(ordenStoploss);
    
                    setOrdenesPosibles(ordenesAPI);
                    setOrdenesAvanzadas(ordenesAPI.slice(0,2));
                    setBolsa(ordenesAPI[0]["bolsa"]);
                    setAdvancedBolsa(ordenesAPI[0]["bolsa"]);
                    setOrden(ordenesAPI[0]["option"]);
                    setId(Number(ordenesAPI[0]["id"]));
                }
            }
        }        
    }, [buyTradeData.loading]);

    useEffect(() => {
        if(issuer !== ""){
            if(!buyIssuer.loading && buyIssuer.response.ierror == 50){
                // Hay error por numero de folio de tarjeta
                setErrorCVTarjeta(true);
                setModalFolioTarjetaOpen(true);
            }
            else if(!buyIssuer.loading && buyIssuer.response.dstrade.tdstrade.length !== 0) {
                setRes(buyIssuer.response.cerror);
                setFolio(buyIssuer.response.dstrade.tdstrade[0]["folio"]);
                setOrdenRecibida(true);
            }
        }
    }, [buyIssuer.loading]);

    useEffect(() => {
        if(issuer !== ""){
            if(!sellIssuer.loading && sellIssuer.response.ierror == 50){
                // Hay error por numero de folio de tarjeta
                setErrorCVTarjeta(true);
                setModalFolioTarjetaOpen(true);
            }
            else if(!sellIssuer.loading && sellIssuer.response.dstrade.tdstrade.length !== 0) {
                setRes(sellIssuer.response.cerror);
                setFolio(sellIssuer.response.dstrade.tdstrade[0]["folio"]);
                setOrdenRecibida(true);
            }
        }
    }, [sellIssuer.loading]);

    useEffect(() => {
        if(ordenRecibida){
            if(comprar){
                sendOrdenRecibida && sendOrdenRecibida(folio, "Compra " + orden, "Capitales", res);
                setOrdenRecibida(false);
            }
            else if(vender){
                sendOrdenRecibida && sendOrdenRecibida(folio, "Venta " + orden, "Capitales", res);
                setOrdenRecibida(false);
            }
            
        }
    },[res, folio, ordenRecibida]);

    useEffect(() => {
        if(ordenRecibida){
            if(advanced){
                sendOrdenRecibida && sendOrdenRecibida(folioSL.toString(), resOrdenSL, "StopLoss", "");
                setOrdenRecibida(false);
            }
        }
    },[resOrdenSL, folioSL, ordenRecibida]);

    useEffect(() => {
        if(issuer !== ""){
            if(!postStoplossData.loading && postStoplossData.response.ierror === 50){
                setErrorCVTarjeta(true);
                setModalFolioTarjetaOpen(true);
            }
            else if(!postStoplossData.loading && postStoplossData.response.dsRespuesta.InstruccionSL.length != 0) {
                let resOrden = postStoplossData.response.dsRespuesta.InstruccionSL[0]["TipoSL"];
                if(resOrden == "slprecio"){
                    setResOrdenSL("Precio");
                }
                else if(resOrden == "slvarinicio"){
                    setResOrdenSL("Variación Precio Apertura");
                }
                else{
                    setResOrdenSL("Variación Precio Máximo");
                }
                setFolioSL(postStoplossData.response.dsRespuesta.InstruccionSL[0]["FolioSL"]);
                setOrdenRecibida(true);
            }
        }
    }, [postStoplossData.loading])

    useEffect(() => {
        if(!compraStore && !ventaStore && agregar){
            setAdvancedVenta(false);
            setAdvancedCompra(false);
            setBolsa(ordenesPosibles[0]["bolsa"]);
            sendOrden(ordenesPosibles[0]["option"]);
            setId(Number(ordenesPosibles[0]["id"]));
            setAgregar(false);
            dispatch(multipleOrders(false));
            dispatch(multipleBuyDeleteAll(false));
        }
    }, [compraStore, ventaStore])

    useEffect(() => {
        if (emisoraObjSeleccionada.Emisora != "" && emisoraObjSeleccionada.Serie != "") {
            // sendRicSeleccionado(emisoraObjSeleccionada.RIC);
            setEmisora(emisoraObjSeleccionada.Emisora);
            setSerie(emisoraObjSeleccionada.Serie);
            setIssuer(emisoraObjSeleccionada.Emisora + "." + emisoraObjSeleccionada.Serie);
        }
    }, [emisoraObjSeleccionada.RIC]);

    useEffect(() => {
        if(catalogoEmisorasRespuesta != undefined){
            if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0 && catalogoEmisorasRespuesta.loading === false && catalogoEmisorasRespuesta.message.length > 0){
                    //el catalogo ya tiene emisoras en su lista
                    const catEmisorasSorted = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.sort((a,b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));
                    sendListaCatEmisoras(catEmisorasSorted);
                    if (seEnviaPrimeraEmisora) {
                        let emisoraSeleccionadaRICArray: Emisora[] = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(function(item: Emisora){
                            return (item.Emisora.trim() == emisoraRecibida && item.Serie.trim() == serieRecibida );
                        });
            
                        if(emisoraSeleccionadaRICArray.length > 0){
                            //se encontro la emisora
                            sendEmisoraSeleccionada(emisoraSeleccionadaRICArray[0]);
                        }
                        //sendSeEnviaPrimerEmisoraDeLaLista(true);
                    }
                }
            }
        }
    }, [catalogoEmisorasRespuesta.loading, catalogoEmisorasRespuesta.message]);

    useEffect(() => {
        if(postPosicionFolio != undefined){
            if(!postPosicionFolio.loading && postPosicionFolio.response != undefined){
                if(postPosicionFolio.response.ierror != undefined){
                    if(postPosicionFolio.response.ierror === 0 && errorCVTarjeta ){
                        // Numero de la tarjeta confirmado. Volver a hacer la compra/venta
                        setErrorCVTarjeta(false);
                        if(comprar){
                            crearCompra();
                        }
                        if(vender){
                            crearVenta();
                        }
                        if(advanced){
                            confirmarStop();
                        }
                    }
                    if(postPosicionFolio.response.ierror === 0 && !buyTradeData.loading && buyTradeData.errorNumApi === 50){
                        let issuerPrueba: string = issuer;

                        const splitIssuer: string[] = issuerPrueba.split(".");

                        if(splitIssuer.length === 2){
                            let message = "/tradecap/cpaemis?cuenta=" + ctaCtoDispatch + "&emisora=" + splitIssuer[0] + "&serie=" + splitIssuer[1];
                            let params = paramsDispatch;
                            let a = { message, params };
                            dispatch(getBuyTradeDataRequest(a));
                        }
                    }
                }
            }
        }
    }, [postPosicionFolio]);

    useEffect(() => {
        if(!comprar || !vender || !advancedVenta || !advancedCompra || !advanced){
            sendDidUserSelectedOption(true);
        }
    }, [comprar, vender, advancedCompra, advancedVenta, advanced]);

    useEffect(() => {
        if(consultaSaldosRespuesta != undefined){
            if(consultaSaldosRespuesta.message.length > 0 && consultaSaldosRespuesta.loading === false){
                if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa.length > 0){
                    sendPoderCompraPC(Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa[0].saldo));
                }
            }
        }
    },[consultaSaldosRespuesta?.message, consultaSaldosRespuesta?.loading]);

    const sendPoderCompraPC = (data: string) => {
        if(poderCompraPC === data){
            return;
        }
        setPoderCompraPC(data);
    };

    const sendErrorTextoApi = (data: string) => {
        if(errorTextoApi === data){
            return;
        }
        setErrorTextoApi(data);
    }

    const sendOrden = (data: string) => {
        // Reiniciar estados por cambio de orden
        setTime(false);
        setTitulos("1");
        setPrice(bmv.toString());
        setDif("1");
        setPer("1");
        setVigencia(1);
        setHr("08");
        setMin("30");
        setFakFok("FAK");
        setPrecioActivacion((bmv * 1.005).toFixed(2).toString());
        setErrorCompraVenta(false);
        setErrorVenta(false);
        setErrorVigencia(false);
        setErrorHora(false);
        setErrorMin(false);
        setErrorAgregar(false);

        if(data === "Activada a Nivel Limitada"){
            setMontoAprox(bmv * 1.005);
        }
        else{
            setMontoAprox(bmv);
        }

        setOrden(data);
        if (data == "Ventas Múltiples") {
            sendAdvancedVenta();
        }
        if (data == "Compras Múltiples") {
            sendAdvancedCompra();
        }
        if (data == "Ordenes de Stop Loss") {
            sendAdvanced();
        }
    }

    const sendAdvancedOrden = (data: string) => {
        setAdvancedOrden(data);

        setTime(false);
        setTitulos("1");
        setPrice(bmv.toString());
        setVigencia(1);
        setHr("08");
        setMin("30");
        setMontoAprox(bmv);
        setErrorVigencia(false);
        setErrorHora(false);
        setErrorMin(false);
        setErrorAgregar(false);
        setErrorVenta(false);
    }

    const crearCompra = () => {
        
        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
            setChecarConfirmar(true);
            let params = paramsDispatch;
            let message = "tradecap/cpa?cuenta=" + ctaCtoDispatch;

            let horVig = "";

            if(time){
                horVig = hr + min;
            }

            let fak = ""
            
            if(fakFok != "vigencia"){
                fak = fakFok
            }

            let data = [
                {
                    "emisora": emisora,
                    "serie": serie,
                    "tipoOrden": id.toString(),
                    "vigencia": Number(vigencia),
                    "HrVig": horVig,
                    "PorcMinEj": 0,
                    "precio": price,
                    "PrecioProt": 0,
                    "titulos": parseInt(titulos),
                    "volumen": per,
                    "puja": dif,
                    "bolsa": bolsa,
                    "fakfok": fak
                }
            ];
            
            let res = { message, params, data }
            dispatch(postBuyIssuerRequest(res));
        }
    }

    const crearVenta = () => {

        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
            setChecarConfirmar(true);

            let params = paramsDispatch;
            let message = "/tradecap/vta?cuenta=" + ctaCtoDispatch;

            let horVig = "";

            if(time){
                horVig = hr + min;
            }

            let fak = ""
            
            if(fakFok != "vigencia"){
                fak = fakFok
            }

            let data = [
                {
                    "emisora": emisora,
                    "serie": serie,
                    "tipoOrden": id.toString(),
                    "vigencia": Number(vigencia),
                    "HrVig": horVig,
                    "PorcMinEj": 0,
                    "precio": price,
                    "PrecioProt": 0,
                    "titulos": parseInt(titulos),
                    "volumen": per,
                    "puja": dif,
                    "bolsa": bolsa,
                    "fakfok": fak
                }
            ];

            let res = { message, params, data }
            dispatch(postSellIssuerRequest(res));
        }
    }

    const sendTitulos = (data: string) => {
        setTitulos(data);
        
        if(id === 11){
            let monto = Number(data) * Number(precioActivacion);
            setMontoAprox(monto);
        }
        else{
            let monto = Number(data) * Number(price);
            setMontoAprox(monto);
        }

        if(parseInt(data) > tituDisp){
            setErrorVenta(true);
        }
        else{
            setErrorVenta(false);
        }
    }

    const sendPrice = (data: string) => {
        setPrice(data);
        setPrecioActivacion((Number(data) * 1.005).toFixed(2).toString());
        
        if(id === 11){
            let monto = Number(data) * 1.005 * Number(titulos);
            setMontoAprox(monto);
        }
        else{
            let monto = Number(data) * Number(titulos);
            setMontoAprox(monto);
        }
    }

    const sendVigencia = (e: any) => {
        setVigencia(e.target.value);
        
        // Revisar que vigencia sea entre 1 y 30 días y que no esté vacía
        if(parseInt(e.target.value) > 30 || parseInt(e.target.value) <= 0 || e.target.value == ""){
            setErrorVigencia(true);
            setErrorCompraVenta(true);
            setErrorAgregar(true);
        }
        else{
            setErrorVigencia(false);
            if(!time || (time && !errorHora && !errorMin)){
                setErrorCompraVenta(false);
                setErrorAgregar(false);
            }
        }
    }

    const sendTime = () => {
        if(time){
            if(errorVigencia){
                setErrorCompraVenta(true);
                setErrorAgregar(true);
            }
            else{
                setErrorCompraVenta(false);
                setErrorAgregar(false);
            }
        }
        else{
            if(errorHora || errorMin){
                setErrorCompraVenta(true);
                setErrorAgregar(true);
            }
        }
        setTime(!time);
    }

    const sendHr = (e: any) => {
        setHr(e.target.value);

        // Revisar que hora esté entre 8 y 18
        if(parseInt(e.target.value) > 18 || parseInt(e.target.value) < 8){
            setErrorHora(true);
            setErrorCompraVenta(true);
            setErrorAgregar(true);
        }
        else{
            // Revisar que si la hora es 8 los minutos sean minimo 30
            if(parseInt(e.target.value) == 8 && parseInt(min) < 30){
                setErrorHora(true);
                setErrorCompraVenta(true);
                setErrorAgregar(true);
            }
            else{
                setErrorHora(false);
                if(!errorVigencia){
                    if(!errorMin){
                        setErrorCompraVenta(false);
                        setErrorAgregar(false);
                    }
                    else if(parseInt(e.target.value) != 8 && parseInt(min) < 59 && parseInt(min) > 0){
                        setErrorMin(false);
                        setErrorCompraVenta(false);
                        setErrorAgregar(false);
                    }
                }
            }
        }
    }

    const formatHr = (e : any) => {
        if(e.target.value.toString().length > 2){
            let horaNueva = e.target.value.toString().substring(1);
            setHr(horaNueva);
        }
        else {
            if(e.target.value >= 0 && e.target.value < 10 && e.target.value != "" && e.target.value.toString().length == 1){
                let hora = "0" + e.target.value;
                setHr(hora);
            }
            else{
                if(e.target.value == ""){
                    setHr("09");
                }
                else{
                    setHr(e.target.value);
                }
            }
        }
    }

    const sendMin = (e: any) => {
        setMin(e.target.value);
        
        // Revisar que los minutos sean entre 0 y 59
        if(parseInt(e.target.value) > 59 || parseInt(e.target.value) < 0){
            setErrorMin(true);
            setErrorCompraVenta(true);
            setErrorAgregar(true);
        }
        else{
            if(parseInt(hr) == 8){
                if(parseInt(e.target.value) < 30){
                    setErrorMin(true);
                    setErrorCompraVenta(true);
                    setErrorAgregar(true);
                }
                else{
                    setErrorHora(false);
                    setErrorMin(false);
                    if(!errorHora && !errorVigencia){
                        setErrorCompraVenta(false);
                        setErrorAgregar(false);
                    }
                }
            }
            else{
                setErrorMin(false);
                if(!errorHora && !errorVigencia){
                    setErrorCompraVenta(false);
                    setErrorAgregar(false);
                }
            }
        }
    }

    const formatMin = (e : any) => {
        if(e.target.value.toString().length > 2){
            let minNuevo = e.target.value.toString().substring(1);
            setMin(minNuevo);
        }
        else {
            if(e.target.value >= 0 && e.target.value < 10 && e.target.value != "" && e.target.value.toString().length == 1){
                let minutos = "0" + e.target.value;
                setMin(minutos);
            }
            else{
                if(e.target.value == ""){
                    setMin("00");
                }
                else{
                    setMin(e.target.value);
                }
            }
        }
    }

    const sendAdvanced = () => {
        setAdvanced(!advanced);
        console.log("Entra aquí " + Number(ordenesPosibles[0]["id"]));
        setBolsa(ordenesPosibles[0]["bolsa"]);
        sendOrden(ordenesPosibles[0]["option"]);
        setId(Number(ordenesPosibles[0]["id"]));
    }

    const sendAdvancedVenta = () => {
        setAdvancedVenta(!advancedVenta);
        setBolsa(ordenesPosibles[0]["bolsa"]);
        sendOrden(ordenesPosibles[0]["option"]);
        setId(Number(ordenesPosibles[0]["id"]));
        setAdvancedBolsa(ordenesAvanzadas[0]["bolsa"]);
        setAdvancedId(Number(ordenesAvanzadas[0]["id"]));
        sendAdvancedOrden(ordenesAvanzadas[0]["option"]);
        setAgregar(false);
        dispatch(venta(false));
        dispatch(multipleOrders(false));
        dispatch(multipleBuyDeleteAll(false));
        if(tituDisp === 0){
            setErrorVenta(true);
        }
    }

    const sendAdvancedCompra = () => {
        setAdvancedCompra(!advancedCompra);
        setBolsa(ordenesPosibles[0]["bolsa"]);
        sendOrden(ordenesPosibles[0]["option"]);
        setId(Number(ordenesPosibles[0]["id"]));
        setAdvancedBolsa(ordenesAvanzadas[0]["bolsa"]);
        setAdvancedId(Number(ordenesAvanzadas[0]["id"]));
        sendAdvancedOrden(ordenesAvanzadas[0]["option"]);
        setAgregar(false);
        dispatch(compra(false));
        dispatch(multipleOrders(false));
        dispatch(multipleBuyDeleteAll(false));
    }

    const agregarMultiple = () => {
        if(advancedCompra){
            dispatch(compra(true));
        }
        else{
            dispatch(venta(true));
        }

        setAgregar(true);
        dispatch(multipleOrders(true));

        let horVig = "";

        if(time){
            horVig = hr + min;
        }

        let fak = ""
        
        if(fakFok != "vigencia"){
            fak = fakFok
        }

        let data = {
                "emisora": emisora,
                "serie": serie,
                "tipoOrden": advancedId.toString(),
                "vigencia": vigencia,
                "HrVig": horVig,
                "PorcMinEj": 0,
                "precio": price,
                "PrecioProt": 0,
                "titulos": parseInt(titulos),
                "volumen": per,
                "puja": dif,
                "bolsa": advancedBolsa,
                "fakfok": fak
        };

        dispatch(multipleBuyAdd(data));
    }

    const sendSeEnviaPrimeraEmisora = (data: boolean) => {
        if (seEnviaPrimeraEmisora === data) {
            return;
        }
        setSeEnviaPrimeraEmisora(data);
    }

    const sendDidUserSelectedOption = (data: boolean) => {
        if (didUserSelectedOption === data) {
            return;
        }
        setDidUserSelectedOption(data);
    };

    const sendEmisoraSeleccionada = (data: Emisora) => {
        if (emisoraObjSeleccionada === data) {
            return;
        }
        if (data.RIC.length === 0) {
            return;
        }
        setEmisoraObjSeleccionada(data);
    };

    const sendListaCatEmisoras = (data: Emisora[]) => {
        if (listaCatEmisoras === data) {
            return;
        }
        setListaCatEmisoras(data);
    };

    const modalCloseSinFolio = (data: boolean) => {
        if(data){
            setErrorCVTarjeta(false);
        }
    }

    const SearchDataCatalogoEmisorasParaElGraficador: DataSearchGraficador[] = [
        {
            id: "searchGraficador",
            title: "Buscar emisora.serie, o nombre de empresa...",
            optionsEmisoras: listaCatEmisoras,
            noMatch: "No se encontraron Emisoras",
            placeholder: "Buscar emisora.serie, o nombre de empresa...",
        },
    ];

    const advertenciaLegal = (
        <div>
            <p className="text-center text-gray-500 text-xs">Horario de operaciones {horario}</p>
            <button className="w-full font-bold text-center text-red-600 text-xxs my-2 border-opacity-0" onClick={() => setModal4(true)} >Advertencia Legal</button>
        </div>
    );

    const limitada = (
        <div>
            <div className="flex my-2">
                <div className="w-1/2">
                    <p className="my-1 text-sm">Vigencia</p>
                    <p className="text-gray-400 text-sm">{vigencia} días</p>
                </div>
                {
                    time ?
                        <div className="w-1/2">
                            <p className="my-1 text-sm">Tiempo Específico</p>
                            <p className="text-gray-400 text-sm">{hr}:{min}</p>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    );

    const activa = (
        <div>
            <div className="flex my-2">
                <div className="w-1/2">
                    <p className="my-1 text-sm">Dif Puja</p>
                    <p className="text-gray-400 text-sm">{dif}</p>
                </div>
                {
                    time ?
                        <div className="w-1/2">
                            <p className="my-1 text-sm">Tiempo Específico</p>
                            <p className="text-gray-400 text-sm">{hr}:{min}</p>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    );

    const volumen = (
        <div>
            <div className="my-2">
                <p className="my-1 text-sm">%</p>
                <p className="text-gray-400 text-sm">{per}</p>
            </div>
            <div className="flex my-2">
                <div className="w-1/2">
                    <p className="my-1 text-sm">Vigencia</p>
                    <p className="text-gray-400 text-sm">{vigencia} días</p>
                </div>
                {
                    time ?
                        <div className="w-1/2">
                            <p className="my-1 text-sm">Tiempo Específico</p>
                            <p className="text-gray-400 text-sm">{hr}:{min}</p>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    );

    const mercadoLimitada = (
        <div>
            <div className="my-2 text-sm">
                <p className="my-1">Vigencia</p>
                {
                    fakFok == "FAK" ?
                        <p className="text-gray-400"><span className="font-bold">FaK</span> Asigna y cancela</p>
                        :
                        fakFok == "FOK" ?
                            <p className="text-gray-400"><span className="font-bold">FoK</span> Asigna todo y cancela</p>    
                            :
                            <p className="text-gray-400">{vigencia} días</p>
                }
            </div>
        </div>
    );

    const modalValidarStopLoss = (
        <Modal isOpen={modal2} toggle={toggle2}>
            <ModalHeader toggle={toggle2}>
                <p className="my-1 font-bold">Stop Loss</p>
            </ModalHeader>
            <ModalBody>
                <div className="my-3 flex">
                    Esta emisora no está disponible para Stop Loss.
                </div>
            </ModalBody>
        </Modal>
    );

    const modalAdvertenciaLegal = (
        <Modal isOpen={modal4} toggle={toggle4}>
            <ModalBody>
                <div className='flex justify-between items-center'>
                    <p></p>
                    <p className="font-bold text-lg my-2">Advertencia Legal</p>
                    <MdClose className='text-gray-500 cursor-pointer' onClick={toggle4} />
                </div>


                <div className="p-3">
                    <p>Las Instrucciones ingresadas a traves de Internet estan relacionadas con las politicas de operacion de Vector Casa de Bolsa S.A
                    de C.V. El monto disponible para compra en Renta Variable se basa en la posicion que tiene en Fondos con liquidez maxima de 72
                    horas.</p>
                </div>
                
            </ModalBody>
        </Modal>
    );

    const modalErrorCompraVenta = (
        <Modal isOpen={modal5} toggle={toggle5}>
            <ModalHeader toggle={toggle5}>
                <p className="my-1 font-bold">Operaciones: Emisora {emisoraObjSeleccionada.CommonName}</p>
            </ModalHeader>
            <ModalBody>
                <div className="my-3 flex">
                    { parse(errorTextoApi) }
                </div>
            </ModalBody>
        </Modal>
    );

    const modalErrorStopLoss = (
        <Modal isOpen={modal6} toggle={toggle6}>
            <ModalHeader toggle={toggle6}>
                <p className="my-1 font-bold">Stop Loss</p>
            </ModalHeader>
            <ModalBody>
                <div className="my-3 flex">
                    <p>{parse(stopLossData.cerror)}</p>
                </div>
            </ModalBody>
        </Modal>
    );

    const compraCapitales = (
        <div>
            {
                comprar ?
                    <div className="flex justify-between items-center">
                        <MdKeyboardArrowLeft className="text-red-600 text-3xl cursor-pointer" onClick={() => {setComprar(!comprar); sendDidUserSelectedOption(true); setChecarConfirmar(false);}} />
                        <ModalPoderCompra poderCompraVal={poderCompraPC} show={checkPoderCompra} />
                        <p></p>
                    </div>
                    :
                    <div className="flex justify-between items-center">
                        <MdKeyboardArrowLeft className="text-red-600 text-3xl cursor-pointer" onClick={() => { setVender(!vender); sendDidUserSelectedOption(true); setChecarConfirmar(false);}} />
                        <div className="text-red-600">
                            <p className="text-center">Títulos Disponibles:</p>
                            <p className="font-bold text-center">{tituDisp}</p>
                        </div>
                        <p></p>
                    </div>
            }
            <div className="mx-2">
                <p className="text-md font-bold my-2">{comprar ? "Compra" : "Venta"}</p>
                <div className="my-2">
                    <p className="my-1 text-sm">Emisora</p>
                    <p className="text-gray-400 text-sm">{issuer}</p>
                </div>
                <div className="my-2">
                    <p className="my-1 text-sm">Tipo de Orden</p>
                    <p className="text-gray-400 text-sm">{orden}</p>
                </div>
                <div className="flex my-2">
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Títulos</p>
                        <p className="text-gray-400 text-sm">{titulos}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Precio</p>
                        <p className="text-gray-400 text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(price))}</p>
                    </div>
                </div>
                {
                    id === 1 || id === 3 ?
                        limitada
                        :
                        ( id === 4 || id === 5 ?
                            activa
                            :
                            ( id === 6 ?
                                volumen
                                :
                                id === 10 ?
                                    mercadoLimitada
                                    :
                                    <></>
                            )
                        )
                }
                <p className="text-xs text-center py-3">Monto Aproximado: <span className="font-bold text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(montoAprox))}</span></p>
                <div className="my-2">
                    <button disabled={checarConfirmar} className={"w-full p-1 text-sm text-gray-100 border-1 rounded " + (checarConfirmar ? "bg-gray-350 border-gray-350 cursor-not-allowed" : "bg-red-600 border-red-600 hover:border-red-600 hover:bg-white hover:text-red-600")} onClick={comprar ? crearCompra : crearVenta}>
                        Confirmar {comprar ? "Compra" : "Venta"}
                    </button>
                </div>
                {advertenciaLegal}
            </div>
        </div>
    );

    const Vigencia = (
        <div className="w-2/5">
            <p className="text-xs">Vigencia</p>
            <input
                id="inputDay"
                type="number"
                value={vigencia}
                className= {`w-1/3 rounded mx-1 my-2 text-center border border-1 bg-white text-xs text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-blue-600 ${errorVigencia ? "ring-1 ring-red-100 text-red-100" : "border-gray-200 text-gray-400"} ` }
                onChange={sendVigencia}
            />
            <span className="text-xs font-medium text-gray-700">días</span>
            { errorVigencia && <p className="text-xs text-red-100 my-2">La vigencia debe de ser entre 1 y 30 días</p> }
        </div>
    );

    const Tiempo = (
        <div className="w-3/5 mx-2">
            <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-red-600 border rounded" onClick={() => sendTime()} defaultChecked={time} />
                <span className="text-xs px-1">Tiempo Específico</span>
            </label>
            {
                time ?
                    <div>
                        <div className="flex my-2">
                            <input
                                id="inputHour"
                                value={hr}
                                type="number"
                                className= {`w-1/3 rounded mx-1.5 text-center border border-1 bg-white text-xs text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-blue-600 ${errorHora ? "ring-1 ring-red-100 text-red-100" : "border-gray-200 text-gray-400"} ` }
                                onChange={sendHr}
                                onBlur={formatHr}
                            />
                            <p className="text-xs font-medium text-gray-700">:</p>
                            <input
                                id="inputMin"
                                value={min}
                                type="number"
                                className= {`w-1/3 rounded mx-1.5 text-center border border-1 bg-white text-xs text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-blue-600 ${errorMin ? "ring-1 ring-red-100 text-red-100" : "border-gray-200 text-gray-400"} ` }
                                onChange={sendMin}
                                onBlur={formatMin}
                            />
                        </div>
                        {
                            errorMin || errorHora ?
                                <div className="text-xs text-red-100 mx-2">
                                    <p>El horario es {horario}</p>
                                </div>
                            : ""

                        }
                    </div>
                    :
                    <></>
            }
        </div>
    );

    const Ordenes = (
        <div>
            {id === 1 || id === 3 ?
                <div>
                    <div className="flex justify-between my-3">
                        <div className="w-2/5 mr-2">
                            <p className="text-xs">Títulos</p>
                            <Digit digitData={DigitDataTitulos()} initialCount={titulos} sendCount={(titulos) => sendTitulos(titulos)} sizeFull={true} />
                        </div>
                        <div className="w-3/5">
                            <p className="text-xs">Precio {id === 3 ? "Protección" : "" }</p>
                            <Digit digitData={DigitDataPrice()} initialCount={price} sendCount={(price) => sendPrice(price)} sizeFull={true} />
                        </div>
                    </div>
                    <div className="flex">
                        {Vigencia}
                        {Tiempo}
                    </div>
                </div>
                :
                (id === 7 || id === 9 ?
                    <div>
                        <div className="flex justify-between my-3">
                            <div className="w-2/5 mr-2">
                                <p className="text-xs">Títulos</p>
                                <Digit digitData={DigitDataTitulos()} initialCount={titulos} sendCount={(titulos) => sendTitulos(titulos)} sizeFull={true} />
                            </div>
                            <div className="w-3/5 text-xs mx-1">
                                <p>Precio</p>
                                <p className="text-gray-400 my-2 text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(price))}</p>
                            </div>
                        </div>
                    </div>
                    :
                    (id === 10 ?
                        <div>
                            <div className="flex justify-between my-3">
                                <div className="w-2/5 mr-2">
                                    <p className="text-xs">Títulos</p>
                                    <Digit digitData={DigitDataTitulos()} initialCount={titulos} sendCount={(titulos) => sendTitulos(titulos)} sizeFull={true} />
                                </div>
                                <div className="w-3/5 mx-1">
                                    <p className="text-xs">Precio</p>
                                    <p className="text-gray-400 my-2 text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(price))}</p>
                                </div>
                            </div>
                            <div className="flex justify-between my-3">
                                <div className="w-1/3">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio border text-red-600" name="radio" value="1" checked={fakFok == "FAK" ? true : false } onClick={() => setFakFok("FAK")} />
                                        <p className="px-1 text-xs font-bold">FaK</p>
                                    </label>
                                    <p className="text-xxs text-gray-500">Asigna y cancela</p>
                                </div>
                                <div className="w-1/3">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio border text-red-600" name="radio" value="1" checked={fakFok == "FOK" ? true : false } onClick={() => setFakFok("FOK")} />
                                        <p className="px-1 text-xs font-bold">FoK</p>
                                    </label>
                                    <p className="text-xxs text-gray-500">Asigna todo y cancela</p>
                                </div>
                                <div className="w-1/3">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio border text-red-600" name="radio" value="1" checked={fakFok == "vigencia" ? true : false } onClick={() => setFakFok("vigencia")} />
                                        <p className="px-1 text-xs font-bold">Vigencia</p>
                                    </label>
                                </div>
                            </div>
                            {
                                fakFok == "vigencia" ? 
                                    Vigencia
                                :
                                    ""
                            }
                        </div>
                        :
                        (id === 4 || id === 5 ?
                            <div>
                                <div className="flex justify-between my-3">
                                    <div className="w-2/5 mr-2">
                                        <p className="text-xs">Títulos</p>
                                        <Digit digitData={DigitDataTitulos()} initialCount={titulos} sendCount={(titulos) => sendTitulos(titulos)} sizeFull={true} />
                                    </div>
                                    <div className="w-3/5">
                                        <p className="text-xs">Precio Protección</p>
                                        <Digit digitData={DigitDataPrice()} initialCount={price} sendCount={(price) => sendPrice(price)} sizeFull={true} />
                                    </div>
                                </div>
                                <div className="flex my-3">
                                    <div className="w-2/5 mr-2">
                                        <p className="text-xs">Dif Puja</p>
                                        <Digit digitData={DigitDataDif()} initialCount={dif} sendCount={(dif) => setDif(dif)} sizeFull={true} />
                                    </div>
                                    {Tiempo}
                                </div>
                            </div>
                            : 
                            (
                                id === 11 ?
                                    <div>
                                        <div className="my-3">
                                            <p className="text-xs">Títulos</p>
                                            <Digit digitData={DigitDataTitulos()} initialCount={titulos} sendCount={(titulos) => sendTitulos(titulos)} sizeFull={true} />
                                        </div>
                                        <div className="flex justify-between my-3">
                                            <div className="w-1/2 mr-3">
                                                <p className="text-xs">Precio de Activación</p>
                                                <Digit digitData={DigitDataPrice()} initialCount={price} sendCount={(price) => sendPrice(price)} sizeFull={true} />
                                            </div>
                                            <div className="w-1/2">
                                                <p className="text-xs">+/- 5% precio activación</p>
                                                <p className="text-gray-400 my-2 text-sm">{precioActivacion}</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {Vigencia}
                                            {Tiempo}
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="flex justify-between my-3">
                                            <div className="w-2/5 mr-2">
                                                <p className="text-xs">Títulos</p>
                                                <Digit digitData={DigitDataTitulos()} initialCount={titulos} sendCount={(titulos) => sendTitulos(titulos)} sizeFull={true} />
                                            </div>
                                            <div className="w-3/5">
                                                <p className="text-xs">Precio</p>
                                                <Digit digitData={DigitDataPrice()} initialCount={price} sendCount={(price) => sendPrice(price)} sizeFull={true} />
                                            </div>
                                        </div>
                                        <div className="w-2/5 my-3">
                                            <p className="text-xs">%</p>
                                            <Digit digitData={DigitDataPer()} initialCount={per} sendCount={(per) => setPer(per)} sizeFull={true} />
                                        </div>
                                        <div className="flex">
                                            {Vigencia}
                                            {Tiempo}
                                        </div>
                                    </div>
                            )
                        )
                    )
                )
            }
        </div>
    );

    const OrdenesMult = (
        <div>
            <div>
                <div className="flex justify-between my-3">
                    <div className="w-2/5 mr-2">
                        <p className="text-xs">Títulos</p>
                        <Digit digitData={DigitDataTitulos()} initialCount={titulos} sendCount={(titulos) => sendTitulos(titulos)} sizeFull={true} />
                    </div>
                    <div className="w-3/5">
                        <p className="text-xs">Precio {advancedId === 3 ? "Protección" : "" }</p>
                        <Digit digitData={DigitDataPrice()} initialCount={price} sendCount={(price) => sendPrice(price)} sizeFull={true} />
                    </div>
                </div>
                <div className="flex">
                    {Vigencia}
                    {Tiempo}
                </div>
            </div>
        </div>
    );

    const advancedMultiple = (
        <div>
            {modalErrorCompraVenta}
            <div className="flex justify-between">
                <MdKeyboardArrowLeft className="text-red-600 text-3xl cursor-pointer" onClick={advancedCompra ? sendAdvancedCompra : sendAdvancedVenta} />
                <p className="text-red-600 font-bold text-sm">Instrucción de {advancedCompra ? "Compra" : "Venta"} de Capitales</p>
                <p></p>
            </div>
            <div className="my-2">
                <p className="text-xs">Emisora</p>
                <SearchGraficador
                    searchData={SearchDataCatalogoEmisorasParaElGraficador}
                    selectedOption={emisoraObjSeleccionada}
                    sendOption={(emisSelecc: Emisora) => sendEmisoraSeleccionada(emisSelecc)}
                    didUserSelectedOption={didUserSelectedOption}
                    sendDidUserSelectedOption={(didUserSelect: boolean) => sendDidUserSelectedOption(didUserSelect)}
                    seEnviaPrimeraEmisora={seEnviaPrimeraEmisora}
                    sendSeEnviaPrimeraEmisora={(seEnviaPrEm: boolean) => sendSeEnviaPrimeraEmisora(seEnviaPrEm)}
                    side={true}
                    doNotSendOptionOnOnChange={true}
                />
                <div className="flex justify-between text-xxs text-gray-400">
                    <p>BMV: {bmv}</p>
                    <p>BIVA: {biva}</p>
                    <p>Títulos Disp: {tituDisp}</p>
                </div>
            </div>
            <div className="my-3 text-xs text-center">
                <p className="my-1">Orden Avanzada</p>
                <p className="text-gray-500">{advancedCompra ? "Compra" : "Venta"} Múltiples</p>
            </div>
            <div className="my-3 flex justify-between items-center">
                <div className="w-full">
                    <p className="text-xs">Tipo de Orden</p>
                    <Dropdown sendOption={(o) => sendAdvancedOrden(o)} dropdownData={ordenesAvanzadas} initialOption={advancedOrden} side={true} sendId={(i) => setAdvancedId(i)} sendBolsa={(b) => setAdvancedBolsa(b)} fondosFamilia={false} />
                </div>
            </div>
            {OrdenesMult}
            <p className="text-xs text-center py-3">Monto Aproximado: <span className="font-bold text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(montoAprox))}</span></p>
            <div className="my-2">
                {( errorAgregar || ( advancedVenta && errorVenta ) )? 
                        <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                            Agregar
                        </button>
                    :
                        <button className="w-full bg-gray-100 p-1 text-sm text-red-600 border-1 border-red-600 rounded hover:bg-red-600 hover:text-gray-100" onClick={agregarMultiple}>
                            Agregar
                        </button>
                }
            </div>
        </div>
    );

    const stopLossMensaje = (
        <div className="flex my-2">
            <p className="w-1/3 text-xxs mx-1">Precio Protección</p>
            <p className="w-2/3 text-xs text-gray-500">
                {
                    tipoSL == "slprecio" ?
                        precioShow + " (0.5% aproximado por debajo del precio SL programado"
                    : 
                        "Se calculará con el criterio de 0.5% debajo del precio de referencia obtenido al momento de ejecutar la instrucción."
                }
            </p>
        </div>
    );

    const confirmarStop = () => {
        setClickConfirmarSL(true);

        let params = paramsDispatch;
        let message = "stoploss/emis/alta?cuenta=" + ctaCtoDispatch;
        let data = [
            {
                "emisora": emisora,
                "serie": serie,
                "tipo": tipoSL,
                "titulos": parseInt(titulosSL),
                "ptje": parseFloat(varSL),
                "precioProg": parseFloat(priceSL),
            }
        ]

        let res = { message, params, data }
        dispatch(postStopLossRequest(res));
    };

    const stoploss = (
        <div>
            <div className="flex justify-between">
                <MdKeyboardArrowLeft className="text-red-600 text-3xl cursor-pointer" onClick={sendAdvanced} />
                <div className="text-red-600 font-bold">
                    <p className="tex-sm">Instrucción de Stop Loss (SL)</p>
                    <p className="text-xs text-center">* Exclusivo para BMV</p>
                </div>
                <p></p>
            </div>
            <p className="text-xs text-center my-2">Cuenta: <span className="font-bold">{ctaCtoDispatch}</span></p>
            <div className="my-2">
                <p className="text-xs">Emisora</p>
                <SearchGraficador
                    searchData={SearchDataCatalogoEmisorasParaElGraficador}
                    selectedOption={emisoraObjSeleccionada}
                    sendOption={(emisSelecc: Emisora) => sendEmisoraSeleccionada(emisSelecc)}
                    didUserSelectedOption={didUserSelectedOption}
                    sendDidUserSelectedOption={(didUserSelect: boolean) => sendDidUserSelectedOption(didUserSelect)}
                    seEnviaPrimeraEmisora={seEnviaPrimeraEmisora}
                    sendSeEnviaPrimeraEmisora={(seEnviaPrEm: boolean) => sendSeEnviaPrimeraEmisora(seEnviaPrEm)}
                    side={true}
                    doNotSendOptionOnOnChange={true}
                />
            </div>
            {
                stopLossData.loading ? <Loading /> :
                <>
                    <div className="flex justify-between text-xxs text-gray-400">
                        <p>Ult Precio: ${priceSL}</p>
                        <p>Títulos Disp: {titulosSL}</p>
                    </div>
                    <div className="flex justify-between my-2">
                        <p className="text-xs my-1">Tipo SL</p>
                        <div className="flex flex-col">
                            <div className="flex justify-between my-1">
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio border text-red-600" name="radio" value="1" checked={tipoSL == "slprecio" ? true : false } onClick={() => setTipoSL("slprecio")} />
                                    <p className="px-1 text-xs">Precio</p>
                                </label>
                                <PopOver id="precio" content="Se ejecuta cuando el precio llega a ser igual o menor al precio SL pactado, generando una instrucción de venta a Mercado con Protección." />
                            </div>
                            <div className="flex justify-between my-1">
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio border text-red-600" name="radio" value="1" checked={tipoSL == "slvarinicio" ? true : false } onClick={() => setTipoSL("slvarinicio")} />
                                    <p className="px-1 text-xs">Variación respecto a precio apertura</p>
                                </label>
                                <PopOver id="precioApertura" content="Se ejecuta en el momento en que la variación porcentual respecto al * precio de referencia llega a ser igual o menor a la variación porcentual SL pactada, generando una instrucción de venta a Mercado con Protección. * El precio de referencia será el precio actual al momento de ingresar la instrucción. A partir del siguiente día el precio de referencia será el precio de apertura." />
                            </div>
                            <div className="flex justify-between my-1">
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio border text-red-600" name="radio" value="1" checked={tipoSL == "slvarmaximo" ? true : false } onClick={() => setTipoSL("slvarmaximo")} />
                                    <p className="px-1 text-xs">Variación respecto a precio máximo</p>
                                </label>
                                <PopOver id="precioMax" content="Se ejecuta en el momento en que la variación porcentual respecto al ** precio de referencia llega a ser igual o menor a la cariación porcentual SL pactada, generando una instruccion de venta a Mercado con Protección. **El precio de referencia será el precio actual al momento de ingresar la instrucción. A partir de ese momento la referencia se irá actualizando solo si el precio es mayor (precio máximo) que la referencia actual." />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div>
                            <p className="text-xs">Títulos</p>
                            <Digit digitData={DigitDataTitulos()} initialCount={titulosSL} sendCount={(titulos) => {setTitulosSL(titulos); setPrecioShow(parseFloat(titulos) * .995);}} />
                        </div>
                        {
                            tipoSL == "slprecio" ?
                                <div>
                                    <p className="text-xs">Precio SL</p>
                                    <Digit digitData={DigitDataPrice()} initialCount={priceSL} sendCount={(price) => sendPrice(price)} />
                                </div>
                            : tipoSL == "slvarinicio" ? 
                                <div>
                                    <p className="text-xs">Variación SL</p>
                                    <Digit digitData={DigitDataDif()} initialCount={varSL} sendCount={(a) => setVarSL(a)} />
                                </div>
                            :
                                <div>
                                    <p className="text-xs">Variación SL</p>
                                    <Digit digitData={DigitDataDif()} initialCount={varSL} sendCount={(a) => setVarSL(a)} />
                                </div>
                        }
                    </div>
                    <p className="text-xs text-center border-b-2 border-gray-300 py-3">Vigencia: <span className="font-bold">*indefinida</span></p>
                    <p className="font-bold text-xs my-2">Datos de instrucción de venta si llegara a ejecutarse el SL</p>
                    <div className="flex my-2">
                        <p className="w-1/3 text-xxs mx-1">Tipo de orden</p>
                        <p className="w-2/3 text-xs text-gray-500">Mercado con Protección</p>
                    </div>
                    {stopLossMensaje}
                    <div className="flex my-2">
                        <p className="w-1/3 text-xxs mx-1">Vigencia</p>
                        <p className="w-2/3 text-xs text-gray-500">1 día</p>
                    </div>
                    <div className="flex my-2">
                        <p className="w-1/3 text-xxs mx-1">Bolsa</p>
                        <p className="w-2/3 text-xs text-gray-500">BMV</p>
                    </div>
                    <div className="my-2">
                        <button disabled={clickConfirmarSL} className={"w-full p-1 text-sm text-gray-100 border-1 rounded " + (clickConfirmarSL ? "bg-gray-350 border-gray-350 cursor-not-allowed" : "bg-red-600 border-red-600 hover:border-red-600 hover:bg-white hover:text-red-600")} onClick={() => confirmarStop()}>
                            Confirmar
                        </button>
                    </div>
                </>
            }
        </div>
    );

    return (
        <>
            {
                comprar || vender ?
                compraCapitales
                :
                (
                    advancedCompra || advancedVenta ?
                        advancedMultiple
                        :
                        (
                            advanced ?
                                stoploss
                                :
                                <div>
                                    {modalValidarStopLoss}
                                    {modalErrorStopLoss}
                                    {modalAdvertenciaLegal}
                                    {modalErrorCompraVenta}
                                    <div className="flex justify-center items-center">
                                        <ModalPoderCompra poderCompraVal={poderCompraPC} show={checkPoderCompra} />
                                    </div>
                                    <div className="my-2">
                                        <p className="text-xs">Emisora</p>
                                        <SearchGraficador
                                            searchData={SearchDataCatalogoEmisorasParaElGraficador}
                                            selectedOption={emisoraObjSeleccionada}
                                            sendOption={(emisSelecc: Emisora) => sendEmisoraSeleccionada(emisSelecc)}
                                            didUserSelectedOption={didUserSelectedOption}
                                            sendDidUserSelectedOption={(didUserSelect: boolean) => sendDidUserSelectedOption(didUserSelect)}
                                            seEnviaPrimeraEmisora={seEnviaPrimeraEmisora}
                                            sendSeEnviaPrimeraEmisora={(seEnviaPrEm: boolean) => sendSeEnviaPrimeraEmisora(seEnviaPrEm)}
                                            side={true}
                                            doNotSendOptionOnOnChange={true}
                                        />
                                    </div>
                                    {
                                        buyTradeData.loading ? <Loading /> :
                                            <>
                                                <div className="flex justify-between text-xxs text-gray-400">
                                                    <p>BMV: {bmv}</p>
                                                    <p>BIVA: {biva}</p>
                                                    <p>Títulos Disp: {tituDisp}</p>
                                                </div>
                                                <div className="my-3 flex justify-between items-center">
                                                    <div className="w-full">
                                                        <p className="text-xs">Tipo de Orden</p>
                                                        <Dropdown sendOption={(orden) => sendOrden(orden)} dropdownData={ordenesPosibles} initialOption={orden} side={true} sendId={(id) => setId(id)} sendBolsa={(b) => setBolsa(b)} fondosFamilia={false} />
                                                    </div>
                                                </div>
                                                {Ordenes}
                                                <p className="text-red-100 text-xs text-bold">{parse(convertToAcentos(errorOperaciones))}</p>
                                                <p className="text-xs text-center py-3">Monto Aproximado: <span className="font-bold text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(montoAprox))}</span></p>
                                                <div>
                                                {
                                                    errorCompraVenta ?
                                                        <div className="my-2">
                                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                                Comprar
                                                            </button>
                                                        </div>
                                                    :
                                                        <div className="my-2">
                                                            <button className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => setComprar(!comprar)}>
                                                                Comprar
                                                            </button>
                                                        </div>
                                                }
                                                {
                                                    errorCompraVenta || errorVenta ?
                                                        <div className="my-2">
                                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                                Vender
                                                            </button>
                                                        </div>
                                                    :
                                                        <div className="my-2">
                                                            <button className="w-full bg-gray-100 p-1 text-sm text-red-600 border-1 border-red-600 rounded hover:bg-red-600 hover:text-gray-100" onClick={() => setVender(!vender)}>
                                                                Vender
                                                            </button>
                                                        </div>
                                                }
                                                </div>
                                                {advertenciaLegal}
                                            </>
                                    }
                                </div>
                        )
                )
            }
            {
                (modalFolioTarjetaOpen && paramsDispatch.length > 0) && <ModalFolioTarjetaForm 
                    modalOpen={modalFolioTarjetaOpen}
                    setModalOpen={(isOpen: boolean) => setModalFolioTarjetaOpen(isOpen)}
                    params={paramsDispatch}
                    sendModalClose={(m: boolean) => modalCloseSinFolio(m)}
                />
            }
        </>
    );
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        multipleOrders: () => dispatch(multipleOrders(dispatch)),
        multipleBuyAdd: () => dispatch(multipleBuyAdd(dispatch)),
        multipleBuyDeleteAll: () => dispatch(multipleBuyDeleteAll(dispatch)),
        getBuyTradeData: () => dispatch(getBuyTradeDataRequest(dispatch)),
        postSellIssuerRequest: () => dispatch(postSellIssuerRequest(dispatch)),
        compra: () => dispatch(compra(dispatch)),
        venta: () => dispatch(venta(dispatch)),
        getStoplossRequest: () => dispatch(getStoplossRequest(dispatch)),
        getCatalogoEmisorasRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
        getConsultaSaldosRequest: () => dispatch(getConsultaSaldosRequest(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        multipleOrder: store.multipleOrders.multipleOrders,
        multipleBuys: store.multipleBuy.multipleBuy,
        buyTradeData: store.buyTradeData,
        buyIssuer: store.buyIssuerReducer,
        sellIssuer: store.sellIssuerReducer,
        stopLossData: store.stopLossReducer,
        compraStore: store.compra.compra,
        ventaStore: store.venta.venta,
        postStoplossData: store.postStopLoss,
        catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
        postPosicionFolio: store.posicionFolio,
        consultaSaldosRespuesta: store.consultaSaldosRespuesta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationsCapital);