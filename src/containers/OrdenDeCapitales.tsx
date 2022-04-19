import React, { useEffect, useState } from 'react';

import { BsTrash } from "react-icons/bs";
import { tdsOrdenesCap } from "../types/OrdenesTypes";

import ModalModificarOrden from "./ModalModificarOrden";
import ModalEliminarOrden from "./ModalEliminarOrden";

//State of the component
interface propsFromState {
  ordenCap: tdsOrdenesCap;
  nombreDeLaEmpresa: string;
  volverCargarApiOrdenes: () => void;
}

type AllProps = propsFromState;

const OrdenDeCapitales: React.FC<AllProps> = ({
  ordenCap,
  nombreDeLaEmpresa,
  volverCargarApiOrdenes,
}) => {
  //console.log("entro ordenDeCap");

  //HOOKS
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const sendModalEditar = (data: boolean) => {
    if (data === modalEditar) {
      return;
    }
    setModalEditar(data);
  };

  const sendModalEliminar = (data: boolean) => {
    if (data === modalEliminar) {
      return;
    }
    setModalEliminar(data);
  };

  const abrirModalDeOrden = () => {
    if (/*ordenCap.puedeCancelar === true &&*/ modalEliminar === false) {
      //abrimos modal
      //console.log("abrir modal cancelar");
      sendModalEditar(true);
      //setModalEliminar(false);
    } else {
      //no abrimos modal porque no se puede cancelar
      //console.log("no abrir modal cancelar");
    }
  };

  return (
    <div className="flex w-full justify-between items-center pb-2 border-b-2 mt-2 hover:shadow-xl px-2 py-2 ">
      <div
        onClick={abrirModalDeOrden}
        className={
          "flex flex-row w-22/24 justify-between items-center hover:cursor-pointer" /*+
          (ordenCap.puedeCancelar === true ? "hover:cursor-pointer" : "")*/
        }
      >
        <div className="w-3/24">
          <p className="text-sm">{ordenCap.folio}</p>
          <p className="text-gray-400 text-xs">{ordenCap.Fecha}</p>
        </div>
        <div className="w-6/24">
          <p className="uppercase text-sm">{ordenCap.emisora}</p>
          <p className="text-xs text-gray-400">{nombreDeLaEmpresa}</p>
        </div>
        <div className="w-4/24">
          <p className="font-semibold text-sm">{ordenCap.Instruccion}</p>
          <p className="text-sm">{ordenCap.tipoorden}</p>
        </div>
        <div className="text-right w-6/24">
          <p className="text-sm">
            {ordenCap.sTitulos} títulos a{" "}
            <span className="font-semibold">{ordenCap.precio}</span>
          </p>
          <p className="text-sm text-gray-400">{ordenCap.sMonto}</p>
        </div>
        <div className="text-right w-5/24">
          <p className="text-sm font-bold" style={{ color: "#283f72" }}>
            {ordenCap.estatusDesc}
          </p>
          <p className="text-sm text-gray-400">
            {ordenCap.TitulosAsign} títulos Asignados
          </p>
        </div>
      </div>

      <div 
        className="w-2/24 h-full flex items-right pl-5 hover:cursor-pointer hover:text-red-600"
        onClick={() => {
          if(ordenCap.puedeCancelar === false){
            abrirModalDeOrden();
          }
          else{
            sendModalEliminar(true);
          }
        }}
      >
        {ordenCap.puedeCancelar === true ? (
          // <MdModeEdit className="icon cursor-pointer mr-1" style={{color: "#999", margin:0, width:"18px"}}/>
          // <ModalView titleButton={"Detalle"} titleLabel={"Detalle"} type={"ordenes"} hora={node.Hora} issuer={true} />
          <BsTrash
            className="text-gray-500 text-xl hover:cursor-pointer hover:text-red-600"
            data-toggle="toggle"
          />
        ) : (
          <div></div>
        )}
      </div>
      {modalEditar === true && (
        <ModalModificarOrden
          ordenCap={ordenCap}
          modalOpen={modalEditar}
          setModalOpen={(data: boolean) => sendModalEditar(data)}
          //openModalEliminar={modalEliminar}
          setOpenModalEliminar={(data: boolean) => sendModalEliminar(data)}
          volverCargarApiOrdenes={() => volverCargarApiOrdenes()}
        />
      )}
      {modalEliminar === true && (
        <ModalEliminarOrden
          ordenCap={ordenCap}
          openModalEliminar={modalEliminar}
          setOpenModalEliminar={(data: boolean) => sendModalEliminar(data)}
          volverCargarApiOrdenes={() => volverCargarApiOrdenes()}
        />
      )}
    </div>
  );
};

export default OrdenDeCapitales;