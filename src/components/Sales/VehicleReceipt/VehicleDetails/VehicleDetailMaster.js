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

import { vehicleDetailDataActions } from 'store/actions/data/vehicleReceipt/vehicleDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleReceipt: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        isDataLoaded,
        vehicleStatusType: typeData[PARAM_MASTER.GRN_STATS.id],
        physicalStatusType: typeData[PARAM_MASTER.PHYSICAL_STATUS.id],
        shortageType: typeData[PARAM_MASTER.YES_NO_FLG.id],

        vehicleDetailData: vehicleDetailData?.vehicleDetails,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDetailDataActions.fetchList,
            saveData: vehicleDetailDataActions.saveData,
            resetData: vehicleDetailDataActions.reset,
            listShowLoading: vehicleDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { typeData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, saveData, isLoading, setIsFormVisible } = props;
    const { form, selectedId, formActionType, handleFormValueChange, fetchSalesConsultant, NEXT_ACTION, handleButtonClick } = props;
    const [exchangeValue, setexchangeValue] = useState(false);
    const [loyaltyValue, setloyaltyValue] = useState(false);

    const [vehicleDetailForm] = Form.useForm();

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const extraParams = [
        {
            key: 'supplierInvoiceNumber',
            title: 'supplierInvoiceNumber',
            value: selectedId,
            name: 'Supplier Invoice Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedId) {
            const extraParams = [
                {
                    key: 'supplierInvoiceNumber',
                    title: 'supplierInvoiceNumber',
                    value: selectedId,
                    name: 'Supplier Invoice Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedId]);

    const onFinish = (values) => {
        // const recordId = vehicleDetailData?.id || '';
        const data = { vehicleDetails: vehicleDetailData };
        console.log('🚀 ~ file: VehicleDetailMaster.js:129 ~ onFinish ~ data:', vehicleDetailData);

        const onSuccess = (res) => {
            // handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
            form.resetFields();
            setIsFormVisible(false);
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
        typeData,
        vehicleStatusType,
        physicalStatusType,
        shortageType,

        userId,
        isDataLoaded,
        formData: vehicleDetailData,
        isLoading,
        exchangeValue,
        setexchangeValue,
        loyaltyValue,
        setloyaltyValue,
        vehicleDetailForm,
    };

    const viewProps = {
        typeData,
        vehicleStatusType,
        physicalStatusType,
        shortageType,
        formData: vehicleDetailData,
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
