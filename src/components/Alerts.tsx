import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

//import { SimpleTable } from "../containers/SimpleTable";
//import { SimpleTableData } from "../mocks/SimpleTableData";

import Appbar from './Appbar';
import { appBarMockData } from '../mocks/Appbar';
import { RootState } from '../reducers/rootReducer';

//import { Sidebar } from '../components/Sidebar';
import { sidebarMockData } from '../mocks/Sidebar';

import { Tabs } from "../containers/Tabs";
import { TabsData } from "../mocks/TabsData";

import { getAlertRequest } from '../actions/alertGet';

interface propsFromState {
    alertsComponents: boolean;
}

type AllProps = propsFromState; 

const Alerts: React.FC<AllProps> = ({ alertsComponents }) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAlertRequest("22f94cb4-67d6-4f29-9248-ff7f32657cfa"));
    },[])

    return(
        <div className="bg-gray-100 h-screen">
            <Appbar appBarData={appBarMockData}/>
            <div className="flex-auto w-4/5">
                <div className="flex flex-row">
                    <div className="row-1 bg-white">
                        {/* <Sidebar sidebarData={sidebarMockData} /> */}
                    </div>
                    <div className="row2 pl-10 pt-10 w-full px-8 ml-16">
                        <h1 className="font-sans text-lg text-gray-800 border-b-2 border-gray-300 pb-2 mb-8 ml-2">Alertas</h1>
                        <h1 className="font-mono text-lg text-gray-900 pb-2 mb-8 ml-2">Configuración de alertas</h1>
                        <Tabs color="red" tabsData={TabsData()} typeAlert={false}/>
                        <h1 className="font-sans font-bold text-sm text-gray-800 mb-4 ml-4">Estatus de Alertas</h1>
                        <div className="mb-6 ml-4">
                            {/* <SimpleTable color="red" extend={true} tabsData={SimpleTableData()}/>  */}
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
    
}

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getAlertRequest: () => dispatch(getAlertRequest(dispatch)),
    };
  };
  
  //Get data from store
  const mapStateToProps = ( store: RootState ) => {
    return {
        getAlert: store.getAlert.alertGet,
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Alerts);