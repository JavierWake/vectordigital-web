import React, { useEffect, useState } from "react";

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import { Tabs } from "../containers/Tabs";
import TabsOperations from '../mocks/TabsOperations';

import { multipleOrders } from "../actions/multipleOrdersAction";
import { multipleBuyAdd } from "../actions/multipleBuyAction";

import Instrucciones from "./Instrucciones"
import OrdenRecibidaContainer from "./OrdenRecibidaContainer";

import {ReactComponent as MorningStarLogo} from '../assets/morning-star-logo.svg';
import {ReactComponent as VectorNaranja} from '../assets/Vector-triangulo-naranja.svg';
import OrdenMultRecibida from "./OrdenMultRecibida";

interface OperationsProps {
    multipleOrder: any;
    multipleBuys: any;
    issuerFondo?: string;
    selectedTabTitle?: string;
    emisora: any;
    serie: any;
}

const Operations: React.FC<OperationsProps> = ({ multipleOrder, multipleBuys, emisora, serie, selectedTabTitle, issuerFondo }) => {

    const dispatch = useDispatch();

    // console.log("Operations Emisora: " + emisora + " serie: " + serie);

    //HOOKS - para la Orden Recibida
    const [orTipoOrden, setOrTipoOrden] = useState("");
    const [orFolio, setOrFolio] = useState("");
    const [orOperacion, setOrOperacion] = useState(""); //enviamos "Fondos" o "Capitales"
    const [orRespuestaApi, setOrRespuestaApi] = useState("");
    const [orOrdenRecibida, setOrOrdenRecibida] = useState(false);
    const [ordenMultRecibida, setOrdenMultRecibida] = useState(false);
    const [tipo, setTipo] = useState("");
    const [mensajeAPI, setMensajeAPI] = useState("");
    const [respuestaAPI, setRespuestaAPI] = useState([]);


    const sendOrTipoOrden = (data: string) => {
        if(data === orTipoOrden){
            return;
        }
        setOrTipoOrden(data);
    };

    const sendOrFolio = (data: string) => {
        if(data === orFolio){
            return;
        }
        setOrFolio(data);
    };

    const sendOrOperacion = (data: string) => {
        if(data === orOperacion){
            return;
        }
        setOrOperacion(data);
    };

    const sendOrRespuestaApi = (data: string) => {
        if(data === orRespuestaApi){
            return;
        }
        setOrRespuestaApi(data);
    };

    const sendOrOrdenRecibida = (data: boolean) => {
        if(data === orOrdenRecibida){
            return;
        }
        setOrOrdenRecibida(data);
    };

    const sendOrdenMultRecibida = (data: boolean) => {
        if(data === ordenMultRecibida){
            return;
        }
        setOrdenMultRecibida(data);
    };

    const sendTipo = (data: string) => {
        if(data === tipo){
            return;
        }
        setTipo(data);
    };

    const sendRespuestaAPI = (data: []) => {
        if(data === respuestaAPI){
            return;
        }
        setRespuestaAPI(data);
    };

    const sendMensajeAPI = (data: string) => {
        if(data === mensajeAPI){
            return;
        }
        setMensajeAPI(data);
    };

    useEffect(() => {
        if(multipleBuys.length == 0){
            dispatch(multipleOrders(false));
        }
    }, [multipleBuys]);


    // console.log("operations container");
    const sendOrdenRecibida = (folio: string, tipoOrden: string, operacion: string, respuestaApi: string) => {
        sendOrTipoOrden(tipoOrden);
        sendOrFolio(folio);
        sendOrOperacion(operacion);
        sendOrRespuestaApi(respuestaApi);
        sendOrOrdenRecibida(true);
    }

    const sendOrdenMult = (tipo: string, mensajeAPI: string, respuestaAPI: []) => {
        sendTipo(tipo);
        sendMensajeAPI(mensajeAPI);
        sendRespuestaAPI(respuestaAPI);
        sendOrdenMultRecibida(true);
    }

    return (
        <div>
            {
                (selectedTabTitle && selectedTabTitle === "Fondos") && <>
                    <div className="ContenedorSpan bg-white py-2 mb-2 shadow-2xl p-2 rounded">
                        <div className="VectorFondos  flex justify-center align-items-center">
                           <p className="text-blue-950 font-semibold mx-1">Vector</p> <p className="text-red-600 font-semibold" > Fondos </p> <VectorNaranja className="w-6 h-6"/>
                        </div>
                        <div className="LeyendaMorninstar flex flex-col p-2">
                            <div className="flex flex-row">
                                <p className="font-semibold text-sm">Premio</p> 
                                <MorningStarLogo className="mx-2"/> 
                                <p className="font-semibold text-sm">2021 a la mejor </p>
                            </div>
                            <p className="font-semibold text-sm">operadora de deuda</p>
                        </div>
                    </div>
                </>
            }
            {
                orOrdenRecibida === true ?
                    <OrdenRecibidaContainer folio={orFolio} tipoOrden={orTipoOrden} respuestaApi={orRespuestaApi} setOrdenRecibida={sendOrOrdenRecibida} />
                :
                    ordenMultRecibida === true ?
                        <OrdenMultRecibida tipo={tipo} mensajeAPI={mensajeAPI} respuestaApi={respuestaAPI} setOrdenRecibida={sendOrdenMultRecibida} />
                    :
                        <>
                            <div className="bg-white shadow-2xl p-2">
                                <h1 className="font-sans font-bold">Operaciones</h1>
                                <Tabs color="red" tabsData={TabsOperations(emisora, serie, issuerFondo, sendOrdenRecibida)} typeAlert={true} selectedTabTitle={selectedTabTitle} />
                            </div>
                            { multipleOrder && <Instrucciones sendOrdenMult={sendOrdenMult} /> }
                        </>
            }
        </div>
    );
}

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        multipleOrders: () => dispatch(multipleOrders(dispatch)),
        multipleBuyAdd: () => dispatch(multipleBuyAdd(dispatch)),
    };
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        multipleOrder: store.multipleOrders.multipleOrders,
        multipleBuys: store.multipleBuy.multipleBuy,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Operations);