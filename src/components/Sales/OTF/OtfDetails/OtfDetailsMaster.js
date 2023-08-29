/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { OTFFormButton } from '../OTFFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { otfDataActions } from 'store/actions/data/otf/otf';
import { showGlobalNotification } from 'store/actions/notification';
import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';
import { BASE_URL_OTF_DETAILS as customURL } from 'constants/routingApi';
import { formatDate } from 'utils/formatDateTime';

import { OTFStatusBar } from '../utils/OTFStatusBar';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfSearchList: { isDetailLoaded: isDataLoaded, detailData: otfData = [] },
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, data: salesConsultantLov = [] },
            },
        },
    } = state;

    const moduleTitle = 'OTF Details';

    let returnValue = {
        userId,
        isDataLoaded,
        otfData,
        isLoading: !isDataLoaded,
        moduleTitle,
        isSalesConsultantDataLoaded,
        salesConsultantLov,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFDetail: otfDataActions.fetchDetail,
            saveData: otfDataActions.saveData,
            resetData: otfDataActions.reset,
            listShowLoading: otfDataActions.listShowLoading,

            fetchSalesConsultant: salesConsultantActions.fetchList,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const OtfDetailsMasterBase = (props) => {
    const { typeData, listConsultantShowLoading } = props;
    const { userId, showGlobalNotification, section, fetchOTFDetail, listShowLoading, isDataLoaded, otfData, saveData, isLoading } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange, fetchSalesConsultant, salesConsultantLov, isSalesConsultantDataLoaded, NEXT_ACTION, handleButtonClick } = props;
    const [exchangeValue, setexchangeValue] = useState(false);
    const [loyaltyValue, setloyaltyValue] = useState(false);
    const disabledProps = {
        disabled: true,
    };

    useEffect(() => {
        if (otfData?.exchange) {
            setexchangeValue(false);
            setloyaltyValue(true);
        } else if (otfData?.loyaltyScheme) {
            setexchangeValue(true);
            setloyaltyValue(false);
        } else {
            setexchangeValue(false);
            setloyaltyValue(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfData]);

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
            fetchOTFDetail({ customURL, setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        if (!isSalesConsultantDataLoaded && userId) {
            fetchSalesConsultant({ setIsLoading: listConsultantShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSalesConsultantDataLoaded, userId]);

    const onFinish = (values) => {
        const recordId = otfData?.id || '';
        const otfNum = otfData?.otfNumber || '';
        const exchange = values?.exchange === true ? 1 : 0;
        const data = { ...values, id: recordId, otfNumber: otfNum, loyaltyScheme: values?.loyaltyScheme === true ? 1 : 0, exchange: exchange, initialPromiseDeliveryDate: formatDate(values?.initialPromiseDeliveryDate), custExpectedDeliveryDate: formatDate(values?.custExpectedDeliveryDate) };
        delete data?.mitraName;
        delete data?.mitraType;
        delete data?.modeOfPAyment;

        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchOTFDetail({ customURL, fetchOTFDetail, setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            // showGlobalNotification({ message });
        };

        const requestData = {
            customURL,
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
        fetchList: fetchOTFDetail,
        typeData,

        userId,
        isDataLoaded,
        formData: otfData,
        isLoading,
        salesConsultantLov,
        exchangeValue,
        setexchangeValue,
        loyaltyValue,
        setloyaltyValue,
        disabledProps,
    };

    const viewProps = {
        typeData,
        formData: otfData,
        styles,
        isLoading,
        salesConsultantLov,
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
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const OtfDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(OtfDetailsMasterBase);
