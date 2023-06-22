/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';
import { showGlobalNotification } from 'store/actions/notification';

import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import { InputSkeleton } from 'components/common/Skeleton';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual: { isLoaded: isDataLoaded = false, isLoading, data },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData },
            },
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isTypeDataLoading, paramdata: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isTypeDataLoaded,
        isTypeDataLoading,

        isDataLoaded,
        isLoading,
        data,
        typeData: typeData,

        isCorporateLovDataLoaded,
        isCorporateLovLoading,
        corporateLovData,
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

            fetchList: customerDetailsIndividualDataActions.fetchList,
            listShowLoading: customerDetailsIndividualDataActions.listShowLoading,
            saveData: customerDetailsIndividualDataActions.saveData,
            resetData: customerDetailsIndividualDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const CustomerDetailMasterBase = (props) => {
    const { isTypeDataLoaded, isTypeDataLoading, typeData, fetchConfigList, listConfigShowLoading, fetchCorporateLovList, isCorporateLovDataLoaded, listCorporateLovShowLoading, corporateLovData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, data, saveData, isLoading, resetData, form, handleFormValueChange, onFinishFailed } = props;
    const { selectedCustomer, setSelectedCustomer, selectedCustomerId, setSelectedCustomerId } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, handleButtonClick } = props;

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState();
    const [configurableTypedata, setConfigurableTypedata] = useState({});

    const NEXT_EDIT_ACTION = FROM_ACTION_TYPE?.NEXT_EDIT;

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (isDataLoaded) {
            form.setFieldsValue({ ...data });
            setFormData(data);
        }
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        if (userId && !isTypeDataLoaded && !isTypeDataLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_TYPE.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_TYPE.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_CATE.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.TITLE.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.MEM_TYPE.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isTypeDataLoaded]);

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
                    value: selectedCustomerId,
                    name: 'Customer ID',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);

    useEffect(() => {
        if (typeData) {
            setConfigurableTypedata({ CUST_TYPE: typeData['CUST_TYPE'], CORP_TYPE: typeData['CORP_TYPE'], CORP_CATE: typeData['CORP_CATE'], TITLE: typeData['TITLE'], MEM_TYPE: typeData['MEM_TYPE'] });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData]);

    const onFinish = (values) => {
        const data = { ...values, customerId: selectedCustomer?.customerId };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
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

    const formProps = {
        formActionType,
        form,
        onFinish,
        saveData,
        corporateLovData,
        setFormActionType,
        onFinishFailed,
        handleButtonClick,
        showForm,
        fetchCorporateLovList,
        setShowForm,
        setButtonData,
        typeData,
        formData,
        configurableTypedata,
    };

    const viewProps = {
        formData,
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
export const CustomerDetailMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailMasterBase);
