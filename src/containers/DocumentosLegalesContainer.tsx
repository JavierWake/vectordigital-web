import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { RootState } from '../reducers/rootReducer';
import { LoginObjectState } from '../types/LoginObjectTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';

import * as apiCall from './../constants';

interface ModalFolioTarjetaProps {
    loginObject: LoginObjectState;
}

const DocumentosLegalesContainer: React.FC<ModalFolioTarjetaProps> = ({ loginObject }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const [listaDocs, setlistaDocs] = useState([]);

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

                    let headersParaFetch = {
                                "canal" : canal,
                                "x-api-key": apiCall.X_API_KEY_CONFIGURA,
                                "cuentasesion": cuentaSesionLO.toString(),
                                "token": tokenLO,
                                "id": idLO.toString()
                            };
                    let urlParaFetch = apiCall.API_CONFIGURA + "doclegales/lista?cuenta=" + cuentaLO;

                    fetch(
                        urlParaFetch,
                        {
                            method: "GET",
                            headers: headersParaFetch,
                        }
                    )
                    .then(response => response.json())
                    .then((jsonData) => {
                        /*console.log("docLegalesResp lista docs legales");
                        console.log("url: ", urlParaFetch);
                        console.log("headers enviados: ");
                        console.log(headersParaFetch);
                        console.log("respuesta: ");
                        console.log(jsonData);*/

                        setlistaDocs(jsonData.response.data.tdsDoc);
                    })
                    .catch((error) => {
                        console.log("error: ", error);
                    });
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
    },[]);

    return(
        <div>
            <div className="flex flex-col w-full">
                {
                    listaDocs && listaDocs.length === 0 && <span className="text-gray-500 py-2">No hay datos.</span>
                }
                {listaDocs && listaDocs.map(( node ) => {
                    const { id, version, nombre, estatus, estatusDesc, estatusFecha, firmasDesc } = node
                    return(
                        <div key={nombre} className="flex flex-col hover:shadow-xl border-b border-gray-300 my-2 pb-2">
                            <div id="nombre" className="flex justify-between w-full my-2">
                                <p className="font-base font-bold">{nombre}</p>
                            </div>
                            <div className="flex justify-between items-end pb-3">
                                <div id="estatus">
                                    <p className="mb-4 text-sm text-gray-400">Estatus: {estatusDesc}</p>
                                    <p className="text-sm">{estatusFecha}</p>
                                </div>
                                <div id="btns">
                                    <p className="text-sm">{firmasDesc} Firmas</p>
                                    <div className="mt-3">
                                        <NavLink to={"/documentos-legales/" + id + "/" + version}>
                                            <div className="mr-4 text-center font-bold inline-block bg-red-600 py-2 px-4 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
                                                {
                                                    //verificar textos
                                                    estatus === 0 ? 
                                                    //signReason
                                                    "Firmar Documento"
                                                    :
                                                    "Ver Documento"
                                                }
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            {/* <hr className="solid bg-gray-500 mt-2 mb-4"/> */}
                        </div>
                    )
                })}
            </div>     
        </div>
    );
};

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector

    };
};

export default connect(mapStateToProps)(DocumentosLegalesContainer);
