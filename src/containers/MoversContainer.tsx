import React, { useEffect, useState } from 'react';
import { IMoversData } from '../types/MoversType';
import CardContainer from '../containers/CardContainer';

import { MdKeyboardArrowLeft,  MdKeyboardArrowRight } from "react-icons/md";
import Loading from '../components/Loading';


interface propsFromState {
    movers: IMoversData[];
    moversLoading: boolean;
}

type AllProps = propsFromState; 

const MoversContainer: React.FC<AllProps> = ({ movers, moversLoading }) => {

    const [ index, setIndex ] = useState(1);
    const [ paginas, setPaginas ] = useState(1);
    const [ isDisabledI, setDisabledI ] = useState(true);
    const [ isDisabledD, setDisabledD ] = useState(true);
    const [ isBetween, setBetween ] = useState(false);

    useEffect(() => {
        if(movers?.length != null) {
            let resultado = Math.ceil(movers?.length/10);
            setPaginas(resultado);

            if( movers?.length%10 != 0 ) {
                setBetween(true);
            } else {
                setBetween(false);
            }

            if(resultado > 1) {
                setDisabledD(false);
            }
        }
    }, [ movers?.length ]);

    if(moversLoading !== undefined){
        if(moversLoading === true){
            return <Loading />
        }
    }

    if(movers !== undefined){
        if(movers.length === 0){
            return <div className="my-2">
                <p className="text-sm text-gray-500">No hay datos. Intenta más tarde.</p>
            </div>;
        }
    }
      
    return(
        <div className="container" >
            <div className={"flex " + (isBetween ? index === paginas ? " space-around " : " justify-between " : index === paginas ? " space-around " : " justify-between ") + ""}>
                {  
                    movers?.length === 0 ? "" : 
                    movers?.filter( list => list.tendencia === "ALZA" ).slice((index-1)*5, index*5).map((capital: any, index: any)=> {
                        return(
                            <div className="mr-4 lg:mr-2">
                                <CardContainer typeCard={"movers"} name={capital.descripcion} sub1= {""} sub2= {""} sub3= {capital.ptjevar + "%"} sub4 ={"$ "+capital.precioactual } sub5={capital.tendencia} />
                            </div>
                        );
                    })
                }
            </div>
            <div className={"flex " + (isBetween ? index === paginas ? " space-around " : " justify-between " : index === paginas ? " space-around " : " justify-between ") + "my-4"}>
                { 
                    movers?.length === 0 ? "" : 
                    movers?.filter( list => list.tendencia === "BAJA" ).slice((index-1)*5, index*5).map((capital: any, index: any)=> {
                        return(
                            <div className="mr-4 lg:mr-2">
                                <CardContainer typeCard={"movers"} name={capital.descripcion} sub1= {""} sub2= {""} sub3= {capital.ptjevar + "%"} sub4 ={"$ "+capital.precioactual } sub5={capital.tendencia} />
                            </div>
                        );
                    })
                }
            </div>
            {
                movers?.length !== 0 && paginas !== 1 && <div className="flex justify-center my-8">
                    <ul className="flex items-center">
                        <li className="flex items-center cursor-pointer">
                            <button onClick={() => { setIndex(index-1); if((index-1) === 1) setDisabledI(true); setDisabledD(false) }}  disabled={isDisabledI}>
                                <MdKeyboardArrowLeft className={"font-bold text-2xl text-gray-500 rounded-xl " + (isDisabledI ? "" : "hover:bg-gray-300")} />
                            </button>
                        </li>
                        <li className="flex items-center cursor-pointer mx-4">
                            <p className="text-gray-500">
                                { index } de { paginas }
                            </p>
                        </li>
                        <li className="flex items-center cursor-pointer">
                            <button  onClick={() => { setIndex(index+1); if((index+1) === paginas ) setDisabledD(true); setDisabledI(false) }}  disabled={isDisabledD}>
                                <MdKeyboardArrowRight className={"font-bold text-2xl text-gray-500 rounded-xl " + (isDisabledD ? "" : "hover:bg-gray-300")}/>
                            </button>                        
                        </li>
                    </ul>
                </div>
            }
        </div>
    );
}


export default MoversContainer;
