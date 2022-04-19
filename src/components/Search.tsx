import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

//Search
import { getNewsRequest } from '../actions/newsAction';
import { INews } from '../types/NewsTypes';
import { SearchState } from '../types/SearchTypes';

import { getProfileDataRequest } from '../actions/ProfileIssuerAction';

import { getSectorRequest } from '../actions/sectorActions';
import { ISector } from '../types/SectorTypes';

import { getSearchCompanyRequest } from '../actions/searchCompanyAction';
import { ISearchCompany } from '../types/SearchCompanyTypes';

import { RootState } from '../reducers/rootReducer';

//Containers
import Appbar from './Appbar';
//import { Sidebar } from '../components/Sidebar';
import News from '../containers/News';

//Mocks
import { appBarMockData } from '../mocks/Appbar';
import { sidebarMockData } from '../mocks/Sidebar';

import Sidebar from './Sidebar';


interface propsFromState {
    newsItems: INews[];
    message: string;
    sectorItems: ISector[];
    searchCompany: ISearchCompany[];
}

type AllProps = propsFromState; 

const Search: React.FC<AllProps> = ({ newsItems, sectorItems, searchCompany }) => {

    const dispatch = useDispatch();
    // const location = useLocation();
    // const message = (location.state as propsFromState).message;
    // const resp = "/"+message;
    
    //Dispatching action to load user's list
    useEffect(() => {        
        //dispatch(getNewsRequest("emisora/noticias/"+resp));
        //dispatch(getSectorRequest(resp.toUpperCase()));
        //dispatch(getSearchCompanyRequest("/AMAZON"));
    }, []);

    // useEffect(() => {
    //     if(searchCompany.length !== 0) {
    //         console.log(searchCompany[0].name);
    //     }
    // }, [searchCompany])
 
    return(

        <div className="bg-gray-100">
            <Appbar appBarData={appBarMockData}/>
            <div className="flex-auto">
                <div className="flex flex-row">
                    <div className="w-1/12 h-full">
                        <Sidebar />
                    </div>
                    <div className="w-11/12 px-10">
                        <div className="py-4">
                            <span className="font-sans text-xl text-gray-800 pb-2 mb-4">Resultados para </span>
                            <span className="font-mono italic font-semibold text-xl text-gray-800 pb-2 mb-4"> hola </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        newsItems: store.news.news,
        sectorItems: store.sector.sector,
        searchCompany: store.searchCompany.searchCompany,
        sectorItemError: store.sector.error,
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getNewsRequest: () => dispatch(getNewsRequest),
        getSectorRequest: () => dispatch(getSectorRequest),
        getSearchCompanyRequest: () => dispatch(getSectorRequest),
        getProfileDataRequest: () => dispatch(getProfileDataRequest)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);