/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { PageHeader } from 'pages/common/PageHeader';
import InventoryClassificationMaster from 'components/Spares/InventoryClassification';
import { BinToBinTransferMaster } from 'components/Spares/BinToBinTransfer';



const BinToBinTransferPageBase = (props) => {
    
    const pageTitle = 'Bin to Bin Transfer';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <BinToBinTransferMaster />
        </>
    );
};

export const BinToBinTransferPage = withLayoutMaster(BinToBinTransferPageBase);
