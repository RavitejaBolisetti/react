/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { OTFFormButton } from '../OTFFormButton';

import { otfDataActions } from 'store/actions/data/otf/otf';
import { showGlobalNotification } from 'store/actions/notification';
import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';
import { BASE_URL_OTF_DETAILS as customURL } from 'constants/routingApi';
import { formatDate } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTF_STATUS } from 'constants/OTFStatus';
import { withSpinner } from 'components/withSpinner';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state, props) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfSearchList: { isDetailLoaded: isDataLoaded, isLoading, isLoadingOnSave, detailData: otfData = [] },
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, data: salesConsultantLov = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = translateContent('bookingManagement.label.bookingDetails');

    let returnValue = {
        userId,
        isDataLoaded,
        otfData,
        isLoading,
        showSpinner: !props?.formActionType?.viewMode,
        isLoadingOnSave,
        moduleTitle,
        isSalesConsultantDataLoaded,
        salesConsultantLov,
        typeData,
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
            saveFormShowLoading: otfDataActions.saveFormShowLoading,
            fetchSalesConsultant: salesConsultantActions.fetchList,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const OtfDetailsMasterBase = (props) => {
    const { typeData, listConsultantShowLoading } = props;
    const { userId, showGlobalNotification, section, fetchOTFDetail, listShowLoading, saveFormShowLoading, isDataLoaded, otfData, saveData, isLoading } = props;
    const { form, selectedRecordId, formActionType, handleFormValueChange, fetchSalesConsultant, salesConsultantLov, isSalesConsultantDataLoaded, NEXT_ACTION, handleButtonClick } = props;
    const { setWorkFlowDetails } = props;
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
        if (otfData?.otfStatus === OTF_STATUS.PENDING_FOR_CANCELLATION.key) {
            setWorkFlowDetails(otfData?.workFlowDetails);
        } else {
            setWorkFlowDetails({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfData]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const extraParams = [
        {
            key: 'otfId',
            value: selectedRecordId,
        },
    ];

    useEffect(() => {
        if (userId && selectedRecordId) {
            const extraParams = [
                {
                    key: 'otfId',
                    value: selectedRecordId,
                },
            ];
            fetchOTFDetail({ customURL, setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (!isSalesConsultantDataLoaded && userId) {
            const extraParams = [
                {
                    key: 'designation',
                    value: 'SC',
                },
            ];

            fetchSalesConsultant({ setIsLoading: listConsultantShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSalesConsultantDataLoaded, userId]);

    const onFinish = (values) => {
        const recordId = otfData?.id || '';
        const otfNum = otfData?.otfNumber || '';
        const exchange = values?.exchange === true ? 1 : 0;
        const data = { ...values, id: recordId, otfNumber: otfNum, loyaltyScheme: values?.loyaltyScheme === true ? 1 : 0, referral: values?.referral ? 'Y' : 'N', exchange: exchange, initialPromiseDeliveryDate: formatDate(values?.initialPromiseDeliveryDate), custExpectedDeliveryDate: formatDate(values?.custExpectedDeliveryDate) };
        delete data?.mitraName;
        delete data?.mitraType;
        delete data?.modeOfPAyment;

        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION, onSave: true });
            fetchOTFDetail({ customURL, fetchOTFDetail, setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            customURL,
            data: data,
            method: 'put',
            setIsLoading: saveFormShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const handleDeliveryChange = (__, value) => {
        if (value?.type === 'D') {
            showGlobalNotification({ message: translateContent('bookingManagement.validation.valueDeprecated') });
        }
    };

    const formProps = {
        ...props,
        form,
        onFinish,
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
        handleDeliveryChange,
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
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFieldsChange} onFinish={onFinish}>
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

export const OtfDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(OtfDetailsMasterBase));
