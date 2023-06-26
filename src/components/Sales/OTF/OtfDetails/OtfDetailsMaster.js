/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { OTFFormButton } from '../OTFFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { otfDetailsDataActions } from 'store/actions/data/otf/otfDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';

import { OTFStatusBar } from '../utils/OTFStatusBar';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                OtfDetails: { isLoaded: isDataLoaded = false, isLoading, data: otfData = [] },
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, data: salesConsultantLov = [] },
            },
        },
    } = state;

    const moduleTitle = 'OTF Details';

    let returnValue = {
        userId,
        typeData,
        isDataLoaded,

        otfData,
        isLoading,
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
            fetchList: otfDetailsDataActions.fetchList,
            saveData: otfDetailsDataActions.saveData,
            resetData: otfDetailsDataActions.reset,
            listShowLoading: otfDetailsDataActions.listShowLoading,

            fetchSalesConsultant: salesConsultantActions.fetchList,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const OtfDetailsMasterBase = (props) => {
    const { typeData, listConsultantShowLoading } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, otfData, saveData, isLoading } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange, fetchSalesConsultant, salesConsultantLov, isSalesConsultantDataLoaded, NEXT_ACTION, handleButtonClick } = props;

    const onErrorAction = (message) => {
        // showGlobalNotification({ message });
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
        const loyalityScheme = values?.loyaltyScheme === true ? 1 : 0;
        const data = { ...values, id: recordId, otfNumber: otfNum, loyaltyScheme: loyalityScheme, exchange: exchange, initialPromiseDeliveryDate: values?.initialPromiseDeliveryDate?.format('YYYY-MM-DD'), custExpectedDeliveryDate: values?.custExpectedDeliveryDate?.format('YYYY-MM-DD') };
        delete data?.mitraName;
        delete data?.mitraType;
        delete data?.modeOfPAyment;

        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            // showGlobalNotification({ message });
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

        userId,
        isDataLoaded,
        formData: otfData,
        isLoading,
        salesConsultantLov,
    };

    const viewProps = {
        typeData,
        formData: otfData,
        styles,
        isLoading,
        salesConsultantLov,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
