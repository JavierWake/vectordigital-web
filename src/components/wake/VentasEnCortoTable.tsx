import React, { useState, useEffect } from "react";

import PrincipalesIndicadoresComponent from "../../containers/PrincipalesIndicadores";
import Ordenes from "../../containers/Ordenes";
import {
  DataSearchGraficador,
  SearchGraficador,
} from "../../containers/SearchGraficador";
import BotonesGraficador from "../../containers/BotonesGraficador";
import RefinitivGraph from "../../containers/RefinitivGraph";
import resultados from "../../assets/fakeChart-resultados.png";
import balance from "../../assets/fakeChart-balance.png";
import efectivo from "../../assets/fakeChart-efectivo.png";
import { BsTrash } from "react-icons/bs";
import { Dropdown } from "../../containers/Dropdown";
import DropdownList from "../../containers/DropdownList";

const VentasEnCortoTable = () => {
  const [state, setState] = useState({
    ventas: true,
    prestamos: false,
    garantias: false,
    poderVenta: false,
  });

  const onVentas = () => {
    setState({
      ...state,
      ventas: true,
      prestamos: false,
      garantias: false,
      poderVenta: false,
    });
  };
  const onPrestamos = () => {
    setState({
      ...state,
      ventas: false,
      prestamos: true,
      garantias: false,
      poderVenta: false,
    });
  };
  const onGarantias = () => {
    setState({
      ...state,
      ventas: false,
      prestamos: false,
      garantias: true,
      poderVenta: false,
    });
  };
  const onPoderVenta = () => {
    setState({
      ...state,
      ventas: false,
      prestamos: false,
      garantias: false,
      poderVenta: true,
    });
  };

  const [openTab, setOpenTab] = React.useState(1);

  const Tab = (tabTitle: string, index: number) => {
    return (
      <li className="flex-auto text-center">
        <a
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

  const ContentTabs = [
    {
      id: "link1",
      title: "Ventas en corto",
      content: (
        <>
          <section className="w-10/12">
            <div className="flex justify-between w-full border-b border-gray-400 mb-14 text-sm">
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Folio de <br />
                    instruccion
                  </span>
                </p>
                <p className="font-medium">123456</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Emisora</span>
                </p>
                <p className="font-medium">ALFA.A</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Títulos disp <br />
                    en posición
                  </span>
                </p>
                <p className="font-medium">10</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Monto <br />
                    Préstamo
                  </span>
                </p>
                <p className="font-medium">105.05</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Monto <br />
                    garantía
                  </span>
                </p>
                <p className="font-medium">141.89</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Tasa</span>
                </p>
                <p className="font-medium">6.10%</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">**Prima</span>
                </p>
                <p className="font-medium">$0.80</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Comisión</span>
                </p>
                <p className="font-medium">$00.00</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Vence</span>
                </p>
                <p className="font-medium">10/10/21</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    ***Cancelar
                    <br />
                    prestamo
                  </span>
                </p>
                <BsTrash className="text-gray-500 text-xl hover:cursor-pointer hover:text-red-600" />
              </div>
            </div>
            <div className="flex justify-between w-full text-sm">
              <p className="font-medium">
                **La prima es aproximada, si el préstamo no es cancelado se
                recalculará tomando como base el precio de cierre del día
                anterior.
              </p>
            </div>
            <div className="flex justify-between w-full text-sm">
              <p className="font-medium">
                ***Si el préstamo esta cancelado, y no fue hecho por Usted,
                revise el estatus de la orden, posiblemente está cancelada por
                motivo de rechazo o vigencia.
              </p>
            </div>
          </section>
        </>
      ),
    },
    {
      id: "link2",
      title: "Préstamos",
      content: (
        <>
          <section className="w-10/12">
            <p className="text-xs text-gray-500 pb-2 text-right">
              Préstamos vigentes 2021/01/01
            </p>
            <div className="flex justify-between w-full border-b border-gray-400 mb-14 text-sm">
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Folio de <br />
                    instruccion
                  </span>
                </p>
                <p className="font-medium">123456</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Emisora</span>
                </p>
                <p className="font-medium">ALFA.A</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Títulos disp <br />
                    en posición
                  </span>
                </p>
                <p className="font-medium">10</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Monto <br />
                    Préstamo
                  </span>
                </p>
                <p className="font-medium">105.05</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    Monto <br />
                    garantía
                  </span>
                </p>
                <p className="font-medium">141.89</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Tasa</span>
                </p>
                <p className="font-medium">6.10%</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">**Prima</span>
                </p>
                <p className="font-medium">$0.80</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Comisión</span>
                </p>
                <p className="font-medium">$00.00</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">Vence</span>
                </p>
                <p className="font-medium">10/10/21</p>
              </div>
              <div className="flex flex-col justify-between text-center h-full">
                <p className="font-medium mb-10">
                  <span className="">
                    ***Cancelar
                    <br />
                    prestamo
                  </span>
                </p>
                <BsTrash className="text-gray-500 text-xl hover:cursor-pointer hover:text-red-600" />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      id: "link3",
      title: "Garantias",
      content: (
        <>
          <section className="w-10/12">
            <p className="font-bold mb-10">Valores dados en Garantía</p>
            <div className="flex justify-start w-6/12 mb-2 text-sm">
              <div className="flex flex-col justify-around h-full w-1/2">
                <p className="font-bold mb-2">
                  <span className="">Emisoras en Garantía</span>
                </p>
              </div>
              <div className="flex flex-col justify-between h-full w-1/2">
                <p className="font-bold mb-2">
                  <span className="">Títulos</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start w-6/12 mb-6 text-sm">
              <div className="flex text-start border-b border-gray-400 mb-0 h-full">
                <p className="font-medium mb-2 w-1/2">ALFA.A</p>
                <p className="font-medium mb-2 w-1/2">12</p>
              </div>
              <div className="flex text-start border-b border-gray-400 mb-0 mt-2 h-full">
                <p className="font-medium mb-2 w-1/2">ALFA.A</p>
                <p className="font-medium mb-2 w-1/2">12</p>
              </div>
              <div className="flex text-start border-b border-gray-400 mb-0 mt-2 h-full">
                <p className="font-medium mb-2 w-1/2">ALFA.A</p>
                <p className="font-medium mb-2 w-1/2">12</p>
              </div>
            </div>
          </section>
          <section className="w-10/12">
            <p className="font-bold mb-10">Detalles del Consumo de Garantías</p>
            <div className="flex justify-between w-full mb-2 text-sm">
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Fecha Oper</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Folio VC</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Emisora</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Títulos</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Precio</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Préstamo</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Gtia. Inicial</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Gtia. Actual</p>
              </div>
              <div className="flex flex-col h-full w-fill">
                <p className="font-bold mb-2">Consumo</p>
              </div>
            </div>
            <div className="flex justify-between w-full border-b border-gray-400 mb-6 text-sm">
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">2021/01/01</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">123456</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">ALFA.A</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">12</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$105.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$141.89</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$140.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$104.55</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2 text-green">0.00%</p>
              </div>
            </div>
            <div className="flex justify-between w-full border-b border-gray-400 mb-6 text-sm">
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">ALFA.A</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">12</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$140.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$104.55</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
            </div>
            <div className="flex justify-between w-full border-b border-gray-400 mb-6 text-sm">
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">2021/01/01</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">123456</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">ALFA.A</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">12</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$105.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$141.89</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$140.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$104.55</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2 text-green">0.00%</p>
              </div>
            </div>
            <div className="flex justify-between w-full border-b border-gray-400 mb-6 text-sm">
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">ALFA.A</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">12</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$140.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$104.55</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
            </div>
            <div className="flex justify-between w-full border-b border-gray-400 mb-6 text-sm">
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">2021/01/01</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">123456</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">ALFA.A</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">12</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$105.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$141.89</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$140.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$104.55</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2 text-green">0.00%</p>
              </div>
            </div>
            <div className="flex justify-between w-full border-b border-gray-400 mb-6 text-sm">
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">ALFA.A</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">12</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$140.05</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2">$104.55</p>
              </div>
              <div className="flex flex-col text-start mb-0 h-full w-fill">
                <p className="font-medium mb-2"></p>
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      id: "link4",
      title: "ConfigGarantías",
      content: (
        <>
          <div className="flex flex-col w-full justify-between pb-2 border-b-2 mt-2 hover:shadow-xl px-2 py-2 ">
            <div className="flex flex-row w-10/12 justify-around hover:cursor-pointer mb-16">
              <div className="w-auto">
                <p className="text-md">Emisora</p>
                <select
                  name=""
                  id=""
                  className="font-sans text-sm py-1 px-2 w-48 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Selecciona</option>
                  <option value="">Uno</option>
                  <option value="">Dos</option>
                </select>
              </div>
              <div className="w-auto">
                <p className="px-6">Mercado</p>
                <p className="text-gray-400 text-xs">123123</p>
              </div>
              <div className="w-auto">
                <p className="text-sm">
                  Posicion al
                  <br />
                  momento
                </p>
                <p className="text-gray-400 text-xs">123123</p>
              </div>
              <div className="w-auto">
                <p className="text-sm">% a dejar en garantia</p>
                <select
                  name=""
                  id=""
                  className="font-sans text-sm py-1 px-2 w-48 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Selecciona</option>
                  <option value="">Uno</option>
                  <option value="">Dos</option>
                </select>
              </div>
              <div className="w-auto">
                <p className="text-sm">Orden por ser cosiderada</p>
                <select
                  name=""
                  id=""
                  className="font-sans text-sm py-1 px-2 w-48 border-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Selecciona</option>
                  <option value="">Uno</option>
                  <option value="">Dos</option>
                </select>
                <BsTrash className="text-gray-500 text-xl hover:cursor-pointer hover:text-red-600" />
              </div>
            </div>
            <p className="font-medium mb-10">
              Emisoras seleccionadas para dejar en garantía
            </p>
            <section className="w-11/12">
              <div className="flex justify-between w-full border-b border-gray-400 mb-14 text-sm">
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">Orden</span>
                  </p>
                  <p className="font-medium">123456</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">Mercado</span>
                  </p>
                  <p className="font-medium">ALFA.A</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">Emisora</span>
                  </p>
                  <p className="font-medium">10</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">
                      Porcentaje <br />a utilizar
                    </span>
                  </p>
                  <p className="font-medium">105.05</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">
                      Posición <br />
                      máxima
                    </span>
                  </p>
                  <p className="font-medium">141.89</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">
                      Posición <br />
                      en garantia
                    </span>
                  </p>
                  <p className="font-medium">6.10%</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">Precio</span>
                  </p>
                  <p className="font-medium">$0.80</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">
                      Factor <br />
                      del aforo
                    </span>
                  </p>
                  <p className="font-medium">$00.00</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className="">Monto-aforo</span>
                  </p>
                  <p className="font-medium">10/10/21</p>
                </div>
                <div className="flex flex-col justify-between text-center h-full">
                  <p className="font-medium mb-10">
                    <span className=""></span>
                  </p>
                  <div className="flex flex-col justify-between text-center h-full">
                    <BsTrash className="text-gray-500 text-xl hover:cursor-pointer hover:text-red-600" />
                  </div>
                </div>
              </div>
            </section>
          </div>
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
            Ventas en Corto
          </h1>
        </div>
        <hr className="solid bg-gray-500 mb-3" />

        <div className="flex flex-col">
          <div className="flex w-full justify-between items-center border-b border-gray-300">
            <ul className="flex mb-0 list-none w-auto flex-row" role="tablist">
              {Tab("Ventas en corto", 1)}
              {Tab("Préstamos", 2)}
              {Tab("Consumo de garantias", 3)}
              {Tab("Actualiza tu poder de venta", 4)}
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
      </div>
    </div>
  );
};

export default VentasEnCortoTable;