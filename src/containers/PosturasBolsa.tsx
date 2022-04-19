import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

import { Dropdown } from "./Dropdown";
import Posturas from "./Posturas";
import Loading from "../components/Loading";

import { DropdownDataTradingMostrar, DropdownDataBolsas } from '../mocks/DropdownData';

import { getPosturasRequest } from '../actions/posturasAction';
import { PosturasState } from '../types/PosturasTypes';

interface PosturasBolsaProps {
    profundidadData: any;
    posturasItems: PosturasState;
    ric: any;
}

const PosturasBolsa: React.FC<PosturasBolsaProps> = ({ profundidadData, posturasItems, ric }) => {
    const [profundidad, setProfundidad] = useState("5");
    const [bolsa, setBolsa] = useState("BMV");
    const [cargando, setCargando] = useState(false);
    const [dataProf, setDataProf] = useState(profundidadData);

    const dispatch = useDispatch();

    const sendProfundidad = (data: string) => {
        setProfundidad(data);
    };

    const sendBolsa = (data: string) => {
        setBolsa(data);
        dispatch(getPosturasRequest({message: "emisora/posturas/"+ric, params: data}))
    };

    useEffect(() => {
        if(posturasItems.loading){
            setCargando(true);
        }
        else{
            setCargando(false);
            setDataProf(posturasItems.posturas);
        }
    }, [posturasItems])

    return (
        <div>
            <div className="flex flex-row justify-end items-center mt-2 mb-3">
                <p className="text-sm mx-3">Bolsa</p>
                <div className="w-1/6">
                    <Dropdown
                        dropdownData={DropdownDataBolsas}
                        initialOption={bolsa}
                        side={false}
                        sendOption={(b: any) => sendBolsa(b)}
                        fondosFamilia={false}
                    />
                </div>
                <p className="text-sm mx-2">Mostrar</p>
                <div className="w-1/12">
                    <Dropdown
                        dropdownData={DropdownDataTradingMostrar}
                        initialOption={profundidad}
                        side={false}
                        sendOption={(prof: any) => sendProfundidad(prof)}
                        fondosFamilia={false}
                    />
                </div>
            </div>
            {
                cargando ? <Loading />
                : <Posturas posicionData={dataProf} profundidad={profundidad} type={"emisora"} />
            }
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        posturasItems: store.posturas
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getPosturasRequest: () => dispatch(getPosturasRequest)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PosturasBolsa);