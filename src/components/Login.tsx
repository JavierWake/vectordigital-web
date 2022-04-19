import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import useForm from '../customHooks/useForm';
import { useHistory } from 'react-router-dom';

import { Alert } from 'reactstrap';
import CircularProgress from "@material-ui/core/CircularProgress";

import '../styles/login.css';
import { LoginObjectState } from '../types/LoginObjectTypes';
import { postLoginObjectRequest } from '../actions/loginObjectAction';
import Loading from './Loading';
import { IoIosArrowUp } from "react-icons/io";
import logo from '../assets/logo-vector1.png';

import persistorAndStore from '../store';
import rootReducer from '../reducers/rootReducer';

interface propsFromState {
    //loginObject: LoginObjectState;
    loginObject?: LoginObjectState;
}

type AllProps = propsFromState; 

const Login: React.FC<AllProps> = ({ loginObject }) => {

    const purgeDelStoreCompleto = async () => {
        //persistorAndStore.store.replaceReducer(rootReducer(null, ""));
        await persistorAndStore.persistor.purge()
        await persistorAndStore.persistor.purge()
        //console.log("Factory reset performed.")
    };

    const history = useHistory();
    const dispatch = useDispatch();
    
    const [alertShow, setAlertShow] = useState(false);

    //HOOKS - inputs
    const [inputUsuario, setInputUsuario] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const sendInputUsuario = (data: string) => {
        if(inputUsuario === data){
            return;
        }
        setInputUsuario(data);
    };

    const sendInputPassword = (data: string) => {
        if(inputPassword === data){
            return;
        }
        setInputPassword(data);
    };

    //HOOKS - mensajes error
    const [mensajeError, setMensajeError] = useState("");
    const [numError, setNumError] = useState(0);

    const sendMensajeError = (data: string) => {
        /*if(mensajeError === data) {
            return;
        }*/
        setMensajeError(data);
        if(data.length === 0){
            return;
        }
        setAlertShow(true);
        window.setTimeout(()=>{
            setAlertShow(false)
        },5000);
    };

    const sendNumError = (data: number) => {
        if(numError === data){
            return;
        }
        setNumError(data);
    };

    useEffect(() => {
        //ver si el usuario esta loggeado
        if(loginObject !== undefined){
            if(loginObject.response.ierror === (-1) && loginObject.response.cerror.length === 0){
                //usuario si esta loggeado, nos vamos al portafolio
                console.log("nos vamos a portafolio primer useEffect");
                history.push("/portafolio");
            }
        }

        //window && window.location.reload(); // si se cicla D:
        //console.log("antes del purge en login");
        //purgeDelStoreCompleto();
    }, []);


    
    useEffect(() => {
        //ver si el usuario esta loggeado
        if(loginObject !== undefined){
            if(loginObject.response.ierror === (-1) && loginObject.response.cerror.length === 0 && loginObject.loading === false){
                //usuario si esta loggeado, nos vamos al portafolio
                console.log("nos vamos a portafolio primer useEffect");
                history.push("/portafolio");
            }
        }
    }, [loginObject]);

    useEffect(() => {
        //console.log("loginObject useEffect");
        if(loginObject !== undefined){
            if(loginObject.message.length > 0 && loginObject.loading === false){
                //ya recibio la respuesta el api
                if(loginObject.response.ierror !== undefined){
                    sendNumError(loginObject.response.ierror);
                }
                if(loginObject.response.cerror !== undefined){
                    sendMensajeError(loginObject.response.cerror);
                }
            }
        }
    }, [loginObject?.message, loginObject?.loading]);

    useEffect(() => {
        if(mensajeError.length === 0 && numError === (-1)){
            if(loginObject !== undefined){
                if(loginObject.response.ierror === (-1) && loginObject.response.cerror.length === 0){
                    //usuario si esta loggeado, nos vamos al portafolio
                    console.log("nos vamos a portafolio useEffect mensajeError");
                    history.push("/portafolio");
                } 
            }
        }
    }, [mensajeError, numError]);

    const hacerLogin = (e: any) => {
        e.preventDefault(); //SIEMPRE VA ESTA LINEA EN LOS BTNS SUBMIT Y INPUTS DE TEXTO
        let message = "login";
        let params = [inputUsuario, inputPassword, "192.168.1.72", "123456789", "999"];
        dispatch(postLoginObjectRequest({message, params}));
    };

    const changeInputUsuario = (e: any) => {
        e.preventDefault();
        sendInputUsuario(e.currentTarget.value);
    };

    const changeInputPassword = (e: any) => {
        e.preventDefault();
        sendInputPassword(e.currentTarget.value);
    };

    return(
        <div className={(loginObject !== undefined ? (loginObject.loading ? "modal-backdrop fade show" : "") : "")}>
            <div className={"bg-white h-screen"}>
                <div className="h-1/2">
                    {
                        (loginObject !== undefined ? 
                            (loginObject.loading ? 
                                <div className="absolute h-screen w-screen justify-center items-center">
                                    <div className="flex h-screen justify-center items-center z-50">
                                        <CircularProgress style={{ color: "#FF5000" }} />
                                    </div> 
                                </div>
                                : "") 
                            : "")
                    }
                    <div className="w-1/3 m-auto z-1">
                        <div className="justify-center py-1">
                            <Alert className = "z-40 bg-green-70 text-black" color="info" style={{position: 'fixed', left: '10%', right: "10%" }} isOpen={alertShow} >
                                {mensajeError}
                            </Alert>
                        </div>
                        <img className="h-1/3 w-1/2" src={logo} alt="Vector Digital"/>
                        <div className="py-4">
                            <h1 className="font-sans text-xl font-bold" >¡Buenos d&iacute;as!</h1>
                        </div>
                        <div>
                            <form>
                                <div>
                                    <p className="font-sans text-sm py-2">Contrato / Correo electr&oacute;nico</p>
                                    <input
                                        type="text"
                                        value={inputUsuario}
                                        onChange={changeInputUsuario}
                                        className="w-full p-1 pl-3 rounded-md border-2 border-gray-50 focus:outline-none focus:border-gray-100"
                                        id="username"
                                        placeholder="hola@mail.com"
                                    />
                                </div>
                                <div className="py-2">
                                    <p className="font-sans text-sm py-2">Contrase&ntilde;a</p>
                                    <input
                                        type="password"
                                        value={inputPassword}
                                        onChange={changeInputPassword}
                                        className="w-full p-1 pl-3 rounded-md border-2 border-gray-50 focus:outline-none focus:border-gray-100"
                                        id="password"
                                        placeholder="··········" 
                                    />
                                </div>
                                <button
                                    type="submit"
                                    onClick={hacerLogin}
                                    id="btn-login"
                                    className="w-full bg-red-600 my-2 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:bg-red-600 hover:tect-gray-100"
                                >
                                    Ingresar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="h-1/2 flex items-end">
                    <div className="w-full h-4/6 relative z-0">
                        <div className="absolute inset-0 flex justify-center items-end z-10">
                            <div className="bg-red-600 w-screen h-24"></div>
                        </div>
                        <div className="absolute inset-0 flex justify-end items-end z-30">
                            <div id="triangleW1" className="overflow-hidden inline-block">
                                <div id="triangleH1" className="bg-blue-950 rotate-45 transform origin-bottom-left"></div>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex justify-end items-end z-20 overflow-hidden inline-block">
                            <div id="" className="rectangleShapeOut ">
                                <div className="rectangleShapeIn "></div>
                            </div>
                        </div>
                        <div>
                            <div className="absolute inset-0 pl-48 flex justify-start items-end z-20 overflow-hidden inline-block">
                                <IoIosArrowUp id="heightArrowBlue" className="text-blue-950 w-16" />
                            </div>
                            <div id="arrowBlue" className="absolute inset-0 flex justify-start items-end z-20 overflow-hidden inline-block">
                                <div id="arrow" className="bg-blue-950 w-1.5"></div>
                            </div>
                        </div>
                        <div>
                            <div className="absolute inset-0 pl-60 flex justify-start items-end z-20 overflow-hidden inline-block">
                                <IoIosArrowUp id="arrowGreen" className="text-green-70 w-16" />
                            </div>
                            <div id="arrowGreenLine" className="absolute inset-0 flex justify-start items-end z-20 overflow-hidden inline-block">
                                <div id="greenRec" className="bg-green-70 w-1.5"></div>
                            </div>
                        </div>
                        <div>
                            <div className="absolute inset-0 pl-72 flex justify-start items-end z-20 overflow-hidden inline-block">
                                <IoIosArrowUp id="heightArrowBlue" className="text-blue-50 w-16" />
                            </div>
                            <div id="arrowBlueLigth" className="absolute inset-0 flex justify-start items-end z-20 overflow-hidden inline-block">
                                <div id="arrow" className="bg-blue-50 w-1.5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
    };
  };
  
const mapDispatchToProps = (dispatch: any) => {
    return {
        postLoginObjectRequest: () => dispatch(postLoginObjectRequest(dispatch)),
    };
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);