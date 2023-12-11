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
import { ClaimEmpowermentFormButton} from '../ClaimEmpowermentDetails/ClaimEmpowermentFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { partyDetailDataActions } from 'store/actions/data/receipt/partyDetails';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_PARTY_MASTER } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Receipt: {
                PartyDetails: { isLoaded: isDataLoaded = false, isLoading, data: partyDetailData = [] },
            },
        },
    } = state;

    // const moduleTitle = translateContent('claimEmpowerment.heading.sections.section1');
    let returnValue = {
        userId,
        partyDetailData,
        isDataLoaded,
        isLoading,
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

const EmpowerDetailMasterBase = (props) => {
    const { setReceipt, typeData, partySegmentType, receiptDetailData, partyDetailData } = props;
    const { userId, buttonData, setButtonData, showGlobalNotification, section, fetchCustomerDetail, fetchPartyDetail, listShowLoading, isDataLoaded, isLoading } = props;
    const { form, partyDetailForm, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const { requestPayload, setRequestPayload, partySegment, setPartySegment, partyId, setPartyId } = props;

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
        setPartyId(e.target.value);
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handleSearch = () => {
        if (partySegment && partyId) {
            const onSuccessAction = (res) => {
                setButtonData({ ...buttonData, formBtnActive: true });
            };
            if (partySegment === PartySegment.CUSTOMER.key) {
                const extraParams = [
                    {
                        key: 'customerId',
                        title: 'customerId',
                        value: partyId,
                        name: 'customerId',
                    },
                ];
                fetchCustomerDetail({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            } else {
                const extraParams = [
                    {
                        key: 'partyCode',
                        value: partyId,
                    },
                    {
                        key: 'partyType',
                        value: partyDetailForm.getFieldsValue()?.partySegment,
                    },
                ];
                fetchPartyDetail({ setIsLoading: listShowLoading, userId, extraParams, customURL: BASE_URL_PARTY_MASTER, onSuccessAction, onErrorAction });
            }
        }
    };

    const onFinish = (values) => {
        const partyDetails = { ...values, id: '' };
        setRequestPayload({ ...requestPayload, partyDetails: partyDetails });
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
        formData: 
        formActionType?.addMode ? [] : receiptDetailData?.partyDetails,
        isLoading,
        partySegment,
        setPartySegment,
    };

    const viewProps = {
        typeData,
        formData: receiptDetailData?.partyDetails,
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
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ClaimEmpowermentFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const EmpowerDetailMaster = connect(mapStateToProps, mapDispatchToProps)(EmpowerDetailMasterBase);
