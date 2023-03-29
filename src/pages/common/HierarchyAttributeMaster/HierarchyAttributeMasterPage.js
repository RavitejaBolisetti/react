import React, { useState } from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { HierarchyAttribute } from 'components/common/HierarchyAttribute/HierarchyAttribute';
import { PageHeader } from '../PageHeader';

export const HierarchyAttributeMasterBase = (props) => {
    const [isFavourite, setFavourite] = useState(false);

    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const pageTitle = 'Hierarchy Attribute Master';
    const pageHeaderData = {
        pageTitle,
        showChangeHisoty: true,
        isFavourite,
        setFavourite,
        handleFavouriteClick,
        visibleChangeHistory: false,
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <HierarchyAttribute />
        </>
    );
};

export const HierarchyAttributeMasterPage = withLayoutMaster(HierarchyAttributeMasterBase);
