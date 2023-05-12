import { Tooltip } from 'antd';
import React from 'react';
import { generateRandomNumber } from 'utils/generateRandomNumber';

const { Link } = require('react-router-dom');
export const addToolTip =
    (title, placement = 'bottom', color = '', className = '') =>
    (inputComponent) =>
        inputComponent ? (
            <Tooltip overlayClassName={className} title={title} placement={placement} color={color}>
                {inputComponent}
            </Tooltip>
        ) : (
            title
        );

const customMenuLink = ({ key = generateRandomNumber(), title, link, icon, children = undefined, onClick = () => {}, collapsed = false }) => {
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
