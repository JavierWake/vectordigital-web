import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import parse from "html-react-parser";
import convertToAcentos from '../../utils/convertToAcentos';

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';

import MenuPerfil from '../../containers/perfil/MenuPerfil';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { RootState } from '../../reducers/rootReducer';
import Sidebar from '../Sidebar';
import Loading from '../Loading';
import { getPreguntaSecretaRequest, getPreguntaSecretaReset } from '../../actions/getPreguntaSecretaAction';
import { postPreguntaSecretaRequest } from '../../actions/postPreguntaSecretaAction';
import { CatPreguntaSecreta, GetPreguntaSecretaState } from '../../types/GetPreguntaSecretaType';
import { PostPreguntaSecretaState } from '../../types/PostPreguntaSecretaType';
import { Dropdown } from '../../containers/Dropdown';
import { FooterComponent } from '../../containers/FooterComponent';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

interface propsFromState {
    loginObject: LoginObjectState;
    getPreguntaSecretaRespuesta: GetPreguntaSecretaState;
    postPreguntaSecretaRespuesta: PostPreguntaSecretaState;
}

type AllProps = propsFromState;

const PreguntaSecreta: React.FC<AllProps> = ({ loginObject, getPreguntaSecretaRespuesta, postPreguntaSecretaRespuesta }) => {
    console.log("entro a pag de pregunta secreta");
    
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

    const [listaPS, setListaPS] = useState<CatPreguntaSecreta[]>([]);
    const [nombrePreguntaSeleccionada, setNombrePreguntaSeleccionada] = useState("Ninguna");
    const [idPreguntaSeleccionada, setIdPreguntaSeleccionada] = useState(0);

    const [inputRespuestaNueva, setInputRespuestaNueva] = useState("");

    const [errorMensajeGet, setErrorMensajeGet] = useState("");
    

    const [mensajePOST, setMensajePOST] = useState("");
    const [errorNumPOST, setErrorNumPOST] = useState(0);

    const [procesoTerminado, setProcesoTermiando] = useState(false);

    const sendProcesoTerminado = (data: boolean) => {
        if(procesoTerminado === data){
            return;
        }
        setProcesoTermiando(data);
    }

    const sendListaPS = (data: CatPreguntaSecreta[]) => {
        if(listaPS === data){
            return;
        }
        setListaPS(data);
    };

    const sendNombrePreguntaSeleccionada = (data: string) => {
        if(nombrePreguntaSeleccionada === data){
            return;
        }
        setNombrePreguntaSeleccionada(data);
    };

    const sendIdPreguntaSeleccionada = (data: number) => {
        if(idPreguntaSeleccionada === data){
            return;
        }
        setIdPreguntaSeleccionada(data);
    }

    const sendInputRespuestaNueva = (data: string) => {
        if(inputRespuestaNueva === data){
            return;
        }
        setInputRespuestaNueva(data);
    };

    const sendErrorDatosDispatch = (data: string) => {
        if(errorDatosDispatch === data){
            return;
        }
        setErrorDatosDispatch(data);
    };

    const sendErrorMensajeGet = (data: string) => {
        if(errorMensajeGet === data){
            return;
        }
        setErrorMensajeGet(data);
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

        return () => {
            //cuando se desmonta este componente, se va a ejecutar el código en este return
            console.log("unmount pregunta secreta");
            dispatch(getPreguntaSecretaReset({ hacerReset: true }));
        };

    },[]);

    /* cuando cambian los datos para el dispatch, hacemos llamadas al dispatch */
    useEffect(() => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            //borramos el errorDatosDispatch y los demas errores
            sendErrorDatosDispatch("");
            sendErrorMensajeGet("");
            sendErrorNumPOST(0);
            sendMensajePOST("");

            let message = "psecreta";
            let params = paramsDispatch;

            let a = { message, params };

            //hacer el dispatch
            dispatch(getPreguntaSecretaRequest(a));
        }
        else{
            //no hay params o ctacto para el dispatch por alguna razon
            console.log("error datos dispatch en Email");
            sendErrorDatosDispatch("Ocurrió un error con el servicio, por favor intenta más tarde.");
        }
    }, [ctaCtoDispatch, paramsDispatch]);

    useEffect(() => {
        if(getPreguntaSecretaRespuesta != undefined){
            if(getPreguntaSecretaRespuesta.message.length > 0 && getPreguntaSecretaRespuesta.loading === false){
                if(getPreguntaSecretaRespuesta.getPreguntaSecretaRespuesta != undefined){
                    if(getPreguntaSecretaRespuesta.getPreguntaSecretaRespuesta.ierror === 0){
                        //no hay error
                        if(getPreguntaSecretaRespuesta.getPreguntaSecretaRespuesta.dsPreguntaSecretas !== undefined){
                            if(getPreguntaSecretaRespuesta.getPreguntaSecretaRespuesta.dsPreguntaSecretas.catPreguntaSecreta.length > 0){
                                //hay preguntas, las guardamos para el select/dropdown
                                sendListaPS(getPreguntaSecretaRespuesta.getPreguntaSecretaRespuesta.dsPreguntaSecretas.catPreguntaSecreta);
                            }
                            else{
                                //escribimos el error
                                sendErrorMensajeGet(getPreguntaSecretaRespuesta.getPreguntaSecretaRespuesta.cerror);
                            }
                            return;
                        }
                    }
                    else{
                        //error del api
                        sendErrorMensajeGet(getPreguntaSecretaRespuesta.getPreguntaSecretaRespuesta.cerror);
                        
                        //borramos los otros errores relacionados con las apis
                        sendErrorNumPOST(0);
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
        sendErrorMensajeGet("Ocurrió un error en el servicio, por favor intenta más tarde.");
    }, [getPreguntaSecretaRespuesta?.message, getPreguntaSecretaRespuesta?.loading]);

    useEffect(() => {
        if(postPreguntaSecretaRespuesta != undefined){
            if(postPreguntaSecretaRespuesta.message.length > 0 && postPreguntaSecretaRespuesta.loading === false){
                sendInputRespuestaNueva("");
                sendProcesoTerminado(true);
                if(postPreguntaSecretaRespuesta.postPreguntaSecretaRespuesta != undefined){
                    if(postPreguntaSecretaRespuesta.postPreguntaSecretaRespuesta.cerror != undefined){
                        sendErrorNumPOST(postPreguntaSecretaRespuesta.postPreguntaSecretaRespuesta.ierror);
                        sendMensajePOST(postPreguntaSecretaRespuesta.postPreguntaSecretaRespuesta.cerror);                        
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
    }, [postPreguntaSecretaRespuesta?.message, postPreguntaSecretaRespuesta?.loading]);

    const cambiarPreguntaSecreta = () => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            
            let message = "psecreta";
            let params = [ paramsDispatch[0], paramsDispatch[1], paramsDispatch[2], paramsDispatch[3], idPreguntaSeleccionada.toString(), inputRespuestaNueva ];

            let a = { message, params };
            dispatch(postPreguntaSecretaRequest(a));
        }
    };

    const DropdownDataPreguntasSecretas = listaPS.map((ps: CatPreguntaSecreta) => {
        return {
            id: ps.Pregunta,
            option: parse(convertToAcentos(ps.NombrePregunta)),
          };
    });

    const FormCambiarPreguntaSecreta = (
        getPreguntaSecretaRespuesta.loading === true ?
            <Loading />
        :
            <div className="form">
                <form action="#">
                    <div className="inputs flex justify-between flex-col">
                        <div className="flex justify-between w-full mb-6">
                            <label className="font-sans font-bold text-sm py-2">Nueva pregunta secreta</label>
                            <div className="flex flex-col w-1/2 px-3">
                                <Dropdown
                                    dropdownData={DropdownDataPreguntasSecretas}
                                    initialOption={nombrePreguntaSeleccionada}
                                    side={false}
                                    sendOption={(nomPreg: string) => sendNombrePreguntaSeleccionada(nomPreg)}
                                    sendId={(id: any) => sendIdPreguntaSeleccionada(id)}
                                    fondosFamilia={false}
                                />
                            </div>
                        </div> 
                        <div className="flex justify-between w-full mb-4">
                            <label className="font-sans font-bold text-sm py-2">Nueva respuesta</label>
                            <div className="flex flex-col w-1/2 px-3">
                                <input 
                                    disabled={errorDatosDispatch.length > 0 || errorMensajeGet.length > 0 || idPreguntaSeleccionada <= 0} 
                                    onChange={(evento: any) => sendInputRespuestaNueva(evento.currentTarget.value)} 
                                    value={inputRespuestaNueva} 
                                    placeholder={idPreguntaSeleccionada <= 0 ? "Selecciona una pregunta" : "Escribe tu nueva respuesta"} 
                                    required 
                                    //type="email" 
                                    className="font-sans p-2 mb-2 text-sm border-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-transparent disabled:ring-red-500 disabled:ring-1 disabled:cursor-not-allowed" 
                                />
                            </div>
                        </div>
                            {
                                errorDatosDispatch.length > 0 && 
                                    <div className="flex flex-col items-center w-100 pr-5 mb-6">
                                        <p className="text-xs text-red-100 font-bold">{errorDatosDispatch}</p>
                                    </div>
                            }
                            {
                                errorMensajeGet.length > 0 && 
                                <div className="flex flex-col items-center w-100 pr-5 mb-6">
                                    <p className="text-xs text-red-100 font-bold">{parse(errorMensajeGet)}</p>
                                </div>
                            }                                   
                    </div>

                    {
                        procesoTerminado === true && postPreguntaSecretaRespuesta.loading === false && <div className="mensajePost flex justify-end pr-5">
                            {
                                errorNumPOST === 0 ? 
                                    <p className="text-xs text-red-600 font-bold">{parse(mensajePOST)}</p>
                                :
                                    <p className="text-xs text-red-100 font-bold">{parse(mensajePOST)}</p>
                            }
                        </div>
                    }

                    {
                        postPreguntaSecretaRespuesta.loading === true ? 
                            <Loading />
                        : 
                            <div className="flex justify-end mt-10 pr-5">
                                <NavLink to="/perfil">
                                    <div className="bg-white text-center w-44 p-2 px-4 text-xs text-red-600 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                        <p>
                                            {
                                                mensajePOST.length > 0 ?
                                                    "Regresar"
                                                :
                                                    "Cancelar"
                                            }
                                        </p>
                                    </div>
                                </NavLink>
                                {
                                    /* si tenemos un error con los datos para los dispatch o con el api GET, deshabilitamos el btn de Cambiar */
                                    errorDatosDispatch.length > 0 ?
                                        <button 
                                            disabled={true}
                                            className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                        >
                                            Cambiar
                                        </button>
                                    : errorMensajeGet.length > 0 ?
                                        <button 
                                            disabled={true}
                                            className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                        >
                                            Cambiar
                                        </button>
                                    : idPreguntaSeleccionada === 0 ?
                                        <button 
                                            disabled={true}
                                            className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                        >
                                            Cambiar
                                        </button>
                                    /* si inputRespuestaNueva no tiene caracteres o solo tiene espacios en blanco, deshabilitamos el btn de Cambiar */
                                    : inputRespuestaNueva.trim().length === 0 ? 
                                        <button 
                                            disabled={true}
                                            className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                        >
                                            Cambiar
                                        </button>
                                    /* si inputRespuestaNueva tiene más de un caracter, habilitamos el btn de Cambiar */
                                    : inputRespuestaNueva.trim().length > 0 ?
                                        <button 
                                            onClick={cambiarPreguntaSecreta}
                                            className="w-44 ml-6 bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                        >
                                            Cambiar
                                        </button>
                                    :
                                    /* si todas las validaciones pasadas son false, deshabilitamos el btn de Cambiar */
                                        <button 
                                            disabled={true}
                                            className="w-44 ml-6 bg-gray-350 p-2 px-4 text-xs text-gray-100 border-1 border-gray-350 rounded cursor-not-allowed"
                                        >
                                            Cambiar
                                        </button>
                                }
                            </div>
                    }
                    
                </form>
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
                    <h2 className="font-medium text-lg pb-2 border-b border-gray-300">Pregunta secreta</h2>
                </div>
                {FormCambiarPreguntaSecreta}
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
        getPreguntaSecretaRespuesta: store.getPreguntaSecretaRespuesta,
        postPreguntaSecretaRespuesta: store.postPreguntaSecretaRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getPreguntaSecretaRequest: () => dispatch(getPreguntaSecretaRequest(dispatch)),
        postPreguntaSecretaRequest: () => dispatch(postPreguntaSecretaRequest(dispatch)),
        getPreguntaSecretaReset: () => dispatch(getPreguntaSecretaReset(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreguntaSecreta);