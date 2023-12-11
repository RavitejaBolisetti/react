/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';

import { partyDetailDataActions } from 'store/actions/data/receipt/partyDetails';
import { partyMasterDataActions } from 'store/actions/data/partyMaster';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_PARTY_MASTER } from 'constants/routingApi';

import { ViewDetail } from './ViewDetail';

import { ClaimEmpowermentFormButton } from './ClaimEmpowermentFormButton';
import styles from 'assets/sass/app.module.scss';

import PaymentAddEdit from './PaymentAddEdit';
//import ReceiptInfoAddEdit from './ReceiptInfoAddEdit';
import ClaimEmpowermentInfoAddEdit from './ClaimEmpowermentInfoAddEdit';
import { ReceiptType } from 'components/Sales/Receipts/utils/ReceiptType';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            PartyMaster: { isLoaded: isDataLoaded = false, isLoading, data: partyDetailData = [] },
        },
    } = state;

    const moduleTitle = translateContent('claimEmpowerment.heading.sections.section1');

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
            fetchPartyDetail: partyMasterDataActions.fetchList,
            resetData: partyMasterDataActions.reset,
            listShowLoading: partyMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ClaimEmpowermentDetailMasterBase = (props) => {
    const { userId, receipt, setReceipt, section, typeData, receiptType, paymentModeType, buttonData, setButtonData, fetchList, handleCancelFormEdit, isDataLoaded, isLoading, listShowLoading, resetData, showGlobalNotification, fetchPartyDetail, partyDetailData, receiptOnFinish } = props;
    const { form, formActionType, salesConsultantLov, NEXT_ACTION, handleButtonClick, setApportionList } = props;
    const { requestPayload, setRequestPayload, receiptDetailData, setLastSection, totalReceivedAmount, setTotalReceivedAmount } = props;
    const [paymentForm] = Form.useForm();
    const [receiptForm] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('');
    const [isListEditing, setIsListEditing] = useState(false);
    const [editingListData, setEditingListData] = useState({});
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [paymentMode, setPaymentMode] = useState('');
    const [paymentDataList, setPaymentDataList] = useState([]);
    const [partyId, setPartyId] = useState();

    // useEffect(() => {
    //     if (partyDetailData?.length > 0) {
    //         paymentForm.setFieldsValue({
    //             paymentBankName: partyDetailData?.[0]?.partyName,
    //             paymentBankLocation: partyDetailData?.[0]?.partyLocationCode,
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [partyDetailData]);

    // useEffect(() => {
    //     if (requestPayload?.receiptsDetails?.paymentDetails) {
    //         setPaymentDataList(requestPayload?.receiptsDetails?.paymentDetails);
    //         setButtonData({ ...buttonData, formBtnActive: true });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [requestPayload?.receiptsDetails]);

    // useEffect(() => {
    //     if (receiptDetailData?.receiptsDetails) {
    //         setPaymentDataList(receiptDetailData?.receiptsDetails?.paymentDetails);
    //         setRequestPayload({ ...requestPayload, receiptsDetails: receiptDetailData.receiptsDetails });
    //         setReceipt(receiptDetailData?.receiptsDetails?.receiptType);
    //         setTotalReceivedAmount(receiptDetailData?.receiptsDetails?.totalReceivedAmount);
    //         receiptDetailData?.receiptsDetails?.receiptType === ReceiptType?.ADVANCE?.key && !formActionType?.editMode && setButtonData({ ...buttonData, nextBtn: false, saveBtn: false });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, receiptDetailData?.receiptsDetails]);
    // useEffect(() => {
    //     if (formActionType?.editMode && receiptDetailData?.receiptsDetails?.receiptType === ReceiptType?.ADVANCE?.key) {
    //         setButtonData({ ...buttonData, cancelReceiptBtn: true, editBtn: false, nextBtn: false });
    //     } else if (formActionType?.editMode) {
    //         setButtonData({ ...buttonData, cancelReceiptBtn: true, editBtn: false, nextBtn: true });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formActionType, receiptDetailData?.receiptsDetails]);

    const handleChange = (e) => {
        resetData();
        paymentForm.setFieldsValue({
            paymentBankName: '',
            paymentBankLocation: '',
        });
        setPartyId(e.target.value);
    };

    const handlePaymentSearch = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        const extraParams = [
            {
                key: 'partyCode',
                title: 'partyCode',
                value: partyId,
                name: 'partyCode',
            },
        ];
        fetchPartyDetail({ setIsLoading: listShowLoading, userId, extraParams, customURL: BASE_URL_PARTY_MASTER, onSuccessAction, onErrorAction });
    };

    const handleSavepaymenttForm = () => {
        if (paymentForm.getFieldValue('paymentBankPartyId') && partyDetailData?.length === 0) {
            paymentForm.validateFields();
            return;
        }
        paymentForm
            .validateFields()
            .then((value) => {
                if (isListEditing) {
                    setPaymentDataList((prev) => {
                        let formData = [...prev];
                        const index = formData?.findIndex((el) => el?.purposeOfContact === editingListData?.purposeOfContact && el?.mobileNumber === editingListData?.mobileNumber && el?.FirstName === editingListData?.FirstName);
                        formData.splice(index, 1, { ...value });
                        return [...formData];
                    });
                } else {
                    setPaymentDataList((prev) => {
                        const updVal = prev?.length ? [{ ...value, id: '' }, ...prev] : [{ ...value, id: '' }];
                        return updVal;
                    });
                }
                setIsAdding(false);
                setShowAddEditForm(false);
                setIsListEditing(false);
                setEditingListData({});
                paymentForm.resetFields();
                setButtonData({ ...buttonData, formBtnActive: true });
                setTotalReceivedAmount(parseFloat(totalReceivedAmount) + parseFloat(value.receivedAmount));
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    const onFinish = () => {
        if (!receiptForm.getFieldValue('receiptDate') || !receiptForm.getFieldValue('receiptType')) {
            setOpenAccordian([1]);

            setTimeout(() => {
                receiptForm.validateFields();
            }, 1000);

            return;
        }
        receiptForm
            .validateFields()
            .then((data) => {
                let finaldata = { ...data, paymentDetails: paymentDataList };

                if (receipt === ReceiptType?.ADVANCE?.key) {
                    setApportionList([]);
                    requestPayload && receiptOnFinish(finaldata);
                    setRequestPayload({ ...requestPayload, receiptsDetails: finaldata });
                } else {
                    setRequestPayload({ ...requestPayload, receiptsDetails: finaldata });
                    handleButtonClick({ buttonAction: NEXT_ACTION });
                }
                setButtonData({ ...buttonData, formBtnActive: false });
            })
            .catch((err) => console.error(err));
    };

    const handleCollapse = (key) => {
        openAccordian?.includes(key) ? setOpenAccordian([]) : setOpenAccordian([key]);
    };

    const formProps = {
        ...props,
        showAddEditForm,
        setShowAddEditForm,
        form,
        onFinish,
        fetchList,
        typeData,
        receiptType,
        userId,
        isDataLoaded,
        isLoading,
        handleChange,
        handlePaymentSearch,

        paymentDataList: formActionType?.addMode ? paymentDataList : receiptDetailData?.receiptsDetails?.paymentDetails,

        setOpenAccordian,
        receiptForm,
        setPaymentDataList,
        receiptData: receiptDetailData?.receiptsDetails ? receiptDetailData?.receiptsDetails : requestPayload?.receiptsDetails,

        paymentModeType,
        setIsAdding,
        isAdding,
        editingListData,
        setEditingListData,
        handleCancelFormEdit,
        setPaymentMode,
        paymentMode,
        receipt,
        setReceipt,
        openAccordian,
        handleCollapse,
        setIsListEditing,
        isListEditing,
        totalReceivedAmount,

        formActionType,
        handleSavepaymenttForm,
        paymentForm,
        buttonData,
        partyDetailData,
        setLastSection,
    };

    const viewProps = {
        ...props,
        typeData,
        showAddEditForm,
        setShowAddEditForm,
        receiptData: receiptDetailData?.receiptsDetails,
        receiptType,
        paymentDataList: formActionType?.addMode ? paymentDataList : receiptDetailData?.receiptsDetails?.paymentDetails,
        styles,
        isLoading,
        salesConsultantLov,
        setOpenAccordian,
        receiptForm,
        handleCollapse,
        setPaymentDataList,
        setIsAdding,
        handleSavepaymenttForm,
        formActionType,
        buttonData,
        totalReceivedAmount,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={receiptForm} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>

                    {!formActionType?.viewMode ? <ClaimEmpowermentInfoAddEdit {...formProps} /> : <ViewDetail {...viewProps} />}

                    <PaymentAddEdit {...formProps} />
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

export const ClaimEmpowermentDetailMaster = connect(mapStateToProps, mapDispatchToProps)(ClaimEmpowermentDetailMasterBase);
