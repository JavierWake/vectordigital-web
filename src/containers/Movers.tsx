import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

//Containers
import MoversContainer from '../containers/MoversContainer';

//Actions to call redux store
import { getMoversRequest } from '../actions/moversAction';
import { MoversState } from '../types/MoversType';
import { RootState } from '../reducers/rootReducer';

interface propsFromState {
    //ctaCto: string;
    paramsParaMovers: string[];
    servTiempoRealActivo: boolean;
    moversState?: MoversState;
}

type AllProps = propsFromState; 

const Movers: React.FC<AllProps> = ({ paramsParaMovers, servTiempoRealActivo, moversState }) => {

    const dispatch = useDispatch();

    //HOOKS
    const [ultActualizacionMovers, setUltActualizacionMovers] = useState<string | undefined>(undefined);

    const sendUltActualizacionMovers = (data: string | undefined) => {
        if(ultActualizacionMovers === data){
            return;
        }
        setUltActualizacionMovers(data);
    };

    useEffect(() => {
        //console.log("primer useEffect movers");
        //console.log(paramsParaMovers);
        //console.log(servTiempoRealActivo);
        if(paramsParaMovers.length > 0){
            let message = "cap/mercadomayorescambios?filtro=";
            dispatch(getMoversRequest({message, params: paramsParaMovers})); //Movers API
        }

    }, []);

    useEffect(() => {
        //console.log("cambios en paramsParaMovers y servTiempoRealActivo");
        //console.log(paramsParaMovers);
        //console.log(servTiempoRealActivo);
        if(paramsParaMovers.length > 0){
            //console.log("dispatch movers");
            let message = "cap/mercadomayorescambios?filtro=";
            dispatch(getMoversRequest({message, params: paramsParaMovers})); //Movers API

            if(servTiempoRealActivo === true){
                //actualizamos hora
                let ahoraDateAntesDeInterval = new Date;
                const horasFormateadasAntesDeInterval = ahoraDateAntesDeInterval.getHours().toString().length === 1 ? "0" + ahoraDateAntesDeInterval.getHours().toString() : ahoraDateAntesDeInterval.getHours().toString();
                const minutosFormateadosAntesDeInterval = ahoraDateAntesDeInterval.getMinutes().toString().length === 1 ? "0" + ahoraDateAntesDeInterval.getMinutes().toString() : ahoraDateAntesDeInterval.getMinutes().toString();
                const segundosFormateadosAntesDeInterval = ahoraDateAntesDeInterval.getSeconds().toString().length === 1 ? "0" + ahoraDateAntesDeInterval.getSeconds().toString() : ahoraDateAntesDeInterval.getSeconds().toString();
                sendUltActualizacionMovers(horasFormateadasAntesDeInterval + ":" + minutosFormateadosAntesDeInterval + ":" + segundosFormateadosAntesDeInterval);
                
                //mandamos a llamar el api de movers cada min
                //console.log("inicia setInterval para movers api");
                let timerId: number = setInterval(() => {
                    //console.log("dispatch movers");
                    let message = "cap/mercadomayorescambios?filtro=";
                    dispatch(getMoversRequest({message, params: paramsParaMovers})); //Movers API
                    
                    let ahoraDate = new Date;
                    const horasFormateadas = ahoraDate.getHours().toString().length === 1 ? "0" + ahoraDate.getHours().toString() : ahoraDate.getHours().toString();
                    const minutosFormateados = ahoraDate.getMinutes().toString().length === 1 ? "0" + ahoraDate.getMinutes().toString() : ahoraDate.getMinutes().toString();
                    const segundosFormateados = ahoraDate.getSeconds().toString().length === 1 ? "0" + ahoraDate.getSeconds().toString() : ahoraDate.getSeconds().toString();
                    sendUltActualizacionMovers(horasFormateadas + ":" + minutosFormateados + ":" + segundosFormateados);
                }, 60000 /* cada 60 seg, es decir, cada 1 min */);

                return () => {
                    //este codigo se ejecuta cuando se hace unmount de este componente
                    //console.log("unmount movers");
                    //console.log(servTiempoRealActivo);
                    //console.log(timerId);
                    sendUltActualizacionMovers(undefined);
        
                    if(servTiempoRealActivo === true){
                        //limpiamos interval de movers
                        clearInterval(timerId);
                    }
                };

            }
        }

    }, [paramsParaMovers, paramsParaMovers.length, servTiempoRealActivo]);

    return(
        <div className="">
            <div className="w-full">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="font-sans text-xl text-gray-800 font-medium">Movers</h1>
                    <div>
                        {
                            ultActualizacionMovers !== undefined && <p className="text-xs text-gray-500 pb-2">Últ. Actualización {ultActualizacionMovers}</p>
                        }
                    </div>
                </div>
                <h1 className="text-sm font-semibold border-b border-gray-300 pb-2 mb-4"></h1> {/* esta es la linea gris abajo del titulo */}
            </div>
            {
                moversState !== undefined ?
                    <MoversContainer movers={moversState.moversList} moversLoading={moversState.loading} />
                :
                    <div></div>
            }
        </div>
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        moversState: store.moversList,
    };
};

//post dispatch to props
const mapDispatchToProps = (dispatch: any) => {
    return {
        getMoversRequest: () => dispatch(getMoversRequest(dispatch)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movers);