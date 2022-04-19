import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../reducers/rootReducer';
import { getDsPortafolioRequest } from '../actions/portfolioAction';
import { PortfolioStatus } from '../types/PortfolioTypes';
import { makeStyles } from '@material-ui/styles';
import { CSVLink, CSVDownload } from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../styles/ConsulTable.css"
import { LoginObjectState } from '../types/LoginObjectTypes';
import Loading from '../components/Loading';
import { postLoginObjectLogout } from '../actions/loginObjectAction';


function Mercado(tipo: string, emisora: string, serie: string, fechaV: any, fechaI: any, dias: any, calificacion: any, titulos: any, rendimientoP: string, valor: string, ingresos: any, valorAct: any, interesesC: any, interesesP: any, costo: any) {
  return { tipo, emisora, serie, fechaV, fechaI, dias, calificacion, titulos, rendimientoP, valor, ingresos, valorAct, interesesC, interesesP, costo };
}


function createData(emisora: string, titulos: string, CostoPromedio: any, UltimoPrecio: any, PrecioActual: any, Ganancia: any, GananciaP: any, TitulosVenta: string, TitulosBloqueados: string, ValorMercado: any,) {
  return { emisora, titulos, CostoPromedio, UltimoPrecio, PrecioActual, Ganancia, GananciaP, TitulosVenta, TitulosBloqueados, ValorMercado };
}



const rowsM = [
  Mercado("Body", 'Body', "Body", "Body", "Body", "Body", "Body", "Body", "Body", "Body", "Body", "Body", "  Body", "Body", "Body"),
];



const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});
interface propsFromState {
  loginObject?: LoginObjectState;
  portfolio?: PortfolioStatus;
}
type AllProps = propsFromState;
const ConsultasTable: React.FC<AllProps> = ({ loginObject, portfolio }: propsFromState) => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if(loginObject !== undefined){
      if(loginObject.response.ierror === -1){
        if(loginObject.response.dsLogin.tdsLogin.length > 0){

            const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
    
            if(cuentaSesionLO != 0){
                // mandamos llamar las apis sacando los datos del objeto de login
        
                const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                const canal = "999";
                const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();
                
                let message = "/consulta/portafolio?cuenta=" + cuentaLO;
                let params = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                let a = { message, params }
                dispatch(getDsPortafolioRequest(a));
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en consultastable, lo mandamos al login");
            history.push("/");
        }
    }
    else{
      if(loginObject.response.ierror === 92) {
        dispatch(postLoginObjectLogout());
        history.push("/");
      } else {
        //el usuario no esta loggeado, lo mandamos al login
        console.log("usuario no loggeado en appbar, lo mandamos al login");
        history.push("/");
      }
    }
    }
    else{
      //el usuario no esta loggeado, lo mandamos al login
      console.log("usuario no loggeado en consultastable, lo mandamos al login");
      history.push("/");
    }
},[]);

  /*useEffect(() => {
    if (portfolio?.dsPortafolio != null)
      //console.log(portfolio?.dsPortafolio)
  }, [portfolio?.dsPortafolio])*/

  const resp = portfolio?.dsPortafolio.tdsPortafolioCap;

  /*if (resp != null)
    resp.forEach((id: any) => { delete id.Cuenta; delete id.Serie; delete id.TitulosActuales; delete id.Descripcion; delete id.PorcComposicion; delete id.ValorMercadoIncial; delete id.EmisoraEncode; delete id.Importe });
  */

  const respFd = portfolio?.dsPortafolio.tdsPortafolioFd;
  /*if (respFd != null)
    respFd.forEach((id: any) => { delete id.Cuenta; delete id.Serie; delete id.TitulosActuales; delete id.Descripcion; delete id.PorcComposicion; delete id.ValorMercadoIncial; delete id.EmisoraEncode; delete id.Importe });
  */


  const total = resp?.reduce(
    (prevValue, currentValue) => prevValue + currentValue.CostoActual,
    0
  );

  const totalG = resp?.reduce(
    (prevValue, currentValue) => prevValue + currentValue.Utilidad,
    0
  );
  const totalVM = resp?.reduce(
    (prevValue, currentValue) => prevValue + currentValue.ValorMercado,
    0
  );



  const totalFD = respFd?.reduce(
    (prevValue, currentValue) => prevValue + currentValue.CostoCompra,
    0
  );

  const totalGFD = respFd?.reduce(
    (prevValue, currentValue) => prevValue + Number(currentValue.Utilidad),
    0
  );
  const totalImporte = respFd?.reduce(
    (prevValue, currentValue) => prevValue + currentValue.ValorMercado,
    0
  );



  const rowsF = [
    createData(" ", " ","", <strong>{total?.toFixed(3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>, " ", <strong>{totalG?.toFixed(3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>, " ", " "," ", <strong>{totalVM?.toFixed(3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>)
  ];
  const rows = [
    createData("", "", "", <strong>{totalFD?.toFixed(3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>, "", <strong>{totalGFD?.toFixed(3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>, "", ""," ", <strong>{totalImporte?.toFixed(3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</strong>)
  ];

  if(portfolio?.loading === true){
    return <Loading />;
  }

  var today = new Date();
  var time = /* " El " + today.getDay() + "/ " + (today.getMonth() + 1) + "/" + today.getFullYear() + */ "Hoy a las  " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const Mercado = portfolio?.dsPortafolio.tdsPortafolioMd
  if (Mercado == []) {

    return (
      <div>
        <div className="flex flex-col">
          <div className="font-Roboto text-sm flex flex-row justify-between">
            <p className="my-2 text-red-600 font-bold">Detalles del portafolio al momento </p>
            <p className="text-xs text-right text-gray-500">Últ. actualización: {time}</p>
          </div>
          <div className="font-Roboto text-sm flex justify-between">
            <p className="my-6 font-mono font-bold text-xl">Mercado de Capitales</p>
            <div className=" my-6 flex justify-end">
                {
                  portfolio && portfolio.dsPortafolio.tdsPortafolioCap.length > 0 && <>
                    <GetAppIcon fontSize="small" className="mt-2 text-red-600" />
                    <CSVLink
                      data={portfolio ? portfolio.dsPortafolio.tdsPortafolioCap : []}
                      headers={[
                        { label: "Emisora", key: "Descripcion" },
                        { label: "Titulos", key: "TitulosDisponibles" },
                        { label: "Costo Promedio", key: "CostoPromedio" },
                        { label: "Costo de Compra", key: "CostoActual" },
                        { label: "Precio Actual", key: "UltimoPrecio" },
                        { label: "Ganancia ($)", key: "Utilidad" },
                        { label: "Ganancia (%)", key: "UtilidadPorc" },
                        { label: "Titulos en Venta", key: "TitulosVenta" },
                        { label: "Titulos Bloqueados", key: "TitulosBloqueados" },
                        { label: "Valor de Mercado", key: "ValorMercado" },]}
                      className="font-bold font-Roboto btn text-red-600 hover:text-red-600 text-sm"
                      filename={"PosicionesCapitales.csv"}
                      asyncOnClick={true}
                    > Descargar Tabla</CSVLink>
                  </>
                }
            </div>
          </div>
          <div className="my-6">
            <TableContainer component={Paper}>
              <Table className={classes.table} size="medium" stickyHeader
                aria-label="sticky table">

                <TableHead className="bg-white">
                  <TableRow>
                    <TableCell  align="center">Emisora</TableCell>
                    <TableCell align="center">Títulos</TableCell>
                    <TableCell  align="center">Costo Promedio</TableCell>
                    <TableCell  align="center">Costo de Compra</TableCell>
                    <TableCell  align="center">Precio Actual</TableCell>
                    <TableCell  align="center">Ganancia ($)</TableCell>
                    <TableCell  align="center">Ganancia (%)</TableCell>
                    <TableCell  align="center">Títulos en Venta</TableCell>
                    <TableCell  align="center">Títulos Bloqueados</TableCell>
                    <TableCell  align="center">Valor de Mercado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    resp?.length === 0 && rowsF.length === 0 && <TableRow className="bg-gray-100">
                      <p className="text-gray-500 py-2">No hay datos.</p>
                    </TableRow>
                  }
                  {resp?.map((resp) => (
                    <TableRow key={resp.Descripcion} className="bg-gray-100">
                      <TableCell component="th" scope="row">
                        {resp.Descripcion}
                      </TableCell>
                      <TableCell align="left">{resp.TitulosDisponibles.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="left">{resp.CostoPromedio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="left">{resp.CostoActual.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="left">{resp.UltimoPrecio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="left">{resp.Utilidad.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="left">{resp.UtilidadPorc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="left">{resp.TitulosVenta}</TableCell>
                      <TableCell align="left">{resp.TitulosBloqueados}</TableCell>
                      <TableCell align="left">{resp.ValorMercado.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    </TableRow>
                  ))}
                  {/*rowsF.map((rowsF) => (
                    <TableRow key={rowsF.emisora} className="bg-gray-100">
                      <TableCell component="th" scope="row">
                        {rowsF.emisora}
                      </TableCell>
                      <TableCell align="left">{rowsF.titulos}</TableCell>
                      <TableCell align="left">{rowsF.CostoPromedio}</TableCell>
                      <TableCell align="left">{rowsF.UltimoPrecio}</TableCell>
                      <TableCell align="left">{rowsF.PrecioActual}</TableCell>
                      <TableCell align="left">{rowsF.Ganancia}</TableCell>
                      <TableCell align="left">{rowsF.GananciaP}</TableCell>
                      <TableCell align="left">{rowsF.TitulosBloqueados}</TableCell>
                      <TableCell align="left">{rowsF.TitulosBloqueados}</TableCell>
                      <TableCell align="left">{rowsF.ValorMercado}</TableCell>
                    </TableRow>
                  ))*/}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className=" font-Roboto text-sm flex justify-between">
          <p className="my-6 font-mono font-bold text-xl">Fondos</p>
          <div className=" my-6 flex justify-end">
            {
              portfolio && portfolio.dsPortafolio.tdsPortafolioFd.length > 0 && <>
                <GetAppIcon fontSize="small" className="mt-2 text-red-600" />
                <CSVLink
                  data={portfolio ? portfolio.dsPortafolio.tdsPortafolioFd : []}
                  headers={[
                    { label: "Emisora", key: "Descripcion" },
                    { label: "Titulos", key: "TitulosDisponibles" },
                    { label: "Costo Promedio", key: "CostoPromedio" },
                    { label: "Costo de Compra", key: "CostoCompra" },
                    { label: "Precio Valuacion", key: "UltimoPrecio" },
                    { label: "Ganancia ($)", key: "Utilidad" },
                    { label: "Ganancia (%)", key: "UtilidadPorc" },
                    { label: "Titulos en Venta", key: "TitulosVenta" },
                    { label: "Titulos Bloqueados", key: "TitulosBloqueados" },
                    { label: "Importe", key: "Importe" },]}
                  className="font-bold font-Roboto btn text-red-600 hover:text-red-600 text-sm"
                  filename={"PosicionesFondos.csv"}
                  asyncOnClick={true}
                > Descargar Tabla</CSVLink>
              </>
            }
          </div>
        </div>

        <div className="my-6">
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" stickyHeader
              aria-label="sticky table">

              <TableHead className="bg-white">
                <TableRow>
                <TableCell  align="center">Emisora</TableCell>
                  <TableCell  align="center">Títulos</TableCell>
                  <TableCell  align="center">Costo Promedio</TableCell>
                  <TableCell  align="center">Costo de Compra</TableCell>
                  <TableCell  align="center">Precio Valuación</TableCell>
                  <TableCell  align="center">Ganancia ($)</TableCell>
                  <TableCell  align="center">Ganancia (%)</TableCell>
                  <TableCell  align="center">Títulos en Venta</TableCell>
                  <TableCell  align="center">Títulos Bloqueados</TableCell>
                  <TableCell  align="center">Importe</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  respFd?.length === 0 && rows.length === 0 && <TableRow className="bg-gray-100">
                    <p className="text-gray-500 py-2">No hay datos.</p>
                  </TableRow>
                }
                {respFd?.map((respFd) => (
                  <TableRow key={respFd.Descripcion} className="bg-gray-100">
                    <TableCell component="th" scope="row">{respFd.Descripcion}</TableCell>
                    <TableCell align="left">{respFd.TitulosDisponibles.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="left">{respFd.CostoPromedio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="left">{respFd.CostoCompra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="left">{respFd.UltimoPrecio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="left">{respFd.Utilidad?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="left">{respFd.UtilidadPorc?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="left">{respFd.TitulosVenta}</TableCell>
                    <TableCell align="left">{respFd.TitulosBloqueados}</TableCell>
                    <TableCell align="left">{respFd.Importe.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                  </TableRow>
                ))}
                {/*rows.map((rows) => (
                  <TableRow key={rows.emisora} className="bg-gray-100">
                    <TableCell component="th" scope="row">
                      {rows.emisora}
                    </TableCell>
                    <TableCell align="left">{rows.titulos}</TableCell>
                    <TableCell align="left">{rows.CostoPromedio}</TableCell>
                    <TableCell align="left">{rows.UltimoPrecio}</TableCell>
                    <TableCell align="left">{rows.PrecioActual}</TableCell>
                    <TableCell align="left">{rows.Ganancia}</TableCell>
                    <TableCell align="left">{rows.GananciaP}</TableCell>
                    <TableCell align="left">{rows.TitulosBloqueados}</TableCell>
                    <TableCell align="left">{rows.TitulosBloqueados}</TableCell>
                    <TableCell align="left">{rows.ValorMercado}</TableCell>
                  </TableRow>
                ))*/}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className=" font-Roboto text-sm flex justify-between">
          <p className="mt-10 font-mono font-bold text-xl">Mercado De Dinero</p>
          <div className=" mt-10 flex justify-end">
            {
              portfolio && portfolio.dsPortafolio.tdsPortafolioFd.length > 0 && <>
                <GetAppIcon fontSize="small" className="mt-2 text-red-600" />
                <CSVLink
                  data={portfolio ? portfolio.dsPortafolio.tdsPortafolioFd : []}
                  headers={[
                    { label: "Tipo", key: "Tipo" },
                    { label: "Emisora", key: "Emisora" },
                    { label: "Serie", key: "Serie" },
                    { label: "Fecha de Vencimiento", key: "fechaV" },
                    { label: "Fecha Inicial", key: "fechaI" },
                    { label: "Dias Transcurridos", key: "dias" },
                    { label: "Calificacion", key: "calificacion" },
                    { label: "Titulos", key: "titulos" },
                    { label: "TitulosBloqueados", key: "TitulosBloqueados" },
                    { label: "Rendimiento Promedio", key: "rendimientos" },
                    { label: "Valor de Inversion", key: "valor" },
                    { label: "Ingresos Acumulados", key: "ingresos" },
                    { label: "Valor Actualizado", key: "valorAct" },
                    { label: "Intereses Corridos", key: "interesesC" },
                    { label: "Intereses Pagados", key: "interesesP" },
                    { label: "Costo Tasas", key: "costo" },]}
                  className="font-bold font-Roboto btn text-red-600 hover:text-red-600 text-sm"
                  filename={"PosicionesMD.csv"}
                  asyncOnClick={true}
                > Descargar Tabla</CSVLink>
              </>
            }
          </div>
        </div>
        <div className="my-6">
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" stickyHeader
              aria-label="sticky table">

              <TableHead className="bg-white">
                <TableRow>
                  <TableCell  align="center">Tipo</TableCell>
                  <TableCell  align="center">Emisora</TableCell>
                  <TableCell align="center">Serie</TableCell>
                  <TableCell  align="center">Fecha de Vencimiento</TableCell>
                  <TableCell  align="center">Fecha Inicial</TableCell>
                  <TableCell  align="center">Días Transcurridos</TableCell>
                  <TableCell  align="center">Calificación</TableCell>
                  <TableCell  align="center">Títulos</TableCell>
                  <TableCell  align="center">Rendimiento Promedio</TableCell>
                  <TableCell  align="center">Valor de Inversión</TableCell>
                  <TableCell  align="center">Ingresos Acumulados</TableCell>
                  <TableCell  align="center">Valor Actualizado</TableCell>
                  <TableCell  align="center">Intereses Corridos</TableCell>
                  <TableCell  align="center">Intereses Pagados</TableCell>
                  <TableCell  align="center">Costo Tasas</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rowsM.length === 0 && <TableRow className="bg-gray-100">
                    <p className="text-gray-500 py-2">No hay datos.</p>
                  </TableRow>
                }
                {rowsM.map((row) => (
                  <TableRow key={row.emisora} className="bg-gray-100">
                    <TableCell component="th" scope="row">
                      {row.tipo}
                    </TableCell>
                    <TableCell align="left">{row.emisora}</TableCell>
                    <TableCell align="center">{row.serie}</TableCell>
                    <TableCell align="left">{row.fechaV}</TableCell>
                    <TableCell align="left">{row.fechaI}</TableCell>
                    <TableCell align="left">{row.dias}</TableCell>
                    <TableCell align="left">{row.calificacion}</TableCell>
                    <TableCell align="left">{row.titulos}</TableCell>
                    <TableCell align="left">{row.rendimientoP}</TableCell>
                    <TableCell align="left">{row.valor}</TableCell>
                    <TableCell align="left">{row.ingresos}</TableCell>
                    <TableCell align="left">{row.valorAct}</TableCell>
                    <TableCell align="left">{row.interesesC}</TableCell>
                    <TableCell align="left">{row.interesesP}</TableCell>
                    <TableCell align="left">{row.costo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <div className="flex flex-col">
          <div className="font-Roboto text-sm flex justify-between my-2">
            <div className="flex flex-col">
              <p className="font-sans text-2xl font-medium">Mercado de Capitales</p>
              <p className="text-xs text-gray-500">Últ. actualización: {time}</p>
            </div>
            <div className="flex flex-row justify-end">
                {
                  portfolio && portfolio.dsPortafolio.tdsPortafolioCap.length > 0 && <>
                    <CSVLink
                      data={portfolio ? portfolio.dsPortafolio.tdsPortafolioCap : []}
                      headers={[
                        { label: "Emisora", key: "Descripcion" },
                        { label: "Titulos", key: "TitulosDisponibles" },
                        { label: "Costo Promedio", key: "CostoPromedio" },
                        { label: "Costo de Compra", key: "CostoActual" },
                        { label: "Precio Actual", key: "UltimoPrecio" },
                        { label: "Ganancia ($)", key: "Utilidad" },
                        { label: "Ganancia (%)", key: "UtilidadPorc" },
                        { label: "Titulos en Venta", key: "TitulosVenta" },
                        { label: "Titulos Bloqueados", key: "TitulosBloqueados" },
                        { label: "Valor de Mercado", key: "ValorMercado" },]}
                      className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                      filename={"PosicionesCapitales.csv"}
                      asyncOnClick={true}
                    > Descargar Tabla</CSVLink>
                  </>
                }
            </div>
          </div>
          <div className="my-2">
            <TableContainer component={Paper}>
              <Table className={classes.table} size="medium" stickyHeader
                aria-label="sticky table">

                <TableHead className="bg-white">
                  <TableRow>
                    <TableCell align="center">Emisora</TableCell>
                    <TableCell align="center">Títulos</TableCell>
                    <TableCell align="center">Costo Promedio</TableCell>
                    <TableCell align="center">Costo de Compra</TableCell>
                    <TableCell align="center">Precio Actual</TableCell>
                    <TableCell align="center">Ganancia ($)</TableCell>
                    <TableCell align="center">Ganancia (%)</TableCell>
                    <TableCell align="center">Títulos en Venta</TableCell>
                    <TableCell align="center">Títulos Bloqueados</TableCell>
                    <TableCell align="center">Valor de Mercado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    resp?.length === 0 && rowsF.length === 0 && <TableRow className="bg-gray-100">
                      <p className="text-gray-500 py-2">No hay datos.</p>
                    </TableRow>
                  }
                  {resp?.map((resp) => (
                    <TableRow key={resp.Descripcion} className="bg-gray-100">
                      <TableCell component="th" scope="row">{resp.Descripcion}</TableCell>
                      <TableCell align="right">{resp.TitulosDisponibles.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="right">{resp.CostoPromedio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="right">{resp.CostoActual.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="right">{resp.UltimoPrecio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="right">{resp.Utilidad.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="right">{resp.UtilidadPorc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                      <TableCell align="right">{resp.TitulosVenta}</TableCell>
                      <TableCell align="right">{resp.TitulosBloqueados}</TableCell>
                      <TableCell align="right">{resp.ValorMercado.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    </TableRow>
                  ))}
                  {rowsF.map((rowsF) => (
                    <TableRow key={rowsF.emisora} className="bg-gray-100">
                      <TableCell component="th" scope="row">
                        {rowsF.emisora}
                      </TableCell>
                      <TableCell align="right">{rowsF.titulos}</TableCell>
                      <TableCell align="right">{rowsF.CostoPromedio}</TableCell>
                      <TableCell align="right">{rowsF.UltimoPrecio}</TableCell>
                      <TableCell align="right">{rowsF.PrecioActual}</TableCell>
                      <TableCell align="right">{rowsF.Ganancia}</TableCell>
                      <TableCell align="right">{rowsF.GananciaP}</TableCell>
                      <TableCell align="right">{rowsF.TitulosBloqueados}</TableCell>
                      <TableCell align="right">{rowsF.TitulosBloqueados}</TableCell>
                      <TableCell align="right">{rowsF.ValorMercado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className=" font-Roboto text-sm flex justify-between my-3">
          <div className="flex flex-col">
            <p className="font-sans text-2xl font-medium">Fondos</p>
            <p className="text-xs text-gray-500">Últ. actualización: {time}</p>
          </div>
          <div className="flex justify-end">
            {
              portfolio && portfolio.dsPortafolio.tdsPortafolioFd.length > 0 && <>
                <CSVLink
                  data={portfolio ? portfolio.dsPortafolio.tdsPortafolioFd : []}
                  headers={[
                    { label: "Emisora", key: "Descripcion" },
                    { label: "Titulos", key: "TitulosDisponibles" },
                    { label: "Costo Promedio", key: "CostoPromedio" },
                    { label: "Costo de Compra", key: "CostoCompra" },
                    { label: "Precio Valuacion", key: "UltimoPrecio" },
                    { label: "Ganancia ($)", key: "Utilidad" },
                    { label: "Ganancia (%)", key: "UtilidadPorc" },
                    { label: "Titulos en Venta", key: "TitulosVenta" },
                    { label: "Titulos Bloqueados", key: "TitulosBloqueados" },
                    { label: "Importe", key: "Importe" },]}
                  className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                  filename={"PosicionesFondos.csv"}
                  asyncOnClick={true}
                > Descargar Tabla</CSVLink>
              </>
            }
          </div>
        </div>

        <div className="my-6">
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" stickyHeader
              aria-label="sticky table">

              <TableHead className="bg-white">
                <TableRow>
                  <TableCell align="center">Emisora&nbsp;</TableCell>
                  <TableCell align="center">Títulos&nbsp;</TableCell>
                  <TableCell align="center">Costo Promedio</TableCell>
                  <TableCell align="center">Costo&thinsp;de Compra</TableCell>
                  <TableCell align="center">Precio Valuación</TableCell>
                  <TableCell align="center">Ganancia ($)</TableCell>
                  <TableCell align="center">Ganancia (%)</TableCell>
                  <TableCell align="center">Títulos&thinsp;en Venta</TableCell>
                  <TableCell align="center">Títulos Bloqueados</TableCell>
                  <TableCell align="center">Importe</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  respFd?.length === 0 && rows.length === 0 && <TableRow className="bg-gray-100">
                    <p className="text-gray-500 py-2">No hay datos.</p>
                  </TableRow>
                }
                {respFd?.map((respFd) => (
                  <TableRow key={respFd.Descripcion} className="bg-gray-100">
                    <TableCell component="th" scope="row">{respFd.Descripcion}</TableCell>
                    <TableCell align="right">{respFd.TitulosDisponibles.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="right">{respFd.CostoPromedio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="right">{respFd.CostoCompra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="right">{respFd.UltimoPrecio.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="right">{respFd.Utilidad?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="right">{respFd.UtilidadPorc?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                    <TableCell align="right">{respFd.TitulosVenta}</TableCell>
                    <TableCell align="right">{respFd.TitulosBloqueados}</TableCell>
                    <TableCell align="right">{respFd.Importe.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                  </TableRow>
                ))}
                {rows.map((rows) => (
                  <TableRow key={rows.emisora} className="bg-gray-100">
                    <TableCell component="th" scope="row">
                      {rows.emisora}
                    </TableCell>
                    <TableCell align="right">{rows.titulos}</TableCell>
                    <TableCell align="right">{rows.CostoPromedio}</TableCell>
                    <TableCell align="right">{rows.UltimoPrecio}</TableCell>
                    <TableCell align="right">{rows.PrecioActual}</TableCell>
                    <TableCell align="right">{rows.Ganancia}</TableCell>
                    <TableCell align="right">{rows.GananciaP}</TableCell>
                    <TableCell align="right">{rows.TitulosBloqueados}</TableCell>
                    <TableCell align="right">{rows.TitulosBloqueados}</TableCell>
                    <TableCell align="right">{rows.ValorMercado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }

}
//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    loginObject: store.loginObjectState,
    portfolio: store.portfolio,
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getDsPortafolioRequest: () => dispatch(getDsPortafolioRequest(dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultasTable);