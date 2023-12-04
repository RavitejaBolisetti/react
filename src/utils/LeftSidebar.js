/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import MenuNav from 'utils/MenuNav';

const LeftSidebar = (props) => {
    const { MenuCard, ...rest } = props;
    return (
        <>
            <MenuCard {...props} />
            <MenuNav {...rest} />
        </>
    );
};

export default LeftSidebar;
