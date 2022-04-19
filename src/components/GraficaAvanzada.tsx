import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { useHistory, useParams } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';

//Containers
import PageLayout from '../containers/layout/PageLayout';
import BotonesGraficador from '../containers/BotonesGraficador';
import RefinitivGraph from '../containers/RefinitivGraph';

//ACTIONS to call redux store
import { getCatalogoEmisorasRequest } from '../actions/getCatalogoEmisorasAction';
import { getPermisosRequest, getPermisosReset } from '../actions/getPermisosAction';

//TYPES to use data from store
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';
import { LoginObjectState } from '../types/LoginObjectTypes';
import { GetPermisosState, TtServicios } from '../types/GetPermisosType';
import { MdClose } from 'react-icons/md';
import Operations from '../containers/Operations';
//import { useHandleClickOutsideComponent } from '../utils/useHandleClickOutsideComponent';

interface propsFromState {
    loginObject?: LoginObjectState;
    catalogoEmisorasRespuesta?: CatalogoEmisorasState;
    getPermisosRespuesta?: GetPermisosState;
}

type AllProps = propsFromState;

const GraficaAvanzada: React.FC<AllProps> = ({ loginObject, catalogoEmisorasRespuesta, getPermisosRespuesta }) => {

    let ticker: any = useParams();

    const history = useHistory();
    const dispatch = useDispatch();

    let idLO = 0;
    let tokenLO = "";
    let canal = "";
    let cuentaLO = "";

    //HOOKS 
    const [emisoraObjSeleccionada, setEmisoraObjSeleccionada] = useState<Emisora>({
        PrimaryRIC: "",
        Emisora: "",
        CommonName: "",
        RIC: "",
        Serie: "",
        TechRules: "",
    });

    const [showModalOperaciones, setShowModalOperaciones] = useState(false);
    const [servTiempoRealActivo, setServTiempoRealActivo] = useState(false);

    const sendShowModalOperaciones = (data: boolean) => {
        if(data === showModalOperaciones){
            return;
        }
        setShowModalOperaciones(data);
    }

    const sendServTiempoRealActivo = (data: boolean) => {
        if(servTiempoRealActivo === data){
            return;
        }
        setServTiempoRealActivo(data);
    };


    useEffect(() => {
        if(loginObject !== undefined){
            if(loginObject.response.ierror === -1){
                if(loginObject.response.dsLogin.tdsLogin.length > 0){
    
                    const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
            
                    if(cuentaSesionLO != 0){
                        // mandamos llamar las apis sacando los datos del objeto de login
                
                        idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                        tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                        canal = "999";
                        cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                        //revisamos servicios/permisos del usuario
                        if(loginObject.response.dsLogin.tdsServicios.length > 0){
                            sendServTiempoRealActivo(loginObject.response.dsLogin.tdsServicios[0].TiempoReal);
                        }

                        if(catalogoEmisorasRespuesta != undefined){
                            if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                                if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length === 0){
                                    //el catalogo de emisoras no ha sido consultado
                                    //llamar dispatch para el catalogo de emisoras
                                    let message = "catalogo/emisora/catalogo";
                                    dispatch(getCatalogoEmisorasRequest({message}));
                                }
                            }
                        }
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en trading, lo mandamos al login");
                    history.push("/");
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en trading, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en trading, lo mandamos al login");
            history.push("/");
        }

        return () => {
            setServTiempoRealActivo(false);
            dispatch(getPermisosReset({ hacerReset: true }));
        }
        
    }, []);

    useEffect(() => {
        if(ticker.ticker.toString().length === 0 || !ticker.ticker.toString().includes(".")){
            //no mandaron un ticker
            history.goBack();
        }
        else{
            //llego un ticker, en ticker.ticker
            if(catalogoEmisorasRespuesta != undefined){
                if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                    if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length === 0){
                        //el catalogo de emisoras no ha sido consultado
                        //llamar dispatch para el catalogo de emisoras
                        let message = "catalogo/emisora/catalogo";
                        dispatch(getCatalogoEmisorasRequest({message}));
                    }
                    else{
                        const emisora: string = ticker.ticker.toString().split(".")[0].toUpperCase();
                        const serie: string = ticker.ticker.toString().split(".")[1].toUpperCase();
                        const filterTicker = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter((emis: Emisora) => {
                            return emisora === emis.Emisora.toUpperCase() && serie === emis.Serie.toUpperCase();
                        });

                        if(filterTicker.length > 0){
                            setEmisoraObjSeleccionada(filterTicker[0]);
                        }
                    }
                }
            }
        }
    }, [ticker]);

    useEffect(() => {
        if(catalogoEmisorasRespuesta != undefined){
            if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0 && catalogoEmisorasRespuesta.loading === false && catalogoEmisorasRespuesta.message.length > 0){
                    //el catalogo ya tiene emisoras en su lista
                    if(ticker.ticker.toString().length === 0 || !ticker.ticker.toString().includes(".")){
                        //no mandaron un ticker
                        history.goBack();
                    }
                    else{
                        const emisora: string = ticker.ticker.toString().split(".")[0].toUpperCase();
                        const serie: string = ticker.ticker.toString().split(".")[1].toUpperCase();
                        const filterTicker = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter((emis: Emisora) => {
                            return emisora === emis.Emisora.toUpperCase() && serie === emis.Serie.toUpperCase();
                        });

                        if(filterTicker.length > 0){
                            setEmisoraObjSeleccionada(filterTicker[0]);
                        }
                    }
                    
                }
            }
        }
    }, [catalogoEmisorasRespuesta?.loading, catalogoEmisorasRespuesta?.message]);

    const cerrarYReiniciarModal = () => {
        //cerramos modal y con eso se reinicia cuando se vuelve a abrir :)
        sendShowModalOperaciones(false);
    };

    /*useHandleOutsideClick({
        id: "ModalOperaciones",
        display: showModalOperaciones,
        setDisplay: sendShowModalOperaciones,
    });*/

    const ModalOperaciones = (
        <div 
            className={"w-7/24 h-auto absolute right-0 shadow-sm bg-white z-50 " + (showModalOperaciones ? "" : "hidden")} 
            style={{ top: "66px" }} 
            id="ModalOperaciones"
        >
            <div className="w-full border-b-2 border-gray-300">
                <div id="headerFormularioOp" className="w-full flex flex-row pt-3">
                    <div id="tituloOp" className="w-22/24">
                    </div>
                    <div id="tachitaOp" className="w-2/24 cursor-pointer" onClick={cerrarYReiniciarModal}>
                        <MdClose className="text-gray-800 text-base text-right" />
                    </div>
                </div>
                <div id="bodyModalOp">
                    <Operations 
                        emisora={emisoraObjSeleccionada.Emisora} 
                        serie={emisoraObjSeleccionada.Serie} 
                    />
                </div>
            </div>
        </div>
    );

    let classesContentPrincipal = " w-24/24 ";
    let contentPrincipal = (
        <>
            {
                emisoraObjSeleccionada.RIC.length > 0 ? 
                    <div className="pb-2 flex flex-col">
                        <div className="mb-4 flex flex-col" style={{ height:"600px" }}>
                            <div className="flex flex-row">
                                <div className="w-1/2 flex flex-col">
                                    <div className='pb-2'>
                                        <h1 className="font-sans text-2xl font-medium">Gráfica avanzada</h1>
                                    </div>
                                    <div className='flex flex-row'>
                                        <div className="w-full py-2 flex flex-row justify-start">
                                            <BotonesGraficador
                                                selectedOption="AVANZADA"
                                                basicaNav={() => {
                                                    history.goBack();
                                                }} 
                                                emisoraRic={emisoraObjSeleccionada.RIC}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-row justify-end">
                                    <div>
                                        <button onClick={() => sendShowModalOperaciones(true)} className="w-64 bg-red-600 p-1 text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                            Operaciones
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <RefinitivGraph 
                                tipoActualizacionInfo={ servTiempoRealActivo === true ? "REALTIME" : "DELAY" }
                                tipoGrafica="COMPLEJA"
                                ricEmisora={emisoraObjSeleccionada.RIC} 
                            />
                            {
                                //ModalOperaciones
                                showModalOperaciones === true && 
                                    <Modal isOpen={showModalOperaciones} toggle={cerrarYReiniciarModal}>
                                        <ModalBody>
                                            <div id="headerFormularioOp" className="w-full flex flex-row pt-3">
                                                <div id="tituloOp" className="w-22/24">
                                                </div>
                                                <div id="tachitaOp" className="w-2/24 cursor-pointer" onClick={cerrarYReiniciarModal}>
                                                    <MdClose className="text-gray-800 text-base text-right" />
                                                </div>
                                            </div>
                                            <div id="bodyModalOp">
                                                <Operations 
                                                    emisora={emisoraObjSeleccionada.Emisora} 
                                                    serie={emisoraObjSeleccionada.Serie} 
                                                />
                                            </div>
                                        </ModalBody>
                                    </Modal>
                            }
                        </div>
                    </div>
                :
                    <div className='pb-2 flex flex-col'>
                        <h1 className="font-sans text-2xl font-medium">Ocurrió un error. Intenta más tarde.</h1>
                        <button 
                            onClick={() => {
                                history.goBack()
                            }} 
                            className="my-3 w-32 bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                        >
                            Regresar
                        </button>
                    </div>
            }
        </>
    );

    return (
        <PageLayout
            classesContentPrincipal={classesContentPrincipal}
            childrenContentPrincipal={contentPrincipal}
            //childrenContentDerecha={<div></div>}
            //titulo="algo"
        />
    );
};

interface UseHandleOutsideClickProps {
    id: string;
    display: Boolean;
    setDisplay: Function;
  }
  
  function useHandleOutsideClick({
    id,
    display,
    setDisplay,
  }: UseHandleOutsideClickProps) {
    React.useEffect(() => {
      function listener(e: any) {
        const element = document.getElementById(id);
        console.log("element useHandleOutsideClick");
        console.log(element);
        console.log("e");
        console.log(e);
        if (element && !element.contains(e.target)) {
          if (display) {
            setDisplay(false);
            document.removeEventListener("click", listener);
          }
        }
      }
  
      if (display) {
        document.addEventListener("click", listener);
      }
    }, [display]);
  }


//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        getCatalogoEmisorasRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraficaAvanzada);
