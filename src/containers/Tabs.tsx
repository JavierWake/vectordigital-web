import React, { useEffect } from "react";

export interface TabsProps {
  color: "red" | "blue";
  tabsData: Array<object>;
  typeAlert: boolean;
  selectedTabTitle?: string;
}

const Tabs = ({ color, tabsData, typeAlert, selectedTabTitle }: TabsProps) => {
  const [openTab, setOpenTab] = React.useState(1);

  const sendOpenTab = (data: number) => {
    if(data == openTab){
      return;
    }
    setOpenTab(data);
  }

  useEffect(() => {
    //para que busque el indexOfSelectedTab (si existe selectedTabTitle) en la primera carga del componente
    // console.log("primer useEffect Tabs");
    if(selectedTabTitle){
      //se envio selectedTabTitle como prop
      // console.log("selectedTabTitle y tabsData");
      // console.log(selectedTabTitle);

      const filterOfSelectedTab = tabsData.filter((tab: any) => {
        if("title" in tab){
          //tab tiene el atributo de id
          return selectedTabTitle.trim() === tab.title.trim();
        }
        else{
          //tab no tiene el atributo id
          return false;
        }
      });

      // console.log("filter of selectedTabTitle");
      // console.log(filterOfSelectedTab);

      if(filterOfSelectedTab.length > 0){
        //se encontro el objeto
        const objectOfSelectedTab = filterOfSelectedTab[0];

        // console.log("obj of selectedTabTitle");
        // console.log(objectOfSelectedTab);

        const indexOfSelectedTab: number = tabsData.indexOf(objectOfSelectedTab);
  
        // console.log("index of selectedTabTitle");
        // console.log(indexOfSelectedTab);
    
        if(indexOfSelectedTab >= 0){
          //se encontro el index del tab con id == selectedTabTitle, lo mandamos a sendOpenTab
          sendOpenTab(indexOfSelectedTab + 1);
        }
      }
    }
  }, []);

  // console.log("openTab hook");
  // console.log(openTab);

  const Tab = (tabTitle: string, indexPlusOne: number) => {
    return (
      <li className="flex-auto text-center cursor-pointer">
        <a
          className={
            "text-sm tracking-wide block leading-normal py-2 " +
            (openTab === indexPlusOne
              ? "font-semibold text-white bg-" + color + "-600"
              : "hover:bg-gray-200 hover:text-red-600 text-gray-950 bg-gray-350 bg-opacity-10")
          }
          onClick={(e) => {
            e.preventDefault();
            sendOpenTab(indexPlusOne);
          }}
          data-toggle="tab"
          role="tablist"
        >
          {tabTitle}
        </a>
      </li>
    );
  };

  return (
    <div>
      <div className={ typeAlert ? "flex my-3" : "flex justify-end"}>
        <ul
          className="flex list-none w-full flex-row"
          role="tablist"
        >
          {tabsData.map((tab: any, index: number) => {
            return Tab(tab.title, index + 1);
          })}
        </ul>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex-auto">
          <div className={("tab-content tab-space ") + ( typeAlert ? "" : "bg-white h-80")}>
            {tabsData.map((tab: any, index: number) => {
              return (
                <div
                  key={index + tab.link}
                  className={openTab === index + 1 ? "block" : "hidden"}
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
  );
};

export { Tabs };