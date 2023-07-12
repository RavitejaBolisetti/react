/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleDetailFormButton } from '../VehicleDetailFormButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewVehicleDetailDataActions } from 'store/actions/data/vehicle/viewVehicleDetails';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                ViewVehicleDetail: { isLoaded, isLoading, data: vehicleDetails = {} },
            },
        },
        common: {
            Header: { data: loginUserData = [] },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        typeData,
        isDataLoaded: true,
        isLoading,
        moduleTitle,
        vehicleDetails,
        loginUserData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: viewVehicleDetailDataActions.fetchList,
            saveData: viewVehicleDetailDataActions.saveData,
            resetData: viewVehicleDetailDataActions.reset,
            listShowLoading: viewVehicleDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VechileDetailsMasterBase = (props) => {
    const { typeData, listConsultantShowLoading } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, saveData, isLoading, vehicleDetails } = props;
    const { form, selectedRecordId, formActionType, handleFormValueChange, salesConsultantLov, isSalesConsultantDataLoaded, NEXT_ACTION, handleButtonClick } = props;
    const [mnmCtcVehicleFlag, setMnmCtcVehicleFlag] = useState(false);
    const [activeKey, setactiveKey] = useState([1]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const extraParams = [
        {
            key: 'vin',
            title: 'vin',
            value: selectedRecordId,
            name: 'VIN Number',
        },
    ];
    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    const onFinish = (values) => {
        const recordId = vehicleDetails.vehicleDetails?.id || '';
        const vin = vehicleDetails.vehicleDetails?.vin || '';
        const registrationNumber = vehicleDetails.vehicleDetails?.registrationNumber || '';

        const data = { ...values, id: recordId, vin: vin, mnfcWarrEndDate: values?.mnfcWarrEndDate?.format('YYYY-MM-DD'), deliveryDate: values?.deliveryDate?.format('YYYY-MM-DD'), nextServiceDueDate: values?.nextServiceDueDate?.format('YYYY-MM-DD'), pucExpiryDate: values?.pucExpiryDate?.format('YYYY-MM-DD'), insuranceExpiryDate: values?.insuranceExpiryDate?.format('YYYY-MM-DD'), saleDate: values?.saleDate?.format('YYYY-MM-DD'), registrationNumber: registrationNumber };
        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            // showGlobalNotification({ message });
        };

        const requestData = {
            data: {"vehicleDetails":data},
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        onFinish,
        onFinishFailed,
        fetchList,
        typeData,
        userId,
        isDataLoaded,
        formData: vehicleDetails?.vehicleDetails,
        isLoading,
        salesConsultantLov,
        mnmCtcVehicleFlag,
        setMnmCtcVehicleFlag,
        onChange,
        activeKey,
        setactiveKey,
    };

    const viewProps = {
        typeData,
        fetchList,
        formData: vehicleDetails?.vehicleDetails,
        styles,
        isLoading,
        salesConsultantLov,
        mnmCtcVehicleFlag,
        setMnmCtcVehicleFlag,
        onChange,
        activeKey,
        setactiveKey,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDetailFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VechileDetailsMasterBase);
