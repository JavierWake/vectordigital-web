import * as React from "react";
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import KebabDropdown  from './KebabDropdown';
import NumberFormat from 'react-number-format';

const Accordion = ({ i, expanded, setExpanded, rowData, extraData, personalData } : any) => {
    const isOpen = i === expanded;
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    
    return (
        <>
            <motion.tr
                initial={false}
                // onClick={() => setExpanded(isOpen ? false : i)}
                className="group bg-gray-100 hover:bg-gray-300"
            >
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <div className="flex justify-center">
                        <span>{rowData.icon}</span>
                        <span className="text-sm ">{rowData.ticker}</span>
                    </div>
                </td>
                {/* <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p>{rowData["title"]}</p>
                </td> */}
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p>{rowData.trade_time}</p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.buy} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.buy_vol} displayType={'text'} thousandSeparator={true}/></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.sell} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.sell_vol} displayType={'text'} thousandSeparator={true}/></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p>{rowData.trade_time}</p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.actual} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.initial} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.v_max} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.v_min} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p>{rowData.points}</p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p className={"text-" + (rowData.percentage > 0 ? "green" : "red-100")}>{rowData.percentage}%</p>
                </td>
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p><NumberFormat value={rowData.vol} displayType={'text'} thousandSeparator={true}/></p>
                </td>
                {/* <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    <p>{rowData["operations"]}</p>
                </td> */}
                <td className="border-dashed border-t text-sm border-gray-300 py-3 text-center">
                    {/* <KebabDropdown nameIssuer={rowData.name} tickerData={rowData.ticker} personal={personalData}/> */}
                </td>
            </motion.tr>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.tbody
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.99, 0.23, 0.99] }}
                    >
                        <tr className="bg-white px-2 py-2 font-bold tracking-wider uppercase text-xs text-center">
                            <td />
                            <td />
                            <td />
                            <td className="border-dashed border-t border-gray-300 py-2 text-center">
                                <p>Compra</p>
                            </td>
                            <td className="border-dashed border-t border-gray-300 py-2 text-center">
                                <p>Vol</p>
                            </td>
                            <td className="border-dashed border-t border-gray-300 py-2 text-center">
                                <p>Venta</p>
                            </td>
                            <td className="border-dashed border-t border-gray-300 py-2 text-center">
                                <p>Vol</p>
                            </td>
                        </tr>
                        {extraData.map((d : any) => {
                            return(
                                <tr className="group">
                                    <td />
                                    <td />
                                    <td />
                                    <td className="border-dashed border-t border-gray-300 bg-gray-100 py-2 text-center group-hover:bg-gray-300">
                                        <p>{d["purchase"]}</p>
                                    </td>
                                    <td className="border-dashed border-t border-gray-300 bg-gray-100 py-2 text-center group-hover:bg-gray-300">
                                        <p>{d["vol"]}</p>
                                    </td>
                                    <td className="border-dashed border-t border-gray-300 bg-gray-100 py-2 text-center group-hover:bg-gray-300">
                                        <p>{d["sale"]}</p>
                                    </td>
                                    <td className="border-dashed border-t border-gray-300 bg-gray-100 py-2 text-center group-hover:bg-gray-300">
                                        <p>{d["vol_2"]}</p>
                                    </td>
                                </tr>
                            );
                        })}
                    </motion.tbody>
                )}
            </AnimatePresence>

        </>
    );
}

export default Accordion;