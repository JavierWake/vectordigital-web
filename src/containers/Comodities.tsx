import React, {useEffect} from "react";

// Redux
import { connect, useDispatch} from 'react-redux';
import { RootState } from '../reducers/rootReducer';

//Actions to call redux store
import { getCommoditiesRequest, getCommoditiesReceive } from '../actions/commoditiesAction';
import { CommoditiesState, IndicesArray } from '../types/CommoditiesType';

//CSS
import "../styles/comodities.css";

//Tailwind
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface propsFromState {
  commodities: CommoditiesState;
}

type AllProps = propsFromState; 

const Comodities: React.FC<AllProps> = ({ commodities }) => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    let message = "commodities";
    let a = { message };
    dispatch(getCommoditiesRequest(a));
  }, []);
  
    return (
      <div className="shadow-md rounded-md">
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Variación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              commodities.response.commodities.map((row : IndicesArray) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" style={{fontWeight:'normal'}} scope="row">{row.name}</TableCell>
                  <TableCell style={{fontWeight:'normal'}} align="right">{row.precio}</TableCell>
                  { 
                    /\d/.test(row.variacion.toString()) && parseInt(row.variacion.toString()) < 0 ?
                      <TableCell align="right" style={{fontWeight:'bold'}} className="negativo" >{row.descVariacion}</TableCell>
                    :
                      <TableCell align="right" style={{fontWeight:'bold'}} className="positivo">{row.descVariacion}</TableCell>
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Comodities);