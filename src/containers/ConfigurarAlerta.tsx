import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { MdClose } from "react-icons/md";
import parse from "html-react-parser";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { Digit, DigitData } from './Digit';
import { Dropdown } from "./Dropdown";
import Loading from '../components/Loading';
import { PostAlertasEventoAltaState } from '../types/PostAlertasEventoAltaType';
import { PostAlertasVolatilidadAltaState } from '../types/PostAlertasVolatilidadAltaType';
import { postAlertasVolatilidadAltaRequest } from '../actions/postAlertasVolatilidadAltaAction';
import { postAlertasEventoAltaRequest } from '../actions/postAlertasEventoAltaAction';
import { DataSearchGraficador, SearchGraficador } from './SearchGraficador';
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';
import { getCatalogoEmisorasRequest } from '../actions/getCatalogoEmisorasAction';
import { Slider, styled } from '@mui/material';
import { getCapEmisoraDetalleRequest } from '../actions/getCapEmisoraDetalleAction';
import { GetCapEmisoraDetalleState } from '../types/GetCapEmisoraDetalleType';
import { NavLink } from 'react-router-dom';

const VariacionSlider = styled(Slider)({
    color: '#FF5000',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#FFCAB2',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
  

interface ConfigurarAlertaProps {
    postAlertasEventoAltaRespuesta?: PostAlertasEventoAltaState;
    postAlertasVolatilidadAltaRespuesta?: PostAlertasVolatilidadAltaState;
    catalogoEmisorasRespuesta?: CatalogoEmisorasState;
    getCapEmisoraDetalleRespuesta?: GetCapEmisoraDetalleState;

    cargarApisPA?: (volverACargar: boolean) => void; // solo se manda si ubicacionComponente = PagAlertas
    
    emisoraPE?: string; // solo se manda si ubicacionComponente = PerfilEmisora
    seriePE?: string; // solo se manda si ubicacionComponente = PerfilEmisora

    ubicacionComponente: "PagAlertas" | "PerfilEmisora";
    params: string[];
    ctaCto: string;
}

const ConfigurarAlerta: React.FC<ConfigurarAlertaProps> = ({ params, ctaCto, postAlertasEventoAltaRespuesta, postAlertasVolatilidadAltaRespuesta, catalogoEmisorasRespuesta, cargarApisPA, getCapEmisoraDetalleRespuesta, ubicacionComponente, emisoraPE, seriePE }) => {

    //return <div></div>;

    //HOOKS
    const [listaCatEmisoras, setListaCatEmisoras] = useState<Emisora[]>([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState("Variacion");
    const [idTipoSeleccionado, setIdTipoSeleccionado] = useState("variacion");
    const [emisoraObjSeleccionada, setEmisoraObjSeleccionada] = useState<Emisora>({
        PrimaryRIC: "",
        Emisora: ubicacionComponente === "PerfilEmisora" && emisoraPE !== undefined ? emisoraPE : "",
        CommonName: "",
        RIC: "",
        Serie: ubicacionComponente === "PerfilEmisora" && seriePE !== undefined ? seriePE : "",
        TechRules: "",
    });
    const [didUserSelectedOption, setDidUserSelectedOption] = useState(true);
    const [precioApertura, setPrecioApertura] = useState(0);
    const [precioActual, setPrecioActual] = useState(0);
    const [variacionActual, setVariacionActual] = useState(0);
    const [porcentajeVariacion, setPorcentajeVariacion] = useState(0);

    const [inputLimite, setInputLimite] = useState("");

    const [errorNumApiAlta, setErrorNumApiAlta] = useState(-1);
    const [mensajeApiAlta, setMensajeApiAlta] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const sendListaCatEmisoras = (data: Emisora[]) => {
        if (listaCatEmisoras === data) {
            return;
        }
        setListaCatEmisoras(data);
    };

    const sendTipoSeleccionado = (data: string) => {
        if(data === tipoSeleccionado){
            return;
        }
        setTipoSeleccionado(data);
    };

    const sendIdTipoSeleccionado = (data: string) => {
        if(data === idTipoSeleccionado){
            return;
        }
        setInputLimite("");
        setIdTipoSeleccionado(data);
    };

    const sendEmisoraSeleccionada = (data: Emisora) => {
        if (emisoraObjSeleccionada === data) {
            return;
        }
        if (data.RIC.length === 0) {
            return;
        }
        setEmisoraObjSeleccionada(data);
    };

    const sendDidUserSelectedOption = (data: boolean) => {
        if (didUserSelectedOption === data) {
            return;
        }
        setDidUserSelectedOption(data);
    };

    const sendPrecioApertura = (data: number) => {
        if(data === precioApertura){
            return;
        }
        setPrecioApertura(data);
    };

    const sendPrecioActual = (data: number) => {
        if(precioActual === data){
            return;
        }
        setPrecioActual(data);
    };

    const sendVariacionActual = (data: number) => {
        if(variacionActual === data){
            return;
        }
        setVariacionActual(data);
    };

    const sendPorcentajeVariacion = (data: number) => {
        if(porcentajeVariacion === data){
            return;
        }
        setPorcentajeVariacion(data);
    }
    
    const dispatch = useDispatch();

    const sendSeEnviaPrimeraEmisora = (data: boolean) => {
        //no hacemos nada :s
    };

    useEffect(() => {
        if(params.length > 0 && ctaCto.length > 0 && ubicacionComponente === "PagAlertas"){
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
    }, [params, ctaCto]);

    
    useEffect(() => {
        if(catalogoEmisorasRespuesta != undefined){
            if(catalogoEmisorasRespuesta.message.length > 0 && catalogoEmisorasRespuesta.loading === false){
                if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                    if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0 && catalogoEmisorasRespuesta.loading === false && catalogoEmisorasRespuesta.message.length > 0 && listaCatEmisoras.length !== catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length){
                        //el catalogo ya tiene emisoras en su lista
                        const catEmisorasSorted = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.sort((a,b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));
                        sendListaCatEmisoras(catEmisorasSorted);
                    }
                }
            }
        }
    }, [catalogoEmisorasRespuesta?.loading, catalogoEmisorasRespuesta?.message]);

    useEffect(() => {
        if(postAlertasEventoAltaRespuesta !== undefined){
            if(postAlertasEventoAltaRespuesta.loading === false && postAlertasEventoAltaRespuesta.message.length > 0){
                if(postAlertasEventoAltaRespuesta.postAlertasEventoAltaRespuesta !== undefined){
                    setErrorNumApiAlta(postAlertasEventoAltaRespuesta.postAlertasEventoAltaRespuesta.ierror)
                    setMensajeApiAlta(postAlertasEventoAltaRespuesta.postAlertasEventoAltaRespuesta.cerror);
                }
            }
        }
    }, [postAlertasEventoAltaRespuesta?.loading, postAlertasEventoAltaRespuesta?.message]);

    
    useEffect(() => {
        if(postAlertasVolatilidadAltaRespuesta !== undefined){
            if(postAlertasVolatilidadAltaRespuesta.loading === false && postAlertasVolatilidadAltaRespuesta.message.length > 0){
                if(postAlertasVolatilidadAltaRespuesta.postAlertasVolatilidadAltaRespuesta !== undefined){
                    setErrorNumApiAlta(postAlertasVolatilidadAltaRespuesta.postAlertasVolatilidadAltaRespuesta.ierror);
                    setMensajeApiAlta(postAlertasVolatilidadAltaRespuesta.postAlertasVolatilidadAltaRespuesta.cerror);
                }
            }
        }
    }, [postAlertasVolatilidadAltaRespuesta?.loading, postAlertasVolatilidadAltaRespuesta?.message]);
    
    useEffect(() => {
        if(idTipoSeleccionado !== "evento" && emisoraObjSeleccionada.Emisora.length > 0 && emisoraObjSeleccionada.Serie.length > 0){
            if(getCapEmisoraDetalleRespuesta !== undefined){
                if(getCapEmisoraDetalleRespuesta.loading === false){
                    if(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta !== undefined){
                        if(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora !== undefined){
                            if(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora.length > 0){
                                if(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora[0].Emisora.trim().toUpperCase() === emisoraObjSeleccionada.Emisora.trim().toUpperCase()
                                && getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora[0].Serie.trim().toUpperCase() === emisoraObjSeleccionada.Serie.trim().toUpperCase()){
                                    //no hacemos el dispatch :)
                                }
                                else{
                                    let message = "cap/emisoradetalle?emisora=" + emisoraObjSeleccionada.Emisora.trim().toUpperCase() + "&serie=" + emisoraObjSeleccionada.Serie.trim().toUpperCase() + "&bolsa=bmv";
                                    dispatch(getCapEmisoraDetalleRequest({message, params}));
                                }
                            }
                            else{
                                let message = "cap/emisoradetalle?emisora=" + emisoraObjSeleccionada.Emisora.trim().toUpperCase() + "&serie=" + emisoraObjSeleccionada.Serie.trim().toUpperCase() + "&bolsa=bmv";
                                dispatch(getCapEmisoraDetalleRequest({message, params}));
                            }
                        }
                        else{
                            let message = "cap/emisoradetalle?emisora=" + emisoraObjSeleccionada.Emisora.trim().toUpperCase() + "&serie=" + emisoraObjSeleccionada.Serie.trim().toUpperCase() + "&bolsa=bmv";
                            dispatch(getCapEmisoraDetalleRequest({message, params}));
                        }
                    }
                    else{
                        let message = "cap/emisoradetalle?emisora=" + emisoraObjSeleccionada.Emisora.trim().toUpperCase() + "&serie=" + emisoraObjSeleccionada.Serie.trim().toUpperCase() + "&bolsa=bmv";
                        dispatch(getCapEmisoraDetalleRequest({message, params}));
                    }
                }
            }
            else{
                let message = "cap/emisoradetalle?emisora=" + emisoraObjSeleccionada.Emisora.trim().toUpperCase() + "&serie=" + emisoraObjSeleccionada.Serie.trim().toUpperCase() + "&bolsa=bmv";
                dispatch(getCapEmisoraDetalleRequest({message, params}));
            }
        }
    }, [emisoraObjSeleccionada.Emisora, emisoraObjSeleccionada.Serie , idTipoSeleccionado]);

    useEffect(() => {
        if(getCapEmisoraDetalleRespuesta !== undefined){
            if(getCapEmisoraDetalleRespuesta.loading === false && getCapEmisoraDetalleRespuesta.message.length > 0){
                if(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta !== undefined){
                    if(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora !== undefined){
                        if(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora.length > 0){
                            sendPrecioApertura(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora[0].Precio_Anterior);
                            sendPrecioActual(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora[0].Precio_Actual);
                            sendVariacionActual(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora[0].Variacion);
                            sendPorcentajeVariacion(getCapEmisoraDetalleRespuesta.getCapEmisoraDetalleRespuesta.dsDetalleEmisora.ttDetalleEmisora[0].Porcentaje_Var);
                        }
                    }
                }
            }
        }
    }, [getCapEmisoraDetalleRespuesta?.loading, getCapEmisoraDetalleRespuesta?.message]);

    const reiniciarStoresAltas = () => {
        //se reinicia :)
        if(errorNumApiAlta === 0 && cargarApisPA !== undefined){
            //error === 0 significa EXITO, entonces mandamos llamar este metodo con true para que se vuelvan a hacer los dispatches en la pag
            cargarApisPA(true);
        }
        setModalOpen(false);
        setInputLimite("");
        sendEmisoraSeleccionada({
            PrimaryRIC: "",
            Emisora: "",
            CommonName: "",
            RIC: "",
            Serie: "",
            TechRules: "",
        });

        //resets de las apis -- TAL VEZ, lo sigo pensando si es necesario o no

    };

    const guardarAlerta = () => {
        if(ctaCto.length > 0 && params.length > 0){
            if(idTipoSeleccionado === "evento"){
                let message = "alertasevento/alta?emisora=" + emisoraObjSeleccionada.Emisora + "&serie=" + emisoraObjSeleccionada.Serie;
                dispatch(postAlertasEventoAltaRequest({message, params}));
            }
            else{
                let message = "alertasvolatilidad/alta?tipo=" + idTipoSeleccionado + "&emisora=" + emisoraObjSeleccionada.Emisora + "&serie=" + emisoraObjSeleccionada.Serie + "&linf=" + inputLimite + "&lsup=" + inputLimite;
                dispatch(postAlertasVolatilidadAltaRequest({message, params}));
            }
            setModalOpen(true);
        }
    };

    const DigitDataLim: DigitData = {
        id: "diLI1",
        title: "Limite inferior",
        minValue: idTipoSeleccionado === "precio" ? 0 : -50, 
        maxValue: idTipoSeleccionado === "precio" ? undefined : 50, 
        errorMessage: idTipoSeleccionado === "precio" ? "Valor (número entero o decimal) mínimo del precio debe ser: 0" : "Valor (número entero o decimal) de la variación debe ser entre: -50 y 50%",
        subAmount: 1,
        addAmount: 1,
        placeholder: "00",
        subfix: "",
        decimals: 2,
    };

    const DropdownDataTipos = [
        {
            id: "variacion",
            option: "Variación",
        },
        {
            id: "precio",
            option: "Precio",
        },
        {
            id: "evento",
            option: "Evento",
        },
    ];

    
    const SearchDataCatalogoEmisorasParaElGraficador: DataSearchGraficador[] = [
        {
            id: "searchGraficador",
            title: "Buscar una emisora...",
            optionsEmisoras: listaCatEmisoras,
            noMatch: "No se encontraron Emisoras",
            placeholder: "Buscar una emisora...",
        },
    ];

    const toggle = () => setModalOpen(!modalOpen);

    const ModalFinCreacion = (
        <Modal isOpen={modalOpen} toggle={toggle}>
            <ModalBody>
                <div className="headerYClose w-full flex flex-row py-3">
                    <div className="titulo w-22/24">
                        <p className="my-1 font-bold text-center">Creación de Alerta</p>
                    </div>
                    <div className="tachita w-2/24 cursor-pointer" onClick={() => reiniciarStoresAltas()}>
                        <MdClose className="text-gray-800 text-base text-right" />
                    </div>
                </div>
                {
                    postAlertasEventoAltaRespuesta?.loading === true || postAlertasVolatilidadAltaRespuesta?.loading === true ?
                        <Loading />
                    :
                        <div className="bodyMensajeAlta flex flex-col">
                            <div className="py-2 w-full">
                                {
                                    errorNumApiAlta !== 0 && <p className="text-base text-red-500 font-bold pb-1">Error:</p>
                                }
                                <p className="text-base text-gray-800">{parse(mensajeApiAlta)}</p>
                            </div>
                            <div className="btnCerrar flex flex-col w-full py-2">
                                <button className="w-full bg-red-600 my-1 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => reiniciarStoresAltas()}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                }
            </ModalBody>
        </Modal>
    );

    return (
        <>
            <div>
                {/* <div id="tituloCompAlerta" className="title flex flex-col">
                    <p className="font-bold text-center">Configurar Alerta</p>
                    {
                        ubicacionComponente === "PerfilEmisora" && emisoraPE !== undefined && seriePE !== undefined && <p className="text-sm font-bold text-center">{emisoraPE}.{seriePE}</p>
                    }
                </div> */}
                <div id="selectTipoAlerta" className="my-4">
                    <p className="text-sm mb-2">Tipo de Alerta</p>
                    <div>
                        <Dropdown
                            dropdownData={DropdownDataTipos}
                            initialOption={tipoSeleccionado}
                            side={false}
                            sendOption={(tipo: any) => sendTipoSeleccionado(tipo)}
                            sendId={(id: any) => sendIdTipoSeleccionado(id)}
                            fondosFamilia={false}
                        />
                        {/*<select name="" id="" className="w-full border-2 border-gray-300 text-xs text-gray-400 py-2 pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent">
                            <option value="">Variación</option>
                            <option value="">Precio</option>
                            <option value="">Evento</option>
                        </select>*/}
                    </div>
                </div>
                <div id="formAlertas">
                    <div id="buscadorEmisoras" className="mb-2">
                        {
                            ubicacionComponente === "PagAlertas" && <>
                                <p className="text-sm mb-2">Emisora</p>
                                {
                                    catalogoEmisorasRespuesta?.loading === true ?
                                        <Loading />
                                    :
                                    <SearchGraficador
                                        searchData={SearchDataCatalogoEmisorasParaElGraficador}
                                        selectedOption={emisoraObjSeleccionada}
                                        sendOption={(emisSelecc: Emisora) => sendEmisoraSeleccionada(emisSelecc)}
                                        didUserSelectedOption={didUserSelectedOption}
                                        sendDidUserSelectedOption={(didUserSelect: boolean) => sendDidUserSelectedOption(didUserSelect)}
                                        seEnviaPrimeraEmisora={false}
                                        sendSeEnviaPrimeraEmisora={(seEnviaPrEm: boolean) => sendSeEnviaPrimeraEmisora(seEnviaPrEm)}
                                        side={true}
                                        doNotSendOptionOnOnChange={true}
                                    />
                                }
                            </>
                        }
                        {/*<input type="text" placeholder="Buscar" className="w-full border-2 border-gray-300 text-xs text-gray-400 py-2 pl-7 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" />*/}
                    </div>
                    <div id="infoCapEmisoraDetalle" className="flex justify-between mb-3">
                        {
                            idTipoSeleccionado !== "evento" && getCapEmisoraDetalleRespuesta?.loading === true && <Loading />
                        }
                        {
                            idTipoSeleccionado !== "evento" && getCapEmisoraDetalleRespuesta?.loading === false && <>
                                <div>
                                    <p className="text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(precioApertura)}</p>
                                    <p className="text-xs text-gray-400">Precio de apertura</p>
                                </div>
                                <div>
                                    <p className="text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(variacionActual)}</p>
                                    <p className="text-xs text-gray-400">Variación actual</p>
                                </div>
                                <div>
                                    <p className="text-sm">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(precioActual)}</p>
                                    <p className="text-xs text-gray-400">Precio actual</p>
                                </div>
                            </>
                        }
                    </div>
                    <div id="AlertarmeCuando">
                        {
                            idTipoSeleccionado !== "evento" && <p className="text-sm mt-3">Alertarme cuando:</p>
                        }
                        <div id="DigitDataYSlider" className="my-3">
                            {
                                idTipoSeleccionado !== "evento" && <Digit digitData={DigitDataLim} initialCount={inputLimite} sendCount={(lim) => setInputLimite(lim)} sizeFull={true} type={ idTipoSeleccionado}/>
                            }
                            {
                                idTipoSeleccionado === "variacion" && <div className="flex flex-col">
                                    <div className="">
                                        <VariacionSlider 
                                            aria-label="slideVar"
                                            defaultValue={0}
                                            value={inputLimite.length === 0 ? 0 : parseInt(inputLimite)}
                                            onChange={(event, nuevoLimite) => setInputLimite(nuevoLimite.toString())}
                                            getAriaValueText={(valor: number) => {
                                                return inputLimite.toString() + "%";
                                            }}
                                            valueLabelFormat={(valor: number) => {
                                                return inputLimite.toString() + "%";
                                            }}
                                            valueLabelDisplay="auto"
                                            min={-50}
                                            max={50}
                                            marks={[
                                                {
                                                    value: -50,
                                                    label: <p className="flex flex-col text-center text-sm text-gray-400 pl-6"><span>Baja</span><span className="text-xs">-50%</span></p>,//"-50%",
                                                },
                                                {
                                                    value: 0,
                                                    label: <p className="flex flex-col text-center text-sm text-gray-400"><span>0%</span></p>,//"0%",
                                                },
                                                {
                                                    value: 50,
                                                    label: <p className="flex flex-col text-center text-sm text-gray-400 pr-6"><span>Alza</span><span className="text-xs">50%</span></p>,//"50%",
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <p className="text-xs pb-2">Variación respecto el precio de apertura y el actual.</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div id="btnCrearAlerta">
                        {
                            postAlertasEventoAltaRespuesta?.loading === true || postAlertasVolatilidadAltaRespuesta?.loading === true ?
                                <Loading />
                            : ctaCto.length === 0 && params.length === 0 ?
                                <button 
                                    disabled={true}
                                    className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 rounded cursor-not-allowed"
                                >
                                    Crear Alerta
                                </button>
                            : idTipoSeleccionado.length === 0 ?
                                <button 
                                    disabled={true}
                                    className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 rounded cursor-not-allowed"
                                >
                                    Crear Alerta
                                </button>
                            : emisoraObjSeleccionada === undefined ? 
                                <button 
                                    disabled={true}
                                    className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 rounded cursor-not-allowed"
                                >
                                    Crear Alerta
                                </button>
                            : emisoraObjSeleccionada.Emisora.length === 0 || emisoraObjSeleccionada.Serie.length === 0 ?
                                <button 
                                    disabled={true}
                                    className="w-full bg-gray-350 p-1 text-sm text-gray-100 border-1 rounded cursor-not-allowed"
                                >
                                    Crear Alerta
                                </button>
                            : (idTipoSeleccionado === "precio" && /^-?(0|[1-9]\d*)(\.\d+)?$/gm.test(inputLimite) && inputLimite.length > 0 && !inputLimite.startsWith("-") && parseInt(inputLimite) >= 0) ?
                                <button 
                                    onClick={guardarAlerta}
                                    data-toggle="toggle" 
                                    className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                >
                                    Crear Alerta
                                </button>
                            : (idTipoSeleccionado === "variacion" && /^-?(0|[1-9]\d*)(\.\d+)?$/gm.test(inputLimite) && inputLimite.length > 0 && parseInt(inputLimite) >= -50 && parseInt(inputLimite) <= 50) ?
                                <button 
                                    onClick={guardarAlerta}
                                    data-toggle="toggle" 
                                    className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                >
                                    Crear Alerta
                                </button>
                            : idTipoSeleccionado === "evento" && emisoraObjSeleccionada.Emisora.length > 0 && emisoraObjSeleccionada.Serie.length > 0 ?
                                <button 
                                    onClick={guardarAlerta}
                                    data-toggle="toggle" 
                                    className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                >
                                    Crear Alerta
                                </button>
                            :
                                <button 
                                    disabled={true}
                                    className="w-full  bg-gray-350 p-1 text-sm text-gray-100 border-1 rounded cursor-not-allowed"
                                >
                                    Crear Alerta
                                </button>  
                        }
                    </div>
                    <div id="btnVerTodasAlertas" className="mb-2">
                        {
                            ubicacionComponente === "PerfilEmisora" && <NavLink to="/perfil-alertas">
                                <div className="float-right mt-2.5 text-sm text-red-600 cursor-pointer hover:underline">
                                    <p>Ver todas las alertas</p>
                                </div>
                            </NavLink>
                        }
                    </div>
                    {ModalFinCreacion}
                </div>
            </div>
        </>
    );
}; 

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getCatalogoEmisorasRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
        postAlertasEventoAltaRequest: () => dispatch(postAlertasEventoAltaRequest(dispatch)),
        postAlertasVolatilidadAltaRequest: () => dispatch(postAlertasVolatilidadAltaRequest(dispatch)),
        getCapEmisoraDetalleRequest: () => dispatch(getCapEmisoraDetalleRequest(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
        postAlertasEventoAltaRespuesta: store.postAlertasEventoAltaRespuesta,
        postAlertasVolatilidadAltaRespuesta: store.postAlertasVolatilidadAltaRespuesta,
        getCapEmisoraDetalleRespuesta: store.getCapEmisoraDetalleRespuesta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurarAlerta);