import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import CircularProgress from "@material-ui/core/CircularProgress";

import { RootState } from '../reducers/rootReducer';

import ModalFolioTarjetaForm from "./ModalFolioTarjetaForm";
import ModalPoderCompra from "./ModalPoderCompra";
import { Search } from "./Search";
import { Digit, DigitData } from "./Digit";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MdClose, MdKeyboardArrowLeft } from "react-icons/md";
import { IFondoData, IFondosFamiliasData } from "../types/FondosFamiliasTypes";
import { getFondosCpaEmisRequest, getFondosCpaEmisReset } from "../actions/fondosCpaEmisAction";
import { FondosCpaEmisState } from "../types/FondosCpaEmisTypes";
import { FondosCpaGetState } from "../types/FondosCpaGetTypes";
import { postPosicionFolioRequest } from '../actions/posicionFolioAction';
import { getFondosCpaGetRequest, getFondosCpaGetReset } from "../actions/fondosCpaGetAction";
import { getFondosVtaGetRequest, getFondosVtaGetReset } from "../actions/fondosVtaGetAction";
import { FondosVtaGetState } from "../types/FondosVtaGetTypes";
import { getFondosCpaPutRequest, getFondosCpaPutReset } from "../actions/fondosCpaPutAction";
import { getFondosVtaPutRequest, getFondosVtaPutReset } from "../actions/fondosVtaPutAction";
import { FondosCpaPutState } from "../types/FondosCpaPutTypes";
import { FondosVtaPutState } from "../types/FondosVtaPutTypes";
import Loading from "../components/Loading";
import { FondosMonitorState, ITdsFondos } from "../types/FondosMonitorType";
import { getFondosMonitorRequest } from "../actions/fondosMonitorAction";
import { DataSearchOpFondos, SearchOperationsFondos } from "./SearchOperationsFondos";
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";
import convertToAcentos from "../utils/convertToAcentos";
import { GetConsultaSaldosState } from "../types/GetConsultaSaldosType";
import { getConsultaSaldosRequest } from "../actions/getConsultaSaldosAction";
import { postLoginObjectLogout } from '../actions/loginObjectAction';

interface propsFromState {
    loginObject?: LoginObjectState;
    fondosMonitorRespuesta: FondosMonitorState;
    fondosCpaEmisRespuesta: FondosCpaEmisState;
    fondosCpaGetRespuesta: FondosCpaGetState;
    fondosVtaGetRespuesta: FondosVtaGetState;
    fondosCpaPutRespuesta: FondosCpaPutState,
    fondosVtaPutRespuesta: FondosVtaPutState,
    consultaSaldosRespuesta?: GetConsultaSaldosState;
    issuerFondoSeleccionado?: string;
    sendOrdenRecibida?: (folio: string, tipoOrden: string, operacion: string, respuestaApi: string) => void;
}

type AllProps = propsFromState;

const OperationsFondos: React.FC<AllProps> = ({ loginObject, consultaSaldosRespuesta, issuerFondoSeleccionado, fondosMonitorRespuesta, fondosCpaEmisRespuesta, fondosCpaGetRespuesta, fondosVtaGetRespuesta, fondosCpaPutRespuesta, fondosVtaPutRespuesta, sendOrdenRecibida }) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    
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

    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO !== 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                        const idLO = /*cuentaSesionLO === 266563 ? "10200" :*/ loginObject.response.dsLogin.tdsLogin[0].id.toString();
                        const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                        const canal = "999";
                        const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                 
                        //SENDs
                        sendCtaCtoDispatch(cuentaLO);
                        sendParamsDispatch([ canal, cuentaSesionLO.toString(), tokenLO, idLO ]); //idLO.toString() ]);
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en operationsfondos, lo mandamos al login");
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
            console.log("usuario no loggeado en operationsfondos, lo mandamos al login");
            history.push("/");
        }

        return () => {
            //console.log("reset getFondosCpaEmisReset unmount");
            dispatch(getFondosCpaEmisReset({hacerResetAInitialState: true}));
        };
    }, []);

    //HOOKS - que se usan en el componente
    const [listaFondosParaBuscador, setListaFondosParaBuscador] = useState<ITdsFondos[]>([]);
    const [fondoObjSeleccionado, setFondoObjSeleccionado] = useState<ITdsFondos | undefined>(undefined);

    const [operaFlujos, setOperaFlujos] = useState(false);
    const [poderCompraValor, setPoderCompraValor] = useState("-");
    const [price, setPrice] = useState("1");
    const [monto, setMonto] = useState("1");
    const [issuer, setIssuer] = useState("");
    const [emisoraFondo, setEmisoraFondo] = useState("");
    const [serieFondo, setSerieFondo] = useState("");
    const [comprarFondos, setComprarFondos] = useState(false);
    const [ventaFondos, setVentaFondos] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);
    const [date, setDate] = useState("01/01/2021");
    const [position, setPosition] = useState("Posición");
    const [horarioOper, setHorarioOper] = useState("");
    const [esRentaFija, setEsRentaFija] = useState(true);
    const [advertenciaLegalText, setAdvertenciaLegalText] = useState("Elije una emisora para ver la advertencia legal.");
    const [totalTradeOperacion, setTotalTradeOperacion] = useState("0.00");
    const [titulosOperacion, setTitulosOperacion] = useState("");
    const [folioOperacion, setFolioOperacion] = useState("");
    const [montoMaximoOperacion, setMontoMaximoOperacion] = useState(0);//para la compra
    const [montoMaximoVenta, setMontoMaximoVenta] = useState(0);//para la venta
    const [error, setError] = useState("");
    const [errorNumCpaEmis, setErrorNumCpaEmis] = useState(0);
    const [res, setRes] = useState("");
    const [ordenRecibida, setOrdenRecibida] = useState(false);
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modalAL, setModalAL] = useState(false);
    const toggleAL = () => setModalAL(!modalAL);

    const [modalFolioTarjetaOpen, setModalFolioTarjetaOpen] = useState(false);

    //cada vez que cambie paramsDispatch o ctaCtoDispatch, se activa este useEffect
    useEffect(() => {
        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
            sendErrorDispatch("");

            /*let message = "folio?posicion=5&codigo=0";
            let a = { message, params: paramsDispatch }
            dispatch(postPosicionFolioRequest(a));*/

            //en lugar de hacer dispatch de fd/familias, hacemos dispatch de fd/monitor
            let message = "fd/monitor?cuenta=" + ctaCtoDispatch + "&idFamilia=-1"; // fd/monitor?cuenta=ctacto&idFamilia=-1
            dispatch(getFondosMonitorRequest({ message, params: paramsDispatch }));

            if(consultaSaldosRespuesta?.message === ""){
                dispatch(getConsultaSaldosRequest({ message:"/consulta/saldos?cuenta=" + ctaCtoDispatch, params: paramsDispatch }));
            }

        }
        else{
            sendErrorDispatch("No hay información de fondos por el momento, por favor inténtalo más tarde.");
        }
    }, [paramsDispatch, ctaCtoDispatch]);

    useEffect(() => {
        if(consultaSaldosRespuesta !== undefined){
            if(consultaSaldosRespuesta.message.length > 0 && consultaSaldosRespuesta.loading === false){
                if(consultaSaldosRespuesta.consultaSaldosRespuesta !== undefined){
                    if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos !== undefined){
                        if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa !== undefined){
                            if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa.length > 0){
                                if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa[0] !== undefined){
                                    if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa[0].saldo !== undefined){
                                        sendPoderCompraValor(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa[0].saldo.toString());
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [consultaSaldosRespuesta?.message, consultaSaldosRespuesta?.loading]);

    useEffect(() => {
        if(fondosMonitorRespuesta !== undefined){
            if(fondosMonitorRespuesta.fondosMonitorRespuesta !== undefined){
                if(fondosMonitorRespuesta.fondosMonitorRespuesta.dsRespuesta !== undefined){
                    if(fondosMonitorRespuesta.fondosMonitorRespuesta.dsRespuesta.tdsFondos !== undefined){
                        if(fondosMonitorRespuesta.fondosMonitorRespuesta.dsRespuesta.tdsFondos.length > 0){
                            const listaFdMon = fondosMonitorRespuesta.fondosMonitorRespuesta.dsRespuesta.tdsFondos;
                            const uniqFdMonUI = listaFdMon.filter(function(item: ITdsFondos, position: number){
                                let index = listaFdMon.map((e: ITdsFondos) => e.Descripcion).indexOf(item.Descripcion);
                                return index === position;
                            });
                            sendListaFondosParaBuscador(uniqFdMonUI);
                            sendFondoObjSeleccionado(undefined, false);
                        }
                    }
                }
            }
        }
    }, [fondosMonitorRespuesta.message, fondosMonitorRespuesta.loading]);

    //cada vez que cambia fondoObjSeleccionado, cambiamos el issuer con sendIssuer()
    useEffect(() => {
        if(fondoObjSeleccionado !== undefined){
            const filterListaMon = listaFondosParaBuscador.filter((fondo: ITdsFondos) => {
                return fondo.Descripcion.trim().includes(fondoObjSeleccionado.Descripcion.trim());
            });
            if(filterListaMon.length > 0){
                sendIssuer(fondoObjSeleccionado.Descripcion.trim());
            }
            else{
                sendError("No puedes operar este fondo por el momento.");
                //borramos todos los datos de fondos cpa emis
                //console.log("reset getFondosCpaEmisReset fondoObjSelec");
                dispatch(getFondosCpaEmisReset({hacerResetAInitialState: true}));
            }
            //sendIssuer(fondoObjSeleccionado.Descripcion.trim());
        }
    }, [fondoObjSeleccionado]);

    //este useEffect se activa cuando el usuario clickea en el nombre de un fondo en la pantalla de fondos
    useEffect(() => {
        if(issuerFondoSeleccionado !== undefined){
            if(issuerFondoSeleccionado.length > 0){
                const filterListaMon = listaFondosParaBuscador.filter((fondo: ITdsFondos) => {
                    return fondo.Descripcion.trim().includes(issuerFondoSeleccionado);
                });
                if(filterListaMon.length > 0){
                    sendIssuer(issuerFondoSeleccionado);
                }
                else{
                    sendError("No puedes operar este fondo por el momento.");
                    //borramos todos los datos de fondos cpa emis
                    //console.log("reset getFondosCpaEmisReset IssuerFondoSelec");
                    dispatch(getFondosCpaEmisReset({hacerResetAInitialState: true}));
                }
            }
        }
    }, [issuerFondoSeleccionado]);
    
    //este useEffect se activa cuando cambia el issuer, y cuando cambia la ctaCtoDispatch y los paramsDispatch
    useEffect(() => {
        if (issuer !== "") {
            //console.log("use effect issuer");
            // //console.log(issuer);

            if(!issuer.includes(".")){
                //no tiene punto, entonces no mandamos llamar el dispatch
                return;
            }

            let splitIssuer = issuer.split(".");
            let emisoraFondoV = splitIssuer[0];
            let serieFondoV = splitIssuer[1];
            let cuenta = ctaCtoDispatch;
            let message = "tradefd/cpaemis?cuenta=" + cuenta + "&emisora=" + encodeURIComponent(emisoraFondoV) + "&serie=" + encodeURIComponent(serieFondoV);
            let params = paramsDispatch; //[ "6FVeF6F5G76BbEK89Oi1X3LJo8PdUifp7AS6DgrK", "1", "266563", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab",  "10200" ];
                   
            //let message = "tradefd/cpaemis?cuenta=" + cuentaLO.toString() + "&emisora=" + encodeURIComponent(emisoraFondoV) + "&serie=" + encodeURIComponent(serieFondoV);
            //let params = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO ];                
            if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
                if(fondosCpaEmisRespuesta !== undefined){
                    if(modalFolioTarjetaOpen === false && confirmacion === true && (fondosVtaPutRespuesta.message.length > 0 || fondosCpaPutRespuesta.message.length > 0)){
                        //volvemos a mandar la confirmacion
                        console.log("volver a hacer llamada a confirmacion de operacion fd PUT despues de cerrar el modal del codigo de tarjeta");
                        sendConfirmacionOperacion();
                    }
                    else if(modalFolioTarjetaOpen === false && fondosCpaGetRespuesta.message.length > 0){
                        if(comprarFondos === true){
                            console.log("volver a hacer llamada a comprar fd GET despues de cerrar el modal del codigo de tarjeta");
                            sendComprarFondos();
                        }
                    }
                    else if(modalFolioTarjetaOpen === false && fondosVtaGetRespuesta.message.length > 0 ){
                        if(comprarFondos === false){
                            console.log("volver a hacer llamada a vender fd GET despues de cerrar el modal del codigo de tarjeta");
                            sendVentaFondos();
                        }
                    }
                    else if(errorNumCpaEmis === 50 && modalFolioTarjetaOpen === false){
                        //hacemos dispatch
                        dispatch(getFondosCpaEmisRequest({message, params}));
                    }
                    else if(message === fondosCpaEmisRespuesta.message){
                        //nada cambia
                        //console.log("nada cambia");
                    }
                    else{
                        //hacemos dispatch
                        dispatch(getFondosCpaEmisRequest({message, params}));
                    }
                }
                sendErrorDispatch("");
            }
            else{
                sendErrorDispatch("No se pudo encontrar información del fondo seleccionado, por favor inténtalo más tarde.");
            }
        }
        else{
            if(modalFolioTarjetaOpen === false && confirmacion === true && (fondosVtaPutRespuesta.message.length > 0 || fondosCpaPutRespuesta.message.length > 0)){
                //volvemos a mandar la confirmacion
                console.log("volver a hacer llamada de confirmacion de operacion fd PUT despues de cerrar el modal del codigo de tarjeta");
                sendConfirmacionOperacion();
            }
            else if(modalFolioTarjetaOpen === false && fondosCpaGetRespuesta.message.length > 0){
                if(comprarFondos === true){
                    console.log("volver a hacer llamada a comprar fd GET despues de cerrar el modal del codigo de tarjeta");
                    sendComprarFondos();
                }
            }
            else if(modalFolioTarjetaOpen === false && fondosVtaGetRespuesta.message.length > 0 ){
                if(comprarFondos === false){
                    console.log("volver a hacer llamada a vender fd GET despues de cerrar el modal del codigo de tarjeta");
                    sendVentaFondos();
                }
            }
        }
    }, [issuer, paramsDispatch, ctaCtoDispatch, modalFolioTarjetaOpen]);

    useEffect(() => {
        //console.log("ANTES CPA EMIS useEffect");
        //console.log(fondosCpaEmisRespuesta);
        if(fondosCpaEmisRespuesta !== undefined){
            //console.log("cpa emis fondos");
            // //console.log(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta);
            if(fondosCpaEmisRespuesta.message.length > 0 && fondosCpaEmisRespuesta.loading === false && fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.ierror !== 998){
                // tal vez hay que pedir el folio, si ierror === 50
                if(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.ierror === 50){
                    setModalFolioTarjetaOpen(true);
                }

                sendErrorNumCpaEmis(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.ierror);
                sendError(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.cerror);
                sendDate("-");
                sendPosition("-");
                sendPrice("-");
                sendMonto("0.00");
                sendHorarioOper("");
                sendAdvertenciaLegalText("-");
                sendPoderCompraValor("-");
                sendEsRentaFija(true);
                sendMontoMaximoOperacion(0);
                sendMontoMaximoVenta(0);
            }
            else if(fondosCpaEmisRespuesta.message.length > 0 && fondosCpaEmisRespuesta.loading === false && fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras.length === 0){
                //la emisora no existe en el catalogo
                //guardamos el error y reiniciamos valores
                sendError(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.cerror);
                sendErrorNumCpaEmis(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.ierror);
                sendDate("-");
                sendPosition("-");
                sendPrice("-");
                sendMonto("0.00");
                sendHorarioOper("");
                sendAdvertenciaLegalText("-");
                sendPoderCompraValor("-");
                sendEsRentaFija(true);
                sendMontoMaximoOperacion(0);
                sendMontoMaximoVenta(0);
            }
            else{
                if(fondosCpaEmisRespuesta.message.length > 0 && fondosCpaEmisRespuesta.loading === false && fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].Emisora.length > 0 && fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].Emisora === emisoraFondo){
                    //el api trajo los datos correctamente
                    sendError("");//borramos el error
                    sendErrorNumCpaEmis(0);
                    sendDate(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].FechaLIQ);
                    sendPosition(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].Posicion.toString());
                    sendMonto(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].Precio.toFixed(2).toString());
                    sendPrice(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].Precio.toFixed(2).toString());
                    sendHorarioOper(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsConfig[0].horariooperacion);
                    sendAdvertenciaLegalText(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.cerror);
                    
                    //guardar valor de operaFlujos que esta en tdsConfig
                    if(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsConfig.length > 0){
                        sendOperaFlujos(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsConfig[0].operaFlujos);
                    }
                    
                    /*
                    si es fondo Renta Variable se coloca el poder de compra, 
                    si es fondo de deuda se coloca el Saldo Disponible
                    PENDIENTE: resolver esta duda con Mario antes de hacer push a la rama
                    */
                    /* ESTA VALIDACION ESTABA INCORRECTA
                    if(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].RF === true){
                        //es fondo de renta fija
                        if(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsConfig.length > 0){
                            sendPoderCompraValor(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsConfig[0].sal do.toString());//MontoMaximo es el poder de compra real
                        }
                        else{
                            //sendPoderCompraValor("-");
                        }
                    }
                    else{
                        //es fondo de renta variable
                        sendPoderCompraValor(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].MontoMaximo.toString());//MontoMaximo es el poder de compra real
                    }*/

                    sendPoderCompraValor(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].MontoMaximo.toString());//MontoMaximo es el poder de compra REAL

                    const fdDeRentaFija: boolean = fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].TipoRent.trim().toUpperCase().includes("TRUE");
                    sendEsRentaFija(fdDeRentaFija);

                    sendMontoMaximoOperacion(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].MontoMaximo);
                    sendMontoMaximoVenta(fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].MontoMaximoV);
                }
                else{
                    //el estado de fondosCpaEmisRespueta esta en valores iniciales
                    //guardamos el error y reiniciamos valores
                    if(emisoraFondo.length > 0){
                        //ya eligio una emisora pero no respondio correctamente el api
                        sendError("");
                    }
                    /*else{
                        //no ha elegido una emisora
                        //sendError("Ingresa un fondo en el buscador.");
                        dispatch(getFondosCpaEmisReset({hacerResetAInitialState: true}));
                    }
                    sendErrorNumCpaEmis(0);

                    sendDate("-");
                    sendPosition("-");
                    sendPrice("-");
                    //sendMonto("0.00");
                    sendHorarioOper("");
                    sendAdvertenciaLegalText("-");
                    sendPoderCompraValor("-");
                    sendEsRentaFija(true);
                    sendMontoMaximoOperacion(0);
                    sendMontoMaximoVenta(0);*/
                }
            }
        }
        else{
            sendError("No hay servicio disponible por el momento, intenta más tarde.");
        }
    //}, [fondosCpaEmisRespuesta.fondosCpaEmisRespuesta.dsRespuesta.tdsEmisoras[0].Descripcion, issuer]);
    }, [fondosCpaEmisRespuesta.message, fondosCpaEmisRespuesta.loading]);

    useEffect(() => {
        console.log("ANTES CPA GET useEffect");
        if(fondosCpaGetRespuesta !== undefined){
            //console.log("cpa get fondos");
            //console.log(fondosCpaGetRespuesta.fondosCpaGetRespuesta);
            if(fondosCpaGetRespuesta.message.length > 0 && fondosCpaGetRespuesta.loading === false && fondosCpaGetRespuesta.fondosCpaGetRespuesta.dsRespuesta.tdsTradeData.length === 0){
                //la emisora no existe en el catalogo
                //guardamos el error y reiniciamos valores
                if(fondosCpaGetRespuesta.fondosCpaGetRespuesta.ierror === 50){
                    setModalFolioTarjetaOpen(true);
                    sendError(fondosCpaGetRespuesta.fondosCpaGetRespuesta.cerror);
                }
                else{
                    sendError(fondosCpaGetRespuesta.fondosCpaGetRespuesta.cerror);
                    sendTitulosOperacion("-");
                    sendTotalTradeOperacion("0.00");
                }
            }
            else{
                if(fondosCpaGetRespuesta.message.length > 0 && fondosCpaGetRespuesta.loading === false && fondosCpaGetRespuesta.fondosCpaGetRespuesta.dsRespuesta.tdsTradeData[0].Emisora.length > 0){
                    sendError("");//borramos el error
                    sendTitulosOperacion(fondosCpaGetRespuesta.fondosCpaGetRespuesta.dsRespuesta.tdsTradeData[0].Titulos.toString());
                    sendTotalTradeOperacion(fondosCpaGetRespuesta.fondosCpaGetRespuesta.dsRespuesta.tdsTradeData[0].TotalTrade.toFixed(2).toString());    
                }
            }
        }
    }, [fondosCpaGetRespuesta.message, fondosCpaGetRespuesta.loading]);

    useEffect(() => {
        //console.log("ANTES CPA PUT useEffect");
        if(fondosCpaPutRespuesta !== undefined){
            //console.log("cpa put fondos");
            //console.log(fondosCpaPutRespuesta.fondosCpaPutRespuesta);
            if(fondosCpaPutRespuesta.message.length > 0 && fondosCpaPutRespuesta.loading === false && fondosCpaPutRespuesta.fondosCpaPutRespuesta.deRespuesta.tdsTradeData.length === 0){
                //la emisora no existe en el catalogo
                //guardamos el error y reiniciamos valores
                
                if(fondosCpaPutRespuesta.fondosCpaPutRespuesta.ierror === 50){
                    setModalFolioTarjetaOpen(true);
                }

                sendFolioOperacion("-");
                sendRes(fondosCpaPutRespuesta.fondosCpaPutRespuesta.cerror);
            }
            else{
                if(fondosCpaPutRespuesta.message.length > 0 && fondosCpaPutRespuesta.loading === false && fondosCpaPutRespuesta.fondosCpaPutRespuesta.deRespuesta.tdsTradeData[0].Emisora.length > 0){
                    sendError("");//borramos el error 
                    sendFolioOperacion(fondosCpaPutRespuesta.fondosCpaPutRespuesta.deRespuesta.tdsTradeData[0].Folio.toString());    
                    sendRes(fondosCpaPutRespuesta.fondosCpaPutRespuesta.cerror);
                    setOrdenRecibida(true);
                }
            }
        }
    }, [fondosCpaPutRespuesta.message, fondosCpaPutRespuesta.loading]);

    useEffect(() => {
        console.log("ANTES VTA GET useEffect");
        if(fondosVtaGetRespuesta !== undefined){
            //console.log("vta get fondos");
            //console.log(fondosVtaGetRespuesta.fondosVtaGetRespuesta);
            if(fondosVtaGetRespuesta.message.length > 0 && fondosVtaGetRespuesta.loading === false && fondosVtaGetRespuesta.fondosVtaGetRespuesta.dsRespuesta.tdsTradeData.length === 0){
                //la emisora no existe en el catalogo
                //guardamos el error y reiniciamos valores
                if(fondosVtaGetRespuesta.fondosVtaGetRespuesta.ierror === 50){
                    setModalFolioTarjetaOpen(true);
                    sendError(fondosVtaGetRespuesta.fondosVtaGetRespuesta.cerror);
                }
                else{
                    sendError(fondosVtaGetRespuesta.fondosVtaGetRespuesta.cerror);
                    sendTitulosOperacion("-");
                    sendTotalTradeOperacion("0.00");
                }
            }
            else{
                if(fondosVtaGetRespuesta.message.length > 0 && fondosVtaGetRespuesta.loading === false && fondosVtaGetRespuesta.fondosVtaGetRespuesta.dsRespuesta.tdsTradeData[0].Emisora.length > 0){
                    sendError("");//borramos el error
                    sendTitulosOperacion(fondosVtaGetRespuesta.fondosVtaGetRespuesta.dsRespuesta.tdsTradeData[0].Titulos.toString());
                    sendTotalTradeOperacion(fondosVtaGetRespuesta.fondosVtaGetRespuesta.dsRespuesta.tdsTradeData[0].TotalTrade.toFixed(2).toString());    
                }
            }
        }
    }, [fondosVtaGetRespuesta.message, fondosVtaGetRespuesta.loading]);

    useEffect(() => {
        console.log("ANTES VTA PUT useEffect");
        if(fondosVtaPutRespuesta !== undefined){
            //console.log("vta put fondos");
            //console.log(fondosVtaPutRespuesta.fondosVtaPutRespuesta);
            if(fondosVtaPutRespuesta.message.length > 0 && fondosVtaPutRespuesta.loading === false && fondosVtaPutRespuesta.fondosVtaPutRespuesta.dsRespuesta.tdsTradeData.length === 0){
                //la emisora no existe en el catalogo
                //guardamos el error y reiniciamos valores

                if(fondosVtaPutRespuesta.fondosVtaPutRespuesta.ierror === 50){
                    setModalFolioTarjetaOpen(true);
                }

                sendRes(fondosVtaPutRespuesta.fondosVtaPutRespuesta.cerror);
                sendFolioOperacion("-");
            }
            else{
                if(fondosVtaPutRespuesta.message.length > 0 && fondosVtaPutRespuesta.loading === false && fondosVtaPutRespuesta.fondosVtaPutRespuesta.dsRespuesta.tdsTradeData[0].Emisora.length > 0){
                    sendError("");//borramos el error
                    sendFolioOperacion(fondosVtaPutRespuesta.fondosVtaPutRespuesta.dsRespuesta.tdsTradeData[0].Folio.toString());
                    sendRes(fondosVtaPutRespuesta.fondosVtaPutRespuesta.cerror);    
                    setOrdenRecibida(true);
                }
            }
        }
    }, [fondosVtaPutRespuesta.message, fondosVtaPutRespuesta.loading]);


    useEffect(() => {
        if(ordenRecibida === true){
            if(comprarFondos === true){
                //la orden fue de compra
                sendOrdenRecibida && sendOrdenRecibida(folioOperacion, "Compra", "Fondos", res);
            }
            else{
                //la orden fue de venta
                sendOrdenRecibida && sendOrdenRecibida(folioOperacion, "Venta", "Fondos", res);
            }
            //resetear states de fd
            setOrdenRecibida(false);
            resetearEstadosOperacionesFondos(true);
        }
    }, [folioOperacion, res, ordenRecibida]);

    const sendOperaFlujos = (data: boolean) => {
        if(data === operaFlujos){
            return;
        }
        setOperaFlujos(data);
    };

    const sendErrorNumCpaEmis = (data: number) => {
        if(errorNumCpaEmis === data){
            return;
        }
        setErrorNumCpaEmis(data);
    };

    const sendListaFondosParaBuscador = (data: ITdsFondos[]) => {
        if(listaFondosParaBuscador === data){
            return;
        }
        setListaFondosParaBuscador(data);
    };

    const sendFondoObjSeleccionado = (data: ITdsFondos | undefined, terminoOperacion: boolean) => {
        if(fondoObjSeleccionado === data){
            return;
        }
        if(data === undefined && terminoOperacion === false){
            return;
        }
        setFondoObjSeleccionado(data);
    };

    const sendPrice = (data: string) => {
        if(data === price){
            return;
        }
        setPrice(data);
        // //console.log(price);
    }

    const sendMontoMaximoOperacion = (data: number) => {
        if(data === montoMaximoOperacion){
            return;
        }
        setMontoMaximoOperacion(data);
        // //console.log(montoMaximoOperacion);
    }

    const sendMontoMaximoVenta = (data: number) => {
        if(data === montoMaximoVenta){
            return;
        }
        setMontoMaximoVenta(data);
        // //console.log(montoMaximoVenta);
    }

    const sendEsRentaFija = (data: boolean) => {
        if(data === esRentaFija){
            return;
        }
        setEsRentaFija(data);
        // //console.log(esRentaFija);
    }

    const sendAdvertenciaLegalText = (data: string) => {
        if(data === advertenciaLegalText){
            return;
        }
        if(data === "" || data === "-"){
            setAdvertenciaLegalText("Elije una emisora para ver la advertencia legal.");
        }
        setAdvertenciaLegalText(data);
        // //console.log(advertenciaLegalText);
    }

    const sendPoderCompraValor = (data: string) => {
        // //console.log("data en sendPoderCompraValor");
        // //console.log(data);
        if(data === poderCompraValor){
            return;
        }
        setPoderCompraValor(data);
        // //console.log(poderCompraValor);
    }

    const sendRes = (data: string) => {
        if(data === res){
            return;
        }
        setRes(data);
        // //console.log(res);
    }

    const sendFolioOperacion = (data: string) => {
        if(data === folioOperacion){
            return;
        }
        setFolioOperacion(data);
        // //console.log(folioOperacion);
    }

    const sendTotalTradeOperacion = (data: string) => {
        if(data === totalTradeOperacion){
            return;
        }
        setTotalTradeOperacion(data);
        // //console.log(totalTradeOperacion);
    }

    const sendTitulosOperacion = (data: string) => {
        if(data === titulosOperacion){
            return;
        }
        setTitulosOperacion(data);
        // //console.log(titulosOperacion);
    }

    const sendHorarioOper = (data: string) => {
        if(data === horarioOper){
            return;
        }
        setHorarioOper(data);
        // //console.log(horarioOper);
    }

    const sendError = (data: string) => {
        if(data === error){
            return;
        }
        setError(data);
        // //console.log(error);
    }

    const sendMonto = (data: string) => {
        // //console.log("data monto");
        // //console.log(data);
        // //console.log(monto);
        if(data === monto){
            return;
        }
        setMonto(data);
        // //console.log(monto);
    }

    const sendIssuer = (data: string) => {
        if(data === issuer){
            return;
        }
        if(data.includes(".")){
            //issuer es emisora.serie
            let splitIssuer = data.split(".");
            let emisoraFondoV = splitIssuer[0];
            let serieFondoV = splitIssuer[1];
            setIssuer(data);
            setEmisoraFondo(emisoraFondoV);
            setSerieFondo(serieFondoV);
        }
        else{
            sendError("");
            setIssuer(data);
            setEmisoraFondo("");
            setSerieFondo("");
            if(data === ""){
                dispatch(getFondosCpaEmisReset({hacerResetAInitialState: true}));
                sendFondoObjSeleccionado(undefined, true);
            }
        }
    };

    const sendComprarFondos = () => {
        let cuenta = ctaCtoDispatch; //"266563";
        let params = paramsDispatch; //[ "", "1", "266563", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab",  "10200" ];
        let message = "tradefd/cpa?cuenta=" + cuenta + "&emisora=" + encodeURIComponent(emisoraFondo) + "&serie=" + encodeURIComponent(serieFondo) + "&monto=" + monto;
        
        //solo mandamos llamar el dispatch si hay info en los hooks para el dispatch
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            dispatch(getFondosCpaGetRequest({message, params}));
            sendErrorDispatch("");
        }
        else{
            sendErrorDispatch("No se pudo confirmar la compra exitosamente, por favor inténtalo más tarde.");
        }

        setComprarFondos(true);
        setConfirmacion(true);
    };

    const sendVentaFondos = () => {
        let cuenta = ctaCtoDispatch; // "266563";
        let params = paramsDispatch; // [ "", "1", "266563", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab",  "10200" ];
        let message = "tradefd/vta?cuenta=" + cuenta + "&emisora=" + encodeURIComponent(emisoraFondo) + "&serie=" + encodeURIComponent(serieFondo) + "&monto=" + monto;
        
        //solo mandamos llamar el dispatch si hay info en los hooks para el dispatch
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            dispatch(getFondosVtaGetRequest({message, params}));
            sendErrorDispatch("");
        }
        else{
            sendErrorDispatch("No se pudo confirmar la venta exitosamente, por favor inténtalo más tarde.");
        }
        
        setVentaFondos(true);
        setConfirmacion(true);
    };

    const sendDate = (data: string) => {
        if(data === date){
            return;
        }
        setDate(data);
        // //console.log(date);
    }

    const sendPosition = (data: string) => {
        if(data === position){
            return;
        }
        setPosition(data);
        // //console.log(position);
    }

    const sendConfirmacionOperacion = () => {
        //console.log("operacion fondos");
        if(emisoraFondo.length === 0 || serieFondo.length === 0){
            return;
        }
        let cuenta = ctaCtoDispatch; // "266563";
        let params = paramsDispatch; // [ "6FVeF6F5G76BbEK89Oi1X3LJo8PdUifp7AS6DgrK", "1", "266563", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab",  "10200" ];
        if(comprarFondos){
            //compra
            //setComprarFondos(!comprarFondos);
            let message = "tradefd/cpa?cuenta=" + cuenta + "&emisora=" + encodeURIComponent(emisoraFondo) + "&serie=" + encodeURIComponent(serieFondo) + "&monto=" + monto;
            
            //solo mandamos llamar el dispatch si hay info en los hooks para el dispatch
            if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
                dispatch(getFondosCpaPutRequest({message, params}));
                sendErrorDispatch("");
            }
            else{
                sendErrorDispatch("No se pudo terminar la compra exitosamente, por favor inténtalo más tarde.");
            }
        }
        else{
            //venta
            //setVentaFondos(!ventaFondos);
            let message = "tradefd/vta?cuenta=" + cuenta + "&emisora=" + encodeURIComponent(emisoraFondo) + "&serie=" + encodeURIComponent(serieFondo) + "&monto=" + monto;
            
            //solo mandamos llamar el dispatch si hay info en los hooks para el dispatch
            if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
                dispatch(getFondosVtaPutRequest({message, params}));
                sendErrorDispatch("");
            }
            else{
                sendErrorDispatch("No se pudo terminar la venta exitosamente, por favor inténtalo más tarde.");
            }
        }

        setModal(true);
    };


    const resetearEstadosOperacionesFondos = (esFinalOrdenRecibida: boolean = false) => {
        //volvemos a calcular el poder de compra
        dispatch(getConsultaSaldosRequest({ message:"/consulta/saldos?cuenta=" + ctaCtoDispatch, params: paramsDispatch }));
        
        //resetear states de fd
        dispatch(getFondosCpaEmisReset({hacerResetAInitialState: true}));
        dispatch(getFondosCpaGetReset({hacerResetAInitialState: true}));
        dispatch(getFondosCpaPutReset({hacerResetAInitialState: true}));
        dispatch(getFondosVtaGetReset({hacerResetAInitialState: true}));
        dispatch(getFondosVtaPutReset({hacerResetAInitialState: true}));
        
        sendEsRentaFija(true);
        setConfirmacion(false);
        sendDate("-");
        sendPosition("-");
        sendPrice("-");
        sendMonto("0.00");
        sendHorarioOper("");
        sendAdvertenciaLegalText("-");
        sendPoderCompraValor("-");
        sendErrorDispatch("");
        
        setModal(false);
        sendIssuer("");
        sendFondoObjSeleccionado(undefined, true);
        setComprarFondos(false);
        setVentaFondos(false);

        if(esFinalOrdenRecibida === false){
            sendRes("");
            sendFolioOperacion("");
        }
    };

    const openModalAL = () => {
        if(advertenciaLegalText === ""){
            return;
        }
        setModalAL(true)
    };

    const advertenciaLegal = (
        <div>
            <p className="text-center text-gray-500 text-xs">
                {
                    horarioOper !== "" && "Horario de operaciones " + horarioOper
                }
            </p>
            {
                horarioOper !== "" && <button className="w-full font-bold text-center text-red-600 text-xxs my-2 border-opacity-0" onClick={openModalAL}>
                    Advertencia Legal
                </button>
            }
        </div>
    );

    const operacionFondos = (
        (fondosCpaGetRespuesta.loading === true || fondosVtaGetRespuesta.loading === true) ?
            <Loading />
        :
            <div>
                <p className="text-md font-bold my-2">{comprarFondos ? "Compra" : "Venta"}</p>
                <div className="my-2">
                    <p className="my-1 text-sm">Emisora</p>
                    <p className="text-gray-400 text-sm">{issuer}</p>
                </div>
                <div className="flex my-2">
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Posición</p>
                        <p className="text-gray-400 text-sm">{/\d/.test(position) && Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(position))}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Monto Solicitado</p>
                        <p className="text-gray-400 text-sm">{/\d/.test(monto) && Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(monto))}</p>
                    </div>
                </div>
                <div className="flex my-2">
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Títulos</p>
                        <p className="text-gray-400 text-sm">{titulosOperacion}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Monto Asignado</p>
                        <p className="text-gray-400 text-sm">{/\d/.test(totalTradeOperacion) && Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(totalTradeOperacion))}</p>
                    </div>
                </div>
                <div className="flex my-2">
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Último Precio</p>
                        <p className="text-gray-400 text-sm">{/\d/.test(price) && Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(price))}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="my-1 text-sm">Fecha Liquidación</p>
                        <p className="text-gray-400 text-sm">{date}</p>
                    </div>
                </div>
                {
                    error.length > 0 && <div className="mensajeError my-3">
                        <p className="text-xs text-bold text-red-100">Error: {parse(error)}</p>
                    </div>
                }
                {
                    fondosCpaPutRespuesta.loading === true || fondosVtaPutRespuesta.loading === true ?
                        <Loading />
                    : error.length > 0 || !/\d/.test(totalTradeOperacion) || (/\d/.test(totalTradeOperacion) && parseInt(totalTradeOperacion) <= 0) ?
                        <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                            Confirmar {comprarFondos === true ? "Compra" : "Venta"}
                        </button>
                    :
                        <button className="w-full bg-red-600 p-1 my-2 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={sendConfirmacionOperacion} >
                            Confirmar {comprarFondos === true ? "Compra" : "Venta"}
                        </button>
                }
            </div>
    );

    const modalOperacionTerminada = (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <p className="my-1 font-bold">Operaciones</p>
            </ModalHeader>
            <ModalBody>
                {
                    comprarFondos === true && fondosCpaPutRespuesta.loading === true && <div>
                        <CircularProgress style={{ color: "#FF5000" }} />
                    </div>
                }
                {
                    comprarFondos === false && fondosVtaPutRespuesta.loading === true && <div>
                        <CircularProgress style={{ color: "#FF5000" }} />
                    </div>
                }
                {
                    errorDatosDispatch.length > 0 ?
                        <p className="py-2 text-center text-sm text-red-50">{errorDatosDispatch}</p>
                    :
                        <>
                            <div className="">
                                <p className="text-sm text-gray-400">{parse(res)}</p>
                            </div>
                            <div className="my-3">
                                <p className="font-bold">{comprarFondos ? "Compra" : "Venta"}</p>
                                <p className="text-sm text-gray-400">Tipo de Orden</p>
                            </div>
                            {
                                folioOperacion.toString() !== "0" && <div className="my-3">
                                    <p className="font-bold">{folioOperacion}</p>
                                    <p className="text-sm text-gray-400">Folio</p>
                                </div>
                            }
                        </>
                }
                <div className="my-3">
                    <button className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => {
                        resetearEstadosOperacionesFondos();
                    }} >
                        Cerrar
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );

    const modalAdvertenciaLegal = (
        <Modal isOpen={modalAL} toggle={toggleAL}>
            <ModalBody toggle={toggleAL}>

            <div className="tachita w-full cursor-pointer justify-end flex" onClick={toggleAL}>
                <MdClose className="text-gray-800 text-base text-right" />
            </div> 
            
            <p className="my-1 font-bold text-center">Advertencia Legal</p>

                <div className="ContenidoAdvertencia">
                    <p className="">{parse(advertenciaLegalText)}</p>
                </div>
            </ModalBody>
        </Modal>
    );

    const seatchDataObjectFondos: DataSearchOpFondos[] = [
        {
            id: "search2",
            title: "Buscar fondo...",
            optionsFondos: listaFondosParaBuscador,
            noMatch: "No se encontraron fondos",
            placeholder: "Ingresa un fondo",
        },
    ];

    const digitalMontoFondos: DigitData = {
        id: "diFondos2",
        title: "Monto Solicitado",
        minValue: 0,
        maxValue: (parseFloat(poderCompraValor) > montoMaximoVenta) ? parseFloat(poderCompraValor) : montoMaximoVenta, //en esta validacion, mandamos el monto maximo que sea mayor, ya sea el de compra o el de venta
        errorMessage: "Valor máximo para el monto: " + Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format((parseFloat(poderCompraValor) > montoMaximoVenta) ? parseFloat(poderCompraValor) : montoMaximoVenta),
        subAmount: 1,
        addAmount: 1,
        placeholder: "00,000.00",
        subfix: "",
        decimals: 2,
    };

    return (
        <div>
            <h1 className="text-center text-xxs text-gray-800">{emisoraFondo}</h1>
            <p className="text-center text-xxs text-gray-400">
                {
                    horarioOper !== "" && "Cartera de fondo de " + (esRentaFija ? "Renta Fija" : "Renta Variable")
                }
            </p>
            <div className="flex justify-between items-center my-2 text-sm">
                {
                    confirmacion ?
                        <MdKeyboardArrowLeft className="text-gray-400 text-3xl cursor-pointer" onClick={() => {
                            setConfirmacion(false);
                            dispatch(getFondosCpaGetReset({hacerResetAInitialState: true}));
                            dispatch(getFondosCpaPutReset({hacerResetAInitialState: true}));
                            dispatch(getFondosVtaGetReset({hacerResetAInitialState: true}));
                            dispatch(getFondosVtaPutReset({hacerResetAInitialState: true}));
                        }} />
                        :
                        <p></p>
                }
                {
                    /\d/.test(poderCompraValor) ?
                        <ModalPoderCompra poderCompraVal={Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(poderCompraValor))} show={operaFlujos}/>
                    :
                        <ModalPoderCompra poderCompraVal={poderCompraValor} show={!esRentaFija} />
                }
                <p></p>
                {/* <div className="text-red-600">
                    <p className="text-center">Poder de Compra</p>
                    <p className="font-bold text-center">
                        {
                            /\d/.test(poderCompraValor) ?
                                Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(poderCompraValor))
                            :
                                poderCompraValor
                        }
                    </p>
                    </div> */}
                {/* ModalInfoOrden es el modal de poder de compra, 
                    solo se muestra cuando el fondo que se va a 
                    operar es de RENTA VARIABLE */}
                {/*{
                    esRentaFija === true ?
                        <div></div>
                    : operaFlujos === true ?
                        <ModalPoderCompra />
                } */}
            </div>
            {
                errorDatosDispatch.length > 0 ?
                    <p className="py-2 text-center text-sm text-red-50">{errorDatosDispatch}</p>
                :
                    confirmacion ?
                        operacionFondos //esta es la pantalla de confirmacion de la operacion
                    : fondosMonitorRespuesta.loading === true ?
                        <Loading />
                    :
                        <div>
                            {
                                fondosMonitorRespuesta.fondosMonitorRespuesta.ierror === 1 && <div>
                                    <p className="pt-1 pb-2 text-red-100 text-xxs font-bold">Error: {parse(convertToAcentos(fondosMonitorRespuesta.fondosMonitorRespuesta.cerror))}</p>
                                </div>
                            }
                            <div className="my-3">
                                <p className="text-xs">Fondo</p>
                                <SearchOperationsFondos 
                                    issuerFondoClickeado={issuerFondoSeleccionado} 
                                    searchData={seatchDataObjectFondos} 
                                    selectedOption={fondoObjSeleccionado} 
                                    sendOption={(opSeleccionada: ITdsFondos | undefined, terminoOp: boolean) => sendFondoObjSeleccionado(opSeleccionada, terminoOp)} 
                                    side={true} 
                                    doNotSendOptionOnOnChange={true} 
                                />
                                {/*<Search searchData={seatchDataObjectFondos} selectedOption={issuer} sendOption={(issuer) => sendIssuer(issuer)} side={true} doNotSendOptionOnOnChange={true} />*/}
                            </div>
                            <div className="my-3 flex flex-row w-full">
                                <div className="w-1/2 text-xs">
                                    <p className="my-1">Posición</p>
                                    <p className="text-gray-400">{/\d/.test(position) && Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(position))}</p>
                                </div>
                            </div>
                            <div className="my-3">
                                    <p className="text-xs">Monto Solicitado</p>
                                    <Digit digitData={digitalMontoFondos} initialCount={monto} sendCount={(monto) => sendMonto(monto)} />
                            </div>
                            <div className="my-1 flex flex-row text-xs">
                                <div className="w-1/2">
                                    <p className="my-1">Último Precio</p>
                                    <p className="text-gray-400">{/\d/.test(price) && Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(price))}</p>
                                </div>
                                <div className="w-1/2">
                                    <p className="my-1">Fecha Liquidación</p>
                                    <p className="text-gray-400">{date}</p>
                                </div>
                            </div>
                            {
                                error.length > 0 && <div className="mensajeError my-3">
                                    <p className="text-xs text-bold text-red-100">Error: {parse(error)}</p>
                                </div>
                            }
                            <div className="btnsCV my-3">
                                <div className="my-2">
                                    {
                                        /* si el error tiene texto, bloqueamos el btn de compra */
                                        (error.length > 0) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /*si fondoObjSeleccionado es undefined, bloqueamos el btn de compra*/
                                        : (fondoObjSeleccionado === undefined) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /* si fondoObjSeleccionado.PuedeComprar es false, bloqueamos el btn de compra*/
                                        : (fondoObjSeleccionado !== undefined && fondoObjSeleccionado.PuedeComprar === false) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /*si poderCompraValor no es un numero, bloqueamos el btn de compra*/
                                        : (!/\d/.test(poderCompraValor)) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /*si poderCompraValor === 0, bloqueamos el btn de compra*/
                                        : (/\d/.test(poderCompraValor) && parseFloat(poderCompraValor) === 0) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /*si monto (el que ingresa el usuario) no es un numero, bloqueamos el btn de compra*/
                                        : (!/\d/.test(monto)) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /*si monto (el que ingresa el usuario) === 0, bloqueamos el btn de compra*/
                                        : (/\d/.test(monto) && parseFloat(monto) === 0 && parseFloat(poderCompraValor) > 0) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /*si monto (el que ingresa el usuario) > al poder de compra, bloqueamos el btn de compra */
                                        : (/\d/.test(monto) && parseFloat(monto) > parseFloat(poderCompraValor) && parseFloat(poderCompraValor) > 0) ?
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                        /*si monto (el que ingresa el usuario) > 0, desbloqueamos el btn de compra, se vuelve clickeable*/
                                        : (/\d/.test(monto) && parseFloat(monto) > 0 && parseFloat(monto) <= parseFloat(poderCompraValor) && parseFloat(poderCompraValor) > 0) && issuer !== "" ?
                                            <button onClick={sendComprarFondos} className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                                Comprar
                                            </button>
                                        :
                                        /*else porque todas estas validaciones pasadas son false, bloqueamos el btn de compra*/
                                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Comprar
                                            </button>
                                    }
                                </div>
                                <div className="my-2">
                                    {
                                        /* si el error tiene texto, bloqueamos el btn de venta */
                                        (error.length > 0) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        /*si fondoObjSeleccionado es undefined, bloqueamos el btn de venta*/
                                        : (fondoObjSeleccionado === undefined) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        /*si fondoObjSeleccionado.PuedeVender es false, bloqueamos el btn de venta*/
                                        : (fondoObjSeleccionado !== undefined && fondoObjSeleccionado.PuedeVender === false) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        /*si posicion (valor que viene del api cpaEmis) no es un numero, bloqueamos el btn de venta*/
                                        : (!/\d/.test(position)) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        /*si posicion (valor que viene del api cpaEmis) === 0, bloqueamos el btn de venta*/
                                        : (/\d/.test(position) && parseFloat(position) === 0) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        /*si monto no es un numero, bloqueamos el btn de venta */
                                        : (!/\d/.test(monto)) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        /*si monto (valor que escribe el usuario) > montoMaximoVenta, bloqueamos el btn de venta */
                                        : (/\d/.test(monto) && parseFloat(monto) > montoMaximoVenta) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        /*si posicion (valor que viene del api cpaEmis) > 0 y monto que escribe el usuario <= montoMaximoVenta, desbloqueamos el btn de venta, se vuelve clickeable */
                                        : (/\d/.test(position) && parseFloat(position) > 0 && /\d/.test(monto) && parseFloat(monto) <= montoMaximoVenta) ?
                                            <button onClick={sendVentaFondos} className="w-full bg-gray-100 p-1 text-sm text-red-600 border-1 border-red-600 rounded hover:bg-red-600 hover:text-gray-100">
                                                Vender
                                            </button>
                                        /*si posicion (valor que viene del api cpaEmis) > 0, desbloqueamos el btn de venta, se vuelve clickeable*/
                                        : (/\d/.test(monto) && parseFloat(monto) > montoMaximoVenta) ?
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                        : 
                                        /*else porque todas estas validaciones pasadas son false, bloqueamos el btn de venta*/
                                            <button disabled={true} className="w-full bg-gray-100 p-1 text-sm text-gray-350 border-1 border-gray-350 rounded cursor-not-allowed">
                                                Vender
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
            }
            {advertenciaLegal}
            {modalAdvertenciaLegal}
            {
                (modalFolioTarjetaOpen && paramsDispatch.length > 0) && <ModalFolioTarjetaForm 
                    modalOpen={modalFolioTarjetaOpen}
                    setModalOpen={(isOpen: boolean) => setModalFolioTarjetaOpen(isOpen)}
                    params={paramsDispatch}
                />
            }
        </div>
    );
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        consultaSaldosRespuesta: store.consultaSaldosRespuesta,
        fondosMonitorRespuesta: store.fondosMonitorRespuesta, 
        fondosCpaEmisRespuesta: store.fondosCpaEmisRespuesta,
        fondosCpaGetRespuesta: store.fondosCpaGetRespuesta,
        fondosVtaGetRespuesta: store.fondosVtaGetRespuesta,
        fondosCpaPutRespuesta: store.fondosCpaPutRespuesta,
        fondosVtaPutRespuesta: store.fondosVtaPutRespuesta,
        //loginObject: store.loginObjectState,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getConsultaSaldosRequest: () => dispatch(getConsultaSaldosRequest(dispatch)),
        getFondosMonitorRequest: () => dispatch(getFondosMonitorRequest(dispatch)),
        getFondosCpaEmisRequest: () => dispatch(getFondosCpaEmisRequest(dispatch)),
        getFondosCpaEmisReset: () => dispatch(getFondosCpaEmisReset(dispatch)),
        getFondosCpaGetRequest: () => dispatch(getFondosCpaGetRequest(dispatch)),
        getFondosCpaGetReset: () => dispatch(getFondosCpaGetReset(dispatch)),
        getFondosVtaGetRequest: () => dispatch(getFondosVtaGetRequest(dispatch)),
        getFondosVtaGetReset: () => dispatch(getFondosVtaGetReset(dispatch)),
        getFondosCpaPutRequest:  () => dispatch(getFondosCpaPutRequest(dispatch)),
        getFondosCpaPutReset: () => dispatch(getFondosCpaPutReset(dispatch)),
        getFondosVtaPutRequest:  () => dispatch(getFondosVtaPutRequest(dispatch)),
        getFondosVtaPutReset: () => dispatch(getFondosVtaPutReset(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationsFondos);