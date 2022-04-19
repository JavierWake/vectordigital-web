import React, {useState} from "react";
import Switch from 'react-ios-switch';
import '../styles/switch.css';

export const SwitchComponent = () => {
    
  const [checked, setchecked] = useState(true);

    return (
      <div>
        <div className="border-switch">
         <Switch
            checked={checked}
            handleColor="#FF5000"
            onChange={  (checked: any) => setchecked(checked)}
            pendingOnColor={"white"}
          />
        </div>
      </div>
    );
  };