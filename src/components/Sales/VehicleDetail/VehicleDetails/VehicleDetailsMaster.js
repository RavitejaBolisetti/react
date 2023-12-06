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

import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                ViewVehicleDetail: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetails = {} },
            },
        },
        common: {
            Header: { data: loginUserData = [] },
        },
    } = state;

    const moduleTitle = translateContent('vehicleDetail.heading.mainTitle');

    let returnValue = {
        userId,
        typeData,
        isDataLoaded,
        isLoading,
        moduleTitle,
        vehicleDetails,
        userType: loginUserData?.userType || '',
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

const VehicleDetailsMasterBase = (props) => {
    const { typeData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, saveData, isLoading, vehicleDetails } = props;
    const { form, selectedRecordId, formActionType, handleFormValueChange, salesConsultantLov, NEXT_ACTION, handleButtonClick } = props;
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
            name: 'VIN',
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
        if (values.oemPrivilegeCustomer === null || values.oemPrivilegeCustomer === false) {
            values.oemPrivilegeCustomer = false;
        } else {
            values.oemPrivilegeCustomer = true;
        }

        const data = { ...values, id: recordId, vin: vin, mnfcWarrEndDate: values?.mnfcWarrEndDate?.format('YYYY-MM-DD'), deliveryDate: values?.deliveryDate?.format('YYYY-MM-DD'), nextServiceDueDate: values?.nextServiceDueDate?.format('YYYY-MM-DD'), pucExpiryDate: values?.pucExpiryDate?.format('YYYY-MM-DD'), insuranceExpiryDate: values?.insuranceExpiryDate?.format('YYYY-MM-DD'), saleDate: values?.saleDate?.format('YYYY-MM-DD'), registrationNumber: registrationNumber };
        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION, onSave: true });
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: { vehicleDetails: data },
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const formProps = {
        ...props,
        form,
        onFinish,
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
        <Form layout="vertical" data-testid="test-id" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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

export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterBase);
