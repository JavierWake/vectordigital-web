import parse from "html-react-parser";
import React from "react";

import { MdWarning, MdClose } from "react-icons/md";

interface AlertProps {
    message: string;
    isOpen: boolean;
    sendIsOpen: (data: any) => void;
}

const Alert: React.FC<AlertProps> = ({ message, isOpen, sendIsOpen }) => {

    return (
        <div>
            {
                isOpen ? 
                    <div className="w-full border-b-4 border-purple-900 my-4 flex pb-2 items-center shadow-xl rounded">
                        <MdWarning className="mx-2 text-purple-900 w-1/24" />
                        <div className="mx-2 font-semibold text-purple-900 text-sm flex-grow">{parse(message)}</div>
                        <div className="flex justify-end px-2">
                            <MdClose className="text-sm cursor-pointer" onClick={() => sendIsOpen(false)} />
                        </div>
                    </div>
                : ""
            }
        </div>
    );
};

export default Alert;