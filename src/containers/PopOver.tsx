import React from 'react';
import { MdInfoOutline } from "react-icons/md";
import { UncontrolledPopover, PopoverBody } from 'reactstrap';

export interface PopOverProps {
  id: string;
  content: string;
}

const PopOver = ({ id, content } : PopOverProps ) => {
  // console.log(content);

  return (
    <div>
      <MdInfoOutline className="text-gray-400 mx-1 font-bold text-md cursor-pointer" id={id} />
      <UncontrolledPopover trigger="focus" placement="bottom" target={id} >
        <PopoverBody>{content}</PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

export default PopOver;