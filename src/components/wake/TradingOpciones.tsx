import React, { useState, useEffect } from "react";

import PrincipalesIndicadoresComponent from "../../containers/PrincipalesIndicadores";
import Ordenes from "../../containers/Ordenes";

const TradingOpciones = () => {
  return (
    <div className="bg-gray-100 h-full">
      <div className="p-3" style={{ width: "74.25%" }}>
        <div className="my-5 container justify-around">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="col-10">
              <h1 className="font-sans text-lg text-gray-800 font-semibold border-b-2 border-gray-300 pb-2 mb-4 mt-4">
                Principales Indicadores
              </h1>
              <PrincipalesIndicadoresComponent />
            </div>
            <div className="my-4">
              <Ordenes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingOpciones;
