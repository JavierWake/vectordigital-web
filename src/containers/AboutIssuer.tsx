import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { IProfileData } from '../types/ProfileIssuerTypes';
import NumberFormat from 'react-number-format';

//State of the component
interface propsFromState {
    profileData?: any;
}

type AllProps = propsFromState;

const AboutIssuer: React.FC<AllProps> = ({ profileData }) =>{

    const min:any = profileData?.profileData.min;
    const max:any = profileData?.profileData.max;
    const ventasDeMercado:any = profileData?.profileData.revenue;
    const volPromedio:any = profileData?.profileData.avgVol;
    const valMercado:any = profileData?.profileData.ev;
    const volTotal:any = profileData?.profileData.avgVol;
    const empleados:any = profileData?.profileData.employees;
    const year:any = profileData?.profileData.year;
    const shares:any = profileData?.profileData.shares;
    const currency:any = profileData?.profileData.currency;

    return(
        <div className="flex flex-row">
            <div className="flex flex-row">
                <div>
                    <div className="my-2">
                    <p className="font-sans text-md font-semibold text-gray-800">{profileData?.profileData.ceo}</p>
                        <p className="font-sans text-sm text-gray-600">CEO</p>
                    </div>
                    <div className="my-4">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {min}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Precio min (52 S)</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="mx-6">
                    <div className="my-2">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {year}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Año de fundación</p>
                    </div>
                    <div className="my-4">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {max}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Precio máx (52 S)</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="mx-6">
                    <div className="my-2">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {ventasDeMercado}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Ingresos</p>
                    </div>
                    <div className="my-4">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {volPromedio}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Vol. Promedio</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="mx-6">
                    <div className="my-2">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {valMercado}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Market Cap</p>
                    </div>
                    <div className="my-4">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {shares}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Títulos en circulación</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="mx-6">
                    <div className="my-2">
                        <p className="font-sans text-md font-semibold text-gray-800">{profileData?.profileData.location}</p>
                        <p className="font-sans text-sm text-gray-600">Ubicación</p>
                    </div>
                    <div className="my-4">
                        <p className="font-sans text-md font-semibold text-gray-800">
                            {empleados}
                        </p>
                        <p className="font-sans text-sm text-gray-600">Empleados</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        profileData: store.profileData,
    };
};

export default connect(mapStateToProps, null)(AboutIssuer);