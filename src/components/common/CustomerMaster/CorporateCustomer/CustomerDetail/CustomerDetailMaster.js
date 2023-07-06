/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { customerParentCompanyDataActions } from 'store/actions/data/customerMaster/customerParentCompany';
import { customerDetailsDataActions } from 'store/actions/data/customerMaster/customerDetails';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetails: { isLoaded: isDataLoaded = false, isLoading, data: customerDetailsData = [] },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData },
                CustomerParentCompany: { isLoaded: isCustomerParentCompanyDataLoaded = false, isCustomerParentCompanyLoading, data: customerParentCompanyData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;
    const moduleTitle = 'Customer Details';

    let returnValue = {
        userId,

        moduleTitle,

        isDataLoaded,
        isLoading,
        customerDetailsData,
        typeData,

        isCorporateLovDataLoaded,
        isCorporateLovLoading,
        corporateLovData,

        isCustomerParentCompanyDataLoaded,
        isCustomerParentCompanyLoading,
        customerParentCompanyData,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCorporateLovList: corporateDataActions.fetchFilteredList,
            listCorporateLovShowLoading: corporateDataActions.listShowLoading,

            fetchCustomerParentCompanyList: customerParentCompanyDataActions.fetchList,
            listCustomerParentCompanyShowLoading: customerParentCompanyDataActions.listShowLoading,

            fetchList: customerDetailsDataActions.fetchList,
            listShowLoading: customerDetailsDataActions.listShowLoading,
            saveData: customerDetailsDataActions.saveData,
            resetData: customerDetailsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyCustomerDetailsMasterBase = (props) => {
    const { userId, isDataLoaded, isLoading, showGlobalNotification, customerDetailsData, section, fetchList, listShowLoading, typeData, saveData, fetchCorporateLovList, listCorporateLovShowLoading, isCorporateLovDataLoaded, fetchCustomerParentCompanyList, listCustomerParentCompanyShowLoading, customerParentCompanyData, corporateLovData } = props;
    const { setRefreshCustomerList, selectedCustomer, setSelectedCustomer, selectedCustomerId, setSelectedCustomerId, resetData } = props;
    const { form, handleFormValueChange, onFinishFailed, buttonData, setButtonData, formActionType, handleButtonClick, NEXT_ACTION } = props;

    const [customerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState();
    const [refershData, setRefershData] = useState(false);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (isDataLoaded) {
            form.setFieldsValue({ ...customerDetailsData });
            setFormData(customerDetailsData);
        }
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        if (userId && !isCorporateLovDataLoaded) {
            fetchCorporateLovList({ setIsLoading: listCorporateLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isCorporateLovDataLoaded]);

    useEffect(() => {
        if (userId && selectedCustomerId) {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomer?.customerId,
                    name: 'Customer ID',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
    };

    const onFinish = (values) => {
        const recordId = customerDetailsData?.id || '';
        const data = { ...values, customerId: selectedCustomer?.customerId, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            setButtonData({ ...buttonData, formBtnActive: false });
            setRefreshCustomerList(true);

            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setSelectedCustomer({ ...res.data, customerName: res?.data?.companyName });
                setSelectedCustomerId(res?.data?.customerId);
            }
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

    const validateParentCode = (e) => {
        const parentCompanyData = e?.target?.value;
        if (parentCompanyData) {
            const extraParams = [
                {
                    key: 'parentCompanyCode',
                    title: 'parentCompanyCode',
                    value: parentCompanyData,
                    name: 'parentCompanyCode',
                },
            ];
            fetchCustomerParentCompanyList({ setIsLoading: listCustomerParentCompanyShowLoading, extraParams, userId });
        }
    };

    const formProps = {
        ...props,
        form,
        formData,
        corporateLovData,
        buttonData,
        onFinish,

        onFinishFailed,
        customerDetailsList,
        saveData,
        showForm,
        setShowForm,
        formActionType,
        typeData,
        handleButtonClick,
        styles,
        customerParentCompanyData,
        validateParentCode,
    };

    const viewProps = {
        ...formProps,
        formData,
        styles,
        isLoading,
    };

    const myProps = {
        ...props,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};
export const CustomerDetailMaster = connect(mapStateToProps, mapDispatchToProps)(CompanyCustomerDetailsMasterBase);
