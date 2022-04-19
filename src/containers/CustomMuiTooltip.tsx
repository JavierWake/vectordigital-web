import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CoolTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
        /* aqui van los styles de la arrow */
        //color: '#E7E7E7',
        //backgroundColor: '#E7E7E7',
        /*borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#4C4C4C',*/
    },
    [`& .${tooltipClasses.tooltip}`]: {
        /* aqui van los styles del contenido del tooltip */
        //color: '#E7E7E7',
        //backgroundColor: '#E7E7E7',
        //textColor: '#191919',
        /*borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#4C4C4C',*/
    },
}));

interface TooltipTitleContentProps {
    contentText: string;
    contentTitle?: string;
}

export const TooltipTitleContent = ({ contentText, contentTitle }: TooltipTitleContentProps) => {
    return (
        <div className="m-1">
            {
                contentTitle !== undefined && <div className="mb-2">
                    <h1 
                        className="font-sans text-center text-gray-950 font-bold text-sm"
                    >
                        {contentTitle}
                    </h1>
                </div>
            }
            <p className="font-sans text-center text-xs">
                {contentText}
            </p>
        </div>
    );
};

export const CustomMUITooltip = ({ ...props }: TooltipProps) => {
    return (
        <CoolTooltip
            {...props}
        >
            {props.children}
        </CoolTooltip>
    );
};
  