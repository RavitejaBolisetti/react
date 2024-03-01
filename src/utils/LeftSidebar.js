/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import MenuNav from 'utils/MenuNav';

const LeftSidebar = (props) => {
    const { setPreviousSection, previousSection, currentSection, MenuCard } = props;
    if (setPreviousSection instanceof Function && previousSection && currentSection > previousSection) {
        setPreviousSection(currentSection);
    }
    return (
        <>
            <MenuCard {...props} />
            <MenuNav {...props} />
        </>
    );
};

export default LeftSidebar;
