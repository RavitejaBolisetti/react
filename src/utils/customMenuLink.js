/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tooltip } from 'antd';
import React from 'react';
import { generateRandomNumber } from 'utils/generateRandomNumber';

const { Link } = require('react-router-dom');
export const addToolTip =
    (title, placement = 'bottom', color = '', className = '', defaultOpen = false) =>
    (inputComponent) => {
        const canOpen = defaultOpen ? { open: true } : undefined;
        return inputComponent ? (
            <Tooltip overlayClassName={className} title={title} placement={placement} color={color} {...canOpen}>
                {inputComponent}
            </Tooltip>
        ) : (
            title
        );
    };

const customMenuLink = ({ key = generateRandomNumber(), title, link = undefined, icon, children = undefined, onClick = () => {}, collapsed = false }) => {
    return {
        key: key,
        label: link ? (
            <Link to={link}>
                {icon ? icon : undefined}
                {title && ' ' + title}
            </Link>
        ) : (
            <div onClick={onClick}>
                {icon ? icon : undefined}
                {title && ' ' + title}
            </div>
        ),
        children,
    };
};

export default customMenuLink;
