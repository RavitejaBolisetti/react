import { Tooltip } from 'antd';
import React from 'react';
const { Link } = require('react-router-dom');
export const addToolTip = (tooltip) =>
    tooltip ? (
        <>
            <Tooltip title={tooltip}>{tooltip}</Tooltip>
        </>
    ) : (
        tooltip
    );

const customMenuLink = ({ key = Math.random() * 1000, title, link, icon, children = undefined, onclick = () => {}, collapsed = false }) => {
    const modifiedTitle = <Tooltip title={title}>{title}</Tooltip>;
    return {
        key: key,
        label: link ? (
            <Link to={link}>
                {icon ? icon : undefined}
                {!collapsed ? addToolTip(title) : title}
            </Link>
        ) : (
            <span onClick={onclick}>
                {icon ? icon : undefined}
                {collapsed ? addToolTip(title) : title}
            </span>
        ),
        children,
    };
};

export default customMenuLink;
