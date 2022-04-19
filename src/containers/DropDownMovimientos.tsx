import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { getConsultasRequest } from "../actions/consultasAction";
import { ConsultasState } from "../types/ConsultasTypes";

interface propsFromState {
    response: ConsultasState;
}

type AllProps = propsFromState;
// si se quiere llamar a response de consultas (response.response)

const DropDownListMovimientos: React.FC<AllProps> = ({ response }) => {
    const dispatch = useDispatch();
    const [month, setMonth] =  useState(' ');
    useEffect(() => {
        let message = "/consulta/movimientos?cuenta=266563&anio=2020&mes=12";
        let params = ["6FVeF6F5G76BbEK89Oi1X3LJo8PdUifp7AS6DgrK", "1", "266563", "aFhBakbhtyNajcadjkcjjdjbdkinpdkEihsblbdaRpzMjlakfhaOpdVkwziacjBbdLTijEbaiScblLVadlinTBcGXBdbmcab", "10100"]
        dispatch(getConsultasRequest({ message, params }));
    }, [])
    console.log(month, "Esto es lo que me trae setMonth");

    useEffect(() => {
        if (response.response?.dsFechas != null)
            console.log(response.response?.dsFechas)
    }, [response.response?.dsFechas])
    console.log(response.response?.dsFechas, "Esto es lo de fechas")

    const respf = response.response?.dsFechas.tdsFechas;





    return (
        <div>


        </div>
    );
}
//Get data from store
const mapStateToProps = (store: RootState) => {
    return {
        response: store.consultas
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getConsultasRequest: () => dispatch(getConsultasRequest)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DropDownListMovimientos);
