import React from 'react';
const { Link } = require('react-router-dom');

const customMenuLink = ({ key = Math.random(), title, link, icon, children = undefined }) => {
    return {
        key: key,
        label: (
            <Link to={link}>
                {icon && icon}
                {title}
            </Link>
        ),
        children,
    };
};

export default customMenuLink;
