import React from "react";
import type { SidebarData } from "../types/Sidebar";
import { MdTrendingUp } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";

const sidebarMockData: SidebarData = {
  navItems: [
    { label: "Monitor de acciones", icon: <MdTrendingUp className="text-2xl"/>, url: "/" },
    { label: "Listas Vector", icon: <MdTimeline className="text-xl"/>, url: "/ListasVector" },
    { label: "Alertas", icon: <BiBell className="text-xl"/>, url: "/Alertas" },
  ],
  user: {
    name: "Usuario",
    lastName: "",
    imgUrl: "https://i.imgur.com/BKwr1hJ.jpeg",
    profileUrl: "",
    position: "Trader Pro",
  },
};

export { sidebarMockData };