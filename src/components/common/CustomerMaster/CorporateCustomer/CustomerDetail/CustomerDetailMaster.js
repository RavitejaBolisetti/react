/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailsDataActions } from 'store/actions/data/customerMaster/customerDetails';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { InputSkeleton } from 'components/common/Skeleton';
import styles from 'components/common/Common.module.css';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';
import { customerParentCompanyDataActions } from 'store/actions/data/customerMaster/customerParentCompany';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetails: { isLoaded: isDataLoaded = false, isLoading, data: customerDetailsData = [] },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData = [] },
                CustomerParentCompany: { isLoaded: isCustomerParentCompanyDataLoaded = false, isCustomerParentCompanyLoading, data: customerParentCompanyData = [] },
            },
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isTypeDataLoading, paramdata: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Customer Details';

    let returnValue = {
        userId,
        isTypeDataLoaded,
        isTypeDataLoading,
        moduleTitle,

        isDataLoaded,
        isLoading,
        customerDetailsData,
        typeData: typeData,

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
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

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
    const { userId, isDataLoaded, isLoading, isTypeDataLoaded, isTypeDataLoading, showGlobalNotification, customerDetailsData, section, fetchConfigList, listConfigShowLoading, fetchList, listShowLoading, typeData, saveData, fetchCorporateLovList, listCorporateLovShowLoading, isCorporateLovDataLoaded, corporateLovData, fetchCustomerParentCompanyList, listCustomerParentCompanyShowLoading, customerParentCompanyData } = props;
    const { selectedCustomer, setSelectedCustomer, selectedCustomerId, setSelectedCustomerId, resetData, isCustomerParentCompanyDataLoaded } = props;
    const { form, handleFormValueChange, onFinishFailed, buttonData, setButtonData, formActionType, handleButtonClick } = props;

    const [customerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [configurableTypedata, setConfigurableTypedata] = useState({});
    const [formData, setFormData] = useState();
    const [refershData, setRefershData] = useState(false);
    const [corporateData, setCorporateData] = useState();

    const [showDataLoading, setShowDataLoading] = useState(true);

    const NEXT_EDIT_ACTION = FROM_ACTION_TYPE?.NEXT_EDIT;

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    useEffect(() => {
        if (isDataLoaded) {
            form.setFieldsValue({ ...customerDetailsData });
            setFormData(customerDetailsData);
            setShowDataLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, customerDetailsData]);

    useEffect(() => {
        if (isDataLoaded) {
            form.setFieldsValue({ ...customerDetailsData });
            setFormData(customerDetailsData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, customerDetailsData]);

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
        if (userId) {
            if (!isTypeDataLoaded && !isTypeDataLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_CATE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.MEM_TYPE.id });
            }
            if (!isDataLoaded && !isLoading && !formActionType?.addMode) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);
    useEffect(() => {
        if (userId && !isCorporateLovDataLoaded) {
            fetchCorporateLovList({ setIsLoading: listCorporateLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isCorporateLovDataLoaded]);

    useEffect(() => {
        if (corporateLovData && isCorporateLovDataLoaded && userId) {
            setCorporateData(corporateLovData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [corporateLovData, isCorporateLovDataLoaded, userId]);

    useEffect(() => {
        if (userId && !isCustomerParentCompanyDataLoaded) {
            fetchCustomerParentCompanyList({ setIsLoading: listCustomerParentCompanyShowLoading, userId });
            const extraParams = [
                {
                    key: 'parentCompanyCode',
                    title: 'parentCompanyCode',
                    value: customerParentCompanyData,
                    name: 'parentCompanyCode',
                },
            ];
            fetchCustomerParentCompanyList({ setIsLoading: listCustomerParentCompanyShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isCustomerParentCompanyDataLoaded]);

    useEffect(() => {
        if (typeData) {
            setConfigurableTypedata({ CUST_TYPE: typeData['CUST_TYPE'], CORP_TYPE: typeData['CORP_TYPE'], CORP_CATE: typeData['CORP_CATE'], TITLE: typeData['TITLE'], MEM_TYPE: typeData['MEM_TYPE'] });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData, isDataLoaded]);

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

    const onSearch = (value) => {
        let searchParams = [
            {
                key: 'parentCompanyCode',
                title: 'parentCompanyCode',
                value: value,
                name: 'parentCompanyCode',
            },
        ];
        fetchCustomerParentCompanyList({ setIsLoading: listCustomerParentCompanyShowLoading, userId, onSuccessAction, extraParams: searchParams, onErrorAction });
    };

    useEffect(() => {
        form.setFieldsValue({
            parentCompanyName: customerParentCompanyData[0]?.parentCompanyName,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerParentCompanyData]);

    const handleParentCompany = (e) => {
        console.log(e.target.value);
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
    };

    const onFinish = (values) => {
        const recordId = customerDetailsData?.id || '';
        const data = { ...values, customerId: customerDetailsData.customerId, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            setButtonData({ ...buttonData, formBtnActive: false });

            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_EDIT_ACTION });
                setSelectedCustomer({ ...res.data, customerName: res?.data?.firstName + ' ' + res?.data?.middleName + ' ' + res?.data?.lastName });
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

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomer?.customerId,
            name: 'Customer Id',
        },
    ];

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
        corporateLovData: corporateData,
        buttonData,
        onFinish,

        onFinishFailed,
        customerDetailsList,
        saveData,
        showForm,
        setShowForm,
        formActionType,
        typeData,
        configurableTypedata,
        handleButtonClick,
        styles,
        handleParentCompany,
        customerParentCompanyData,
        onSearch,
        validateParentCode,
    };

    const viewProps = {
        formData: customerDetailsData,
        styles,
    };

    const myProps = {
        ...props,
        saveButtonName: formActionType?.addMode ? 'Create Customer ID' : 'Save & Next',
    };

    const formContainer = formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />;
    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <InputSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    {isLoading ? formSkeleton : formContainer}
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
