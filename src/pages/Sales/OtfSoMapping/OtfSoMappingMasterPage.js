/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import { OtfSoMappingMaster } from 'components/Sales';

const OtfSoMappingMasterBase = (props) => {
    const pageTitle = 'Booking SO Mapping Control Master';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <OtfSoMappingMaster />
        </>
    );
};

export const OtfSoMappingMasterPage = withLayoutMaster(OtfSoMappingMasterBase);
