/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { otfReferralsDataActions } from 'store/actions/data/otf/referrals';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import dayjs from 'dayjs';
import { InputSkeleton } from 'components/common/Skeleton';
import { OTFFormButton } from '../OTFFormButton';
import { OTFStatusBar } from '../utils/OTFStatusBar';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                Referrals: { isLoaded: isDataLoaded = false, isLoading, data: ReferralsData = [] },
            },
        },
        customer: {
            customerDetail: { isLoaded: isDataCustomerLoaded = false, isLoading: isCustomerLoading = false, data: customerDetail = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        ReferralsData,
        isLoading,
        isDataCustomerLoaded,
        isCustomerLoading,
        customerDetail,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerList: customerDetailDataActions.fetchList,
            listCustomerShowLoading: customerDetailDataActions.listShowLoading,
            fetchList: otfReferralsDataActions.fetchList,
            listShowLoading: otfReferralsDataActions.listShowLoading,
            resetData: otfReferralsDataActions.reset,
            saveData: otfReferralsDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ReferralsMasterBase = (props) => {
    const { formActionType, fetchList, showGlobalNotification, saveData, listShowLoading, userId, isDataLoaded, ReferralsData, isLoading } = props;
    const { form, selectedOrderId, section, handleFormValueChange, onFinishFailed, fetchCustomerList, listCustomerShowLoading, typeData } = props;

    const [formData, setformData] = useState();
    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    const onFinish = (values) => {
        const data = { ...values, otfNumber: 'OTF001', dob: dayjs(values?.dob).format('YYYY-MM-DD'), id: formData?.id };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (userId && selectedOrderId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);
    useEffect(() => {
        if (isDataLoaded && ReferralsData && userId) {
            setformData(ReferralsData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ReferralsData, userId]);

    const onSearch = (value) => {
        if (!value) {
            //Reset Fields Here
            return false;
        }
        const defaultExtraParam = [
            {
                key: 'customerType',
                title: 'Customer Type',
                value: 'ALL',
                canRemove: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 1000,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
                canRemove: true,
            },

            {
                key: 'searchType',
                title: 'Type',
                value: 'mobileNumber',
                canRemove: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: value,
                canRemove: true,
            },
        ];

        fetchCustomerList({ setIsLoading: listCustomerShowLoading, extraParams: defaultExtraParam, userId, onSuccessAction, onErrorAction });
    };

    const formProps = {
        ...props,
        form,
        formData,
        onFinish,
        onFinishFailed,
        onSearch,
    };

    const viewProps = {
        styles,
        formData,
        isLoading,
        typeData,
    };

    return (
        <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={1} />
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const ReferralsMaster = connect(mapStateToProps, mapDispatchToProps)(ReferralsMasterBase);
