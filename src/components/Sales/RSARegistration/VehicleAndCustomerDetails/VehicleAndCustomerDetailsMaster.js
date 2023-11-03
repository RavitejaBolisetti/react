/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { PartySegment } from 'components/Sales/Receipts/utils/partySegment';
import { RSAFormButton } from '../RSAFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { vehicleReceiptDataActions } from 'store/actions/data/vehicleReceipt/vehicleReceipt';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_PARTY_MASTER } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleReceipt: {
                VehicleReceiptSearch: { isLoaded: isDataLoaded = false, isLoading, data, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Party Details';

    let returnValue = {
        userId,
        data,
        isDataLoaded,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerDetail: vehicleReceiptDataActions.fetchList,
            fetchPartyDetail: vehicleReceiptDataActions.fetchList,
            resetData: vehicleReceiptDataActions.reset,
            listShowLoading: vehicleReceiptDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleAndCustomerDetailsMasterBase = (props) => {
    const { setLastSection, typeData, detailShieldData, data } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, fetchCustomerDetail, fetchPartyDetail, resetData, listShowLoading, isDataLoaded, isLoading } = props;
    const { form, onFinalSubmit, vehicleCustomerForm, vehicleDetailForm, customerDetailForm, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const { requestPayload, setRequestPayload, partySegment, setPartySegment, errorSection } = props;

    // useEffect(() => {
    //     return () => {
    //         resetData();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [!requestPayload?.partyDetails]);

    // useEffect(() => {
    //     if (receiptDetailData.partyDetails) {
    //         setRequestPayload({ ...requestPayload, partyDetails: receiptDetailData.partyDetails });
    //     }
    //     setReceipt(receiptDetailData?.receiptsDetails?.receiptType);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, receiptDetailData.partyDetails]);

    useEffect(() => {
        if (formActionType?.addMode) {
            setLastSection(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, formActionType]);

    // useEffect(() => {
    //     if (detailShieldData?.vehicleAndCustomerDetails) {
    //         setRequestPayload({ ...requestPayload, vehicleAndCustomerDetails: { shieldVehicleDetails: detailShieldData?.vehicleAndCustomerDetails?.shieldVehicleDetails, shieldCustomerDetails: detailShieldData?.vehicleAndCustomerDetails?.shieldCustomerDetails } });
    //         setButtonData({ ...buttonData, formBtnActive: true });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, detailShieldData?.vehicleAndCustomerDetails]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        vehicleCustomerForm,
        vehicleDetailForm,
        customerDetailForm,
        // onFinish,
        // onFinishFailed,
        formActionType,

        userId,
        isDataLoaded,
        formData: '', // detailShieldData.vehicleAndCustomerDetails,
        isLoading,
        partySegment,
        setPartySegment,
    };

    const viewProps = {
        typeData,
        formData: '', //detailShieldData.vehicleAndCustomerDetails,
        styles,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={vehicleCustomerForm} onValuesChange={handleFormValueChange} onFinish={onFinalSubmit} onFinishFailed={onFinishFailed}>
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
                    <RSAFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const VehicleAndCustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleAndCustomerDetailsMasterBase);
