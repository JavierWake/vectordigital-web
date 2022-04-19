import React from 'react';

interface UseHandleOutsideClickProps {
    id: string;
    display: Boolean;
    setDisplay: Function;
}
  
export function useHandleClickOutsideComponent({
    id,
    display,
    setDisplay,
}: UseHandleOutsideClickProps) {
    React.useEffect(() => {
        function listener(e: any) {
            //console.log("useHandleClickOutsideComponent listener");
            const element = document.getElementById(id);
            if (element && !element.contains(e.target)) {
                //console.log("if element");
                if (display) {
                    //console.log("if display");
                    setDisplay(false);
                    document.removeEventListener("click", listener);
                }
            }
        };

        if (display) {
            document.addEventListener("click", listener);
        }
    }, [display, id, setDisplay]);
};