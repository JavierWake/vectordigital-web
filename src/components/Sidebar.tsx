import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../styles/sidebar.css';
import { MdOutlinePayments,  MdDonutLarge, MdOutlineArrowUpward, MdOutlineArrowDownward} from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import '../styles/activeClass.css';
import { RootState } from '../reducers/rootReducer';
import getNameInitials from '../utils/getNameInitials';
import convertToTitleCase from "../utils/convertToTitleCase";
import { GetConsultaSaldosState } from '../types/GetConsultaSaldosType';
import { getConsultaSaldosRequest } from '../actions/getConsultaSaldosAction';
import { GraphPortfolioStatus } from '../types/GraphPortfolioTypes';
import { getGraphPortfolioRequest } from '../actions/GraphPortfolioAction';
import ModalRetirarForm from '../containers/ModalRetirarForm';
import ModalDepositoForm from '../containers/ModalDepositoForm';
import { Digit } from '../containers/Digit';
import { getRetiroInfoRequest } from '../actions/getRetiroInfoAction';
import { GetRetiroInfoState } from '../types/GetRetiroInfoType';
import { LoginObjectResponse, LoginObjectState } from '../types/LoginObjectTypes';
import { getResumenRequest } from '../actions/ResumenAction';
import { ResumenStatus } from '../types/ResumenTypes';
import { getListReset } from "../actions/listAction";
import { getListIssuerReset } from "../actions/ListIssuerAction";
import { postLoginObjectLogout } from '../actions/loginObjectAction';



interface propsFromState {
  loginObject: LoginObjectState;
  consultaSaldosRespuesta?: GetConsultaSaldosState;
  retiroInfoRespuesta?: GetRetiroInfoState;
  resumen?: ResumenStatus;
}

type AllProps = propsFromState; 

const Sidebar: React.FC<AllProps> = ({ loginObject, consultaSaldosRespuesta, resumen }) => {

  const [isSidebarClosed, setIsSidebarClosed] = useState(true);
  

  const [ initials, setInitials ] = useState("");
  const [ name, setName ] = useState("");
  const [ poderCompraVal, setPoderCompraVal ] = useState("-");
  const [ poderCompraPC, setPoderCompraPC ] = useState("-");
  const [ poderCompraEfec, setPoderCompraEfec ] = useState("-");
  const [ paramsDispatch, setParamsDispatch ] = useState<string[]>([]);
  const [ ctaCtoDispatch, setCtaCtoDispatch ] = useState("");

  const [ modalDepositarOpen, setModalDepositarOpen ] = useState(false);
  const [ modalRetirarOpen, setModalRetirarOpen ] = useState(false);

  const [ finalizoRetiro, setFinalizoRetiro ] = useState(false);

  const sendFinalizoRetiro = (data: boolean) => {
    if(finalizoRetiro === data){
      return;
    }
    setFinalizoRetiro(data);
  };

  const sendModalRetirarOpen = (isOpen: boolean) => {
    if(isOpen === modalRetirarOpen){
      return;
    }
    setModalRetirarOpen(isOpen);
  };

  const sendModalDepositarOpen = (isOpen: boolean) => {
    if(isOpen === modalDepositarOpen){
      return;
    }
    setModalDepositarOpen(isOpen);
  };

  const sendPoderCompraEfec = (data: string) => {
    if(poderCompraEfec === data){
      return;
    }
    setPoderCompraEfec(data);
  };

  const sendPoderCompraPC = (data: string) => {
    if(poderCompraPC === data){
      return;
    }
    setPoderCompraPC(data);
  };

  const sendPoderCompraVal = (data: string) => {
    if(poderCompraVal === data){
      return;
    }
    setPoderCompraVal(data);
  }

  const dispatch = useDispatch();
  const history = useHistory();

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
                let paramsResumen = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];


                dispatch(getListReset({ hacerResetAInitialState: true }))
                dispatch(getListIssuerReset({ hacerResetAInitialState: true }))
    
                if(paramsDispatch.length === 0){
                  setParamsDispatch(params); 
                  setCtaCtoDispatch(cuentaLO);
                }
    
                if(resumen?.message === ""){
                  dispatch(getResumenRequest({ message:"/consulta/portafolioresumen?cuenta=" + cuentaLO + "&anio=2020&mes=12", params: paramsResumen })); //API del resumen
                }

                if(consultaSaldosRespuesta?.message === ""){
                  dispatch(getConsultaSaldosRequest({ message:"/consulta/saldos?cuenta=" + cuentaLO, params }));
                }
    
                const iniciales: string = getNameInitials(loginObject.response.dsLogin.tdsLogin[0].nombre);
                setInitials(iniciales);
                
                const nombre: string = convertToTitleCase(loginObject.response.dsLogin.tdsLogin[0].nombre);
                setName(nombre);
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en sidebar, lo mandamos al login");
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

  useEffect(() => {
    if(resumen != undefined){
      if(resumen.message.length > 0 && resumen.loading === false){
        //sendPoderCompraVal(Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(graphPortfolio.valuePortfolio[0].valorPortafolio));
        sendPoderCompraVal(resumen.textNum.sTotal);
      }
    }
  }, [resumen?.message, resumen?.loading]);

  useEffect(() => {
    if(consultaSaldosRespuesta != undefined){
      if(consultaSaldosRespuesta.message.length > 0 && consultaSaldosRespuesta.loading === false){
        if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsSaldoEfectivo.length > 0){
          sendPoderCompraEfec(Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsSaldoEfectivo[0].saldo));
        }
  
        if(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa.length > 0){
          sendPoderCompraPC(Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(consultaSaldosRespuesta.consultaSaldosRespuesta.dsSaldos.tdsCapCpa[0].saldo));
        }
      }
    }
  }, [consultaSaldosRespuesta?.message, consultaSaldosRespuesta?.loading]);

  useEffect(() => {
    if(finalizoRetiro === true){
      //volvemos a llamar el api que trae el dato de efectivo
      dispatch(getConsultaSaldosRequest({ message:"/consulta/saldos?cuenta=" + ctaCtoDispatch, params: paramsDispatch }));
      //ponemos finalizo retiro = a false
      sendFinalizoRetiro(false);
    }
  }, [finalizoRetiro]);


  function showData(e:any) {
    
    var hrL = document.getElementById("downSide");
    hrL!.style.visibility = "visible";
    /*hrL = document.getElementById("upSide");
    hrL!.style.visibility = "visible";*/
    setIsSidebarClosed(false);
  }

  function hiddeData(e:any) {
    
  
    var hrL = document.getElementById("downSide");
    hrL!.style.visibility = "hidden";
    /*hrL = document.getElementById("upSide");
    hrL!.style.visibility = "hidden";*/
    setIsSidebarClosed(true);
  }

  const openModalRetiro = () => {
    //mandar llamar api de retiroinfo

    if(ctaCtoDispatch.length > 0 && paramsDispatch.length > 0){
        // mandamos llamar api
        let message = "/teso/retiroinfo?cuenta=" + ctaCtoDispatch;
        let params = paramsDispatch;
        let a = { message, params };

        dispatch(getRetiroInfoRequest(a));
    }
    hiddeData({});
    sendModalRetirarOpen(true);
  }

  const openModalDeposito = () => {
    hiddeData({});
    setModalDepositarOpen(true);
  }

    return (
      <>
        <nav className="main-menu h-full px-1 z-50 shadow-md" onMouseOver={showData} onMouseLeave={hiddeData}>
          <ul>
            <div id="userInfo" className="h-1/3 pt-6 pb-3 mb-1">
              {
                /* el sidebar esta cerrado, mostramos iniciales en closed */
                isSidebarClosed === true ?
                  <div id="closedInitials" className="pl-1">
                    <div className="icon rounded-full h-8 w-8 flex items-center justify-center bg-red-300">
                      <span className="text-red-600 text-xs font-bold">{initials}</span>
                    </div>
                  </div>
                :
                  <>
                    <div id="openedInitials" className="flex justify-center mx-3">
                      <NavLink to="/perfil">
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-300">
                          <span className="text-red-600 text-base font-bold">{initials}</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="flex justify-center mx-3">
                      <p className="w-3/4 mt-1 text-sm text-red-600 text-center">{name}</p> 
                    </div>
                  </>
              }
            </div>
            <hr className="solid bg-gray-500 mt-1 mb-3"/>
            <li className="group border-red-600">
              <NavLink to="/Portafolio" className="text-gray-500" activeClassName="selected font-bold text-red-600">
                <MdDonutLarge className="icon group-hover:text-white" />
                <span className="pl-2 nav-text group-hover:text-white">
                    Portafolio
                </span>
              </NavLink>
            </li>
            <li className="group border-red-600">
              <NavLink to="/trading" className="text-gray-500" activeClassName="selected font-bold text-red-600">
                <MdOutlinePayments className="icon group-hover:text-white" />
                <span className="pl-2 nav-text group-hover:text-white">
                    Trading
                </span>
              </NavLink>
            </li>
            <li className="group border-red-600">
              <NavLink to="/Fondos" className="text-gray-500" activeClassName="selected font-bold text-red-600">
                <MdOutlineAccountBalanceWallet className="icon group-hover:text-white" />
                <span className="pl-2 nav-text group-hover:text-white">
                    Fondos
                </span>
              </NavLink>
            </li>
            <li className="group border-red-600">
              <NavLink to="/research" className="text-gray-500" activeClassName="selected font-bold text-red-600">
                <AiOutlineLineChart className="icon group-hover:text-white" />
                <span className="pl-2 nav-text group-hover:text-white">
                    Research
                </span>
              </NavLink>
            </li>
            {
              isSidebarClosed === true && <div className="w-full flex flex-col">
                <hr className="solid bg-gray-500 my-1"/>
                <div className="flex flex-col justify-center mt-4">
                  <div className="w-full flex flex-col justify-between items-center p-1 px-2">
                    <div className="rounded-full h-4 w-4 flex items-center justify-center bg-red-600">
                      <MdOutlineArrowUpward className="text-xs text-center text-white" />
                    </div>
                  </div>
                  <p className="text-xxs text-center text-red-600 my-1">Depositar</p>
                </div>
                <div className="flex flex-col justify-center my-3">
                  <div className="w-full flex flex-col justify-between items-center p-1 px-2">
                    <div className="rounded-full h-4 w-4 flex items-center justify-center bg-red-600">
                      <MdOutlineArrowDownward className="text-xs text-center text-white" />
                    </div>
                  </div>
                  <p className="text-xxs text-center text-red-600 my-1">Retirar</p>
                </div>
              </div>
            }
            <div id="downSide">
              <hr className="solid bg-gray-500 mt-1"/>
              <div className="mx-2 my-2">
                <div className="mx-2 mb-2 flex justify-between">
                  <span className="text-sm text-gray-400">Valor</span>
                  <span className="text-sm font-bold">{poderCompraVal}</span>
                </div> 
                <div className="mx-2 mb-2 flex justify-between">
                  <span className="text-sm text-gray-400">Poder de Compra</span>
                  <span className="text-sm font-bold">{poderCompraPC}</span>
                </div>
                <div className="mx-2 mb-2 flex justify-between">
                  <span className="text-sm text-gray-400">Efectivo</span>
                  <span className="text-sm font-bold">{poderCompraEfec}</span>
                </div>   
              </div>  
              <div className="py-2">
                <li className="mx-3 mb-2" >
                  <button type="submit" onClick={openModalDeposito} className="w-10/12 bg-red-600 p-2 text-xs text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">Depositar</button>
                </li>
                <li className="mx-3 mt-2" >
                  <button type="submit" onClick={openModalRetiro} className="w-10/12 bg-gray-100 p-2 text-xs text-red-600 border-1 border-red-600 rounded ">Retirar</button>
                </li>
              </div>
            </div>
          </ul>
        </nav>
        {
          /* ESTO SI FUNCIONA! PENDIENTE: validar esta linea el lunes para ver si con esto se reinician el estado de este modal */       
          modalRetirarOpen === true && <ModalRetirarForm modalOpen={modalRetirarOpen} setModalOpen={sendModalRetirarOpen} params={paramsDispatch} ctaCto={ctaCtoDispatch} sendFinalizoRetiro={(yaTermino: boolean) => sendFinalizoRetiro(yaTermino)} />
        }        
        {
          /* ESTO SI FUNCIONA! PENDIENTE: validar esta linea el lunes para ver si con esto se reinician el estado de este modal */
          modalDepositarOpen === true && <ModalDepositoForm modalOpen={modalDepositarOpen} setModalOpen={sendModalDepositarOpen} params={paramsDispatch} ctaCto={ctaCtoDispatch} />
        }
      </>
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
      loginObject: store.loginObjectState,
      consultaSaldosRespuesta: store.consultaSaldosRespuesta,
      retiroInfoRespuesta: store.retiroInfoRespuesta,
      resumen: store.resumen,
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getGraphPortfolioRequest: () => dispatch(getGraphPortfolioRequest(dispatch)),
    getConsultaSaldosRequest: () => dispatch(getConsultaSaldosRequest(dispatch)),
    getRetiroInfoRequest: () => dispatch(getRetiroInfoRequest(dispatch)),
    getResumenRequest: () => dispatch(getResumenRequest(dispatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
