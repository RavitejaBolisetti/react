/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { ProductHierarchy } from 'components/common/ProductHierarchy/ProductHierarchy';
import { PageHeader } from '../PageHeader';
import { translateContent } from 'utils/translateContent';


export const ProductHierarchyBase = () => {
    const [isAttributeVisible, setAttributeVisible] = useState(false);

    const pageTitle = translateContent('productHierarchy.heading.pageTitle');
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: false,
        visibleChangeHistory: false,
        visibleSampleBtn: true,
        handleSample: () => setAttributeVisible(!isAttributeVisible),
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ProductHierarchy isAttributeVisible={isAttributeVisible} />
        </>
    );
};

export const ProductHierarchyPage = withLayoutMaster(ProductHierarchyBase);
