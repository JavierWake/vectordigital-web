import * as actionTypes from '../actions/actionTypes';
import {HistoricoActions, HistoricoStatus} from '../types/HistoricoTypes';


const initialState: HistoricoStatus = {
    loading: false,
    response: {
        ierror: 0,
        cerror: "",
        data: {
            S1: {
                dsDwResumen: {
                    tdsDwResumen: [
                        {
                            Cuenta: 0,
                            Temporalidad: "",
                            Peridodo: 0,
                            FechaIni: "",
                            FechaFin: "",
                            Rend: 0,
                        }
                    ],
                    tdsDwResumenDetalle: [
                        {
                            Fec: "",
                            Ten: 0,
                        }
                    ]
                }
            },
            M1: {
                dsDwResumen: {
                    tdsDwResumen: [
                        {
                            Cuenta: 0,
                            Temporalidad: "",
                            Peridodo: 0,
                            FechaIni: "",
                            FechaFin: "",
                            Rend: 0,
                        }
                    ],

                    tdsDwResumenDetalle: [
                        {
                            Fec: "",
                            Ten: 0,
                        }
                    ]
                }
            },
            M3: {
                dsDwResumen: {
                    tdsDwResumen: [
                        {
                            Cuenta: 0,
                            Temporalidad: "",
                            Peridodo: 0,
                            FechaIni: "",
                            FechaFin: "",
                            Rend: 0,
                        }
                    ],

                    tdsDwResumenDetalle: [
                        {
                            Fec: "",
                            Ten: 0,
                        }
                    ]
                }
            },
            A1: {
                dsDwResumen: {
                    tdsDwResumen: [
                        {
                            Cuenta: 0,
                            Temporalidad: "",
                            Peridodo: 0,
                            FechaIni: "",
                            FechaFin: "",
                            Rend: 0,
                        }
                    ],

                    tdsDwResumenDetalle: [
                        {
                            Fec: "",
                            Ten: 0,
                        }
                    ]
                }
            },
            A5: {
                dsDwResumen: {
                    tdsDwResumen: [
                        {
                            Cuenta: 0,
                            Temporalidad: "",
                            Peridodo: 0,
                            FechaIni: "",
                            FechaFin: "",
                            Rend: 0,
                        }
                    ],

                    tdsDwResumenDetalle: [
                        {
                            Fec: "",
                            Ten: 0,
                        }
                    ]
                }
            },
            A10: {
                dsDwResumen: {
                    tdsDwResumen: [
                        {
                            Cuenta: 0,
                            Temporalidad: "",
                            Peridodo: 0,
                            FechaIni: "",
                            FechaFin: "",
                            Rend: 0,
                        }
                    ],

                    tdsDwResumenDetalle: [
                    {
                        Fec: "",
                        Ten: 0,
                    }
                    ]
                }
            },
        }
    },
    error: null,
    message: "",
    params: [],
    portafolioValue: "S1"
}

const graphPortfolioReducer = ( state = initialState, action: HistoricoActions ) => {
    switch(action.type){
        case actionTypes.GET_HISTORICO_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_HISTORICO_RECEIVE:
            return {...state, loading: false, response: action.payload.response, error: null};

        case actionTypes.GET_HISTORICO_ERROR:
            return { ...state, loading: false, response: initialState.response, error: action.payload.error };
        
        case actionTypes.SEND_PORTAFOLIO_VALUE:
            return { ...state, portafolioValue: action.payload.portafolioValue }
        
        default: 
            return { ...state };
    }
}

export default graphPortfolioReducer;