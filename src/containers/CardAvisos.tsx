import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { MdTimeline } from 'react-icons/md';
import { IoDocumentTextOutline } from "react-icons/io5";

//State of the component
interface propsFromState {
    noticia: boolean;
}

type AllProps = propsFromState;

const CardAvisos: React.FC<AllProps> = ({ noticia }) =>{
    return(
        <div className="flex-1">
            <Card body>
                <CardTitle className="flex">
                    <span> { noticia ? <IoDocumentTextOutline className="text-red-600 font-bold text-lg mr-2" /> : <MdTimeline className="text-red-600 font-bold text-lg mr-2" /> } </span><span className="font-semibold text-red-600">{ noticia ? "Noticia" : "Price Movement" }</span>
                </CardTitle>
                <CardTitle className="font-mono text-gray-400 text-sm">Hora</CardTitle>
                <CardText className="font-sans text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CardText>
                <div className="flex justify-end mt-2">
                    <button className="font-mono text-xs font-medium text-red-600 underline hover:text-red-400">Ver más</button>
                </div>
            </Card>
        </div>
    );
}

export default CardAvisos;