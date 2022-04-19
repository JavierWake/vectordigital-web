import React from 'react';

//State of the component
interface propsFromState {
    data: any;
    data2?: any;
}

type AllProps = propsFromState;

const IssuerTable: React.FC<AllProps> = ({ data, data2 }) => {
    
    return(
        <div className="mx-2 text-sm">
          <div className="flex justify-between font-bold border-b-2 border-gray-300 pb-2">
            <p>Descripción</p>
            <p>Valor</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Último Precio</p>
            <p>{data2[0]?.actual}</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Variación</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Precio de inicio</p>
            <p>{data2[0]?.initial}</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Precio min</p>
            <p>{data.min}</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Precio max</p>
            <p>{data.max}</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Volumen</p>
            <p>{data2[0]?.vol}</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Operaciones</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Hora</p>
            <p>{data2[0]?.trade_time}</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Postura de compra</p>
            <p>Body</p>
          </div>
          <div className="flex justify-between border-b-2 border-gray-300 py-2">
            <p>Postura de venta</p>
            <p>Body</p>
          </div>
        </div>
    );
}

export default IssuerTable;