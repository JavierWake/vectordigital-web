import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { useHistory } from 'react-router-dom';

/* import { DataGrid, GridRowsProp, GridColDef, GridToolbarContainer, GridToolbarExport, } from '@material-ui/data-grid'; */
import { getConsultasRequest } from "../actions/consultasAction";
import { ConsultasState } from "../types/ConsultasTypes";
import { getOperacionesDiaRequest } from '../actions/OperacionesDiaAction';
import { OperacionesDiaState } from '../types/OperacionesDiaTypes';
import {
  ConsultasDataTableR2,
  ConsultasDataTableC2,
  headers
} from '../mocks/ConsultasDataTable'
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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Dropdown } from './Dropdown';
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
      color: 'white'
    }
  }

});





interface propsFromState {
  /* response: ConsultasState; */
  loginObject?: LoginObjectState;
  response: OperacionesDiaState
}

type AllProps = propsFromState;
// si se quiere llamar a response de consultas (response.response)

const TablaMovimientosD: React.FC<AllProps> = ({ loginObject, response }) => {
  
  const history = useHistory();
  const dispatch = useDispatch();

  
  var today = new Date();
  var ActualMonth = today.getFullYear() + "/" +(today.getMonth() + 1);
  ActualMonth.toString();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const classes = useStyles();
  const [month, setMonth] = useState(ActualMonth);
  const [selectedTeam, setSelectedTeam] = useState([] as any);
  const resp = response.response?.dsOperacionesDia.tdsOperacionesDia;

  function getConceptosValidos() {
    return resp.map(sh => {
      if (sh.concepto !== '') return sh.concepto
    }).filter(sh => sh !== undefined)
  }
  const [datos, setSelectedDatos] = useState([] as any);
  const [selectedDate, setSelectedDate] = useState([] as any);

  //API  de operaciones del dia
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
        
                let message = "/consulta/operacionesdia?cuenta=" + cuentaLO;
                let params = [ "", canal, cuentaSesionLO.toString(), tokenLO,  idLO.toString() ];
                dispatch(getOperacionesDiaRequest({ message, params }));
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en movimeintosd, lo mandamos al login");
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
      console.log("usuario no loggeado en movimeintosd, lo mandamos al login");
      history.push("/");
    }
  },[]);
  

  useEffect(() => {
    datos.splice(0, resp.length);
  }, [datos])

  useEffect(() => {
    setSelectedDatos([]);
    setSelectedDatos([...datos, ...response.response?.dsOperacionesDia.tdsOperacionesDia]);
  }, [response])

  useEffect(() => {
    if (selectedTeam.length == 0) {
      setSelectedDatos([...datos, ...response.response?.dsOperacionesDia.tdsOperacionesDia]);
    }
    else {
      const resultado = resp.filter(palabra => palabra.concepto === selectedTeam[0]);
      setSelectedDatos([...datos, ...resultado]);
      setSelectedDate("Ulitma Operacion del Dia");
    }

  }, [selectedTeam])

  useEffect(() => {
    if (selectedDate.length == 0) {
      setSelectedDatos([...datos, ...response.response?.dsOperacionesDia.tdsOperacionesDia]);
    }
    else {
      const resultado = resp.filter(palabra => palabra.fecha === selectedDate);
      setSelectedDatos([...datos, ...resultado]);
    }

  }, [selectedDate])

  useStyles();

  let resp1 = Object.keys(resp).forEach((k) => resp[k].fechas == null && delete resp[k].fechas);
//console.log(ActualMonth)
  function getFechasValidas() {
    return resp.map(sh => {
      if (sh.fecha !== '' && sh.fecha.includes(ActualMonth)) return sh.fecha
      //console.log("Esto es lo que me trae el substring",sh.fecha);
    }).filter(sh => sh !== undefined)
  }


  //console.log("Esto es lo que me tra geRda", getFechasValidas());

  const DropdownDataDate = getFechasValidas().map((item) => {

    return {

      id: item,
      option: item

    };
  }).filter(n => n);



  //Updating Table data with dropdown


  const [date, setDate] = useState("Seleccionar día");//DropdownDataDate.length === 0 ? "Seleccionar día" : DropdownDataDate[0].option);//"Última Operación del Día");

  const sendDate = (data: string) => {
    setDate(data);
  }
  const sendId = (data: string) => {
    setSelectedDate(data);
  }

  if(response?.loading === true) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex w-full h-full">
        <div className="flex w-2/3 h-full">
          <div className="w-1/2 py-2 h-full">
            {
              getConceptosValidos().length > 0 &&<Autocomplete
                multiple
                size="medium"
                fullWidth={true}
                options={getConceptosValidos()}
                getOptionLabel={option => option}
                renderInput={(colection) => (
                  <TextField {...colection}
                    //label="Buscar  Campo"
                    placeholder="Buscar Campo"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ style: { fontSize: 12, backgroundColor: "white", background: "white" } }}
                  />
                )}
                onChange={(_event, selectedOption) => {
                  setSelectedTeam(selectedOption);

                }}
              />
            }
          </div>
        </div>
        <div className="flex w-1/3 h-full">
          <div className="mt-2 flex justify-end  w-full h-full">
            {
              datos.length > 0 && <>
                <CSVLink data={datos}
                  headers={[
                    { label: "Fecha", key: "fecha" },
                    { label: "Operacion", key: "operacion" },
                    { label: "Descripcion", key: "concepto" },
                    { label: "Cargo/Abono", key: "monto" },
                    { label: "Saldo Acumulado", key: "saldo" },]}
                  filename={"MovimientosDelDia.csv"}
                  className="text-sm text-red-600 cursor-pointer hover:underline text-right"
                  target="_blank">Descargar Tabla</CSVLink>
              </>
            }
          </div>
        </div>
      </div>
      {/* 
            <div className='my-4 flex space-x-4'>
          <div className='my-2'>
            <p>Filtros:</p>
          </div>
          <div className='flex space-x-4'>
            <div>
              <button className=" w-1/8 bg-gray-100 p-2 text-sm text-red-600 border-1 border-red-600 rounded-full hover:bg-red-600 hover:text-gray-100 active:bg-red-600">
                Efectivo
              </button>
            </div>
            <div>
              <button className=" w-1/8 bg-gray-100 p-2 text-sm text-red-600 border-1 border-red-600 rounded-full hover:bg-red-600 hover:text-gray-100">
                Dividendos
              </button>
            </div>
            <div>
              <button className=" w-1/8 bg-gray-100 p-2 text-sm text-red-600 border-1 border-red-600 rounded-full hover:bg-red-600 hover:text-gray-100">
                Fees
              </button>
            </div>
            <div>
              <button className=" w-1/8 bg-gray-100 p-2 text-sm text-red-600 border-1 border-red-600 rounded-full hover:bg-red-600 hover:text-gray-100">
                Compras
              </button>
            </div>
            <div>
              <button className=" w-1/8 bg-gray-100 p-2 text-sm text-red-600 border-1 border-red-600 rounded-full hover:bg-red-600 hover:text-gray-100">
                Ventas
              </button>
            </div>
            <div>
              <button className=" w-1/8 bg-gray-100 p-2 text-sm text-red-600 border-1 border-red-600 rounded-full hover:bg-red-600 hover:text-gray-100">
                Emisoras
              </button>
            </div>
          </div>
  
          </div> */}
      <div className="my-6">
        <TableContainer component={Paper}>
          <Table className={classes.table} size="medium" stickyHeader
            aria-label="sticky table">

            <TableHead className="bg-white">
              <TableRow>
                <TableCell  align="center">Fecha</TableCell>
                <TableCell align="center">Operación</TableCell>
                <TableCell align="center">Descripción</TableCell>
                <TableCell align="center">Cargo/Abono</TableCell>
                <TableCell align="center">Saldo Acumulado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                datos?.length === 0 && <TableRow className="bg-white">
                  <p className="text-gray-500 py-2">No hay datos.</p>
                </TableRow>
              }
              {datos?.map((datos: any) => (
                <TableRow key={datos.fecha} className="bg-white">
                  <TableCell component="th" scope="row">
                    {datos.fecha}
                  </TableCell>
                  <TableCell align="center">{datos.operacion}</TableCell>
                  <TableCell align="center">{datos.concepto}</TableCell>
                  <TableCell align="right">{datos.monto}</TableCell>
                  <TableCell align="right">{datos.saldo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </div>
  );
}
//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    /* response: store.consultas */
    loginObject: store.loginObjectState,
    response: store.operacionesDia,
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    /* getConsultasRequest: () => dispatch(getConsultasRequest) */
    getOperacionesDiaRequest: () => dispatch(getOperacionesDiaRequest)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TablaMovimientosD);
