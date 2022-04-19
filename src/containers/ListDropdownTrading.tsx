import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { RootState } from '../reducers/rootReducer';

//Types to use data from store
import { IList } from "../types/ListTypes";

//Containers
import ModalPopUPList from '../containers/ModalPopUPList';

import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
  } from "reactstrap";
import { GoKebabVertical } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";



interface propsFromState {
    openMenu: boolean;
    listItems?: IList[];
}

type AllProps = propsFromState;

const ListDropdown: React.FC<AllProps> = ({ openMenu, listItems }) => {
    
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const dispatch = useDispatch();

    return(
        <ButtonGroup>
            <ButtonDropdown className="py-0" isOpen={openMenu} toggle={toggle}>
                <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={openMenu}>
                    <MdKeyboardArrowRight />
                </DropdownToggle>
                <DropdownMenu>
                    {
                        listItems?.filter(row => !row.vector).map((row,i) =>(
                            <p className="py-1 cursor-pointer">{row.list_name}</p>
                        ))
                    }
                    <div className="flex justify-center my-2">
                        {/* <ModalPopUPList name={"Crear Lista"} title={"Crear nueva lista"} confirm={"Aceptar"}/> */}
                    </div>
                </DropdownMenu>
            </ButtonDropdown>
        </ButtonGroup>
    );
}

//Post data to the store
// const mapDispatchToProps = (dispatch: any) => {
//     return {
        
//     };
//   };

//Get data from store
const mapStateToProps = ( store: RootState ) => {
    return {
        listItems: store.list,
    };
};

export default (ListDropdown);