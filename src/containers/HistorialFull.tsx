import "../../node_modules/material-design-icons/iconfont/material-icons.css";
import React, { useEffect, useState, useRef } from 'react';

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { useHistory, useParams, NavLink } from 'react-router-dom'
import Appbar from '../components/Appbar';
import Sidebar from '../components/Sidebar';
import Loading from "../components/Loading";
import '../styles/sidebar.css';

//Containers
import Operations from '../containers/Operations';
import { Dropdown } from "../containers/Dropdown";
import { FooterComponent } from '../containers/FooterComponent';

//Actions to call redux store
import { getHistorialEmisoraRequest } from '../actions/HistorialEmisoraAction';
import { IResponse, HistorialEmisoraStatus } from '../types/HistorialEmisoraTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

//Types to use data from store
import { LoginObjectState } from "../types/LoginObjectTypes";

//Mocks | Dummy data
import { appBarMockData } from '../mocks/Appbar';

interface propsFromState {
    loginObject: LoginObjectState;
    ticker?: any;
    movimientos?: any;
    historialEmisora?: IResponse;
    historialEmisoraLoading?: HistorialEmisoraStatus;
}

type AllProps = propsFromState; 


const HistorialFull: React.FC<AllProps> = ({ loginObject, ticker, movimientos, historialEmisora, historialEmisoraLoading }) => {
    
    ticker = useParams();
    const dispatch = useDispatch();    
    const history = useHistory();
    let cuentaLO = "";
    const cuentaRef = useRef("");
    const idRef = useRef("");
    let emisora:any;
    let serie: any;
    let arrayDropdown:any = [];

    const [mostrar, setMostrar] = useState(5);
    const [ready, setReady] = useState(false);
    const [dropdwonArray, setDropdwonArray] =  useState([{id: 0, option: '0'}]);

    const [errorEmisora, setErrorEmisora] = useState(false);

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
                    setReady(!ready);

                    emisora = ticker.ticker.split(".")[0];
                    serie = ticker.ticker.split(".")[1];

                    let message = "/consulta/historialemisora?cuenta="+cuentaLO+"&emisora="+emisora+"&serie="+serie+"&filtro=1";
                    let params = [ canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                    dispatch(getHistorialEmisoraRequest({message, params}));
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
    },[]);

    // useEffect(() => {
    //     let algo = [].fill.call({ length: historialEmisora.dsMovimientos.tdsMovimientos.length }, (v: any, k: any)) => k*5); 
    // },[historialEmisora?.dsMovimientos.tdsMovimientos]);

    useEffect(() => {
        if(ready && historialEmisora?.dsMovimientos.tdsMovimientos) {
            let sizeHistorial: number = historialEmisora.dsMovimientos.tdsMovimientos.length;
            let size: number = sizeHistorial/5;
            if((sizeHistorial % 5) === 0) {
                arrayDropdown = new Array(size); for (let i=0; i<size; ++i) arrayDropdown[i] = {id: (i+1)*5, option: ((i+1)*5).toString() };
            } else {
                if(size < 1) {
                    arrayDropdown = [{id: sizeHistorial, option: sizeHistorial.toString()}];
                } else {
                    arrayDropdown = new Array(sizeHistorial); for (let i=0; i<size; ++i) arrayDropdown[i] = {id: (i+1)*5, option: ((i+1)*5).toString() };
                    arrayDropdown.concat({id: sizeHistorial, option: sizeHistorial.toString()});
                }
            }
            setDropdwonArray(arrayDropdown);
        }
        // console.log("arrayDropdown",arrayDropdown);
    },[historialEmisora?.dsMovimientos.tdsMovimientos])

    const sendMostrar = (data: string) => {
        setMostrar(parseInt(data));
    };

    return(
        <div className="bg-white">
            <Appbar appBarData={appBarMockData}/>  
            <div className="flex-auto">
                <div className="flex flex-row">
                    <div className="w-1/24 h-full">
                        <Sidebar />
                    </div>
                    <div className="w-17/24 px-10 py-4">
                        {/* Parte de arriba */}
                        <div className="flex flex-row">
                            <div className="w-full py-2">
                                <h1 className="text-xl text-gray-800 font-medium border-b border-gray-300 pb-2">Historial de {ticker.ticker}</h1>
                            </div>
                        </div>
                        {/* Parte de abajo */}
                        <div className="flex justify-end py-2">
                            <p className="text-xs text-gray-500 text-right py-2">Últimos 3 meses</p>
                        </div>
                        {
                            historialEmisoraLoading?.loading ?
                                <Loading />
                            :
                                (historialEmisora?.dsMovimientos.tdsMovimientos === null || historialEmisora?.dsMovimientos.tdsMovimientos === undefined) ? 
                                    <div className="h-8">
                                        <p>No hay hisotrial de esta emisora</p>
                                    </div> 
                                :
                                    <table className="table-auto w-full my-6 border-separate">
                                        <tbody>
                                            {
                                                historialEmisora?.dsMovimientos.tdsMovimientos.slice(0, mostrar).map((data: any, index: any) => {
                                                    return(
                                                        <tr className="spaceUnder">
                                                            <td className="font-semibold text-sm my-12">{data.DescTransaccion}</td>
                                                            <td className="font-medium text-sm my-12">{data.sTitulos +" titulos a " + data.sPrecio}</td>
                                                            <td className="font-semibold text-sm my-12">{data.sMonto}</td>
                                                            <td className="font-medium text-sm my-12 text-gray-500">{data.FechaOperacion}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                        }
                        {
                        historialEmisoraLoading?.loading ?
                            <Loading />
                        :
                            <div className="w-full flex justify-end">
                                <div className="flex items-center px-4">
                                    <p>Mostrar</p>
                                </div>
                                <Dropdown
                                    dropdownData={dropdwonArray}
                                    initialOption={dropdwonArray[0].option.toString()}
                                    side={false}
                                    sendOption={(mostrar:any) => { sendMostrar(mostrar) }}
                                    fondosFamilia={false}
                                />
                            </div>
                        }
                    </div>
                    <div className="w-6/24 py-3 px-2 sticky inset-x-0 top-0 overflow-y-auto h-full">
                        <Operations emisora={ticker.ticker.split(".")[0]} serie={ticker.ticker.split(".")[1]} />
                    </div>
                </div>
            </div>
            <FooterComponent />    
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        loginObject: store.loginObjectState,
        historialEmisora: store.historialEmisora.response,
        historialEmisoraLoading: store.historialEmisora,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getHistorialEmisoraRequest: () => dispatch(getHistorialEmisoraRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistorialFull);