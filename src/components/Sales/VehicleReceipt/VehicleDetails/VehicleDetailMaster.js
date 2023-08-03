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
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, saveData, isLoading } = props;
    const { form, selectedId, formActionType, handleFormValueChange, fetchSalesConsultant, NEXT_ACTION, handleButtonClick } = props;
    const [exchangeValue, setexchangeValue] = useState(false);
    const [loyaltyValue, setloyaltyValue] = useState(false);
    const [tooltTipText, settooltTipText] = useState();

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

    useEffect(() => {
        if (isDataLoaded && vehicleDetailData) {
            settooltTipText(
                <div>
                    <p>
                        Model Name: <span>XUV</span>
                    </p>
                    <p>
                        Color: <span>{vehicleDetailData?.color ?? 'Na'}</span>
                    </p>
                    <p>
                        Seating Capacity: <span>{vehicleDetailData?.seatingCapacity ?? 'Na'}</span>
                    </p>
                    <p>
                        Fuel: <span>{vehicleDetailData?.fuel ?? 'Na'}</span>
                    </p>
                    <p>
                        Variants: <span>{vehicleDetailData?.variant ?? 'Na'}</span>
                    </p>
                </div>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, vehicleDetailData]);

    const onFinish = (values) => {
        const recordId = vehicleDetailData?.id || '';
        const exchange = values?.exchange === true ? 1 : 0;
        const data = { ...values, id: recordId, supplierInvoiceNumber: '', loyaltyScheme: values?.loyaltyScheme === true ? 1 : 0, exchange: exchange, initialPromiseDeliveryDate: values?.initialPromiseDeliveryDate?.format('YYYY-MM-DD'), custExpectedDeliveryDate: values?.custExpectedDeliveryDate?.format('YYYY-MM-DD') };
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
        typeData,
        vehicleStatusType,
        physicalStatusType,
        shortageType,
        tooltTipText,
        settooltTipText,

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
        formData: vehicleDetailData,
        styles,
        isLoading,
        tooltTipText,
        settooltTipText,
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
