/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';

import { corporateAccountsRelatedDataActions } from 'store/actions/data/customerMaster/corporateAccountRelated';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CorporateAccounts: { isLoaded: isDataLoaded = false, isLoading, data: accountData = {}, isLoadingOnSave },
            },
        },
    } = state;

    const moduleTitle = 'Accounts Related';

    let returnValue = {
        userId,
        isDataLoaded,
        accountData,
        isLoading,
        moduleTitle,

        isLoadingOnSave,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: corporateAccountsRelatedDataActions.fetchList,
            saveData: corporateAccountsRelatedDataActions.saveData,
            resetData: corporateAccountsRelatedDataActions.reset,
            listShowLoading: corporateAccountsRelatedDataActions.listShowLoading,
            saveFormShowLoading: corporateAccountsRelatedDataActions.saveFormShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const AccountRelatedMasterBase = (props) => {
    const { form, handleFormValueChange } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, accountData, saveData, isDataLoaded, isLoading, resetData } = props;
    const { formActionType, selectedCustomerId, handleButtonClick, NEXT_ACTION } = props;
    const { saveFormShowLoading } = props;

    const [formData, setFormData] = useState();

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomerId,
            name: 'Customer ID',
        },
    ];

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        resetData();
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
    };

    useEffect(() => {
        if (isDataLoaded) {
            form.setFieldsValue({ ...accountData });
            setFormData(accountData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        if (userId && selectedCustomerId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFinish = (values) => {
        const data = { ...values, customerId: selectedCustomerId };

        const onSuccess = (res) => {
            form.resetFields();
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => showGlobalNotification({ message });

        const requestData = {
            data,
            method: accountData?.customerId ? 'put' : 'post',
            setIsLoading: saveFormShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const formProps = {
        formData,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title} </h2>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const AccountRelatedMaster = connect(mapStateToProps, mapDispatchToProps)(AccountRelatedMasterBase);
