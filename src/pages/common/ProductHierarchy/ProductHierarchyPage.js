import React, { useState } from 'react';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { connect } from 'react-redux';
import { ProductHierarchy } from 'components/common/ProductHierarchy';
import { PageHeader } from '../PageHeader';

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

export const ProductHierarchyBase = () => {
    const [isFavourite, setFavourite] = useState(false);
    const [isAttributeVisible, setAttributeVisible] = useState(false);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const handleChangeHistoryClick = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };

    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const pageTitle = 'Product Hierarchy';
    const pageHeaderData = {
        pageTitle,
        showChangeHisoty: true,
        isFavourite,
        setFavourite,
        handleFavouriteClick,
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

export const ProductHierarchyPage = connect(mapStateToProps, null)(withLayoutMaster(ProductHierarchyBase));
