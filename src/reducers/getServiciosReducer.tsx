import * as actionTypes from '../actions/actionTypes';
import { serviciosActions, ServiciosStatus } from '../types/GetServiciosTypes';

const initialState: ServiciosStatus = {
    loading: true,
    response: {
        ierror: 0,
        cerror: "",
        confemail: false,
        confcelular: false,
        confvc: false,
        confwsp: false,
        dsServicios: {
            tdsServicios: [
                {
                    IdServicio: 0,
                    IdServicioString: "",
                    nombre: "",
                    descripcion: "",
                    activoCorreo: false,
                    puedeConfigurarCorreo: false,
                    activoCelular: false,
                    puedeConfigurarCelular: false,
                    activoVC: false,
                    puedeConfigurarVC: false,
                    activoWhatsApp: false,
                    puedeConfigurarWhatsApp: false,
                    activoVMovil: false,
                    puedeConfigurarVMovil: false,
                    extraClass: "",
                    esAndroid: false,
                    esIOS: false,
                    esSMS: false,
                    esEmail: false,
                    esVC: false,
                    esWP: false,
                    esVM: false,
                    esDescarga: false,
                    extraConfig: "",
                    subtext: "",
                }
            ],
            tdsCanal: [
                {
                    Canal: "",
                    IdCanal: 0,
                }
            ]
        },
    },
    pushSeccion: false,
    emailSeccion: false,
    whaSeccion: false,
    error: "",
    message: "",
    params: [""],
}

const getServiciosReducer = (state = initialState, action: serviciosActions) => {
    switch (action.type) {
        case actionTypes.GET_SERVICIOS_REQUEST:
            return { ...state, loading: true, message: action.payload, params: action.payload.params };

        case actionTypes.GET_SERVICIOS_RECEIVE:
            return { ...state, loading: false, response: action.payload.response, pushSeccion: action.payload.pushSeccion, emailSeccion: action.payload.emailSeccion,  whaSeccion: action.payload.whaSeccion, error: null };

        case actionTypes.GET_SERVICIOS_ERROR:
            return { ...state, loading: false, response: {}, error: action.payload.error };

        default:
            return { ...state };
    }
}

export default getServiciosReducer;