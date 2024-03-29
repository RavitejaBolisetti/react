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
import { translateContent } from 'utils/translateContent';
import { supplierInvoiceDataActions } from 'store/actions/data/vehicleReceipt/supplierInvoice';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleReceipt: {
                SupplierInvoice: { isLoaded: isDataLoaded = false, isLoading, data: supplierInvoiceData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('vehicleReceipt.heading.bookingDetails');

    let returnValue = {
        userId,
        isDataLoaded,
        supplierTypeData: typeData[PARAM_MASTER?.PARTY_TYPE?.id],

        supplierInvoiceData: supplierInvoiceData?.supplierAndInvoiceDetails,
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

const SupplierInvoiceDetailsMasterBase = (props) => {
    const { typeData, supplierTypeData } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, supplierInvoiceData, isLoading } = props;
    const { form, selectedId, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const [exchangeValue, setexchangeValue] = useState(false);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    // const extraParams = [
    //     {
    //         key: 'supplierInvoiceNumber',
    //         title: 'supplierInvoiceNumber',
    //         value: selectedId,
    //         name: 'Supplier Invoice Number',
    //     },
    // ];

    useEffect(() => {
        if (userId && selectedId?.id) {
            setButtonData({ ...buttonData, formBtnActive: true });
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: selectedId?.id,
                    name: 'id',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onFinish = (values) => {
        // const recordId = supplierInvoiceData?.id || '';
        // const data = { ...values, id: recordId, supplierInvoiceNumber: '', loyaltyScheme: values?.loyaltyScheme === true ? 1 : 0, exchange: exchange, initialPromiseDeliveryDate: values?.initialPromiseDeliveryDate?.format('YYYY-MM-DD'), custExpectedDeliveryDate: values?.custExpectedDeliveryDate?.format('YYYY-MM-DD') };
        handleButtonClick({ record: values, buttonAction: NEXT_ACTION });

        // const onSuccess = (res) => {
        //     handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        //     // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        //     fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        // };

        // const onError = (message) => {
        //     showGlobalNotification({ message });
        // };

        // const requestData = {
        //     data: data,
        //     method: 'put',
        //     setIsLoading: listShowLoading,
        //     userId,
        //     onError,
        //     onSuccess,
        // };

        // saveData(requestData);
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        onFinish,
        onFinishFailed,
        fetchList,
        typeData,
        supplierTypeData,
        buttonData,
        setButtonData,

        userId,
        isDataLoaded,
        formData: supplierInvoiceData,
        isLoading,
        exchangeValue,
        setexchangeValue,
    };

    const viewProps = {
        typeData,
        supplierTypeData,
        formData: supplierInvoiceData,
        styles,
        isLoading,
    };

    const buttonProps = {
        ...props,
        buttonData: { ...props.buttonData, editBtn: false, nextBtn: true, saveBtn: false },
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    <VehicleReceiptFormButton {...buttonProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const SupplierInvoiceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(SupplierInvoiceDetailsMasterBase);
