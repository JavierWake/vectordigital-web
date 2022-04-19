import React from 'react';

import { Tabs } from './Tabs';
import { TabsIssuer } from '../mocks/TabsData';

const IssuerTrading: React.FC = () => {

    return(
        <div className="bg-white p-3">
            <h1 className="font-sans font-bold">Nombre de la Emisora</h1>
            <Tabs color="red" tabsData={TabsIssuer()} typeAlert={true}/>
        </div>
    );

}

export default IssuerTrading;