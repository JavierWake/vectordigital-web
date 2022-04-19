import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import parse from "html-react-parser";

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { MdModeEdit, MdClose } from "react-icons/md";
import { Modal } from 'reactstrap';

import { postEditOrdenRequest, postEditOrdenReset } from '../actions/EditOrdenAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

import { tdsOrdenesCap } from '../types/OrdenesTypes';
import { LoginObjectState } from '../types/LoginObjectTypes';
import { EditOrdenState } from '../types/EditOrdenTypes';
import Loading from '../components/Loading';
import { convertFromMoneyToNumber } from '../utils/convertFromMoneyToNumber';

import { BsTrash } from "react-icons/bs";
import ModalFolioTarjetaForm from './ModalFolioTarjetaForm';

//State of the component
interface propsFromState {
    loginObject?: LoginObjectState;
    editOrdenState?: EditOrdenState;
    ordenCap: tdsOrdenesCap;
    modalOpen: boolean;
    setModalOpen: (data: boolean) => void;
    //openModalEliminar: boolean;
    setOpenModalEliminar: (data: boolean) => void;
    volverCargarApiOrdenes: () => void;
}

type AllProps = propsFromState;

const ModalModificarOrden: React.FC<AllProps> = ({ loginObject, editOrdenState, ordenCap, modalOpen, setModalOpen, setOpenModalEliminar, volverCargarApiOrdenes }) => {
    //console.log("entro a modal modificar orden");

    const history = useHistory();
    const dispatch = useDispatch();

    //HOOKS
    const [modalFolioTarjetaOpen, setModalFolioTarjetaOpen] = useState(false);
    const [respuestaModalFolioTarjeta, setRespuestaModalFolioTarjeta] = useState("");
    const [editar, setEditar] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [errorEditOrden, setErrorEditOrden] = useState("");

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

    const sendErrorEditOrden = (data: string) => {
        if(data === errorEditOrden){
            return;
        }
        setErrorEditOrden(data);
    }

    const toggle = () => {
        //console.log("toggle reset postEditOrdenReset");
        setErrorEditOrden("");
        dispatch(postEditOrdenReset({hacerResetAInitialState: true}));
        setModalOpen(!modalOpen);
    };

    useEffect(() =>{
        if(editOrdenState !== undefined){
            if(editOrdenState.message.length > 0 && editOrdenState.loading === false){
                if(editOrdenState.response !== undefined){
                    if(editOrdenState.response.ierror !== 0){
                        sendErrorEditOrden(editOrdenState.response.cerror);
                        if(editOrdenState.response.ierror === 50){
                            // necesitamos el codigo de la tarjeta
                            setModalFolioTarjetaOpen(true);
                        }
                    }else if(editOrdenState.response.dsmodificacion !== undefined){
                        if(editOrdenState.response.dsmodificacion.tdsmodificacion.length > 0){
                            ////console.log("volver a cargar apis ordenes true");
                            setEditar(false);
                            setModalOpen(false);
                            setOpenModalEliminar(false);
                            setErrorEditOrden("");
                            //resetear state de editOrden
                            //console.log("useEffect editOrdenState reset postEditOrdenReset");
                            dispatch(postEditOrdenReset({hacerResetAInitialState: true}));
                            volverCargarApiOrdenes();
                        }
                    }
                }
            }
        }
    }, [editOrdenState?.message, editOrdenState?.loading]);

    useEffect(() => {
        if(modalFolioTarjetaOpen === false){
            if(editOrdenState !== undefined){
                if(editOrdenState.message.length > 0 && editOrdenState.loading === false){
                    if(editOrdenState.response.dsmodificacion.tdsmodificacion.length > 0){
                        if(editOrdenState.response.ierror === 50){
                            //cuando ierror === 50, volvemos a mandar a llamar el api
                            if(respuestaModalFolioTarjeta === "0"){
                                editarOrdenes();
                            }
                        }
                    }
                    else{
                        if(respuestaModalFolioTarjeta === "0"){
                            editarOrdenes();
                        }
                    }
                }
            }
        }
    }, [modalFolioTarjetaOpen, respuestaModalFolioTarjeta/*, cancelOrden?.message, cancelOrden?.loading*/]);


    const[titulos, setTitulos] = useState(ordenCap.titulos);
    const[precio, setPrecio] = useState(convertFromMoneyToNumber(ordenCap.precio));

    const sendTitulos = (data: string) => {
        //const userInput = e.currentTarget.value;
        if(data === titulos){
            return;
        }
        setTitulos(data);
    };

    const sendPrice = (data: string) => {
        //const userInput = e.currentTarget.value;
        if(data === precio){
            return;
        }
        setPrecio(data);
    };

    const editarOrdenes = () => {
        //setModalOpen(false);

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
                        
                        let message = "tradecap/modifica?cuenta=" + cuentaLO.toString() + "&folio=" + ordenCap.folio + "&titulos=" + titulos + "&precio=" + precio;
                        let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                        let a = { message, params };

                        if(paramsDispatch.length === 0 || ctaCtoDispatch.length === 0){
                            sendParamsDispatch(params);
                            sendCtaCtoDispatch(cuentaLO);
                        }
                        
                        dispatch(postEditOrdenRequest(a));
                        
                        setEditar(false);
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
        modalOpen === true ? 
            <>
                <Modal style={{ width: "22rem" }} isOpen={modalOpen} toggle={toggle}>
                    {
                        editOrdenState?.loading === true ?
                            <Loading />
                        :
                            <div>
                                <div className="py-4 px-10 ">
                                    <div className="flex flex-row justify-end">
                                        <MdClose className="text-gray-500 text-xl cursor-pointer hover:text-red-600"
                                            onClick={() => {
                                                setErrorEditOrden("");
                                                //console.log("tachita close reset postEditOrdenReset");
                                                ordenCap.puedeCancelar === true && dispatch(postEditOrdenReset({hacerResetAInitialState: true}));
                                                setModalOpen(false);
                                            }}
                                        />
                                    </div>
                                    <p className="font-bold uppercase text-center text-md">{ordenCap.emisora}</p>
                                    <div className="w-full flex flex-row py-2">
                                        <div className='w-9/12'>
                                            <p className="text-sm text-right">Último Precio ${ordenCap.UltimoPrecio}</p>
                                        </div>
                                        <div className='w-3/12 flex justify-end'>
                                            {
                                                ordenCap.puedeCancelar === true ?
                                                    <div className='flex flex-row'>
                                                        <MdModeEdit className={"text-xl cursor-pointer hover:text-red-600 " + (editar ? "text-red-600" : "text-gray-500" )}
                                                            onClick={() => {
                                                                setEditar(true)
                                                                setEliminar(false)
                                                            }}
                                                        />
                                                        <BsTrash className={"text-gray-500 text-xl hover:cursor-pointer hover:text-red-600 " + (eliminar ? "text-red-600" : "text-gray-500" ) }
                                                            onClick={() => {
                                                                setEliminar(true)
                                                                setEditar(false)
                                                            }}
                                                            // onClick={() => { 
                                                            //     setErrorEditOrden("");
                                                            //     //console.log("btn cancelar orden reset postEditOrdenReset");
                                                            //     dispatch(postEditOrdenReset({hacerResetAInitialState: true}));
                                                            //     setModalOpen(false); 
                                                            //     setOpenModalEliminar(true); 
                                                            // }}
                                                        />
                                                    </div>
                                                :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col pt-2 pb-8 px-8">
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Folio</p>
                                        <p className="text-sm">{ordenCap.folio}</p>
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Validez</p>
                                        <p className="text-sm">{ordenCap.Validez}</p>
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Instrucción</p>
                                        <p className="text-sm">{ordenCap.Instruccion}</p>
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Tipo</p>
                                        <p className="text-sm">{ordenCap.tipoorden}</p>
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Títulos</p>
                                        {
                                            editar && ordenCap.puedeCancelar === true ? 
                                                <input 
                                                    type="number" 
                                                    className="text-sm flex justify-end text-right w-5/12 border-1 border-gray-300 bg-gray-200 rounded px-2" 
                                                    value={titulos} 
                                                    onChange={(e: any) => sendTitulos(e.currentTarget.value)} 
                                                /> 
                                            : 
                                                <p className="text-sm flex justify-end">{ordenCap.titulos}</p>
                                        }
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Precio</p>
                                        {
                                            editar && ordenCap.puedeCancelar === true ? 
                                                <input 
                                                    type="number" 
                                                    className="text-sm flex justify-end text-right w-5/12 border-1 border-gray-300 bg-gray-200 rounded px-2" 
                                                    value={precio} 
                                                    onChange={(e: any) => sendPrice(e.currentTarget.value)} 
                                                /> 
                                            : 
                                                <p className="text-sm flex justify-end">{ordenCap.precio}</p>
                                        }
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Monto</p>
                                        <p className="text-sm">{ordenCap.monto}</p>
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Estatus</p>
                                        <p className="text-sm">{ordenCap.estatusDesc}</p>
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                    <div className=" flex justify-between py-1">
                                        <p className="text-sm text-gray-400">Origen</p>
                                        <p className="text-sm">{ordenCap.origen}</p>
                                    </div>
                                    <hr className="solid bg-gray-500" />
                                </div>
                                {
                                    errorEditOrden.length > 0 && <div className="flex flex-row px-8 pb-2">
                                        <div className="w-3/24">
                                            <p className="font-bold text-red-500 text-xs pr-2">Error al editar:</p>
                                        </div>
                                        <div className="w-21/24">
                                            <p className="text-xs text-gray-800">{parse(errorEditOrden)}</p>
                                        </div>
                                    </div>
                                }
                                <div className=" w-full pb-6 px-8 ">
                                    {
                                        ordenCap.puedeCancelar === true ? 
                                            <>
                                            {
                                                editar ?
                                                <>
                                                    <button 
                                                        type="submit" 
                                                        className="bg-red-600 w-full p-1 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                                        onClick={editarOrdenes}
                                                    >
                                                        Guardar cambios
                                                    </button>
                                                    <button className="w-full p-1 my-2 bg-gray-100 text-xs text-gray-900 border-1  hover:bg-gray-300 rounded-md" 
                                                        onClick={() => {
                                                            setErrorEditOrden("");
                                                            //console.log("tachita close reset postEditOrdenReset");
                                                            ordenCap.puedeCancelar === true && dispatch(postEditOrdenReset({hacerResetAInitialState: true}));
                                                            setModalOpen(false);
                                                        }}
                                                    >
                                                        Cancelar
                                                    </button> 
                                                </>
                                                : "" }
                                               { eliminar ?
                                                    <>
                                                        <button 
                                                            type="submit" 
                                                            className="bg-red-600 w-full p-1 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                                            onClick={() => { 
                                                                setErrorEditOrden("");
                                                                //console.log("btn cancelar orden reset postEditOrdenReset");
                                                                dispatch(postEditOrdenReset({hacerResetAInitialState: true}));
                                                                setModalOpen(false); 
                                                                setOpenModalEliminar(true); 
                                                            }}
                                                        >
                                                            Eliminar orden
                                                        </button>
                                                        <button className="w-full p-1 my-2 bg-gray-100 text-xs text-gray-900 border-1  hover:bg-gray-300 rounded-md" 
                                                            onClick={() => {
                                                                setErrorEditOrden("");
                                                                //console.log("tachita close reset postEditOrdenReset");
                                                                ordenCap.puedeCancelar === true && dispatch(postEditOrdenReset({hacerResetAInitialState: true}));
                                                                setModalOpen(false);
                                                            }}
                                                        >
                                                            Cancelar
                                                        </button> 
                                                    </>
                                                : ""
                                             }
                                                
                                                
                                            </>
                                        : 
                                            <div></div>
                                    }
                                </div>
                            </div>
                    }
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
        editOrdenState: store.editOrden,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        postEditOrdenRequest: () => dispatch(postEditOrdenRequest(dispatch)),
        postEditOrdenReset: () => dispatch(postEditOrdenReset(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalModificarOrden);