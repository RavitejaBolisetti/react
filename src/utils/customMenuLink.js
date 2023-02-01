import React from 'react';
const { Link } = require('react-router-dom');

const customMenuLink = ({ key, title, link, icon, children = undefined }) => {
    return {
        key: key ? key : Math.random(),
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
