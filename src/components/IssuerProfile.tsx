import "../../node_modules/material-design-icons/iconfont/material-icons.css";
import React, { useEffect, useState, useRef } from 'react';
import { Modal, ModalBody } from 'reactstrap';

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { useHistory, useParams, NavLink } from 'react-router-dom'
import Appbar from '../components/Appbar';
import Sidebar from '../components/Sidebar';
import Loading from "../components/Loading";
import '../styles/sidebar.css';

//Containers
import ListIssuerContainer from '../containers/ListIssuerContainer'; //Listas a las que pertenece la emisora
import ModalGraph from '../containers/ModalGraph'; //Gráfica de Análisis técnico
import Navbar from '../containers/Navbar'; //Navbar con POSICIONES - HECHOS - ACUMULADO
import GraphDonutContainer from '../containers/GraphDonutContainer'; //Sección  de posición con la gráfica de dona y los label de a lado
import CardContainer from '../containers/CardContainer'; //Card estilo
import Historial from '../containers/Historial'; //Sección del historial
import AboutIssuer from '../containers/AboutIssuer'; //Sección acerca de la emisora
import OpinionAnalyst from '../containers/OpinionAnalyst'; //Sección de la opinión de analistas
import News from '../containers/News'; // Sección de noticias
import VectorAnalysisContainer from '../containers/VectorAnalysisContainer'; //Sección de vector análisis
import CardPagination from "../containers/CardPagination"; //Cards con la paginación
import Operations from '../containers/Operations';
import IssuerTable from '../containers/IssuerTable';
import AddToList from '../containers/AddToList';
import RefinitivGraph from '../containers/RefinitivGraph';
import { FooterComponent } from '../containers/FooterComponent';
import Alert from '../containers/Alert';

//Actions to call redux store
import { getProfileDataRequest } from '../actions/ProfileIssuerAction';
import { getNewsRequest } from '../actions/newsAction';
import { getRecomIssuerRequest } from '../actions/RecomIssuerAction';
import { postEditOrdenRequest } from '../actions/EditOrdenAction';
import { getFolioDataRequest } from '../actions/folioDataAction';
import { postPosicionFolioRequest } from '../actions/posicionFolioAction';
import { getDsOrdenesRequest } from '../actions/ordenesAction';
import { OrdenesStatus } from '../types/OrdenesTypes';
import { getEmisorasSimilaresRequest } from '../actions/emisorasSimilaresAction';
import { getQuotesRequest } from '../actions/quotesAction';
import { getPosturasRequest } from '../actions/posturasAction';
import { getInfoEmisoraRequest, getInfoEmisoraReset } from '../actions/infoEmisoraAction';
import { getListRequest } from '../actions/listAction';
import { getOrdenesIssuerRequest } from "../actions/ordenesIssuerAction";
import { postListRequest } from '../actions/postListAction';
import { postIssuerRequest } from '../actions/PostIssuerAction';
import { getHistorialEmisoraRequest } from '../actions/HistorialEmisoraAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types to use data from store
import { INews } from '../types/NewsTypes';
import { IRecomIssuer } from '../types/RecomIssuerTypes';
import { ProfileDataState } from '../types/ProfileIssuerTypes';
import { IQuotesData } from '../types/QuotesTypes';
import { IList } from "../types/ListTypes";
import { PosturasState } from '../types/PosturasTypes';
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';
import { InfoEmisoraState } from '../types/InfoEmisoraTypes';
import { PostListState } from "../types/PostList";
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";
import { PostIssuerState } from '../types/PostIssuerTypes';
import { IResponse, HistorialEmisoraStatus } from '../types/HistorialEmisoraTypes';

//Mocks | Dummy data
import { NavPosturas } from '../mocks/TabsData';
import { appBarMockData } from '../mocks/Appbar';
import { GraphDonutData } from '../mocks/GraphDonutData';
import { Issuers } from "../mocks/Issuers";

//ICONS
import { MdPlaylistAdd, MdAddAlert, MdClose } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import Ordenes from "../containers/Ordenes";
import ConfigurarAlerta from "../containers/ConfigurarAlerta";
import { GetPermisosState, TtServicios } from "../types/GetPermisosType";
import { getPermisosRequest, getPermisosReset } from "../actions/getPermisosAction";
import PageLayout from "../containers/layout/PageLayout";
import { getIssuerListsRequest } from "../actions/getIssuerListsAction";
import { IssuerListsStatus } from "../types/GetIssuerListsType";
import BotonesGraficador from "../containers/BotonesGraficador";
import { EmisorasSimilaresState } from "../types/EmisorasSimilaresTypes";

interface propsFromState {
    loginObject: LoginObjectState;
    profileData: ProfileDataState;
    newsItems: any;
    quotesDataItems: IQuotesData[];
    ticker: any;
    recomIssuerItems: any;
    //ordenes: OrdenesStatus;
    posturasItems: PosturasState;
    catalogoEmisorasRespuesta: CatalogoEmisorasState;
    infoEmisoraResponse: InfoEmisoraState;
    postList: PostListState;
    postIssuer: PostIssuerState;
    historialEmisora: IResponse;
    historialEmisoraLoading: HistorialEmisoraStatus;
    issuerLists: IssuerListsStatus;
    similares: EmisorasSimilaresState;
}

type AllProps = propsFromState; 


const IssuerProfile: React.FC<AllProps> = ({ loginObject, profileData, newsItems, quotesDataItems, ticker, recomIssuerItems, infoEmisoraResponse, catalogoEmisorasRespuesta, posturasItems, postList, postIssuer, historialEmisora, historialEmisoraLoading, issuerLists, similares }) => {
    
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

    ticker = useParams();
    const dispatch = useDispatch();    
    const history = useHistory();
    let cuentaLO = "";
    const cuentaRef = useRef("");
    const idRef = useRef("");

    //console.log("entro a issuerProfile: ", ticker);

    const [seHizoRefreshInfoEmisora, setSeHizoRefreshInfoEmisora] = useState(false);

    const [primaryRIC, setPrimaryRIC] = useState("");
    const [ricPosturas, setRicPosturas] = useState("");
    const [alertShow, setAlertShow] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [tag, setTag] = useState("");
    const [ready, setReady] = useState(false);

    const [errorEmisora, setErrorEmisora] = useState(false);

    const [isOpenModalConfigAlerta, setIsOpenModalConfigAlerta] = useState(false);
    const toggle = () => setIsOpenModalConfigAlerta(!isOpenModalConfigAlerta);

    const [emisoraDelTicker, setEmisoraDelTicker] = useState("");
    const[serieDelTicker, setSerieDelTicker] = useState("");

    const [servProfundidadActivo, setServProfundidadActivo] = useState(false);
    const [servTiempoRealActivo, setServTiempoRealActivo] = useState(false);

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

    const sendEmisoraDelTicker = (data: string) => {
        if(emisoraDelTicker === data){
            return;
        }
        setEmisoraDelTicker(data);
    };

    const sendSerieDelTicker = (data: string) => {
        if(serieDelTicker === data){
            return;
        }
        setSerieDelTicker(data);
    };

    useEffect(() => {
        return () => {
            //reseteamos estados necesarios
            //console.log("reset en issuerprofile");
            dispatch(getInfoEmisoraReset({ hacerResetDelEstado: true }));
        };
    }, []);

    useEffect(() => {
        if(loginObject.response.ierror === -1){
            if(loginObject.response.dsLogin.tdsLogin.length > 0){

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
        
                if(cuentaSesionLO != 0){
                    // mandamos llamar las apis sacando los datos del objeto de login
            
                    const idLO:any = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                    idRef.current = idLO;
                    cuentaRef.current = cuentaLO;
                    setReady(true);

                    let message = "/consulta/ordenes?cuenta=" + cuentaLO;
                    let params = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    let a = { message, params }
                    dispatch(getDsOrdenesRequest(a));
    
                    let emisora = ticker.ticker.split(".")[0];
                    sendEmisoraDelTicker(emisora);
                    let serie = ticker.ticker.split(".")[1];
                    sendSerieDelTicker(serie);

                    //console.log("ticker",ticker);
    
                    params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    dispatch(getOrdenesIssuerRequest({ message: "/consulta/infoporemisora?cuenta=" + cuentaLO + "&emisora=" + emisora + "&serie=" + serie, params })); //: [  "1", "cuentaSesionLO", "tokenLO",  "10100" ]
                    
                    if(paramsDispatch.length === 0){
                        setParamsDispatch(params);
                        setCtaCtoDispatch(cuentaLO);
                    }

                    dispatch(getInfoEmisoraRequest({ message: "/consulta/infoporemisora?cuenta="+ cuentaLO + "&emisora=" + emisora + "&serie=" + serie, params }))

                    let messageList = "lista/"+cuentaRef.current;
                    dispatch(getListRequest({ message: messageList, id: idRef.current }));

                    message = "/consulta/historialemisora?cuenta="+cuentaLO+"&emisora="+emisora+"&serie="+serie+"&filtro=1";
                    params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    dispatch(getHistorialEmisoraRequest({message, params}));

                    if(serie === '*'){
                        message = "emisora/"+emisora;
                        dispatch(getIssuerListsRequest({ message }));
                    }
                    else{
                        message = "emisora/"+emisora+serie;
                        dispatch(getIssuerListsRequest({ message }));
                    }

                    if(paramsDispatch.length === 0){
                        sendCtaCtoDispatch(cuentaLO);
                        sendParamsDispatch(params);
                    }

                    //revisamos servicios/permisos del usuario
                    if(loginObject.response.dsLogin.tdsServicios.length > 0){
                        sendServTiempoRealActivo(loginObject.response.dsLogin.tdsServicios[0].TiempoReal);
                        sendServProfundidadActivo(loginObject.response.dsLogin.tdsServicios[0].Profundidad);
                    }
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en issuerprofile, lo mandamos al login");
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
            setSeHizoRefreshInfoEmisora(false);
            setServProfundidadActivo(false);
            setServTiempoRealActivo(false);
        }

    },[ticker, ticker.ticker.split(".")[0]]);


    // Sacar primaryRIC y ricPosturas del catalogo de la emisora
    useEffect(() => {
        if(!catalogoEmisorasRespuesta.loading){
            let emisora = ticker.ticker.split(".")[0];
            let serie = ticker.ticker.split(".")[1];
            
            let emisoraSeleccionadaRICArray: Emisora[] = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(function(item: Emisora){
                return( item.Emisora.trim() == emisora && item.Serie.trim() == serie );
            });

            if(emisoraSeleccionadaRICArray.length > 0){
                //se encontro la emisora
                setPrimaryRIC(emisoraSeleccionadaRICArray[0].PrimaryRIC.trim());
                setRicPosturas(emisoraSeleccionadaRICArray[0].RIC.trim());
                setErrorEmisora(false);
            }
            else{
                // no se encontró la emisora
                setErrorEmisora(true);
            }
        }
    },[catalogoEmisorasRespuesta])

    useEffect(() => {
        if(primaryRIC !== ""){
            dispatch(getRecomIssuerRequest("emisora/recomendacionanalistas/" + primaryRIC));
            dispatch(getProfileDataRequest({message:"emisora/" + primaryRIC, params: "es-ES"}));
            let ticker = primaryRIC.split(".");
            dispatch(getEmisorasSimilaresRequest({message: "emisora/recomendacion/" + ticker[0]}));
            dispatch(getNewsRequest("emisora/noticias/" + primaryRIC));        
        }
    }, [primaryRIC]);

    useEffect(() => {
        if(ricPosturas !== ""){
            dispatch(getPosturasRequest({message: "emisora/posturas/" + ricPosturas, params: "BMV"}));    
        }
    }, [ricPosturas]);

    useEffect(() => {
        if(!recomIssuerItems.loading && JSON.stringify(recomIssuerItems.recomIssuer) !== JSON.stringify({})){
            const values = [recomIssuerItems.recomIssuer.buy, recomIssuerItems.recomIssuer.hold, recomIssuerItems.recomIssuer.sell];
            const valuesOrder = values.sort().reverse();

            if(valuesOrder[0] == recomIssuerItems.recomIssuer.buy){
                setTag((valuesOrder[0] * 100).toFixed(0) + "% Comprar");
            }
            else if(valuesOrder[0] == recomIssuerItems.recomIssuer.hold){
                setTag((valuesOrder[0] * 100).toFixed(0) + "% Mantener");
            }
            else if(valuesOrder[0] == recomIssuerItems.recomIssuer.hold){
                setTag((valuesOrder[0] * 100).toFixed(0) + "% Vender");
            }
        }
        else{
            setTag("");
        }
    }, [recomIssuerItems.loading]);

    useEffect(() => {
        if(!postList.loading && ready && postList.idError === 100) {
            let messageList = "lista/"+cuentaRef.current;
            dispatch(getListRequest({ message: messageList, id: idRef.current }));
            // console.log("post list", postList.loading, " post issuer ", postIssuer.loading);
        }
    },[postList.loading]);

    useEffect(() => {
        if(!postList.loading && ready && postList.list_id !== undefined) {
            dispatch(postIssuerRequest({ message: "lista/"+cuentaRef.current+"/"+postList.list_id+"?ticker="+ricPosturas, id: idRef.current }));
        }
    },[postList.list_id]);

    useEffect(() => {
        if(!postList.loading && ready) {
            setMessageAlert(postList.messageError);
            setAlertShow(true);
        }
    },[postList.loading]);

    useEffect(() => {
        if(!postIssuer.loading && ready) {
            setMessageAlert(postIssuer.messageRespueta);
            setAlertShow(true);
        }
    },[postIssuer.loading]);

    const volverACargarApiInfoEmisoras = () => {
        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
            setSeHizoRefreshInfoEmisora(true);
            let emisora = ticker.ticker.split(".")[0];
            let serie = ticker.ticker.split(".")[1];
            dispatch(getInfoEmisoraRequest({ message: "/consulta/infoporemisora?cuenta="+ ctaCtoDispatch + "&emisora=" + emisora + "&serie=" + serie, params: paramsDispatch }))
        }
    };
    
    const ModalConfigurarAlertas = (
         <Modal style={{width: "22rem"}} isOpen={isOpenModalConfigAlerta} toggle={toggle}>
            <ModalBody>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className="w-full text-center">
                            <p className="font-bold text-lg my-2">Configurar Alerta</p>
                        </div>
                        <div className="tachita w-2/24 cursor-pointer" onClick={() => setIsOpenModalConfigAlerta(false)}>
                            <MdClose className="text-gray-800 text-base text-right" />
                        </div>                        
                    </div>
                    <div className="bodyMensajeAlta m-3 p-1 flex flex-col">
                        <div className="py-2 w-full">
                            <ConfigurarAlerta 
                                ubicacionComponente="PerfilEmisora"
                                emisoraPE={emisoraDelTicker}
                                seriePE={serieDelTicker}
                                ctaCto={ctaCtoDispatch} 
                                params={paramsDispatch} 
                                //cargarApisPA={(volverACargar: boolean) => setVolverACargar(volverACargar)} 
                            />
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );

    let childrenContentPrincipal = (
        <>
            {/* Parte de arriba */}
            <Alert message={messageAlert} isOpen={alertShow} sendIsOpen={(open) => setAlertShow(open)} />
            {
                profileData.loading ? <Loading /> :
                <div className="flex flex-row">
                    <div className="w-full">
                        <h1 className="font-sans text-2xl font-medium">{(errorEmisora || Object.keys(profileData.profileData).length === 0) ? ticker.ticker : profileData.profileData.name}</h1>
                        {/* <div className="py-2">
                            <ListIssuerContainer />
                        </div>                                 */}
                        {
                            tag !== "" && 
                            <div className="flex mt-1 mb-3 items-center">
                                <span><IoMdPricetag className="text-red-600 text-2xl"/></span> <span className="text-sm px-2 text-red-600 text-center font-medium">{tag}</span>
                            </div>
                        }
                        {/* <div className="flex mt-1 mb-3 items-center">
                            <span><IoMdPricetag className="text-red-600 text-2xl"/></span> <span className="text-sm px-2 text-red-600 text-center font-medium">{tag}</span>
                        </div> */}
                        <div className="my-2">
                            <ListIssuerContainer listas={issuerLists.listas} />
                        </div>    
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-end items-center">
                                <div className="px-2">
                                    <AddToList ticker = {ricPosturas}/>
                                </div>
                                <div className="px-2">
                                    <MdAddAlert onClick={() => {setIsOpenModalConfigAlerta(true)}} className="text-red-600 text-2xl cursor-pointer"/>
                                    {
                                        isOpenModalConfigAlerta === true &&
                                        emisoraDelTicker.length > 0 &&
                                        serieDelTicker.length > 0 && ModalConfigurarAlertas
                                    }                            
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            }
           <div className="w-full flex flex-row justify-end">
                <div>
                    <BotonesGraficador
                        selectedOption="BASICA"
                        avanzadaNav={() => {
                            history.push("/avanzada/" + emisoraDelTicker + "." + serieDelTicker);
                        }} 
                        emisoraRic={emisoraDelTicker + "." + serieDelTicker}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <RefinitivGraph 
                    tipoActualizacionInfo={ servTiempoRealActivo === true ? "REALTIME" : "DELAY" }
                    ricEmisora={ricPosturas} 
                />
            </div>
            {/* Parte de abajo */}
            <div className="py-2">
                <Navbar navData={servProfundidadActivo === true ? ["Posturas", "Hechos", "Acumulado"] : ["Hechos", "Acumulado"]} data = {NavPosturas( posturasItems.posturas, ricPosturas, ticker.ticker.split(".")[0], ticker.ticker.split(".")[1], servProfundidadActivo )}/> <br/>
            </div>
            {
                infoEmisoraResponse.loading ? <Loading /> :
                    infoEmisoraResponse.infoEmisoraResponse.TotEmisora === 0 ? ""
                    :
                    <div className="py-2">
                        <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2">Posición</h1>
                        <GraphDonutContainer graphDonutData={GraphDonutData()} portafolio={false} 
                            textPorc = {infoEmisoraResponse.infoEmisoraResponse.dsMkdCapPrecios.tdsMkdCapPrecios[0]} 
                            textNum = {infoEmisoraResponse.infoEmisoraResponse.dsPortafolio.tdsPortafolioCap[0]} 
                            valueNum = {infoEmisoraResponse.infoEmisoraResponse.PorcPortafolioEmis}
                            valuePorc = {infoEmisoraResponse.infoEmisoraResponse.PorcPortafolioEmis}
                        />
                    </div>
            }
            {
                infoEmisoraResponse.loading ? <Loading /> :
                    infoEmisoraResponse.infoEmisoraResponse.dsOrdenes.tdsOrdenesCapResponse.length === 0 ? ""
                    :
                    <div className="py-2
                    ">
                        <Ordenes 
                            ordenesCapEnIssuerProfile={infoEmisoraResponse.infoEmisoraResponse.dsOrdenes.tdsOrdenesCapResponse}
                            volverACargarApiInfoEmisorasEnIssuerProfile={() => volverACargarApiInfoEmisoras()}
                            seHizoRefreshInfoEmis={seHizoRefreshInfoEmisora}
                        />
                    </div>
            }
            {
                historialEmisora.dsMovimientos.tdsMovimientos !== null || historialEmisora.dsMovimientos.tdsMovimientos !== undefined &&
                <div className="py-2">
                    <div className="mb-2">
                        <span className="font-sans text-xl text-gray-800 font-medium ">Historial</span>
                        <span className="font-sans text-xs text-gray-500 px-2">(Últ. 3 meses)</span>
                        {/* <p className="text-red-600 text-sm underline">Ver todo</p> */}
                    </div>
                    <hr className="solid bg-gray-500 mb-3"/>
                    <Historial movimientos = {historialEmisora.dsMovimientos.tdsMovimientos} cargando={historialEmisoraLoading.loading} emisora={ticker.ticker.split(".")[0]} serie={ticker.ticker.split(".")[1]}  />                            
                </div>
            }
            {
                JSON.stringify(profileData.profileData) !== JSON.stringify({}) &&
                <div className="py-2">
                    <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 mb-4">Acerca de la emisora</h1>
                    {
                        profileData.loading || primaryRIC === "" ? <Loading /> :
                        !errorEmisora && 
                        <>
                            <p className="font-sans text-md text-gray-700 text-justify">{profileData.profileData.business_summary}</p>
                            <p className="text-xs text-gray-500 text-right py-2">** Valores de esta sección en {profileData.profileData.currency}</p>
                            <div className="flex">
                                <AboutIssuer />
                            </div>
                        </>
                    }
                </div>
            }
            {
                JSON.stringify(recomIssuerItems.recomIssuer) !== JSON.stringify({}) &&
                <div className="py-2">
                    <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 my-4">Opinión de Analistas </h1>
                    {
                        recomIssuerItems.loading || primaryRIC === "" ? <Loading /> :
                            !errorEmisora && <OpinionAnalyst recomIssuerItems={recomIssuerItems.recomIssuer} />
                    }
                </div>
            }
            {
                newsItems.news.length !== 0 &&
                <div className="py-2">
                    <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 mb-4">Noticias</h1>
                    {
                        newsItems.loading || primaryRIC === "" ? <Loading /> : 
                            !errorEmisora && <News newsItems={newsItems.news} ric={primaryRIC} />
                    }
                </div>
            }
            {/* Vector Análisis escondido por mientras */}
            {/* <div className="my-20">
                <h1 className="font-sans text-lg text-gray-800 font-semibold border-b-2 border-gray-300 pb-2 mb-4 mt-4">Vector Análisis</h1>
                <VectorAnalysisContainer /> 
            </div> */}
            {
                similares.similares.length !== 0 && similares.similares[0].ticker !== "" &&
                    <div className="py-2">  
                        <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2 my-4">Otras Emisoras</h1>
                        {
                            similares.loading || primaryRIC === "" ? <Loading /> :
                            !errorEmisora && <CardPagination type={"similares"} />
                        }
                    </div>
            }
        </>
    );

    let childrenContentDerecha = (
        <>
            <Operations emisora={ticker.ticker.split(".")[0]} serie={ticker.ticker.split(".")[1]} />
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
            childrenContentDerecha={childrenContentDerecha}
        />
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        newsItems: store.news,
        profileData: store.profileData,
        quotesDataItems: store.quotesList.quotesList,
        recomIssuerItems: store.recomIssuer,
        ordenes: store.ordenes,
        posturasItems: store.posturas,
        catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
        infoEmisoraResponse: store.infoEmisora,
        postList: store.postList,
        postIssuer: store.postIssuer,
        historialEmisora: store.historialEmisora.response,
        historialEmisoraLoading: store.historialEmisora,
        issuerLists: store.issuerLists,
        similares: store.emisorasSimilares,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getRecomIssuerRequest: () => dispatch(getRecomIssuerRequest),
        getProfileDataRequest: () => dispatch(getProfileDataRequest),
        postEditOrdenRequest: () => dispatch(postEditOrdenRequest),
        getFolioDataRequest: () => dispatch(getFolioDataRequest),
        postPosicionFolioRequest: () => dispatch(postPosicionFolioRequest),
        getDsOrdenesRequest: () => dispatch(getDsOrdenesRequest),
        getEmisorasSimilaresRequest: () => dispatch(getEmisorasSimilaresRequest),
        getNewsRequest: () => dispatch(getNewsRequest),
        getQuotesRequest: () => dispatch(getQuotesRequest),
        getPosturasRequest: () => dispatch(getPosturasRequest),
        getInfoEmisoraRequest: () => dispatch(getInfoEmisoraRequest(dispatch)),
        getInfoEmisoraReset: () => dispatch(getInfoEmisoraReset(dispatch)),
        getListRequest: () => dispatch(getListRequest(dispatch)),
        postListRequest: () => dispatch(postListRequest(dispatch)),
        postIssuerRequest: () => dispatch(postIssuerRequest(dispatch)),
        getHistorialEmisoraRequest: () => dispatch(getHistorialEmisoraRequest(dispatch)),
        getIssuerListsRequest: () => dispatch(getIssuerListsRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuerProfile);