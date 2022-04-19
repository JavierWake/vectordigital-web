import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { ClassNames } from '@emotion/react';


// const IOSSwitch = styled((props: SwitchProps) => (
//     <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
//     width: 62,
//     height: 34,
//     padding: 7,
//     '& .MuiSwitch-switchBase': {
//         padding: 0,
//         margin: 2,
//         transitionDuration: '200ms',
//         color: '#DEDEDE',
//         '&.Mui-checked': {
//         transform: 'translateX(34px)',
//         color: '#FF5000',
//         '& + .MuiSwitch-track': {
//             backgroundColor: theme.palette.mode === 'dark' ? '#FFF' : '#FFF',
//             opacity: 1,
//             border: 0,
//         },
//         },
//         '&.Mui-disabled + .MuiSwitch-track': {
//         opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//         },
//     },
//     '& .MuiSwitch-thumb': {
//         width: 25,
//         height: 25,
//     },
//     '& .MuiSwitch-track': {
//         borderRadius: 26 / 2,
//         backgroundColor: theme.palette.mode === 'light' ? '#FFF' : '#FFF',
//         opacity: 1,
//         transition: theme.transitions.create(['background-color'], {
//         duration: 100,
//         }),
//     },
// }));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)"
    }
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        border: "1px solid #FF5000",
        backgroundColor: "white"
        //theme.palette.mode === "dark" ? "#177ddc" : "#1890ff"
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#FF5000"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#DEDEDE",
    transition: theme.transitions.create(["width"], {
      duration: 200
    })
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "white",
    border: "1px solid #DEDEDE",
    // theme.palette.mode === "dark"
    //   ? "rgba(255,255,255,.35)"
    //   : "rgba(0,0,0,.25)",
    boxSizing: "border-box"
  }
  }));

interface CustomMUISwitchProps {
    checked: boolean;
    sendChecked: (data: boolean) => void;
    disabled?: boolean;
    isNotif?: boolean;
}

export const CustomMUISwitch = ({ checked, sendChecked, disabled, isNotif }: CustomMUISwitchProps) => {

    const [isChecked, setIsChecked] = useState(checked || false);
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        setReady(!ready);
    },[]);

    useEffect(() => {
      if(ready) {
        setIsChecked(checked);
      }
  },[checked]);

    useEffect(() => {
        if(ready) {
            sendChecked(isChecked);
        }
    },[isChecked]);

// className='border-switch' style = {{ border: isChecked ? " 1px solid #FF5000 " : " 1px solid #DEDEDE " }}

    return (
        <div className={disabled === true ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}>
            <AntSwitch 
                checked={isNotif ? isChecked : checked }
                disabled={disabled}
                onChange={(event: any) => { isNotif ? setIsChecked(event.target.checked) : sendChecked(event.target.checked); }}
            />
        </div>
    );
};
  