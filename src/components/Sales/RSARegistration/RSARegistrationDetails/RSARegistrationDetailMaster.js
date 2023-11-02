/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { RSAFormButton } from '../RSAFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { shieldSchemeSearchDataAction } from 'store/actions/data/services/shieldSchemeSearch';
import { BASE_URL_SHIELD_REGISTRATION } from 'constants/routingApi';
import { showGlobalNotification } from 'store/actions/notification';

import { PARAM_MASTER } from 'constants/paramMaster';

import { BASE_URL_PARTY_MASTER } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                OtfSearchList: { isLoaded: isDataLoaded = false, isLoading: isSearchLoading, data, filter: filterSearch, detailData: searchDetail = [] },
                salesConsultantLov: { isLoaded: isSchemeDataLoaded = false, isLoading: isSchemeLoading, schemeDescriptionData, filter: filterScheme, detailData: schemeDetail = [] },
            },
        },
    } = state;

    const moduleTitle = 'Shield Registration';

    let returnValue = {
        userId,
        data,
        isDataLoaded,
        isSchemeDataLoaded,
        isSearchLoading,
        isSchemeLoading,
        moduleTitle,
        searchDetail,
        schemeDetail,
        schemeDescriptionData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            // fetchDetail: shieldSchemeSearchDataAction.fetchDetail,
            // resetData: shieldSchemeSearchDataAction.reset,
            // listShowLoading: shieldSchemeSearchDataAction.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const RSARegistrationDetailMasterBase = (props) => {
    const { typeData, data, detailShieldData } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, setShowDataLoading, section, fetchDetail, fetchSchemeDescription, resetData, listShowLoading, isDataLoaded, isLoading } = props;
    const { form, registrationForm, schemeForm, saleType, handleSaleTypeChange, handleOtfSearch, handleVinSearch, searchDetail, schemeDetail, shieldDetailForm, formActionType, NEXT_ACTION, handleButtonClick } = props;
    const { requestPayload, setRequestPayload, vinNumber, errorSection } = props;

    // useEffect(() => {
    //     return () => {
    //         resetData();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [!requestPayload?.partyDetails]);

    // useEffect(() => {
    //     if(errorSection) {
    //         return () => {
    //             handleSearch();
    //         };
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [errorSection]);

    useEffect(() => {
        // if (detailShieldData.vehicleAndCustomerDetails) {
        //     setButtonData({ ...buttonData, formBtnActive: true });
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onFinish = (values) => {
        setRequestPayload({ ...requestPayload, shieldRegistrationDetails: { registrationInformation: registrationForm.getFieldsValue(), shieldSchemeDetails: schemeForm.getFieldsValue() } });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        shieldDetailForm,
        registrationForm,
        schemeForm,
        // onFinish,
        // onFinishFailed,
        formActionType,
        typeData,
        saleTypes: typeData[PARAM_MASTER.DLVR_SALE_TYP.id],
        handleSaleTypeChange,
        handleFormValueChange,

        userId,
        isDataLoaded,
        // formData: formActionType?.addMode ? (partyDetailData[0] ? partyDetailData[0] : partyDetailData) : receiptDetailData.partyDetails,
        isLoading,
        saleType,
        handleOtfSearch,
        handleVinSearch,
        schemeDetail,
        vinNumber,
    };

    const viewProps = {
        typeData,
        styles,
        isLoading,
        formData: '', //detailShieldData?.shieldRegistrationDetails,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={shieldDetailForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    {/* <VehicleReceiptFormButton {...props} /> */}
                    <RSAFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const RSARegistrationDetailMaster = connect(mapStateToProps, mapDispatchToProps)(RSARegistrationDetailMasterBase);
