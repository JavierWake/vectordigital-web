import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { INews } from '../types/NewsTypes';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import parse, { HTMLReactParserOptions } from "html-react-parser";

import Loading from "../components/Loading";

import { getStoryRequest } from '../actions/storyAction';
import { StoryState } from '../types/ModalNewsTypes';
import { RootState } from '../reducers/rootReducer';
import { CatalogoEmisorasState, Emisora } from '../types/GetCatalogoEmisotasType';

//State of the component
interface propsFromState {
    noticeItems: INews;
    storyItems: StoryState;
    ric: any;
    catalogoEmisorasRespuesta: CatalogoEmisorasState;
}

type AllProps = propsFromState;


const Notices: React.FC<AllProps> = ({ noticeItems, storyItems, ric, catalogoEmisorasRespuesta }) => {

    const { id, title, desc, time, tags, prov } = noticeItems;

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    const [alertShow, setAlertShow] = useState(false);

    const [checkRedirect, setCheckRedirect] = useState(false);
    const [redirectRic, setRedirectRic] = useState("");

    const descNotice = desc.replace(/(<([^>]+)>)/gi, "");
    let v = storyItems.modal?.story || "<p></p>";

    const loadTag = (data:any) => {
        let ticker = ric.split('.')[0];

        if(ticker != data){
            let emisoraSeleccionadaRICArray: Emisora[] = catalogoEmisorasRespuesta.catalogoEmisorasRespuesta.filter(function(item: Emisora){
                return item.PrimaryRIC.trim().split('.')[0] == data;
            });

            if(emisoraSeleccionadaRICArray.length > 0){
                let emisora = emisoraSeleccionadaRICArray[0].Emisora.trim();
                let serie = emisoraSeleccionadaRICArray[0].Serie.trim();
                setRedirectRic(emisora + "." + serie);
                setCheckRedirect(true);
            }
            else{
                setModal2(true);
            }
        }
    }

    if(checkRedirect)
        return <Redirect push to={'/emisora/' + redirectRic } />
    
    return (
        <div className="flex">
            <div className="w-full border-gray-300">
                <div className="flex-col border-b-2 mt-2 hover:shadow-xl p-4">
                    <div className="font-sans text-base font-medium cursor-pointer my-2.5" onClick={() => { dispatch(getStoryRequest("noticia/" + id)); setModal(true) }}>
                        <p> {parse(title)} </p>
                    </div>
                    <div>
                        <p className="text-sm pr-2 cursor-pointer" onClick={() => { dispatch(getStoryRequest("noticia/" + id)); setModal(true) }}> {parse(desc)} </p>
                    </div>
                    <div className="font-sans text-xs text-gray-600 py-2 cursor-pointer" onClick={() => { dispatch(getStoryRequest("noticia/" + id)); setModal(true) }}>
                        <span className="border-r-2 border-gray-300 pr-2"> {time} </span>
                        <span className="px-2"> {prov} </span>
                    </div>
                    <div className="flex justify-between pr-4">
                        <div>
                            {
                                tags.slice(0,5).map((t, index) => {
                                    return (
                                        <button className={"font-sans text-xs font-medium text-red-600 border-1 border-red-600 rounded-full px-2 py-0.5 " + (index === 0 ? "mr-2" : "mx-2")} onClick={() => {loadTag(t);}}>{t}</button>
                                    );
                                })
                            }
                        </div>

                        {/* <button className="text-sm text-red-600 cursor-pointer hover:underline" onClick={() => { dispatch(getStoryRequest("noticia/" + id)); setModal(true) }} >Ver más</button> */}
                    </div>
                </div>
                <div>
                    <Modal size="lg" isOpen={modal} toggle={toggle}>
                        {
                            storyItems.loading ? 
                                <ModalBody>
                                    <Loading />
                                </ModalBody>
                            :
                            <>
                                <ModalHeader toggle={toggle}><p className="text-gray-600 font-bold">{storyItems.modal?.title}</p></ModalHeader>
                                <ModalBody>
                                    <div>
                                        <span className="text-gray-500 font-medium border-r-2 pr-2">{storyItems.modal?.time}</span>
                                        <span className="text-gray-500 font-medium px-2">{storyItems.modal?.prov}</span>
                                        {parse(v)}
                                    </div>
                                </ModalBody>
                            </>
                        }
                    </Modal>
                </div>
                <Modal size="lg" isOpen={modal2} toggle={toggle2}>
                    <ModalHeader toggle={toggle2}><p className="text-gray-600 font-bold">Aviso</p></ModalHeader>
                    <ModalBody>Emisora no disponible por el momento</ModalBody>
                </Modal>
            </div>
        </div>
    );
}

//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        storyItems: store.modal,
        catalogoEmisorasRespuesta: store.catalogoEmisorasRespuesta,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getNewsRequest: () => dispatch(getStoryRequest(dispatch))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notices);