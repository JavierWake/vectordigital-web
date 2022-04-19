import React, { useState, useEffect, useRef } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import axios from 'axios';
import "../styles/tableTrading.css";
import "../styles/scrollBar.css";
import CircularProgress from "@material-ui/core/CircularProgress";

//Table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Collapse from "@material-ui/core/Collapse";
import TableSortLabel from "@material-ui/core/TableSortLabel";

//Actions to call redux store
import { getListIssuerRequest, getListIssuerReset } from '../actions/ListIssuerAction';
import { getCatalogoEmisorasRequest } from '../actions/getCatalogoEmisorasAction';
import { catalogoTradingRequest } from "../actions/catalogoTradingAction";
import { getReadyStateReceive } from '../actions/readyStateAction';
import { putListUltimaRequest } from '../actions/listUltimaAction';
import { getIndexListRequest } from '../actions/IndexList';
import { getListRequest, getListReset } from "../actions/listAction";

//Types to use data from store
import { ListState } from "../types/ListTypes";
import { PortfolioStatus } from '../types/PortfolioTypes';
import { ITradingArray, IProfundidadArray} from '../types/CatalogoTradingTypes';
import { ListIssuerState } from '../types/ListIssuer';
import { DeleteIssuerState } from '../types/DeleteIssuerTypes';
import { CatalogoTradingStatus } from '../types/CatalogoTradingTypes';
import type { AppBarData } from "../types/AppBar";
import { Emisora } from '../types/GetCatalogoEmisotasType';
import { LoginObjectResponse, LoginObjectState } from "../types/LoginObjectTypes";
import { ReadyState } from '../types/ReadyStateTypes';
import { ListIndexState } from '../types/IndexList';

//Containers
import DropdownTrading from "../containers/DropdownTrading";
import { Dropdown } from "../containers/Dropdown";
import DropdownList from '../containers/DropdownList';
import Posturas from '../containers/Posturas';
import KebabDropdown  from './KebabDropdown';

//Mocks
import { DropdownDataMarket, DropdownDataMostrar, DropdownDataTradingMostrar } from "../mocks/DropdownData";
import { TickerRic } from '../mocks/TickerRic'

//Icons
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { MdPlaylistAdd, MdAddAlert, MdFiberManualRecord } from "react-icons/md";

import * as apiCall from '../constants';

interface propsFromState {
  portfolio?: PortfolioStatus;
  loginObject?: LoginObjectState;
  listItems: ListState;
  listIssuer: ListIssuerState;
  deleteIssuer: DeleteIssuerState;
  catalogoTrading: CatalogoTradingStatus;
  appBarData: any;
  catalogoEmisorasRespuesta: any;
  readyStateWs: ReadyState;
  indexItems: ListIndexState;
}

const pingResponse = {
  "Type": "Pong"
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type AllProps = propsFromState;


const TradingMonitor: React.FC<AllProps> = ({ portfolio, listItems, listIssuer, deleteIssuer, catalogoTrading, appBarData, catalogoEmisorasRespuesta, loginObject, readyStateWs, indexItems }) => {
  const [checkRic, setCheckRic] = useState(false);
  const [redirectRic, setRedirectRic] = useState("");
  const [rows, setRows] = useState<ITradingArray[] | any>([]);
  const [posRows, setPosRows] = useState<IProfundidadArray[] | any>([]);
  const [rowsOpen, setRowsOpen] = useState<any>({});
  const [kebabOpen, setKebabOpen] = useState<any>({});
  const [dropdownOpen, setDropdownOpen] = useState<any>({});
  const [issuerID, setIssuerID] = useState([]);
  const classes = useStyles();
  const [bolsa, setBolsa] = useState("BMV");
  const [orderBy, setOrderBy] = useState("emisora"); //Initial state is columns are sorted by emisora
  const [order, setOrder] = useState("asc"); //Initial State is ascending
  //const [rowsPerPage, setRowsPerPage] = useState(50);
  //const [page, setPage] = useState(0);
  const [runsocket, setRunSocket] = useState(false);
  const [id, setID] = useState(2);
  const [profundidad, setProfundidad] = useState("5");
  const [lista, setLista] = useState("");
  const [listaID, setListaID] = useState("");
  const [listVector, setListVector] = useState(true);
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(false);
  const wsRef = useRef<WebSocket>();
  const [timer, setTimer] = useState(false);
  const [token, setToken] = useState("");
  const [profundidadActivo, setProfundidadActivo] = useState(false);
  const [tiempoRealActivo, setTiempoRealActivo]  = useState(false);

  let arrayTrading: any;
  let arrayTradingProf: any;
  let arrayTradingOpen: any = [];
  let arrayKebabOpen: any = [];
  let arrayDropdownOpen: any = [];
  let arrayID: any = [];
  var name:string = "";
  let varTrading: any;
  let varTradingProf: any;
  const ParentReference = useRef(false);
  const cuentaRef = useRef("");
  const idRef = useRef("");
  const time = useRef(false);
  const [refReady, setRefReady] = useState(false);
  var dateObj:any = new Date().toString().split(" ");;
  let sw: any;
  let alg:boolean = false;
  let cuentaLO: string = "";
  let contador:number = 0;
  const dispatch = useDispatch();
  let fieldsRefinitiv: string[] = [];
  
  useEffect(() => {
    if(loginObject?.response.ierror === -1){
        if(loginObject?.response.dsLogin.tdsLogin.length > 0){

            const cuentaSesionLO = loginObject?.response.dsLogin.tdsLogin[0].cuentasesion;
    
            if(cuentaSesionLO != 0){
                // mandamos llamar las apis sacando los datos del objeto de login
        
                const idLO:any = loginObject?.response.dsLogin.tdsLogin[0].id;
                const tokenLO = loginObject?.response.dsLogin.tdsLogin[0].token;
                const canal = "999";
                cuentaLO = loginObject?.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                cuentaRef.current = cuentaLO;
                idRef.current = idLO; 
            
                dispatch(getIndexListRequest({ message: "indices" }))
                setRefReady(false);
                if(wsRef.current !== undefined) {
                  wsRef.current.close();
                }
                if(listItems.loading) {
                  dispatch(getListReset({ hacerResetAInitialState: true }))
                  dispatch(getListIssuerReset({ hacerResetAInitialState: true }))
                }

                //revisamos servicios/permisos del usuario
                if(loginObject.response.dsLogin.tdsServicios.length > 0){
                  setTiempoRealActivo(loginObject.response.dsLogin.tdsServicios[0].TiempoReal);
                  setProfundidadActivo(loginObject.response.dsLogin.tdsServicios[0].Profundidad);
              }
            }
        }
    }
  },[]);

  useEffect(() => {
    if(!listItems.loading) {
      let ultima = listItems.list.sort((a:any,b:any) => b.ultima - a.ultima);
      setLista(ultima[0].list_name);
      setListaID(ultima[0].list_id);
      setListVector(ultima[0].vector)
    }
  },[listItems.list.length]);

  useEffect(() => {
    if(!listItems.loading && !refReady && lista !== "") {
      if(wsRef.current) {
        wsRef.current.close();
      }
      if(lista !== "Mis Posiciones") {
        dispatch(getListIssuerRequest({ message: "lista/"+cuentaRef.current+"/"+listaID+"?vector="+listVector, id: idRef.current }));
      }
      setRefReady(true);
      ParentReference.current = true;
      tokenCall();
    }
  },[listItems.list.length, lista]);

  useEffect(() => {
    if(catalogoTrading.posicionTradingMX.length === 0 && lista === "Mis Posiciones" && catalogoTrading.tradingArray[0].ISSUER === "" && refReady) {
      dispatch(getReadyStateReceive({readyStateWs: -1}));
      setLoading(false);
    }
  },[catalogoTrading.tradingArray, lista, refReady])

  const subscribeMsgTR = {
    "ID": 1,
    "Domain": "Login",
    "Key": {
        "NameType": apiCall.WS_NAMETYPE,
        "Name": apiCall.WS_NAME,
        "Elements": {
          "AuthenticationToken": token,
          "ApplicationId": apiCall.WS_APPLICATION_ID,
          "Position": apiCall.WS_POSITION
        }
    }
  };

  const subscribeMsgDelay = {
    "ID": 1,
    "Domain": "Login",
    "Key": {
        "NameType": apiCall.WS_NAMETYPE,
        "Name": apiCall.WS_NAME_DELAY,
        "Elements": {
          "AuthenticationToken": token,
          "ApplicationId": apiCall.WS_APPLICATION_ID_DELAY,
          "Position": apiCall.WS_POSITION
        }
    }
  };
  
  const tokenCall = () => {
    axios.get(apiCall.NEWS_API+"token", { headers: { 'x-api-key': apiCall.X_API_KEY_NEWS } })
      .then(res => {
        setToken(res.data.token);
      })
  }

  const refinitivFields = () => {
    let data:string = "";
    if((dateObj[4] > "14:59:59") && (dateObj[4] < "8:29:59")) {
      data = "CF_CLOSE";
    } else {
      data = "TRDPRC_1";
    }

    if(profundidadActivo) {
      fieldsRefinitiv = 
      [
        "BID",
        "ASK",
        "BIDSIZE",
        "ASKSIZE",
        data,
        "ADJUST_CLS",
        "HIGH_1",
        "LOW_1",
        "NETCHNG_1",
        "PCTCHNG",
        "TRDVOL_1",
        "ASK_TIM_NS",
        "BID_TIM_NS",
        "NUM_MOVES",
        "BEST_BID1",
        "BEST_BID2",
        "BEST_BID3",
        "BEST_BID4",
        "BEST_BID5",
        "BEST_BID6",
        "BEST_BID7",
        "BEST_BID8",
        "BEST_BID9",
        "BEST_BID10",
        "BEST_BSIZ1",
        "BEST_BSIZ2",
        "BEST_BSIZ3",
        "BEST_BSIZ4",
        "BEST_BSIZ5",
        "BEST_BSIZ6",
        "BEST_BSIZ7",
        "BEST_BSIZ8",
        "BEST_BSIZ9",
        "BEST_BSZ10",
        "BEST_ASK1",
        "BEST_ASK2",
        "BEST_ASK3",
        "BEST_ASK4",
        "BEST_ASK5",
        "BEST_ASK6",
        "BEST_ASK7",
        "BEST_ASK8",
        "BEST_ASK9",
        "BEST_ASK10",
        "BEST_ASIZ1",
        "BEST_ASIZ2",
        "BEST_ASIZ3",
        "BEST_ASIZ4",
        "BEST_ASIZ5",
        "BEST_ASIZ6",
        "BEST_ASIZ7",
        "BEST_ASIZ8",
        "BEST_ASIZ9",
        "BEST_ASZ10",
      ];
    } else {
      fieldsRefinitiv = 
      [
        "BID",
        "ASK",
        "BIDSIZE",
        "ASKSIZE",
        data,
        "ADJUST_CLS",
        "HIGH_1",
        "LOW_1",
        "NETCHNG_1",
        "PCTCHNG",
        "TRDVOL_1",
        "ASK_TIM_NS",
        "BID_TIM_NS",
        "NUM_MOVES",
      ];
    }
    return fieldsRefinitiv;
  }

  const arrayRefinitivSet = (bolsaValue:boolean) => {
    setLoading(true);
    if(refReady && deleteIssuer.loading === false) {
      if(bolsaValue) {
        const unsubscribe = {
            "ID": issuerID,
            "Type": "Close"
        }
        if(wsRef.current?.readyState === 1) {
          wsRef.current?.send(JSON.stringify(unsubscribe));
        }
        //setPage(0);
        //setRowsPerPage(50);
      }
      if(lista === "Mis Posiciones") {
        arrayTrading = catalogoTrading.tradingArray;
        arrayTradingProf = catalogoTrading.profundidadArray;
        setRows(arrayTrading);
        setPosRows(arrayTradingProf);
        const subscribeMsg5 = {
          "ID": id,
          "Domain": "MarketPrice",
            "Key": {
                "Name":
                  refinitivViewSet().sort()
              
            },
            "View": 
              refinitivFields()
        };
        if(wsRef.current?.readyState === 1) {
          wsRef.current?.send(JSON.stringify(subscribeMsg5));
        }
      } else {
        arrayTrading = listIssuer.tradingArray.sort(function(a, b) {
                          var nameA = a.ISSUER.toUpperCase(); // ignore upper and lowercase
                          var nameB = b.ISSUER.toUpperCase(); // ignore upper and lowercase
                          if (nameA < nameB) {
                              return -1;
                          }
                          if (nameA > nameB) {
                              return 1;
                          }
                          
                          // names must be equal
                          return 0;
                      });
        arrayTradingProf = listIssuer.profundidadArray.sort(function(a, b) {
                              var nameA = a.ISSUER.toUpperCase(); // ignore upper and lowercase
                              var nameB = b.ISSUER.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                  return -1;
                              }
                              if (nameA > nameB) {
                                  return 1;
                              }
                              
                              // names must be equal
                              return 0;
                          });
        setRows(arrayTrading);
        setPosRows(arrayTradingProf);
        const subscribeMsg6 = {
          "ID": id,
          "Domain": "MarketPrice",
            "Key": {
                "Name":
                  refinitivViewSet().sort()
              
            },
            "View":
              refinitivFields()
        };
        if(wsRef.current?.readyState === 1) {
          wsRef.current?.send(JSON.stringify(subscribeMsg6));
        }
      }
      if(bolsaValue) {
        setRunSocket(!runsocket);
      }
      if(refinitivViewSet().length === 0) {
        setLoading(false);
      }
    }
    // setLoading(false);
  }

  const refinitivViewSet = () => {
    let arrayMessage: any = [];
    if(lista === "Mis Posiciones") {
      if(bolsa === "BMV") {
        arrayMessage = catalogoTrading.posicionTradingMX;
      } else if(bolsa === "BIVA") {
        arrayMessage = catalogoTrading.posicionTradingBIV;
      } else if(bolsa === "SOR") {
        arrayMessage = catalogoTrading.posicionTradingMCO;
      }
    } else {
      if(bolsa === "BMV") {
        arrayMessage = listIssuer.listIssuer.bmv.concat(listIssuer.listIssuer.bmvP);
      } else if(bolsa === "BIVA") {
        arrayMessage = listIssuer.listIssuer.biva.concat(listIssuer.listIssuer.bivaP);
      } else if(bolsa === "SOR") {
        arrayMessage = listIssuer.listIssuer.consolidado.concat(listIssuer.listIssuer.consolidadoP);
      }
    }
    return arrayMessage;
  }
  
  useEffect(() => {
    if(catalogoEmisorasRespuesta != undefined){
      if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
        if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length === 0){
          //el catalogo de emisoras no ha sido consultado
          //llamar dispatch para el catalogo de emisoras
          let message = "catalogo/emisora/catalogo";
          dispatch(getCatalogoEmisorasRequest({message}));
        }
      }
    }
  }, []);

  useEffect(() => {
    
    arrayRefinitivSet(true);
  },[bolsa]);

  useEffect(() => {
    if(refReady) {
     dispatch(putListUltimaRequest({ message: "lista/ultima/"+cuentaRef.current+"/"+listaID, id: idRef.current }))
      const unsubscribe = {
        "ID": issuerID,
        "Type": "Close"
      }
      if(wsRef.current?.readyState === 1) {
        wsRef.current?.send(JSON.stringify(unsubscribe));
      }
      setLoading(true);
      if(lista !== "Mis Posiciones") {
        dispatch(getListIssuerRequest({ message: "lista/"+cuentaRef.current+"/"+listaID+"?vector="+listVector, id: idRef.current }));
        //setPage(0);
        //setRowsPerPage(50);
      } else if(lista === "Mis Posiciones" && listaID !== null) {
        arrayRefinitivSet(true);
      }
    }
  },[listaID, deleteIssuer.loading === false]);

  

  useEffect(() => {
    if(refReady) {
      arrayRefinitivSet(false);
    }
  },[listIssuer.listIssuer.biva]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(!timer); 
      alg = !alg; 
      time.current = !time.current;
    
      
      if(rows && !loading){
        let _currentTime = new Date().getTime();
        rows.map((row:any, index:any) => {
          if (row.costumStyle && row.lastchange) {
            var secondBetweenTwoDate = Math.abs(( _currentTime - row.lastchange.getTime()) / 1000);                
            if(secondBetweenTwoDate>=1.5){                  

              if(row.PCTCHNG  >= 0 ){
                row.costumStyle = "positivo_cold";
                row.costumStyle_ADJUST_CLS   = row.costumStyle;
                row.costumStyle_TRDPRC_1   = row.costumStyle;
                row.costumStyle_PCTCHNG    = row.costumStyle;
                row.costumStyle_NETCHNG_1  = row.costumStyle;
                row.costumStyle_HIGH_1     = row.costumStyle;
                row.costumStyle_LOW_1      = row.costumStyle;
                row.costumStyle_TRDVOL_1   = row.costumStyle;
                row.costumStyle_NUM_MOVES  = row.costumStyle;
                row.costumStyle_BID_TIM_NS = row.costumStyle;
                row.costumStyle_BID        = row.costumStyle;
                row.costumStyle_BIDSIZE    = row.costumStyle;
                row.costumStyle_ASK_TIM_NS = row.costumStyle;
                row.costumStyle_ASK        = row.costumStyle;
                row.costumStyle_ASKSIZE    = row.costumStyle;
              }else{
                row.costumStyle = "negativo_cold";
                row.costumStyle_ADJUST_CLS   = row.costumStyle;
                row.costumStyle_TRDPRC_1   = row.costumStyle;
                row.costumStyle_PCTCHNG    = row.costumStyle;
                row.costumStyle_NETCHNG_1  = row.costumStyle;
                row.costumStyle_HIGH_1     = row.costumStyle;
                row.costumStyle_LOW_1      = row.costumStyle;
                row.costumStyle_TRDVOL_1   = row.costumStyle;
                row.costumStyle_NUM_MOVES  = row.costumStyle;
                row.costumStyle_BID_TIM_NS = row.costumStyle;
                row.costumStyle_BID        = row.costumStyle;
                row.costumStyle_BIDSIZE    = row.costumStyle;
                row.costumStyle_ASK_TIM_NS = row.costumStyle;
                row.costumStyle_ASK        = row.costumStyle;
                row.costumStyle_ASKSIZE    = row.costumStyle;
              }
            }                
          }
        }); 
      }       
    
    
    }, 1000);
    return () => clearInterval(timerId);
  }, [timer]);

  useEffect(() => {
    if(closed) {
      tokenCall();
    }
    const tokenId = setInterval(() => { tokenCall() }, 3600000);
    return () => clearInterval(tokenId);
  },[ token]);

  useEffect(() => {
    if(refReady && lista !== "" && !listItems.loading && !listIssuer.loading ) {
      if(lista === "Mis Posiciones" && portfolio?.emisorasRefinitiv !== "" && catalogoTrading.tradingArray[0].ISSUER !== "") {
        if(ParentReference.current && !wsRef.current) {
          arrayTrading = catalogoTrading.tradingArray;
          arrayTradingProf = catalogoTrading.profundidadArray;
          setRows(arrayTrading);
          setPosRows(arrayTradingProf);
          if(wsRef.current === undefined) {
            wsRef.current = new WebSocket(apiCall.WS_URL, "tr_json2");
          }
          setLoading(true);
        }
      } else if(lista !== "Mis Posiciones" && lista !== "" && !wsRef.current) {
        if(listIssuer.tradingArray.length !== 0) {
          if(ParentReference.current && listIssuer.tradingArray[0].ISSUER !== "") {
            arrayTrading = listIssuer.tradingArray.sort(function(a, b) {
                              var nameA = a.ISSUER.toUpperCase(); // ignore upper and lowercase
                              var nameB = b.ISSUER.toUpperCase(); // ignore upper and lowercase
                              if (nameA < nameB) {
                                  return -1;
                              }
                              if (nameA > nameB) {
                                  return 1;
                              }
                              
                              // names must be equal
                              return 0;
                          });
            arrayTradingProf = listIssuer.profundidadArray.sort(function(a, b) {
                                  var nameA = a.ISSUER.toUpperCase(); // ignore upper and lowercase
                                  var nameB = b.ISSUER.toUpperCase(); // ignore upper and lowercase
                                  if (nameA < nameB) {
                                      return -1;
                                  }
                                  if (nameA > nameB) {
                                      return 1;
                                  }
                                  
                                  // names must be equal
                                  return 0;
                              });
                
            setRows(arrayTrading);
            setPosRows(arrayTradingProf);
          }
        }
        if(wsRef.current === undefined) {
          wsRef.current = new WebSocket(apiCall.WS_URL, "tr_json2");
        }
        setLoading(true);
      }

      if(wsRef.current) {
        if(closed && token.length > 0) {
          wsRef.current = new WebSocket(apiCall.WS_URL, "tr_json2");
          setClosed(false);
          if(wsRef.current?.readyState !== undefined) {
            dispatch(getReadyStateReceive({readyStateWs:wsRef.current?.readyState}));
          }
        }
        
        wsRef.current.onopen = function() {
          let value = {}
          if(wsRef.current?.readyState !== undefined) {
            dispatch(getReadyStateReceive({readyStateWs:wsRef.current?.readyState}));
          }
          if(wsRef.current?.readyState !== 0) {
            if(tiempoRealActivo  && token.length > 0) {
              wsRef.current?.send(JSON.stringify(subscribeMsgTR));
            } else {
              wsRef.current?.send(JSON.stringify(subscribeMsgTR));
            }
          }
          
        };

        wsRef.current.onmessage = (msg:any) => {
          let msgdata = JSON.parse(msg.data);
          if(msgdata[0].Type === "Ping") {
            wsRef.current?.send(JSON.stringify(pingResponse));
          } else if(msgdata[0].Domain === "Login") {
            if(refinitivViewSet().length == 0) {
              setLoading(false);
            }
            const subscribeMsg2 = {
              "ID": id,
              "Domain": "MarketPrice",
                "Key": {
                    "Name":
                      refinitivViewSet().sort()
                  
                },
                "View": 
                  refinitivFields()
            };
            wsRef.current?.send(JSON.stringify(subscribeMsg2));

          } else if(msgdata.find((campo:any) => campo.Type === "Refresh"  )) {
            if(!arrayTrading) {
              arrayTrading = rows;
            }
            msgdata.map((data:any, index:any) => {
              if(data != null && data.Type != "Status" ) {
                name = data.Key.Name.split(".");
                if( name[1] === "MX" || name[1] === "BIV" || name[1] === "MCO" ) {
                  varTrading = arrayTrading.find((x:any) => x.ISSUER === name[0]);
                  let indexIssuerD = arrayTrading.findIndex((i:any) => i.ISSUER === name[0]);
                  varTrading = Object.assign({}, varTrading, data.Fields);
                  if (data.Fields.hasOwnProperty('BID_TIM_NS')) {
                    varTrading["BID_TIM_NS"] = new Date(dateObj[1]+" "+dateObj[2]+", "+dateObj[3]+" "+data.Fields.BID_TIM_NS+" GMT").toLocaleTimeString('es-MX');
                  }
                  if (data.Fields.hasOwnProperty('ASK_TIM_NS')) {
                    varTrading["ASK_TIM_NS"] = new Date(dateObj[1]+" "+dateObj[2]+", "+dateObj[3]+" "+data.Fields.ASK_TIM_NS+" GMT").toLocaleTimeString('es-MX');
                  }

                  if((dateObj[4] > "14:59:59") && (dateObj[4] < "8:29:59")) {
                    varTrading["TRDPRC_1"] = data.Fields.CF_CLOSE;
                  }

                  arrayTrading[indexIssuerD] = varTrading;
                  arrayTradingOpen[varTrading["ISSUER"]] = false;
                  arrayDropdownOpen[varTrading["ISSUER"]] = false;
                  arrayKebabOpen[varTrading["ISSUER"]] = false;
                  Object.keys(data.Fields).map(function(mkey, index) {
                    //console.log("costumStyle_" + mkey);
                    varTrading["costumStyle_" + mkey] = "cero_hot";
                  }); 

                  contador = contador + 1;
                  setRows(arrayTrading);
                  setRowsOpen(arrayTradingOpen);
                  setKebabOpen(arrayKebabOpen);
                  setDropdownOpen(arrayDropdownOpen);
                  if((Math.trunc(arrayTrading.length*0.50)) === (contador) || (arrayTrading.length <= 4 && arrayTrading.length > 0)) {
                    contador = 0;
                    setLoading(false);
                    if(wsRef.current?.readyState !== undefined) {
                      dispatch(getReadyStateReceive({readyStateWs:wsRef.current?.readyState}));
                    }
                  }
                } else if (name[1] === "MXO" || name[1] === "BIVd" || name[1] === "MCOd") {
                  if(!arrayTradingProf) {
                    arrayTradingProf = posRows;
                  }
                  varTradingProf = arrayTradingProf.find((x:any) => x.ISSUER === name[0]);
                  let indexIssuerD = arrayTradingProf.findIndex((i:any) => i.ISSUER === name[0]);
                  varTradingProf = Object.assign({}, varTradingProf, data.Fields);
                  if(varTradingProf["BEST_ASIZ1"] === null) {
                    varTradingProf["BEST_ASIZ1"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ2"] === null) {
                    varTradingProf["BEST_ASIZ2"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ3"] === null) {
                    varTradingProf["BEST_ASIZ3"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ4"] === null) {
                    varTradingProf["BEST_ASIZ4"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ5"] === null) {
                    varTradingProf["BEST_ASIZ5"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ6"] === null) {
                    varTradingProf["BEST_ASIZ6"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ7"] === null) {
                    varTradingProf["BEST_ASIZ7"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ8"] === null) {
                    varTradingProf["BEST_ASIZ8"] = 0;
                  }
                  if(varTradingProf["BEST_ASIZ9"] === null) {
                    varTradingProf["BEST_ASIZ9"] = 0;
                  }
                  if(varTradingProf["BEST_ASZ10"] === null) {
                    varTradingProf["BEST_ASZ10"] = 0;
                  }

                  if(varTradingProf["BEST_BSIZ1"] === null) {
                    varTradingProf["BEST_BSIZ1"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ2"] === null) {
                    varTradingProf["BEST_BSIZ2"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ3"] === null) {
                    varTradingProf["BEST_BSIZ3"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ4"] === null) {
                    varTradingProf["BEST_BSIZ4"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ5"] === null) {
                    varTradingProf["BEST_BSIZ5"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ6"] === null) {
                    varTradingProf["BEST_BSIZ6"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ7"] === null) {
                    varTradingProf["BEST_BSIZ7"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ8"] === null) {
                    varTradingProf["BEST_BSIZ8"] = 0;
                  }
                  if(varTradingProf["BEST_BSIZ9"] === null) {
                    varTradingProf["BEST_BSIZ9"] = 0;
                  }
                  if(varTradingProf["BEST_BSZ10"] === null) {
                    varTradingProf["BEST_BSZ10"] = 0;
                  }

                  if(varTradingProf["BEST_ASK1"] === null) {
                    varTradingProf["BEST_ASK1"] = 0;
                  }
                  if(varTradingProf["BEST_ASK2"] === null) {
                    varTradingProf["BEST_ASK2"] = 0;
                  }
                  if(varTradingProf["BEST_ASK3"] === null) {
                    varTradingProf["BEST_ASK3"] = 0;
                  }
                  if(varTradingProf["BEST_ASK4"] === null) {
                    varTradingProf["BEST_ASK4"] = 0;
                  }
                  if(varTradingProf["BEST_ASK5"] === null) {
                    varTradingProf["BEST_ASK5"] = 0;
                  }
                  if(varTradingProf["BEST_ASK6"] === null) {
                    varTradingProf["BEST_ASK6"] = 0;
                  }
                  if(varTradingProf["BEST_ASK7"] === null) {
                    varTradingProf["BEST_ASK7"] = 0;
                  }
                  if(varTradingProf["BEST_ASK8"] === null) {
                    varTradingProf["BEST_ASK8"] = 0;
                  }
                  if(varTradingProf["BEST_ASK9"] === null) {
                    varTradingProf["BEST_ASK9"] = 0;
                  }
                  if(varTradingProf["BEST_ASK10"] === null) {
                    varTradingProf["BEST_ASK10"] = 0;
                  }

                  if(varTradingProf["BEST_BID1"] === null) {
                    varTradingProf["BEST_BID1"] = 0;
                  }
                  if(varTradingProf["BEST_BID2"] === null) {
                    varTradingProf["BEST_BID2"] = 0;
                  }
                  if(varTradingProf["BEST_BID3"] === null) {
                    varTradingProf["BEST_BID3"] = 0;
                  }
                  if(varTradingProf["BEST_BID4"] === null) {
                    varTradingProf["BEST_BID4"] = 0;
                  }
                  if(varTradingProf["BEST_BID5"] === null) {
                    varTradingProf["BEST_BID5"] = 0;
                  }
                  if(varTradingProf["BEST_BID6"] === null) {
                    varTradingProf["BEST_BID6"] = 0;
                  }
                  if(varTradingProf["BEST_BID7"] === null) {
                    varTradingProf["BEST_BID7"] = 0;
                  }
                  if(varTradingProf["BEST_BID8"] === null) {
                    varTradingProf["BEST_BID8"] = 0;
                  }
                  if(varTradingProf["BEST_BID9"] === null) {
                    varTradingProf["BEST_BID9"] = 0;
                  }
                  if(varTradingProf["BEST_BID10"] === null) {
                    varTradingProf["BEST_BID10"] = 0;
                  }
                  arrayTradingProf[indexIssuerD] = varTradingProf;
                  setPosRows([...arrayTradingProf]);
                }
                arrayID.push(data.ID);
              }
            })
            setIssuerID(arrayID);
          } else if(msgdata.find((campo:any) => campo.Type === "Update"  )) {
            if(arrayTrading === undefined) {
              arrayTrading = rows;
            }
            if(arrayTradingProf === undefined) {
              arrayTradingProf = posRows;
            }
            if(time.current && arrayTrading !== undefined) {
              msgdata.map((data:any, index:any) => {
                if(data.Type != "Ping" && data.Type != "Status") {
                  name =  data.Key.Name.split(".");
                  if(name[1] === "MX" || name[1] === "BIV" || name[1] === "MCO") {
                    varTrading = arrayTrading.find((x:any) => x.ISSUER === name[0]);
                    let indexIssuerD = arrayTrading.findIndex((i:any) => i.ISSUER === name[0]);
                    if(data.Fields.PCTCHNG >= 0 ){
                      if(varTrading !== undefined) {
                        varTrading.costumStyle = "positivo_hot";

                        /*Este Array contiene solo los campos que cambiaron*/
                        Object.keys(data.Fields).map(function(mkey, index) {
                          //console.log("costumStyle_" + mkey);
                          varTrading["costumStyle_" + mkey] = "positivo_hot";
                        });        
                      }
                    } else {
                      if(varTrading !== undefined) {
                        varTrading.costumStyle = "negativo_hot";

                        /*Este Array contiene solo los campos que cambiaron*/
                        Object.keys(data.Fields).map(function(mkey, index) {
                          //console.log("costumStyle_" + mkey);
                          varTrading["costumStyle_" + mkey] = "negativo_hot";
                        });
                      }

                    }

                    varTrading = Object.assign({}, varTrading, data.Fields);
                    varTrading.lastchange = new Date();

                    if (data.Fields.hasOwnProperty('BID_TIM_NS')) {
                      varTrading["BID_TIM_NS"] = new Date(dateObj[1]+" "+dateObj[2]+", "+dateObj[3]+" "+data.Fields.BID_TIM_NS+" GMT").toLocaleTimeString('es-MX');
                    } 
                    if (data.Fields.hasOwnProperty('ASK_TIM_NS')) {
                      varTrading["ASK_TIM_NS"] = new Date(dateObj[1]+" "+dateObj[2]+", "+dateObj[3]+" "+data.Fields.ASK_TIM_NS+" GMT").toLocaleTimeString('es-MX');
                    }
                    arrayTrading[indexIssuerD] = varTrading;
                    setRows([...arrayTrading]);
                  } else if(name[1] === "MXO" || name[1] === "BIVd" || name[1] === "MCOd") {
                    if(rowsOpen.length === 0 && profundidadActivo) {
                      if( rowsOpen[name[0]] ) {
                        varTradingProf = arrayTradingProf.find((x:any) => x.ISSUER === name[0]);
                        let indexIssuerD = arrayTradingProf.findIndex((i:any) => i.ISSUER === name[0]);
                        varTradingProf = Object.assign({}, varTradingProf, data.Fields);
                        arrayTradingProf[indexIssuerD] = varTradingProf;
                        if(varTradingProf["BEST_ASIZ1"] === null) {
                          varTradingProf["BEST_ASIZ1"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ2"] === null) {
                          varTradingProf["BEST_ASIZ2"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ3"] === null) {
                          varTradingProf["BEST_ASIZ3"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ4"] === null) {
                          varTradingProf["BEST_ASIZ4"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ5"] === null) {
                          varTradingProf["BEST_ASIZ5"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ6"] === null) {
                          varTradingProf["BEST_ASIZ6"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ7"] === null) {
                          varTradingProf["BEST_ASIZ7"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ8"] === null) {
                          varTradingProf["BEST_ASIZ8"] = 0;
                        }
                        if(varTradingProf["BEST_ASIZ9"] === null) {
                          varTradingProf["BEST_ASIZ9"] = 0;
                        }
                        if(varTradingProf["BEST_ASZ10"] === null) {
                          varTradingProf["BEST_ASZ10"] = 0;
                        }
      
                        if(varTradingProf["BEST_BSIZ1"] === null) {
                          varTradingProf["BEST_BSIZ1"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ2"] === null) {
                          varTradingProf["BEST_BSIZ2"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ3"] === null) {
                          varTradingProf["BEST_BSIZ3"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ4"] === null) {
                          varTradingProf["BEST_BSIZ4"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ5"] === null) {
                          varTradingProf["BEST_BSIZ5"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ6"] === null) {
                          varTradingProf["BEST_BSIZ6"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ7"] === null) {
                          varTradingProf["BEST_BSIZ7"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ8"] === null) {
                          varTradingProf["BEST_BSIZ8"] = 0;
                        }
                        if(varTradingProf["BEST_BSIZ9"] === null) {
                          varTradingProf["BEST_BSIZ9"] = 0;
                        }
                        if(varTradingProf["BEST_BSZ10"] === null) {
                          varTradingProf["BEST_BSZ10"] = 0;
                        }
      
                        if(varTradingProf["BEST_ASK1"] === null) {
                          varTradingProf["BEST_ASK1"] = 0;
                        }
                        if(varTradingProf["BEST_ASK2"] === null) {
                          varTradingProf["BEST_ASK2"] = 0;
                        }
                        if(varTradingProf["BEST_ASK3"] === null) {
                          varTradingProf["BEST_ASK3"] = 0;
                        }
                        if(varTradingProf["BEST_ASK4"] === null) {
                          varTradingProf["BEST_ASK4"] = 0;
                        }
                        if(varTradingProf["BEST_ASK5"] === null) {
                          varTradingProf["BEST_ASK5"] = 0;
                        }
                        if(varTradingProf["BEST_ASK6"] === null) {
                          varTradingProf["BEST_ASK6"] = 0;
                        }
                        if(varTradingProf["BEST_ASK7"] === null) {
                          varTradingProf["BEST_ASK7"] = 0;
                        }
                        if(varTradingProf["BEST_ASK8"] === null) {
                          varTradingProf["BEST_ASK8"] = 0;
                        }
                        if(varTradingProf["BEST_ASK9"] === null) {
                          varTradingProf["BEST_ASK9"] = 0;
                        }
                        if(varTradingProf["BEST_ASK10"] === null) {
                          varTradingProf["BEST_ASK10"] = 0;
                        }
      
                        if(varTradingProf["BEST_BID1"] === null) {
                          varTradingProf["BEST_BID1"] = 0;
                        }
                        if(varTradingProf["BEST_BID2"] === null) {
                          varTradingProf["BEST_BID2"] = 0;
                        }
                        if(varTradingProf["BEST_BID3"] === null) {
                          varTradingProf["BEST_BID3"] = 0;
                        }
                        if(varTradingProf["BEST_BID4"] === null) {
                          varTradingProf["BEST_BID4"] = 0;
                        }
                        if(varTradingProf["BEST_BID5"] === null) {
                          varTradingProf["BEST_BID5"] = 0;
                        }
                        if(varTradingProf["BEST_BID6"] === null) {
                          varTradingProf["BEST_BID6"] = 0;
                        }
                        if(varTradingProf["BEST_BID7"] === null) {
                          varTradingProf["BEST_BID7"] = 0;
                        }
                        if(varTradingProf["BEST_BID8"] === null) {
                          varTradingProf["BEST_BID8"] = 0;
                        }
                        if(varTradingProf["BEST_BID9"] === null) {
                          varTradingProf["BEST_BID9"] = 0;
                        }
                        if(varTradingProf["BEST_BID10"] === null) {
                          varTradingProf["BEST_BID10"] = 0;
                        }
                        arrayTradingProf[indexIssuerD] = varTradingProf;
                        setPosRows([...arrayTradingProf]);
                      }
                    }
                  }
                }
              });
            }
          }
        }
        
        wsRef.current.onclose = () => {
          tokenCall();
          setClosed(true);            
        }
        //}
      }

    }
    

    const disableSocket = () => {
      sw.close();
    };

  },[portfolio?.emisorasRefinitiv, listItems.loading,  catalogoTrading.tradingArray, catalogoTrading.posicionTradingMX, catalogoTrading.posicionTradingMCO, catalogoTrading.posicionTradingBIV, listIssuer.listIssuer.biva, runsocket, closed, refReady, token.length, lista]);

  const sendBolsa = (data: string) => {
    setBolsa(data);
  };

  const sendLista = (data: string, id:any, isVector:boolean) => {
    // console.log("entre send")
    setLista(data);
    setListaID(id);
    setListVector(isVector);
  };

  const sendDelete = (data: boolean) => {
    //
  };


  const sendProfundidad = (data: string) => {
    setProfundidad(data);
  };

  function ascCompare(a: any, b: any) {
    if (a[orderBy] > b[orderBy]) return 1;
    if (a[orderBy] < b[orderBy]) return -1;
    return 0;
  }

  function desCompare(a: any, b: any) {
    if (a[orderBy] > b[orderBy]) return -1;
    if (a[orderBy] < b[orderBy]) return 1;
    return 0;
  }

  const handleSort = (tableHeader: any) => {
    
    if (orderBy !== tableHeader) setOrderBy(tableHeader);
    else setOrder(order === "asc" ? "desc" : "asc");

  };

  const checkUser = (id:string) => {
    rowsOpen[id] = !rowsOpen[id];
    arrayTrading = rows;
    arrayTradingProf = posRows;
    setRows(arrayTrading);
    setPosRows(arrayTradingProf);
    setRunSocket(!runsocket);
  }

  const checkKebab = (id:string) => {
    kebabOpen[id] = !kebabOpen[id];
    arrayTrading = rows;
    arrayTradingProf = posRows;
    setRows(arrayTrading);
    setPosRows(arrayTradingProf);
    setRunSocket(!runsocket);
  }

  const clickList = (id:string) => {
    dropdownOpen[id] = !dropdownOpen[id];
    arrayTrading = rows;
    arrayTradingProf = posRows;
    setRows(arrayTrading);
    setPosRows(arrayTradingProf);
    setRunSocket(!runsocket);
  }

  const changeProfile = ( ticker : string) => {
    if(catalogoEmisorasRespuesta != undefined){
      if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta != undefined){
          if(catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.length > 0 && catalogoEmisorasRespuesta.loading === false && catalogoEmisorasRespuesta.message.length > 0){              
              let emisoraSeleccionadaRICArray: Emisora[] = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(function(item: Emisora){
                return item.RIC.trim() == (ticker + ".MX");
              });

              if (emisoraSeleccionadaRICArray.length > 0) {
                //se encontro la emisora
                let emisora = emisoraSeleccionadaRICArray[0].Emisora.trim();
                let serie = emisoraSeleccionadaRICArray[0].Serie.trim();
                setRedirectRic(emisora + "." + serie);
                setCheckRic(true);
              }
          }
      }
    }
  }

  

  if(checkRic){
    return <Redirect push to={'/emisora/' + redirectRic } />
  }

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <p className="text-md">Listas</p>
          <div className="mx-2">
            { lista !== "" ? 
                <DropdownList
                  dropdownData={listItems.list}
                  initialOption= {lista}
                  side={false}
                  sendOption={(list:any, id:any, isVector:boolean) => sendLista(list,id,isVector)}
                  //sendId={(list:any) => sendLista(list)}
                /> : ""
            }
          </div>
          <p className="px-6">Bolsa</p>
          <Dropdown
            dropdownData={DropdownDataMarket}
            initialOption={bolsa}
            side={false}
            sendOption={(bolsa:any) => {sendBolsa(bolsa); setLoading(true) }}
            fondosFamilia={false}
            readyState={readyStateWs.readyStateWs}
          />
        </div>
        <div className="flex justify-end">
          <NavLink to="/listas">
            <p className="text-sm text-red-600 cursor-pointer hover:underline">Configurar listas</p>
          </NavLink>
      </div>
      </div>
      <div className="flex justify-end py-2">
        {
          lista === "Mis Posiciones" ?
            catalogoTrading.posicionTradingMX.length ===  0 ?
              <p className="text-xs text-gray-500">0 Emisoras</p>
            : 
              <p className="text-xs text-gray-500">{rows.length} Emisoras</p>
          :
            (refinitivViewSet().length === 0 ) ?
            <p className="text-xs text-gray-500">0 Emisoras</p>
            :
              <p className="text-xs text-gray-500">{rows.length} Emisoras</p>

        }
      </div> 
      {
        loading ? 
          <div id="noInfoDiv" className="text-center">
            <CircularProgress style={{ color: "#FF5000" }} />
          </div>
        :
          lista === "Mis Posiciones" && catalogoTrading.posicionTradingMX.length ===  0 ?
            <div id="noInfoDiv" className="mx-2 flex justify-center">
              <p>No hay emisoras en Mis Posiciones, para tener emisoras realiza compra de acciones</p> 
            </div>
          :
            (refinitivViewSet().length === 0 ) && !listIssuer.loading ?
              <div id="noInfoDiv" className="mx-2 flex justify-center">
                <p>No hay emisoras en esta lista</p> 
              </div>
            :
              <Paper style={{ overflow: 'hidden' }}>
                <TableContainer
                    style={{ maxHeight: '175rem', minHeight: '40rem' }}
                >
                  <Table
                    className={classes.table}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead className="bg-gray-300 border border-gray-400">
                      <TableRow>
                        <TableCell>
                          <TableSortLabel onClick={() => handleSort("ticker")} className="tradingTitle">
                            Emisora
                          </TableSortLabel>
                        </TableCell>
                        {
                            (lista === "Mis Posiciones" && !loading) ?
                                <TableCell align="right" className="tradingTitle">
                                    <TableSortLabel onClick={() => handleSort("titulos")}>
                                        Tít
                                    </TableSortLabel>
                                </TableCell>
                            :
                            ""
                        }
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("ADJUST_CLS")} className="tradingTitle">
                            Inicial
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("TRDPRC_1")} className="tradingTitle">
                            Actual
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("PCTCHNG")} className="tradingTitle">
                            %
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("NETCHNG_1")} className="tradingTitle">
                            Pts
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("HIGH_1")} className="tradingTitle">
                            Max
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("LOW_1")} className="tradingTitle">
                            Min
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("TRDVOL_1")} className="tradingTitle">
                            Vol
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("NUM_MOVES")} className="tradingTitle">
                            Oper
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          Hora
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("BID")}>
                            Compra
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("BIDSIZE")}>
                            Vol
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right" className="mx-2">
                          Hora
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("ASK")}>
                            Venta
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel onClick={() => handleSort("ASKSIZE")}>
                            Vol
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        rows
                        .sort(order === "asc" ? ascCompare : desCompare)
                        .map((row:any, i:any) => {
                          const posRowFound = posRows.find((i:any) => i.ISSUER === row.ISSUER);
                          return(
                            <React.Fragment>
                              <TableRow>
                                <TableCell key={row.ISSUER}>
                                  <span className="cursor-pointer" onClick={() => checkKebab(row.ISSUER)}>
                                    <KebabDropdown 
                                      openMenu={kebabOpen[row.ISSUER]} 
                                      ticker={row.ISSUER} 
                                      lista = {lista} 
                                      listaId = {listaID}
                                      vector = {listVector}
                                      sendOptionDelete={(data: boolean) => sendDelete(data)}
                                    />
                                  </span>
                                  <span id="emisoraName" className={("cursor-pointer ") + (( (rowsOpen[row.ISSUER]) || kebabOpen[row.ISSUER]) ? "text-red-600" : "text-black")} onClick={() => changeProfile(row.ISSUER)}>{row.ISSUER}</span>
                                  {
                                    profundidadActivo ? 
                                      <span>
                                        <IconButton aria-label="expand row" size="small" onClick={() => ( checkUser(row.ISSUER))}>
                                          {( rowsOpen[row.ISSUER]) ? <KeyboardArrowUpIcon className={("text-xxss cursor-pointer ") + (( rowsOpen[row.ISSUER]) ? "text-red-600" : "text-black")}/> : <KeyboardArrowDownIcon className={("text-xxss cursor-pointer ") + (rowsOpen[row.ISSUER] ? "text-red-600" : "text-black")}/>}
                                        </IconButton>
                                    </span>
                                    : ""
                                  }
                                </TableCell>
                                {
                                    lista === "Mis Posiciones" ?
                                      <TableCell id="titulos" align="right">
                                          {row.titulos}
                                      </TableCell>
                                  : 
                                      ""
                                }
                                <TableCell align="right"><div className={row.costumStyle_ADJUST_CLS}>{Intl.NumberFormat('en-US').format(row.ADJUST_CLS)}</div></TableCell>
                                <TableCell align="right"><div className={row.costumStyle_TRDPRC_1}>{Intl.NumberFormat('en-US').format(row.TRDPRC_1)}</div></TableCell>
                                <TableCell align="right"><p className={ row.PCTCHNG < 0 ? "text-red-800" : row.PCTCHNG > 0 ? "text-green" : "text-black"}>{row.PCTCHNG}</p></TableCell>
                                <TableCell align="right"><div className={row.costumStyle_NETCHNG_1}>{row.NETCHNG_1}</div></TableCell>
                                <TableCell align="right"><div className={row.costumStyle_HIGH_1}>{Intl.NumberFormat('en-US').format(row.HIGH_1)}</div></TableCell>
                                <TableCell align="right"><div className={row.costumStyle_LOW_1}>{Intl.NumberFormat('en-US').format(row.LOW_1)}</div></TableCell>
                                <TableCell align="right"><div className={row.costumStyle_TRDVOL_1}>{row.TRDVOL_1}</div></TableCell>
                                <TableCell align="right"><div className={row.costumStyle_NUM_MOVES}>{row.NUM_MOVES}</div></TableCell>
                                <TableCell align="right" className="tradingGray"><div className={row.costumStyle_BID_TIM_NS}>{row.BID_TIM_NS}</div></TableCell>
                                <TableCell align="right" className="tradingGray">  
                                  <div className={row.costumStyle_BID}>
                                    <p>
                                      {Intl.NumberFormat('en-US').format(row.BID)}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell align="right" className="tradingGray">
                                  <div className={row.costumStyle_BIDSIZE}>
                                    <p>
                                      {row.BIDSIZE}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell align="right" className="tradingGray"><div className={row.costumStyle_ASK_TIM_NS}>{row.ASK_TIM_NS}</div></TableCell>
                                <TableCell align="right" className="tradingGray"><div className={row.costumStyle_ASK}>
                                  <p>
                                    {Intl.NumberFormat('en-US').format(row.ASK)}
                                  </p>
                                  </div>
                                </TableCell>
                                <TableCell align="right" className="tradingGray"><div className={row.costumStyle_ASKSIZE}>{row.ASKSIZE}</div></TableCell>
                              </TableRow>
                              <TableCell style={{ paddingBottom: 0, paddingTop: 0, width: "100%", borderStyle: "none" }} colSpan={14}>
                                  <Collapse in={rowsOpen[row.ISSUER]} timeout="auto" unmountOnExit={true}>
                                    <div className="py-4 w-5/8 mx-4">
                                      <div className="flex flex-row w-full">
                                        <div className="px-10 w-full">
                                          <p className="text-center font-bold text-lg">Profundidad</p><br/>
                                          <Posturas posicionData={posRowFound} profundidad={profundidad} type={"trading"}/>
                                        </div>
                                        <div className="flex flex-col">
                                          <div className="flex flex-row justify-end">
                                            {/* <div className="px-2" onClick={() => (clickUserList(row.ISSUER_CDE))}>
                                              <AddList id={"issuer"} content={"PopOver de issuer"}/>
                                            </div>
                                            <div className="px-2">
                                              <MdAddAlert className="text-red-600 text-2xl cursor-pointer"/>
                                            </div> */}
                                          </div>
                                          <div className="flex flex-row items-center my-4">
                                            <p className="text-sm mx-2">Mostrar</p>
                                            <div  onClick={() => ( clickList(row.ISSUER))}>
                                              <DropdownTrading
                                                dropdownData={DropdownDataTradingMostrar}
                                                initialOption={profundidad}
                                                side={false}
                                                sendOption={(profundidad:any) => sendProfundidad(profundidad)}
                                                openD = {dropdownOpen[row.ISSUER]}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Collapse>
                              </TableCell>
                            </React.Fragment>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
      }
    </div>
  );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    portfolio: store.portfolio,
    listItems: store.list,
    listIssuer: store.listIssuer,
    deleteIssuer: store.deleteIssuer,
    catalogoTrading: store.catalogoTrading,
    catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
    loginObject: store.loginObjectState,
    readyStateWs: store.readyState,
    indexItems: store.indexList,
  };
};


//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getListRequest: () => dispatch(getListRequest(dispatch)),
    getListIssuerRequest: () => dispatch(getListIssuerRequest(dispatch)),
    getCatalogoEmisorasRequest: () => dispatch(getCatalogoEmisorasRequest(dispatch)),
    catalogoTradingRequest: () => dispatch(catalogoTradingRequest(dispatch)),
    getReadyStateReceive: () => dispatch(getReadyStateReceive(dispatch)),
    putListUltimaRequest: () => dispatch(putListUltimaRequest(dispatch)),
    getIndexListRequest: () => dispatch(getIndexListRequest(dispatch)),
    getListReset: () => dispatch(getListReset(dispatch)),
    getListIssuerReset: () => dispatch(getListIssuerReset(dispatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradingMonitor);