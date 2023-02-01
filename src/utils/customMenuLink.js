import React from 'react';
const { Link } = require('react-router-dom');

const customMenuLink = ({ key = (Math.random() * 1000), title, link, icon, children = undefined, onclick = () => {} }) => {
    return {
        key: key,
        label: link ? (
            <Link to={link}>
                {icon && icon}
                {title}
            </Link>
        ) : (
            <span onClick={onclick}>
                {icon && icon}
                {title}
            </span>
        ),
        children,
    };
};

export default customMenuLink;
