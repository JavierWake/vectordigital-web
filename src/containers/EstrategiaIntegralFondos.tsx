import React from 'react';
import FondosCard from './FondoCard';
import { ITdsFondoData } from '../types/FondosEstrategiaIntegralTypes';

//State of the component
interface propsFromState {
    //listaFondos: IFondosFamiliasData[];//POR MIENTRAS ANY, PERO DEBO PONER EL TYPE EN TYPES
    estrategiaIntFondos: ITdsFondoData[];
    sendFondoSeleccionado: (data: string) => void;
}

type AllProps = propsFromState;

const EstrategiaIntegralFondos: React.FC<AllProps> = ({estrategiaIntFondos, sendFondoSeleccionado}) =>{

    return(
        <div className="w-full flex flex-col ">
            <h1 className="font-sans text-sm text-black mt-2 mb-3">Fondos destacados por estrategia de inversión</h1>
            {/*<h1 className="font-sans text-sm text-gray-500 mt-2 mb-8">Fondos destacados por estrategia de inversión</h1>*/}
            <div className="flex flex-row flex-wrap justify-between">
                {/*ESTA INFO VA A VENIR DE UN API QUE VA A HACER MARIO
                    FondosCardData.map(function (item: any) {
                        return <FondosCard key={item.title} item={item} />
                    })
                */}
                {
                    estrategiaIntFondos.length === 0 ?
                        <p className="text-sm text-gray-600 py-4">No hay datos por el momento, intenta más tarde.</p>
                    :
                        estrategiaIntFondos.map((fondo: ITdsFondoData) => {
                            return(
                                <FondosCard key={fondo.Emisora + "." + fondo.Serie} sendFondoSeleccionado={sendFondoSeleccionado} item={fondo} />
                            );
                        })
                }
            </div>
        </div>
    );
 }

export default EstrategiaIntegralFondos;