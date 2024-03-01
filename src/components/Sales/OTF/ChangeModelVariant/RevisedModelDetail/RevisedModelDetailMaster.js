/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import RevisedModelHeader from './RevisedModelHeader';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
    } = state;

    let returnValue = {
        userId,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

const RevisedModelDetailMasterBase = (props) => {
    const {
        typeData,
        formActionType: { viewMode },
        formData,
        userId,
        data,
        getProductAttributeDetail,
        setRevisedProductAttributeData,
        productDetailRefresh,
        setProductDetailRefresh,
    } = props;

    const [modelStatus, setModelStatus] = useState();

    useEffect(() => {
        formData?.sapStatusResponseCode && setModelStatus(formData?.sapStatusResponseCode);
        if (formData?.revisedModel) {
            getProductAttributeDetail(formData?.revisedModel, setRevisedProductAttributeData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.revisedModel]);

    const handleRefresh = () => {
        setProductDetailRefresh(!productDetailRefresh);
    };

    const formProps = {
        ...props,
        styles,
        setModelStatus,
        modelStatus,
        data,
        typeData,
        userId,
        handleRefresh,
    };

    return (
        <>
            <div className={`${styles.cardInsideBox} ${styles.pad5}`}>
                <RevisedModelHeader {...formProps} />
                {viewMode ? (
                    <ViewDetail {...formProps} />
                ) : (
                    <>
                        <Divider />
                        <AddEditForm {...formProps} />
                    </>
                )}
            </div>
        </>
    );
};
export const RevisedModelDetailMaster = connect(mapStateToProps, mapDispatchToProps)(RevisedModelDetailMasterBase);
