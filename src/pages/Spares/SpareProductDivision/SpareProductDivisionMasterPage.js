/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import SpareProductDivisionMaster from 'components/Spares/SpareProductDivision';



const SpareProductDivisionMasterPageBase = (props) => {
    
    const pageTitle = 'Spare Product Division';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <SpareProductDivisionMaster />
        </>
    );
};

export const SpareProductDivisionMasterPage = withLayoutMaster(SpareProductDivisionMasterPageBase);
