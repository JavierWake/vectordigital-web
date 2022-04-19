import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import { BsTrash } from "react-icons/bs";

import ModalFolioTarjetaForm from "./ModalFolioTarjetaForm";

import { LoginObjectState } from '../types/LoginObjectTypes';
import { PosicionFolioState } from '../types/PosicionFolioTypes';
import { MultBuyIssuerState } from "../types/MultBuyIssuerType";
import { MultSellIssuerState } from "../types/MultSellIssuerType";

import { multipleBuyDelete } from "../actions/multipleBuyAction";
import { postMultBuyIssuerRequest } from '../actions/multBuyIssuerAction';
import { postMultSellIssuerRequest } from '../actions/multSellIssuerAction';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

interface OperationsProps {
    loginObject?: LoginObjectState;
    multipleBuys: any;
    multBuyIssuers: MultBuyIssuerState;
    multSellIssuers: MultSellIssuerState;
    compraStore: any;
    ventaStore: any;
    postPosicionFolio?: PosicionFolioState;
    sendOrdenMult: (tipo: string, mensajeAPI: string, respuestaAPI: []) => void;
}


const Instrucciones: React.FC<OperationsProps> = ({ loginObject, multipleBuys, multBuyIssuers, multSellIssuers, compraStore, ventaStore, postPosicionFolio, sendOrdenMult }) => {
    
    const dispatch = useDispatch();
    const history = useHistory();

    const[total, setTotal] = useState("");

    //HOOKS - para llamadas del dispatch
    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [errorMultCVTarjeta, setErrorMultCVTarjeta] = useState(false);
    const [modalFolioTarjetaOpen, setModalFolioTarjetaOpen] = useState(false);
    const [ready, setReady] = useState(false);
    const [confirmar, setConfirmar] = useState(false);

    const deleteItem = (id : number) => {
        dispatch(multipleBuyDelete(id));
    }

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
                        setReady(true);
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

    useEffect(() => {
        if(multipleBuys.length > 0){
            let accum = 0;
            multipleBuys.map((orden) => {
                accum = accum + parseFloat(orden["precio"]) * parseFloat(orden["titulos"]);
            })
            setTotal(accum.toFixed(2));
        }
    }, [multipleBuys]);

    useEffect(() => {
        if(ready && !multBuyIssuers.loading){
            if(multBuyIssuers.response.ierror === 0){
                sendOrdenMult("Compra",multBuyIssuers.response.cerror,multBuyIssuers.response.dstrade.tdstrade)
            }
            else if(!multBuyIssuers.loading && multBuyIssuers.response.ierror === 50){
                setErrorMultCVTarjeta(true);
                setModalFolioTarjetaOpen(true);
            }
        }
    }, [multBuyIssuers.loading]);

    useEffect(() => {
        if(ready && !multSellIssuers.loading){
            if(!multSellIssuers.loading && multSellIssuers.response.ierror === 50){
                setErrorMultCVTarjeta(true);
                setModalFolioTarjetaOpen(true);
            }
            else{
                sendOrdenMult("Venta",multSellIssuers.response.cerror,multSellIssuers.response.dstrade.tdstrade)
            }
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

    const compraVenta = () => {
        // Compra multiple de la emisora
        setConfirmar(true);
        
        let params = paramsDispatch
        let data = multipleBuys;

        if(compraStore){
            let message = "tradecap/cpamult?cuenta=" + ctaCtoDispatch.toString();
            let res = { message, params, data };
            dispatch(postMultBuyIssuerRequest(res));
        }
        else{
            let message = "tradecap/vtamult?cuenta=" + ctaCtoDispatch.toString();
            let res = { message, params, data };
            dispatch(postMultSellIssuerRequest(res));
        }
    }

    const modalCloseSinFolio = (data: boolean) => {
        if(data){
            setErrorMultCVTarjeta(false);
        }
    }
    
    return (
        <div className="bg-white shadow-2xl p-3 border-t border-gray-300">
            <p className="font-bold text-sm">Instrucciones al ser ingresadas</p>
            <div className="py-3">
            {
                multipleBuys.map((orden: any, index : number) => {
                    return (
                        <div className="border-b border-gray-300 py-2">
                            <div className="flex justify-between">
                                <div className="text-xs">
                                    <p>{orden["emisora"] + "." + orden["serie"]}</p>
                                    <p className="text-gray-600">{orden["tipoOrden"] == 1 ? "Limitada" : "Mercado con Protección"}</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-end text-xs mx-3">
                                        <p>{orden["titulos"]} títulos a ${orden["precio"]}</p>
                                        <p className="text-gray-600">Aprox: ${parseFloat(orden["precio"]) * parseFloat(orden["titulos"])}</p>
                                    </div>
                                    <BsTrash className="text-lg text-gray-500 cursor-pointer" onClick={() => deleteItem(index)} />
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
            <p className="text-end text-sm my-2">Subtotal: <span className="font-bold">${total}</span></p>
            <button 
                disabled={confirmar} 
                className={
                    "w-full p-1 text-sm text-gray-100 border-1 rounded " + 
                    (confirmar ? 
                        "bg-gray-350 border-gray-350 cursor-not-allowed" 
                        : "bg-red-600 border-red-600 hover:border-red-600 hover:bg-white hover:text-red-600")} 
                onClick={compraVenta}>
                Confirmar
            </button>
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
        multipleBuyDelete: () => dispatch(multipleBuyDelete(dispatch)),
        postMultBuyIssuerRequest: () => dispatch(postMultBuyIssuerRequest(dispatch)),
        postMultSellIssuerRequest: () => dispatch(postMultSellIssuerRequest(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        multipleBuys: store.multipleBuy.multipleBuy,
        compraStore: store.compra.compra,
        ventaStore: store.venta.venta,
        loginObject: store.loginObjectState,
        multBuyIssuers: store.multBuyIssuer,
        multSellIssuers: store.multSellIssuer,
        postPosicionFolio: store.posicionFolio,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Instrucciones);