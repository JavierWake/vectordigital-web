import React, { useState, useEffect, useRef } from 'react';
import Appbar from './../Appbar';
import { appBarMockData } from '../../mocks/Appbar';
import Sidebar from './../Sidebar';
import { Tooltip } from '@material-ui/core';
import { LoginObjectState } from '../../types/LoginObjectTypes';
import { useHistory } from 'react-router-dom';
import { getFolioDataRequest, getFolioDataReset } from '../../actions/folioDataAction';
import { RootState } from '../../reducers/rootReducer';
import { connect, useDispatch } from 'react-redux';
import * as apiCall from '../../constants'
import { Dropdown } from '../../containers/Dropdown';
import ConsultasHeader from '../../containers/ConsultasHeader';
import { FooterComponent } from '../../containers/FooterComponent';
import PageLayout from '../../containers/layout/PageLayout';
import { postLoginObjectLogout } from '../../actions/loginObjectAction';

interface ModalFolioTarjetaProps {
    loginObject: LoginObjectState;
}

const ConstanciasFiscales: React.FC<ModalFolioTarjetaProps> = ({ loginObject }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
    const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
    const [IDS, setIDS] = useState("Todos");


    const [dataConstancias, setDataConstancias] = useState([]);
    const [listAnios, setListAnios] = useState(new Array<String>());
    const cuentaRef = useRef("");
    const idRef = useRef("");
    const tokenRef = useRef("");
    const canalRef = useRef("");

    useEffect(() => {

        if (loginObject.response.ierror === -1) {
            if (loginObject.response.dsLogin.tdsLogin.length > 0) {

                const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;

                if (cuentaSesionLO != 0) {
                    // mandamos llamar las apis sacando los datos del objeto de login

                    const idLO: any = loginObject.response.dsLogin.tdsLogin[0].id;
                    const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                    const canal = "999";
                    const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                    cuentaRef.current = cuentaLO;
                    idRef.current = idLO;
                    tokenRef.current = tokenLO;
                    canalRef.current = canal;


                    let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];

                    if (paramsDispatch.length === 0) {
                        setParamsDispatch(params);
                        setCtaCtoDispatch(cuentaLO);
                    }

                    const api_ = apiCall.API_CONFIGURA + "constancias/lista?cuenta=" + cuentaLO;
                    fetch(
                        api_,
                        {
                            method: "GET",
                            headers: {
                                "canal": canal,
                                "x-api-key": apiCall.X_API_KEY_CONFIGURA,
                                "cuentasesion": cuentaLO,
                                "token": tokenLO,
                                "id": idLO.toString(),
                            }
                        }
                    ).then(response => response.json())
                        .then((jsonData) => {
                            // console.log(jsonData)
                            const lista_constancias = jsonData.response.dsConstancia.dsConstancia.tdsConstancia

                            // console.log("Lista constancias")
                            // console.log(lista_constancias)

                            setDataConstancias(lista_constancias)

                            let anios = new Array<String>()

                            if (lista_constancias != undefined) {
                                lista_constancias.forEach(function (obj) {
                                    if (anios.indexOf(obj.anio) === -1) anios.push(obj.anio);
                                });
                            }
                            //console.log("esto es lo que me trae constancias", lista_constancias);
                            setListAnios(anios)
                            setShowYear("todos")
                        })
                        .catch((error) => {
                            console.log("error: ", error);
                        })

                }
            }
            else {
                //el usuario no esta loggeado, lo mandamos al login
                console.log("usuario no loggeado en portfolio, lo mandamos al login");
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

    const downFile = (e: any, type: any, anio: any, crowid: any, doc: any, nombre: any) => {

        let type_api = type == "XML" ? "cfdi" : type.toLowerCase()

        fetch(
            apiCall.API_CONFIGURA + "constancias/" + type_api + "?cuenta=" + cuentaRef.current + "&anio=" + anio + "&crowid=" + crowid,
            {
                method: "GET",
                headers: {
                    "canal": canalRef.current,
                    "x-api-key": apiCall.X_API_KEY_CONFIGURA,
                    "cuentasesion": cuentaRef.current,
                    "token": tokenRef.current,
                    "id": idRef.current.toString(),
                }
            }
        )
            .then(response => response.json())
            .then((jsonData) => {
                /*console.log("Dowload file")
                console.log(jsonData)*/

                let link = document.createElement("a")
                link.href = "data:application/" + type + ";base64," + jsonData.response.dsDoc.tdsDoc[0].doc
                link.download = doc + "-" + nombre + "-" + anio + "." + type.toLowerCase()
                link.click()
            });

    }

    const [showYear, setShowYear] = useState({});
    const [data, setData] = useState("Todos");
    var todos = "Todos";
    const newList = listAnios.concat("Todos");
    newList.sort(function (x, y) { return x == todos ? -1 : y == todos ? 1 : 0; });

    //console.log("esto es lo que me trae new list", newList);
    const DropdownDataYear = newList!.map((node, index) => {

        return {
            id: index,
            option: node.toString(),

        };
    });
    const sendDate = (data: string) => {
        setData(data);
        //console.log("esto es lo que me trae data de date", data);
    }
    const sendId = (data: string) => {
        setIDS(data);
        //console.log("esto es lo que me trae data de ID", data);
    }

    let childrenContentPrincipal = (
        <>
            <div className="content w-full">
                <ConsultasHeader selectedTab="Constancias" />
                <div className="controls mb-7">
                    <div className="select flex items-center">
                        <div className="text-sm mr-4">
                            {
                                dataConstancias && dataConstancias.length > 0 && <Dropdown fondosFamilia={false} dropdownData={DropdownDataYear} initialOption={data} sendId={(id) => sendId(id)} sendOption={(data) => sendDate(data)} side={false} />
                            }
                        </div>
                    </div>
                </div>
                {
                    dataConstancias && dataConstancias.length > 0 ?
                        <div>
                            <div className='flex w-full justify-between items-center border-b-2 border-gray-300 pb-3 px-2'>
                                <div className='w-1/12'><p className='text-xs font-bold'>Constancias</p></div>
                                <div className='w-1/12'><p className='text-xs font-bold'>Año</p></div>
                                <div className='w-4/12'><p className='text-xs font-bold'>Nombre</p></div>
                                <div className='w-2/12 flex justify-center'><p className='text-xs font-bold'>Porcentaje</p></div>
                                <div className='w-4/12'><p className='text-xs font-bold'>Archivos</p></div>

                            </div>
                            <div>
                                {
                                    listAnios.length > 0 ?
                                        dataConstancias && dataConstancias.map((node) => {
                                            const { constancia, anio, nombre, porcentaje, tdsConstanciaDetalle } = node
                                            const list_docs = (tdsConstanciaDetalle as []).map((node: any) => {
                                                return (
                                                    <Tooltip title={node.doc + " " + nombre + " " + anio}>
                                                        <a onClick={(e) => downFile(e, node.tipo, node.anio, node.crowid, node.doc, nombre)} key={node.doc + node.anio} className="text-xs text-white rounded-full py-1 px-2 bg-red-600 cursor-pointer">{node.tipo}</a>
                                                    </Tooltip>
                                                )
                                            })
                                            return (
                                                data === "Todos" || anio ?
                                                    <div key={nombre + anio} className='flex w-full justify-between items-center py-3 border-b-2 border-gray-300 px-2'>
                                                        <div className='w-1/12'><p className='text-xs'>{constancia}</p></div>
                                                        <div className='w-1/12'><p className='text-xs'>{anio}</p></div>
                                                        <div className='w-4/12'><p className='text-xs'>{nombre}</p></div>
                                                        <div className='w-2/12 flex justify-center'><p className='text-xs'>{porcentaje}%</p></div>
                                                        <div className='w-4/12 flex justify-between'>
                                                            {list_docs}
                                                        </div>
                                                    </div>
                                                    : ""
                                            )
                                        }) : <div></div>
                                }
                            </div>
                        </div>
                    :
                        <span className="text-gray-500 py-2">No hay datos.</span>
                }
            </div>
        </>
    );

    return (
        <PageLayout 
            childrenContentPrincipal={childrenContentPrincipal}
        />
    );
}
//Post data to the store
/* const mapDispatchToProps = (dispatch: any) => {
    return {
        getFolioDataRequest: () => dispatch(getFolioDataRequest(dispatch)),
        getFolioDataReset: () => dispatch(getFolioDataReset(dispatch))
    };
}; */

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        loginObject: store.loginObjectState, //aqui están los datos del usuario y la info para llamar apis Vector

    };
};

export default connect(mapStateToProps)(ConstanciasFiscales)