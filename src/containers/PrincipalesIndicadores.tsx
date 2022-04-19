import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Redux
import { connect, useDispatch} from 'react-redux';
import { RootState } from '../reducers/rootReducer';

//Actions to call redux store
import { getCommoditiesRequest } from '../actions/commoditiesAction';
import { CommoditiesState } from '../types/CommoditiesType';

interface propsFromState {
  commodities: CommoditiesState;
}

type AllProps = propsFromState;

const PrincipalesIndicadoresComponent: React.FC<AllProps> = ({ commodities }) =>{
    
  //const dispatch = useDispatch();

  return(
    <div className="shadow-md rounded-md">
      <Table size="small" aria-label="a dense table" >
        <TableHead className="">
          <TableRow > 
            <TableCell style={{color: '#000000'}} align="left" >Nombre</TableCell>
            <TableCell style={{color: '#000000'}} align="right">Precio</TableCell>
            <TableCell style={{color: '#000000'}} align="right">Variación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            commodities.response.indices.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" className=""  style={{fontWeight:'bold'}}>
                  {row.name}
                </TableCell>
                <TableCell style={{fontWeight:'normal'}} align="right">
                  {row.precio}
                </TableCell>
                { 
                  /\d/.test(row.variacion.toString()) && parseInt(row.variacion.toString()) ? 
                    <TableCell style={{fontWeight:'bold'}}  align="right" className="negativo" >{row.descVariacion}</TableCell>
                  :
                    <TableCell style={{fontWeight:'bold'}}  align="right" className="positivo">{row.descVariacion}</TableCell>
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalesIndicadoresComponent);