import React from 'react';

//State of the component
interface propsFromState {
    list: { 
        list_id : string;
        list_name: string;
    };
}

type AllProps = propsFromState;

const ListIssuer: React.FC<AllProps> = ({ list }) =>{

    return(
        <div className="pl-1">
            <div className="flex max-w-sm bg-gray-100 border border-gray-300 rounded-md py-2 shadow-md cursor-pointer hover:bg-gray-200">
                <div className="px-3">
                    <p className="font-sans text-xs font-medium align-middle text-gray-700 font-bold"> {list.list_name} </p>
                </div>
            </div>
        </div>
    );
}

export default ListIssuer;