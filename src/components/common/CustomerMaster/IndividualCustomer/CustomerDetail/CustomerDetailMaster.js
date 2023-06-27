/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';

import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';
import { showGlobalNotification } from 'store/actions/notification';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual: { isLoaded: isDataLoaded = false, isLoading, data },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        data,
        typeData,
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
    const { typeData, fetchCorporateLovList, isCorporateLovDataLoaded, listCorporateLovShowLoading, corporateLovData } = props;
    const { setRefreshList, userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, data, saveData, isLoading, resetData, form, handleFormValueChange, onFinishFailed } = props;
    const { selectedCustomer, setSelectedCustomer, selectedCustomerId, setSelectedCustomerId } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, handleButtonClick, NEXT_ACTION } = props;

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState();
    const [uploadImgDocId, setUploadImgDocId] = useState('');

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

    const onFinish = (values) => {
        setRefreshList(false);
        const data = { ...values, customerId: selectedCustomer?.customerId };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            setButtonData({ ...buttonData, formBtnActive: false });
            setRefreshList(true);

            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
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
        ...props,
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
        setUploadImgDocId,
        uploadImgDocId,
        setButtonData,
        typeData,
        formData,
    };

    const viewProps = {
        ...formProps,
        formActionType,
        formData,
        styles,
        isLoading,
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
                    <CustomerFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const CustomerDetailMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailMasterBase);
