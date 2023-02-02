import React from 'react';
const { Link } = require('react-router-dom');

const customMenuLink = ({ key = Math.random(), title, link, icon, children = undefined, onclick = () => {} }) => {
    return {
        key: key,
        label: link ? (
            <Link to={link}>
                {icon ? icon : undefined}
                {' ' + title}
            </Link>
        ) : (
            <span onClick={onclick}>
                {icon ? icon : undefined}
                {' ' + title}
            </span>
        ),
        children,
    };
};

export default customMenuLink;
