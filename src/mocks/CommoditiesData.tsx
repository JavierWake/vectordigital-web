import React from "react";

export interface Commodity {
    tipo: string;
    nombre: string;
    RIC: string;
}

const CommoditiesData: Commodity[] = [
    {
        tipo: "Commodity",
        nombre: "Brent",
        RIC: "/BRT-OHLC",
    },
    {
        tipo: "Commodity",
        nombre: "WTC",
        RIC: "/WTC-OHLC",
    },
    {
        tipo: "Commodity",
        nombre: "GOLD",
        RIC: "XAU=X",
    },
    {
        tipo: "Commodity",
        nombre: "SILVER",
        RIC: "XAG=X",
    },
    {
        tipo: "Commodity",
        nombre: "PLATINUM",
        RIC: "XPT=X",
    },
    {
        tipo: "Commodity",
        nombre: "Natural gas",
        RIC: "/NGFVc1",
    },
    {
        tipo: "Commodity",
        nombre: "COFFEE",
        RIC: "/KCc1",
    },
    {
        tipo: "Commodity",
        nombre: "COCOA",
        RIC: "/LCCc1",
    },
];

export { CommoditiesData };
