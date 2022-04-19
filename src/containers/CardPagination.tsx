import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { EmisorasSimilaresState } from '../types/EmisorasSimilaresTypes';
import { OrdenesStatus } from '../types/OrdenesTypes';
import CardContainer from '../containers/CardContainer';
import { getDsOrdenesRequest } from '../actions/ordenesAction';
import { MdKeyboardArrowLeft,  MdKeyboardArrowRight } from "react-icons/md";


interface propsFromState {
    type: string;
    similares?: EmisorasSimilaresState;
    ordenes?: OrdenesStatus;
}

type AllProps = propsFromState; 


const CardPagination: React.FC<AllProps> = ({ ordenes, similares, type }) => {

    const dispatch = useDispatch();
    const [ index, setIndex ] = useState(1);
    const [ paginas, setPaginas ] = useState(1);
    const [ isDisabledI, setDisabledI ] = useState(true);
    const [ isDisabledD, setDisabledD ] = useState(true);
    const [ isBetween, setBetween ] = useState(false);
    let titulos:string = "";
    let listas:any;
    let estado:any;

    switch(type) {
        case "similares":
            console.log("Similares ", similares);
            listas = similares?.similares;
            break;

        case "capitalesPortafolio":
            listas = ordenes?.tdsOrdenesCap;
            break;

        case "fondos":
            listas = ordenes?.tdsOrdenesFd;
            break;
            
        default:
            listas = [];
    }


    switch(type) {
        case "capitalesPortafolio":
            estado = ordenes?.tdsOrdenesEstado[0].estatusCap;
            break;

        case "fondos":
            estado = ordenes?.tdsOrdenesEstado[0].estatusFI;
            break;
            
        default:
            estado = true;
    }

    useEffect(() => {
        if(listas.length != null ) {
            let resultado = Math.ceil(listas.length/4);
            setPaginas(resultado);

            if( listas.length % 4 != 0 ) {
                setBetween(true);
            } else {
                setBetween(false);
            }

            if(resultado > 1) {
                setDisabledD(false);
            }
        }
    }, [listas.length]);
      
    return(
        <div>
            <div className={"flex justify-between " + " mr-2 w-full"} >
                { 
                    !estado ?
                    <div className="flex items-center text-center">
                        <h1 className="text-gray-700 text-md text-center">
                            No hay datos
                        </h1>
                    </div>
                    :
                    listas.slice((index-1)*4, index*4).map((capital: any, index: any)=> {
                        if(capital.titulos > 1) {
                            titulos = "titulos";
                        } else {
                            titulos = "titulo";
                        }
                        return(
                            <div className="mr-4 lg:mr-2">
                                {
                                    type === "capitalesPortafolio" ?
                                        <CardContainer typeCard={"portafolio"} name={capital.emisora} sub1= {capital.Instruccion} sub2= {capital.tipoorden} sub3= {capital.titulos +" "+ titulos + " a "+ capital.precio} sub4 ={capital.estatusDesc} sub5={capital.Hora} subEditar={capital.puedeCancelar} />
                                    :
                                        type === "fondos" ? 
                                            <CardContainer typeCard={"fondos"} name={capital.fondo} sub1= {capital.tipoTransaccion} sub2= {""} sub3= {"Monto: "+capital.monto} sub4 ={capital.FecAplic} sub5={capital.descEstado} />
                                        
                                            : 
                                                <CardContainer typeCard={"emisoras"} name={capital.name} sub1= {capital.ticker} sub2= {""} sub3= {Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(capital.last) + " " + capital.currency} sub4 ={capital.percentage} sub5={""} />
                                }
                            </div>
                        );
                    })
                }
            </div>
            {
                listas[0].title === "" ?
                    "" 
                :
                    <div className="flex justify-center mt-8">
                        <ul className="flex items-center">
                            <li className="flex items-center cursor-pointer">
                                <button onClick={() => { setIndex(index-1); if((index-1) === 1) setDisabledI(true); setDisabledD(false) }}  disabled={isDisabledI}>
                                    <MdKeyboardArrowLeft className={"font-bold text-2xl text-gray-500 rounded-xl " + (isDisabledI ? "" : "hover:bg-gray-300")} />
                                </button>
                            </li>
                            <li className="flex items-center mx-4">
                                <p className="text-gray-500">
                                    { index } de { paginas }
                                </p>
                            </li>
                            <li className="flex items-center cursor-pointer">
                                <button  onClick={() => { setIndex(index+1); if((index+1) === paginas ) setDisabledD(true); setDisabledI(false) }}  disabled={isDisabledD}>
                                    <MdKeyboardArrowRight className={"font-bold text-2xl text-gray-500 rounded-xl " + (isDisabledD ? "" : "hover:bg-gray-300") }/>
                                </button>                        
                            </li>
                        </ul>
                    </div>
            }
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        similares: store.emisorasSimilares,
        ordenes: store.ordenes,
    };
};

export default connect(mapStateToProps, null)(CardPagination);