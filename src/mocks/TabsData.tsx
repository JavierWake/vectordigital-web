import React, { useState } from "react";

import AlertPrice  from '../containers/AlertPrice';
import AlertNews  from '../containers/AlertNews';
import Grafica from '../containers/Grafica';
import GraphDonutContainer from '../containers/GraphDonutContainer';
import CardContainer from '../containers/CardContainer';
import SimpleTable  from '../containers/SimpleTable';
import Posturas from '../containers/Posturas';
import TablaMovimientos from "../containers/Movimientos";
import TablaMovimientosD from "../containers/MovimientosD"
import OperationsCapital from "../containers/OperationsCapital";
import OperationsFondos from "../containers/OperationsFondos";
import Hechos from '../containers/Hechos';
import Acumulado from '../containers/Acumulado';
import OrdenesCapitales from '../containers/OrdenesCapitales';
import OrdenesFondos from '../containers/OrdenesFondos';
import { Dropdown } from "../containers/Dropdown";
import { DropdownDataTradingMostrar, DropdownDataBolsas } from '../mocks/DropdownData';
import PosturasBolsa from "../containers/PosturasBolsa";
import { IResponse } from '../types/HistoricoTypes';

import {
  SimpleTableData2,
  SimpleTableData1,
  SimpleTableData0,
} from '../mocks/SimpleTableData';

import { GraphDonutData } from '../mocks/GraphDonutData';
import { GraphDonutDataPortafolio } from '../mocks/GraphDonutData';
import CardPagination from "../containers/CardPagination";

export const TabsData = () => {
  return [
    {
      id: "link1",
      title: "Precio",
      content: (
        <AlertPrice alertPriceComponents={""} />
      ),
    },
    {
      id: "link2",
      title: "Eventos",
      content: (
        <AlertNews alertPriceComponents={""} />
      ),
    },
  ];
};

export const TabsOrdenes = () => {
  return [
    {
      id: "link1",
      title: "Capitales",
      content: (
        <div className="flex justify-between flex-row">
            <div className="mr-4">
                <CardContainer typeCard={"capitales"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Tipo de orden"} sub3= {"00 titulo a $0.00"} sub4 ={"Asignada"} sub5={""} />
            </div>
            <div className="mr-4">
                <CardContainer typeCard={"capitales"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Tipo de orden"} sub3= {"00 titulo a $0.00"} sub4 ={"Pendiente"} sub5={""} />
            </div>
            <div className="mr-4">
                <CardContainer typeCard={"capitales"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Tipo de orden"} sub3= {"00 titulo a $0.00"} sub4 ={"Pendiente"} sub5={""} />
            </div>
            <div className="mr-4">
                <CardContainer typeCard={"capitales"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Tipo de orden"} sub3= {"00 titulo a $0.00"} sub4 ={"Pendiente"} sub5={""} />
            </div>
        </div>
      ),
    },
    {
      id: "link2",
      title: "Fondos",
      content: (
        <div className="flex justify-between flex-row">
            <div className="mr-4">
                <CardContainer typeCard={"fondos"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Mercado con protección"} sub3= {"Monto: $000000"} sub4 ={"00/00/00"} sub5={"Pendiente"} />
            </div>
            <div className="mr-4">
                <CardContainer typeCard={"fondos"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Precio promedio del día"} sub3= {"Monto: $000000"} sub4 ={"00/00/00"} sub5={"Asignada"} />
            </div>
            <div className="mr-4">
                <CardContainer typeCard={"fondos"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Precio promedio del día"} sub3= {"Monto: $000000"} sub4 ={"00/00/00"} sub5={"Asignada"} />
            </div>
            <div className="mr-4">
                <CardContainer typeCard={"fondos"} name={"Nombre de la emisora"} sub1= {"Compra"} sub2= {"Precio promedio del día"} sub3= {"Monto: $000000"} sub4 ={"00/00/00"} sub5={"Asignada"} />
            </div>
        </div>
      ),
    },
  ];
};


export const TabNav = () => {
  return [
    {
      content: (
        <CardPagination type={"capitalesPortafolio"} />
      ),
    },
    {
      content: (
        <CardPagination type={"fondos"} />
      ),
    },
  ];
};

export const NavGraficas = ( textNum: any, textPorc: any, valuePorc:any, valueNum:any, ultAct: string, historico: IResponse ) => {
  return [
    {
      content: (
        <div className="bg-white h-full">
          <GraphDonutContainer 
            graphDonutData={GraphDonutDataPortafolio()} 
            textNum={textNum} 
            textPorc={textPorc} 
            valuePorc={valuePorc} 
            valueNum={valueNum} 
            portafolio={true} 
            ultAct={ultAct}
          />
        </div>
      ),
    },
    {
      content: (
        <div className="w-full">
            <div className="h-full">
                <Grafica historico={historico} textNum={textNum}/>
            </div>
        </div>
      ),
    },
  ];
};

export const NavOrdenes = () => {
  return [
    {
      content: (
        <div><OrdenesCapitales /></div>
      ),
    },
    {
      content: (
        <div><OrdenesFondos /></div>
      ),
    },
  ];
};

export const NavPosturas = (profundidadData: any, ric: any, emisora: any, serie: any, servProfundidadActivo: boolean) => {

  if(servProfundidadActivo === true){
    return [
      { content: ( <PosturasBolsa profundidadData={profundidadData} ric={ric} /> ) },
      { content: ( <Hechos emisora={emisora} serie={serie} /> ) },
      { content: ( <Acumulado emisora={emisora} serie={serie} /> ) },
    ];
  }
  else{
    return [
      // { content: ( <PosturasBolsa profundidadData={profundidadData} ric={ric} /> ) }, COMENTADO porque servProfundidadActivo === false
      { content: ( <Hechos emisora={emisora} serie={serie} /> ) },
      { content: ( <Acumulado emisora={emisora} serie={serie} /> ) },
    ];
  }
  
};

export const TableTabs = (fondos: any, mercado: any, capitales: any, sendFondoSeleccionado?: (data: string) => void) => {
  return [
    {
      id: 'link1',
      title: 'Mercado de Capitales',
      content: (
        <SimpleTable
          key={Math.random()}
          extend={false}
          color='red'
          tabsData={SimpleTableData0()}
          positionValue={capitales}
          portfalioValue={true}
          type={"capitales"}
        />
      ),
    },
    {
      id: 'link2',
      title: 'Fondos de Inversión',
      content: (
        <SimpleTable
          key={Math.random()}
          extend={false}
          color='red'
          tabsData={SimpleTableData1()}
          positionValue={fondos}
          portfalioValue={true}
          type={"fondos"}
          sendEmisoraSeleccionada={sendFondoSeleccionado}
        />
      ),
    },
  ];
};

export const TabsIssuer = () => {
  return [
    {
      id: "link1",
      title: "OPERATIVIDAD",
      content: (
        <div className="mx-2 text-xs">
          <div className="flex justify-between font-bold border-b-2 border-gray-300 pb-2">
            <p>Descripción</p>
            <p>Valor</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Último Precio</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Variación</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Precio de inicio</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Precio min</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Precio max</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Volumen</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Operaciones</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Hora</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Postura de compra</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Postura de venta</p>
            <p>Body</p>
          </div>
          <button className="w-full my-3 bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
            Ver emisora
          </button>
        </div>
      ),
    },
    {
      id: "link2",
      title: "HECHOS",
      content: (
        <div className="text-xs">
          <div className="flex font-bold text-center">
            <p className="w-1/5">Comprar</p>
            <p className="w-1/5">Vender</p>
            <p className="w-1/5">Precio</p>
            <p className="w-1/5">Volumen</p>
            <p className="w-1/5">Hora</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <div className="flex text-center">
            <p className="w-1/5">CS</p>
            <p className="w-1/5">MS</p>
            <p className="w-1/5">$000.00</p>
            <p className="w-1/5">200</p>
            <p className="w-1/5">12:35:00</p>
          </div>
          <button className="w-full my-3 bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
            Ver emisora
          </button>
        </div>
      ),
    },
    {
      id: "link2",
      title: "ACERCA DE",
      content: (
        <div className="mx-2">
          <div className="border-b-2 border-gray-300 py-2 text-xs">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ac, cras penatibus quis hendrerit viverra blandit sed. Vitae imperdiet velit tellus enim.</p>
          </div>
          <div className="flex">
            <div className="flex flex-col w-1/2">
              <div className="my-2">
                <p className="text-xs">Nombre Apellido</p>
                <p className="text-xxs text-gray-500">CEO</p>
              </div>
              <div className="my-2">
                <p className="text-xs">Florida, EUA</p>
                <p className="text-xxs text-gray-500">Ubicación</p>
              </div>
              <div className="my-2">
                <p className="text-xs">$00,000.00</p>
                <p className="text-xxs text-gray-500">Valor de Mercado</p>
              </div>
              <div className="my-2">
                <p className="text-xs">$000.00</p>
                <p className="text-xxs text-gray-500">Precio max (52 S)</p>
              </div>
              <div className="my-2">  
                <p className="text-xs">$000,000,000.00</p>
                <p className="text-xxs text-gray-500">Vol. Promedio</p>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="my-2">
                <p className="text-xs">2014</p>
                <p className="text-xxs text-gray-500">Año de Fundación</p>
              </div>
              <div className="my-2">
                <p className="text-xs">100</p>
                <p className="text-xxs text-gray-500">Empleados</p>
              </div>
              <div className="my-2">
                <p className="text-xs">$00,000.00</p>
                <p className="text-xxs text-gray-500">Ventas Netas</p>
              </div>
              <div className="my-2">
                <p className="text-xs">$000.00</p>
                <p className="text-xxs text-gray-500">Precio mmin (52 S)</p>
              </div>
              <div className="my-2">  
                <p className="text-xs">$000.00</p>
                <p className="text-xxs text-gray-500">Vol. Total</p>
              </div>
            </div>
          </div>
          <button className="w-full my-3 bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
            Ver emisora
          </button>
        </div>
      ),
    },
  ];
};

export const NavMovimientos = () => {
  return [
    {
      content: (
        <div>
          <TablaMovimientos />
        </div>
      ),
    },
    {
      content: (
        <TablaMovimientosD />
      ),
    },
  ];
};

