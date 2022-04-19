import React, { useState } from 'react';
import { CSVLink } from "react-csv";

export interface propsFromState {
    exportData: string[];
    data: any;
    headers: string[];
}

type AllProps = propsFromState; 

const ExportButton : React.FC<AllProps> =  ({ exportData, data, headers }: AllProps) => {

    const [openTab, setOpenTab] = useState(0);
    
        return(
        <div>
{/*             <nav  className=" border-gray-300 border-b-2">
                <ul>
                    {
                        exportData.map((title: any, index: number) => {
                            return(
                                <li className={ ("inline-block list-none py-2 border-transparent border-b-2 hover:border-red-600 hover:text-red-600 cursor-pointer ") + (index === 0 ? " px-2 " : " px-4 ") + ( index === openTab ? " text-red-600 border-red-600 " : "")}
                                onClick= {() => setOpenTab(index)}
                                key={index}
                                >
                                    <a className="no-underline hover:text-red-600">{title}</a>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav> */}
            <div className="py-10">
                {data[openTab].content}
            </div>            
        </div>        
    );
}

export default ExportButton;