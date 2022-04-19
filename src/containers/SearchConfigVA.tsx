import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import parse from "html-react-parser";

import { MdClose, MdAdd } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { Emisora } from '../types/GetCatalogoEmisotasType';

export interface SearchConfigVAProps {
    searchData: DataSearchAppbar[];
    listaEmisoras: any;
    sendEmisora: (emisora: string, tipo: string) => void;
}

export interface DataSearchAppbar {
    id: string;
    title: string;
    optionsEmisoras: Emisora[];
    noMatch: string;
    placeholder: string;
}

const SearchConfigVA = ({ searchData, listaEmisoras, sendEmisora }: SearchConfigVAProps) => {

    const [activeOption, setActiveOption] = useState<number>(0);
    const [filteredOptions, setFilteredOptions] = useState<Emisora[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [userInput, setUserInput] = useState<string>("");
    const [onClickEnOpcion, setOnClickEnOpcion] = useState(false);

    const sendShowOptions = (data: boolean) => {
        if (showOptions === data) {
            return;
        }
        setShowOptions(data);
    }

    const sendActiveOption = (data: number) => {
        if (activeOption === data) {
            return;
        }
        setActiveOption(data);
    };

    const sendFilteredOptions = (data: Emisora[]) => {
        if (filteredOptions === data) {
            return;
        }
        setFilteredOptions(data);
    };

    const sendUserInput = (data: string) => {
        if (userInput === data) {
            return;
        }
        setUserInput(data);
    };

    const sendOnClickEnOpcion = (data: boolean) => {
        if (onClickEnOpcion === data) {
            return;
        }
        setOnClickEnOpcion(data);
    }

    //cada vez que cambiemos user input
    useEffect(() => {
        if (userInput.length > 0) {
            //userInput tiene texto
            let filteredOptionsUserInput = searchData[0].optionsEmisoras.filter(
                (option: Emisora) => {
                    //CORREGIR ESTA VALIDACION
                    return (option.Emisora.toLowerCase() + "." + option.Serie.toLowerCase()).startsWith(userInput.toLowerCase()) || option.CommonName.toLowerCase().startsWith(userInput.toLowerCase());
                }
            );

            //hacemos sort por commonName
            filteredOptionsUserInput = filteredOptionsUserInput.sort((a, b) => ((a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase()) > (b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase())) ? 1 : (((b.Emisora.toLowerCase() + "." + b.Serie.toLowerCase()) > (a.Emisora.toLowerCase() + "." + a.Serie.toLowerCase())) ? -1 : 0));

            if (filteredOptionsUserInput.length === 0) {
                //lo que esta buscando el usuario no existe en la lista
                sendActiveOption(-1);
            }
            else {
                sendActiveOption(0);
            }

            if (onClickEnOpcion === true) {
                return;
            }

            sendFilteredOptions(filteredOptionsUserInput);
            sendShowOptions(true);
        }
        else {
            sendShowOptions(false);
        }
    }, [userInput]);

    const onChange = (e: any) => {
        //cambiamos userInput para que se active su useEffect
        sendOnClickEnOpcion(false);
        sendUserInput(e.currentTarget.value);
    };

    const onClick = (opcionClickeada: Emisora, indexOpcionClickeada: number) => {
        sendActiveOption(indexOpcionClickeada);
        sendOnClickEnOpcion(true);

        const emisoraSerie: string = (opcionClickeada.Emisora + "." + opcionClickeada.Serie).toUpperCase();

        if (listaEmisoras.includes(emisoraSerie)) {
            // Se elimina
            sendEmisora(emisoraSerie, "eliminar");
        }
        else {
            // Se agrega
            sendEmisora(emisoraSerie, "agregar");
        }
    };

    const onKeyDown = (e: any) => {
        if (e.keyCode === 27) {
            //tecla esc
            sendActiveOption(0);
            sendShowOptions(false);
        } else if (e.keyCode === 13) {
            //tecla enter
            if (filteredOptions[activeOption] == undefined) {
                return;
            }
            
            const emisoraSerie: string = (filteredOptions[activeOption].Emisora + "." + filteredOptions[activeOption].Serie).toUpperCase();

            if (listaEmisoras.includes(emisoraSerie)) {
                // Se elimina
                sendEmisora(emisoraSerie, "eliminar");
            }
            else {
                // Se agrega
                sendEmisora(emisoraSerie, "agregar");
            }

        } else if (e.keyCode === 38) {
            //tecla flecha hacia arriba
            if (activeOption === 0) {
                return;
            }
            sendActiveOption(activeOption - 1);
        } else if (e.keyCode === 40) {
            //tecla flecha hacia abajo
            if (activeOption === filteredOptions.length - 1) {
                //console.log(activeOption);
                return;
            }
            sendActiveOption(activeOption + 1);
        }
    };

    const onFocusSelectText = (event: any) => {
        event.target.select();
    };

    let optionList = (<div></div>);
    if (showOptions) {
        if (filteredOptions.length > 0) {
            let contador = 0;
            optionList = (
                <ul className="absolute z-40 w-full max-h-60 overflow-y-auto ring-1 ring-black ring-opacity-5 focus:outline-none text-xs">
                    <li onClick={() => {
                        sendUserInput("");
                        sendShowOptions(false);
                    }} className="text-gray-500 bg-white cursor-pointer py-1 px-2.5">
                        <div className="flex flex-row justify-between">
                            <p className="text-xxs">Cerrar respuestas de este buscador</p>
                            <MdClose className="text-sm" />
                        </div>
                    </li>
                    {filteredOptions.map((option: Emisora, index) => {
                        contador++;
                        const emisoraSerie: string = (option.Emisora + "." + option.Serie).toUpperCase();
                        const emisoraSerieReplace: string = userInput.length > 0 ?
                            emisoraSerie.replace(userInput.toUpperCase().trim(), "<b id='bold' class='font-bold hover:text-red-600'>" + userInput.toUpperCase().trim() + "</b>")
                            : emisoraSerie;
                        const nombreEmpresaReplace: string = userInput.length > 0 ?
                            option.CommonName.replace(userInput.toUpperCase().trim(), "<b id='bold' class='font-bold hover:text-red-600'>" + userInput.toUpperCase().trim() + "</b>")
                            : option.CommonName.toUpperCase();

                        return (
                            <li
                                className={`filter drop-shadow-xl cursor-pointer select-none relative hover:font-bold group hover:text-red-600 py-1 px-2.5 ${(index === activeOption) ? "bg-red-600 text-white" : "bg-white"}`} //"w-full text-gray-500 bg-white filter drop-shadow-xl cursor-pointer select-none relative hover:bg-gray-100 group hover:text-red-600 py-1 px-3"
                                key={option.RIC + contador.toString()}
                                onClick={() => onClick(option, index)}
                            >
                                <div className="flex flex-row justify-between items-center">
                                    <div className="w-1/5 pr-1">
                                        <p className="mr-2">{parse(emisoraSerieReplace)}</p>
                                    </div>
                                    <div className="w-3/5 pr-1">
                                        <p>{parse(nombreEmpresaReplace)}</p>
                                    </div>
                                    {
                                        listaEmisoras.includes(emisoraSerie) ?
                                            <BsTrash />
                                            :
                                            <MdAdd />
                                    }
                                </div>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            optionList = (
                <ul className="absolute z-40 w-full max-h-60 py-2 ring-1 ring-black overflow-show ring-opacity-5 focus:outline-none text-xs">
                    <li onClick={() => {
                        sendUserInput("");
                        sendShowOptions(false);
                    }} className="w-full text-gray-500 bg-white cursor-pointer py-1 px-2.5">
                        <div className="w-full flex flex-row justify-between">
                            <p className="text-xxs text-left">Cerrar respuestas de este buscador</p>
                            <MdClose className="text-sm text-right" />
                        </div>
                    </li>
                    <li className="text-black bg-white filter drop-shadow-xl cursor-not-allowed select-none relative hover:bg-gray-100 py-1 pl-3 pr-9">
                        {searchData[0].noMatch}
                    </li>
                </ul>
            );
        }
    } else {
        optionList = (
            <div></div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <div className="w-full pt-2">
                <input
                    type="text"
                    className="w-full p-2 pl-8 text-xs rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 hover:red-600 border border-1 border-gray-200"
                    placeholder={searchData[0].placeholder}
                    onFocus={onFocusSelectText}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
            </div>
            <div className="relative w-full bg-gray-100 shadow-lg">
                {optionList}
            </div>
        </div>
    );
};

export { SearchConfigVA };
