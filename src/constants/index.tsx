//API calls variables

declare var process : {
    env: {
        REACT_APP_NEWS_API: string;
        REACT_APP_X_API_KEY_NEWS: string;
        REACT_APP_LIST_USER_URL: string;
        REACT_APP_LIST_ISSUER_URL: string;
        REACT_APP_LIST_ADD_ISSUER: string;
        REACT_APP_LIST_INDEX: string;
        REACT_APP_X_API_KEY: string;
        REACT_APP_GET_NEWS: string;
        REACT_APP_GET_STORY: string;
        REACT_APP_GET_SECTOR: string;
        REACT_APP_GET_QUOTES: string;
        REACT_APP_FOLLOW_LIST: string;
        REACT_APP_UNFOLLOW_LIST: string;
        REACT_APP_COMPANY_SEARCH: string;
        REACT_APP_GET_PROFILE_DATA: string;
        REACT_APP_CREATE_ALERT: string;
        REACT_APP_GET_ALERT: string;
        REACT_APP_GET_BURS: string;
        REACT_APP_VECTOR_API: string;
        REACT_APP_X_API_KEY_CONSULTA: string;
        REACT_APP_X_API_KEY_MERCADO: string;
        REACT_APP_LISTAS_API: string;
        REACT_APP_X_API_KEY_LISTAS: string;
        REACT_APP_API_MERCADO: string;
        REACT_APP_API_OPERACION: string;
        REACT_APP_X_API_KEY_OPERACION: string;
        REACT_APP_REFINITIV_GRAFICA_SIMPLE: string;
        REACT_APP_REFINITIV_GRAFICA_COMPLEJA: string;
        REACT_APP_AUTH0_DOMAIN: string;
        REACT_APP_AUTH0_CLIENT_ID: string;
        REACT_APP_API_CATALOGO_EMISORAS: string;
        REACT_APP_X_API_KEY_CATALOGO_EMISORAS: string;
        REACT_APP_URL_DATA_OPFONDOS_XML: string;
        REACT_APP_API_CONFIGURA: string;
        REACT_APP_X_API_KEY_CONFIGURA: string;
        REACT_APP_WS_URL: string;
        REACT_APP_WS_NAMETYPE: string;
        REACT_APP_WS_NAME: string;
        REACT_APP_WS_APPLICATION_ID: string;
        REACT_APP_WS_POSITION: string;
        REACT_APP_API_MENSAJES: string;
        REACT_APP_X_API_KEY_MENSAJES: string;
        REACT_APP_WS_NAME_DELAY: string;
        REACT_APP_WS_APPLICATION_ID_DELAY: string;
    }
}

//Lista de usuario
export const LIST_USER_URL = process.env.REACT_APP_LIST_USER_URL;
//emisoras de una lista
export const LIST_ISSUER_URL = process.env.REACT_APP_LIST_ISSUER_URL;
//Agregar una emisora a una lista 
export const LIST_ADD_ISSUER = process.env.REACT_APP_LIST_ADD_ISSUER;
//Lista de indice
export const APP_LIST_INDEX = process.env.REACT_APP_LIST_INDEX;
//Obtener noticias
export const GET_NEWS = process.env.REACT_APP_GET_NEWS;
export const GET_STORY = process.env.REACT_APP_GET_STORY;
export const GET_SECTOR = process.env.REACT_APP_GET_SECTOR;
export const GET_QUOTES = process.env.REACT_APP_GET_QUOTES;
export const FOLLOW_LIST = process.env.REACT_APP_FOLLOW_LIST;
export const UNFOLLOW_LIST = process.env.REACT_APP_UNFOLLOW_LIST;
export const COMPANY_SEARCH = process.env.REACT_APP_COMPANY_SEARCH;
export const GET_PROFILE_DATA = process.env.REACT_APP_GET_PROFILE_DATA;
export const CREATE_ALERT = process.env.REACT_APP_CREATE_ALERT;
export const GET_ALERT = process.env.REACT_APP_GET_ALERT;
export const GET_BURS = process.env.REACT_APP_GET_BURS;
export const GET_VECTOR_API = process.env.REACT_APP_VECTOR_API;

export const token = "BEF7107F9DB9608DA2BFC4B658DD6D93B6DAFC10863D978857ED7C3F27A29B0F59860F64CDD978DF39C6453640AA9C371550E50204BDC49359A5BC154873EDC27D34A85134ADECA9358501F9BFB1B2D2F0D253D55CCA67E218E6A5844D59E224";

export const X_API_KEY = process.env.REACT_APP_X_API_KEY;
export const X_API_KEY_CONSULTA = process.env.REACT_APP_X_API_KEY_CONSULTA;
export const X_API_KEY_MERCADO = process.env.REACT_APP_X_API_KEY_MERCADO;
export const NEWS_API = process.env.REACT_APP_NEWS_API; 
export const X_API_KEY_NEWS = process.env.REACT_APP_X_API_KEY_NEWS;
export const LISTAS_API = process.env.REACT_APP_LISTAS_API;
export const X_API_KEY_LISTAS = process.env.REACT_APP_X_API_KEY_LISTAS;
export const GET_API_MERCADO = process.env.REACT_APP_API_MERCADO;
export const GET_API_OPERACION = process.env.REACT_APP_API_OPERACION;
export const X_API_KEY_OPERACION = process.env.REACT_APP_X_API_KEY_OPERACION;
export const REFINITIV_GRAFICA_SIMPLE = process.env.REACT_APP_REFINITIV_GRAFICA_SIMPLE;
export const REFINITIV_GRAFICA_COMPLEJA = process.env.REACT_APP_REFINITIV_GRAFICA_COMPLEJA;
export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
export const URL_DATA_OPFONDOS_XML = process.env.REACT_APP_URL_DATA_OPFONDOS_XML;
export const API_CATALOGO_EMISORAS = process.env.REACT_APP_API_CATALOGO_EMISORAS;
export const WS_URL = process.env.REACT_APP_WS_URL;
export const X_API_KEY_CATALOGO_EMISORAS = process.env.REACT_APP_X_API_KEY_CATALOGO_EMISORAS;

export const API_CONFIGURA = process.env.REACT_APP_API_CONFIGURA;

export const X_API_KEY_CONFIGURA = process.env.REACT_APP_X_API_KEY_CONFIGURA;
export const WS_NAMETYPE = process.env.REACT_APP_WS_NAMETYPE;
export const WS_NAME = process.env.REACT_APP_WS_NAME;
export const WS_APPLICATION_ID = process.env.REACT_APP_WS_APPLICATION_ID;
export const WS_POSITION = process.env.REACT_APP_WS_POSITION;

export const X_API_KEY_MENSAJES = process.env.REACT_APP_X_API_KEY_MENSAJES;
export const API_MENSAJES = process.env.REACT_APP_API_MENSAJES;
export const WS_NAME_DELAY = process.env.REACT_APP_WS_NAME_DELAY;
export const WS_APPLICATION_ID_DELAY = process.env.REACT_APP_WS_APPLICATION_ID_DELAY;
