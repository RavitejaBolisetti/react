import React from 'react';
import MenuNav from './MenuNav';
import OTFDetailCard from './OTFDetailCard';

const LeftSidebar = (props) => {
    return (
        <>
            <OTFDetailCard {...props} />
            <MenuNav {...props} />
        </>
    );
};

export default LeftSidebar;
