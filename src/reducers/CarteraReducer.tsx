import * as actionTypes from '../actions/actionTypes';
import {CarteraActions, CarteraState} from '../types/CarteraTypes';

const initialState: CarteraState = {
    loading: true,
    response: {
        ierror: '' , 
        cerror:'',
        dsFechas:{
            tdsFechas: []
        }, 
        dsResumen: {
            dsResumen: {
                tdsResumen: [
                    {
                        Resumen: "",
                        Descripcion: "",
                        Porcentaje: "",
                        Importe: "",
                        tdsDetalle: [
                            {
                                Resumen: "",
                                Mercado: 0,
                                Descripcion: "",
                                Porcentaje: "",
                                Importe: "",
                                Disclaimer: "",
                                tdsDetalleEncabezado: [
                                    {
                                        Mercado: 0,
                                        Tipo: "",
                                        col1: "",
                                        col2: "",
                                        col3: "",
                                        col4: "",
                                        col5: "",
                                        col6: "",
                                        col7: "",
                                        col8: "",
                                        col9: "",
                                    },
                                ],
                                tdsDetalleDato: [
                                    {
                                        Mercado: 0,
                                        Tipo: "",
                                        col1: "",
                                        col2: "",
                                        col3: "",
                                        col4: "",
                                        col5: "",
                                        col6: "",
                                        col7: "",
                                        col8: "",
                                        col9: "",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    },
    error: null,
    message: "",
    params: [],
}   

const CarteraReducer = ( state = initialState, action: CarteraActions ) => {
    switch(action.type){
        case actionTypes.GET_CARTERA_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };
        
        case actionTypes.GET_CARTERA_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.GET_CARTERA_ERROR:
            return { ...state, loading: false, response: initialState.response, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default CarteraReducer;