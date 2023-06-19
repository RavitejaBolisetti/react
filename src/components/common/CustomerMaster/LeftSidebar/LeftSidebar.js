import React from 'react';
import MenuNav from './MenuNav';
import ProfileDetailCard from './ProfileDetailCard';

const LeftSidebar = (props) => {
    return (
        <>
            <ProfileDetailCard {...props} />
            <MenuNav {...props} />
        </>
    );
};

export default LeftSidebar;
