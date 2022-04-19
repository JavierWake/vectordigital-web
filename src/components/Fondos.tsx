import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//import { SimpleTable } from "../containers/SimpleTable";
import Appbar from './Appbar';
import { appBarMockData } from '../mocks/Appbar';
import { RootState } from '../reducers/rootReducer';

//import { Sidebar } from '../components/Sidebar';
import Sidebar from '../components/Sidebar';
import { FooterComponent } from '../containers/FooterComponent';

import EstrategiaIntegralFondos from '../containers/EstrategiaIntegralFondos';
import OfertaFondos from '../containers/OfertaFondos';
import NuestrosProductosFondos from '../containers/NuestrosProductosFondos';
import Operations from '../containers/Operations';
import Positions from '../containers/Positions';
import { LoginObjectResponse, LoginObjectState } from '../types/LoginObjectTypes';
import Loading from './Loading';
import { FondosEstrategiaIntegralState, ITdsFondoData } from '../types/FondosEstrategiaIntegralTypes';
import { getFondosEstrategiaIntegralRequest } from '../actions/fondosEstrategiaIntegralAction';
import { FondosFamDistribucionState, IDistribucionObj } from '../types/FondosFamDistribucionTypes';
import { getFondosFamDistribucionRequest } from '../actions/fondosFamDistribucionAction';
import { FondosNuevaFamiliasState, IDsFondos, ITdsFamilia } from '../types/FondosNuevaFamiliasTypes';
import { getFondosNuevaFamiliasRequest } from '../actions/fondosNuevaFamiliasAction';
import PageLayout from '../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

interface propsFromState {
    loginObject: LoginObjectState;
    fondosEstrategiaIntegralRespuesta: FondosEstrategiaIntegralState;
    fondosFamDistribucionRespuesta: FondosFamDistribucionState;
    fondosNuevaFamiliasRespuesta: FondosNuevaFamiliasState;
}

type AllProps = propsFromState;

const Fondos: React.FC<AllProps> = ({ loginObject, fondosEstrategiaIntegralRespuesta, fondosFamDistribucionRespuesta, fondosNuevaFamiliasRespuesta }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    //HOOKS
    const [issuerFondo, setIssuerFondo] = useState("");
    const [estIntFondos, setEstIntFondos] = useState<ITdsFondoData[]>([]);
    const [famDistObj, setFamDistObj] = useState<IDistribucionObj>({
        Familias: [],
        Distribucion: [],
    });
    const [nuevaFamilias, setNuevaFamilias] = useState<ITdsFamilia[]>([]);

    const sendIssuerFondo = (data: string) => {
        //data puede incluir "emisora" o "emisora.serie"
        /*if(issuerFondo === data){
            return;
        }*/
        setIssuerFondo(data);
    };

    const sendEstIntFondos = (data: ITdsFondoData[]) => {
        if (estIntFondos === data) {
            return;
        }
        setEstIntFondos(data);
    };

    const sendFamDistObj = (data: IDistribucionObj) => {
        if (famDistObj === data) {
            return;
        }
        setFamDistObj(data);
    };

    const sendNuevaFamilias = (data: ITdsFamilia[]) => {
        if (nuevaFamilias === data) {
            return;
        }
        setNuevaFamilias(data);
    };


    useEffect(() => {
        if (loginObject.response.ierror === -1) {
            if (loginObject.response.dsLogin.tdsLogin.length > 0) {

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;

                if (cuentaSesionLO != 0) {
                    // mandamos llamar las apis sacando los datos del objeto de login

                    const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                    let message = "fd/info?fondos=Income,equity,vectusd,vectpre";
                    let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];


                    dispatch(getFondosEstrategiaIntegralRequest({ message, params }));


                    message = "fd/distribucion";


                    dispatch(getFondosFamDistribucionRequest({ message, params }));


                    message = "fd/nuevafamilias";

                    dispatch(getFondosNuevaFamiliasRequest({ message, params }));


                }
            }
            else {
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en fondos, lo mandamos al login");
                history.push("/");
            }
        }
        else {
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

    useEffect(() => {
        if(fondosEstrategiaIntegralRespuesta != undefined){
            if(fondosEstrategiaIntegralRespuesta.message.length > 0 && fondosEstrategiaIntegralRespuesta.loading === false){
                //hay datos en el estado
                sendEstIntFondos(fondosEstrategiaIntegralRespuesta.fondosEstrategiaIntegralRespuesta.data.tdsFondo);
            }
        }
    }, [fondosEstrategiaIntegralRespuesta.message, fondosEstrategiaIntegralRespuesta.loading]);

    useEffect(() => {
        if(fondosFamDistribucionRespuesta != undefined){
            if(fondosFamDistribucionRespuesta.message.length > 0 && fondosFamDistribucionRespuesta.loading === false){
                if(fondosFamDistribucionRespuesta.fondosFamDistribucionRespuesta != undefined){
                    if(fondosFamDistribucionRespuesta.fondosFamDistribucionRespuesta.data != undefined){
                        if(fondosFamDistribucionRespuesta.fondosFamDistribucionRespuesta.data.Distribucion != undefined){
                            //hay datos en el estado
                            sendFamDistObj(fondosFamDistribucionRespuesta.fondosFamDistribucionRespuesta.data.Distribucion);
                        }
                    }
                }
            }
        }
    }, [fondosFamDistribucionRespuesta.message, fondosFamDistribucionRespuesta.loading]);

    useEffect(() => {

        if(fondosNuevaFamiliasRespuesta != undefined){
            if(fondosNuevaFamiliasRespuesta.message.length > 0 && fondosNuevaFamiliasRespuesta.loading === false){

                //console.log("nuevas familias fondos");
                //console.log(fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta.dsFondos.dsFondos.hasOwnProperty("tdsFamilia"));
                //console.log(fondosNuevaFamiliasRespuesta);

                if(fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta != undefined){
                    if(fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta.dsFondos != undefined){
                        if(fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta.dsFondos.dsFondos != undefined){
                            if(fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta.dsFondos.dsFondos.hasOwnProperty("tdsFamilia")){
                                if((fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta.dsFondos.dsFondos as IDsFondos).tdsFamilia != undefined){
                                    if((fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta.dsFondos.dsFondos as IDsFondos).tdsFamilia.length > 0){
                                        //guardamos las nuevas familias
                                        sendNuevaFamilias((fondosNuevaFamiliasRespuesta.fondosNuevaFamiliasRespuesta.dsFondos.dsFondos as IDsFondos).tdsFamilia);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }, [fondosNuevaFamiliasRespuesta.message, fondosNuevaFamiliasRespuesta.loading]);

    let childrenContentPrincipal = (
        <>
            <div className="flex flex-col">
                <div className="row2 w-full py-4">
                    {
                        fondosEstrategiaIntegralRespuesta.loading === true ?
                            <Loading />
                            :
                            <EstrategiaIntegralFondos estrategiaIntFondos={estIntFondos} sendFondoSeleccionado={(data: string) => sendIssuerFondo(data)} />
                    }
                </div>
                <div className="w-full py-4">
                    <h1 className="font-sans text-xl text-gray-800 font-medium">Conozca la oferta</h1>
                    <hr className="solid bg-gray-500 my-2" />
                    {
                        fondosFamDistribucionRespuesta.loading === true ?
                            <Loading />
                            : famDistObj.Familias.length > 0 ?
                                <OfertaFondos famDistObjeto={famDistObj} sendFondoSeleccionado={sendIssuerFondo} />
                                :
                                <p className="text-sm text-gray-600 py-4">No hay datos por el momento, intenta más tarde.</p>
                    }
                </div>
                <div className="w-full py-4">
                    <h1 className="font-sans text-xl text-gray-800 font-medium">Nuestros Productos</h1>
                    <hr className="solid bg-gray-500 my-2" />
                    {
                        (fondosNuevaFamiliasRespuesta.loading === true) ?
                            <Loading />
                            : nuevaFamilias.length > 0 ?
                                <NuestrosProductosFondos
                                    nuevasFamilias={nuevaFamilias}
                                    sendFondoSeleccionado={sendIssuerFondo}
                                />
                                :
                                <p className="text-sm text-gray-600 py-4">No hay datos por el momento, intenta más tarde.</p>
                    }
                </div>
            </div>
        </>
    );

    let childrenContentDerecha = (
        <>
            <Operations emisora={""} serie={""} issuerFondo={issuerFondo} selectedTabTitle={"Fondos"} />
            <div className="my-12">
                <Positions sendFondoSeleccionado={sendIssuerFondo} selectedTabTitle={"Fondos de Inversión"} />
            </div>
            {/*
                <div className="bg-white shadow-2xl p-3">
                    <h1 className="font-sans font-bold">Operaciones</h1>
                    <Tabs color="red" tabsData={TabsOperationsFondos("")} typeAlert={true} />
                </div>
            */}
            {/*
                portfolio?.dsPortafolio && <div className="bg-white border-2 rounded shadow-lg max-w-max overflow-ellipsi my-3 py-3">
                    <div className="px-3">
                        <h1 className="font-sans font-bold">Posiciones</h1>
                    </div>
                    <SimpleTable
                        key={Math.random()}
                        extend={false}
                        color='red'
                        tabsData={SimpleTableData1()}
                        positionValue={portfolio.dsPortafolio.tdsPortafolioFd}
                        portfalioValue={true}
                        type={"fondos"}
                    />
                </div>
            */}
        </>
    );


    return (
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
            childrenContentDerecha={childrenContentDerecha}
            titulo="Fondos"
        />
    );

}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        fondosEstrategiaIntegralRespuesta: store.fondosEstrategiaIntegralRespuesta,
        fondosFamDistribucionRespuesta: store.fondosFamDistribucionRespuesta,
        fondosNuevaFamiliasRespuesta: store.fondosNuevaFamiliasRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getFondosEstrategiaIntegralRequest: () => dispatch(getFondosEstrategiaIntegralRequest(dispatch)),
        getFondosFamDistribucionRequest: () => dispatch(getFondosFamDistribucionRequest(dispatch)),
        getFondosNuevaFamiliasRequest: () => dispatch(getFondosNuevaFamiliasRequest(dispatch)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Fondos);