/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleInvoiceFormButton } from '../VehicleInvoiceFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { partyDetailDataActions } from 'store/actions/data/receipt/partyDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { CustomerDetailsMaster } from 'components/Sales/Common/CustomerDetails';

import { BASE_URL_PARTY_MASTER } from 'constants/routingApi';
import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Receipt: {
                PartyDetails: { isLoaded: isDataLoaded = false, isLoading, data: partyDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Party Details';

    let returnValue = {
        userId,
        partyDetailData,
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
            fetchCustomerDetail: partyDetailDataActions.fetchList,
            fetchPartyDetail: partyDetailDataActions.fetchList,
            resetData: partyDetailDataActions.reset,
            listShowLoading: partyDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InvoiceDetailsMasterBase = (props) => {
    const { setReceipt, typeData, partySegmentType, receiptDetailData, partyDetailData } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, fetchCustomerDetail, fetchPartyDetail, resetData, listShowLoading, isDataLoaded, isLoading } = props;
    const { form, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const { requestPayload, setRequestPayload } = props;
    const [activeKey, setActiveKey] = useState([]);
    const [formData, setFormData] = useState('');

    // useEffect(() => {
    //     return () => {
    //         resetData();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //     if (receiptDetailData.partyDetails) {
    //         setRequestPayload({ ...requestPayload, partyDetails: receiptDetailData.partyDetails });
    //     }
    //     setReceipt(receiptDetailData?.receiptsDetails?.receiptType);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, receiptDetailData.partyDetails]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleChange = (e) => {
        setButtonData({ ...buttonData, formBtnActive: false });
    };


    const onFinish = (values) => {
        // const partyDetails = { ...values, id: '' };
        // setRequestPayload({ ...requestPayload, partyDetails: partyDetails });
        // handleButtonClick({ buttonAction: NEXT_ACTION });
        // setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,

        form,
        // onFinish,
        // onFinishFailed,
        partySegmentType,
        handleChange,
        formActionType,

        userId,
        isDataLoaded,
        formData,
        isLoading,
        setActiveKey,
        activeKey,
    };

    const viewProps = {
        typeData,
        formData,
        styles,
        partySegmentType,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>
                                Invoice Details
                                {/* {section?.title} */}
                            </h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <><AddEditForm {...formProps} /> <CustomerDetailsMaster {...formProps}/> </>}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleInvoiceFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const InvoiceDetailsMaster = connect(null, null)(InvoiceDetailsMasterBase);
