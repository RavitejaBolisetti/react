/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { supplierInvoiceDataActions } from 'store/actions/data/vehicleReceipt/supplierInvoice';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleReceipt: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: supplierInvoiceData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        isDataLoaded,
        vehicleStatusType: typeData[PARAM_MASTER.PHYSICAL_STATUS.id],
        physicalStatusType: typeData[PARAM_MASTER.PHYSICAL_STATUS.id],

        supplierInvoiceData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: supplierInvoiceDataActions.fetchList,
            saveData: supplierInvoiceDataActions.saveData,
            resetData: supplierInvoiceDataActions.reset,
            listShowLoading: supplierInvoiceDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { typeData, vehicleStatusType, physicalStatusType } = props;
    console.log('🚀 ~ file: VehicleDetailMaster.js:64 ~ VehicleDetailsMasterBase ~ physicalStatusType:', physicalStatusType);
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, otfData, saveData, isLoading } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange, fetchSalesConsultant, NEXT_ACTION, handleButtonClick } = props;
    const [exchangeValue, setexchangeValue] = useState(false);
    const [loyaltyValue, setloyaltyValue] = useState(false);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'OTF Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const onFinish = (values) => {
        const recordId = otfData?.id || '';
        const otfNum = otfData?.otfNumber || '';
        const exchange = values?.exchange === true ? 1 : 0;
        const data = { ...values, id: recordId, otfNumber: otfNum, loyaltyScheme: values?.loyaltyScheme === true ? 1 : 0, exchange: exchange, initialPromiseDeliveryDate: values?.initialPromiseDeliveryDate?.format('YYYY-MM-DD'), custExpectedDeliveryDate: values?.custExpectedDeliveryDate?.format('YYYY-MM-DD') };
        delete data?.mitraName;
        delete data?.mitraType;
        delete data?.modeOfPAyment;

        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
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
        vehicleStatusType,
        physicalStatusType,

        userId,
        isDataLoaded,
        formData: otfData,
        isLoading,
        exchangeValue,
        setexchangeValue,
        loyaltyValue,
        setloyaltyValue,
    };

    const viewProps = {
        typeData,
        formData: otfData,
        styles,
        isLoading,
    };

    const handleFieldsChange = () => {
        const { loyaltyScheme, exchange } = form.getFieldsValue();
        if (loyaltyScheme) {
            setexchangeValue(true);
            setloyaltyValue(false);
        } else if (exchange) {
            setexchangeValue(false);
            setloyaltyValue(true);
        } else {
            setexchangeValue(false);
            setloyaltyValue(false);
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFieldsChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleReceiptFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterBase);
