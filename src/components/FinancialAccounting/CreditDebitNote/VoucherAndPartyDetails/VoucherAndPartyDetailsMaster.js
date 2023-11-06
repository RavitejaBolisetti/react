/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';

import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CreditDebitNoteFormButton } from '../CreditDebitFormButton';
import { vehicleCustomerCommonDetailsDataAction } from 'store/actions/data/vehicle/customerCommonDetails';
import { partyMasterDataActions } from 'store/actions/data/partyMaster';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            PartyMaster: { isLoading, data, detailData },
            Vehicle: {
                CustomerCommonDetails: { isLoaded: isPartyDataLoaded = false, isPartyDataLoading, data: partyData = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('creditDebitNote.voucherAndPartyDetails.heading.moduleTitle');

    let returnValue = {
        collapsed,
        userId,

        isPartyDataLoaded,
        isPartyDataLoading,
        partyData,

        data,
        detailData,
        isLoading,

        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleCustomerCommonDetailsDataAction.fetchList,
            listShowLoading: vehicleCustomerCommonDetailsDataAction.listShowLoading,

            fetchDetail: partyMasterDataActions.fetchDetail,
            listPartyShowLoading: partyMasterDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VoucherAndPartyDetailsMasterMain = (props) => {
    const { formActionType, NEXT_ACTION, handleButtonClick } = props;
    const { handleFormValueChange, creditDebitData, isDetailLoaded } = props;
    const { showGlobalNotification, userId, setButtonData, buttonData, fetchList, listShowLoading, listPartyShowLoading, fetchDetail, requestPayload, setRequestPayload, typeData } = props;

    const [form] = Form.useForm();
    const [formData, setFormData] = useState('');
    const [activeKey, setActiveKey] = useState([]);

    const voucherDetailsInitial = {
        totalSettledAmount: 0,
        totalWriteOffAmount: 0,
        totalApportionedAmount: 0,
        totalAmount: 0,
        totalBalancedAmount: 0,
    };

    useEffect(() => {
        if (formActionType?.addMode && isDetailLoaded) {
            form.resetFields(['partyDetails']);
            setFormData();
        } else if (isDetailLoaded && creditDebitData) {
            setFormData(creditDebitData);
            handleFormValueChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType?.addMode, isDetailLoaded, creditDebitData, formActionType?.editMode]);

    useEffect(() => {
        if (formActionType?.addMode) {
            form.setFieldsValue({
                voucherDetails: voucherDetailsInitial,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType?.addMode]);

    const handlePartyIdChange = () => {
        form.setFieldsValue({
            partyDetails: {
                ...form.getFieldsValue()?.partyDetails,
                address: null,
                mobileNumber: null,
                state: null,
                city: null,
                partyName: null,
            },
        });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handlePartySegmentChange = () => {
        form.setFieldsValue({
            partyDetails: {
                ...form.getFieldsValue()?.partyDetails,
                address: null,
                mobileNumber: null,
                state: null,
                city: null,
                partyId: null,
                partyName: null,
            },
        });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const constomerContant = 'CUS';

    const handleSearchParamSearch = (value) => {
        if (!form.getFieldsValue()?.partyDetails?.partySegment) {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('creditDebitNote.voucherAndPartyDetails.validation.selectPartySegment') });
            return;
        }
        const onSuccessAction = (res) => {
            if (res?.data?.length === 0) {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('creditDebitNote.voucherAndPartyDetails.validation.detailNotForPartySegment') });
                setButtonData({ ...buttonData, formBtnActive: false });
            }
            form.setFieldsValue({ partyDetails: res?.data[0] });
            setButtonData({ ...buttonData, formBtnActive: true });
        };
        const onSuccessCustomerAction = (res) => {
            form.setFieldsValue({ partyDetails: { ...res?.data, partyName: res?.data?.customerName } });
            setButtonData({ ...buttonData, formBtnActive: true });
        };
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };

        const extraParams = [
            {
                key: 'customerId',
                value: value,
            },
        ];
        const extraParamsParty = [
            {
                key: 'partyCode',
                value: value,
            },
            {
                key: 'partyType',
                value: form.getFieldsValue()?.partyDetails?.partySegment,
            },
        ];

        form.getFieldsValue()?.partyDetails?.partySegment === constomerContant ? fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction: onSuccessCustomerAction }) : fetchDetail({ setIsLoading: listPartyShowLoading, extraParams: extraParamsParty, userId, onErrorAction, onSuccessAction });
    };

    const handleCollapse = (key) => {
        !activeKey?.includes(key) ? setActiveKey([key]) : setActiveKey([]);
    };

    const onFinish = (values) => {
        handleButtonClick({ buttonAction: NEXT_ACTION });
        if (values?.hasOwnProperty('voucherDetails') || values?.hasOwnProperty('partyDetails')) {
            setRequestPayload({ ...requestPayload, partyDetailsDto: values?.partyDetails, voucherDetailsDto: voucherDetailsInitial });
        } else {
            setRequestPayload({ ...requestPayload, partyDetailsDto: creditDebitData?.partyDetailsDto, voucherDetailsDto: creditDebitData?.voucherDetailsDto });
        }
    };

    const formProps = {
        ...props,
        form,
        fetchList,
        listShowLoading,
        listPartyShowLoading,
        fetchDetail,
        handleCollapse,
        formData,
        creditDebitData,
        handlePartySegmentChange,
        handleSearchParamSearch,
        handlePartyIdChange,
    };

    const viewProps = {
        typeData,
        formData,
        styles,
        activeKey,
        setActiveKey,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CreditDebitNoteFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const VoucherAndPartyDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VoucherAndPartyDetailsMasterMain);
