/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import MovementClassMaster from 'components/Spares/MovementClass';



const MovementClassMasterPageBase = (props) => {
    
    const pageTitle = 'Movement Class Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <MovementClassMaster />
        </>
    );
};

export const MovementClassMasterPage = withLayoutMaster(MovementClassMasterPageBase);
