import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';
import { FooterComponent } from '../../containers/FooterComponent';

import MenuPerfil from '../../containers/perfil/MenuPerfil';
import { 
    MdAccountBalance,
    MdPerson,
    MdClose,
    MdModeEdit,
    MdGroupAdd
} from "react-icons/md";
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { RootState } from '../../reducers/rootReducer';
import { getEmailRequest } from '../../actions/getEmailAction';
import { GetEmailState } from '../../types/GetEmailType';
import { GetCelularState } from '../../types/GetCelularType';
import { getCelularRequest } from '../../actions/getCelularAction';
import { GetDepositoBancosState } from '../../types/GetDepositoBancosType';
import { getDepositoBancosRequest } from '../../actions/getDepositoBancosAction';
import * as apiCall from './../../constants';
import PageLayout from '../../containers/layout/PageLayout';
import { MdOutlineEmail } from "react-icons/md";
import { postLoginObjectLogout } from '../../actions/loginObjectAction'

interface propsFromState {
    loginObject: LoginObjectState;
    getEmailRespuesta: GetEmailState;
    getCelularRespuesta: GetCelularState;
    depositoBancosRespuesta: GetDepositoBancosState
}

type AllProps = propsFromState;

const Perfil: React.FC<AllProps> = ({loginObject, getEmailRespuesta, getCelularRespuesta,depositoBancosRespuesta}) => {
    console.log("entro a pag de Perfil");

    const history = useHistory();
    const dispatch = useDispatch();
    const cuentaRef = useRef("");
    const idRef = useRef("");
    const tokenRef = useRef("");
    const canalRef = useRef("");

    //HOOKS - datos para el dispatch
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ready, setReady] = useState(false);

    const sendCtaCtoDispatch = (data: string) => {
        if(ctaCtoDispatch === data){
            return;
        }
        setCtaCtoDispatch(data);
    };

    const sendParamsDispatch = (data: string[]) => {
        if(paramsDispatch === data){
            return;
        }
        setParamsDispatch(data);
    }

    //HOOKS - labels en el front
    const [emailLabel, setEmailLabel] = useState("");
    const [errorEmailLabel, setErrorEmailLabel] = useState("");
    const [celularLabel, setCelularLabel] = useState("");
    const [errorCelularLabel, setErrorCelularLabel] = useState("");
    const [cuentaClabe, setCuentaClabe] = useState("");

    const sendEmailLabel = (data: string) => {
        if(emailLabel === data){
            return;
        }
        setEmailLabel(data);
    };

    const sendErrorEmailLabel = (data: string) => {
        if(errorEmailLabel === data){
            return;
        }
        setErrorEmailLabel(data);
    };

    const sendCelularLabel = (data: string) => {
        if(celularLabel === data){
            return;
        }
        setCelularLabel(data);
    };

    const sendErrorCelularLabel = (data: string) => {
        if(errorCelularLabel === data){
            return;
        }
        setErrorCelularLabel(data);
    };
    const sendCuentaClabe = (data: string) => {
        if(cuentaClabe === data){
            return;
        }
        setCuentaClabe(data);
    };
    useEffect(() => {
        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                    cuentaRef.current = cuentaLO;
                    tokenRef.current = tokenLO;
                    canalRef.current = canal;
                    idRef.current = idLO.toString();
                    let params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    sendCtaCtoDispatch(cuentaLO);
                    sendParamsDispatch(params);
                    setReady(true);
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en portfolio, lo mandamos al login");
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
    },[]);

    /* cuando cambian los datos para el dispatch, hacemos llamadas al dispatch */
    useEffect(() => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            let message = "email";
            let params = paramsDispatch;

            let a = { message, params };
            dispatch(getEmailRequest(a));

            message = "celular";
            a = { message, params };
            dispatch(getCelularRequest(a));
        }
    }, [ctaCtoDispatch, paramsDispatch]);
    useEffect(() => {
        if(cuentaRef.current.length > 0){
            let refresh = "no"
            let message = "teso/depositobancos?cuenta=" + cuentaRef.current;
            let params = [canalRef.current, cuentaRef.current, tokenRef.current, idRef.current, refresh ]
            let a = { message, params };
            dispatch(getDepositoBancosRequest(a)); 
        }
    }, [cuentaRef]);
    useEffect(() => {
        //console.log("deposito bancos respuesta useEffect");
        //console.log(depositoBancosRespuesta);
        if(depositoBancosRespuesta != undefined){
            if(depositoBancosRespuesta.message.length > 0 && depositoBancosRespuesta.loading === false){
                if(depositoBancosRespuesta.depositoBancosRespuesta != undefined){
                    if(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito != undefined){
                        if(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito.tdsTradeData.length > 0){
                            //hay datos en tds trade data
                            sendCuentaClabe(depositoBancosRespuesta.depositoBancosRespuesta.dsDeposito.tdsTradeData[0].clabe);
                        }
                    }
                }
            }
        }
    }, [depositoBancosRespuesta?.message, depositoBancosRespuesta?.loading]);

    useEffect(() => {
        if(!getEmailRespuesta.loading && ready){
            if(getEmailRespuesta.getEmailRespuesta !== undefined){
                if(getEmailRespuesta.getEmailRespuesta.ierror === 0){
                    if(getEmailRespuesta.getEmailRespuesta.email.length > 0){
                        sendEmailLabel(getEmailRespuesta.getEmailRespuesta.email);
                    }
                }
                else{
                    sendEmailLabel(getEmailRespuesta.getEmailRespuesta.cerror);
                }
            }
        }
    }, [getEmailRespuesta.loading]);

    useEffect(() => {
        if(getCelularRespuesta !== undefined){
            if(getCelularRespuesta.getCelularRespuesta != undefined){
                if(getCelularRespuesta.getCelularRespuesta.ierror === 0){
                    if(getCelularRespuesta.getCelularRespuesta.celular.length > 0){
                        sendCelularLabel(getCelularRespuesta.getCelularRespuesta.celular);
                    }
                }
                else{
                    sendErrorCelularLabel(getCelularRespuesta.getCelularRespuesta.cerror);
                }
            }
        }
    }, [getCelularRespuesta]);

    let childrenContentIzquierda = (
        <>
            <MenuPerfil />
        </>
    );

    let childrenContentPrincipal = (
        <>
            <div id="clabe-vector" className="my-4">
                <h2 className="font-medium text-lg pb-2 border-b border-gray-300">Cuenta Clabe Vector</h2>
                <p className="my-2 text-sm">{cuentaClabe}</p>
            </div>
            <div id="contrato" className="mb-4">
                <h2 className="font-medium text-lg pb-2 border-b border-gray-300">Contrato</h2>
                <p className="my-2 text-sm">{ctaCtoDispatch}</p>
            </div>

            {/*<div id="cuentas" className="mb-4">
                <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Cuentas Bancarias</h2>
                <div className="flex justify-between my-2 border-b-2 border-gray-300 pb-2 items-center">
                    <div className="flex">
                        <div>
                            <MdAccountBalance className="icon mt-0 ml-0 mr-2" style={{color: "#999", width: "24px"}} />
                        </div>
                        <div className="mt-1">
                            <p className="text-sm flex items-center font-medium"> BBVA BANCOMER</p>
                            <p className="text-sm mt-2">**** **** **** 1234</p>
                        </div>
                    </div>
                    <div>
                        <button 
                            data-toggle="toggle" 
                            className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                    <div className="w-17/24 my-10">
                            <div className="title mb-10">
                                <h2 id="divRef" className="font-mono font-medium text-3xl">Datos Personales</h2>
                            </div>
                            <div id="clabe-vector" className="mb-4">
                                <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Cuenta Clabe Vector</h2>
                                <p className="my-2 text-sm">{cuentaClabe}</p>
                            </div>
                            <div id="contrato" className="mb-4">
                                <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Contrato</h2>
                                <p className="my-2 text-sm">{ctaCtoDispatch}</p>
                            </div>
                </div>
                <div className="flex justify-between my-2 border-b-2 border-gray-300 pb-2 items-center">
                    <div className="flex">
                        <div>
                            <MdAccountBalance className="icon mt-0 ml-0 mr-2" style={{color: "#999", width: "24px"}} />
                        </div>
                        <div className="mt-1">
                            <p className="text-sm flex items-center font-medium"> SANTANDER</p>
                            <p className="text-sm mt-2">**** **** **** 1234</p>
                        </div>
                    </div>
                    <div>
                        <button 
                            data-toggle="toggle" 
                            className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
                <div className="flex justify-between my-2 border-b-2 border-gray-300 pb-2 items-center">
                    <div className="flex">
                        <div>
                            <MdAccountBalance className="icon mt-0 ml-0 mr-2" style={{color: "#999", width: "24px"}} />
                        </div>
                        <div className="mt-1 text-gray-400">
                            <p className="text-sm flex items-center font-medium"> SANTANDER</p>
                            <p className="text-sm mt-2">**** **** **** 1234</p>
                        </div>
                    </div>
                    <div>
                        <button
                            disabled
                            data-toggle="toggle" 
                            className="bg-gray-600 py-2 px-14 text-xs text-gray-100 border-1 border-gray-600 rounded cursor-default"
                        >
                            En autorización
                        </button>
                    </div>
                </div>
                <div className="flex items-center cursor-pointer">
                    <MdAccountBalance className="icon mt-0 mb-0 ml-0 mr-3" style={{color: "#FF5000", width: "24px"}} />
                    <a href="/agregar-cuenta-bancaria" className="font-medium text-red-600 text-sm">Agregar nueva cuenta</a>
                </div>
            </div>*/}

            <div id="psec" className="mb-4">
                <div className='flex border-b border-gray-300'>
                    <h2 className="font-medium text-lg pb-2">Pregunta secreta</h2>
                    <NavLink to="/pregunta-secreta">
                        <MdModeEdit className="text-gray-500 mx-2 text-xl cursor-pointer hover:text-red-600" />
                    </NavLink>
                </div>
                <div className="flex items-center justify-between my-2">
                    <p className="text-sm">***************</p>
                </div>
            </div>

            <div id="pwd" className="mb-4">
                <div className='flex border-b border-gray-300'>
                    <h2 className="font-medium text-lg pb-2">Contraseña</h2>
                    <NavLink to="/cambiar-contrasena">
                        <MdModeEdit className="text-gray-500 mx-2 text-xl cursor-pointer hover:text-red-600" />
                    </NavLink>
                </div>
                <div className="flex items-center justify-between my-2">
                    <p className="text-sm">***************</p>
                </div>
            </div>

            <div id="mail" className="mb-4">
                <div className='flex border-b border-gray-300'>
                    <h2 className="font-medium text-lg pb-2">Email</h2>
                    {
                        emailLabel !== "" ?
                            <NavLink to="/cambiar-email">
                                <MdModeEdit className="text-gray-500 mx-2 text-xl cursor-pointer hover:text-red-600" />
                            </NavLink>
                        : ""
                    }
                </div>
                <div className="flex items-center justify-between my-2">
                    {
                        errorEmailLabel.length > 0 ?
                            <p className="my-2 text-sm text-red-100 font-bold">{errorEmailLabel}</p>
                        :

                            !getEmailRespuesta.loading && ready ?
                                emailLabel !== "" ?
                                    <p className="my-2 text-sm">{emailLabel}</p>
                                :
                                <NavLink to="/cambiar-email">
                                    <div className="flex mt-1 mb-3 items-center cursor-pointer">
                                        <span><MdOutlineEmail className="text-red-600 text-2xl"/></span> <span className="text-sm px-2 text-red-600 text-center font-xl">Agregar email</span>
                                    </div>
                                </NavLink>
                            : ""
                    }
                </div>
            </div>

            <div id="celular" className="mb-4">
                <div className='flex border-b border-gray-300'>
                    <h2 className="font-medium text-lg pb-2">Número de Celular</h2>
                    <NavLink to="/cambiar-celular">
                        <MdModeEdit className="text-gray-500 mx-2 text-xl cursor-pointer hover:text-red-600" />
                    </NavLink>
                </div>
                <div className="flex items-center justify-between my-2">
                    {
                        errorCelularLabel.length > 0 ?
                            <p className="my-2 text-sm text-red-100 font-bold">{errorCelularLabel}</p>
                        :
                            <p className="my-2 text-sm">{celularLabel}</p>
                    }
                </div>
            </div>

            {/*<div id="beneficiario" className="mb-4">
                <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Beneficiarios</h2>
                <div className="flex items-center justify-between my-2">
                    <div className="my-2">
                        <p className="text-sm">Tu lista de beneficiarios se encuentra vacía.</p>
                        <p className="my-2 text-sm">Será la(s) persona(s) que tendrá(n) derecho a reclamar el monto total o parcial invertido en caso de una evntualidad.</p>
                    </div>
                    <div>
                        <a  
                            href="/agregar-beneficiario"
                                data-toggle="toggle" 
                                className="bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                            >
                            Agregar
                        </a>
                    </div>
                </div>
            </div>*/}

            {/*<div id="" className="mb-4">
                <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Beneficiarios</h2>
                <div className="flex justify-between my-2 border-b-2 border-gray-300 pb-2 items-center">
                    <div className="flex items-start">
                        <div>
                            <MdPerson className="icon mt-2 ml-0 mr-2" style={{color: "#999", width: "24px"}} />
                        </div>
                        <div className="mt-1">
                            <div className="flex items-end">
                                <p className="text-sm font-medium">Ricardo Hernández Sánchez</p>
                                <a href="/agregar-beneficiario">
                                    <MdModeEdit className="icon mt-0 ml-0 ml-2 mb-0" style={{color: "#999", width: "24px"}} />
                                </a>
                            </div>
                            <p className="text-sm">14/05/1992</p>
                            <p className="text-sm">Calle Nombre 1234 Int 5 Cuajimalpa de Morelos CDMX 05200</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <p className="font-medium">80%</p>
                            <MdClose className="icon mt-0 ml-0 ml-6 mb-0 cursor-pointer" style={{color: "#999", width: "20px"}} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between my-2 border-b-2 border-gray-300 pb-2 items-center">
                    <div className="flex items-start">
                        <div>
                            <MdPerson className="icon mt-2 ml-0 mr-2" style={{color: "#999", width: "24px"}} />
                        </div>
                        <div className="mt-1">
                            <div className="flex items-end">
                                <p className="text-sm font-medium">Nombre Apellido Apellido</p>
                                <a href="/agregar-beneficiario">
                                    <MdModeEdit className="icon mt-0 ml-0 ml-2 mb-0" style={{color: "#999", width: "24px"}} />
                                </a>
                            </div>
                            <p className="text-sm">20/11/1992</p>
                            <p className="text-sm">Calle Nombre 1234 Int 5 Cuajimalpa de Morelos CDMX 05200</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <p className="font-medium">20%</p>
                            <MdClose className="icon mt-0 ml-0 ml-6 mb-0 cursor-pointer" style={{color: "#999", width: "20px"}} />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-between items-center">
                    <a href="/agregar-beneficiario" className="flex items-center">
                        <MdGroupAdd className="icon mt-0 mb-0 ml-0 mr-3" style={{color: "#FF5000", width: "24px"}} />
                        <p className="font-medium text-red-600 text-sm">Agregar beneficiario</p>
                    </a>
                    <div>
                        <a href="/agregar-porcentaje" className="font-medium text-red-600 text-sm">Editar porcentajes</a>
                    </div>
                </div>

            </div>*/}
        </>
    );

    return(
        <PageLayout 
            childrenContentIzquierda={childrenContentIzquierda}
            childrenContentPrincipal={childrenContentPrincipal}
            titulo="Datos Personales"
        />
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        getEmailRespuesta: store.getEmailRespuesta,
        getCelularRespuesta: store.getCelularRespuesta,
        depositoBancosRespuesta: store.depositoBancosRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getEmailRequest: () => dispatch(getEmailRequest(dispatch)),
        getCelularRequest: () => dispatch(getCelularRequest(dispatch)),
        getDepositoBancosRequest: () => dispatch(getDepositoBancosRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);