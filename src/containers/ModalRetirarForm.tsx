import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { MdAccountBalance, MdAddCircle, MdClose, MdKeyboardArrowLeft } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { getRetiroInfoRequest, getRetiroInfoReset } from '../actions/getRetiroInfoAction';
import { GetRetiroInfoState, TdsChequeras } from '../types/GetRetiroInfoType';
import { Digit, DigitData } from './Digit';
import convertToTitleCase from '../utils/convertToTitleCase';
import { hideCuentaDeBanco } from '../utils/hideCuentaDeBanco';
import { postRetiroRequest, postRetiroReset } from '../actions/postRetiroAction';
import { PostRetiroState } from '../types/PostRetiroType';
import Loading from '../components/Loading';
import { DropdownWithIcon } from './DropdownWithIcon';
import ModalFolioTarjetaForm from './ModalFolioTarjetaForm';
import ModalPoderCompra from "./ModalPoderCompra";


interface ModalRetirarProps {
    retiroInfoRespuesta?: GetRetiroInfoState;
    postRetiroRespuesta?: PostRetiroState;
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    sendFinalizoRetiro: (yaTermino: boolean) => void;
    params: string[];
    ctaCto: string;
}

const ModalRetirarForm: React.FC<ModalRetirarProps> = ({ params, ctaCto, retiroInfoRespuesta, modalOpen, setModalOpen, postRetiroRespuesta, sendFinalizoRetiro }) => {

    console.log("entro a modal retirar form");

    //return <div></div>;

    //HOOKS
    const [saldoNoComprometido, setSaldoNoComprometido] = useState(0);
    const [saldoDispRetirar, setSaldoDispRetirar] = useState(0);
    const [saldoValidaMaxValue, setSaldoValidaMaxValue] = useState(0);
    const [tieneFlujos, setTieneFlujos] = useState(false);
    const [ horarioOperacion, setHorarioOperacion ] = useState("");
    const [listaChequeras, setListaChequeras] = useState<TdsChequeras[]>([]);
    const [idChequera, setIdChequera] = useState("");
    const [chequeraObjectSelec, setChequeraObjectSelec] = useState<TdsChequeras | undefined>(undefined);
    const [confirmacion, setConfirmacion] = useState(false);
    const [postRetiroFinalizado, setPostRetiroFinalizado] = useState(false);

    const [modalFolioTarjetaOpen, setModalFolioTarjetaOpen] = useState(false);

    //HOOKS - postRetiroRespuesta
    const [postFolio, setPostFolio] = useState("");
    const [postError, setPostError] = useState("");

    //HOOKS - inputs usuario
    const [inputMontoRetirar, setInputMontoRetirar] = useState("");
    const [selectChequeraSeleccionada, setSelectChequeraSeleccionada] = useState("");
    const [inputConcepto, setInputConcepto] = useState("");

    const sendPostRetiroFinalizado = (data: boolean) => {
        if(postRetiroFinalizado === data){
            return;
        }
        setPostRetiroFinalizado(data);
    };

    const sendPostFolio = (data: string) => {
        if(postFolio === data){
            return;
        }
        setPostFolio(data);
    };

    const sendPostError = (data: string) => {
        if(postError === data){
            return;
        }
        setPostError(data);
    };

    const sendConfirmacion = (data: boolean) => {
        if(confirmacion === data){
            return;
        }
        setConfirmacion(data);
    };

    const sendInputConcepto = (data: string) => {
        if(inputConcepto === data){
            return;
        }
        setInputConcepto(data);
    };

    const sendInputMontoRetirar = (data: string) => {
        if(inputMontoRetirar === data){
            return;
        }
        setInputMontoRetirar(data);
    };

    const sendSelectChequeraSeleccionada = (data: string) => {
        if(selectChequeraSeleccionada === data){
            return;
        }
        setSelectChequeraSeleccionada(data);
    };

    const sendIdChequera = (data: string) => {
        if(idChequera === data){
            return;
        }

        const filterListaChequeraConTitularNombre: TdsChequeras[] = listaChequeras.filter((item: TdsChequeras) => {
            return item.chequera === data;
        });

        setIdChequera(data);

        if(filterListaChequeraConTitularNombre.length > 0){
            sendChequeraObjectSelec(filterListaChequeraConTitularNombre[0]);
        }
    };

    const sendChequeraObjectSelec = (data: TdsChequeras) => {
        if(chequeraObjectSelec?.chequera === data.chequera){
            return;
        }
        setChequeraObjectSelec(data);
    }

    const sendSaldoValidaMaxValue = (data: number) => {
        if(saldoValidaMaxValue === data){
            return;
        }
        setSaldoValidaMaxValue(data);
    };

    const sendSaldoDispRetirar = (data: number) => {
        if(saldoDispRetirar === data){
            return;
        }
        setSaldoDispRetirar(data);
    };

    const sendSaldoNoComprometido = (data: number) => {
        if(saldoDispRetirar === data){
            return;
        }
        setSaldoNoComprometido(data);
    };

    const sendListaCuentaChequeras = (lista: TdsChequeras[]) => {
        if(listaChequeras === lista){
            return;
        }
        setListaChequeras(lista);
    };

    const sendHorarioOperacion = (data: string) => {
        if(horarioOperacion === data){
            return;
        }
        setHorarioOperacion(data);
    };

    //const toggle = () => setModalOpen(!modalOpen);

    const dispatch = useDispatch();

    useEffect(() => {
        //(CORREGIDO) ESTE USEEFFECT SE CICLA
        /* revisar por que se cicla y corregirlo */
        //console.log("useEffect inicial modal retirar form");

        //SOLO HACEMOS LA LLAMADA CUANDO modalOpen==true
        if(modalOpen === true){
            if(params.length > 0 && ctaCto.length > 0){
                let paramsPorMientras = params;
                let message = "teso/retiroinfo?cuenta=" + ctaCto;
                let a = { message, params: paramsPorMientras };
                dispatch(getRetiroInfoRequest(a));
            }
        }
    }, [params, ctaCto, modalOpen]);

    useEffect(() => {
        //console.log("retiro info respuesta useEffect");
        //console.log(retiroInfoRespuesta);
        if(retiroInfoRespuesta !== undefined){
            if(retiroInfoRespuesta.retiroInfoRespuesta !== undefined && retiroInfoRespuesta.message.length > 0 && retiroInfoRespuesta.loading === false){
                if(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData !== undefined){
                    if(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsTradeData.length > 0){
                        //hay datos en tds trade data
                        setTieneFlujos(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsTradeData[0].tieneFlujos);
                        sendSaldoDispRetirar(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsTradeData[0].SaldoActual);
                        sendSaldoNoComprometido(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsTradeData[0].SaldoCapCpa);
                        sendSaldoValidaMaxValue(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsTradeData[0].saldo);
                        sendHorarioOperacion(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsTradeData[0].hroperacion);
                    }
                    if(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsChequeras.length > 0){
                        //hay info en tds chequeras
                        sendListaCuentaChequeras(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsChequeras);
                        sendIdChequera(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsChequeras[0].chequera);
                        sendSelectChequeraSeleccionada(
                            convertToTitleCase(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsChequeras[0].banco) 
                            + " " + 
                            hideCuentaDeBanco(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsChequeras[0].chequera)
                        );
                        sendChequeraObjectSelec(retiroInfoRespuesta.retiroInfoRespuesta.dsTradeData.tdsChequeras[0]);
                    }
                }
            }
        }
    }, [retiroInfoRespuesta?.message, retiroInfoRespuesta?.loading]);

    useEffect(() =>{
        if(postRetiroRespuesta != undefined){
            if(postRetiroRespuesta.message.length > 0 && postRetiroRespuesta.loading === false){
                if(postRetiroRespuesta.postRetiroRespuesta != undefined){
                    if(postRetiroRespuesta.postRetiroRespuesta.dsTrade != undefined){
                        if(postRetiroRespuesta.postRetiroRespuesta.dsTrade.tdsTrade.length > 0){
                            //ya respondio el api de post retiro
                            if(postRetiroRespuesta.postRetiroRespuesta.dsTrade.tdsTrade[0].Folio === 0){
                                //error
                                sendPostError(postRetiroRespuesta.postRetiroRespuesta.cerror);
                                setModalFolioTarjetaOpen(true);
                            }
                            else{
                                //post retiro exitoso, le mandamos true a sendFinalizoRetiro para que haga dispatch sidebar y actualice el saldo en efectivo
                                sendPostError("");
                                sendPostFolio(postRetiroRespuesta.postRetiroRespuesta.dsTrade.tdsTrade[0].Folio.toString());
                                sendFinalizoRetiro(true);
                            }
                        }
                        else{
                            sendPostError(postRetiroRespuesta.postRetiroRespuesta.cerror);
                            setModalFolioTarjetaOpen(true);
                        }
                    }
                }
            }
        }
        
    }, [postRetiroRespuesta?.message, postRetiroRespuesta?.loading]);

    useEffect(() => {
        if(modalFolioTarjetaOpen === false){
            if(postRetiroRespuesta !== undefined){
                if(postRetiroRespuesta.message.length > 0 && postRetiroRespuesta.loading === false){
                    if(postRetiroRespuesta.postRetiroRespuesta.dsTrade.tdsTrade.length > 0){
                        if(postRetiroRespuesta.postRetiroRespuesta.ierror === 50){
                            //cuando ierror === 50, volvemos a mandar a llamar el api
                            aceptarRetiro();
                        }
                    }
                    else{
                        aceptarRetiro();
                    }
                }
            }
        }
    }, [modalFolioTarjetaOpen, postRetiroRespuesta?.message, postRetiroRespuesta?.loading])
    
    const aceptarRetiro = () => {
        //click en Retirar
        //console.log("mandar llamar api de retiro");

        /* 
        query string parameters para la llamada post retiro:
            inputMontoRetirar = monto
            chequeraObjectSelec?.banco.toUpperCase() = banco
            chequeraObjectSelec?.chequera = chequera
            chequeraObjectSelec?.titular = titular
        */

        if(chequeraObjectSelec != undefined){
            if(params.length > 0){
                //hacemos llamada a postRetiro
                let message = "/teso/retiro?cuenta=" + ctaCto + "&titular=" + chequeraObjectSelec.titular + "&banco=" + chequeraObjectSelec.banco.toUpperCase() + "&chequera=" + chequeraObjectSelec.chequera + "&monto=" + inputMontoRetirar;
                let a = {message, params};
                dispatch(postRetiroRequest(a));
            }
            else{
                sendPostError("Ocurrió un error. Cierra la ventana de Retiro y vuelve a intentarlo nuevamente.");
            }
        }
        else{
            sendPostError("No se seleccionó correctamente la chequera. Vuelve a intentarlo nuevamente.");
        }

        //despues de la llamada, cerramos el modal?
        //setModalOpen(false);
        //o volvemos a la pantalla de captura de datos?
        //sendConfirmacion(false);
        
        //SOLUCION: hice una pantalla de BodyFinalPostRetiro que despliega el num de folio que responde el api de postRetiro y el cerror si hay error

        sendConfirmacion(false); //quitamos el body de confirmacion de datos
        sendPostRetiroFinalizado(true); //mostramos el body de finalizacion de la llamada postRetiro
    };
    
    const cerrarYReiniciarModal = () => {
        //cerramos modal y con eso se reinicia cuando se vuelve a abrir :)
        dispatch(getRetiroInfoReset({ hacerResetAInitialState: true }));
        dispatch(postRetiroReset({ hacerResetAInitialState: true }));
        setModalOpen(false);
    };

    const DropdownDataRetiroChequeras = listaChequeras.map((chequera: TdsChequeras) => {
        return {
            id: chequera.chequera,
            option: convertToTitleCase(chequera.banco) + " " + hideCuentaDeBanco(chequera.chequera),
        };
    });

    const DigitDataMontoRetirar: DigitData = {
        id: "diMR1",
        title: "Monto",
        minValue: 0, //el usuario no puede retirar menos de $0
        maxValue: saldoValidaMaxValue, //el usuario no puede retirar mas del saldoDisp que tiene
        errorMessage: "Valor (número entero o decimal) máximo para retirar: " + Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(saldoValidaMaxValue),
        subAmount: 1,
        addAmount: 1,
        placeholder: "0.00",
        subfix: "",
        decimals: 2,
    };

    //paso 1
    const BodyFormularioCapturaDeDatos = (
        retiroInfoRespuesta?.loading === true ?
            <Loading />
        :
            <div className="mb-3 p-1">
                <div className="montoYSaldoDisp py-1">
                    {
                        saldoDispRetirar > 0 && <>
                            <p className="text-sm py-1">Monto</p>
                            <div className="py-1">
                                <Digit digitData={DigitDataMontoRetirar} initialCount={inputMontoRetirar} sendCount={(monto) => sendInputMontoRetirar(monto)} sizeFull={true} />
                            </div>
                        </>
                    }
                    {
                        (saldoDispRetirar === 0) && <p className="text-sm font-bold text-red-100 pb-3">No tienes saldo disponible para retirar.</p>
                    }
                    {
                        tieneFlujos === true && <>
                            <p className={`text-sm pb-1 text-gray-500`}>Disponible: {Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(saldoDispRetirar)}</p>
                            <div className="flex flex-row pb-1 text-sm mr-2 text-gray-500">
                                <p className={`mr-2`}>No comprometido:</p>
                                <ModalPoderCompra 
                                    poderCompraVal={Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(saldoNoComprometido)} 
                                    show={tieneFlujos}
                                    ubicacionComponente="RETIRO"
                                />
                            </div>
                        </>
                    }
                    <p className={`text-sm pb-2 text-gray-500`}>Máximo a retirar: {Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(saldoValidaMaxValue)}</p>
                </div>
                {
                    (saldoDispRetirar > 0) && <div className="ctaADepositarYLinkAgregarNvaCta py-2">
                        <p className="text-sm py-1">Cuenta a depositar</p>
                        <div className="selectCtas py-1">
                            {/* leftIcon={<MdAccountBalance className="icon mt-0 mb-0 ml-0 mr-2 text-sm" />} */}
                            <DropdownWithIcon leftIcon={<MdAccountBalance className="icon mt-0 mb-0 ml-0 mr-2 text-sm" />} sendOption={(cuentaSeleccionada) => sendSelectChequeraSeleccionada(cuentaSeleccionada)} dropdownData={DropdownDataRetiroChequeras} initialOption={selectChequeraSeleccionada} side={true} sendId={(id) => sendIdChequera(id)} />
                        </div>
                        {/* <div className="linkAcregarNuevaCta py-1">
                        <div className="linkAcregarNuevaCta pb-2 pt-4">
                            <NavLink to="/agregar-cuenta-bancaria">
                                <span className="flex flex-row text-red-600 text-sm">
                                    <MdAddCircle className="icon mt-0 mb-0 ml-0 mr-2" style={{color: "#FF5000", width: "24px"}} />
                                    <p>Agregar nueva cuenta</p>
                                </span>
                            </NavLink>
                        </div> */}
                    </div>
                }
                {
                    horarioOperacion.length > 0 && <div className="horarioDeOperacion py-1">
                        <p className={`text-sm pb-2 text-gray-500`}>Horario de operación: {horarioOperacion}</p>
                    </div>
                }
                <div className="btnRetirar flex flex-col w-full py-2">
                    {
                        /* si saldoValidaMaxValue <= 0, bloqueamos el btn de Confirmar */
                        (saldoValidaMaxValue <= 0) ?
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Confirmar
                            </button>
                        /* si saldoDispRetirar <= 0, bloqueamos el btn de Confirmar */
                        : (saldoDispRetirar <= 0) ?
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Confirmar
                            </button>
                        /*si monto (el que ingresa el usuario) no es un numero, bloqueamos el btn de Confirmar*/
                        : (/^[0-9]+$/.test(inputMontoRetirar) && parseFloat(inputMontoRetirar) == 0 && saldoDispRetirar > 0) ?
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Confirmar
                            </button>
                        /* si no esta selecionada una chequera, bloqueamos el btn de Confirmar */
                        : (chequeraObjectSelec === undefined) ?
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Confirmar
                            </button>
                        /* si el obj no tiene dato de .chequera, bloqueamos el btn de Confirmar */
                        : (chequeraObjectSelec.chequera.length === 0) ?
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Confirmar
                            </button>
                        /*si monto (el que ingresa el usuario) > 0 y la chequera esta correctamente seleccionada, desbloqueamos el btn de Confirmar, se vuelve clickeable*/
                        : (/\d/.test(inputMontoRetirar) && parseFloat(inputMontoRetirar) > 0 && saldoDispRetirar > 0 && chequeraObjectSelec.chequera.length > 0) ?
                            <button onClick={() => sendConfirmacion(true)} className="w-full bg-red-600 my-1 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                Confirmar
                            </button>
                        :
                        /*else porque todas estas validaciones pasadas son false, bloqueamos el btn de Confirmar */
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Confirmar
                            </button>
                    }
                </div>
            </div>
    );

    //paso 2
    const BodyConfirmarDatos = (
        <div className="mb-3 p-1">
            <div className="inputsBloqueadosParaConfirmar py-1">
                <div className="inputMontoBloqueado py-1">
                    <p className="text-sm text-gray-400 py-1">Monto a retirar</p>
                    <div className="py-1">
                        <div className="border-1 border-gray-350 w-full rounded cursor-not-allowed">
                            <p className="text-base text-gray-350 p-2">
                                {Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(parseFloat(inputMontoRetirar))}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 py-1">Disponible: {Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(saldoDispRetirar)}</p>
                </div>
                <div className="selectCuentaDepositarBloqueada py-2">
                    <p className="text-sm text-gray-400 py-1">Cuenta a depositar</p>
                    <div className="selectCuentaDepositarBloqueada py-1 flex flex-row w-full text-gray-800">
                        <div className="p-2 w-4/24">
                            <MdAccountBalance className="icon text-base text-center" />
                        </div>
                        <div className="pl-2 w-20/24">
                            {
                                chequeraObjectSelec && <>
                                    <p className="text-base py-1">{convertToTitleCase(chequeraObjectSelec.banco)}</p>
                                    <p className="text-base py-1">{hideCuentaDeBanco(chequeraObjectSelec.chequera)}</p>
                                </>
                            }
                        </div>
                    </div>
                    <div className="conceptoInput py-2">
                        <p className="text-sm text-gray-400 py-1">Concepto</p>
                        <input
                            id="conceptoInput"
                            placeholder="Ej. Retiro semanal"
                            type="text"
                            value={inputConcepto}
                            onChange={(event: any) => sendInputConcepto(event.target.value.toString())}
                            className={`relative w-full inline-flex p-2 border border-1 rounded bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 border-gray-200 text-gray-400`}
                        />
                        <p className="text-xs text-gray-300 py-1">Opcional</p>
                    </div>
                    <div className="montoDespuesDeTransaccion pt-2 pb-1">
                        <p className="text-xs text-gray-400 py-1">Monto disponible despues de la transacción:</p>
                        <p className="text-xs text-gray-400">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(saldoDispRetirar - parseFloat(inputMontoRetirar))}</p>
                    </div>
                </div>
            </div>
            <div className="btnAceptar flex flex-col w-full py-2">
                <button className="w-full bg-red-600 my-1 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={aceptarRetiro}>
                    Aceptar
                </button>
            </div>
        </div>
    );

    //paso 3 (paso final)
    const BodyFinalPostRetiro = (
        postRetiroRespuesta?.loading === true ?
            <Loading />
        :
            <div className="mb-3 p-1">
                {
                    (postFolio.length > 0) && <div className="postFolio py-1">
                        <p className="text-sm text-gray-400 py-1">Folio del retiro</p>
                        <div className="py-1">
                            <p className="text-base font-bold text-gray-600">
                                {postFolio}
                            </p>
                        </div>
                    </div>
                }
                {
                    postError.length > 0 && <div className="msjPostError py-2 text-red-100">
                        <p className="text-sm py-1">Error en operación</p>
                        <div className="py-1">
                            <p className="text-base">
                                {postError}
                            </p>
                        </div>
                    </div>
                }
                <div className="btnsModal flex flex-col w-full py-2">
                    {/*
                        <button className="w-full bg-red-600 my-1 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => volverAFormulario()}>
                            Nuevo Retiro
                        </button>
                    */}
                    <button className="w-full my-1 bg-gray-100 p-2 text-xs text-red-600 border-1 border-red-600 rounded" onClick={() => cerrarYReiniciarModal()}>
                        Cerrar
                    </button>
                </div>
            </div>
    );

    return (
        modalOpen === true ? 
            <>
                <Modal isOpen={modalOpen} toggle={cerrarYReiniciarModal}>
                    <ModalBody>
                        <div className="headerFormulario w-full flex flex-row pt-3">
                            <div className="fechitaAtras w-2/24">
                                {
                                    confirmacion === true && <div className="w-full cursor-pointer" onClick={() => sendConfirmacion(false)}>
                                        <MdKeyboardArrowLeft className="text-gray-800 text-base text-left" />
                                    </div>
                                }
                            </div>
                            <div className="titulo w-20/24">
                                <p className="my-1 font-bold text-center">
                                    {
                                        /* si confirmacion == true, mostramos titulo "Confirmar" */
                                        (confirmacion === true) ? 
                                            "Confirmar"
                                        /* si ya termino el retiro y se esta sacando la respuesta de postRetiro, mostramos titulo "Finalizando Retiro" */
                                        : (postRetiroFinalizado === true && postRetiroRespuesta?.loading === true) ?
                                            "Finalizando Retiro"
                                        /* si ya termino el retiro y ya se recibio la respuesta de postRetiro, mostramos titulo "Retiro Finalizado" */
                                        : (postRetiroFinalizado === true && postRetiroRespuesta?.loading === false) ?
                                            "Retiro Finalizado"
                                        :
                                        /* si ninguna de estas validaciones es true, mostramos titulo default "Retiro" */
                                            "Retiro"
                                    }
                                </p>
                            </div>
                            <div className="tachita w-2/24 cursor-pointer" onClick={cerrarYReiniciarModal}>
                                <MdClose className="text-gray-800 text-base text-right" />
                            </div>
                        </div>
                        {
                            /* cuando confirmacion==true, se muestra la pantalla para confirmar datos */
                            confirmacion === true ? 
                                BodyConfirmarDatos
                            /* cuando postRetiroFinalizado==true, se muestra el folio del retiro o el error, y se ponen los btns para hacer nuevo retiro o cerrar el modal */
                            : postRetiroFinalizado === true ?
                                BodyFinalPostRetiro
                            :
                            /* sino, se muestra el body del formulario para capturar los datos para el retiro */
                                BodyFormularioCapturaDeDatos
                        }
                    </ModalBody>
                </Modal>
                {
                    (modalFolioTarjetaOpen && params.length > 0) && <ModalFolioTarjetaForm 
                        modalOpen={modalFolioTarjetaOpen}
                        setModalOpen={(isOpen: boolean) => setModalFolioTarjetaOpen(isOpen)}
                        params={params}
                    />
                }
            </>
        : 
            <div></div>
    );
}; 

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getRetiroInfoRequest: () => dispatch(getRetiroInfoRequest(dispatch)),
        getRetiroInfoReset: () => dispatch(getRetiroInfoReset(dispatch)),
        postRetiroRequest: () => dispatch(postRetiroRequest(dispatch)),
        postRetiroReset: () => dispatch(postRetiroReset(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        retiroInfoRespuesta: store.retiroInfoRespuesta,
        postRetiroRespuesta: store.postRetiroRespuesta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRetirarForm);