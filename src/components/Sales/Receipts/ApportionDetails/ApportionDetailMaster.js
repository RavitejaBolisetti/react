/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { formatDateToCalenderDate } from 'utils/formatDateTime';

import { documentDescriptionDataActions } from 'store/actions/data/financialAccounting/documentDescription';
import { invoiceDetailsDataAction } from 'store/actions/data/financialAccounting/invoiceDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { tableColumnApportion } from './tableColumnApportion';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                DocumentDescription: { isLoaded: isDocumentTypesLoaded = false, data: documentDescriptionList = [] },
            },
        },
    } = state;

    const moduleTitle = 'Apportion Details';

    let returnValue = {
        userId,
        isDocumentTypesLoaded,
        documentDescriptionList,

        // otfData,
        // isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDocumentTypeList: documentDescriptionDataActions.fetchList,
            listDocumentTypeShowLoading: documentDescriptionDataActions.listShowLoading,
            fetchInvoiceList: invoiceDetailsDataAction.fetchList,
            listInvoiceShowLoading: invoiceDetailsDataAction.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ApportionDetailMasterBase = (props) => {
    const { userId, documentDescriptionList, showGlobalNotification, section, isDocumentTypesLoaded, listDocumentTypeShowLoading, listInvoiceShowLoading, fetchDocumentTypeList, fetchInvoiceList, fetchList, isLoading } = props;
    const { form, formActionType, handleFormValueChange, handleButtonClick, receiptOnFinish } = props;
    const { apportionList, setApportionList, receiptDetailData, totalReceivedAmount, receiptStatus } = props;

    const [showApportionForm, setShowApportionForm] = useState();
    const [documentAmount, setDocumentAmount] = useState();
    const [receivedAmount, setReceivedAmount] = useState();

    const [apportionForm] = Form.useForm();

    const financeDocumentContant = 'Finance';
    const financeModuleContant = 'MODULE';
    const financeActiveContant = 1;
    useEffect(() => {
        const extraParams = [
            {
                key: 'code',
                value: financeDocumentContant,
            },
            {
                key: 'type',
                value: financeModuleContant,
            },
            {
                key: 'onlyActive',
                value: financeActiveContant,
            },
        ];
        fetchDocumentTypeList({ setIsLoading: listDocumentTypeShowLoading, userId, extraParams });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocumentTypesLoaded]);

    const handleFieldsChange = () => {};

    const handleDocumentNumberSearch = (values) => {
        const extraParams = [
            {
                key: 'invoiceId',
                title: 'Invoice ID',
                value: values,
            },
        ];

        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };

        const onSuccessAction = (res) => {
            const apportionValues = res?.data[0];
            setShowApportionForm(apportionValues);
            apportionForm.setFieldsValue({
                documentDate: formatDateToCalenderDate(apportionValues?.invoiceDate),
                documentAmount: apportionValues?.invoiceAmount,
                receivedAmount: apportionValues?.receivedAmount,
                balanceAmount: apportionValues?.invoiceAmount - apportionValues?.receivedAmount,
            });
            setDocumentAmount(apportionValues?.invoiceAmount);
            setReceivedAmount(apportionValues?.receivedAmount);
        };

        values && fetchInvoiceList({ setIsLoading: listInvoiceShowLoading, onErrorAction, onSuccessAction, userId, extraParams });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        apportionForm,
        formActionType,
        documentDescriptionList,
        showApportionForm,
        setShowApportionForm,
        documentAmount,
        setDocumentAmount,
        receivedAmount,
        setReceivedAmount,
        // onFinish,
        onFinishFailed,
        fetchList,
        userId,
        isLoading,
        handleDocumentNumberSearch,
        handleFormValueChange,
        apportionList,
        setApportionList,
        totalReceivedAmount,
    };

    const viewProps = {
        styles,
        isLoading,
        formActionType,
        receiptStatus,

        tableColumn: tableColumnApportion(handleButtonClick),
        tableData: receiptDetailData?.apportionDetails,
        showAddButton: false,
        pagination: false,
        scroll: { x: '600' },
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFieldsChange} onFinish={receiptOnFinish} onFinishFailed={onFinishFailed}>
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
                    <VehicleReceiptFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const ApportionDetailMaster = connect(mapStateToProps, mapDispatchToProps)(ApportionDetailMasterBase);
