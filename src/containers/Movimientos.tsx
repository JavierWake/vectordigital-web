import React, { useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../reducers/rootReducer';
import { DataGrid, GridRowsProp, GridColDef, GridToolbarContainer, GridToolbarExport, } from '@material-ui/data-grid';
import { getConsultasRequest } from "../actions/consultasAction";
import DropDownListMovimientos from "../containers/DropDownMovimientos";
import { CSVLink, CSVDownload } from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/styles';
import '../styles/exportbutton.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from "material-ui-search-bar";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useParams } from 'react-router';
import { MdCollectionsBookmark, MdOutlineBorderColor } from 'react-icons/md';
import { isEmptyStatement } from '@babel/types';
import "../styles/searchbar.css"
import { Dropdown } from './Dropdown';
import { borderColor } from '@mui/system';
import { ConsultasState } from '../types/ConsultasTypes';
import { LoginObjectState } from '../types/LoginObjectTypes';
import Loading from '../components/Loading';
import { postLoginObjectLogout } from '../actions/loginObjectAction';




const useStyles = makeStyles({



  table: {
    minWidth: 300,
  },
  '@global': {
    '.MuiAutocomplete-option[data-focus="true"]': {
      background: '#FF5000',
      borderColor: "#F8F8F8",
      MdOutlineBorderColor: "#F8F8F8",
      paddingBottom: 4,
    }
  }

});




interface propsFromState {
  loginObject?: LoginObjectState;
  response: ConsultasState;
}

type AllProps = propsFromState;
// si se quiere llamar a response de consultas (response.response)

const TablaMovimientos: React.FC<AllProps> = ({ loginObject, response }) => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  
  var today = new Date();
  var ActualMonth = (today.getMonth() + 1) + " " + today.getFullYear();
  ActualMonth.toString();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const classes = useStyles();
  const [month, setMonth] = useState(ActualMonth);
  const [ready, setReady] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState([] as any);
  const fiscal = response.response?.dsMovimientos.tdsResumenFiscal;
  const resp = response.response?.dsMovimientos.tdsMovimientos;
  const respf = response.response?.dsFechas.tdsFechas;
  let newD: { Anio: number, Mes: number, Descripcion: string }[] = [
    { "Anio": today.getFullYear(), "Mes": today.getMonth() + 1, "Descripcion": "Último Mes" }
];
  const respfN = respf.concat(newD);
  const [date, setDate] = useState("");
  const efectivo = response.response?.dsMovimientos.tdsResumenEfvo;

  const download = fiscal.concat(efectivo);

  const [datos, setSelectedDatos] = useState([] as any);

  let m = month.toString();
  let split = m.split(" ");
  let split1 = split[0];
  let split2 = split[1];

  let update = '/consulta/movimientos?cuenta=266563&anio=' + split2 + '&mes=' + split1;

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
        
                let message = '/consulta/movimientos?cuenta=' + cuentaLO + '&anio=' + split2 + '&mes=' + split1;
                let params = ["", canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                dispatch(getConsultasRequest({ message, params }));
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en movimientos, lo mandamos al login");
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
    }else{
        //el usuario no esta loggeado, lo mandamos al login
        console.log("usuario no loggeado en movimientos, lo mandamos al login");
        history.push("/");
    }
  },[]);

  useEffect(() => {
    datos.splice(0, resp.length);
  }, [datos])

  useEffect(() => {
    setSelectedDatos([]);
    setSelectedDatos([...datos, ...response.response?.dsMovimientos.tdsMovimientos]);
  }, [response])

  useEffect(() => {
    if (selectedTeam.length == 0) {
      setSelectedDatos([...datos, ...response.response?.dsMovimientos.tdsMovimientos]);
    }
    else {
      const resultado = resp.filter(palabra => palabra.Descripcion === selectedTeam[0].Descripcion);
      setSelectedDatos([...datos, ...resultado]);
    }

  }, [selectedTeam])

  useEffect(() => {
    if(!ready && !response.loading && response.response.dsFechas.tdsFechas.length !== 0) {
      setDate(response.response?.dsFechas.tdsFechas[0].Descripcion)
      setReady(true);

    }
  },[response.loading]);

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
        
                let message = '/consulta/movimientos?cuenta=' + cuentaLO + '&anio=' + split2 + '&mes=' + split1;
                let params = ["", canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                dispatch(getConsultasRequest({ message, params }));
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en movimientos, lo mandamos al login");
            history.push("/");
        }
    }
    else{
        //el usuario no esta loggeado, lo mandamos al login
        console.log("usuario no loggeado en movimientos, lo mandamos al login");
        history.push("/");
    }
    }else{
        //el usuario no esta loggeado, lo mandamos al login
        console.log("usuario no loggeado en movimientos, lo mandamos al login");
        history.push("/");
    }

  }, [update])

  /*useEffect(() => {
    if (response.response?.dsFechas != null)
      console.log(response.response?.dsFechas)
  }, [response.response?.dsFechas])*/

  useStyles();
  const DropdownDataDate = response.response?.dsFechas.tdsFechas.map((item) => {

    return {
      id: item.Mes + " " + item.Anio,
      option: item.Descripcion

    };
  });




  const sendDate = (data: string) => {
    setDate(data);
  }
  const sendId = (data: string) => {
    setMonth(data);
  }

  if(response?.loading === true){
    return <Loading />;
  }

  if(datos?.length === 0){
    return <div className="">
        <p className="text-gray-500 py-2">No hay datos.</p>
      </div>
  }

  if (fiscal.length < 1) {
    return (
      <div>
        <div className="flex w-full h-full">
          <div className="flex w-2/3 h-full">
            <div className="flex flex-row w-1/2 h-full pr-2">
              <div className="w-1/4 h-full py-2">
                <p className="">Buscar por</p>
              </div>
              <div className="w-3/4 h-full pl-2">
                <Dropdown fondosFamilia={false} dropdownData={DropdownDataDate} initialOption={date} sendId={(id) => sendId(id)} sendOption={(date) => sendDate(date)} side={false} />
              </div>            
            </div>
            <div className="w-1/2 h-full">
              <Autocomplete
                multiple
                //size="medium"
                fullWidth={true}
                options={resp}
                getOptionLabel={option => option.Descripcion}
                renderInput={(colection) => (
                  <TextField {...colection}
                    label="Buscar campo"
                    placeholder="Buscar campo"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ style: { fontSize: 12, margin: 3, paddingLeft: 3, paddingRight: 3, backgroundColor: "white", } }}
                  />
                )}
                onChange={(_event, selectedOption) => {
                  setSelectedTeam(selectedOption);

                }}
              />
            </div>
          </div>
          <div className="flex w-1/3 h-full">
            <div className="mt-2 flex justify-end  w-full h-full">
              {
                datos.length > 0 && <>
                  <CSVLink data={datos}
                    headers={[
                      { label: "Dia", key: "Dia" },
                      { label: "Operacion", key: "Operacion" },
                      { label: "Descripcion", key: "Descripcion" },
                      { label: "Titulos", key: "Titulos" },
                      { label: "Precio", key: "Precio" },
                      { label: "Cargo", key: "Cargo" },
                      { label: "Abono", key: "Abono" },
                      { label: "Saldo Efectivo", key: "Saldo" },]}
                    filename={"MovimientosMes.csv"}
                    className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                    target="_blank">Descargar Tabla</CSVLink>
                </>
              }
            </div>
          </div>
        </div>
        <div className="my-6">
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" stickyHeader
              aria-label="sticky table">

              <TableHead className="bg-white">
                <TableRow>
                  <TableCell align="left">Día&nbsp;</TableCell>
                  <TableCell align="left">Operación&nbsp;</TableCell>
                  <TableCell align="left">Descripción</TableCell>
                  <TableCell align="left">Títulos</TableCell>
                  <TableCell align="left">Precio</TableCell>
                  <TableCell align="left">Cargo</TableCell>
                  <TableCell align="left">Abono</TableCell>
                  <TableCell align="left">Saldo&thinsp;Efectivo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  datos?.length === 0 && <TableRow>
                    <p className="text-gray-500 py-2">No hay datos.</p>
                  </TableRow>
                }
                {datos?.map((datos: any) => (
                  <TableRow key={datos.Dia} >
                    <TableCell component="th" scope="row">
                      {datos.Dia}
                    </TableCell>
                    <TableCell align="left">{datos.Operacion}</TableCell>
                    <TableCell align="left">{datos.Descripcion}</TableCell>
                    <TableCell align="left">{datos.Titulos}</TableCell>
                    <TableCell align="left">{datos.Precio}</TableCell>
                    <TableCell align="left">{datos.Cargo}</TableCell>
                    <TableCell align="left">{datos.Abono}</TableCell>
                    <TableCell align="right">{datos.Saldo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div>
          <p className='mt-10 font-mono font-bold text-xl'>
            Resumen de Movimientos (no hay datos)
          </p>
          {/*<div className="flex w-full h-full">
            <div className="flex  w-full h-full">

            </div>
            <div className="flex w-full h-full">
              <div className="mt-2 flex justify-end  w-full h-full">
                <GetAppIcon fontSize="small" className="mt-2 text-red-600" />
                <CSVLink data={download}
                  headers={[
                    { label: "Descripción", key: "Descripcion" },
                    { label: "Monto", key: "Monto" },]}
                  filename={"MovimientosFiscalesdelMes.csv"}
                  className=" font-bold font-Roboto btn text-red-600 hover:text-red-600 text-sm"
                  target="_blank">Descargar Tabla</CSVLink>
              </div>
            </div>
          </div>
          <div className='my-4 font-bold'>
            Movimientos Fiscales
          </div>*/}
        </div>

      </div>
    )
  }
  else {
    return (
      <div>
        <div className="flex w-full h-full">
          <div className="flex w-2/3 h-full">
            <div className="flex flex-row w-1/2 h-full pr-2">
              <div className="w-1/4 h-full py-2">
                <p className="">Buscar por</p>
              </div>
              <div className="w-3/4 h-full pl-2">
                <Dropdown fondosFamilia={false} dropdownData={DropdownDataDate} initialOption={date} sendId={(id) => sendId(id)} sendOption={(date) => sendDate(date)} side={false} />
              </div>
            </div>
            <div className="w-1/2 h-full">
              <Autocomplete
                multiple
                //size="medium"
                fullWidth={true}
                options={resp}
                getOptionLabel={option => option.Descripcion}
                renderInput={(colection) => (
                  <TextField {...colection}
                    label="Buscar campo"
                    placeholder="Buscar campo"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ style: { fontSize: 12, margin: 3, paddingLeft: 3, paddingRight: 3, backgroundColor: "white", } }}
                  />
                )}
                onChange={(_event, selectedOption) => {
                  setSelectedTeam(selectedOption);

                }}
              />
            </div>
          </div>
          <div className="flex w-1/3 h-full">
            <div className="mt-2 flex justify-end  w-full h-full">
              {
                datos.length > 0 && <>
                  <CSVLink data={datos}
                    headers={[
                      { label: "Dia", key: "Dia" },
                      { label: "Operacion", key: "Operacion" },
                      { label: "Descripcion", key: "Descripcion" },
                      { label: "Titulos", key: "Titulos" },
                      { label: "Precio", key: "Precio" },
                      { label: "Cargo", key: "Cargo" },
                      { label: "Abono", key: "Abono" },
                      { label: "Saldo", key: "Saldo" },]}
                    filename={"MovimientosMes.csv"}
                    className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                    target="_blank">Descargar Tabla</CSVLink>
                </>
              }
            </div>
          </div>
        </div>
        <div className="my-6">
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium" stickyHeader
              aria-label="sticky table">

              <TableHead className="bg-white">
                <TableRow>
                  <TableCell align="left">Día&nbsp;</TableCell>
                  <TableCell align="left">Operación&nbsp;</TableCell>
                  <TableCell align="left">Descripción&nbsp;</TableCell>
                  <TableCell align="center">Títulos&nbsp;</TableCell>
                  <TableCell align="center">Precio&nbsp;</TableCell>
                  <TableCell align="center">Cargo&nbsp;</TableCell>
                  <TableCell align="center">Abono&nbsp;</TableCell>
                  <TableCell align="center">Saldo&thinsp;Efectivo&thinsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  datos?.length === 0 && <TableRow>
                    <p className="text-gray-500 py-2">No hay datos.</p>
                  </TableRow>
                }
                {datos?.map((datos: any) => (
                  <TableRow key={datos.Dia}>
                    <TableCell component="th" scope="row">
                      {datos.Dia}
                    </TableCell>
                    <TableCell align="left">{datos.Operacion}</TableCell>
                    <TableCell align="left">{datos.Descripcion}</TableCell>
                    <TableCell align="right">{datos.Titulos}</TableCell>
                    <TableCell align="right">{datos.Precio}</TableCell>
                    <TableCell align="right">{datos.Cargo}</TableCell>
                    <TableCell align="right">{datos.Abono}</TableCell>
                    <TableCell align="right">{datos.Saldo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div>
          <div className='w-full flex justify-between mt-10 '>
            <p className='font-bold text-lg'>
              Resumen de Movimientos
            </p>
            <div>
                {
                  download.length > 0 && <>
                    <CSVLink data={download}
                      headers={[
                        { label: "Descripción", key: "Descripcion" },
                        { label: "Monto", key: "Monto" },]}
                      filename={"MovimientosFiscalesdelMes.csv"}
                      className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                      target="_blank">Descargar Tabla</CSVLink>
                  </>
                }
              </div>
          </div>
          <div className='my-3 font-bold'>
            Movimientos Fiscales
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[0].Descripcion}</p>
            <p className='my- 2 font-bold'>$ {fiscal[0].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[1].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[1].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[2].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[2].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[3].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[3].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[4].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[4].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[5].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[5].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[6].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[6].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[7].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[7].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>{fiscal[8].Descripcion}</p>
            <p className='font-bold'>$ {fiscal[8].Monto}</p>
          </div>
          <p className='mt-4 font-bold'>
            Resumen de Movimientos
          </p>
          <div className='my-2 flex justify-between w-2/6'>
            <p>Entrada de Efectivo</p>
            <p className='font-bold'>$ {efectivo[0].Monto}</p>
          </div>
          <div className='my-2 flex justify-between w-2/6'>
            <p>Salida de Efectivo</p>
            <p className='font-bold'>$ {efectivo[1].Monto}</p>
          </div>
        </div>

      </div>
    )
  }
}
//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    loginObject: store.loginObjectState,
    response: store.consultas,
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getConsultasRequest: () => dispatch(getConsultasRequest)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TablaMovimientos);
