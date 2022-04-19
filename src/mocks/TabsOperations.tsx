import OperationsCapital from "../containers/OperationsCapital";
import OperationsFondos from "../containers/OperationsFondos";
import React, { useState } from "react";

interface TabsOperationsProps {
  emisora: string;
  serie: string;
  issuerFondo?: string;
  sendOrdenRecibida?: (folio: string, tipoOrden: string, operacion: string, respuestaApi: string) => void ;
}


const TabsOperations = ( emisora, serie, issuerFondo, sendOrdenRecibida ) => {

  return [
    {
      id: "link1",
      title: "Capitales",
      content: ( <OperationsCapital emisoraRecibida={emisora} serieRecibida={serie} sendOrdenRecibida={sendOrdenRecibida} /> )
    },
    {
      id: "link2",
      title: "Fondos",
      content: ( <OperationsFondos issuerFondoSeleccionado={issuerFondo} sendOrdenRecibida={sendOrdenRecibida} /> )
    },
  ];
};

export default TabsOperations;