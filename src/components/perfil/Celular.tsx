import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import parse, { HTMLReactParserOptions } from "html-react-parser";

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';

import MenuPerfil from '../../containers/perfil/MenuPerfil';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { GetCelularState } from '../../types/GetCelularType';
import { RootState } from '../../reducers/rootReducer';
import { getCelularRequest } from '../../actions/getCelularAction';
import Sidebar from '../Sidebar';
import { putCelularRequest } from '../../actions/putCelularAction';
import { PutCelularState } from '../../types/PutCelularType';
import Loading from '../Loading';
import { postCelularRequest } from '../../actions/postCelularAction';
import { PostCelularState } from '../../types/PostCelularType';
import { putCelularReenviaRequest } from '../../actions/putCelularReenviaAction';
import { PutCelularReenviaState } from '../../types/PutCelularReenviaType';
import { FooterComponent } from '../../containers/FooterComponent';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

interface propsFromState {
    loginObject: LoginObjectState;
    getCelularRespuesta: GetCelularState;
    putCelularRespuesta: PutCelularState;
    postCelularRespuesta: PostCelularState,
    putCelularReenviaRespuesta: PutCelularReenviaState;
}

type AllProps = propsFromState;

const Celular: React.FC<AllProps> = ({ loginObject, getCelularRespuesta, putCelularRespuesta, postCelularRespuesta, putCelularReenviaRespuesta }) => {
    console.log("entro a pag de cambiar-celular");
    
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
    const [celularActual, setCelularActual] = useState("");
    const [errorApiCelularGet, setErrorApiCelularGet] = useState("");
    
    const [inputCelular, setInputCelular] = useState("");

    const [mensajePUT, setMensajePUT] = useState("");
    const [errorNumPUT, setErrorNumPUT] = useState(0);

    const [mensajeReenvia, setMensajeReenvia] = useState("");
    const [errorNumReenvia, setErrorNumReenvia] = useState(0);

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

    const sendCelularActual = (data: string) => {
        if(celularActual === data){
            return;
        }
        setCelularActual(data);
    };

    const sendErrorApiCelularGet = (data: string) => {
        if(errorApiCelularGet === data){
            return;
        }
        setErrorApiCelularGet(data);
    };

    const sendInputCelular = (data: string) => {
        if(inputCelular === data){
            return;
        }
        setInputCelular(data);
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

    const sendMensajeReenvia = (data: string) => {
        if(mensajeReenvia === data){
            return;
        }
        setMensajeReenvia(data);
    }

    const sendErrorNumReenvia = (data: number) => {
        if(errorNumReenvia === data){
            return;
        }
        setErrorNumReenvia(data);
    }

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
            sendErrorApiCelularGet("");
            sendErrorNumPOST(0);
            sendErrorNumPUT(0);
            sendMensajePUT("");
            sendMensajePOST("");
            sendMensajeReenvia("");
            sendErrorNumReenvia(0);

            let message = "celular";
            let params = paramsDispatch;

            let a = { message, params };

            //mandamos llamar este dispatch si no hay datos en el store
            if(getCelularRespuesta != undefined){
                if(getCelularRespuesta.message.length > 0 && getCelularRespuesta.loading === false){
                    if(getCelularRespuesta.getCelularRespuesta != undefined){
                        if(getCelularRespuesta.getCelularRespuesta.celular != undefined){
                            if(getCelularRespuesta.getCelularRespuesta.celular.length > 0){
                                //hay datos en el store, no mandamos llamar el dispatch, 
                                //hacemos return para que no se mande llamar
                                return;
                            }
                        }
                    }
                }
            }

            //si llegamos a esta linea, podemos hacer el dispatch
            dispatch(getCelularRequest(a));
        }
        else{
            //no hay params o ctacto para el dispatch por alguna razon
            console.log("error datos dispatch en Celular");
            sendErrorDatosDispatch("Ocurrió un error con el servicio, por favor intenta más tarde.");
        }
    }, [ctaCtoDispatch, paramsDispatch]);

    useEffect(() => {
        if(getCelularRespuesta != undefined){
            if(getCelularRespuesta.message.length > 0 && getCelularRespuesta.loading === false){
                if(getCelularRespuesta.getCelularRespuesta != undefined){
                    if(getCelularRespuesta.getCelularRespuesta.ierror === 0){
                        if(getCelularRespuesta.getCelularRespuesta.celular.length > 0){
                            //no hay error
                            sendCelularActual(getCelularRespuesta.getCelularRespuesta.celular);
                            
                            //borramos los errores relacionados con las apis
                            sendErrorApiCelularGet("");
                            
                            return;
                        }
                    }
                    else{
                        //error del api
                        sendErrorApiCelularGet(getCelularRespuesta.getCelularRespuesta.cerror);
    
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
        sendErrorApiCelularGet("Ocurrió un error en el servicio, por favor intenta más tarde.");
    }, [getCelularRespuesta?.message, getCelularRespuesta?.loading]);

    useEffect(() => {
        if(putCelularRespuesta != undefined){
            if(putCelularRespuesta.message.length > 0 && putCelularRespuesta.loading === false){
                if(putCelularRespuesta.putCelularRespuesta != undefined){
                    if(putCelularRespuesta.putCelularRespuesta.ierror != undefined){
                        //guardamos mensaje y error del PUT
                        sendMensajePUT(putCelularRespuesta.putCelularRespuesta.cerror);
                        sendErrorNumPUT(putCelularRespuesta.putCelularRespuesta.ierror);
                            
                        //borramos los otros errores relacionados con las apis
                        sendErrorApiCelularGet("");
                        
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
    }, [putCelularRespuesta?.message, putCelularRespuesta?.loading]);

    useEffect(() => {
        if(putCelularReenviaRespuesta != undefined){
            if(putCelularReenviaRespuesta.message.length > 0 && putCelularReenviaRespuesta.loading === false){
                if(putCelularReenviaRespuesta.putCelularReenviaRespuesta != undefined){
                    if(putCelularReenviaRespuesta.putCelularReenviaRespuesta.ierror != undefined){
                        //guardamos mensaje y error del Reenvia
                        sendMensajeReenvia(putCelularReenviaRespuesta.putCelularReenviaRespuesta.cerror);
                        sendErrorNumReenvia(putCelularReenviaRespuesta.putCelularReenviaRespuesta.ierror);
                        
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
        sendMensajeReenvia("Ocurrió un error con el servicio, por favor intenta más tarde.");
        sendErrorNumReenvia(-1);
    }, [putCelularReenviaRespuesta?.message, putCelularReenviaRespuesta?.loading]);

    useEffect(() => {
        if(postCelularRespuesta != undefined){
            if(postCelularRespuesta.message.length > 0 && postCelularRespuesta.loading === false){
                if(postCelularRespuesta.postCelularRespuesta != undefined){
                    if(postCelularRespuesta.postCelularRespuesta.cerror != undefined){
                        sendErrorNumPOST(postCelularRespuesta.postCelularRespuesta.ierror);
                        sendMensajePOST(postCelularRespuesta.postCelularRespuesta.cerror);
                        sendEstatusPOST(postCelularRespuesta.postCelularRespuesta.estatus);
                        
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
    }, [postCelularRespuesta?.message, postCelularRespuesta?.loading]);

    const cambiarCelular = () => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            if(inputCelular.trim() === celularActual){
                // el usuario metio el mismo celular que ya tenia, no mandar llamar el api, mostrar mensaje de error
                
                return;
            }

            let message = "celular?celular=" + inputCelular.trim();
            let params = paramsDispatch;

            let a = { message, params };
            dispatch(putCelularRequest(a));

            sendPasoUnoTerminado(true);
        }
    };

    const reenviarCodigoAlCelular = () => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            let message = "celular/reenvia";
            let params = paramsDispatch;

            let a = { message, params };
            dispatch(putCelularReenviaRequest(a));
        }
    };

    const enviarCodigoVerif = () => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            let message = "celular?clave=" + inputCodigoVerificacion;
            let params = paramsDispatch;

            let a = { message, params };
            dispatch(postCelularRequest(a));

            sendPostTerminado(true);
        }
    }

    const buttonMenu = (e: any) =>  {
        e.preventDefault();
        setShowMenu(!showMenu)
    }

    const FormAgregarCelular = (
        getCelularRespuesta.loading === true ?
            <Loading />
        :
            <div className="form">
                <form action="#">
                    <div className="inputs flex justify-between flex-column">
                        <div className="flex justify-between items-center w-100 pr-5 mb-6">
                            <label htmlFor="" className="font-sans font-bold text-sm">Nuevo número celular</label>
                            <input 
                                disabled={errorDatosDispatch.length > 0 || errorApiCelularGet.length > 0} 
                                onChange={(evento: any) => sendInputCelular(evento.currentTarget.value)} 
                                value={inputCelular} 
                                placeholder="1234567890" 
                                required 
                                //type="celular" 
                                className="font-sans p-2 text-sm w-96 border-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent" />
                        </div>
                        <div className='flex flex-col pr-5'>
                            {
                                /^[0-9]{10}$/.test(inputCelular) === false && <div>
                                    <p className="text-right my-2 text-sm text-red-100 font-bold">{inputCelular} no es un número celular válido.</p>
                                    <p className="text-right my-2 text-sm text-red-100 font-bold">Deben ser 10 dígitos solamente.</p>
                                </div>
                            }
                            {
                                inputCelular.trim() === celularActual.trim() && <div>
                                    <p className="text-right my-2 text-sm text-red-100 font-bold">{inputCelular} es el número celular que ya tienes registrado.</p>
                                </div>
                            }
                            {
                                errorDatosDispatch.length > 0 && <p className="text-right my-2 text-sm text-red-100 font-bold">{errorDatosDispatch}</p>
                            }
                            {
                                errorApiCelularGet.length > 0 && <p className="text-right my-2 text-sm text-red-100 font-bold">{parse(errorApiCelularGet)}</p>
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
                            /* si inputCelular no tiene formato de numero, deshabilitamos el btn de Agregar */
                            : /^[0-9]{10}$/.test(inputCelular) === false ?
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Agregar
                                </button>
                            : inputCelular.trim() === celularActual.trim() ?
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Agregar
                                </button>
                            /* si inputCelular si tiene formato de numero, habilitamos el btn de Agregar */
                            : /^[0-9]{10}$/.test(inputCelular) === true ?
                                <button 
                                    onClick={cambiarCelular}
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
        putCelularRespuesta.loading === true ?
            <Loading />
        :
            <div className="form">
                {
                    errorNumPUT === 0 && <p className="py-2 my-2 text-sm">{parse(mensajePUT)}</p>
                }
                <div className="my-3 flex flex-row">
                    <p className="text-sm text-gray-500 font-bold mr-2">¿No recibiste la clave a tu celular ({inputCelular})?</p>
                    <button 
                        onClick={reenviarCodigoAlCelular}
                        className="font-sans text-red-600 text-sm font-bold mx-2 hover:underline"
                    >
                        Reenviar clave.
                    </button>
                </div>
                {
                    putCelularReenviaRespuesta.loading === true && <p className="my-1 text-sm text-gray-500">Reenviando clave...</p>
                }
                {
                    putCelularReenviaRespuesta.message.length > 0 && mensajeReenvia.length > 0 && errorNumReenvia === 0 && <p className="my-1 text-sm text-gray-500">{parse(mensajeReenvia)}</p>
                }
                {
                    putCelularReenviaRespuesta.message.length > 0 && mensajeReenvia.length > 0 && errorNumReenvia != 0 && <p className="my-1 text-sm text-red-100">Error al reenviar clave: {parse(mensajeReenvia)}</p>
                }
                <form action="#">
                    <div className="inputs flex justify-between flex-column">
                        <div className="flex justify-between items-center w-100 pr-5 mb-6">
                            <label htmlFor="" className="font-sans font-bold text-sm">Clave de confirmación</label>
                            <div className="flex flex-col p-2">
                                <input 
                                    disabled={errorDatosDispatch.length > 0 || errorNumPUT != 0} 
                                    onChange={(evento: any) => sendInputCodigoVerificacion(evento.currentTarget.value)} 
                                    value={inputCodigoVerificacion} 
                                    placeholder="Introduce la clave de confirmación" 
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
                            /* si errorNumReenvia no es 0, hubo un problema con el api de reenvia, deshabilitamos el btn de Aceptar */
                            errorNumReenvia != 0 ?
                                <button 
                                    disabled={true}
                                    className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                >
                                    Aceptar
                                </button>
                            /* si inputCodigoVerificacion no tiene caracteres, deshabilitamos el btn de Aceptar */
                            : inputCodigoVerificacion.length === 0 ?
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
        postCelularRespuesta.loading === true ? 
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
                    <h2 className="font-medium text-lg pb-2 border-b border-gray-300">Celular</h2>
                </div>
                {
                    /* si pasoUnoTerminado === false, seguimos en el paso para agregar el celular */
                    pasoUnoTerminado === false ?
                        FormAgregarCelular
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
        getCelularRespuesta: store.getCelularRespuesta,
        putCelularRespuesta: store.putCelularRespuesta,
        postCelularRespuesta: store.postCelularRespuesta,
        putCelularReenviaRespuesta: store.putCelularReenviaRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getCelularRequest: () => dispatch(getCelularRequest(dispatch)),
        putCelularRequest: () => dispatch(putCelularRequest(dispatch)),
        postCelularRequest: () => dispatch(postCelularRequest(dispatch)),
        putCelularReenviaRequest: () => dispatch(putCelularReenviaRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Celular);