import * as actionTypes from '../actions/actionTypes';
import { FondosFamiliasState, FondosFamiliasActions } from '../types/FondosFamiliasTypes';

const initialState: FondosFamiliasState = {
    loading: false,
    fondosFamiliasList: [
        {
            Tipo: "",
            descripcion: "",
            tdsFondo: [
                {
                    Orden: 0,
                    Grupo: 0,
                    Emisora: "",
                    Serie: "",
                    Tipo: "",
                    Califica: "",
                    Precio: 0,
                    Var12: "",
                    Var1: "",
                    Var7dias: "",
                    VarAnual: "",
                    VarDia: "",
                    Var90dias: "",
                    Var180dias: "",
                    Titulos: 0,
                    FechaCirc: "",
                    FechaPrecio: "",
                    Familia: "",
                    Prospecto: "",
                    Cartera: "",
                    Fondo_VCB: false,
                    Activos: "",
                    Clasifica: "",
                    Adquirientes: "",
                    RazonFin: "",
                    Administracion: "",
                    presentacion: "",
                    Benchmark: "",
                    Calificacion: "",
                    Caracteristicas: "",
                    DescCorta: "",
                    DescExtendida: "",
                    EstrellasMS: "",
                    GustoFondo: "",
                    Horario: "",
                    LinkFichaTecnica: "",
                    LinkGrafRenU12M: "",
                    LinkVideoCorto: "",
                    LinkVideoLargo: "",
                    Liquidez: "",
                    PortafolioMgrPost: "",
                    Plazo: "",
                }
            ],
        }
    ],
    error: null,
    message: "",
    params: [],
}

const fondosFamiliasReducer = ( state = initialState, action: FondosFamiliasActions ) => {
    switch(action.type){
        case actionTypes.GET_FONDOS_FAMILIAS_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_FONDOS_FAMILIAS_RECEIVE:
            return {...state, loading: false, fondosFamiliasList: action.payload.fondosFamiliasList, error: null};

        case actionTypes.GET_FONDOS_FAMILIAS_ERROR:
            return { ...state, loading: false, story: null, error: action.payload.error };
        
        default: 
            return { ...state };
    }
}

export default fondosFamiliasReducer;