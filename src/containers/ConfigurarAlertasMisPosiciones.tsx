import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import '../styles/perfil.css';

import { RootState } from '../reducers/rootReducer';
import { LoginObjectState } from '../types/LoginObjectTypes';
import { useHistory } from 'react-router-dom';
import Loading from './../components/Loading';
import { CustomMUISwitch } from './CustomMuiSwitch';

import { getAlertasMiPosicionRequest, getAlertasMiPosicionReset } from '../actions/getAlertasMiPosicionAction';
import { GetAlertasMiPosicionState } from '../types/GetAlertasMiPosicionType';
import RadioButtonSet, { RadioButtonOption } from './RadioButtonSet';
import { PutAlertasMiPosicionState } from '../types/PutAlertasMiPosicionType';
import { putAlertasMiPosicionRequest } from '../actions/putAlertasMiPosicionAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

interface propsFromState {
    loginObject?: LoginObjectState;
    getAlertasMiPosicionRespuesta?: GetAlertasMiPosicionState;
    putAlertasMiPosicionRespuesta?: PutAlertasMiPosicionState,
}

type AllProps = propsFromState;

const ConfigurarAlertasMisPosiciones: React.FC<AllProps> = ({ loginObject, getAlertasMiPosicionRespuesta, putAlertasMiPosicionRespuesta }) => {

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
    };

    //HOOKS
    const [errorDatosDispatch, setErrorDatosDispatch] = useState("");
    const [volverACargar, setVolverACargar] = useState(false);
    const [mostrarBtnGuardar, setMostrarBtnGuardar] = useState(false);

    const sendMostrarBtnGuardar = (data: boolean) => {
        if(data === mostrarBtnGuardar){
            return;
        }
        setMostrarBtnGuardar(data);
    };

    const sendErrorDatosDispatch = (data: string) => {
        if(errorDatosDispatch === data){
            return;
        }
        setErrorDatosDispatch(data);
    };

    //HOOKS - inputs para el usuario
    const [isCheckedAlertasMP, setIsCheckedAlertasMP] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const sendIsCheckedAlertasMP = (data: boolean) => {
        if(data === isCheckedAlertasMP){
            return;
        }
        setIsCheckedAlertasMP(data);
    };

    const sendSelectedOption = (data: string) => {
        if(selectedOption === data){
            return;
        }
        setSelectedOption(data);
    };

    //HOOKS - mensajes apis
    const [errorPUT, setErrorPUT] = useState("");
    const [errorNumPUT, setErrorNumPUT] = useState(0);

    const sendErrorPUT = (data: string) => {
        if(errorPUT === data){
            return;
        }
        setErrorPUT(data);
    };

    const sendErrorNumPUT = (data: number) => {
        if(errorNumPUT === data){
            return;
        }
        setErrorNumPUT(data);
    };

    /* validar que el usuario esta loggeado */
    useEffect(() => {
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
                
                        let params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];

                        sendCtaCtoDispatch(cuentaLO);
                        sendParamsDispatch(params);
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en alertas, lo mandamos al login");
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

        return () => {
            //este bloque de codigo se corre cuando se desmonta el componente, entonces reseteamos estados de alertas de mi posicion
            console.log("unmount de ConfigurarAlertasMisPosiciones");
            //dispatch(getAlertasMiPosicionReset({ hacerReset: true }));
        };
    }, []);

    /* cuando cambian los datos para el dispatch, hacemos llamadas al dispatch */
    useEffect(() => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            //borramos el errorDatosDispatch y los demas errores
            sendErrorDatosDispatch("");

            //mandamos llamar los dispatch
            let params = paramsDispatch;
            let message = "preferencias/posicion";
            dispatch(getAlertasMiPosicionRequest({ message, params }));
        }
        else{
            //no hay params o ctacto para el dispatch por alguna razon
            console.log("error datos dispatch en Alertas Mis Posiciones");
            sendErrorDatosDispatch("Ocurrió un error con el servicio, por favor intenta más tarde.");
        }
    }, [ctaCtoDispatch, paramsDispatch]);

    useEffect(() => {
        if(getAlertasMiPosicionRespuesta !== undefined){
            if(getAlertasMiPosicionRespuesta.loading === false && getAlertasMiPosicionRespuesta.message.length > 0){
                //llego la respuesta
                if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta !== undefined){
                    if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias !== undefined){
                        if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias !== undefined){
                            if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias.length > 0){
                                console.log("getAlertasMiPosicionRespuesta");
                                console.log(getAlertasMiPosicionRespuesta);
                                sendIsCheckedAlertasMP(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias[0].Activo);
                                if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias[0].Activo === true){
                                    //si la alerta mi posicion esta activa (Activo==true), sacamos el limsup para que sea nuestro selected option
                                    const detalleObj = JSON.parse(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias[0].Detalle.toString());
                                    console.log("detalle obj");
                                    console.log(detalleObj);
                                    sendSelectedOption(detalleObj["limsup"].toString());
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [getAlertasMiPosicionRespuesta?.loading, getAlertasMiPosicionRespuesta?.message]);

    useEffect(() => {
        if(putAlertasMiPosicionRespuesta !== undefined){
            if(putAlertasMiPosicionRespuesta.loading === false && putAlertasMiPosicionRespuesta.message.length > 0){
                //llego la respuesta del api
                if(putAlertasMiPosicionRespuesta.putAlertasMiPosicionRespuesta !== undefined){
                    if(putAlertasMiPosicionRespuesta.putAlertasMiPosicionRespuesta.ierror === 0){
                        console.log("todo OK, volvemos a hacer el dispatch para el GET de alertas mi posicion");
                        sendMostrarBtnGuardar(false);
                        let params = paramsDispatch;
                        let message = "preferencias/posicion";
                        dispatch(getAlertasMiPosicionRequest({ message, params }));
                    }
                    else{
                        sendErrorNumPUT(putAlertasMiPosicionRespuesta.putAlertasMiPosicionRespuesta.ierror);
                        sendErrorPUT(putAlertasMiPosicionRespuesta.putAlertasMiPosicionRespuesta.cerror);
                    }
                }
            }
        }
    }, [putAlertasMiPosicionRespuesta?.loading, putAlertasMiPosicionRespuesta?.message]);

    useEffect(() => {
        if(volverACargar === true){
            sendMostrarBtnGuardar(false);
            setVolverACargar(false);
        }
    }, [volverACargar]);

    useEffect(() => {
        if(getAlertasMiPosicionRespuesta !== undefined){
            if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta !== undefined){
                if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias !== undefined){
                    if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias !== undefined){
                        if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias.length > 0){
                            if(isCheckedAlertasMP !== getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias[0].Activo){
                                sendMostrarBtnGuardar(true); //el usuario cambio los datos, mostramos el btn de guardar para que el usuario pueda guardar sus cambios
                            }
                            else{
                                sendMostrarBtnGuardar(false); //el usuario tiene los datos igual a como los tiene en la bd (es decir, la respuesta de la api), quitamos el btn de guardar para evitar que el usuario vuelva a guardar la configuracion de antes
                            }

                            if(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias[0].Activo === true){
                                //si la alerta mis posiciones esta activa (Activo==true), podemos sacar limsup
                                const detalleObj = JSON.parse(getAlertasMiPosicionRespuesta.getAlertasMiPosicionRespuesta.dsPreferencias.tdsPreferencias[0].Detalle.toString());
                                console.log("detalle obj");
                                console.log(detalleObj);
                                if(selectedOption !== detalleObj["limsup"].toString()){
                                    sendMostrarBtnGuardar(true); //el usuario cambio los datos, mostramos el btn de guardar para que el usuario pueda guardar sus cambios
                                }
                                else{
                                    sendMostrarBtnGuardar(false); //el usuario tiene los datos igual a como los tiene en la bd (es decir, la respuesta de la api), quitamos el btn de guardar para evitar que el usuario vuelva a guardar la configuracion de antes
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [selectedOption, isCheckedAlertasMP]);

    const guardarCambiosAlertasMP = () => {
        if(paramsDispatch.length > 0){
            //mandar a llamar el api POST
            
            let qryStrParamActivo = "";
            if(isCheckedAlertasMP === true){
                qryStrParamActivo = "true";
            }
            else{
                qryStrParamActivo = "false";
            }

            let message = "preferencias/posicion?Activo=" + qryStrParamActivo + "&liminf=" + encodeURIComponent("-" +selectedOption) + "&limsup=" + encodeURIComponent(selectedOption);
            console.log("message a enviar a PUT: ");
            console.log(message);

            dispatch(putAlertasMiPosicionRequest({ message, params: paramsDispatch }));

            /*sendMostrarBtnGuardar(false);
            sendIsCheckedAlertasMP(false);
            sendSelectedOption("");*/
        }
    };

    const optionsForRadioButtonSet: RadioButtonOption[] = [
        {
            label: "+/- 5%",
            value: "5",
        },
        {
            label: "+/- 10%",
            value: "10",
        },
    ];

    return(
        <div className="w-full">
            <div className="title">
                <h2 className="font-medium text-lg pb-2 border-b border-gray-300">Mis Posiciones</h2>
            </div>
            {
                getAlertasMiPosicionRespuesta?.loading === true ?
                    <Loading />
                :
                    <div className="posiciones">
                        <div className="my-4">
                            <div className="flex items-end mb-3">
                                <p className="text-gray-400 text-xs">Alerta en todas mis posiciones</p>
                                <div className="ml-4">
                                    <CustomMUISwitch 
                                        checked={isCheckedAlertasMP} 
                                        //disabled={(putAlertasEstatusRespuesta !== undefined && putAlertasEstatusRespuesta.loading === true) ? true : false}
                                        sendChecked={(nuevoIsChecked: boolean) => sendIsCheckedAlertasMP(nuevoIsChecked)} 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <RadioButtonSet 
                                    options={optionsForRadioButtonSet}
                                    selected={selectedOption}
                                    setSelected={sendSelectedOption}
                                    isSetDisabled={!isCheckedAlertasMP}
                                />
                                <div className="mb-3">
                                    {
                                        (mostrarBtnGuardar && selectedOption.length > 0) && <button 
                                            onClick={guardarCambiosAlertasMP}
                                            data-toggle="toggle" 
                                            className="w-auto bg-red-600 p-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                        >
                                            Guardar cambios
                                        </button>
                                    }
                                    {
                                        putAlertasMiPosicionRespuesta?.loading === true ?
                                            <div className="w-4/24 mt-2">
                                                <Loading />
                                            </div>
                                        : errorNumPUT !== 0 && <div className="mt-2 flex flex-row">
                                            <p className="text-sm text-red-100 font-bold mr-1">Error:</p>
                                            <p className="text-sm text-gray-500 ml-1">{errorPUT}</p>
                                        </div>
                                    }
                                </div>
                                {/*<div className="mr-10">
                                    <input type="radio" name="pos"/>
                                    <label htmlFor="">+/- 5%</label>
                                </div>
                                <div>
                                    <input type="radio" name="pos" />
                                    <label htmlFor="">+/- 10%</label>
                                </div>*/}
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        getAlertasMiPosicionRespuesta: store.getAlertasMiPosicionRespuesta,
        putAlertasMiPosicionRespuesta: store.putAlertasMiPosicionRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getAlertasMiPosicionRequest: () => dispatch(getAlertasMiPosicionRequest(dispatch)),
        //getAlertasMiPosicionReset: () => dispatch(getAlertasMiPosicionReset(dispatch)),
        putAlertasMiPosicionRequest: () => dispatch(putAlertasMiPosicionRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurarAlertasMisPosiciones);
