/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { PartySegment } from 'components/Sales/Receipts/utils/partySegment';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { partyDetailDataActions } from 'store/actions/data/receipt/partyDetails';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_PARTY_MASTER } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { ReceiptType } from '../utils/ReceiptType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Receipt: {
                PartyDetails: { isLoaded: isDataLoaded = false, isLoading, data: partyDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('receipts.heading.sections.section1');

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

const PartyDetailMasterBase = (props) => {
    const { setReceipt, typeData, partySegmentType, receiptDetailData } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, fetchCustomerDetail, fetchPartyDetail, listShowLoading, isDataLoaded, isLoading } = props;
    const { form, partyDetailForm, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const { requestPayload, setRequestPayload, partySegment, setPartySegment, partyId, setPartyId } = props;
    useEffect(() => {
        if (receiptDetailData?.partyDetails) {
            const partyDetails = receiptDetailData?.partyDetails;
            partyDetails && setRequestPayload({ ...requestPayload, partyDetails });
            const canAdvance = receiptDetailData?.receiptsDetails?.receiptType === ReceiptType?.ADVANCE?.key;
            canAdvance && setButtonData((prev) => ({ ...prev, cancelReceiptBtn: true, editBtn: false, nextBtn: true }));
            setReceipt(receiptDetailData?.receiptsDetails?.receiptType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, section, receiptDetailData?.partyDetails]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleChange = (e) => {
        setPartyId(e.target.value);
        setButtonData({ ...buttonData, formBtnActive: false });
        setRequestPayload({ ...requestPayload, partyDetails: {} });
        partyDetailForm.resetFields(['partyName', 'address', 'city', 'state', 'mobileNumber', 'mitraType']);
    };

    const handleSearch = (partyId, partySegment) => {
        if (partySegment && partyId) {
            const onSuccessAction = (res) => {
                if (res?.data) {
                    if (res?.data && !Array?.isArray(res?.data)) {
                        setRequestPayload({ ...requestPayload, partyDetails: { ...res?.data, partyId, partySegment ,partyName: res?.data?.partyName || res?.data?.customerName} });
                        partyDetailForm.setFieldsValue({ ...res?.data, partyName: res?.data?.partyName || res?.data?.customerName });
                    } else if (res?.data?.[0] && Array?.isArray(res?.data)) {
                        setRequestPayload({ ...requestPayload, partyDetails: { ...res?.data?.[0], partyId, partySegment, partyName: res?.data?.[0]?.partyName || res?.data?.[0]?.customerName } });
                        partyDetailForm.setFieldsValue({ ...res?.data?.[0], partyName: res?.data?.[0]?.partyName || res?.data?.[0]?.customerName });
                    }
                    setButtonData({ ...buttonData, formBtnActive: true });
                }
            };
            if (partySegment === PartySegment.CUSTOMER.key) {
                fetchCustomerDetail({
                    setIsLoading: listShowLoading,
                    userId,
                    extraParams: [
                        {
                            key: 'customerId',
                            title: 'customerId',
                            value: partyId,
                            name: 'customerId',
                        },
                    ],
                    onSuccessAction,
                    onErrorAction,
                });
            } else {
                fetchPartyDetail({
                    setIsLoading: listShowLoading,
                    userId,
                    extraParams: [
                        {
                            key: 'partyCode',
                            value: partyId,
                        },
                        {
                            key: 'partyType',
                            value: partyDetailForm.getFieldsValue()?.partySegment,
                        },
                    ],
                    customURL: BASE_URL_PARTY_MASTER,
                    onSuccessAction,
                    onErrorAction,
                });
            }
        }
    };
    const onFinish = (values) => {
        setRequestPayload({ ...requestPayload, partyDetails: { ...values, id: '' } });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const formProps = {
        ...props,
        form,
        partyDetailForm,
        partySegmentType,
        partyId,
        handleChange,
        handleSearch,
        formActionType,

        userId,
        isDataLoaded,
        formData: requestPayload?.partyDetails,
        isLoading,
        partySegment,
        setPartySegment,
    };

    const viewProps = {
        typeData,
        formData: receiptDetailData.partyDetails,
        styles,
        partySegmentType,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={partyDetailForm} onValuesChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.addMode ? <AddEditForm {...formProps} /> : <ViewDetail {...viewProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleReceiptFormButton {...props} buttonData={{ ...props.buttonData, editBtn: false }} />
                </Col>
            </Row>
        </Form>
    );
};

export const PartyDetailMaster = connect(mapStateToProps, mapDispatchToProps)(PartyDetailMasterBase);
