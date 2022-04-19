import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import parse from "html-react-parser";
import { Modal, ModalBody } from 'reactstrap';

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';

import Sidebar from './../Sidebar';
import { SwitchComponent } from '../../containers/SwitchComponent';

import '../../styles/perfil.css';

import { 
    MdClose
} from "react-icons/md";
import { FooterComponent } from '../../containers/FooterComponent';
import { RootState } from '../../reducers/rootReducer';
import { getAlertasEventoRequest } from '../../actions/getAlertasEventoAction';
import { getAlertasVolatilidadRequest } from '../../actions/getAlertasVolatilidadAction';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { GetAlertasEventoState, TdsAlerta as TdsAlertaE } from '../../types/GetAlertasEventoType';
import { GetAlertasVolatilidadState, TdsAlerta as TdsAlertaV } from '../../types/GetAlertasVolatilidadType';
import { useHistory } from 'react-router-dom';
import { deleteAlertasEventoBajaRequest } from '../../actions/deleteAlertasEventoBajaAction';
import { DeleteAlertasEventoBajaState } from '../../types/DeleteAlertasEventoBajaType';
import { deleteAlertasVolatilidadBajaRequest } from '../../actions/deleteAlertasVolatilidadBajaAction';
import { DeleteAlertasVolatilidadBajaState } from '../../types/DeleteAlertasVolatilidadBajaType';
import Navbar from '../../containers/Navbar';
import Loading from '../Loading';
import ConfigurarAlerta from '../../containers/ConfigurarAlerta';
import AlertaCard from '../../containers/AlertaCard';
import ConfigurarAlertasMisPosiciones from '../../containers/ConfigurarAlertasMisPosiciones';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

interface propsFromState {
    loginObject: LoginObjectState;
    getAlertasEventoRespuesta: GetAlertasEventoState;
    getAlertasVolatilidadRespuesta: GetAlertasVolatilidadState;
    deleteAlertasEventoBajaRespuesta: DeleteAlertasEventoBajaState;
    deleteAlertasVolatilidadBajaRespuesta: DeleteAlertasVolatilidadBajaState;
}

type AllProps = propsFromState;

const Alertas: React.FC<AllProps> = ({ loginObject, getAlertasEventoRespuesta, getAlertasVolatilidadRespuesta, deleteAlertasEventoBajaRespuesta, deleteAlertasVolatilidadBajaRespuesta }) => {

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
    const [listaAlertasEvento, setListaAlertasEvento] = useState<TdsAlertaE[]>([]);
    const [errorApiAlertasEvento, setErrorApiAlertasEvento] = useState("");
    const [listaAlertasVolatilidadPrecio, setListaAlertasVolatilidadPrecio] = useState<TdsAlertaV[]>([]); 
    const [listaAlertasVolatilidadVariacion, setListaAlertasVolatilidadVariacion] = useState<TdsAlertaV[]>([]); 
    const [errorApiAlertasVolatilidad, setErrorApiAlertasVolatilidad] = useState("");

    const [mensajeErrorDelete, setMensajeErrorDelete] = useState("");
    const [modalErrorEliminacion, setModalErrorEliminacion] = useState(false);
    const [volverACargar, setVolverACargar] = useState(false);

    const sendErrorDatosDispatch = (data: string) => {
        if(errorDatosDispatch === data){
            return;
        }
        setErrorDatosDispatch(data);
    };

    const sendListaAlertasEvento = (data: TdsAlertaE[]) => {
        if(data === listaAlertasEvento){
            return;
        }
        setListaAlertasEvento(data);
    };

    const sendErrorApiAlertasEvento = (data: string) => {
        if(data === errorApiAlertasEvento){
            return;
        }
        setErrorApiAlertasEvento(data);
    };

    const sendListaAlertasVolatilidadPrecio = (data: TdsAlertaV[]) => {
        if(data === listaAlertasVolatilidadPrecio){
            return;
        }
        setListaAlertasVolatilidadPrecio(data);
    };

    const sendListaAlertasVolatilidadVariacion = (data: TdsAlertaV[]) => {
        if(data === listaAlertasVolatilidadVariacion){
            return;
        }
        setListaAlertasVolatilidadVariacion(data);
    };

    const sendErrorApiAlertasVolatilidad = (data: string) => {
        if(data === errorApiAlertasVolatilidad){
            return;
        }
        setErrorApiAlertasVolatilidad(data);
    };

    /* validar que el usuario esta loggeado */
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
    }, []);

    /* cuando cambian los datos para el dispatch, hacemos llamadas al dispatch */
    useEffect(() => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            //borramos el errorDatosDispatch y los demas errores
            sendErrorDatosDispatch("");

            //mandamos llamar los dispatch
            let params = paramsDispatch;
            dispatch(getAlertasEventoRequest({message: "alertasevento", params}));
            dispatch(getAlertasVolatilidadRequest({message: "alertasvolatilidad", params}));
        }
        else{
            //no hay params o ctacto para el dispatch por alguna razon
            //console.log("error datos dispatch en Alertas");
            sendErrorDatosDispatch("Ocurrió un error con el servicio, por favor intenta más tarde.");
        }
    }, [ctaCtoDispatch, paramsDispatch]);

    useEffect(() => {
        if(getAlertasEventoRespuesta !== undefined){
            if(getAlertasEventoRespuesta.message.length > 0 && getAlertasEventoRespuesta.loading === false){
                if(getAlertasEventoRespuesta.getAlertasEventoRespuesta !== undefined){
                    if(getAlertasEventoRespuesta.getAlertasEventoRespuesta.dsAlertas !== undefined){
                        if(getAlertasEventoRespuesta.getAlertasEventoRespuesta.dsAlertas.tdsAlerta.length > 0){
                            sendListaAlertasEvento(getAlertasEventoRespuesta.getAlertasEventoRespuesta.dsAlertas.tdsAlerta);
                        }
                        else{
                            sendErrorApiAlertasEvento(getAlertasEventoRespuesta.getAlertasEventoRespuesta.cerror);
                        }
                    }
                    else{
                        sendErrorApiAlertasEvento(getAlertasEventoRespuesta.getAlertasEventoRespuesta.cerror);
                    }
                }
            }
        }
    }, [getAlertasEventoRespuesta.loading, getAlertasEventoRespuesta.message]);

    useEffect(() => {
        if(getAlertasVolatilidadRespuesta !== undefined){
            if(getAlertasVolatilidadRespuesta.message.length > 0 && getAlertasVolatilidadRespuesta.loading === false){
                if(getAlertasVolatilidadRespuesta.getAlertasVolatilidadRespuesta !== undefined){
                    if(getAlertasVolatilidadRespuesta.getAlertasVolatilidadRespuesta.dsAlertas !== undefined){
                        if(getAlertasVolatilidadRespuesta.getAlertasVolatilidadRespuesta.dsAlertas.tdsAlerta.length > 0){
                            const filterAlertasVolPrecio = getAlertasVolatilidadRespuesta.getAlertasVolatilidadRespuesta.dsAlertas.tdsAlerta.filter((alerta: TdsAlertaV) => {
                                return alerta.idtipo === "precio";
                            });
                            sendListaAlertasVolatilidadPrecio(filterAlertasVolPrecio);

                            const filterAlertasVolVariacion = getAlertasVolatilidadRespuesta.getAlertasVolatilidadRespuesta.dsAlertas.tdsAlerta.filter((alerta: TdsAlertaV) => {
                                return alerta.idtipo === "variacion";
                            });
                            sendListaAlertasVolatilidadVariacion(filterAlertasVolVariacion);
                        }
                        else{
                            sendErrorApiAlertasVolatilidad(getAlertasVolatilidadRespuesta.getAlertasVolatilidadRespuesta.cerror);
                        }
                    }
                    else{
                        sendErrorApiAlertasVolatilidad(getAlertasVolatilidadRespuesta.getAlertasVolatilidadRespuesta.cerror);
                    }
                }
            }
        }
    }, [getAlertasVolatilidadRespuesta.loading, getAlertasVolatilidadRespuesta.message]);

    useEffect(() => {
        if(volverACargar === true){
            //mandamos llamar los dispatch
            let params = paramsDispatch;
            dispatch(getAlertasEventoRequest({message: "alertasevento", params}));
            dispatch(getAlertasVolatilidadRequest({message: "alertasvolatilidad", params}));
            setVolverACargar(false);
        }
    }, [volverACargar]);

    useEffect(() => {
        if(deleteAlertasEventoBajaRespuesta !== undefined){
            if(deleteAlertasEventoBajaRespuesta.message.length > 0 && deleteAlertasEventoBajaRespuesta.loading === false){
                if(deleteAlertasEventoBajaRespuesta.deleteAlertasEventoBajaRespuesta !== undefined){
                    if(deleteAlertasEventoBajaRespuesta.deleteAlertasEventoBajaRespuesta.ierror === 0){
                        dispatch(getAlertasEventoRequest({message: "alertasevento", params: paramsDispatch}));
                    }
                    else{
                        setMensajeErrorDelete(deleteAlertasEventoBajaRespuesta.deleteAlertasEventoBajaRespuesta.cerror)
                        setModalErrorEliminacion(true);
                    }
                }
            }
        }
    }, [deleteAlertasEventoBajaRespuesta.loading, deleteAlertasEventoBajaRespuesta.message]);

    useEffect(() => {
        if(deleteAlertasEventoBajaRespuesta !== undefined){
            if(deleteAlertasVolatilidadBajaRespuesta.message.length > 0 && deleteAlertasVolatilidadBajaRespuesta.loading === false){
                if(deleteAlertasVolatilidadBajaRespuesta.deleteAlertasVolatilidadBajaRespuesta !== undefined){
                    if(deleteAlertasVolatilidadBajaRespuesta.deleteAlertasVolatilidadBajaRespuesta.ierror === 0){
                        dispatch(getAlertasVolatilidadRequest({message: "alertasvolatilidad", params: paramsDispatch}));
                    }
                    else{
                        setMensajeErrorDelete(deleteAlertasVolatilidadBajaRespuesta.deleteAlertasVolatilidadBajaRespuesta.cerror)
                        setModalErrorEliminacion(true);
                    }
                }
            }
        }
    }, [deleteAlertasVolatilidadBajaRespuesta.loading, deleteAlertasVolatilidadBajaRespuesta.message]);

    const eliminarAlertaVolatilidad = (tipo: string, emisora: string, serie: string) => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            //eliminamos la alerta de volatilidad
            let params = paramsDispatch;

            let message = "alertasvolatilidad/baja?tipo=" + tipo + "&emisora=" + emisora + "&serie=" + serie;
            dispatch(deleteAlertasVolatilidadBajaRequest({message, params}));

        }
    };

    const eliminarAlertaEvento = (emisora: string, serie: string) => {
        if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
            //eliminamos la alerta de evento
            let params = paramsDispatch;

            let message = "alertasevento/baja?emisora=" + emisora + "&serie=" + serie;
            dispatch(deleteAlertasEventoBajaRequest({message, params}));
        }
    };

    const NoHayAlertasComponente = (errorApi: string) => (
        <div className="text-sm my-4 text-center">
            <p className="font-bold mb-2">No tienes alertas configuradas en este momento.</p>
            <p className="text-xs">Para agregar una alerta llena los datos de la casilla derecha.</p>
            <div className="my-2 text-center text-red-500">
                {parse(errorApi)}
            </div>
        </div>
    );

    const NavAlertas = () => {
        return [
            {
                /* Alertas Variacion */
                content: (
                    <div id="alertasVar" className="w-full">
                        <p className="font-sans text-sm mt-3 mb-4 text-gray-400">Una vez que se alcanza la variación deseada, la alerta se ejecuta y se inhabilita de manera automática.</p>
                        {
                            getAlertasVolatilidadRespuesta.loading === true ?
                                <Loading />
                            : listaAlertasVolatilidadVariacion.length === 0 ?
                                NoHayAlertasComponente(errorApiAlertasVolatilidad)
                            :
                                <div className="flex flex-row flex-wrap w-full">
                                    {
                                        listaAlertasVolatilidadVariacion.map((alerta: TdsAlertaV) => {
                                            /* probar con estas clases "flex justify-end", en lugar de una row con dos columnas, hacer dos rows, cada una cos 2 columnas... a ver si sale */
                                            return <AlertaCard
                                                    key={alerta.descripcion}
                                                    descripcion={alerta.descripcion}
                                                    fecha={alerta.fecha}
                                                    limiteInf={alerta.limiteinf.toString()}
                                                    limiteSup={alerta.limitesup.toString()}
                                                    emisora={alerta.emisora}
                                                    serie={alerta.serie}
                                                    tipo={alerta.idtipo.trim().toLowerCase()} // variacion
                                                    params={paramsDispatch}
                                                    estatus={alerta.estatus.trim().toLowerCase() === "inactiva" ? false : true}
                                                    eliminarAlertaVolatilidad={eliminarAlertaVolatilidad}
                                                />;
                                                /*<div key={alerta.descripcion} className="alertaPre flex flex-row justify-between items-center shadow p-3 w-10/24 h-auto mb-3 mr-3">
                                                    <div className="w-1/2 h-auto p-2 flex flex-col justify-between">
                                                        <p className="font-sans font-bold text-base">{alerta.descripcion}</p>
                                                        <p className="font-sans text-sm text-gray-150">{alerta.fecha}</p>
                                                    </div>
                                                    <div className="w-1/2 p-2 flex flex-col justify-end">
                                                        <p className="font-sans text-sm text-right">{alerta.limiteinf}% al {alerta.limitesup}%</p>
                                                        {/ *<CustomInput type="switch" id="" label="" />* /}
                                                        <div className="w-full flex flex-row justify-end">
                                                            <MdDeleteOutline onClick={() => eliminarAlertaVolatilidad(alerta.tipo, alerta.emisora, alerta.serie)} className="icon text-base text-gray-150 hover:cursor-pointer hover:text-red-600" />
                                                            {
                                                                <CustomMUISwitch />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>*/
                                        })
                                    }
                                </div>
                        }
                    </div>
                ),
            },
            {
                /* Alertas Precio */
                content: (
                    <div id="alertasPre" className="w-full">
                        <p className="font-sans text-sm mt-3 mb-4 text-gray-400">Una vez que se alcanza el precio deseado, la alerta se ejecuta y se inhabilita de manera automática.</p>
                        {
                            getAlertasVolatilidadRespuesta.loading === true ?
                                <Loading />
                            : listaAlertasVolatilidadPrecio.length === 0 ?
                                NoHayAlertasComponente(errorApiAlertasVolatilidad)
                            :
                                <div className="flex flex-row flex-wrap w-full">
                                    {
                                        listaAlertasVolatilidadPrecio.map((alerta: TdsAlertaV) => {
                                            return <AlertaCard
                                                    key={alerta.descripcion}
                                                    descripcion={alerta.descripcion}
                                                    fecha={alerta.fecha}
                                                    limiteInf={alerta.limiteinf.toString()}
                                                    limiteSup={alerta.limitesup.toString()}
                                                    emisora={alerta.emisora}
                                                    serie={alerta.serie}
                                                    tipo={alerta.idtipo.trim().toLowerCase()} // precio
                                                    params={paramsDispatch}
                                                    estatus={alerta.estatus.trim().toLowerCase() === "inactiva" ? false : true}
                                                    eliminarAlertaVolatilidad={eliminarAlertaVolatilidad}
                                                />;
                                                /*<div key={alerta.descripcion} className="alertaPre flex flex-row justify-between items-center shadow p-3 w-10/24 h-auto mb-3 mr-3">
                                                    <div className="w-1/2 h-auto p-2 flex flex-col justify-between">
                                                        <p className="font-sans font-bold text-base">{alerta.descripcion}</p>
                                                        <p className="font-sans text-sm text-gray-150">{alerta.fecha}</p>
                                                    </div>
                                                    <div className="w-1/2 p-2 flex flex-col justify-end">
                                                        <p className="font-sans text-sm text-right">${alerta.limiteinf} a ${alerta.limitesup}</p>
                                                        {/ *<CustomInput type="switch" id="" label="" />* /}
                                                        <div className="w-full flex justify-end">
                                                            <MdDeleteOutline onClick={() => eliminarAlertaVolatilidad(alerta.tipo, alerta.emisora, alerta.serie)} className="icon text-base text-gray-150 hover:cursor-pointer hover:text-red-600" />
                                                        </div>
                                                    </div>
                                                </div>*/
                                        })
                                    }
                                </div>
                        }
                    </div>
                ),
            },
            {
                /* Alertas Evento */
                content: (
                    <div id="alertasEv" className="w-full">
                        <p className="font-sans text-sm mt-3 mb-4 text-gray-400">Una vez que se alcanza el precio deseado, la alerta se ejecuta y se inhabilita de manera automática.</p>
                        {
                            
                            getAlertasEventoRespuesta.loading === true ?
                                <Loading />
                            : listaAlertasEvento.length === 0 ?
                                NoHayAlertasComponente(errorApiAlertasEvento)
                            :
                                <div className="flex flex-row flex-wrap w-full">
                                    {
                                        listaAlertasEvento.map((alerta: TdsAlertaE) => {
                                            return <AlertaCard
                                                    key={alerta.descripcion}
                                                    descripcion={alerta.descripcion}
                                                    fecha={alerta.fecha}
                                                    //limiteInf={alerta.limiteinf.toString()}
                                                    //limiteSup={alerta.limitesup.toString()}
                                                    emisora={alerta.emisora}
                                                    serie={alerta.serie}
                                                    tipo={alerta.idtipo.trim().toLowerCase()} // evento
                                                    params={paramsDispatch}
                                                    estatus={alerta.estatus.trim().toLowerCase() === "inactiva" ? false : true}
                                                    eliminarAlertaEvento={eliminarAlertaEvento}
                                                />;
                                                /*<div key={alerta.descripcion} className="alertaEv flex flex-row justify-between items-center shadow p-3 w-10/24 h-auto mb-3 mr-3">
                                                    <div className="w-1/2 h-auto p-2 flex flex-col justify-between">
                                                        <p className="font-sans font-bold text-base">{alerta.descripcion}</p>
                                                        <p className="font-sans text-sm text-gray-150">{alerta.fecha}</p>
                                                    </div>
                                                    <div className="w-1/2 p-2 flex flex-col justify-end">
                                                        {/ *<CustomInput type="switch" id="" label="" />* /}
                                                        <div className="w-full flex justify-end">
                                                            <MdDeleteOutline onClick={() => eliminarAlertaEvento(alerta.emisora, alerta.serie)} className="icon text-base text-gray-150 hover:cursor-pointer hover:text-red-600" />
                                                        </div>
                                                    </div>
                                                </div>*/
                                        })
                                    }
                                </div>
                        }
                    </div>
                ),
            },
        ];
    };

    const toggle = () => setModalErrorEliminacion(!modalErrorEliminacion);

    const ModalEliminacion = (
        <Modal isOpen={modalErrorEliminacion} toggle={toggle}>
            <ModalBody>
                <div className="headerYClose w-full flex flex-row py-3">
                    <div className="titulo w-22/24">
                        <p className="my-1 font-bold text-center">Error al eliminar alerta</p>
                    </div>
                    <div className="tachita w-2/24 cursor-pointer" onClick={() => setModalErrorEliminacion(false)}>
                        <MdClose className="text-gray-800 text-base text-right" />
                    </div>
                </div>
                <div className="bodyMensajeAlta m-3 p-1 flex flex-col">
                    <div className="py-2 w-full">
                        <p className="text-base text-red-500">{parse(mensajeErrorDelete)}</p>
                    </div>
                    <div className="btnCerrar flex flex-col w-full py-2">
                        <button className="w-full bg-red-600 my-1 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => setModalErrorEliminacion(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );

    let childrenContentPrincipal = (
        <>
            <div className="content mt-4 mb-14">
                <div className="posiciones">
                    <ConfigurarAlertasMisPosiciones />
                </div>
                {/*<div className="listas">
                    <div className="title">
                        <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-2">Mis Listas</h2>
                    </div>
                    <div className="my-4">
                        <div className="flex items-end mb-3">
                            <p className="text-gray-400 text-xs">Alerta en todas mis listas</p>
                            <div className="ml-12">
                                <SwitchComponent/>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mr-10">
                                <input type="radio" name="pos"/>
                                <label htmlFor="">+/- 5%</label>
                            </div>
                            <div>
                                <input type="radio" name="pos" />
                                <label htmlFor="">+/- 10%</label>
                            </div>
                        </div>
                    </div>
                    
                </div>*/}
            </div>
            <div className="content">
                <div className="title">
                    <h2 className="font-medium text-lg pb-2">Mis Alertas</h2>
                </div>
                <Navbar navData={["Variación", "Precio", "Evento"]} data={NavAlertas()} /> <br />

                {/*<hr className="solid bg-gray-500 my-3"/>

                <div className="nav-alertas mb-10">
                    <ul className="border-b-2 border-gray-300 pb-2">
                        <li className="inline"><a href="/perfil-alertas" className="border-b-2 border-red-600 pb-2.5 pr-8 text-sm text-red-600 font-medium hover:text-red-600">Variación</a></li>
                        <li className="inline"><a href="" className="border-b-2 border-gray-300 pb-2.5 pr-8 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Precio</a></li>
                        <li className="inline"><a href="" className="border-b-2 border-gray-300 pb-2.5 pr-8 text-sm text-gray-400 font-medium hover:text-red-600 hover:border-red-600">Evento</a></li>                                 
                    </ul>
                </div>*/}
                

                {/*<div className="alerta-variacion">
                    <h2 className="font-medium text-xl border-b-2 border-gray-300 pb-4">Alerta por Variación</h2>
                    <p className="font-sans text-sm my-3 text-gray-400">Una vez que se alcanza el precio deseado, la alerta se ejecuta y se inhabilita de manera automática.</p>
                </div>

                <div className="text-sm my-4 text-center">
                    <p className="font-bold mb-2">No tienes alertas configuradas en este momento.</p>
                    <p className="text-xs">Para agregar una alerta llena los datos de la casilla derecha.</p>
                </div>*/}

                {/*<div className="alertas mb-4">
                    <div className="alerta flex justify-between items-center shadow p-4 w-11/12 mb-4">
                        <div>
                            <p className="font-sans font-bold text-md">WALMEX*</p>
                            <p className="font-sans text-sm">10% al 10%</p>
                        </div>
                        <div className="flex items-center">
                            <CustomInput type="switch" id="" label="" />
                            <MdClose  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                        </div>
                    </div>

                    <div className="alerta flex justify-between items-center shadow p-4 w-11/12">
                        <div>
                            <p className="font-sans font-bold text-md text-gray-400">WALMEX*</p>
                            <p className="font-sans text-sm text-gray-400">10% al 10%</p>
                        </div>
                        <div className="flex items-center">
                            <CustomInput type="switch" id="" label="" />
                            <MdClose  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                        </div>
                    </div>
                </div>*/}

                {/*<div className="alertas mb-4">
                    <div className="alerta flex justify-between items-center shadow p-4 w-11/12 mb-4">
                        <div>
                            <p className="font-sans font-bold text-md">WALMEX*</p>
                            <p className="font-sans text-sm">$5,000.23 a la baja</p>
                        </div>
                        <div className="flex items-center">
                            <CustomInput type="switch" id="" label="" />
                            <MdClose  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                        </div>
                    </div>

                    <div className="alerta flex justify-between items-center shadow p-4 w-11/12">
                        <div>
                            <p className="font-sans font-bold text-md text-gray-400">ALFA.A**</p>
                            <p className="font-sans text-sm text-gray-400">$5,000.23 a la alza</p>
                        </div>
                        <div className="flex items-center">
                            <CustomInput type="switch" id="" label="" />
                            <MdClose  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                        </div>
                    </div>
                </div>*/}

                {/*<div className="alertas mb-4">
                    <div className="alerta flex justify-between items-center shadow p-4 w-11/12 mb-4">
                        <div>
                            <p className="font-sans font-bold text-md">WALMEX*</p>
                            <p className="font-sans text-sm">12/12/2021</p>
                        </div>
                        <div className="flex items-center">
                            <CustomInput type="switch" id="" label="" />
                            <MdClose  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                        </div>
                    </div>

                    <div className="alerta flex justify-between items-center shadow p-4 w-11/12">
                        <div>
                            <p className="font-sans font-bold text-md text-gray-400">ALFA.A**</p>
                            <p className="font-sans text-sm text-gray-400">12/12/2021</p>
                        </div>
                        <div className="flex items-center">
                            <CustomInput type="switch" id="" label="" />
                            <MdClose  className="icon my-0 mr-3" style={{color: "#999", width: "24px"}} />
                        </div>
                    </div>
                </div>*/}

                {/* <div className="mb-40">
                    <a href="#" className="flex items-center">
                        <MdAddAlert  className="icon my-0 mr-3 text-red-600" style={{ width: "24px"}} />
                        <span className="font-sans font-bold text-sm text-red-600">Agregar alerta</span>
                    </a>
                </div> */}
            </div>
            {ModalEliminacion}
        </>
    );

    let classesContentDerecha = "py-4";
    let styleContentDerecha = { width: '22rem' };
    let childrenContentDerecha = (
        <>
            <div className='bg-white rounded shadow-md'>
                <div className='flex justify-between items-center'>
                    <div className="w-full text-center mt-4">
                        <p className="font-bold text-lg">Configurar Alerta</p>
                    </div>                       
                </div>
                <div className="bodyMensajeAlta mx-3 flex flex-col">
                    <div>
                        <ConfigurarAlerta 
                            ubicacionComponente="PagAlertas"
                            ctaCto={ctaCtoDispatch} 
                            params={paramsDispatch} 
                            cargarApisPA={(volverACargar: boolean) => setVolverACargar(volverACargar)} 
                        />
                    </div>
                </div>
            </div>
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
            childrenContentDerecha={childrenContentDerecha}
            classesContentDerecha={classesContentDerecha}
            styleContentDerecha={styleContentDerecha}
            scrollEnContentDerecha={false}
            titulo="Alertas Emisora"
        />
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        getAlertasEventoRespuesta: store.getAlertasEventoRespuesta,
        getAlertasVolatilidadRespuesta: store.getAlertasVolatilidadRespuesta,
        deleteAlertasEventoBajaRespuesta: store.deleteAlertasEventoBajaRespuesta,
        deleteAlertasVolatilidadBajaRespuesta: store.deleteAlertasVolatilidadBajaRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getAlertasEventoRequest: () => dispatch(getAlertasEventoRequest(dispatch)),
        getAlertasVolatilidadRequest: () => dispatch(getAlertasVolatilidadRequest(dispatch)),
        deleteAlertasEventoBajaRequest: () => dispatch(deleteAlertasEventoBajaRequest(dispatch)),
        deleteAlertasVolatilidadBajaRequest: () => dispatch(deleteAlertasVolatilidadBajaRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alertas);