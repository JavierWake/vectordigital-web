import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../reducers/rootReducer';
import '../styles/table.css';

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from '@mui/material/TableFooter';
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { postLoginObjectLogout } from '../actions/loginObjectAction';

import { getAcumuladoRequest } from "../actions/acumuladoAction";
import Loading from "../components/Loading";
import { Dropdown } from "./Dropdown";
import { DropdownDataBolsas } from "../mocks/DropdownData";
import { LoginObjectState } from "../types/LoginObjectTypes";

import { MdSearch } from "react-icons/md";

interface acumulado {
  id: number;
  casa: string;
  porcentaje: string;
  compras: string;
  ventas: string;
  importeCompra: string;
  pCompra: string;
  importeVenta: string;
  pVenta: string;
  vCompra: string;
  pCompra2: string;
  vVenta: string;
  pVenta2: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

interface AcumuladoProps {
  loginObject?: LoginObjectState;
  acumuladoData: any;
  emisora: any;
  serie: any;
}

const Acumulado: React.FC<AcumuladoProps> = ({ loginObject, acumuladoData, emisora, serie }) => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  const [rows, setRows] = useState<acumulado[]>(acumuladoData);
  const [searched, setSearched] = useState<string>("");
  const classes = useStyles();
  const [bolsa, setBolsa] = useState("BMV");
  const [id, setId] = useState("BMV");
  const [orderBy, setOrderBy] = useState("casa"); // Initial state is columns are sorted by Grade
  const [order, setOrder] = useState<'desc' | 'asc' | undefined>('asc'); // Initial State is ascending

  // Totales
  const[totalC, setTotalC] = useState(0);
  const[totalV, setTotalV] = useState(0);
  const[totalIC, setTotalIC] = useState(0);
  const[totalIV, setTotalIV] = useState(0);
  const[totalVC, setTotalVC] = useState(0);
  const[totalVV, setTotalVV] = useState(0); 


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
        
                const idLO = loginObject.response.dsLogin.tdsLogin[0].id;
                const tokenLO = loginObject.response.dsLogin.tdsLogin[0].token;
                const canal = "999";
                const cuentaLO = loginObject.response.dsLogin.tdsLogin[0].cuentacontrato.toString();

                sendCtaCtoDispatch(cuentaLO);
                sendParamsDispatch([ canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()]);
        
                let message = "cap/emisoraacumulado?emisora=" + emisora + "&serie=" + serie + "&bolsa=" + bolsa;
                let params = [canal, cuentaSesionLO.toString(), tokenLO, idLO.toString()];
                let a = { message, params }
                dispatch(getAcumuladoRequest(a));

                setReady(!ready);
            }
        }
        else{
            //el usuario no esta loggeado, lo mandamos al login
            console.log("usuario no loggeado en acumulado, lo mandamos al login");
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
        };
      }
    }
    else{
      //el usuario no esta loggeado, lo mandamos al login
      console.log("usuario no loggeado en acumulado, lo mandamos al login");
      history.push("/");
    }
  },[]);

  useEffect(() => {
    if(ready){
      let message = "cap/emisoraacumulado?emisora=" + emisora + "&serie=" + serie + "&bolsa=" + bolsa;
      let params = paramsDispatch;
      let a = { message, params }
      dispatch(getAcumuladoRequest(a));
    }
  },[emisora, serie]);

  useEffect(() => {
    if(!acumuladoData.loading){
      setRows(acumuladoData.tdsAcumulado);

      let tC = 0;
      let tV = 0;
      let tIC = 0;
      let tIV = 0;
      let tVC = 0;
      let tVV = 0;

      acumuladoData.tdsAcumulado.map((r) => {
        tC = tC + r["comprasOp"];
        tV = tV + r["ventasOp"];
        tIC = tIC + r["compraMto"];
        tIV = tIV + r["ventaMto"];
        tVC = tVC + r["compraTit"];
        tVV = tVV + r["ventaTit"];
      });

      setTotalC(tC);
      setTotalV(tV);
      setTotalIC(tIC);
      setTotalIV(tIV);
      setTotalVC(tVC);
      setTotalVV(tVV);
    }
  }, [acumuladoData.loading])

  const requestSearch = (e: any) => {
    let searchedVal = e.currentTarget.value;
    const filteredRows = acumuladoData.tdsAcumulado.filter((row: any) => {
      return row.casa.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setRows(filteredRows);
    setSearched(searchedVal);
  };

  const sendBolsa = (data: string) => {
    if(id === data){
      return;
    }
    
    setId(data);

    let message = "cap/emisoraacumulado?emisora=" + emisora + "&serie=" + serie + "&bolsa=" + data;
    let params = paramsDispatch;
    let a = { message, params }
    dispatch(getAcumuladoRequest(a));
  }

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

  return (
    <div>
      <div className="flex w-full justify-end items-center my-4">
        <div className="flex justify-end w-2/3 items-center mx-4">
          <p className="mr-2">Bolsa</p>
          <div className="w-1/6">
            <Dropdown
              dropdownData={DropdownDataBolsas}
              initialOption={bolsa}
              side={false}
              sendOption={(bolsa: any) => setBolsa(bolsa)}
              sendId={(id: any) => sendBolsa(id)}
              fondosFamilia={false}
            />
          </div>
        </div>
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
      </div>
      {
        !ready || acumuladoData.loading ? <Loading /> :
          <Paper>
            <TableContainer>
              <Table className={classes.table} stickyHeader aria-label="sticky table">
                <TableHead className="bg-gray-300 border border-gray-400">
                  <TableRow>
                    <TableCell align="center" className="text-xs">
                      <TableSortLabel
                        active={orderBy === "casa"}
                        direction={orderBy === "casa" ? order : 'asc'}
                        onClick={() => handleSort("casa")}
                      >
                        Casa
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center" >
                      <TableSortLabel
                        active={orderBy === "porcentajeOp"}
                        direction={orderBy === "porcentajeOp" ? order : 'asc'}
                        onClick={() => handleSort("porcentajeOp")}
                      >
                        %
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center" >
                      <TableSortLabel
                        active={orderBy === "comprasOp"}
                        direction={orderBy === "comprasOp" ? order : 'asc'}
                        onClick={() => handleSort("comprasOp")}
                      >
                        Compras
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center" >
                      <TableSortLabel
                        active={orderBy === "ventasOp"}
                        direction={orderBy === "ventasOp" ? order : 'asc'}
                        onClick={() => handleSort("ventasOp")}
                      >
                        Ventas
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center" >
                      <TableSortLabel
                        active={orderBy === "compraMto"}
                        direction={orderBy === "compraMto" ? order : 'asc'}
                        onClick={() => handleSort("compraMto")}
                      >
                        Importe Compra
                      </TableSortLabel>
                    </TableCell>
                    <TableCell  align="center">
                      <TableSortLabel
                        active={orderBy === "compraMtoPorc"}
                        direction={orderBy === "compraMtoPorc" ? order : 'asc'}
                        onClick={() => handleSort("compraMtoPorc")}
                      >
                        Compra %
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "ventaMto"}
                        direction={orderBy === "ventaMto" ? order : 'asc'}
                        onClick={() => handleSort("ventaMto")}
                      >
                        Importe Venta
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "ventaMtoPorc"}
                        direction={orderBy === "ventaMtoPorc" ? order : 'asc'}
                        onClick={() => handleSort("ventaMtoPorc")}
                      >
                        Venta %
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "compraTit"}
                        direction={orderBy === "compraTit" ? order : 'asc'}
                        onClick={() => handleSort("compraTit")}
                      >
                        Vol. Compra
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "compraTitPorc"}
                        direction={orderBy === "compraTitPorc" ? order : 'asc'}
                        onClick={() => handleSort("compraTitPorc")}
                      >
                        Compra %
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "ventaTit"}
                        direction={orderBy === "ventaTit" ? order : 'asc'}
                        onClick={() => handleSort("ventaTit")}
                      >
                        Vol. Venta
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy === "ventaTitPorc"}
                        direction={orderBy === "ventaTitPorc" ? order : 'asc'}
                        onClick={() => handleSort("ventaTitPorc")}
                      >
                        Venta %
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 ?
                    rows
                      .sort(order === "asc" ? ascCompare : desCompare)
                      .map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell align="center" component="th" scope="row">{row.casa}</TableCell>
                          <TableCell align="right">{row.sPorcentajeOp}</TableCell>
                          <TableCell align="right">{row.sComprasOp}</TableCell>
                          <TableCell align="right">{row.sVentasOp}</TableCell>
                          <TableCell align="right">{row.sCompraMto}</TableCell>
                          <TableCell align="right">{row.sCompraMtoPorc}</TableCell>
                          <TableCell align="right">{row.sVentaMto}</TableCell>
                          <TableCell align="right">{row.sVentaMtoPorc}</TableCell>
                          <TableCell align="right">{row.sCompraTit}</TableCell>
                          <TableCell align="right">{row.sCompraTitPorc}</TableCell>
                          <TableCell align="right">{row.sVentaTit}</TableCell>
                          <TableCell align="right">{row.sVentaTitPorc}</TableCell>
                        </TableRow>
                      ))
                    : ""
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell/>
                    <TableCell/>
                    <TableCell align="right" style={{ fontWeight: 'bolder'}}>{totalC}</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bolder'}}>{totalV}</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bolder'}}>{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(totalIC)}</TableCell>
                    <TableCell/>
                    <TableCell align="right" style={{ fontWeight: 'bolder'}}>{Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(totalIV)}</TableCell>
                    <TableCell/>
                    <TableCell align="right" style={{ fontWeight: 'bolder'}}>{totalVC.toLocaleString('en-US')}</TableCell>
                    <TableCell/>
                    <TableCell align="right" style={{ fontWeight: 'bolder'}}>{totalVV.toLocaleString('en-US')}</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableFooter>
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
    acumuladoData: store.acumulado
  };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAcumuladoRequest: () => dispatch(getAcumuladoRequest)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Acumulado);