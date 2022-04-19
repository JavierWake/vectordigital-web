/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";

export interface TabsProps {
  color: 'red' | 'blue';
  tabsData: Array<object>;
  title: string;
  selectedTabTitle?: string;
}

const SimpleTableTabs = ({ title, color, tabsData, selectedTabTitle }: TabsProps) => {
  const [openTab, setOpenTab] = React.useState(1);

  const sendOpenTab = (data: number) => {
    if (data == openTab) {
      return;
    }
    setOpenTab(data);
  };

  useEffect(() => {
    //para que busque el indexOfSelectedTab (si existe selectedTabTitle) en la primera carga del componente
    // console.log("primer useEffect simpleTabs");
    if (selectedTabTitle) {
      //se envio selectedTabTitle como prop
      // console.log("selectedTabTitle y simpletabsData");
      // console.log(selectedTabTitle);

      const filterOfSelectedTab = tabsData.filter((tab: any) => {
        if ("title" in tab) {
          //tab tiene el atributo de id
          return selectedTabTitle.trim() === tab.title.trim();
        }
        else {
          //tab no tiene el atributo id
          return false;
        }
      });

      // console.log("filter of simple selectedTabTitle");
      // console.log(filterOfSelectedTab);

      if (filterOfSelectedTab.length > 0) {
        //se encontro el objeto
        const objectOfSelectedTab = filterOfSelectedTab[0];

        // console.log("obj of simple selectedTabTitle");
        // console.log(objectOfSelectedTab);

        const indexOfSelectedTab: number = tabsData.indexOf(objectOfSelectedTab);

        // console.log("index of simple selectedTabTitle");
        // console.log(indexOfSelectedTab);

        if (indexOfSelectedTab >= 0) {
          //se encontro el index del tab con id == selectedTabTitle, lo mandamos a sendOpenTab
          sendOpenTab(indexOfSelectedTab + 1);
        }
      }
    }
  }, []);

  const Tab = (tabTitle: string, indexPlusOne: number) => {
    return (
      <li
        key={indexPlusOne}
        className='flex-auto text-center cursor-pointer'
      >
        <a
          className={
            'px-2 py-2 text-sm tracking-wide block leading-normal ' +
            (openTab === indexPlusOne
              ? 'font-semibold text-white bg-' + color + '-600'
              : 'hover:bg-gray-200 hover:text-red-600 text-gray-950 bg-gray-350 bg-opacity-10')
          }
          onClick={(e) => {
            e.preventDefault();
            sendOpenTab(indexPlusOne);
          }}
          data-toggle='tab'
          role='tablist'
        >
          {tabTitle}
        </a>
      </li>
    );
  };

  return (
    <div className='w-full'>
      <div className='bg-white border-2 rounded shadow-lg overflow-ellipsi py-3'>
        <div className="px-3 my-2">
          <span className='font-bold text-base'>{title}</span>
          {
            title === "Posiciones" ? 
              <NavLink to="/posiciones">
                <span className="float-right text-sm text-red-600 cursor-pointer hover:underline">Ver detalle</span>
              </NavLink>
            : ""
          }
        </div>
        <ul
          className='flex list-none  flex-row'
          role='tablist'
        >
          {tabsData.map((tab: any, index: number) => {
            return Tab(tab.title, index + 1);
          })}
        </ul>
        <div className='relative flex flex-col w-full'>
          <div className='py-1 flex-auto'>
            <div className='tab-content tab-space'>
              {tabsData.map((tab: any, index: number) => {
                return (
                  <div
                    className={openTab === index + 1 ? 'block' : 'hidden'}
                    key={index}
                    id={tab.link}
                  >
                    {tab.content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SimpleTableTabs };