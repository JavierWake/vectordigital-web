import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import parse from "html-react-parser";

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { Modal } from 'reactstrap';

import { tdsOrdenesCap } from '../types/OrdenesTypes';
import { LoginObjectState } from '../types/LoginObjectTypes';
import Loading from '../components/Loading';
import ModalFolioTarjetaForm from "./ModalFolioTarjetaForm";
import { PostCancelaOrdenState } from '../types/PostCancelaOrdenType';
import { postCancelaOrdenRequest, postCancelaOrdenReset } from '../actions/postCancelaOrdenAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//State of the component
interface propsFromState {
    loginObject?: LoginObjectState;
    postCancelaOrdenEstado?: PostCancelaOrdenState;
    ordenCap: tdsOrdenesCap;
    openModalEliminar: boolean;
    setOpenModalEliminar: (data: boolean) => void;
    volverCargarApiOrdenes: () => void;
}

type AllProps = propsFromState;

const ModalEliminarOrden: React.FC<AllProps> = ({ loginObject, postCancelaOrdenEstado, ordenCap, openModalEliminar, setOpenModalEliminar, volverCargarApiOrdenes }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    //HOOKS
    const [modalFolioTarjetaOpen, setModalFolioTarjetaOpen] = useState(false);
    const [respuestaModalFolioTarjeta, setRespuestaModalFolioTarjeta] = useState("");
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [errorCancelarApi, setErrorCancelarApi] = useState("");
    const [numErrorCancelarApi, setNumErrorCancelarApi] = useState(0);

    const toggleEliminar = () => {
        setErrorCancelarApi("");
        //console.log("toggle postCancelaOrdenReset");
        dispatch(postCancelaOrdenReset({ hacerResetAInitialState: true }));
        setOpenModalEliminar(!openModalEliminar);
    };
    
    const sendParamsDispatch = (data: string[]) => {
        if(paramsDispatch === data){
            return;
        }
        setParamsDispatch(data);
    };

    const sendCtaCtoDispatch = (data: string) => {
        if(ctaCtoDispatch === data){
            return;
        }
        setCtaCtoDispatch(data);
    };

    const sendRespuestaModalFolioTarjeta = (data: string) => {
        if(respuestaModalFolioTarjeta === data){
            return;
        }
        setRespuestaModalFolioTarjeta(data);
    };

    const sendErrorCancelarApi = (data: string) => {
        if(errorCancelarApi === data){
            return;
        }
        setErrorCancelarApi(data);
    };

    const sendNumErrorCancelarApi = (data: number) => {
        if(numErrorCancelarApi === data){
            return;
        }
        setNumErrorCancelarApi(data);
    };

    useEffect(() =>{
        if(postCancelaOrdenEstado !== undefined){
            if(postCancelaOrdenEstado.message.length > 0 && postCancelaOrdenEstado.loading === false){
                if(postCancelaOrdenEstado.response !== undefined){
                    if(postCancelaOrdenEstado.response.ierror === 0){
                        //cancelacion exitosa!
                        //console.log("volver a cargar apis ordenes true");
                        setOpenModalEliminar(false);
                        setErrorCancelarApi("");
                        //console.log("useEffect postCancelaOrdenEstado postCancelaOrdenReset");
                        dispatch(postCancelaOrdenReset({ hacerResetAInitialState: true }));
                        volverCargarApiOrdenes();
                    }
                    //de aqui para abajo es cancelación fallida
                    else if(postCancelaOrdenEstado.response.ierror === 50){
                        // necesitamos el codigo de la tarjeta
                        sendNumErrorCancelarApi(postCancelaOrdenEstado.response.ierror);
                        sendErrorCancelarApi(postCancelaOrdenEstado.response.cerror);
                        setModalFolioTarjetaOpen(true);
                    }
                    else{
                        //el error es un num diferente de 0 o 50
                        let strErrorDelApiPost = "";
                        if(postCancelaOrdenEstado.response.cerror.length > 0) {
                            strErrorDelApiPost += postCancelaOrdenEstado.response.cerror;
                        }
                        if(postCancelaOrdenEstado.response.dscancelacion !== undefined){
                            if(postCancelaOrdenEstado.response.dscancelacion.tdscancelacion !== undefined){
                                if(postCancelaOrdenEstado.response.dscancelacion.tdscancelacion.length > 0){
                                    if(postCancelaOrdenEstado.response.dscancelacion.tdscancelacion[0].cerror !== undefined){
                                        strErrorDelApiPost += ("<br />" + postCancelaOrdenEstado.response.dscancelacion.tdscancelacion[0].cerror);
                                    }
                                }
                            }
                        }
                        sendNumErrorCancelarApi(postCancelaOrdenEstado.response.ierror);
                        sendErrorCancelarApi(strErrorDelApiPost.length > 0 ? strErrorDelApiPost : ("Hubo un error al cancelar la orden con folio " + ordenCap.folio + "."));
                    }
                }
            }
        }
    }, [postCancelaOrdenEstado?.message, postCancelaOrdenEstado?.loading/*, postCancelaOrdenEstado, postCancelaOrdenEstado?.response*/]);

    useEffect(() => {
        if(modalFolioTarjetaOpen === false){
            if(postCancelaOrdenEstado !== undefined){
                if(postCancelaOrdenEstado.message.length > 0 && postCancelaOrdenEstado.loading === false){
                    if(postCancelaOrdenEstado.response.dscancelacion.tdscancelacion.length > 0){
                        if(postCancelaOrdenEstado.response.ierror === 50){
                            //cuando ierror === 50, volvemos a mandar a llamar el api
                            if(respuestaModalFolioTarjeta === "0"){
                                cancelOrdenMetodo();
                            }
                        }
                    }
                    else{
                        if(respuestaModalFolioTarjeta === "0"){
                            cancelOrdenMetodo();
                        }
                    }
                }
            }
        }
    }, [modalFolioTarjetaOpen, respuestaModalFolioTarjeta/*, cancelOrden?.message, cancelOrden?.loading*/]);

    const cancelOrdenMetodo = () => {
        //setOpenModalEliminar(false);

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
                        
                        let message = "tradecap/cancela?cuenta=" + cuentaLO.toString();
                        let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                        
                        if(paramsDispatch.length === 0 || ctaCtoDispatch.length === 0){
                            sendParamsDispatch(params);
                            sendCtaCtoDispatch(cuentaLO);
                        }

                        let data = [
                            { "folio" : ordenCap.folio }
                        ];

                        let a = { message, params, data }   
                        //dispatch(postCancelOrdenRequest(a));
                        dispatch(postCancelaOrdenRequest(a));
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    //console.log("usuario no loggeado en modalview, lo mandamos al login");
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
            //console.log("usuario no loggeado en modalview, lo mandamos al login");
            history.push("/");
        }
    };

    return (
        openModalEliminar === true ?
            <>
                <Modal
                    isOpen={openModalEliminar}
                    toggle={() => {
                        //console.log("toggle eliminar");
                        toggleEliminar();
                    }}
                    //onHide={() => setOpenModalEliminar(false)}
                    //backdrop="static"
                    //keyboard={false}
                    //size="sm"
                    //aria-labelledby="example-custom-modal-styling-title"
                    centered
                >
                    <div>
                        <div className="pt-8 px-10 text-center">
                            {  
                                errorCancelarApi.length > 0 ?
                                    <div className="">
                                        {
                                            numErrorCancelarApi === 998 ? 
                                                <p className="text-md font-bold text-gray-800">
                                                    Mensaje sobre cancelación de orden <b>{ordenCap.folio}</b>:
                                                </p>
                                            :
                                                <p className="text-md font-bold text-center text-red-500">
                                                    Error al cancelar orden <b>{ordenCap.folio}</b>
                                                </p>
                                        }
                                        {
                                            postCancelaOrdenEstado?.loading === false && <p className="text-base text-center text-gray-800">{parse(errorCancelarApi)}</p>
                                        }
                                    </div>
                                :
                                    <p className="text-md font-bold">¿Cancelar orden <b>{ordenCap.folio}</b>?</p>
                            }
                        </div>
                        {
                            postCancelaOrdenEstado?.loading === true ?
                                <Loading />
                            :
                                <div className="flex flex-row justify-center px-2 py-4">
                                    <button 
                                        type="submit" 
                                        className="bg-gray-100 w-1/3 p-2 text-xs text-red-600 border-1 border-red-600 mx-2 rounded"
                                        onClick={() => {
                                            setErrorCancelarApi("");
                                            //console.log("btn regresar postCancelaOrdenReset");
                                            dispatch(postCancelaOrdenReset({ hacerResetAInitialState: true }));
                                            
                                            if(errorCancelarApi.length > 0){
                                                //si errorCancelarApi.length > 0, quiere decir que se ejecuto el api de cancelar orden
                                                if(numErrorCancelarApi === 998 || numErrorCancelarApi === 0){
                                                    //si numErrorCancelarApi es 998 o 0, quiere decir que se envio la solicitud de la cancelacion, o que ya se cancelo la orden, entonces volvemos a cargar el api
                                                    volverCargarApiOrdenes();
                                                }
                                            }
                                            
                                            setOpenModalEliminar(false);
                                        }}
                                    >
                                        {
                                            errorCancelarApi.length === 0 ? 
                                                "No" 
                                            : 
                                                "Regresar"
                                        }
                                    </button>
                                    {
                                        errorCancelarApi.length === 0 && <button 
                                            type="submit" 
                                            className="bg-red-600 w-1/3 p-2 text-xs text-gray-100 border-1 border-red-600 mx-2 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                            onClick={cancelOrdenMetodo} 
                                        >
                                            Sí
                                        </button>
                                    }
                                </div>
                        }
                    </div> 
                </Modal>
                {
                    (modalFolioTarjetaOpen && paramsDispatch.length > 0) && <ModalFolioTarjetaForm 
                        modalOpen={modalFolioTarjetaOpen}
                        setModalOpen={(isOpen: boolean) => setModalFolioTarjetaOpen(isOpen)}
                        params={paramsDispatch}
                        setRespuestaModalFolioTarjeta={(r: string) => sendRespuestaModalFolioTarjeta(r)}
                        //sendModalClose={(m: boolean) => modalCloseSinFolio(m)}
                    />
                }
            </>
        :
            <></>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        postCancelaOrdenEstado: store.postCancelaOrdenEstado,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        postCancelaOrdenRequest: () => dispatch(postCancelaOrdenRequest(dispatch)),
        postCancelaOrdenReset: () => dispatch(postCancelaOrdenReset(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEliminarOrden);