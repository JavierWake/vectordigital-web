import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RootState } from '../reducers/rootReducer';
import { connect, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import parse, { HTMLReactParserOptions } from "html-react-parser";

import { postMultBuyIssuerRequest } from '../actions/multBuyIssuerAction';
import { postMultSellIssuerRequest } from '../actions/multSellIssuerAction';
import { compra } from "../actions/compraAction";
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { venta } from "../actions/ventaAction";
import { LoginObjectResponse, LoginObjectState } from '../types/LoginObjectTypes';
import { PosicionFolioState } from '../types/PosicionFolioTypes';

import ModalFolioTarjetaForm from "./ModalFolioTarjetaForm";

interface ModalConfirmarProps {
    loginObject?: LoginObjectState;
    elements: any;
    multBuyIssuers: any;
    multSellIssuers: any;
    compraStore: any;
    ventaStore: any;
    postPosicionFolio?: PosicionFolioState;
}

const ModalConfirmarOperacion: React.FC<ModalConfirmarProps> = ({ loginObject, elements, multBuyIssuers, multSellIssuers, compraStore, ventaStore, postPosicionFolio }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [modalFolioTarjetaOpen, setModalFolioTarjetaOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [checkAPI, setCheckAPI] = useState(false);
    const toggle = () => setModal(!modal);
    const [errorMultCVTarjeta, setErrorMultCVTarjeta] = useState(false);

    //HOOKS - para llamadas del dispatch
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");

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
                
                        sendCtaCtoDispatch(cuentaLO);
                        sendParamsDispatch([ canal, cuentaSesionLO.toString(), tokenLO, idLO.toString() ]);
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en modalconfirmaroperacion, lo mandamos al login");
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
            console.log("usuario no loggeado en modalconfirmaroperacion, lo mandamos al login");
            history.push("/");
        }
    },[]);

    const compraVenta = () => {
        // Compra multiple de la emisora

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
                
                        let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()]
                        let data = elements;

                        if(compraStore){
                            let message = "tradecap/cpamult?cuenta=" + cuentaLO.toString();
                            let res = { message, params, data };
                            dispatch(postMultBuyIssuerRequest(res));
                        }
                        else{
                            let message = "tradecap/vtamult?cuenta=" + cuentaLO.toString();
                            let res = { message, params, data };
                            dispatch(postMultSellIssuerRequest(res));
                        }

                        setModal(true);
                    }
                }
                else{
                    //el usuario no esta loggeado, lo mandamos al login
                    console.log("usuario no loggeado en modalconfirmaroperacion, lo mandamos al login");
                    history.push("/");
                }
            }
            else{
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en modalconfirmaroperacion, lo mandamos al login");
                history.push("/");
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en modalconfirmaroperacion, lo mandamos al login");
            history.push("/");
        }
    }

    useEffect(() => {
        console.log("Entra a useEffect");
        console.log(multBuyIssuers);
        if(!multBuyIssuers.loading && multBuyIssuers.response.dstrade.tdstrade.length != 0){
            setCheckAPI(true);
        }
        if(!multBuyIssuers.loading && multBuyIssuers.response.ierror === 50){
            console.log("Entra al if compra error");
            setErrorMultCVTarjeta(true);
            setModalFolioTarjetaOpen(true);
        }
    }, [multBuyIssuers.loading]);

    useEffect(() => {
        if(!multSellIssuers.loading && multSellIssuers.response.dstrade.tdstrade.length != 0){
            setCheckAPI(true);
        }
        if(!multSellIssuers.loading && multSellIssuers.response.ierror === 50){
            setErrorMultCVTarjeta(true);
            setModalFolioTarjetaOpen(true);
        }
    }, [multSellIssuers.loading]);

    useEffect(() => {
        if(postPosicionFolio != undefined){
            if(!postPosicionFolio.loading && postPosicionFolio.response != undefined){
                if(postPosicionFolio.response.ierror != undefined){
                    if(postPosicionFolio.response.ierror === 0 && errorMultCVTarjeta ){
                        // Numero de la tarjeta confirmado. Volver a hacer la compra/venta
                        setErrorMultCVTarjeta(false);
                        compraVenta();
                    }
                }
            }
        }
    }, [postPosicionFolio]);

    useEffect(() => {
        if(!modal && checkAPI){
            dispatch(compra(false));
            dispatch(venta(false));
        }
    }, [modal]);

    const sendParamsDispatch = (data: string[]) => {
        if(data.length === 0){
            return
        }
        if(data.includes("")){
            return;
        }
        if(paramsDispatch === data){
            return;
        }
        setParamsDispatch(data);
    };

    const sendCtaCtoDispatch = (data: string) => {
        if(data.length === 0){
            return;
        }
        if(ctaCtoDispatch === data){
            return;
        }
        setCtaCtoDispatch(data);
    };

    const modalCloseSinFolio = (data: boolean) => {
        if(data){
            setErrorMultCVTarjeta(false);
        }
    }

    return (
        <div>
            <button className="w-full bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600" onClick={compraVenta}>
                Confirmar
            </button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <p className="my-1 font-bold">Operaciones</p>
                    <p className="text-sm text-red-600">{compraStore ? parse(multBuyIssuers.response.cerror) : parse(multSellIssuers.response.cerror)}</p>
                </ModalHeader>
                <ModalBody>
                    {
                        compraStore ?
                            multBuyIssuers.response.dstrade.tdstrade.length != 0 ? multBuyIssuers.response.dstrade.tdstrade.map((orden: any) => {
                                return (
                                    <div>
                                        <div className="my-3 flex">
                                            <div className="w-1/2">
                                                <p className="font-bold">{"Compra " + orden["tipoOrden"]}</p>
                                                <p className="text-sm text-gray-400">Tipo de Orden</p>
                                            </div>
                                            <div className="w-1/2">
                                                <p className="font-bold">{orden["folio"]}</p>
                                                <p className="text-sm text-gray-400">Folio</p>
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <p className="text-sm text-gray-400">{parse(orden["cerror"])}</p>
                                        </div>
                                    </div>
                                );
                            }) : ""
                        :
                            multSellIssuers.response.dstrade.tdstrade.length != 0 ? multSellIssuers.response.dstrade.tdstrade.map((orden: any) => {
                                return (
                                    <div>
                                        <div className="my-3 flex">
                                            <div className="w-1/2">
                                                <p className="font-bold">{"Venta " + orden["tipoOrden"]}</p>
                                                <p className="text-sm text-gray-400">Tipo de Orden</p>
                                            </div>
                                            <div className="w-1/2">
                                                <p className="font-bold">{orden["folio"]}</p>
                                                <p className="text-sm text-gray-400">Folio</p>
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <p className="text-sm text-gray-400">{parse(orden["cerror"])}</p>
                                        </div>
                                    </div>
                                );
                            }) : ""
                    }
                </ModalBody>
            </Modal>
            {
                (modalFolioTarjetaOpen && paramsDispatch.length > 0) && <ModalFolioTarjetaForm 
                    modalOpen={modalFolioTarjetaOpen}
                    setModalOpen={(isOpen: boolean) => setModalFolioTarjetaOpen(isOpen)}
                    params={paramsDispatch}
                    sendModalClose={(m: boolean) => modalCloseSinFolio(m)}
                />
            }
        </div>
    );
}

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        postMultBuyIssuerRequest: () => dispatch(postMultBuyIssuerRequest(dispatch)),
        postMultSellIssuerRequest: () => dispatch(postMultSellIssuerRequest(dispatch)),
        compra: () => dispatch(compra(dispatch)),
        venta: () => dispatch(venta(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState,
        multBuyIssuers: store.multBuyIssuer,
        multSellIssuers: store.multSellIssuer,
        compraStore: store.compra.compra,
        ventaStore: store.venta.venta,
        postPosicionFolio: store.posicionFolio,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmarOperacion);