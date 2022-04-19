import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import parse, { HTMLReactParserOptions } from "html-react-parser";

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';

import MenuPerfil from '../../containers/perfil/MenuPerfil';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { GetEmailState } from '../../types/GetEmailType';
import { RootState } from '../../reducers/rootReducer';
import { getEmailRequest } from '../../actions/getEmailAction';
import Sidebar from '../Sidebar';
import { putEmailRequest } from '../../actions/putEmailAction';
import { PutEmailState } from '../../types/PutEmailType';
import Loading from '../Loading';
import { postEmailRequest } from '../../actions/postEmailAction';
import { PostEmailState } from '../../types/PostEmailType';
import { FooterComponent } from '../../containers/FooterComponent';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';


interface propsFromState {
    loginObject: LoginObjectState;
    getEmailRespuesta: GetEmailState;
    putEmailRespuesta: PutEmailState;
    postEmailRespuesta: PostEmailState,
}

type AllProps = propsFromState;

const Email: React.FC<AllProps> = ({ loginObject, getEmailRespuesta, putEmailRespuesta, postEmailRespuesta }) => {
    console.log("entro a pag de cambiar-email");
    
    const history = useHistory();
    const dispatch = useDispatch();

    //HOOKS - datos para el dispatch
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);

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

    //HOOKS - para el front
    const [errorDatosDispatch, setErrorDatosDispatch] = useState("");
    const [pasoUnoTerminado, setPasoUnoTerminado] = useState(false);
    const [postTerminado, setPostTerminado] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [emailActual, setEmailActual] = useState("");
    const [errorApiEmailGet, setErrorApiEmailGet] = useState("");
    
    const [inputCorreoElectronico, setInputCorreoElectronico] = useState("");

    const [mensajePUT, setMensajePUT] = useState("");
    const [errorNumPUT, setErrorNumPUT] = useState(0);

    const [inputCodigoVerificacion, setInputCodigoVerificacion] = useState("");

    const [mensajePOST, setMensajePOST] = useState("");
    const [errorNumPOST, setErrorNumPOST] = useState(0);
    const [estatusPOST, setEstatusPOST] = useState(false);

    const sendErrorDatosDispatch = (data: string) => {
        if(errorDatosDispatch === data){
            return;
        }
        setErrorDatosDispatch(data);
    };

    const sendPasoUnoTerminado = (data: boolean) => {
        if(pasoUnoTerminado === data){
            return;
        }
        setPasoUnoTerminado(data);
    }

    const sendPostTerminado = (data: boolean) => {
        if(postTerminado === data){
            return;
        }
        setPostTerminado(data);
    }

    const sendEmailActual = (data: string) => {
        if(emailActual === data){
            return;
        }
        setEmailActual(data);
    };

    const sendErrorApiEmailGet = (data: string) => {
        if(errorApiEmailGet === data){
            return;
        }
        setErrorApiEmailGet(data);
    };

    const sendInputCorreoElectronico = (data: string) => {
        if(inputCorreoElectronico === data){
            return;
        }
        setInputCorreoElectronico(data);
    };

    const sendMensajePUT = (data: string) => {
        if(mensajePUT === data){
            return;
        }
        setMensajePUT(data);
    };

    const sendErrorNumPUT = (data: number) => {
        if(errorNumPUT === data){
            return;
        }
        setErrorNumPUT(data);
    };

    const sendMensajePOST = (data: string) => {
        if(mensajePOST === data){
            return;
        }
        setMensajePOST(data);
    };

    const sendErrorNumPOST = (data: number) => {
        if(errorNumPOST === data){
            return;
        }
        setErrorNumPOST(data);
    };

    const sendEstatusPOST = (data: boolean) => {
        if(estatusPOST === data){
            return;
        }
        setEstatusPOST(data);
    };

    const sendInputCodigoVerificacion = (data: string) => {
        if(inputCodigoVerificacion === data){
            return;
        }
        setInputCodigoVerificacion(data);
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
            
                    let params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];

                    sendCtaCtoDispatch(cuentaLO);
                    sendParamsDispatch(params);
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
            //borramos el errorDatosDispatch y los demas errores
            sendErrorDatosDispatch("");
            sendErrorApiEmailGet("");
            sendErrorNumPOST(0);
            sendErrorNumPUT(0);
            sendMensajePUT("");
            sendMensajePOST("");

            let message = "email";
            let params = paramsDispatch;

            let a = { message, params };

            //mandamos llamar este dispatch si no hay datos en el store
            if(getEmailRespuesta != undefined){
                if(getEmailRespuesta.message.length > 0 && getEmailRespuesta.loading === false){
                    if(getEmailRespuesta.getEmailRespuesta != undefined){
                        if(getEmailRespuesta.getEmailRespuesta.email != undefined){
                            if(getEmailRespuesta.getEmailRespuesta.email.length > 0){
                                //hay datos en el store, no mandamos llamar el dispatch, 
                                //hacemos return para que no se mande llamar
                                return;
                            }
                        }
                    }
                }
            }

            //si llegamos a esta linea, podemos hacer el dispatch
            dispatch(getEmailRequest(a));
        }
        else{
            //no hay params o ctacto para el dispatch por alguna razon
            console.log("error datos dispatch en Email");
            sendErrorDatosDispatch("Ocurrió un error con el servicio, por favor intenta más tarde.");
        }
    }, [ctaCtoDispatch, paramsDispatch]);

    useEffect(() => {
        if(getEmailRespuesta != undefined){
            if(getEmailRespuesta.message.length > 0 && getEmailRespuesta.loading === false){
                if(getEmailRespuesta.getEmailRespuesta != undefined){
                    if(getEmailRespuesta.getEmailRespuesta.ierror === 0){
                        if(getEmailRespuesta.getEmailRespuesta.email.length > 0){
                            //no hay error
                            sendEmailActual(getEmailRespuesta.getEmailRespuesta.email);
                            
                            //borramos los errores relacionados con las apis
                            sendErrorApiEmailGet("");
                            
                            return;
                        }
                    }
                    else{
                        //error del api
                        sendErrorApiEmailGet(getEmailRespuesta.getEmailRespuesta.cerror);
                        
                        //borramos los otros errores relacionados con las apis
                        sendErrorNumPOST(0);
                        sendErrorNumPUT(0);
                        sendMensajePUT("");
                        sendMensajePOST("");
    
                        return;
                    }
                }
            }
            else{
                //no se ha mandado llamar la api
                return;
            }
        }

        //si no hizo return en alguno de los ifs, ponemos este error
        sendErrorApiEmailGet("Ocurrió un error en el servicio, por favor intenta más tarde.");
    }, [getEmailRespuesta?.message, getEmailRespuesta?.loading]);

    useEffect(() => {
        if(putEmailRespuesta != undefined){
            if(putEmailRespuesta.message.length > 0 && putEmailRespuesta.loading === false){
                if(putEmailRespuesta.putEmailRespuesta != undefined){
                    if(putEmailRespuesta.putEmailRespuesta.ierror != undefined){
                        //guardamos mensaje y error del PUT
                        sendMensajePUT(putEmailRespuesta.putEmailRespuesta.cerror);
                        sendErrorNumPUT(putEmailRespuesta.putEmailRespuesta.ierror);
                        
                        return;
                    }
                }
            }
            else{
                //no se ha mandado llamar la api
                return;
            }
        }

        //no entro al if del return
        sendMensajePUT("Ocurrió un error con el servicio, por favor intenta más tarde.");
        sendErrorNumPUT(-1);
    }, [putEmailRespuesta?.message, putEmailRespuesta?.loading]);

    useEffect(() => {
        if(postEmailRespuesta != undefined){
            if(postEmailRespuesta.message.length > 0 && postEmailRespuesta.loading === false){
                if(postEmailRespuesta.postEmailRespuesta != undefined){
                    if(postEmailRespuesta.postEmailRespuesta.cerror != undefined){
                        sendErrorNumPOST(postEmailRespuesta.postEmailRespuesta.ierror);
                        sendMensajePOST(postEmailRespuesta.postEmailRespuesta.cerror);
                        sendEstatusPOST(postEmailRespuesta.postEmailRespuesta.estatus);
                        
                        return;
                    }
                }
            }
            else{
                //no se ha mandado llamar la api
                return;
            }
        }

        //no hizo return
        sendErrorNumPOST(-1);
        sendMensajePOST("Ocurrió un error con el servicio, por favor intenta más tarde.");
        sendEstatusPOST(false);
    }, [postEmailRespuesta?.message, postEmailRespuesta?.loading]);

    const cambiarCorreoElectronico = () => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            
            let message = "email?email=" + inputCorreoElectronico.trim();
            let params = paramsDispatch;

            let a = { message, params };
            dispatch(putEmailRequest(a));

            sendPasoUnoTerminado(true);
        }
    };

    const enviarCodigoVerif = () => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            let message = "email?clave=" + inputCodigoVerificacion;
            let params = paramsDispatch;

            let a = { message, params };
            dispatch(postEmailRequest(a));

            sendPostTerminado(true);
        }
    }

    const buttonMenu = (e: any) =>  {
        e.preventDefault();
        setShowMenu(!showMenu)
    }

    const FormAgregarCorreo = (
        getEmailRespuesta.loading === true ?
            <Loading />
        :
            <div className="form">
                <form action="#">
                    <div className="inputs flex justify-between flex-column">
                        <div className="flex justify-between items-center w-100 pr-5 mb-6">
                            <label htmlFor="" className="font-sans font-bold text-sm">Nuevo correo electrónico</label>
                            <input 
                                disabled={errorDatosDispatch.length > 0 || errorApiEmailGet.length > 0} 
                                onChange={(evento: any) => sendInputCorreoElectronico(evento.currentTarget.value)} 
                                value={inputCorreoElectronico} 
                                placeholder="correo@correo.com" 
                                required 
                                type="email" 
                                className="font-sans p-2 text-sm w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent" />
                        </div>
                        <div className='flex flex-col pr-5'>
                            {
                                (/^[a-zA-Z0-9.\_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/).test(inputCorreoElectronico) === false && <p className="text-right my-2 text-sm text-red-100 font-bold">{inputCorreoElectronico} no es un correo electrónico válido.</p>
                            }
                            {
                                inputCorreoElectronico.trim() === emailActual && <p className="text-right my-2 text-sm text-red-100 font-bold">El correo {emailActual} ya está registrado como tu correo.</p>
                            }
                            {
                                errorDatosDispatch.length > 0 && <p className="text-right my-2 text-sm text-red-100 font-bold">{errorDatosDispatch}</p>
                            }
                            {
                                errorApiEmailGet.length > 0 && <p className="text-right my-2 text-sm text-red-100 font-bold">{parse(errorApiEmailGet)}</p>
                            }
                        </div>                                    
                    </div>
                    
                    <div className="flex justify-end mt-10 pr-5">
                        <NavLink to="/perfil">
                            <div className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                <p>Cancelar</p>
                            </div>
                        </NavLink>
                        {
                            /* si tenemos un error con los datos para los dispatch, deshabilitamos el btn de Agregar */
                            errorDatosDispatch.length > 0 ?
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Agregar
                                </button>
                            /* si el correo ingresado es igual al correo actual, deshabilitamos el btn de Agregar */
                            : inputCorreoElectronico.trim() === emailActual ? 
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Agregar
                                </button>
                            /* si inputCorreoElectronico no tiene formato de mail, deshabilitamos el btn de Agregar */
                            : (/^[a-zA-Z0-9.\_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/).test(inputCorreoElectronico) === false ?
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Agregar
                                </button>
                            /* si inputCorreoElectronico si tiene formato de mail, habilitamos el btn de Agregar */
                            : (/^[a-zA-Z0-9.\_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/).test(inputCorreoElectronico) === true ?
                                <button 
                                    onClick={cambiarCorreoElectronico}
                                    className="w-44 ml-6 bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                >
                                    Agregar
                                </button>
                            :
                            /* si todas las validaciones pasadas son false, deshabilitamos el btn de Agregar */
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Agregar
                                </button>
                        }
                    </div>
                </form>
            </div>
    );

    const FormIntroducirCodigoVerif = (
        putEmailRespuesta.loading === true ?
            <Loading />
        :
            <div className="form">
                {
                    errorNumPUT === 0 && <p className="p-2 my-2 text-sm">{parse(mensajePUT)}</p>
                }
                <form action="#">
                    <div className="inputs flex justify-between flex-column">
                        <div className="flex justify-between items-center w-100 pr-5 mb-6">
                            <label htmlFor="" className="font-sans font-bold text-sm">Clave de verificacion</label>
                            <div className="flex flex-col p-2">
                                <input 
                                    disabled={errorDatosDispatch.length > 0 || errorNumPUT != 0} 
                                    onChange={(evento: any) => sendInputCodigoVerificacion(evento.currentTarget.value)} 
                                    value={inputCodigoVerificacion} 
                                    placeholder="Introduce el código de verificación" 
                                    required 
                                    type="input" 
                                    className="font-sans p-2 text-sm mb-2 w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent" />
                                {
                                    errorDatosDispatch.length > 0 && <p className="my-2 text-sm text-red-100 font-bold">{errorDatosDispatch}</p>
                                }
                                {
                                    errorNumPUT != 0 && <p className="my-2 text-sm text-red-100 font-bold">{parse(mensajePUT)}</p>
                                }
                            </div>
                        </div>                                          
                    </div>
                    
                    <div className="flex justify-end mt-10 pr-5">
                        <NavLink to="/perfil">
                            <div className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                <p>Cancelar</p>
                            </div>
                        </NavLink>
                        {
                            /* si inputCodigoVerificacion no tiene caracteres, deshabilitamos el btn de Aceptar */
                            inputCodigoVerificacion.length === 0 ?
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Aceptar
                                </button>
                            : 
                            /* si inputCodigoVerificacion tiene 1 o mas caracteres, habilitamos el btn de Aceptar */
                                <button 
                                    onClick={enviarCodigoVerif}
                                    className="w-44 ml-6 bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                >
                                    Aceptar
                                </button>
                        }
                    </div>
                </form>
            </div>
    );

    const FormPostTerminado = (
        postEmailRespuesta.loading === true ? 
            <Loading />
        :
            <div className="w-full">
                {
                    errorNumPOST === 0 && <p className="p-2 my-2 text-sm">{parse(mensajePOST)}</p>
                }
                <div className="inputs flex justify-between flex-column">
                    <div className="flex justify-between items-center w-100 pr-5 mb-6">
                        {
                            errorDatosDispatch.length > 0 && <p className="p-2 my-2 text-sm text-red-100 font-bold">{errorDatosDispatch}</p>
                        }
                        {
                            errorNumPOST != 0 && <p className="p-2 my-2 text-sm text-red-100 font-bold">{parse(mensajePOST)}</p>
                        }
                    </div>                                          
                </div>
                
                <div className="flex justify-end mt-10 pr-5">
                    <NavLink to="/perfil">
                        <div className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                            <p>Regresar a Datos Personales</p>
                        </div>
                    </NavLink>
                </div>
            </div>
    );

    let childrenContentIzquierda = (
        <>
            <MenuPerfil />
        </>
    );

    let childrenContentPrincipal = (
        <>
            <div className="content">
                <div className="title my-4">
                    <h2 className="font-medium text-lg pb-2 border-b border-gray-300">Email</h2>
                </div>
                {
                    /* si pasoUnoTerminado === false, seguimos en el paso para agregar el correo */
                    pasoUnoTerminado === false ?
                        FormAgregarCorreo
                    /* si llegamos a esta condicion, quiere decir que pasoUnoTerminado === true */
                    /* si postTerminado === false, seguimos en el paso para introducir el codigo de verif */
                    : postTerminado === false ?
                        FormIntroducirCodigoVerif
                    :
                    /* si llegamos a esta condicion, quiere decir que postTerminado === true */
                        FormPostTerminado
                }
            </div>
        </>
    )
    
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
        putEmailRespuesta: store.putEmailRespuesta,
        postEmailRespuesta: store.postEmailRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getEmailRequest: () => dispatch(getEmailRequest(dispatch)),
        putEmailRequest: () => dispatch(putEmailRequest(dispatch)),
        postEmailRequest: () =>dispatch(postEmailRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);