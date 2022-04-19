import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import "../styles/table.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { Dropdown } from "./Dropdown";
import { DropdownDataBolsas, DropdownDataHechos } from "../mocks/DropdownData";
import { getHechosRequest } from "../actions/hechosAction";
import Loading from "../components/Loading";
import { LoginObjectState } from "../types/LoginObjectTypes";
import { postLoginObjectLogout } from '../actions/loginObjectAction';

import { MdSearch } from "react-icons/md";

interface hechos {
  id: number;
  hora: string;
  bolsa: string;
  folio: string;
  compra: string;
  vende: string;
  precio: string;
  volumen: string;
  importe: string;
}

interface HechosProps {
  loginObject?: LoginObjectState;
  hechosData: any;
  emisora: any;
  serie: any;
}

const Hechos: React.FC<HechosProps> = ({ loginObject, hechosData, emisora, serie }) => {
 
  const dispatch = useDispatch();
  const history = useHistory();
  const [ready, setReady] = useState(false);

  const [rows, setRows] = useState<hechos[]>(hechosData);
  const [searched, setSearched] = useState<string>("");
  const [bolsa, setBolsa] = useState("BMV");
  const [orderBy, setOrderBy] = useState("Hora"); // Initial state is columns are sorted by Grade
  const [order, setOrder] = useState<'desc' | 'asc' | undefined>('asc'); // Initial State is ascending
  const [id, setId] = useState("BMV");
  const [checkVector, setCheckVector] = useState(false);
  const [checkCruces, setCheckCruces] = useState(false);
  const [hechos, setHechos] = useState("250 hechos");
  const [idHechos, setIdHechos] = useState(250);

  const [ctaCtoDispatch, setCtaCtoDispatch] = useState("");
  const [paramsDispatch, setParamsDispatch] = useState<string[]>([]);

  const sendCtaCtoDispatch = (data: string) => {
      if(ctaCtoDispatch === data){
          return;
      }
      setCtaCtoDispatch(data);
  };

  const sendParamsDispatch = (data: string[]) => {
      if(paramsDispatch === data){
          return;
      }
      setParamsDispatch(data);
  };

  useEffect(() => {
    if(loginObject !== undefined){
      if(loginObject.response.ierror === -1){
        if(loginObject.response.dsLogin.tdsLogin.length > 0){

            const cuentaSesionLO = loginObject.response.dsLogin.tdsLogin[0].cuentasesion;
    
            if(cuentaSesionLO != 0){
                // mandamos llamar las apis sacando los datos del objeto de login

                console.log("Entra emisora: " + emisora + " serie: " + serie);

                const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                const canal = "999";
                const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                sendCtaCtoDispatch(cuentaLO);
                sendParamsDispatch([ canal, cuentaSesionLO.toString(), tokenLO, idLO.toString() ]);
                
                let message = "cap/emisoraposturas?emisora=" + emisora + "&serie=" + serie + "&vector=false&cruce=false&bolsa=" + bolsa + "&hechos=250";
                let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                let a = { message, params }
                dispatch(getHechosRequest(a));

                setReady(!ready);
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en hechos, lo mandamos al login");
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
      console.log("usuario no loggeado en hechos, lo mandamos al login");
      history.push("/");
    }
  },[]);

  useEffect(() => {
    if(ready){
      let message = "cap/emisoraposturas?emisora=" + emisora + "&serie=" + serie + "&vector=false&cruce=false&bolsa=" + bolsa + "&hechos=250";
      let params = paramsDispatch;
      let a = { message, params }
      dispatch(getHechosRequest(a));
    }
  },[emisora, serie]);

  useEffect(() => {
    if(!hechosData.loading){
      setRows(hechosData.tdsPosturas);
    }
  }, [hechosData])

  useEffect(() => {
    if(ready){
      let message = "cap/emisoraposturas?emisora=" + emisora + "&serie=" + serie + "&vector=" + checkVector + "&cruce=" + checkCruces + "&bolsa=" + id + "&hechos=" + idHechos;
      let params = paramsDispatch;
      let a = { message, params }
      dispatch(getHechosRequest(a));
    }
  }, [id, checkVector, checkCruces, idHechos]);

  const sendId = (data: string) => {
    if(id === data){
        return;
    }
    setId(data);
  };

  const sendCheckVector = (data: boolean) => {
    if(checkVector === data){
        return;
    }
    setCheckVector(data);
  };

  const sendCheckCruces = (data: boolean) => {
    if(checkCruces === data){
        return;
    }
    setCheckCruces(data);
  };

  const sendIdHechos = (data: number) => {
    if(idHechos === data){
        return;
    }
    setIdHechos(data);
  };

  const requestSearch = (e: any) => {
    let searchedVal = e.currentTarget.value;
    setSearched(searchedVal);

    const filteredRows = hechosData.tdsPosturas.filter((row: any) => {
      const filtro =
        row.Compra.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.Vende.toLowerCase().includes(searchedVal.toLowerCase());
      return filtro;
    });

    setRows(filteredRows);
  };

  function ascCompare(a: any, b: any) {
    if (a[orderBy] > b[orderBy]) return 1;
    if (a[orderBy] < b[orderBy]) return -1;
    return 0;
  }
  function desCompare(a: any, b: any) {
    if (a[orderBy] > b[orderBy]) return -1;
    if (a[orderBy] < b[orderBy]) return 1;
    return 0;
  }
  const handleSort = (tableHeader: any) => {
    if (orderBy !== tableHeader) setOrderBy(tableHeader);
    else setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  function Row(props: any) {
    const { row } = props;

    return (
      <React.Fragment>
        <TableRow>
          <TableCell  align="center" component="th" scope="row">
            {row.HoraPostura}
          </TableCell>
          <TableCell align="left">{row.Exchange}</TableCell>
          <TableCell align="left">{row.Folio}</TableCell>
          <TableCell align="left">{row.Compra}</TableCell>
          <TableCell align="left">{row.Vende}</TableCell>
          <TableCell align="right">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(row.Precio)}</TableCell>
          <TableCell align="right">{row.Volumen.toLocaleString('en-US')}</TableCell>
          <TableCell align="right">{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(row.Importe)}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className="flex justify-start items-center my-4">
        <div className="w-1/3">
          <div className="relative z-0">
            <span className="absolute z-10 m-2 left-1">
              <MdSearch className="text-gray-400 text-xl" />
            </span>

            <input
              type="text"
              className={"relative w-full py-2 px-5 bg-white text-gray-400 cursor-text border border-1 border-gray-200 rounded-md text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 text-sm"}
              placeholder="Buscar"
              onChange={requestSearch}
              value={searched}
            />
          </div>
        </div>
        <div className="pl-3 w-1/6">
          <Dropdown
            dropdownData={DropdownDataHechos}
            initialOption={hechos}
            side={false}
            sendOption={(hecho: any) => setHechos(hecho)}
            sendId={(id: any) => sendIdHechos(id)}
            fondosFamilia={false}
          />
        </div>
        <p className="px-3">Bolsa</p>
        <div className="w-1/6">
          <Dropdown
            dropdownData={DropdownDataBolsas}
            initialOption={bolsa}
            side={false}
            sendOption={(bolsa: any) => setBolsa(bolsa)}
            sendId={(id: any) => sendId(id)}
            fondosFamilia={false}
          />
        </div>
        <label className="items-center pl-1">
          <input
            type="checkbox"
            className="form-checkbox text-red-600 border rounded"
            onClick={() => sendCheckVector(!checkVector)}
            checked={checkVector}
          />
          <span className="text-xs px-1">Hechos Vector</span>
        </label>
        <label className="items-center pl-1">
          <input
            type="checkbox"
            className="form-checkbox text-red-600 border rounded"
            onClick={() => sendCheckCruces(!checkCruces)}
            checked={checkCruces}
          />
          <span className="text-xs px-1">Solo Cruces</span>
        </label>
      </div>
      {
        !ready || hechosData.loading ? <Loading /> :
          <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer style={{ maxHeight: 560 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead className="bg-gray-300 border border-gray-400">
                  <TableRow>
                    <TableCell  align="center">
                      <TableSortLabel
                        active={orderBy === "Hora"}
                        direction={orderBy === "Hora" ? order : 'asc'}
                        onClick={() => handleSort("Hora")}
                      >
                        Hora
                      </TableSortLabel>
                    </TableCell>
                    <TableCell  align="center">
                      <TableSortLabel
                        active={orderBy === "Exchange"}
                        direction={orderBy === "Exchange" ? order : 'asc'}
                        onClick={() => handleSort("Exchange")}>
                        Bolsa
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "Folio"}
                        direction={orderBy === "Folio" ? order : 'asc'}
                        onClick={() => handleSort("Folio")}>
                        Folio
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "Compra"}
                        direction={orderBy === "Compra" ? order : 'asc'}
                        onClick={() => handleSort("Compra")}>
                        Compra
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "Vende"}
                        direction={orderBy === "Vende" ? order : 'asc'}
                        onClick={() => handleSort("Vende")}>
                        Vende
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "Precio"}
                        direction={orderBy === "Precio" ? order : 'asc'}
                        onClick={() => handleSort("Precio")}>
                        Precio
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "Volumen"}
                        direction={orderBy === "Volumen" ? order : 'asc'}
                        onClick={() => handleSort("Volumen")}>
                        Volumen
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "Importe"}
                        direction={orderBy === "Importe" ? order : 'asc'}
                        onClick={() => handleSort("Importe")}>
                        Importe
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="max-h-sm overflow-y-auto" >
                  {rows.length > 0 ?
                    rows
                      .sort(order === "asc" ? ascCompare : desCompare)
                      .map((row, i) => (
                        <Row key={row.id} row={row} />
                      ))
                    : ""
                  }
                </TableBody>
              </Table>
             </TableContainer>
          </Paper>

      }
    </div>
  );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
  return {
    loginObject: store.loginObjectState,
    hechosData: store.hechos
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getHechosRequest: () => dispatch(getHechosRequest)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hechos);