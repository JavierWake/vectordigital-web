import React from "react";

export interface Indice {
    tipo: string;
    nombre: string;
    RIC: string;
}

const IndicesData: Indice[] = [
    {
        tipo: "Indice",
        nombre: ".INMX",
        RIC: ".INMX",
    },
    {
        tipo: "Indice",
        nombre: ".MXXCP",
        RIC: ".MXXCP",
    },
    {
        tipo: "Indice",
        nombre: ".MXXLG",
        RIC: ".MXXLG",
    },
    {
        tipo: "Indice",
        nombre: ".MXXSM",
        RIC: ".MXXSM",
    },
    {
        tipo: "Indice",
        nombre: ".MXXMI",
        RIC: ".MXXMI",
    },
    {
        tipo: "Indice",
        nombre: ".IRT",
        RIC: ".IRT",
    },
    {
        tipo: "Indice",
        nombre: ".FB",
        RIC: ".FB",
    },
    {
        tipo: "Indice",
        nombre: ".FR",
        RIC: ".FR",
    },
    {
        tipo: "Indice",
        nombre: ".IRTMI",
        RIC: ".IRTMI",
    },
    {
        tipo: "Indice",
        nombre: ".IRTCP",
        RIC: ".IRTCP",
    },
    {
        tipo: "Indice",
        nombre: ".IRTLG",
        RIC: ".IRTLG",
    },
    {
        tipo: "Indice",
        nombre: ".IRTSM",
        RIC: ".IRTSM",
    },
];

export { IndicesData };
