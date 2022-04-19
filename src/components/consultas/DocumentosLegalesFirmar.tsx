import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import parse from "html-react-parser";

import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';

import { FolioDataState } from '../../types/FolioDataTypes';
import { getFolioDataRequest, getFolioDataReset } from '../../actions/folioDataAction';
import { RootState } from '../../reducers/rootReducer';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { useHistory, useParams } from 'react-router-dom';
import convertToAcentos from '../../utils/convertToAcentos';
import ConsultasHeader from '../../containers/ConsultasHeader';
import { FooterComponent } from '../../containers/FooterComponent';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

import * as apiCall from './../../constants';

interface ModalFolioTarjetaProps {
    getFolioData?: FolioDataState;
    loginObject: LoginObjectState;
    params_url: any;
}

const DocumentosLegalesFirmar: React.FC<ModalFolioTarjetaProps> = ({ loginObject, getFolioData, params_url}) => {

    params_url = useParams();

    const history = useHistory();
    const dispatch = useDispatch();

    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [inputValorIngresado, setInputValorIngresado] = useState("");
    
    const [detalleDoc, setDetalleDoc] = useState({} as any);
    const [listaPersonas, setListaPersonas] = useState([]);
    const [estatusPersonaActiva, setEstatusPersonaActiva] = useState(1);
    const [errorDetalleDoc, setErrorDetalleDoc] = useState("");

    const [errorNumFirma, setErrorNumFirma] = useState(0);
    const [errorMsgFirma, setErrorMsgFirma] = useState("");

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
        
                    if(paramsDispatch.length === 0){
                        setParamsDispatch(params); 
                        setCtaCtoDispatch(cuentaLO);
                    }
            
                    let message = "folio"; //?posicion=5&codigo=0";
                    let paramsPorMientras = [canal,cuentaSesionLO.toString(),tokenLO,idLO.toString()];
        
                    let a = { message, params: paramsPorMientras };
        
                    dispatch(getFolioDataRequest(a));

                    fetchDetalleDoc(canal, cuentaSesionLO.toString(), tokenLO, idLO.toString(), cuentaLO);
                    
                } // if cuentaSesionLO != 0
            }// if loginObject.response.dsLogin.tdsLogin.length > 0
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
            setInputValorIngresado("");
            setDetalleDoc({} as any);
            setListaPersonas([]);
            setErrorNumFirma(0);
            setErrorMsgFirma("");
        };
    }, []);

    const fetchDetalleDoc = (canal: string, cuentaSesionLO: string, tokenLO: string, idLO: string, cuentaLO: string) => {
        //en este fetch sacamos el detalle del doc consultado
        //console.log("Antes del fetch...");
        let urlParaFetch = apiCall.API_CONFIGURA + "doclegales/doc?cuenta=" + cuentaLO + "&doc=" + params_url?.id + "&version=" + params_url?.version + "&documentcreate=true";
        let headersParaFetch = {
            "canal": canal,
            "cuentasesion": cuentaSesionLO,
            "token": tokenLO,
            "id": idLO,
            "x-api-key": apiCall.X_API_KEY_CONFIGURA,
        };

        fetch(
            urlParaFetch,
            {
                method: "GET",
                headers: headersParaFetch,
            }
        )
        .then(response => response.json())
        .then((jsonData) => {
            /*console.log("docLegalesResp api consulta individual: ");
            console.log("url: ", urlParaFetch);
            console.log("headers enviados:");
            console.log(headersParaFetch);
            console.log("resp:");
            console.log(jsonData);*/
            setDetalleDoc(jsonData.response.data);
            setListaPersonas(jsonData.response.data.docPersonas);

            const personaActiva = jsonData.response.data.docPersonas.filter((persona: any) => {
                return persona.activo === true;
            });
            //console.log("personaActiva");
            //console.log(personaActiva);
            if(personaActiva.length > 0){
                setEstatusPersonaActiva(parseInt(personaActiva[0].estatus.toString()));
            }
        })
        .catch(e => {
            /*console.log("Error en fetch doclegal:");
            console.log(e);*/
            setErrorDetalleDoc("Hubo un error, intenta más tarde.");
        });
    };

    const firmarDocumento = () => {
        if(paramsDispatch.length > 0 && ctaCtoDispatch.length > 0){
            const reqBody = {
                request: {    
                    inputdata: {
                        dsSign: {
                            tdsSign: [
                                {
                                    Doc: params_url.id,
                                    Version: params_url.version,
                                    Folio: getFolioData?.response.folio,
                                    FolioPos: getFolioData?.response.posicion,
                                    FolioCod: inputValorIngresado,
                                    Estatus: 2               
                                }
                            ]
                        }
                    }
                }
            }

            const urlFetchFirmar = apiCall.API_CONFIGURA + "doclegales/firma?cuenta=" + ctaCtoDispatch;
            const headersFetchFirmar = {
                "canal" : paramsDispatch[0],
                "x-api-key": apiCall.X_API_KEY_CONFIGURA,
                "cuentasesion": paramsDispatch[1],
                "token": paramsDispatch[2],
                "id": paramsDispatch[3]
            };
            /*console.log("fetch firmar doc");
            console.log("url: ", urlFetchFirmar);
            console.log("headers:");
            console.log(headersFetchFirmar);
            console.log("body:");
            console.log(reqBody);*/
            //en este fetch hacemos la firma del doc
            fetch(
                urlFetchFirmar,
                {
                    method: "POST",
                    headers: headersFetchFirmar,
                    body: JSON.stringify(reqBody),
                }
            )
            .then(response => response.json())
            .then((jsonData) => {
                /*console.log("resp jsonData firmar doc:");
                console.log(jsonData);*/
                
                setErrorNumFirma(jsonData.response.ierror);
                setErrorMsgFirma(convertToAcentos(jsonData.response.cerror));

                if(jsonData.response.ierror.toString() === "0"){
                    //no hubo error, hacemos 
                    //[ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    fetchDetalleDoc(paramsDispatch[0], paramsDispatch[1], paramsDispatch[2], paramsDispatch[3], ctaCtoDispatch);
                }
            })
            .catch((error) => {
                console.log("error: ", error);
            });
        }// if paramsDispatch.length > 0 && ctaCtoDispatch.length > 0
    };

    //console.log("estatus de persona activa:");
    //console.log(estatusPersonaActiva);

    let childrenContentPrincipal = (
        <>
            <div className="w-full flex flex-col">
                <ConsultasHeader selectedTab="Documentos Legales" />
                {
                    errorDetalleDoc.length > 0 ?
                        <p className="text-red-600 py-3">{errorDetalleDoc}</p>
                    : 
                        detalleDoc !== undefined &&
                        <div id="contenidoDoc">
                            <div id="tituloDoc" className="py-3 w-full">
                                <h1 className="font-base font-bold">{detalleDoc.docDescripcion}</h1>
                            </div>
                            <div id="personasDoc" className="py-3">
                                {
                                    listaPersonas && listaPersonas.map(( node ) => { 
                                        const {nombre, figura, estatusDesc, estatusFecha} = node
                                        return (
                                            <div key={nombre + estatusFecha} className="flex mb-4">
                                                <div className="w-8/12">
                                                    <p className="mb-2 font-bold text-sm">{nombre}</p>
                                                    <p className="text-sm">{figura}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-2 font-bold text-sm">{estatusDesc}</p>
                                                    <p className="text-sm">{estatusFecha}</p>
                                                </div>
                                            </div>
                                        )                                    
                                    })
                                }
                            </div>
                            <div id="detalleDoc" className="w-full my-3">
                                {
                                    (detalleDoc !== undefined && 
                                    detalleDoc.doc !== undefined && 
                                    detalleDoc.doc.length > 0) && <iframe style={{ height: "80rem" }} className="w-full" src={"data:application/pdf;base64," + detalleDoc.doc} />
                                }
                            </div>
                            { 
                                (detalleDoc !== undefined && 
                                    detalleDoc.docSignWarn !== undefined && 
                                    detalleDoc.docSignWarn.length > 0) &&
                                    <p className="my-2 text-red-500">{parse(detalleDoc.docSignWarn.toString())}</p>
                            }
                            {
                                (estatusPersonaActiva === 0) && 
                                    <div id="firmaDoc">
                                        {
                                            (getFolioData !== undefined && getFolioData.loading === false) && 
                                            <div>
                                                <p className="text-xs py-2">Tarjeta con folio {getFolioData.response.folio}</p>
                                                <div className="w-1/2 flex flex-row items-center">
                                                    <input 
                                                        className={`relative w-50 inline-flex p-1 my-2 border border-1 rounded bg-white text-xs font-medium hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 border-gray-200 text-gray-400`} 
                                                        type="text" 
                                                        placeholder={'Ingresa el código en la posición ' + getFolioData.response.posicion} 
                                                        value={inputValorIngresado}
                                                        onChange={(event: any) => setInputValorIngresado(event.target.value.toString())}
                                                    />
                                                    <button
                                                        className="w-28 h-8 ml-4 text-center font-bold inline-block bg-red-600 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600"
                                                        onClick={() => firmarDocumento()}
                                                    >
                                                        Acepto
                                                    </button>
                                                </div>
                                                <p className="text-xs py-2">He leído y estoy enterado del contenido y alcance legal de presente documento, por lo que subscribo de conformidad.</p>
                                            </div>
                                        }
                                        <div>
                                            <p className={"my-2 " + (errorNumFirma !== 0 ? "text-red-500" : "")}>{parse(errorMsgFirma)}</p>
                                        </div>
                                    </div>
                            }
                        </div>
                }
            </div>
        </>
    );

    return(
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
        />
    );
}

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getFolioDataReset: () => dispatch(getFolioDataReset(dispatch))
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        getFolioData: store.folioData,
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentosLegalesFirmar);
