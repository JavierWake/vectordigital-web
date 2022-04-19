import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import { INews } from '../types/NewsTypes';

import Notices from './Notices';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface propsFromState {
    newsItems: INews[];
    ric: any;
}

type AllProps = propsFromState;

const News: React.FC<AllProps> = ({ newsItems, ric }) => {
    const [index, setIndex] = useState(1);
    const [paginas, setPaginas] = useState(1);
    const [isDisabledI, setDisabledI] = useState(true);
    const [isDisabledD, setDisabledD] = useState(true);
    const [isBetween, setBetween] = useState(false);


    useEffect(() => {
        if (newsItems?.length != null) {
            let resultado = Math.ceil(newsItems?.length / 5);
            setPaginas(resultado);

            if (newsItems?.length % 5 != 0) {
                setBetween(true);
            } 
            else {
                setBetween(false);
            }

            if (resultado > 1) {
                setDisabledD(false);
            }
        }
    }, [ newsItems?.length ]);

    return (
        newsItems.length === 0 || newsItems[0].id === "" ? <div>No hay noticias por el momento</div> : 
        <div>
            <div className="">
                {
                    newsItems?.slice((index - 1) * 5, index * 5).map((value) => {
                        return (
                            <div className="">
                                <Notices noticeItems={value} ric={ric} />
                            </div>
                        );
                    })
                }
            </div>
            <div className="flex justify-center mt-8">
                <ul className="flex items-center">
                    <li className="flex items-center cursor-pointer">
                        <button onClick={() => { setIndex(index - 1); if ((index - 1) === 1) setDisabledI(true); setDisabledD(false) }} disabled={isDisabledI}>
                            <MdKeyboardArrowLeft className={"font-bold text-2xl text-gray-500 rounded-xl " + (isDisabledI ? "" : "hover:bg-gray-300")} />
                        </button>
                    </li>
                    <li className="flex items-center cursor-pointer mx-4">
                        <p className="text-gray-500">
                            {index} de {paginas}
                        </p>
                    </li>
                    <li className="flex items-center cursor-pointer">
                        <button onClick={() => { setIndex(index + 1); if ((index + 1) === paginas) setDisabledD(true); setDisabledI(false) }} disabled={isDisabledD}>
                            <MdKeyboardArrowRight className={"font-bold text-2xl text-gray-500 rounded-xl " + (isDisabledD ? "" : "hover:bg-gray-300")} />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default News;