/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';

import { partyDetailDataActions } from 'store/actions/data/receipt/partyDetails';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_PARTY_MASTER } from 'constants/routingApi';

import { ViewDetail } from './ViewDetail';

import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import styles from 'components/common/Common.module.css';
import PaymentAddEdit from './PaymentAddEdit';
import ReceiptInfoAddEdit from './ReceiptInfoAddEdit';

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

const ReceiptDetailMasterBase = (props) => {
    const { userId, receipt, setReceipt, section, typeData, receiptType, paymentModeType, buttonData, setButtonData, fetchList, handleCancelFormEdit, isDataLoaded, isLoading, listShowLoading, fetchPartyDetail, partyDetailData, receiptOnFinish } = props;
    const { form, formActionType, salesConsultantLov, NEXT_ACTION, handleButtonClick } = props;
    const { requestPayload, setRequestPayload, receiptDetailData, setLastSection } = props;
    const [paymentForm] = Form.useForm();
    const [receiptForm] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('');
    const [isListEditing, setIsListEditing] = useState(false);
    const [editingListData, setEditingListData] = useState({});
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [receiptData, setReceiptData] = useState([]);
    const [paymentMode, setPaymentMode] = useState('');
    const [paymentDataList, setPaymentDataList] = useState([]);
    const [partyId, setPartyId] = useState();

    useEffect(() => {
        if (partyDetailData?.length > 0) {
            paymentForm.setFieldsValue({
                partyName: partyDetailData?.[0]?.partyName,
                partyLocationCode: partyDetailData?.[0]?.partyLocationCode,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partyDetailData]);

    useEffect(() => {
        if (receiptDetailData.receiptsDetails) {
            setPaymentDataList(receiptDetailData.receiptsDetails.paymentDetails);
            setRequestPayload({ ...requestPayload, receiptsDetails: receiptDetailData.receiptsDetails });
            setReceipt(receiptDetailData.receiptsDetails?.receiptType);
            receiptDetailData?.receiptsDetails?.receiptType === 'A' && !formActionType?.editMode && setButtonData({ ...buttonData, nextBtn: false, saveBtn: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, receiptDetailData?.receiptsDetails]);
    useEffect(() => {
        if (formActionType?.editMode && receiptDetailData?.receiptsDetails?.receiptType === 'A') {
            setButtonData({ ...buttonData, cancelReceiptBtn: true, editBtn: false, nextBtn: false });
        } else if (formActionType?.editMode) {
            setButtonData({ ...buttonData, cancelReceiptBtn: true, editBtn: false, nextBtn: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, receiptDetailData?.receiptsDetails]);

    const handleSave = () => {
        //save receipt information
    };

    const handleChange = (e) => {
        setPartyId(e.target.value);
    };

    const handlePaymentSearch = () => {
        const extraParams = [
            {
                key: 'partyCode',
                title: 'partyCode',
                value: partyId,
                name: 'partyCode',
            },
        ];
        fetchPartyDetail({ setIsLoading: listShowLoading, userId, extraParams, customURL: BASE_URL_PARTY_MASTER });
    };

    const handleSavepaymenttForm = () => {
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
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    const onFinish = () => {
        receiptForm.validateFields().then((data) => {
            let finaldata = { ...data, paymentDetails: paymentDataList };
            // setRequestPayload((requestPayload) => ({
            //     ...requestPayload,
            //     receiptsDetails: finaldata,
            // }));

            if (receipt === 'A') {
                requestPayload && receiptOnFinish(finaldata);
            } else {
                setRequestPayload({ ...requestPayload, receiptsDetails: finaldata });
                handleButtonClick({ buttonAction: NEXT_ACTION });
            }
            setButtonData({ ...buttonData, formBtnActive: false });
        });
    };

    const handleFormValueChange = () => {
        // setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onFinishFailed = () => {};

    const handleCollapse = (key) => {
        openAccordian?.includes(key) ? setOpenAccordian([]) : setOpenAccordian([key]);
    };

    const formProps = {
        ...props,
        showAddEditForm,
        setShowAddEditForm,
        form,
        onFinish,
        onFinishFailed,
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
        setReceiptData,
        setPaymentDataList,
        receiptData: receiptDetailData?.receiptsDetails,

        paymentModeType,
        setIsAdding,
        isAdding,
        editingListData,
        setEditingListData,
        handleSave,
        handleCancelFormEdit,
        setPaymentMode,
        paymentMode,
        receipt,
        setReceipt,
        openAccordian,
        handleCollapse,
        handleFormValueChange,
        setIsListEditing,
        isListEditing,

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
        setReceiptData,
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
        handleFormValueChange,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={receiptForm} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>

                    {!formActionType?.viewMode ? <ReceiptInfoAddEdit {...formProps} /> : <ViewDetail {...viewProps} />}

                    <PaymentAddEdit {...formProps} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleReceiptFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const ReceiptDetailMaster = connect(mapStateToProps, mapDispatchToProps)(ReceiptDetailMasterBase);
