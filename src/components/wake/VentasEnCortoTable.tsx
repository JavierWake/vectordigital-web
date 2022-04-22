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

  const GraficaAnalisisFundamental = () => {
    if (state.ventas) {
      return (
        <section className="w-11/12 m-auto">
          <div className="flex justify-evenly w-full mb-14 text-sm">
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
                <span className="">Vene</span>
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
              <p className="font-medium">**</p>
            </div>
          </div>
        </section>
      );
    } else if (state.prestamos) {
      return (
        <section className="w-11/12 m-auto">
          <div className="flex justify-evenly w-full mb-14 text-sm">
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
                <span className="">Vene</span>
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
              <p className="font-medium">**</p>
            </div>
          </div>
        </section>
      );
    } else if (state.garantias) {
      return (
        <section className="w-11/12 m-auto">
          <div className="flex justify-evenly w-full mb-14 text-sm">
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
                <span className="">Vene</span>
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
              <p className="font-medium">**</p>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="w-11/12 m-auto">
          <div className="flex justify-evenly w-full mb-14 text-sm">
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
                <span className="">Vene</span>
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
              <p className="font-medium">**</p>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <section className="w-11/12 m-auto">
      <h2 className="font-semibold text-xl mb-7">Ventas en corto</h2>

      <div className="text-sm border-b border-gray-400 mb-7">
        <button
          className={`px-4 ${
            state.ventas && "text-red-600 border-b-4 border-red-600"
          }`}
          onClick={onVentas}
        >
          Ventas en corto
        </button>
        <button
          className={`px-4 ${
            state.prestamos && "text-red-600 border-b-4 border-red-600"
          }`}
          onClick={onPrestamos}
        >
          Préstamos
        </button>
        <button
          className={`px-4 ${
            state.garantias && "text-red-600 border-b-4 border-red-600"
          }`}
          onClick={onGarantias}
        >
          Consumo de garantias
        </button>
        <button
          className={`px-4 ${
            state.poderVenta && "text-red-600 border-b-4 border-red-600"
          }`}
          onClick={onPoderVenta}
        >
          Actualiza tu poder de venta
        </button>
      </div>

      <GraficaAnalisisFundamental />
    </section>
  );
};

export default VentasEnCortoTable;
