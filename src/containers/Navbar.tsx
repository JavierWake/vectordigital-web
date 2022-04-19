import React, { useState } from 'react';

export interface propsFromState {
    navData: string[];
    data: any;
    styleIsButtons?: boolean;
}

type AllProps = propsFromState; 

const Navbar : React.FC<AllProps> =  ({ navData, data, styleIsButtons }: AllProps) => {

    const [openTab, setOpenTab] = useState(0);
    
        return(
        <div>
            <nav  className={ (styleIsButtons !== undefined && styleIsButtons === true) ? "" : "border-gray-300 border-b"}>
                <ul>
                    {
                        navData.map((title: any, index: number) => {
                            return(
                                <li 
                                    className={ 
                                        (styleIsButtons !== undefined && styleIsButtons === true) ? 
                                            `inline-block list-none py-2 px-4 text-center hover:bg-red-600 hover:text-white
                                                ${index === 0 ? " rounded-l-md " : ""}
                                                ${index === (navData.length -1) ? " rounded-r-md " : ""}
                                                ${index === openTab ? " bg-red-600 text-white " : " bg-gray-200 text-gray-350 "}
                                            `
                                        :
                                            /* este style es el default */
                                            ("inline-block list-none py-2 border-transparent border-b-2 hover:border-red-600 hover:text-red-600 cursor-pointer ") 
                                            + (index === 0 ? " px-2 " : " px-4 ") 
                                            + ( index === openTab ? " text-red-600 border-red-600 " : "")
                                    }
                                    onClick= {() => setOpenTab(index)}
                                    key={index}
                                >
                                    <a className={`no-underline ${(styleIsButtons !== undefined && styleIsButtons === true) ? "hover:text-white" : " hover:text-red-600"}`}>{title}</a>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
            <div className="pt-2">
                {data[openTab].content}
            </div>            
        </div>        
    );
}

export default Navbar;