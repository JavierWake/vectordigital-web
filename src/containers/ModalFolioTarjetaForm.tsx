import React, { useState, useEffect } from 'react';

import { Modal, ModalBody } from 'reactstrap';
import { MdCheck, MdClose, MdKeyboardArrowLeft } from "react-icons/md";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { postPosicionFolioRequest, postPosicionFolioReset } from '../actions/posicionFolioAction';
import Loading from '../components/Loading';
import { getFolioDataRequest, getFolioDataReset } from '../actions/folioDataAction';
import { FolioDataState } from '../types/FolioDataTypes';
import { PosicionFolioState } from '../types/PosicionFolioTypes';

interface ModalFolioTarjetaProps {
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    params: string[];
    getFolioData?: FolioDataState;
    postPosicionFolio?: PosicionFolioState;
    sendModalClose?: (data: boolean) => void;
    setRespuestaModalFolioTarjeta?: (r: string) => void;
}

const ModalFolioTarjetaForm: React.FC<ModalFolioTarjetaProps> = ({ params, modalOpen, setModalOpen, getFolioData, postPosicionFolio, sendModalClose, setRespuestaModalFolioTarjeta }) => {

    ////console.log("entro a modal folio tarjeta form");

    //HOOKS
    const [confirmacion, setConfirmacion] = useState(false);

    const sendConfirmacion = (data: boolean) => {
        if(confirmacion === data){
            return;
        }
        /*if(data === false){
            //para sacar una nueva posición, comentar con UX para saber cual seria una mejor experiencia para el usuario :D
            if(modalOpen === true){
                if(params.length > 0){
                    sendInputValorIngresado("");
                    let message = "folio";
                    let paramsPorMientras = params;
        
                    let a = { message, params: paramsPorMientras };
        
                    dispatch(getFolioDataRequest(a));  
                }
            }
        }*/
        setConfirmacion(data);
    };

    //HOOKS - get
    const [posicionParaIngresar, setPosicionParaIngresar] = useState(0);
    const [numFolioTarjeta, setNumFolioTarjeta] = useState(0);
    const [mensajeGet, setMensajeGet] = useState("");
    const [numErrorGet, setNumErrorGet] = useState(0);

    const sendPosicionParaIngresar = (data: number) => {
        if(posicionParaIngresar === data){
            return;
        }
        setPosicionParaIngresar(data);
    };

    const sendNumFolioTarjeta = (data: number) => {
        if(numFolioTarjeta === data){
            return;
        }
        setNumFolioTarjeta(data);
    };

    const sendMensajeGet = (data: string) => {
        if(mensajeGet === data){
            return;
        }
        setMensajeGet(data);
    };

    const sendNumErrorGet = (data: number) => {
        if(numErrorGet === data){
            return;
        }
        setNumErrorGet(data);
    };

    //HOOKS - inputs
    const [inputValorIngresado, setInputValorIngresado] = useState("");

    const sendInputValorIngresado = (data: string) => {
        if(inputValorIngresado === data){
            return;
        }
        setInputValorIngresado(data);
    }

    //HOOKS - post
    const [mensajePost, setMensajePost] = useState("");
    const [numErrorPost, setNumErrorPost] = useState(0);

    const sendMensajePost = (data: string) => {
        if(mensajePost === data){
            return;
        }
        setMensajePost(data);
    };

    const sendNumErrorPost = (data: number) => {
        if(numErrorPost === data){
            return;
        }
        setNumErrorPost(data);
    }
    //const toggle = () => setModalOpen(!modalOpen);

    const dispatch = useDispatch();

    useEffect(() => {
        //(CORREGIDO) ESTE USEEFFECT SE CICLA
        /* revisar por que se cicla y corregirlo */
        ////console.log("useEffect inicial modal retirar form");

        //SOLO HACEMOS LA LLAMADA CUANDO modalOpen==true
        if(modalOpen === true){
            if(params.length > 0){
                let message = "folio"; //?posicion=5&codigo=0";
                let paramsPorMientras = params;
    
                let a = { message, params: paramsPorMientras };
    
                dispatch(getFolioDataRequest(a));
            }
        }
    }, [params, modalOpen]);

    useEffect(() => {
        if(getFolioData != undefined){
            if(getFolioData.response != undefined){
                if(getFolioData.response.folio != undefined){
                    sendNumFolioTarjeta(getFolioData.response.folio);
                }
                if(getFolioData.response.posicion != undefined){
                    sendPosicionParaIngresar(getFolioData.response.posicion);
                }
                if(getFolioData.response.ierror != undefined){
                    sendNumErrorGet(getFolioData.response.ierror);
                }
                if(getFolioData.response.cerror != undefined){
                    sendMensajeGet(getFolioData.response.cerror);
                }
            }
        }
    }, [getFolioData]);

    useEffect(() => {
        if(postPosicionFolio != undefined){
            if(postPosicionFolio.response != undefined){
                if(postPosicionFolio.response.cerror != undefined){
                    sendMensajePost(postPosicionFolio.response.cerror);
                }
                if(postPosicionFolio.response.ierror != undefined){
                    sendNumErrorPost(postPosicionFolio.response.ierror);
                    setRespuestaModalFolioTarjeta && setRespuestaModalFolioTarjeta(postPosicionFolio.response.ierror.toString());
                }
            }
        }
    }, [postPosicionFolio]);

    const sendValorIngresado = () => {
        if(inputValorIngresado.length > 0){
            //enviamos mandar llamar api y vamos a pantalla de confirmacion
            let message = "folio?posicion=" + posicionParaIngresar + "&codigo=" + inputValorIngresado;
            let a = {message, params}; 
            dispatch(postPosicionFolioRequest(a));
            sendConfirmacion(true);
        }
    };
    
    const cerrarYReiniciarModal = () => {
        //cerramos modal y con eso se reinicia cuando se vuelve a abrir :)
        //console.log("iniciar dispatch modal folio tarjeta form, cerrarYReiniciarModal");
        dispatch(getFolioDataReset({hacerResetAInitialState: true}));
        //dispatch(postPosicionFolioReset({hacerResetAInitialState: true}));
        setModalOpen(false);
        if(sendModalClose){
            sendModalClose(false);
        }
    };

    //paso 1
    const BodyFormularioCapturaDeDatos = (
        getFolioData?.loading === true ?
            <Loading />
        : (numErrorGet === 0) ?
            <div className="m-3 p-1">
                <div className="items-center w-full">
                    <p className="text-sm font-bold text-center pb-3">Ingresar código</p>
                </div>
                <div className="numFolioTarj py-1 flex flex-row w-full justify-between">
                    <div>
                        <p className="text-sm text-gray-400 py-1">Folio de tu tarjeta</p>
                    </div>
                    <div>
                        <p className={`text-sm pb-1 px-3 font-bold text-gray-500`}>{numFolioTarjeta}</p>
                    </div>
                </div>
                <div className="posicionParaIngr pt-1 pb-4 flex flex-row w-full justify-between">
                    <div>
                        <p className="text-sm text-gray-400 py-1">Posición a ingresar</p>
                    </div>
                    <div>
                        <p className={`text-sm pb-1 px-3 font-bold text-gray-500`}>{posicionParaIngresar}</p>
                    </div>
                </div>
                <div className="valorPosIngresadoInput pt-2 pb-5">
                    <p className="text-sm text-gray-400 py-1">Ingresar código</p>
                    <input
                        id="valorPosIngresadoInput"
                        placeholder={"Ingresa el código en la posición " + posicionParaIngresar} 
                        type="text"
                        value={inputValorIngresado}
                        onChange={(event: any) => sendInputValorIngresado(event.target.value.toString())}
                        className={`relative w-full inline-flex p-2 border border-1 rounded bg-white text-xs font-medium hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 border-gray-200 text-gray-400`}
                    />
                </div>
                <div className="btnIngresar flex flex-col w-full py-2">
                    {
                        /* si no ha escrito nada el usuario, bloqueamos el btn de OK */
                        (inputValorIngresado.length <= 0) ?
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Continuar
                            </button>
                        /* si ya escribio algo el usuario, desbloqueamos el btn de OK, se vuelve clickeable */
                        : (inputValorIngresado.length > 0) ?
                            <button onClick={() => sendValorIngresado()} className="w-full bg-red-600 my-1 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                Continuar
                            </button>
                        :
                        /* else porque todas estas validaciones pasadas son false, bloqueamos el btn de OK */
                            <button disabled={true} className="w-full bg-gray-350 p-1 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed">
                                Continuar
                            </button>
                    }
                </div>
            </div>
        : 
            <div>
                <div className="errorEnGet py-1">
                    {/* <p className="text-sm text-red-50 py-1">Error</p> */}
                    <div className="py-1">
                        <p className="text-base font-bold text-red-50">
                            {mensajeGet}
                        </p>
                    </div>
                </div>
                <div className="btnModal flex flex-col w-full py-2">
                    <button className="w-full my-1 bg-gray-100 p-2 text-xs text-red-600 border-1 border-red-600 rounded" onClick={() => cerrarYReiniciarModal()}>
                        Cerrar
                    </button>
                </div>
            </div>
    );

    //paso 2 (paso final)
    const BodyFinalPostFolio = (
        postPosicionFolio?.loading === true ?
            <Loading />
        :
            <div className="m-3 px-2">
                {
                    (numErrorPost !== 0) && <div className="errorEnPost py-1">
                        {/* <p className="text-sm text-red-50 py-1">Error</p> 
                        
                        <div className='flex items-stretch justify-center mb-4'>
                            <div className='bg-blue-950 rounded p-2'>
                                <h1 className="text-white px-2 text-3xl tracking-wider">123</h1>
                            </div>
                        </div>*/}
                        <div className='flex items-stretch justify-center mb-4'>
                            <div className="iconoConPaloma flex w-20 h-20 m-2 border-2 border-gray-800 rounded-tl-full rounded-tr-full rounded-br-full">
                                <MdClose className="text-4xl text-gray-800 w-full flex place-self-center justify-center" />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <p className="text-base text-center font-bold">
                                Codigo Enviado
                            </p>
                        </div>

                        <div className="py-1 mb-4">
                            <p className="text-base text-center">
                                {/*mensajePost*/}
                                El código de la posición de la tarjeta <b>NO</b> es correcto
                            </p>
                        </div>
                        <div className="btnModal flex flex-col w-full py-2">
                            <button className="w-full my-1 bg-gray-100 p-2 text-xs text-red-600 border-1 border-red-600 rounded" onClick={() => sendConfirmacion(false)}>
                                Reingresar código
                            </button>
                        </div>
                    </div>
                }
                {
                    numErrorPost === 0 && <div className="noHuboError py-2 text-gray-800">
                         {/*<div className='flex items-stretch justify-center mb-4'>
                            <div className='bg-blue-950 rounded p-2'>
                                <h1 className="text-white px-2 text-3xl tracking-wider">123</h1>
                            </div>
                        </div>*/}
                        <div className='flex items-stretch justify-center mb-4'>
                            <div className="iconoConPaloma flex w-20 h-20 m-2 border-2 border-gray-800 rounded-tl-full rounded-tr-full rounded-br-full">
                                <MdCheck className="text-4xl text-gray-800 w-full flex place-self-center justify-center" />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <p className="text-base text-center font-bold">
                                Codigo Enviado
                            </p>
                        </div>
                        <div className='mb-4'>
                            <p className="text-base text-center">
                                Ya puedes operar
                            </p>
                        </div>
                    </div>
                }
            </div>
    );

    return (
        modalOpen === true ? 
            <>
                <Modal 
                    isOpen={modalOpen} 
                    toggle={cerrarYReiniciarModal}
                    dialogClassName="!rounded-2xl"
                >
                    <ModalBody>
                        <div className="headerFormulario w-full flex flex-row py-3">
                            <div className="tachita w-full flex justify-end cursor-pointer" onClick={cerrarYReiniciarModal}>
                                <MdClose className="text-gray-800 text-base text-right" />
                            </div>
                        </div>
                        {
                            /* cuando confirmacion==true, se muestra la pantalla con la respuesta post, es decir, el paso final */
                            confirmacion === true ? 
                                BodyFinalPostFolio
                            : 
                            /* sino, se muestra el body del formulario para capturar el codigo de la tarjeta */
                                BodyFormularioCapturaDeDatos
                        }
                    </ModalBody>
                </Modal>
            </>
        : 
            <div></div>
    );
}; 

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getFolioDataRequest: () => dispatch(getFolioDataRequest(dispatch)),
        getFolioDataReset: () => dispatch(getFolioDataReset(dispatch)),
        postPosicionFolioRequest: () => dispatch(postPosicionFolioRequest(dispatch)),
        postPosicionFolioReset: () => dispatch(postPosicionFolioReset(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        getFolioData: store.folioData,
        postPosicionFolio: store.posicionFolio,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalFolioTarjetaForm);