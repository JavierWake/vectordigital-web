import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../reducers/rootReducer';

//Actions
import { getCarteraRequest } from '../actions/CarteraAction';

//Types
import { LoginObjectState } from '../types/LoginObjectTypes';
import { postLoginObjectLogout } from '../actions/loginObjectAction';
import { CarteraState, tdsResumen, tdsFechas } from '../types/CarteraTypes';

//Containers
import { CSVLink, CSVDownload } from "react-csv";
import { Dropdown } from "../containers/Dropdown";
import Loading from '../components/Loading';

//Styles
import '../styles/exportbutton.css'
import "../styles/ConsulTable.css"
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

interface propsFromState {
  loginObject?: LoginObjectState;
  response?: CarteraState;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type AllProps = propsFromState;
const ResumenDeCartera: React.FC<AllProps> = ({ loginObject, response }: propsFromState) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  var today = new Date();
  var ActualMonth = ((today.getMonth() + 1) + " " + today.getFullYear()).toString();
  const [id, setID] = useState(ActualMonth);
  const [expandedMercadoCap, setExpandedMercadoCap] = useState(false);
  const [expandedFondosInversion, setExpandedFondosInversion] = useState(false);
  const [expandedMercadoDinero, setExpandedMercadoDinero] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("")
  const [resumen, setResumen] = useState<any>({ Resumen: "Subtotal", Descripcion: "Cartera", Porcentaje: "00.00%", Importe: "$0.00" });
  const [totalResumen, setTotalResumen] = useState({ Resumen: "Total", Descripcion: "TOTAL", Porcentaje: "00.00%", Importe: "$0.00" });
  const [operacionesLiquidar, setOperacionesLiquidar] = useState({ Resumen: "SL", Descripcion: "Operaciones por liquidar", Porcentaje: "00.00%", Importe: "$0.00" });
  const [saldoEfectivo, setSaldoEfectivo] = useState({ Resumen: "SUBTOTAL", Mercado: 0, Descripcion: "Saldo en Efectivo", Porcentaje: "00.00%", Importe: "$0.00", Disclaimer: "" });
  const [mercadoCapitales, setMercadoCapitales] = useState({ Resumen: "SUBTOTAL", Mercado: 0, Descripcion: "Mercado de Capitales", Porcentaje: "00.00%", Importe: "$0.00", Disclaimer: "" });
  const [mcEncabezado, setMCEncabezado] = useState([]);
  const [mcDato, setMCDato] = useState([]);
  const [fondosInversion, setFondosInversion] = useState({ Resumen: "SUBTOTAL", Mercado: 0, Descripcion: "Fondos de Inversión", Porcentaje: "00.00%", Importe: "$0.00", Disclaimer: "" });
  const [fondosInversionEncabezado, setFondosInversionEncabezado] = useState([]);
  const [fondosInversionDato, setFondosInversionDato] = useState([]);
  const [mercadoDinero, setMercadoDinero] = useState({ Resumen: "SUBTOTAL", Mercado: 0, Descripcion: "Mercado de Dinero", Porcentaje: "00.00%", Importe: "$0.00", Disclaimer: "" });
  const [mdEncabezado, setMDEncabezado] = useState([]);
  const [mdDato, setMDDato] = useState([]);
  const [fechas, setFechas] = useState<tdsFechas[] | any>([]);
  const [date, setDate] = useState("");
  const [ready, setReady] = useState(false);
  const [fechaResponse, setFechaResponse] = useState(false);
  const idLO = useRef<any>();
  let tokenLO = useRef<any>();
  let canal = useRef<any>();
  let cuentaLO = useRef<any>();
  let cuentaSesionLO = useRef<any>();


  useEffect(() => {
    if (loginObject !== undefined) {
      if (loginObject.response.ierror === -1) {
        if (loginObject.response.dsLogin.tdsLogin.length > 0) {

          cuentaSesionLO.current = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;

          if (cuentaSesionLO.current != 0) {
            // mandamos llamar las apis sacando los datos del objeto de login
            
            setFechaResponse(false)
            idLO.current = loginObject.response.dsLogin.tdsLogin[0].id;
            tokenLO.current  = loginObject.response.dsLogin.tdsLogin[0].token;
            canal.current = "999";
            cuentaLO.current = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

            let todaysDate = id;
            let todaysDateSplit = todaysDate.split(" ");
            let month = todaysDateSplit[0];
            let year = todaysDateSplit[1];
            setMonth(month);
            setYear(year);
            setReady(true);
            let message = '/consulta/nuevoresumen?cuenta=' + cuentaLO.current + '&anio=' + year + '&mes=' + month;
            let params = ["", canal.current, cuentaSesionLO.current.toString(), tokenLO.current, idLO.current.toString()];
            let a = { message, params }
            dispatch(getCarteraRequest(a));
          }
        }
        else {
          //el usuario no esta loggeado, lo mandamos al login
          console.log("usuario no loggeado en resumencartera, lo mandamos al login");
          history.push("/");
        }
      }
      else {
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
    else {
      //el usuario no esta loggeado, lo mandamos al login
      console.log("usuario no loggeado en resumencartera, lo mandamos al login");
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (!response?.loading && response?.response.dsFechas.tdsFechas.length !== 0 && !fechaResponse && ready) {
      let fechas: any = [];
      response?.response.dsFechas.tdsFechas.map((item: any) => {
        if (((item.Mes).toString() === ActualMonth.split(" ")[0] && (item.Anio).toString() === ActualMonth.split(" ")[1])) {
          setDate(item.Descripcion);
        }
        fechas.push({
          id: item.Mes + " " + item.Anio,
          option: item.Descripcion
        })
      });
      if(date === "") {
        setDate(fechas[0].option)
      }
      setFechas(fechas);
      setFechaResponse(true);
    }
  },[response?.response.dsFechas.tdsFechas]);

  useEffect(() => {
    if(response?.loading && ready) {
      setMercadoCapitales({ Resumen: "SUBTOTAL", Mercado: 0, Descripcion: "Mercado de Capitales", Porcentaje: "00.00%", Importe: "$0.00", Disclaimer: "" });
      setFondosInversion({ Resumen: "SUBTOTAL", Mercado: 0, Descripcion: "Fondos de Inversión", Porcentaje: "00.00%", Importe: "$0.00", Disclaimer: "" });
      setMercadoDinero({ Resumen: "SUBTOTAL", Mercado: 0, Descripcion: "Mercado de Dinero", Porcentaje: "00.00%", Importe: "$0.00", Disclaimer: "" });
      setMCEncabezado([]);
      setMCDato([]);
      setMDDato([]);
      setMDEncabezado([]);
      setFondosInversionEncabezado([]);
      setFondosInversionDato([]);
    }
    if(!response?.loading && ready) {
      if (response?.response !== null) {

        if (response?.response.dsResumen.dsResumen.tdsResumen.length !== 0) {
          let resumen = response?.response.dsResumen.dsResumen.tdsResumen;
          let resumenDetalle = response?.response.dsResumen.dsResumen.tdsResumen[0].tdsDetalle;
          resumen.map((item: any) => {
            if (item.Resumen === "SUBTOTAL") {
              setResumen({ Resumen: "Subtotal", Descripcion: item.Descripcion, Porcentaje: item.Porcentaje, Importe: item.Importe });
            }
            if (item.Resumen === "TOTAL") {
              setTotalResumen({ Resumen: "Total", Descripcion: item.Descripcion, Porcentaje: item.Porcentaje, Importe: item.Importe });
            }
            if (item.Resumen === "SL") {
              setOperacionesLiquidar(item);
            }
          });
          if (resumenDetalle !== undefined && resumenDetalle.length !== 0) {
            resumenDetalle.map((item: any) => {
              if (item.Mercado === 7) {
                setSaldoEfectivo(item)
              }
              if (item.Mercado === 3) {
                setMercadoCapitales({ Resumen: item.Resumen, Mercado: item.Mercado, Descripcion: item.Descripcion, Porcentaje: item.Porcentaje, Importe: item.Importe, Disclaimer: item.Disclaimer });
                if (item.tdsDetalleEncabezado !== undefined && item.tdsDetalleDato !== undefined) {
                  setMCEncabezado(item.tdsDetalleEncabezado);
                  setMCDato(item.tdsDetalleDato);
                }
              }
              if(item.Mercado === 5) {
                setMercadoDinero({ Resumen: item.Resumen, Mercado: item.Mercado, Descripcion: item.Descripcion, Porcentaje: item.Porcentaje, Importe: item.Importe, Disclaimer: item.Disclaimer });
                if (item.tdsDetalleEncabezado !== undefined && item.tdsDetalleDato !== undefined) {
                  setMDEncabezado(item.tdsDetalleEncabezado);
                  setMDDato(item.tdsDetalleDato);
                }
              }
              if(item.Mercado === 1) {
                setFondosInversion({ Resumen: item.Resumen, Mercado: item.Mercado, Descripcion: "Fondos de Inversión", Porcentaje: item.Porcentaje, Importe: item.Importe, Disclaimer: item.Disclaimer });
                if (item.tdsDetalleEncabezado !== undefined && item.tdsDetalleDato !== undefined) {
                  setFondosInversionEncabezado(item.tdsDetalleEncabezado);
                  setFondosInversionDato(item.tdsDetalleDato);
                }
              }

            });

          }


        }
      }
    }
  }, [response?.loading]);

  const sendDate = (data: string) => {
    setDate(data);
  }
  const sendId = (data: string) => {
    setID(data);
  }

  useEffect(() => {
    if(ready) {
      let mes = id.split(" ")[0];
      let anio = id.split(" ")[1];
      let message = '/consulta/nuevoresumen?cuenta=' + cuentaLO.current + '&anio=' + anio + '&mes=' + mes;
      let params = ["", canal.current, cuentaSesionLO.current.toString(), tokenLO.current, idLO.current.toString()];
      let a = { message, params }
      dispatch(getCarteraRequest(a));
    }
  },[id]);

  const handleExpandClickMercadoCap = () => {
    setExpandedMercadoCap(!expandedMercadoCap);
  };

  const handleExpandClickMercadoDinero = () => {
    setExpandedMercadoDinero(!expandedMercadoDinero);
  };

  const handleExpandClickFondosInversion = () => {
    setExpandedFondosInversion(!expandedFondosInversion);
  };



  function data() {
    return (
      <div className='mt-2'>
        <div className="grid grid-cols-4 text-base p-3 ">
          <span className="col-start-3 font-bold">Total </span>
          <span className="col-start-4 font-bold text-right w-1/2">Valuación total</span>
        </div>
        <div className="">
          <div className="grid grid-cols-4 text-base bg-gray-200 p-3 ">
            <p className="col-span-2">{saldoEfectivo.Descripcion}</p>
            <p className="font-bold">{saldoEfectivo.Porcentaje}</p>
            <div className='w-1/2 flex justify-end'>
              <p className="font-bold">{saldoEfectivo.Importe}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 text-base p-3">
            <p className=" col-span-2">{mercadoCapitales.Descripcion}
              <ExpandMore
                expand={expandedMercadoCap}
                onClick={handleExpandClickMercadoCap}
                aria-expanded={expandedMercadoCap}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore> 
            </p>
            <p className="font-bold">{mercadoCapitales.Porcentaje}</p>
            <div className='w-1/2 flex justify-end'>
              <p className="font-bold">{mercadoCapitales.Importe} </p>
            </div>
          </div>
        </div>
        {
          mcEncabezado.length !== 0 && mcDato.length !== 0 ?
            <div className="">
              <Collapse in={expandedMercadoCap} timeout="auto" unmountOnExit>
                <div className="w-full flex justify-end mb-3">
                  {
                    <CSVLink
                        data={mcDato}
                        headers={[
                          { label: "Emisora", key: "col1" },
                          { label: "Serie", key: "col2" },
                          { label: "Cupón", key: "col3" },
                          { label: "Títulos", key: "col4" },
                          { label: "Costo Promedio", key: "col5" },
                          { label: "Precio Cierre", key: "col6" },
                          { label: "Ganancia ($)", key: "col7" },
                          { label: "Ganancia (%)", key: "col8" },
                          { label: "Valuación Total", key: "col9" },
                        ]}
                        className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                        filename={"ResumenCapitales.csv"}
                        asyncOnClick={true}
                      > Descargar Tabla</CSVLink>
                  }
                </div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="medium" stickyHeader
                    aria-label="sticky table">

                    <TableHead className="bg-white">
                      <TableRow>
                        <TableCell align="center">Emisora&nbsp;</TableCell>
                        <TableCell align="center">Serie&nbsp;</TableCell>
                        <TableCell align="center">Cupón&nbsp;</TableCell>
                        <TableCell align="center">Títulos&nbsp;</TableCell>
                        <TableCell align="center">Costo&thinsp;Promedio&nbsp;</TableCell>
                        <TableCell align="center">Precio&thinsp;Cierre*&nbsp;</TableCell>
                        <TableCell align="center">Ganancia ($)&nbsp;</TableCell>
                        <TableCell align="center">Ganancia (%)&thinsp;&thinsp;&thinsp;</TableCell>
                        <TableCell align="center">Valuación&thinsp;Total&nbsp;</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mcDato.map((resp: any) => (
                        <TableRow key={resp.col1 + "." + resp.col2}>
                          <TableCell component="th" scope="row">
                            {resp.col1}
                          </TableCell>
                          <TableCell align="left">{resp.col2}</TableCell>
                          <TableCell align="right">{resp.col3}</TableCell>
                          <TableCell align="right">{resp.col4}</TableCell>
                          <TableCell align="right">{resp.col5}</TableCell>
                          <TableCell align="right">{resp.col6}</TableCell>
                          <TableCell align="right">{resp.col7}</TableCell>
                          <TableCell align="right">{resp.col8}</TableCell>
                          <TableCell align="right">{resp.col9}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </div>
          : ""
         }
        <div className="grid grid-cols-4 text-base p-3">
          <p className="col-span-2">{fondosInversion.Descripcion}
          <ExpandMore
            expand={expandedFondosInversion}
            onClick={handleExpandClickFondosInversion}
            aria-expanded={expandedFondosInversion}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> 
          </p>
          <p className="font-bold">{fondosInversion.Porcentaje}</p>
          <div className='w-1/2 flex justify-end'>
            <p className="font-bold">{fondosInversion.Importe}</p>
          </div>
        </div>
        {
          fondosInversionDato.length !== 0 && fondosInversionEncabezado.length !== 0 ?
            <div className="">
              <Collapse in={expandedFondosInversion} timeout="auto" unmountOnExit>
                <div className="my-2 w-full flex justify-end mb-3">
                  <CSVLink
                    data={fondosInversionDato}
                    headers={[
                      { label: "FD", key: "Tipo" },
                      { label: "Emisora", key: "col1" },
                      { label: "Serie", key: "col2" },
                      { label: "", key: "col3" },
                      { label: "Títulos", key: "col4" },
                      { label: "Costo Promedio Unitario", key: "col5" },
                      { label: "Valuación Unitaria", key: "col6" },
                      { label: "Plusvalía / Minusvalía", key: "col7" },
                      { label: "% Variación", key: "col8" },
                      { label: "Valuación Total", key: "col9" },
                    ]}
                    className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                    filename={"ResumenFondos.csv"}
                    asyncOnClick={true}
                  > Descargar Tabla</CSVLink>
                </div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="medium" stickyHeader
                    aria-label="sticky table">
                    <TableHead className="bg-white">
                      <TableRow>
                        <TableCell align="center">Tipo</TableCell>
                        <TableCell align="center">Emisora&nbsp;</TableCell>
                        <TableCell align="center">Serie&nbsp;</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Títulos</TableCell>
                        <TableCell align="center">Costo Promedio Unitario</TableCell>
                        <TableCell align="center">Valuación Unitaria</TableCell>
                        <TableCell align="center">Plusvalía / Minusvalía</TableCell>
                        <TableCell align="center">% Variación</TableCell>
                        <TableCell align="center">Valuación Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fondosInversionDato?.map((resp: any) => (
                        <TableRow key={resp.col1 + "." + resp.col2} >
                          <TableCell align="left">{resp.Tipo}</TableCell>
                          <TableCell component="th" scope="row">
                            {resp.col1}
                          </TableCell>
                          <TableCell align="left">{resp.col2}</TableCell>
                          <TableCell align="right">{resp.col3}</TableCell>
                          <TableCell align="right">{resp.col4}</TableCell>
                          <TableCell align="right">{resp.col5}</TableCell>
                          <TableCell align="right">{resp.col6}</TableCell>
                          <TableCell align="right">{resp.col7}</TableCell>
                          <TableCell align="right">{resp.col8}</TableCell>
                          <TableCell align="right">{resp.col9}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </div>
          : ""
        }
        <div className="grid grid-cols-4  text-base p-3">
          <p className="col-span-2">{mercadoDinero.Descripcion}
            <ExpandMore
              expand={expandedMercadoDinero}
              onClick={handleExpandClickMercadoDinero}
              aria-expanded={expandedMercadoDinero}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </p>
          <p className="font-bold">{mercadoDinero.Porcentaje}</p>
          <div className='w-1/2 flex justify-end'>
            <p className="font-bold ">{mercadoDinero.Importe}</p>
          </div>
        </div> 
        {
          mdDato.length !== 0 && mdEncabezado.length !== 0 ?
            <div className="">
              <Collapse in={expandedMercadoDinero} timeout="auto" unmountOnExit>
                <div className="w-full flex justify-end mb-3">
                  {
                    <CSVLink
                        data={mdDato}
                        headers={[
                          { label: "Emisora", key: "col1" },
                          { label: "Serie", key: "col2" },
                          { label: "", key: "col3" },
                          { label: "Títulos", key: "col4" },
                          { label: "", key: "col5" },
                          { label: "Valuación Unitaria", key: "col6" },
                          { label: "", key: "col7" },
                          { label: "", key: "col8" },
                          { label: "Valuación Total", key: "col9" },
                        ]}
                        className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                        filename={"ResumenCapitales.csv"}
                        asyncOnClick={true}
                      > Descargar Tabla</CSVLink>
                  }
                </div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="medium" stickyHeader
                    aria-label="sticky table">

                    <TableHead className="bg-white">
                      <TableRow>
                        <TableCell align="center">Emisora&nbsp;</TableCell>
                        <TableCell align="center">Serie&nbsp;</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Títulos&nbsp;</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Valuación Unitaria</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Valuación&thinsp;Total&nbsp;</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mdDato.map((resp: any) => (
                        <TableRow key={resp.col1 + "." + resp.col2} >
                          <TableCell component="th" scope="row">
                            {resp.col1}
                          </TableCell>
                          <TableCell align="left">{resp.col2}</TableCell>
                          <TableCell align="right">{resp.col3}</TableCell>
                          <TableCell align="right">{resp.col4}</TableCell>
                          <TableCell align="right">{resp.col5}</TableCell>
                          <TableCell align="right">{resp.col6}</TableCell>
                          <TableCell align="right">{resp.col7}</TableCell>
                          <TableCell align="right">{resp.col8}</TableCell>
                          <TableCell align="right">{resp.col9}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </div>
          : ""
        }
      </div>
    )
  }


  function Total() {
    return (
      <div className="my-2">
        <div className="mb-2 grid grid-cols-4  text-base bg-gray-200 p-3">
          <p className="col-span-2">{resumen.Resumen}</p>
          <p className="font-bold"> {resumen.Porcentaje} </p>
          <div className='w-1/2 flex justify-end'>
            <p className="font-bold">{resumen.Importe}</p>
          </div>
        </div>
        <div className="mb-2 grid grid-cols-4  text-base bg-gray-200 p-3 ">
          <p className="col-span-2">{operacionesLiquidar.Descripcion}</p>
          <p className="font-bold"> {operacionesLiquidar.Porcentaje}</p>
          <div className='w-1/2 flex justify-end'>
            <p className="font-bold">{operacionesLiquidar.Importe}</p>
          </div>
        </div>
        <div className="mb-2 grid grid-cols-4   text-base bg-gray-200 p-3">
          <p className="col-span-3">{totalResumen.Resumen}</p>
          <div className='w-1/2 flex justify-end'>
            <p className="font-bold">{totalResumen.Importe}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <div className="flex flex-row w-full">
          <div className="flex w-2/3">
            <div className="w-8/24">
              {
                fechaResponse ?
                  <Dropdown fondosFamilia={false} dropdownData={fechas} initialOption={date} sendId={(id) => sendId(id)} sendOption={(date) => sendDate(date)} side={false} />
                : ""
              }
              
            </div>
          </div>
        </div>  
        {
          response?.loading || !ready ? 
            <Loading /> 
          :
            <>
              {data()}
              {Total()}
            </>
        }
        
      </div>
    </div>
  );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    loginObject: store.loginObjectState,
    response: store.cartera,
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getCarteraRequest: () => dispatch(getCarteraRequest(dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResumenDeCartera);