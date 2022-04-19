import React from 'react';

import ListIssuer from '../containers/ListIssuer';
import { listas } from '../types/GetIssuerListsType';

interface ListIssuerProps {
    listas: listas[];
}

const ListIssuerContainer: React.FC<ListIssuerProps> = ({ listas }) =>{

    return(
        <div className="flex mr-6">
            {
                listas.map((lista: any) => {
                    return(
                        <div>
                            <ListIssuer list={lista} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default ListIssuerContainer;