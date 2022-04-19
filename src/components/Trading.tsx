import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { useHistory } from 'react-router-dom';
// import { Alert } from 'reactstrap';

//Containers
import PageLayout from '../containers/layout/PageLayout';
import Appbar from './Appbar';
import { appBarMockData } from '../mocks/Appbar';
import Sidebar from '../components/Sidebar';
import Operations from '../containers/Operations';
import CardPagination from "../containers/CardPagination";
import Positions from "../containers/Positions";
import Navbar from '../containers/Navbar';
import RefinitivGraph from '../containers/RefinitivGraph';
import TradingMonitor from '../containers/TradingMonitor';
import { DataSearchGraficador, SearchGraficador } from '../containers/SearchGraficador';
import IndiceFx from '../containers/IndiceFx';
import Comodities from '../containers/Comodities';
import PrincipalesIndicadoresComponent from "../containers/PrincipalesIndicadores";
import { FooterComponent } from '../containers/FooterComponent';
import Movers from '../containers/Movers';
import Ordenes from '../containers/Ordenes';
import Alert from '../containers/Alert';

//Mocks
import { NavOrdenes } from '../mocks/TabsData';

//ACTIONS to call redux store
import { getEmisorasSimilaresRequest } from '../actions/emisorasSimilaresAction';
import { getCatalogoEmisorasRequest } from '../actions/getCatalogoEmisorasAction';
import { catalogoTradingRequest } from "../actions/catalogoTradingAction";
import { getListRequest } from "../actions/listAction";
import { getCommoditiesRequest} from '../actions/commoditiesAction';
import { getPermisosRequest, getPermisosReset } from '../actions/getPermisosAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//TYPES to use data from store
import { ListState } from "../types/ListTypes";
import { getCatalogoListaEmisorasRequest } from '../actions/getCatalogoListaEmisorasAction';
import { IMoversData, MoversState } from '../types/MoversType';
import TickerTrading from '../containers/TickerTrading';
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';
import { getDsPortafolioRequest } from '../actions/portfolioAction';
import { CommoditiesState, IndicesArray } from '../types/CommoditiesType';
import { LoginObjectState } from '../types/LoginObjectTypes';
import { PortfolioStatus } from '../types/PortfolioTypes';
import { CatalogoTradingStatus } from '../types/CatalogoTradingTypes';
import { PostListState } from "../types/PostList";
import { CatalogoListaEmisorasState } from '../types/GetCatalogoListaEmisorasType';
import { DeleteIssuerState } from '../types/DeleteIssuerTypes';
import { PostIssuerState } from '../types/PostIssuerTypes';
import BotonesGraficador from '../containers/BotonesGraficador';

interface propsFromState {
    loginObject?: LoginObjectState;
    tradingComponents: boolean;
    listItems: ListState;
    catalogoEmisorasRespuesta: CatalogoEmisorasState;
    portfolio: PortfolioStatus;
    catalogoTrading: CatalogoTradingStatus;
    catalogoListaEmisorasRespuesta: CatalogoListaEmisorasState;
    moversList: MoversState;
    commodities?: CommoditiesState;
    postList: PostListState;
    deleteIssuer: DeleteIssuerState;
    postIssuer: PostIssuerState;
}

type AllProps = propsFromState;

const Trading: React.FC<AllProps> = ({ loginObject, listItems, catalogoEmisorasRespuesta, portfolio, catalogoTrading, postList, moversList, catalogoListaEmisorasRespuesta, commodities, deleteIssuer, postIssuer }) => {

    console.log("pag trading");
    const history = useHistory();
    const dispatch = useDispatch();

    //HOOKS - para dispatches
    const [paramsDispatchParaMovers, setParamsDispatchParaMovers] = useState<string[]>([]);

    const sendParamsDispatchParaMovers = (data: string[]) => {
        if(paramsDispatchParaMovers === data){
            return;
        }
        setParamsDispatchParaMovers(data);
    };

    const [alertShow, setAlertShow] = useState(false);
    const [ready, setReady] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    let idLO = 0;
    let tokenLO = "";
    let canal = "";
    let cuentaLO = "";

    useEffect(() => {
        if(portfolio.emisorasRefinitiv !== "" && catalogoTrading.posicionTradingMX.length === 0) {
            dispatch(catalogoTradingRequest({message: "catalogo/emisora/emisoras?emisoras="+portfolio.emisorasRefinitiv, emisorasCatalogo: portfolio.tradingData}));
        }
    },[portfolio.emisorasRefinitiv]);

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
                        setReady(!ready);

                        dispatch(getEmisorasSimilaresRequest({message: "emisora/recomendacion/AMXL"}));
                        console.log("trading", listItems.list)
                        let messageList = "lista/"+cuentaLO;
                        dispatch(getListRequest({ message: messageList, id: idLO.toString() }));
    
                        //let m = "cap/mercadomayorescambios?filtro=";
                        if(paramsDispatchParaMovers.length === 0){
                            let p = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ]; //tiene esta estructura ["", canal, cuentasesion, token, id]
                            //console.log("cambiamos params trading");
                            //console.log(p);
                            sendParamsDispatchParaMovers(p);
                        }
                        //dispatch(getMoversRequest({message: m, params: p}));

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

                        //Dispatching action to load user's Posiciones
                        if(portfolio.message == ""){
                            //el estado esta en initial state, hacemos el dispatch a portfolio
                            let message = "/consulta/portafolio?cuenta=" + cuentaLO.toString();
                            let params = ["", canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                            let a = { message, params }
                            dispatch(getDsPortafolioRequest(a));
                        }
                    }

                    let message = "commodities";
                    let a = { message };
                    dispatch(getCommoditiesRequest(a));

                    //revisamos servicios/permisos del usuario
                    if(loginObject.response.dsLogin.tdsServicios.length > 0){
                        sendServTiempoRealActivo(loginObject.response.dsLogin.tdsServicios[0].TiempoReal);
                    }
                    
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en trading, lo mandamos al login");
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
            console.log("usuario no loggeado en trading, lo mandamos al login");
            history.push("/");
        }

        return () => {
            setServTiempoRealActivo(false);
        }
        
    }, []);
    
    //HOOKS 
    const [ricSeleccionado, setRicSeleccionado] = useState("");
    const [listaCatEmisoras, setListaCatEmisoras] = useState<Emisora[]>([]);
    const [emisoraObjSeleccionada, setEmisoraObjSeleccionada] = useState<Emisora>({
        PrimaryRIC: "",
        Emisora: "NAFTRAC",
        CommonName: "", 
        RIC: "NAFTRACISHRS.MX",
        Serie: "ISHRS",
        TechRules: "",
    });
    const [didUserSelectedOption, setDidUserSelectedOption] = useState(true);
    const [seEnviaPrimeraEmisora, setSeEnviaPrimeraEmisora] = useState(true);
    const [arregloCommInd, setArregloCommInd] = useState<IndicesArray[]>([]);

    const [servTiempoRealActivo, setServTiempoRealActivo] = useState(false);
    const [servProfundidadActivo, setServProfundidadActivo] = useState(false);

    const sendServTiempoRealActivo = (data: boolean) => {
        if(servTiempoRealActivo === data){
            return;
        }
        setServTiempoRealActivo(data);
    };

    const sendServProfundidadActivo = (data: boolean) => {
        if(servProfundidadActivo === data){
            return;
        }
        setServProfundidadActivo(data);
    };

    const sendArregloCommInd = (data: IndicesArray[]) => {
        if(data === arregloCommInd){
            return;
        }
        setArregloCommInd(data);
    }

    const sendRicSeleccionado = (data: string) => {
        if (ricSeleccionado === data) {
            return;
        }
        console.log("nuevo ric seleccionado");
        console.log(data);
        setRicSeleccionado(data);
    };

    const sendListaCatEmisoras = (data: Emisora[]) => {
        if (listaCatEmisoras === data) {
            return;
        }
        setListaCatEmisoras(data);
    };

    const sendEmisoraSeleccionada = (data: Emisora) => {
        if (emisoraObjSeleccionada.RIC === data.RIC) {
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

    const sendSeEnviaPrimeraEmisora = (data: boolean) => {
        if (seEnviaPrimeraEmisora === data) {
            return;
        }
        setSeEnviaPrimeraEmisora(data);
    };

    useEffect(() => {
        if(catalogoEmisorasRespuesta != undefined){
            if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
                if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0 && catalogoEmisorasRespuesta.loading === false && catalogoEmisorasRespuesta.message.length > 0){
                    //el catalogo ya tiene emisoras en su lista
                    console.log("guardar catalogo trading");
                    const catEmisorasSorted = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.sort((a,b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));
                    sendListaCatEmisoras(catEmisorasSorted);

                    if (seEnviaPrimeraEmisora) {
                        let emisoraSeleccionadaRICArray: Emisora | undefined = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.find(function(item: Emisora){
                            return( item.Emisora.trim() === "NAFTRAC" && item.Serie.trim() === "ISHRS" );
                        });

                        if(emisoraSeleccionadaRICArray !== undefined){
                            // Se encontro la emisora NAFTRAC
                            sendEmisoraSeleccionada(emisoraSeleccionadaRICArray);
                            sendRicSeleccionado(emisoraSeleccionadaRICArray.RIC);
                        }
                        else{
                            // Se pone por default una emisora
                            sendEmisoraSeleccionada(catEmisorasSorted[3]);
                            sendRicSeleccionado(catEmisorasSorted[3].RIC);
                        }
                    }
                }
            }
        }
    }, [catalogoEmisorasRespuesta.loading, catalogoEmisorasRespuesta.message]);

    useEffect(() => {
        if (emisoraObjSeleccionada != undefined) {
            sendRicSeleccionado(emisoraObjSeleccionada.RIC);
        }
    }, [emisoraObjSeleccionada]);

    // useEffect(() => {
    //     if(!listItems.loading) {
    //         let messageList = "lista/"+cuentaLO;
    //         dispatch(getListRequest({ message: messageList, id: idLO.toString() }));
    //     }
    // }, [listItems.list.length]);

    useEffect(() => {
        //cada vez que se actualicen los movers, mandamos a llamar el api de catalogo de emisoras enviando la lista de emisoras
        
        if(moversList != undefined){
            if(moversList.moversList != undefined){
                if(moversList.moversList.length > 0){
                    //hay emisoras en los movers
                    let listaMoversTendenciaAlza = moversList.moversList.filter(function(item: IMoversData){
                        return item.tendencia == "ALZA";
                    });
                    if(listaMoversTendenciaAlza.length > 0){
                        //hay movers con tendencia alza

                        const listaEmisoraSerieMoversAlza: string[] = listaMoversTendenciaAlza.map(function(item: IMoversData){
                            return encodeURIComponent(item.emisora.trim() + "." + item.serie.trim());
                        });
                        const emisorasQueryStringParam: string = listaEmisoraSerieMoversAlza.join(",");
                    
                        //llamada a api de catalogo por lista de emisoras
                        let message = "catalogo/emisora/emisoras?emisoras=" + emisorasQueryStringParam;
                        dispatch(getCatalogoListaEmisorasRequest({message}));

                    }
                }
            }
        }
    
      }, [moversList.moversList]);

    useEffect(() => {
        if(!postList.loading && ready) {
            setMessageAlert(postList.messageError);
            setAlertShow(true);
            // window.setTimeout(()=>{
            //     setAlertShow(false)
            // },2000)
        }
    },[postList.loading]);

    useEffect(() => {
        if(!deleteIssuer.loading && ready) {
            setMessageAlert(deleteIssuer.messageError);
            setAlertShow(true);
            // window.setTimeout(()=>{
            //     setAlertShow(false)
            // },2000)
        }
    },[deleteIssuer.loading]);

    useEffect(() => {
        if(!postIssuer.loading && ready) {
            setMessageAlert(postIssuer.messageRespueta);
            setAlertShow(true);
            // window.setTimeout(()=>{
            //     setAlertShow(false)
            // },2000)
        }
    },[postIssuer.loading]);

    useEffect(() => {
        if(commodities !== undefined){
            if(commodities.message.length > 0 && commodities.loading === false){
                if(commodities.response !== undefined){
                    let ArreglocommoditeseIndices: IndicesArray[] = [];

                    if(commodities.response.indices !== undefined){
                        if(commodities.response.indices.length > 0){
                            ArreglocommoditeseIndices.push(...commodities.response.indices.filter((item: IndicesArray) => {
                                return item.ric.length > 0;
                            }));
                        }
                    }
                    if(commodities.response.commodities !== undefined){
                        if(commodities.response.commodities.length > 0){
                            ArreglocommoditeseIndices.push(...commodities.response.commodities.filter((item: IndicesArray) => {
                                return item.ric.length > 0;
                            }));
                        }
                    }

                    sendArregloCommInd(ArreglocommoditeseIndices);

                }
            }
        }
    }, [commodities?.message, commodities?.loading]);

    const SearchDataCatalogoEmisorasParaElGraficador: DataSearchGraficador[] = [
        {
            id: "searchGraficador",
            title: "Buscar emisora",
            optionsEmisoras: listaCatEmisoras,
            noMatch: "No se encontraron Emisoras",
            placeholder: "Buscar emisora",
        },
    ];

    // console.log("ricSeleccionado antes de return");
    // console.log(ricSeleccionado);

    const styleSidebar = { width:"3.75%" };

    const classesContentPrincipal = "p-3";
    const styleContentPrincipal = { width: "78%" };

    let contentPrincipal = (
        <>
            <div className="flex flex-col">
                {
                    catalogoListaEmisorasRespuesta && 
                    catalogoListaEmisorasRespuesta.catalogoListaEmisorasRespuesta && 
                    catalogoListaEmisorasRespuesta.catalogoListaEmisorasRespuesta.length > 0 && 
                    <div className="w-full mt-3">
                        <TickerTrading 
                            tipoActualizacionMiniGraf={ servTiempoRealActivo === true ? "REALTIME" : "DELAY" }
                            listaEmisoras={catalogoListaEmisorasRespuesta.catalogoListaEmisorasRespuesta.filter((item: Emisora) => {
                                return item.RIC.trim() != "";
                            })} 
                            listaMovers={moversList.moversList.filter(function(item: IMoversData){
                                return item.tendencia == "ALZA";
                            })} listaIndices={arregloCommInd} 
                        />
                    </div>
                }
                <div className="flex flex-col">
                    <div className="searchGraficador my-4" style={{ height:"600px" }}>
                        {/*<div className='py-2'>
                            <h1 className="font-sans text-xl text-gray-800  font-medium border-b border-gray-300 pb-2">Graficador</h1>
                        </div>*/}
                        <div className='flex flex-row'>
                            <div className='w-1/2'>
                                <SearchGraficador
                                    searchData={SearchDataCatalogoEmisorasParaElGraficador}
                                    selectedOption={emisoraObjSeleccionada}
                                    sendOption={(emisSelecc: Emisora) => sendEmisoraSeleccionada(emisSelecc)}
                                    didUserSelectedOption={didUserSelectedOption}
                                    sendDidUserSelectedOption={(didUserSelect: boolean) => sendDidUserSelectedOption(didUserSelect)}
                                    seEnviaPrimeraEmisora={seEnviaPrimeraEmisora}
                                    sendSeEnviaPrimeraEmisora={(seEnviaPrEm: boolean) => sendSeEnviaPrimeraEmisora(seEnviaPrEm)}
                                    side={false}
                                    doNotSendOptionOnOnChange={true}
                                />
                            </div>
                            <div className="w-1/2 flex flex-row justify-end">
                                <div>
                                    <BotonesGraficador
                                        selectedOption="BASICA"
                                        avanzadaNav={() => {
                                            history.push("/avanzada/" + emisoraObjSeleccionada.Emisora + "." + emisoraObjSeleccionada.Serie);
                                        }} 
                                        emisoraRic={emisoraObjSeleccionada.RIC}
                                    />
                                </div>
                            </div>
                        </div>
                        <RefinitivGraph 
                            tipoActualizacionInfo={ servTiempoRealActivo === true ? "REALTIME" : "DELAY" }
                            ricEmisora={ricSeleccionado} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-sans text-xl text-gray-800 border-b border-gray-300 pb-2">Monitor de acciones</h1>
                        <div className="my-4">
                            <Alert message={messageAlert} isOpen={alertShow} sendIsOpen={(open) => setAlertShow(open)} />
                            <TradingMonitor appBarData={appBarMockData} />
                        </div>
                        <div className="my-4">
                            <Ordenes />
                        </div>
                        {/*<Navbar navData={["Mercado de Capitales", "Fondos de Inversión"]} data={NavOrdenes()} /> <br />*/}
                        <div className="my-16">
                            <Movers paramsParaMovers={paramsDispatchParaMovers} servTiempoRealActivo={servTiempoRealActivo} />
                        </div>
                        <div className="my-4">
                            <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 mb-4 mt-4">Otras Emisoras</h1>
                            <CardPagination type={"similares"} />
                        </div>
                        <div className="my-5 container justify-around">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                <div className="col-10">
                                    <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 mb-4 mt-4">Principales Indicadores</h1>
                                    <PrincipalesIndicadoresComponent/>
                                </div>
                                <div className="col-10">
                                    <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 mb-4 mt-4">Indices Fx</h1>    
                                    <IndiceFx tipoActualizacionInfo={ servTiempoRealActivo === true ? "REALTIME" : "DELAY" } />
                                    <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 mb-4 mt-4">Commodities</h1>
                                    <Comodities/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const styleContentDerecha = { width:"22%" };
    let contentDerecha = (
        <>
           <Operations emisora={emisoraObjSeleccionada.Emisora} serie={emisoraObjSeleccionada.Serie} />
            <div className="my-3">
                <Positions />
            </div>
        </>
    );

    return (
        <PageLayout 
            //styleContenido={styleContenido}

            childrenContentPrincipal={contentPrincipal}
            classesContentPrincipal={classesContentPrincipal}
            styleContentPrincipal={styleContentPrincipal}

            childrenContentDerecha={contentDerecha}
            styleContentDerecha={styleContentDerecha}

            styleSidebar={styleSidebar}

            titulo="Trading"
        />
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        listItems: store.list,
        catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
        portfolio: store.portfolio,
        //listItems: store.list.list,
        catalogoListaEmisorasRespuesta: store.catalogoListaEmisorasRespuesta,
        moversList: store.moversList,
        catalogoTrading: store.catalogoTrading,
        commodities: store.commodities,
        movers: store.moversList.moversList,
        postList: store.postList,
        deleteIssuer: store.deleteIssuer,
        postIssuer: store.postIssuer,
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        getEmisorasSimilaresRequest: () => dispatch(getEmisorasSimilaresRequest),
        getListRequest: () => dispatch(getListRequest(dispatch)),
        getCatalogoListaEmisorasRequest: () => dispatch(getCatalogoListaEmisorasRequest(dispatch)),
        getCatalogoEmisorasRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
        getDsPortafolioRequest: () => dispatch(getDsPortafolioRequest(dispatch)),
        catalogoTradingRequest: () => dispatch(catalogoTradingRequest(dispatch)),
        getCommoditiesRequest: () => dispatch(getCommoditiesRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trading);
