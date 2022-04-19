import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button";
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { RootState } from '../reducers/rootReducer';
import { getDsOrdenesRequest } from '../actions/ordenesAction';
import { OrdenesStatus } from '../types/OrdenesTypes';
import { orange, red } from '@material-ui/core/colors';
import { DataGrid, GridRowsProp, GridColDef, GridToolbarContainer, GridToolbarExport, } from '@material-ui/data-grid';
import {
  ConsultasDataTableR1,
  ConsultasDataTableC1,
} from '../mocks/ConsultasDataTable'
import { makeStyles } from '@material-ui/styles';

  const useStyles = makeStyles({
    root: {
      '& .super-app-theme--header': {
        backgroundColor: 'rgba(255,255,255, 0.9)',
      },
    },
  });

interface propsFromState {
  ordenes?: OrdenesStatus;
}
function ExportSelectorGrid({ ordenes }: propsFromState) {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    let message = "/consulta/ordenes?cuenta=266563&";
    let params = ["6FVeF6F5G76BbEK89Oi1X3LJo8PdUifp7AS6DgrK", "1", "266563", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab", "10100"]
    let a = { message, params }
    dispatch(getDsOrdenesRequest(a));
  }, []);

  useEffect(() => {
    if (ordenes?.tdsOrdenesCap.length != null && ordenes?.tdsOrdenesEstado[0].estatusCap)
      console.log(ordenes?.tdsOrdenesCap)
  }, [ordenes?.tdsOrdenesCap.length])

  return (
    <div className={classes.root}>
      <DataGrid
        rows={ConsultasDataTableR1}
        columns={ConsultasDataTableC1}
        autoHeight
        hideFooterPagination
        disableColumnMenu
      />
    </div>
    );

}
//Get data from store

const mapStateToProps = (store: RootState) => {

  return {

    ordenes: store.ordenes,

  };

};

//Post data to the store

const mapDispatchToProps = (dispatch: any) => {

  return {

    getDsOrdenesRequest: () => dispatch(getDsOrdenesRequest(dispatch)),

  };

};

export default connect(mapStateToProps, mapDispatchToProps)(ExportSelectorGrid);