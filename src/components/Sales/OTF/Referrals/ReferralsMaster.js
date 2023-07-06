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
import { OTFFormButton } from '../OTFFormButton';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { convertCalenderDate } from 'utils/formatDateTime';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                Referrals: { isLoaded: isDataLoaded = false, isLoading, data: referralData = [] },
            },
        },
        customer: {
            customerDetail: { isLoaded: isDataCustomerLoaded = false, isLoading: isCustomerLoading = false, data: customerDetail = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        referralData,
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
    const { formActionType, fetchList, showGlobalNotification, saveData, listShowLoading, userId, referralData, isLoading } = props;
    const { form, selectedOrderId, section, handleFormValueChange, onFinishFailed, fetchCustomerList, listCustomerShowLoading, typeData, handleButtonClick, NEXT_ACTION } = props;

    const [formData, setFormData] = useState();
    const [resetField, setResetField] = useState(false);

    useEffect(() => {
        if (referralData?.mobileNumber) {
            setFormData(referralData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [referralData]);

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    const onFinish = (values) => {
        const data = { ...values, otfNumber: selectedOrderId, dob: convertCalenderDate(values?.dob, 'YYYY-MM-DD'), id: referralData?.id };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: referralData?.id ? 'put' : 'post',
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

    const onSearch = (value) => {
        setResetField(false);
        if (!value) {
            setFormData();
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

        fetchCustomerList({
            setIsLoading: listCustomerShowLoading,
            extraParams: defaultExtraParam,
            userId,
            onSuccessAction: (res) => {
                console.log('🚀 ~ file: ReferralsMaster.js:178 ~ onSearch ~ res:', res?.data?.customerMasterDetails[0]);
                setFormData(res?.data?.customerMasterDetails[0]);
            },
            onErrorAction,
        });
    };

    const formProps = {
        ...props,
        form,
        formData,
        onFinish,
        onFinishFailed,
        onSearch,

        resetField,
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
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
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
