import * as actionTypes from '../actions/actionTypes';
import { InfoEmisoraState, InfoEmisoraActions } from '../types/InfoEmisoraTypes';

export const initialState: InfoEmisoraState = {
    loading: false,
    error: null,
    message: "",
    infoEmisoraResponse: {
        ierror: 0,
        cerror: "",
        TotPortafolio: 0,
        TotEmisora: 0,
        PorcPortafolioEmis: 0,
        sTotPortafolio: "",
        sTotEmisora: "",
        sPorcPortafolioEmis: "",
        dsOrdenes: {
            tdsOrdenesCapResponse: [
                /*{
                    contrato: 0,
                    origen: "0",
                    cuenta: "0",
                    folio: "0",
                    folioMod: "0",
                    Instruccion: "0",
                    emisora: "0",
                    bolsa: "0",
                    tipoorden: "0",
                    Fecha: "0",
                    Hora: "0",
                    Validez: "0",
                    titulos: "0",
                    precio: "0",
                    Puja: 0,
                    ValorPuja: 0,
                    estatus: "0",
                    estatusDesc: "0",
                    TitulosAsign: 0,
                    PrecioAsign: 0,
                    monto: 0,
                    rechazo: "0",
                    UltimoPrecio: 0,
                    puedeCancelar: true,
                    iTitulos: 0,
                    sTitulos: "0",
                    sTitulosAsign: "0",
                    sPrecioAsign: "0",
                    sMonto: "0",
                    sUltimoPrecio: "0",
                }*/
            ]
        },
        dsPortafolio: {
            tdsPortafolioCap: [
                {
                    Cuenta: 0,
                    Emisora: "",
                    Serie: "",
                    Descripcion: "",
                    PorcComposicion: 0,
                    TitulosDisponibles: 0,
                    TitulosActuales: 0,
                    TitulosVenta: 0,
                    TitulosBloqueados: 0,
                    CostoPromedio: 0,
                    CostoActual: 0,
                    UltimoPrecio: 0,
                    PrecioInicial: 0,
                    Utilidad: 0,
                    UtilidadPorc: 0,
                    ValorMercado: 0,
                    ValorMercadoInicial: 0,
                    EmisoraEncode: "",
                    Importe: 0,
                    PrecioAnterior: 0,
                    PrecioActual: 0,
                    Variacion: 0,
                    PorcentajeVar: 0,
                    VolumenAcumulado: 0,
                    NumeroOperaciones: 0,
                    PrecioMaximo: 0,
                    PrecioMinimo: 0,
                    sPorcComposicion: "",
                    sTitulosDisponibles: "",
                    sTitulosActuales: "",
                    sTitulosVenta: "",
                    sTitulosBloqueados: "",
                    sCostoPromedio: "",
                    sCostoActual: "",
                    sUltimoPrecio: "",
                    sPrecioInicial: "",
                    sUtilidad: "",
                    sUtilidadPorc: "",
                    sValorMercado: "",
                    sValorMercadoInicial: "",
                    sImporte: "",
                    sPrecioAnterior: "",
                    sPrecioActual: "",
                    sVariacion: "",
                    sPorcentajeVar: "",
                    sVolumenAcumulado: "",
                    sNumeroOperaciones: "",
                    sPrecioMaximo: "",
                    sPrecioMinimo: "",
                }
            ]
        },
        dsOperacionesDia: {
            tdsOperacionesDia: []
        },
        dsMkdCapPrecios: {
            tdsMkdCapPrecios: [
                {
                    Fecha: "",
                    Tipo: "",
                    Emisora: "",
                    Serie: "",
                    Secuencia: 0,
                    Volumen_Compra: 0,
                    Precio_Compra: 0,
                    Volumen_Venta: 0,
                    Precio_Venta: 0,
                    HoraHecho: "",
                    HoraPostura: "",
                    Precio_Anterior: 0,
                    Precio_Actual: 0,
                    Variacion: 0,
                    Porcentaje_Var: 0,
                    volumen_Acumulado: 0,
                    Numero_Operaciones: 0,
                    Precio_Maximo: 0,
                    Precio_Minimo: 0,
                    PuedeComprar: true,
                    PuedeVender: true,
                    TieneSL: true,
                    LSItem: "",
                    EmisoraEncode: "",
                    sPrecioAnterior: "",
                    sPrecioActual: "",
                    sVariacion: "",
                    sPorcentajeVar: "",
                    sVolumenAcumulado: "",
                    sNumeroOperaciones: "",
                    sPrecioMaximo: "",
                    sPrecioMinimo: "",
                }
            ]
        }
    },
    params: [],
}

const infoEmisoraReducer = ( state = initialState, action: InfoEmisoraActions ) => {
    switch(action.type){
        case actionTypes.GET_INFO_EMISORA_REQUEST:
            return { ...state, loading: true, message: action.payload.message, params: action.payload.params };
        
        case actionTypes.GET_INFO_EMISORA_RECEIVE:
            return {...state, loading: false, infoEmisoraResponse: action.payload.infoEmisoraResponse, error: null};

        case actionTypes.GET_INFO_EMISORA_ERROR:
            return { ...state, loading: false, infoEmisoraResponse: initialState.infoEmisoraResponse, error: action.payload.error };
        
        case actionTypes.RESET_STATE_INFO_EMISORA:
            //console.log("estado infoemisora reseteado en reducer");
            return { ...initialState };


        default: 
            return { ...state };
    }
}

export default infoEmisoraReducer;