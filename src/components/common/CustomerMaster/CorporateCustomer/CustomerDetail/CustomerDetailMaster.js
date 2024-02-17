/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useCallback, useEffect, useState } from 'react';
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
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { debounce } from 'utils/debounce';
import { corporateCompanyDescriptionDataActions } from 'store/actions/data/customerMaster/corporateDescription';
import { corporateCompanyDescriptionTypeDataActions } from 'store/actions/data/customerMaster/corporateDescriptionType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetails: { isLoaded: isDataLoaded = false, isLoading, data: customerDetailsData = [], isLoadingOnSave },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData },
                CustomerParentCompany: { isLoaded: isCustomerParentCompanyDataLoaded = false, isCustomerParentCompanyLoading, data: customerParentCompanyData = [] },
                CorporateDescription: { isFilteredListLoaded: isCorporateDescriptionLoaded = false, isLoading: isCorporateDescriptionLovLoading, filteredListData: corporateDescriptionLovData },
                CorporateDescriptionType: { isFilteredListLoaded: isCorporateDescriptionTypeLoaded = false, isLoading: isCorporateDescriptionTypeLovLoading, filteredListData: corporateTypeLovData },
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

        isCorporateDescriptionLoaded,
        isCorporateDescriptionTypeLoaded,
        isCorporateDescriptionLovLoading,
        isCorporateDescriptionTypeLovLoading,
        corporateDescriptionLovData,
        corporateTypeLovData,

        isLoadingOnSave,
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
            saveFormShowLoading: customerDetailsDataActions.saveFormShowLoading,
            resetData: customerDetailsDataActions.reset,

            fetchCorporateDescriptionLovList: corporateCompanyDescriptionDataActions.fetchFilteredList,
            listCorporateDescriptionLovShowLoading: corporateCompanyDescriptionDataActions.listShowLoading,

            fetchCorporateTypeLovList: corporateCompanyDescriptionTypeDataActions.fetchFilteredList,
            listCorporateTypeLovShowLoading: corporateCompanyDescriptionTypeDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyCustomerDetailsMasterBase = (props) => {
    const { userId, isLoading, showGlobalNotification, customerDetailsData, section, fetchList, listShowLoading, typeData, saveData, fetchCorporateLovList, listCorporateLovShowLoading, saveFormShowLoading, fetchCustomerParentCompanyList, listCustomerParentCompanyShowLoading, customerParentCompanyData, corporateLovData, customerType } = props;
    const { selectedCustomer, setSelectedCustomer, selectedCustomerId, setSelectedCustomerId, resetData } = props;
    const { fetchCorporateTypeLovList, listCorporateTypeLovShowLoading, setFilterString, form, handleFormValueChange, buttonData, formActionType, handleButtonClick, NEXT_ACTION } = props;

    const [customerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState();
    const [numbValidatedSuccess, setNumbValidatedSuccess] = useState(false);
    
    useEffect(() => {
        if (customerDetailsData) {
            form.setFieldsValue({ ...customerDetailsData });
            setFormData(customerDetailsData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerDetailsData]);

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCorporateLovList({ setIsLoading: listCorporateLovShowLoading, userId });
            fetchCorporateTypeLovList({ setIsLoading: listCorporateTypeLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomerId,
            name: 'Customer ID',
        },
    ];

    useEffect(() => {
        if (userId && selectedCustomerId) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const defaultExtraParam = [
        {
            key: 'customerType',
            title: 'Customer Type',
            value: customerType,
            canRemove: true,
        },
        {
            key: 'pageSize',
            title: 'Value',
            value: 1,
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
            title: 'searchType',
            value: 'mobileNumber',
            canRemove: true,
        },
    ];

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onFinish = (values) => {
        if (!formActionType?.addMode && !numbValidatedSuccess && customerDetailsData?.mobileNumber !== values?.mobileNumber) {
            showGlobalNotification({ message: translateContent('customerMaster.notification.verify') });
            return;
        }

        const recordId = customerDetailsData?.id || '';
        const reqdata = { ...values, customerId: selectedCustomer?.customerId, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            setFilterString({ current: 1, pageSize: 10 });

            if (res?.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setSelectedCustomer({ ...res.data, customerName: res?.data?.companyName });
                setSelectedCustomerId(res?.data?.customerId);
            }
        };

        const requestData = {
            data: reqdata,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: saveFormShowLoading,
            userId,
            onError: onErrorAction,
            onSuccess,
        };

        saveData(requestData);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validateParentCode = useCallback(
        debounce((e) => {
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

                fetchCustomerParentCompanyList({ setIsLoading: listCustomerParentCompanyShowLoading, extraParams, userId, onErrorAction });
            }
        }),
        []
    );

    const formProps = {
        ...props,
        form,
        formData,
        corporateLovData,
        buttonData,
        onFinish,
        userId,
        selectedCustomer,
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
        numbValidatedSuccess,
        setNumbValidatedSuccess,
        customerType,
        defaultExtraParam,
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
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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
