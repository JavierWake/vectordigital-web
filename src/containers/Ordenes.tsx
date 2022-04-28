import React, { useEffect, useState } from "react";

import {
  OrdenesStatus,
  tdsOrdenesCap,
  tdsOrdenesFd,
} from "../types/OrdenesTypes";
import { RootState } from "../reducers/rootReducer";
import {
  getDsOrdenesRequest,
  getDsOrdenesReset,
} from "../actions/ordenesAction";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { LoginObjectState } from "../types/LoginObjectTypes";
import {
  CatalogoEmisorasState,
  Emisora,
} from "../types/GetCatalogoEmisotasType";
import Loading from "../components/Loading";
import OrdenDeCapitales from "./OrdenDeCapitales";
import DropdownTrading from "./DropdownTrading";
import { useHandleClickOutsideComponent } from "../utils/useHandleClickOutsideComponent";
import { ITdsOrdenesCapResponse } from "../types/InfoEmisoraTypes";
import { getOrdenesCapEstatusRequest } from "../actions/getOrdenesCapEstatusAction";
import {
  GetOrdenesCapEstatusState,
  TdsOrdenesCap,
  TdsOrdenesCapPend,
} from "../types/GetOrdenesCapEstatusType";
import { postLoginObjectLogout } from "../actions/loginObjectAction";
import { MdRefresh } from "react-icons/md";

//State of the component
interface propsFromState {
  //estados del store/reducer que accedemos en este componente
  ordenes?: OrdenesStatus;
  getOrdenesCapEstatusRespuesta?: GetOrdenesCapEstatusState;
  loginObject?: LoginObjectState;
  catalogoEmisorasRespuesta?: CatalogoEmisorasState;

  //para usar este componente en IssuerProfile
  ordenesCapEnIssuerProfile?: ITdsOrdenesCapResponse[];
  volverACargarApiInfoEmisorasEnIssuerProfile?: () => void;
  seHizoRefreshInfoEmis?: boolean;
}

type AllProps = propsFromState;

const Ordenes: React.FC<AllProps> = ({
  ordenes,
  getOrdenesCapEstatusRespuesta,
  loginObject,
  catalogoEmisorasRespuesta,
  ordenesCapEnIssuerProfile,
  volverACargarApiInfoEmisorasEnIssuerProfile,
  seHizoRefreshInfoEmis = false,
}) => {
  ////console.log("entro a ordenestsx");

  const history = useHistory();
  const dispatch = useDispatch();

  const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);
  const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");

  const [seHizoRefreshCap, setSeHizoRefreshCap] = useState(false);
  const [seHizoRefreshFd, setSeHizoRefreshFd] = useState(false);

  const [todasOrdenesCapOCE, setTodasOrdenesCapOCE] = useState<TdsOrdenesCap[]>(
    []
  );
  const sendTodasOrdenesCapOCE = (data: TdsOrdenesCap[]) => {
    if (todasOrdenesCapOCE === data) {
      return;
    }
    setTodasOrdenesCapOCE(data);
  };

  const [todasOrdenesCapPendOCE, setTodasOrdenesCapPendOCE] = useState<
    TdsOrdenesCapPend[]
  >([]);
  const sendTodasOrdenesCapPendOCE = (data: TdsOrdenesCapPend[]) => {
    if (todasOrdenesCapPendOCE === data) {
      return;
    }
    setTodasOrdenesCapPendOCE(data);
  };

  const [todasLasOrdenesCap, setTodasLasOrdenesCap] = useState<tdsOrdenesCap[]>(
    []
  );
  const sendTodasLasOrdenesCap = (data: tdsOrdenesCap[]) => {
    if (data === todasLasOrdenesCap) {
      return;
    }
    setTodasLasOrdenesCap(data);
  };

  const [todasLasOrdenesFd, setTodasLasOrdenesFd] = useState<tdsOrdenesFd[]>(
    []
  );
  const sendTodasLasOrdenesFd = (data: tdsOrdenesFd[]) => {
    if (data === todasLasOrdenesFd) {
      return;
    }
    setTodasLasOrdenesFd(data);
  };

  //Aqui iba

  useEffect(() => {
    console.log("useEffect ordenes");
    console.log(ordenes);
    console.log("ordenesCapEnIssuerProfile: ", ordenesCapEnIssuerProfile);
    if (ordenesCapEnIssuerProfile === undefined) {
      if (ordenes !== undefined) {
        if (ordenes.message.length > 0 && ordenes.loading === false) {
          //ya llego la respuesta de la api
          if (ordenes.tdsOrdenesCap !== undefined) {
            sendTodasLasOrdenesCap(ordenes.tdsOrdenesCap);
            //console.log("sendOpCapMostrar 173: ", ordenes.tdsOrdenesCap.length.toString());
            //sendOpCapMostrar(ordenes.tdsOrdenesCap.length.toString());
          }
          if (ordenes.tdsOrdenesFd !== undefined) {
            sendTodasLasOrdenesFd(ordenes.tdsOrdenesFd);
            //sendOpFdMostrar(ordenes.tdsOrdenesFd.toString());
          }
        }
      }
    }
  }, [ordenes?.message, ordenes?.loading]);

  useEffect(() => {
    if (ordenesCapEnIssuerProfile === undefined) {
      if (getOrdenesCapEstatusRespuesta !== undefined) {
        if (
          getOrdenesCapEstatusRespuesta.message.length > 0 &&
          getOrdenesCapEstatusRespuesta.loading === false
        ) {
          // ya llego la respuesta del api
          if (getOrdenesCapEstatusRespuesta !== undefined) {
            if (
              getOrdenesCapEstatusRespuesta.getOrdenesCapEstatusRespuesta !==
              undefined
            ) {
              if (
                getOrdenesCapEstatusRespuesta.getOrdenesCapEstatusRespuesta
                  .dsOrdenesCap !== undefined
              ) {
                if (
                  getOrdenesCapEstatusRespuesta.getOrdenesCapEstatusRespuesta
                    .dsOrdenesCap.dsOrdenesCap !== undefined
                ) {
                  if (
                    getOrdenesCapEstatusRespuesta.getOrdenesCapEstatusRespuesta
                      .dsOrdenesCap.dsOrdenesCap.tdsOrdenesCap !== undefined
                  ) {
                    sendTodasOrdenesCapOCE(
                      getOrdenesCapEstatusRespuesta
                        .getOrdenesCapEstatusRespuesta.dsOrdenesCap.dsOrdenesCap
                        .tdsOrdenesCap
                    );
                  }
                }
              } // if dsOrdenesCap !== undefined

              if (
                getOrdenesCapEstatusRespuesta.getOrdenesCapEstatusRespuesta
                  .dsOrdenesCapPend !== undefined
              ) {
                if (
                  getOrdenesCapEstatusRespuesta.getOrdenesCapEstatusRespuesta
                    .dsOrdenesCapPend.dsOrdenesCapPend !== undefined
                ) {
                  if (
                    getOrdenesCapEstatusRespuesta.getOrdenesCapEstatusRespuesta
                      .dsOrdenesCapPend.dsOrdenesCapPend.tdsOrdenesCapPend !==
                    undefined
                  ) {
                    sendTodasOrdenesCapPendOCE(
                      getOrdenesCapEstatusRespuesta
                        .getOrdenesCapEstatusRespuesta.dsOrdenesCapPend
                        .dsOrdenesCapPend.tdsOrdenesCapPend
                    );
                  }
                }
              } // if dsOrdenesCapPend !== undefined
            }
          }
        }
      }
    }
  }, [
    getOrdenesCapEstatusRespuesta?.message,
    getOrdenesCapEstatusRespuesta?.loading,
  ]);

  const volverCargarApiOrdenes = (volvemosCargarApiOrdenes: boolean = true) => {
    console.log("volver a cargar ordenes");
    sendOpCapMostrar("0");
    sendOpFdMostrar("0");
    setSeHizoRefreshCap(true);
    setSeHizoRefreshFd(true);
    if (
      ordenesCapEnIssuerProfile !== undefined &&
      volvemosCargarApiOrdenes === false
    ) {
      volverACargarApiInfoEmisorasEnIssuerProfile &&
        volverACargarApiInfoEmisorasEnIssuerProfile();
    } else if (volvemosCargarApiOrdenes === true) {
      if (paramsDispatch.length > 0 && ctaCtoDispatch.length > 0) {
        //console.log("volver a cargar Ordenes");
        let message = "/consulta/ordenes?cuenta=" + ctaCtoDispatch;
        let a = { message, params: paramsDispatch };
        dispatch(getDsOrdenesRequest(a)); //Ordenes
      }
    }
  };

  //Para el dropdownTrading de mostrar-----------------------------------

  const DropdownDataOrdenesCapMostrar =
    todasLasOrdenesCap.length <= 5
      ? [
          {
            id: "op1",
            option: todasLasOrdenesCap.length.toString(),
          },
        ]
      : todasLasOrdenesCap.length <= 10
      ? [
          {
            id: "op1",
            option: "5",
          },
          {
            id: "op2",
            option: todasLasOrdenesCap.length.toString(),
          },
        ]
      : [
          {
            id: "op1",
            option: "5",
          },
          {
            id: "op2",
            option: "10",
          },
          {
            id: "op3",
            option: todasLasOrdenesCap.length.toString(),
          },
        ];

  const [opCapMostrar, setOpCapMostrar] = useState(
    DropdownDataOrdenesCapMostrar[0].option
  );
  const [ordenesCapMostrar, setOrdenesCapMostrar] = useState<tdsOrdenesCap[]>(
    []
  );
  const [dropdownMostrarCapOpen, setDropdownMostrarCapOpen] =
    useState<boolean>(false);

  const sendOpCapMostrar = (data: string) => {
    if (opCapMostrar === data) {
      return;
    }
    setOpCapMostrar(data);
  };

  const sendOrdenesCapMostrar = (data: tdsOrdenesCap[]) => {
    if (ordenesCapMostrar === data) {
      return;
    }
    setOrdenesCapMostrar(data);
  };

  const sendDropdownMostrarCapOpen = (data: boolean) => {
    if (dropdownMostrarCapOpen === data) {
      return;
    }
    setDropdownMostrarCapOpen(data);
  };
  const IdOrdenesCapMostrarDD = "ddOrdenesCap";
  useHandleClickOutsideComponent({
    id: IdOrdenesCapMostrarDD,
    display: dropdownMostrarCapOpen,
    setDisplay: sendDropdownMostrarCapOpen,
  });

  useEffect(() => {
    if (seHizoRefreshCap === true || seHizoRefreshInfoEmis === true) {
      sendOpCapMostrar(todasLasOrdenesCap.length.toString());
      setSeHizoRefreshCap(false);
    } else {
      const numCapMostrar: number = parseInt(opCapMostrar);
      if (numCapMostrar > todasLasOrdenesCap.length) {
        sendOpCapMostrar(todasLasOrdenesCap.length.toString());
      } else {
        if (todasLasOrdenesCap.length >= 5) {
          sendOpCapMostrar("5");
        } else {
          sendOpCapMostrar(todasLasOrdenesCap.length.toString());
        }
      }
    }
  }, [todasLasOrdenesCap]);

  useEffect(() => {
    //setDropdownMostrarCapOpen( false);
    console.log("todasLasOrdenesCap cambio");
    console.log(todasLasOrdenesCap);

    const numCapMostrar: number = parseInt(opCapMostrar);
    console.log("numCapMostrar: ", numCapMostrar);
    /*if(numCapMostrar === 0){
            console.log("sendOpCapMostrar 304: ", todasLasOrdenesCap.length.toString());
            sendOpCapMostrar(todasLasOrdenesCap.length.toString());
            / *if(todasLasOrdenesCap.length <= 5){
                sendOpCapMostrar(todasLasOrdenesCap.length.toString());
                return;
            }
            else{
                sendOpCapMostrar("5");
                return;
            }* /
        }
        else*/
    if (numCapMostrar > todasLasOrdenesCap.length) {
      console.log("numCapMostrar > todasLasOrdenesCap.length === true");
      sendOrdenesCapMostrar(todasLasOrdenesCap);
      return;
    } else {
      console.log("numCapMostrar > todasLasOrdenesCap.length === false");
      sendOrdenesCapMostrar(todasLasOrdenesCap.slice(0, numCapMostrar));
      return;
    }
  }, [opCapMostrar]);

  const DropdownDataOrdenesFdMostrar =
    todasLasOrdenesFd.length <= 5
      ? [
          {
            id: "op1",
            option: todasLasOrdenesFd.length.toString(),
          },
        ]
      : todasLasOrdenesFd.length <= 10
      ? [
          {
            id: "op1",
            option: "5",
          },
          {
            id: "op2",
            option: todasLasOrdenesFd.length.toString(),
          },
        ]
      : [
          {
            id: "op1",
            option: "5",
          },
          {
            id: "op2",
            option: "10",
          },
          {
            id: "op3",
            option: todasLasOrdenesFd.length.toString(),
          },
        ];

  const [opFdMostrar, setOpFdMostrar] = useState(
    DropdownDataOrdenesFdMostrar[0].option
  );
  const [ordenesFdMostrar, setOrdenesFdMostrar] = useState<tdsOrdenesFd[]>([]);
  const [dropdownMostrarFdOpen, setDropdownMostrarFdOpen] =
    useState<boolean>(false);

  const sendOpFdMostrar = (data: string) => {
    if (opFdMostrar === data) {
      return;
    }
    setOpFdMostrar(data);
  };

  const sendOrdenesFdMostrar = (data: tdsOrdenesFd[]) => {
    if (ordenesFdMostrar === data) {
      return;
    }
    setOrdenesFdMostrar(data);
  };

  const sendDropdownMostrarFdOpen = (data: boolean) => {
    if (dropdownMostrarFdOpen === data) {
      return;
    }
    setDropdownMostrarFdOpen(data);
  };

  const IdOrdenesFdMostrarDD = "ddOrdenesFd";
  useHandleClickOutsideComponent({
    id: IdOrdenesFdMostrarDD,
    display: dropdownMostrarFdOpen,
    setDisplay: setDropdownMostrarFdOpen,
  });

  useEffect(() => {
    if (seHizoRefreshFd === true) {
      sendOpFdMostrar(todasLasOrdenesFd.length.toString());
      setSeHizoRefreshFd(false);
    } else {
      const numCapMostrar: number = parseInt(opCapMostrar);
      if (numCapMostrar > todasLasOrdenesFd.length) {
        sendOpFdMostrar(todasLasOrdenesFd.length.toString());
      } else {
        if (todasLasOrdenesFd.length >= 5) {
          sendOpFdMostrar("5");
        } else {
          sendOpFdMostrar(todasLasOrdenesFd.length.toString());
        }
      }
    }
  }, [todasLasOrdenesFd]);

  useEffect(() => {
    //setDropdownMostrarFdOpen( false);

    const numFdMostrar: number = parseInt(opFdMostrar);
    /*if(numFdMostrar === 0){
            sendOpFdMostrar(todasLasOrdenesFd.length.toString());
            / *if(todasLasOrdenesFd.length <= 5){
                sendOpFdMostrar(todasLasOrdenesFd.length.toString());
                return;
            }
            else{
                sendOpFdMostrar("5");
                return;
            }* /
        }
        else*/
    if (numFdMostrar > todasLasOrdenesFd.length) {
      sendOrdenesFdMostrar(todasLasOrdenesFd);
      return;
    } else {
      sendOrdenesFdMostrar(todasLasOrdenesFd.slice(0, numFdMostrar));
      return;
    }
  }, [opFdMostrar]);

  //---------------------------------------------------------------------

  const [openTab, setOpenTab] = React.useState(1);

  const Tab = (tabTitle: string, index: number) => {
    return (
      <li className="flex-auto text-center">
        <a
          // className={
          //     "text-sm font-bold block leading-normal " +
          // (openTab === index
          //     ? "cursor-pointer text-red-600 border-b-2 border-red-600 pb-2"
          //     : "cursor-pointer text-gray-400 hover:text-red-600 border-b-2 hover:border-red-600 pb-2")
          // }
          className={
            "inline-block list-none py-2 border-transparent border-b-2 hover:border-red-600 hover:text-red-600 cursor-pointer " +
            (index === 0 ? " px-2 " : " px-4 ") +
            (index === openTab ? " text-red-600 border-red-600 " : "")
          }
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(index);
          }}
          data-toggle="tab"
          //   href={link}
          role="tablist"
        >
          {tabTitle}
        </a>
      </li>
    );
  };

  ////console.log("ordenes dropdownMostrarCapOpen: ", dropdownMostrarCapOpen);

  console.log("opCapMostrar 457: ", opCapMostrar);

  const ContentTabs = [
    {
      id: "link1",
      title: "Mercados de capitales",
      content: (
        <>
          {ordenes?.loading === true ? (
            <Loading />
          ) : ordenesCapMostrar.length > 0 ? (
            <>
              <p className="text-xs text-gray-500 pb-2 text-right">
                Mostrando {ordenesCapMostrar.length.toString()} de{" "}
                {todasLasOrdenesCap.length.toString()} órdenes.
              </p>
              {
                /*
                                        usar todasOrdenesCapOCE y todasOrdenesCapPendOCE en lugar de 
                                        ordenesCapMostrar :s -> eso DESPUES, recibe la misma 
                                        respuesta que OrdenesCapEstatus API
                                        
                                        ... PENDIENTE hacer la logica para eso!!!!! 
                                        (ver js de ordenes que me paso Mario por teams!)
                                    */
                ordenesCapMostrar.map((node: tdsOrdenesCap) => {
                  let nombreEmpresa = "";
                  if (catalogoEmisorasRespuesta !== undefined) {
                    if (
                      catalogoEmisorasRespuesta.catalogoEmisorasRespuesta !==
                      undefined
                    ) {
                      if (
                        catalogoEmisorasRespuesta.catalogoEmisorasRespuesta
                          .length > 0
                      ) {
                        const catalogoFilter =
                          catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(
                            (item: Emisora) => {
                              return (
                                item.Emisora + "." + item.Serie === node.emisora
                              );
                            }
                          );

                        if (
                          catalogoFilter !== undefined &&
                          catalogoFilter?.length > 0
                        ) {
                          nombreEmpresa = catalogoFilter[0].CommonName;
                        }
                      }
                    }
                  }

                  return (
                    <OrdenDeCapitales
                      key={node.folio}
                      ordenCap={node}
                      nombreDeLaEmpresa={nombreEmpresa}
                      volverCargarApiOrdenes={() =>
                        volverCargarApiOrdenes(
                          ordenesCapEnIssuerProfile !== undefined ? false : true
                        )
                      }
                    />
                  );
                })
              }
              {
                <div className="flex flex-row justify-end items-center mt-2">
                  <p className="text-sm mx-2">Mostrar</p>
                  <div
                    id={IdOrdenesCapMostrarDD}
                    //onClick={() => setDropdownMostrarCapOpen(!dropdownMostrarCapOpen)}
                  >
                    <DropdownTrading
                      dropdownData={DropdownDataOrdenesCapMostrar}
                      initialOption={opCapMostrar}
                      side={false}
                      sendOption={(opMostrar: any) =>
                        sendOpCapMostrar(opMostrar)
                      }
                      openD={dropdownMostrarCapOpen}
                      //idDivDDTrading={IdOrdenesCapMostrarDD}
                      sendOpenD={(newOpen: boolean) =>
                        sendDropdownMostrarCapOpen(newOpen)
                      }
                    />
                  </div>
                </div>
              }
            </>
          ) : (
            <div className="px-4 py-2">
              No hay órdenes de capitales en este momento.
            </div>
          )}
        </>
      ),
    },
    {
      id: "link2",
      title: "Fondo de inversión",
      content: (
        <>
          {ordenes?.loading === true ? (
            <Loading />
          ) : ordenesFdMostrar.length > 0 ? (
            <>
              <p className="text-xs text-gray-500 pb-2 text-right">
                Mostrando {ordenesFdMostrar.length.toString()} de{" "}
                {todasLasOrdenesFd.length.toString()} órdenes.
              </p>
              {ordenesFdMostrar.map((node: tdsOrdenesFd) => {
                return (
                  <div
                    key={node.numFolio}
                    className="flex w-full justify-between items-center pb-2 border-b-2 mt-2 hover:shadow-xl px-4 py-2"
                  >
                    <div className="w-2/12">
                      <p className="text-sm">{node.numFolio}</p>
                      <p className="text-gray-400 text-xs">{node.fecha}</p>
                    </div>
                    <div className="w-2/12">
                      <p className="uppercase text-sm">{node.fondo}</p>
                    </div>
                    <div className="w-1/24">
                      <p className="font-semibold text-sm">
                        {node.tipoTransaccion}
                      </p>
                    </div>
                    <div className="w-2/12 text-right">
                      <p className="text-sm">{node.titulos} títulos</p>
                    </div>
                    <div className="w-2/12 text-right">
                      <p className="text-sm font-bold">$ {node.monto}</p>
                    </div>
                    <div className="w-2/12 text-right">
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#283f72" }}
                      >
                        {node.descEstado}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Liq {node.FecAplic}
                      </p>
                    </div>
                  </div>
                );
              })}
              {
                <div className="flex flex-row justify-end items-center mt-4">
                  <p className="text-sm mx-2">Mostrar</p>
                  <div
                    id={IdOrdenesFdMostrarDD}
                    //onClick={() => setDropdownMostrarFdOpen(!dropdownMostrarFdOpen)}
                  >
                    <DropdownTrading
                      dropdownData={DropdownDataOrdenesFdMostrar}
                      initialOption={opFdMostrar}
                      side={false}
                      sendOption={(opMostrar: any) =>
                        sendOpFdMostrar(opMostrar)
                      }
                      openD={dropdownMostrarFdOpen}
                      //idDivDDTrading={IdOrdenesFdMostrarDD}
                      sendOpenD={(newOpen: boolean) =>
                        sendDropdownMostrarFdOpen(newOpen)
                      }
                    />
                  </div>
                </div>
              }
            </>
          ) : (
            <div className="px-4 py-2">
              No hay órdenes de fondos en este momento.
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    // Modificar tamaño de contenedor
    <div className="w-12/12">
      <div className="mt-1">
        <div className="flex flex-row pb-2">
          <h1 className="font-sans text-xl text-gray-800 font-medium">
            Órdenes
          </h1>
          <div className="mx-2">
            <MdRefresh
              onClick={() =>
                volverCargarApiOrdenes(
                  ordenesCapEnIssuerProfile !== undefined ? false : true
                )
              }
              className="text-gray-500 text-lg hover:cursor-pointer hover:text-red-600"
            />
          </div>
        </div>
        {ordenesCapEnIssuerProfile !== undefined && (
          <hr className="solid bg-gray-500 mb-3" />
        )}
        {ordenesCapEnIssuerProfile !== undefined ? (
          ContentTabs[0].content // es el content de capitales
        ) : (
          <div className="flex flex-col">
            <div className="flex w-full justify-between items-center border-b border-gray-300">
              <ul
                className="flex mb-0 list-none w-auto flex-row"
                role="tablist"
              >
                {Tab("Capitales", 1)}
                {Tab("Fondos", 2)}
              </ul>
            </div>
            <div className="flex flex-col w-full h-full mb-2">
              <div className="flex-auto mt-3">
                <div className="tab-content tab-space">
                  {ContentTabs.map((tab: any, index: number) => {
                    return (
                      <div
                        className={openTab === index + 1 ? "block" : "hidden"}
                        id={tab.link}
                      >
                        {tab.content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    ordenes: store.ordenes,
    loginObject: store.loginObjectState,
    catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
    getOrdenesCapEstatusRespuesta: store.getOrdenesCapEstatusRespuesta,
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getDsOrdenesRequest: () => dispatch(getDsOrdenesRequest(dispatch)),
    getOrdenesCapEstatusRequest: () =>
      dispatch(getOrdenesCapEstatusRequest(dispatch)),
    getDsOrdenesReset: () => dispatch(getDsOrdenesReset(dispatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ordenes);
