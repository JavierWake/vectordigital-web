import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "../styles/indicesFx.css";

// Redux
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

//Actions to call redux store
import { getCommoditiesRequest } from '../actions/commoditiesAction';
import { CommoditiesState, IndicesArray } from '../types/CommoditiesType';
import RefinitivMiniGraph from './RefinitivMiniGraph';
import * as apiCall from '../constants';

function crearUrlMiniGraficoParaIFrame (ric: string, tipoActualizacionInfo = "REALTIME", rfAuthToken: string){
  const primeraParteDelUrl = apiCall.REFINITIV_GRAFICA_COMPLEJA; // es el secret que termina en .com/
      
  const typeChart = "mini-chart";
  
  const authToken = rfAuthToken; // aqui va el promiseSsoToken, cuando integre esa lógica
  
  const tipoActualParam = tipoActualizacionInfo !== undefined ? 
      tipoActualizacionInfo === "REALTIME" ? 
          "RT" : "DELAY" 
      : "RT"; 
  //const url: string = `${primeraParteDelUrl}${typeChart}/${encodeURIComponent(ric)}/${tipoActualParam}`;
  const url: string = `${primeraParteDelUrl}${typeChart}/${authToken}/${encodeURIComponent(ric)}/${tipoActualParam}`;
  return url;
}

interface propsFromState {
  commodities: CommoditiesState;
  tipoActualizacionInfo: "REALTIME" | "DELAY";
}

type AllProps = propsFromState; 

const IndiceFx : React.FC<AllProps> = ({ commodities, tipoActualizacionInfo }) => {
  
  const dispatch = useDispatch();

  //HOOKS
  const [refToken, setRefToken] = useState("");
  const [errorApi, setErrorApi] = useState("");
  
  useEffect(() => {
    let message = "commodities";
    let a = { message };
    dispatch(getCommoditiesRequest(a));

    //sacar token de refinitiv
    axios.get(apiCall.NEWS_API+"token", { headers: { 'x-api-key': apiCall.X_API_KEY_NEWS } }).
      then(respuesta => {
        setRefToken(respuesta.data.token);
      }).
      catch(e => {
        console.log("ERROR API:");
        console.log(e);

        setErrorApi(e.toString());
      });

  }, []);

  
  return (
    <div className="grid grid-cols-2">
      {
        commodities.response.fx.map((row: IndicesArray) => {

          console.log("entre ", parseInt(row.variacion))
          let urlParaMiniGraf: string = "";
          if(row.ric.length > 0 && refToken.length > 0){
            urlParaMiniGraf = crearUrlMiniGraficoParaIFrame(row.ric, tipoActualizacionInfo, refToken);
          }

          return( 
            <div key={row.ric} className="border border-slate-100 rounded-l-lg rounded-r-lg">
              <div className="datosDelIndice m-1">
                <h3 className="format ml-2">{row.name}</h3>
                <h4 className="format ml-2">{row.precio}</h4>
              </div>
              <div className="miniGrafDelIndice">
                {
                  (row.ric.length > 0 && refToken.length > 0) && <div className="flex flex-row px-3 pt-2">
                    <div className="w-full">
                      <div className="items-center">
                        <RefinitivMiniGraph esSeccionIndicesFx={true} srcUrl={urlParaMiniGraf} />
                      </div>
                    </div>
                  </div>
                }
                { 
                  /\d/.test(row.variacion.toString()) && (parseFloat(row.variacion.toString()) < 0) ?
                    <h3 className="m-1 format flex justify-end redNumbers">{row.descVariacion}</h3>
                  :
                    <h3 className="m-1 format flex justify-end greenNumbers">{row.descVariacion}</h3>
                }
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

/*         commodities.response.fx.map((row) => (         
          <div className="border border-slate-100 rounded-l-lg rounded-r-lg">
            <div className="m-1">
              <h3 className="format ml-2">{row.name}</h3>
              <h4 className="format ml-2">{row.precio}</h4>
            </div>
            <div>
              { 
                /\d/.test(row.variacion.toString()) && parseInt(row.variacion.toString()) < 0 ?
                  <h3 className="m-1 format flex justify-end redNumbers">{row.variacion}</h3>
                :
                  <h3 className="m-1 format flex justify-end greenNumbers">{row.variacion}</h3>
              }
            </div>
          </div>
        ))
      }

  )
}; */

const mapStateToProps = (store: RootState) => {
  return {
    commodities: store.commodities
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
      getCommoditiesRequest: () => dispatch(getCommoditiesRequest(dispatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndiceFx);