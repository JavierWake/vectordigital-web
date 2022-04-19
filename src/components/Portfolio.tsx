import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { useHistory } from 'react-router-dom';

//Containers
import PageLayout from '../containers/layout/PageLayout';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import ListIssuer from '../containers/ListIssuer';
import News from '../containers/News';
import CardAvisos from '../containers/CardAvisos';
import Navbar from '../containers/Navbar';
import Ordenes from '../containers/Ordenes';
import Positions from '../containers/Positions'
import { FooterComponent } from '../containers/FooterComponent';
import Loading from "../components/Loading";
import Movers from '../containers/Movers';

//Actions to call redux store
import { getNewsRequest } from '../actions/newsAction';
import { getGraphPortfolioRequest } from '../actions/GraphPortfolioAction';
import { postListRequest } from '../actions/postListAction';
import { getDsOrdenesRequest } from '../actions/ordenesAction';
import { getResumenRequest } from '../actions/ResumenAction';
import { getHistoricoRequest } from '../actions/historicoAction';
import { catalogoTradingRequest } from "../actions/catalogoTradingAction";
import { getCatalogoEmisorasRequest } from '../actions/getCatalogoEmisorasAction';
import { getPermisosRequest, getPermisosReset } from '../actions/getPermisosAction';
import { getListReset } from "../actions/listAction";
import { getListIssuerReset } from "../actions/ListIssuerAction";
import { postLoginObjectLogout } from '../actions/loginObjectAction';



//Types to use data from store
import { INews } from '../types/NewsTypes';
import { GraphPortfolioStatus } from '../types/GraphPortfolioTypes';
import { OrdenesStatus } from '../types/OrdenesTypes';
import { ResumenStatus } from '../types/ResumenTypes';
import { LoginObjectResponse, LoginObjectState } from '../types/LoginObjectTypes';
import { PortfolioStatus } from '../types/PortfolioTypes';
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';
import { IResponse } from '../types/HistoricoTypes';
import { HistoricoStatus } from '../types/HistoricoTypes';

//Mocks | Dummy data
import { appBarMockData } from '../mocks/Appbar';
import { TabNav, NavGraficas } from '../mocks/TabsData';

interface propsFromState {
    loginObject: LoginObjectState;
    //newsItems: INews[];
    newsItems: any;
    valuePortfolio: GraphPortfolioStatus;
    ordenes: OrdenesStatus;
    //movers: IMoversData[];
    resumen: ResumenStatus;
    graphPortfolio: GraphPortfolioStatus;
    historico: IResponse;
    valuePortafolio: string;
    portfolio: PortfolioStatus;
    //getPermisosRespuesta: GetPermisosState;
}

type AllProps = propsFromState; 


const Portfolio: React.FC<AllProps> = ({ loginObject, newsItems, valuePortfolio, ordenes, resumen, graphPortfolio, historico, valuePortafolio, portfolio }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    //HOOKS - datos para el dispatch
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [paramsDispatchParaMovers, setParamsDispatchParaMovers] = useState<string[]>([]);

    const sendCtaCtoDispatch = (data: string) => {
        if(ctaCtoDispatch === data){
            return;
        }
        setCtaCtoDispatch(data);
    };

    const sendParamsDispatchParaMovers = (data: string[]) => {
        if(paramsDispatchParaMovers === data){
            return;
        }
        setParamsDispatchParaMovers(data);
    };

    //HOOKS
    const [servTiempoRealActivo, setServTiempoRealActivo] = useState(false);

    const sendServTiempoRealActivo = (data: boolean) => {
        if(servTiempoRealActivo === data){
            return;
        }
        setServTiempoRealActivo(data);
    };

    /* 
        COMO FUNCIONA EL LOGIN:

        - La info de login esta en store.loginObject

        - Con este useEffect validan primero que loginObject.loginObject.ierror === -1
            -> si esa validacion es TRUE: esto quiere decir que el usuario está loggeado
            -> si esa validacion es FALSE: lo regresan a la pag de login, es decir, a "/"
        
        - Luego hay que validar que haya un objeto en el arreglo tdsLogin
            -> si es asi (TRUE), sacamos los valores del objeto que necesitamos para hacer las llamadas a las apis
                - cuentasesion 
                    (loginObject.loginObject.dsLogin.tdsLogin[0].cuentasesion)
                - id 
                    (loginObject.loginObject.dsLogin.tdsLogin[0].id)
                - token 
                    (loginObject.loginObject.dsLogin.tdsLogin[0].token)
                - cuenta (que es el query string parameter que enviamos en el message) 
                    (loginObject.loginObject.dsLogin.tdsLogin[0].cuentacontrato.toString())
            -> sino (FALSE), enviamos al usuario al login, es decir, a "/"   
    */

    /*
        QUÉ DEBEN REVISAR Y VALIDAR: 
        Que las sagas de las apis que implementaron reciban 
        la nueva estructura de los params: [ canal, cuentasesion, token, id ]
        
        atte.Maria 
    */

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
            
                    let message = "/consulta/ordenes?cuenta=" + cuentaLO;
                    let params = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    let a = { message, params };
                    dispatch(getDsOrdenesRequest(a)); //Ordenes
                    dispatch(getResumenRequest({ message:"/consulta/portafolioresumen?cuenta=" + cuentaLO + "&anio=2020&mes=12", params })); //API del resumen
    
                    message = cuentaLO;
                    a = { message, params };
                    //dispatch(getGraphPortfolioRequest(a)); //API del historico
    
                    //message = "cap/mercadomayorescambios?filtro=";
                    if(paramsDispatchParaMovers.length === 0){
                        sendCtaCtoDispatch(cuentaLO);
                        sendParamsDispatchParaMovers(params); //tiene esta estructura ["", canal, cuentasesion, token, id]
                    }
                    //dispatch(getMoversRequest({message, params})); //Movers API
                    
                    params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    message = "/consulta/graficaportoptim?cuenta="+cuentaLO;
                    a = { message, params };
                    dispatch(getHistoricoRequest(a));


                    dispatch(getNewsRequest("portafolio/noticias"));
                    
                    //revisamos servicios/permisos del usuario
                    if(loginObject.response.dsLogin.tdsServicios.length > 0){
                        sendServTiempoRealActivo(loginObject.response.dsLogin.tdsServicios[0].TiempoReal);
                    }
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
            setServTiempoRealActivo(false);
        }

    },[]);

    /*useEffect(() => {        
        //dispatch(getNewsRequest("emisora/noticias/amazon"));
        //let message = ["lista/22f94cb467d64f299248ff7f32657cfa", "Nueva Lista3"]
        //dispatch(postListRequest(message));
        //let message = "cap/mercadomayorescambios?filtro=";
        //let params = [ "", "1", "cuentaSesionLO", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab",  "10100" ]
        //dispatch(getMoversRequest({message, params})); //Movers API
    }, []);* /


    useEffect(() => {
        dispatch(getNewsRequest("portafolio/noticias"));
    },[]);*/

    useEffect(() => {
        if(portfolio.emisorasRefinitiv != "") {
            dispatch(catalogoTradingRequest({message: "catalogo/emisora/emisoras?emisoras="+portfolio.emisorasRefinitiv, emisorasCatalogo: portfolio.tradingData}));
        }
    },[portfolio.emisorasRefinitiv]);

    let childrenContentPrincipal = (
        <>
            {/* <span className="font-sans text-red-600 text-xs font-bold">+$10,000.00</span> */}
            <div className="pt-2">
                <Navbar navData={["Composición", "Histórico"]} data = {NavGraficas(resumen.textNum, resumen.textPorc, resumen.valuePorc, resumen.valueNum, resumen.ultActualizacion, historico)}/> <br/>
            </div>
            {/* <div className="my-28">
                <h1 className="font-sans text-lg text-gray-600 border-b-2 border-gray-300 pb-2 mb-4 pt-8 my-4">Listas</h1>
                <div className="flex flex-row my-16">
                    <div className="mr-4">
                        <ListIssuer listItems={ "Lista" }/>
                    </div>
                    <div className="mr-4">
                        <ListIssuer listItems={ "Lista" } />
                    </div>
                    <div className="mr-4">
                        <ListIssuer listItems={ "Lista" } />
                    </div>
                </div>
            </div> */}
            <div className="pb-2">
                {/* <h1 className="font-sans text-lg text-gray-600 mt-4 mb-4">Ordenes</h1> */}
                {/* <Navbar navData={["Capitales", "Fondos"]} data = {TabNav()}/> <br/> */}
                <Ordenes />
            </div>
            {/* <div className="my-16">
                <h1 className="font-sans text-lg text-gray-600 border-b-2 border-gray-300 pb-2 mt-4 mb-4">Avisos</h1>
                <div className="flex justify-between flex-row my-10">
                    <div className="mx-2">
                        <CardAvisos noticia={true} />
                    </div>
                    <div className="mx">
                        <CardAvisos noticia={false} />
                    </div>
                                                    
                </div>                            
            </div> */}
            <div className="py-2">
                <Movers paramsParaMovers={paramsDispatchParaMovers} servTiempoRealActivo={servTiempoRealActivo} />
            </div>
            <div className="py-2">
                <h1 className="font-sans text-xl text-gray-800 font-medium border-b border-gray-300 pb-2">Noticias</h1>
                {
                    newsItems.loading ? <Loading /> : <News newsItems={newsItems.news} ric={""} />
                }
            </div>
        </>
    );

    let clasesContentDerecha = "w-6/24 py-3 px-2 sticky inset-x-0 top-0 overflow-y-auto h-screen";
    let childrenContentDerecha = (
        <>
            <Positions />
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
            childrenContentDerecha={childrenContentDerecha}
            titulo="Portafolio"
        />
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector
        newsItems: store.news,
        valuePortfolio: store.graphPortfolio,
        ordenes: store.ordenes,
        //movers: store.moversList.moversList,
        resumen: store.resumen,
        graphPortfolio: store.graphPortfolio,
        historico: store.historico.response,
        valuePortafolio: store.historico.portafolioValue,
        portfolio: store.portfolio,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getNewsRequest: () => dispatch(getNewsRequest),
        postListRequest: () => dispatch(postListRequest(dispatch)),
        getDsOrdenesRequest: () => dispatch(getDsOrdenesRequest(dispatch)),
        //getMoversRequest: () => dispatch(getMoversRequest(dispatch)),
        getResumenRequest: () => dispatch(getResumenRequest(dispatch)),
        getGraphPortfolioRequest: () => dispatch(getGraphPortfolioRequest(dispatch)),
        getHistoricoRequest: () => dispatch(getHistoricoRequest(dispatch)),
        catalogoTradingRequest: () => dispatch(catalogoTradingRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)