import React, { useState } from 'react';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { ProductHierarchy } from 'components/common/ProductHierarchy/ProductHierarchy';
import { PageHeader } from '../PageHeader';

export const ProductHierarchyBase = () => {
    const [isAttributeVisible, setAttributeVisible] = useState(false);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const handleChangeHistoryClick = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };


    const pageTitle = 'Product Hierarchy';
    const pageHeaderData = {
        pageTitle,
        canMarkFavourite: true,
        showChangeHisoty: true,
        visibleChangeHistory: true,
        handleChangeHistoryClick,
        isChangeHistoryVisible,
        visibleSampleBtn: true,
        handleSample: () => setAttributeVisible(!isAttributeVisible),
    };
    return (
        <>
            <PageHeader {...pageHeaderData} />
            <ProductHierarchy isAttributeVisible={isAttributeVisible} isChangeHistoryVisible={isChangeHistoryVisible} />
        </>
    );
};

export const ProductHierarchyPage = withLayoutMaster(ProductHierarchyBase);
