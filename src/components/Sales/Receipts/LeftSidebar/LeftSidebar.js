/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import MenuNav from './MenuNav';
import ReceiptDetailCard from './ReceiptDetailCard';
const LeftSidebar = (props) => {
    return (
        <>
            <ReceiptDetailCard {...props} />
            <MenuNav {...props} />
        </>
    );
};

export default LeftSidebar;
