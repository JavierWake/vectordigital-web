import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import '../../styles/ChartIndicadoresAnalisisFundamental.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 328,
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

const ChartIndicadoresAnalisisFundamental = ( { resultados, general, efectivo } ) =>{
  const [textChart, setTextChart] = useState({
    barra1: "",
    barra2: "",
    hover:{
      title:"",
      element1:"",
      element2:"",
    }
})

  useEffect(()=>{
    if(resultados){
      setTextChart({
        ...textChart,
        barra1: "VENTAS",
        barra2: "RESULTADO NETO",
        hover:{
          title:"Ventas/Resultado Neto",
          element1:"Ventas",
          element2:"Resultado Neto",
        }
      })
    } else if(general){
      setTextChart({
        ...textChart,
        barra1: "Total Activo",
        barra2: "Total Pasivo",
        hover:{
          title:"Activo / Pasivo",
          element1:"Total Activo",
          element2:"Total Pasivo",
        }
      })
    } else if(efectivo){
      setTextChart({
        ...textChart,
        barra1: "Efectivo",
        barra2: "Cambio Neto de Efectivo",
        hover:{
          title:"Efectivo / Cambio Neto de Efectivo ",
          element1:"Efectivo",
          element2:"Incremento/ Disminución Neta de Efectivo Neto",
        }
      })
    }
  },[])

  const DataChart = ({title, elemnt1Title, element1Value, elemnt2Title, element2Value}) =>{
    return(
      <div className='data-chart bg-white py-3 px-4 rounded border border-slate-500'>
          <h4 className='font-semibold text-red-600 mb-2'>{title}</h4>
      {/* Element 1 */}
          <p className='flex justify-between mb-1'>
            <samp className='font-semibold'>{elemnt1Title}</samp> 
            <span>{element1Value}</span></p> 
      {/* Element 2 */}
          <p className='flex justify-between'>
            <samp className='font-semibold'>{elemnt2Title}</samp> 
            <span>{element2Value}</span>
          </p>
      </div>
    )
  }


    return  (
        <div className='chart-analisis-fundamental__container'>
          <p className='chart-analisis-fundamental__values--y'>
            <span className='text-sm font-medium'>150B</span>
            <span className='text-sm font-medium'>100B</span>
            <span className='text-sm font-medium'>50B</span>
            <span className='text-sm font-medium'>0B</span>
          </p>

          <div className={`chart-analisis-fundamental__barra__container ${efectivo && "graph-efectivo"}`}>
            <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
                <div 
                  className="chart-analisis-fundamental__barra p-1 border-l-4 rounded-r-md mb-3"
                  style={{
                    width: `${90}%`
                  }}
                >
                  <samp className='chart-analisis-fundamental__barra__text text-red-600'>{textChart.barra1}</samp>
                </div>
              </HtmlTooltip>
              <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
              <div 
                className="chart-analisis-fundamental__barra chart-bg--black p-1 border-l-4 rounded-r-md mb-9"
                style={{
                  width: `${80}%`
                }}
              >
                <span className={`chart-analisis-fundamental__barra__text text-blue-950 ${efectivo && "font-9"}`}>{textChart.barra2}</span>
              </div>
              </HtmlTooltip>

              <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
                <div 
                  className="chart-analisis-fundamental__barra p-1 border-l-4 rounded-r-md mb-3"
                  style={{
                    width: `${70}%`
                  }}
                >
                  <samp className='chart-analisis-fundamental__barra__text text-red-600'>{textChart.barra1}</samp>
                </div>
              </HtmlTooltip>
              <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
                <div 
                  className="chart-analisis-fundamental__barra chart-bg--black p-1 border-l-4 rounded-r-md mb-9"
                  style={{
                    width: `${65}%`
      
                  }}
                >
                  <span className={`chart-analisis-fundamental__barra__text text-blue-950 ${efectivo && "font-9"}`}>{textChart.barra2}</span>
                </div>
              </HtmlTooltip>

              <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
                <div 
                  className="chart-analisis-fundamental__barra p-1 border-l-4 rounded-r-md mb-3"
                  style={{
                    width: `${50}%`
                  }}
                >
                  <samp className='chart-analisis-fundamental__barra__text text-red-600'>{textChart.barra1}</samp>
                </div>
              </HtmlTooltip>
              <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
                <div 
                  className="chart-analisis-fundamental__barra chart-bg--black p-1 border-l-4 rounded-r-md mb-9"
                  style={{
                    width: `${45}%`
                  }}
                >
                  <span className={`chart-analisis-fundamental__barra__text text-blue-950 ${efectivo && "font-9"}`}>{textChart.barra2}</span>
                </div>
              </HtmlTooltip>

              <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
                <div 
                  className="chart-analisis-fundamental__barra p-1 border-l-4 rounded-r-md mb-3"
                  style={{
                    width: `${40}%`
                  }}
                >
                  <samp className='chart-analisis-fundamental__barra__text text-red-600'>{textChart.barra1}</samp>
                </div>
              </HtmlTooltip>
              <HtmlTooltip
                title={
                  <DataChart
                  title={textChart.hover.title}
                  elemnt1Title={textChart.hover.element1}
                  element1Value="$2,000,000" 
                  elemnt2Title={textChart.hover.element2}
                  element2Value = "$500,000"
                />
              }>
                <div 
                  className="chart-analisis-fundamental__barra chart-bg--black p-1 border-l-4 rounded-r-md mb-8"
                  style={{
                    width: `${35}%`
                  }}
                >
                  <span className={`chart-analisis-fundamental__barra__text text-blue-950 ${efectivo && "font-9"}`}>{textChart.barra2}</span>
                </div>
              </HtmlTooltip>
          </div>

          <p className='chart-analisis-fundamental__values--x'>
            <span className='text-sm font-medium'>Dec 20</span>
            <span className='text-sm font-medium'>Mar 21</span>
            <span className='text-sm font-medium'>Jun 21</span>
            <span className='text-sm font-medium'>Sep 21</span>
          </p>
        </div>
      );
}
 
export default ChartIndicadoresAnalisisFundamental

