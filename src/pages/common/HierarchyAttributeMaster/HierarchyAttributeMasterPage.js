/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { HierarchyAttribute } from 'components/common/HierarchyAttribute/HierarchyAttribute';
import { PageHeader } from '../PageHeader';
import { translateContent } from 'utils/translateContent';

export const HierarchyAttributeMasterBase = (props) => {
    const [isFavourite, setFavourite] = useState(false);

    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const pageTitle = translateContent('hierarchyAttribute.heading.pageTitle');
    const pageHeaderData = {
        pageTitle,
        showChangeHisoty: true,
        isFavourite,
        setFavourite,
        handleFavouriteClick,
        visibleChangeHistory: false,
        canMarkFavourite: true,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <HierarchyAttribute />
        </>
    );
};

export const HierarchyAttributeMasterPage = withLayoutMaster(HierarchyAttributeMasterBase);
