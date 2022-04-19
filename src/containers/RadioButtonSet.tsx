import React from 'react';

import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

export interface RadioButtonOption {
    value: string;
    label: string;
}

interface propsFromState {
    selected: string;
    setSelected: (newSelected: string) => void;
    options: RadioButtonOption[];
    isSetDisabled: boolean;
}

type AllProps = propsFromState;

const RadioButtonSet: React.FC<AllProps> = ({ selected, setSelected, options, isSetDisabled }) => {

    console.log("Entro a RadioButtonSet: ");
    console.log("isSetDisabled = ", isSetDisabled);

    const colorActiveRadioButton = isSetDisabled === true ? "text-gray-650" : "text-red-600";
    const colorInactiveRadioButton = isSetDisabled === true ? "text-gray-650" : "text-gray-700";

    return(
        <div className="w-full flex flex-row ">
            {
                options.map(function(r: RadioButtonOption){
                    return (
                        <div
                            key={r.value}
                            onClick={() => {
                                setSelected(r.value);
                            }}
                        >
                            <div className={"flex flex-row my-2 mr-2 " + (isSetDisabled === true ? "hover:cursor-not-allowed" : "hover:cursor-pointer")}>
                                {
                                    selected === r.value ? 
                                        <MdRadioButtonChecked className={"mr-2 text-lg " + colorActiveRadioButton} />
                                    :
                                        <MdRadioButtonUnchecked className={"mr-2 text-lg " + colorInactiveRadioButton} />
                                }
                                <p className={"mr-3 " + (isSetDisabled === true ? colorActiveRadioButton : "")}>{r.label}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default RadioButtonSet;