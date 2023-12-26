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

import styles from 'assets/sass/app.module.scss';

import { CreditDebitNoteFormButton } from '../CreditDebitFormButton';

import { invoiceDetailsDataAction } from 'store/actions/data/financialAccounting/invoiceDetails';
import { documentDescriptionDataActions } from 'store/actions/data/financialAccounting/documentDescription';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                DocumentDescription: { isLoaded: isDocumentTypesLoaded = false, isLoading: isDocumentTypeLoading = false, data: documentTypeData = [] },
                InvoiceDetails: { isLoading: isApportionDetailsLoading = false },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('creditDebitNote.ApportionDetails.heading.moduleTitle');

    let returnValue = {
        collapsed,
        userId,

        isDocumentTypesLoaded,
        documentTypeData,
        isDocumentTypeLoading,

        moduleTitle,
        isApportionDetailsLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchInvoiceList: invoiceDetailsDataAction.fetchList,
            listInvoiceShowLoading: invoiceDetailsDataAction.listShowLoading,

            fetchDocumentTypeList: documentDescriptionDataActions.fetchList,
            listDocumentTypeShowLoading: documentDescriptionDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ApportionDetailsMasterMain = (props) => {
    const { isCreditDrawerDataLoading, userId, formActionType, handleFormValueChange, creditDebitNoteOnFinish } = props;
    const { fetchInvoiceList, listInvoiceShowLoading, apportionTableData, setApportionTableData } = props;
    const { fetchDocumentTypeList, listDocumentTypeShowLoading, isDocumentTypesLoaded, documentTypeData, isDocumentTypeLoading, requestPayload, showGlobalNotification } = props;

    const [form] = Form.useForm();
    const [activeKey, setActiveKey] = useState([]);
    const [openAccordian, setOpenAccordian] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [documentTypeOptions, setDocumentTypeOptions] = useState();

    const handleCollapse = (key) => {
        if (key === 'voucher' && isReadOnly) return;
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const financeDocumentContant = 'Finance';
    const financeModuleContant = 'MODULE';
    const financeActiveContant = 1;

    useEffect(() => {
        if (documentTypeData && isDocumentTypesLoaded) {
            setDocumentTypeOptions(documentTypeData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documentTypeData]);

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

    const formProps = {
        ...props,
        styles,
        openAccordian,
        setOpenAccordian,
        handleCollapse,
        isReadOnly,
        setIsReadOnly,
        documentTypeOptions,
        setDocumentTypeOptions,
        showGlobalNotification,

        fetchInvoiceList,
        listInvoiceShowLoading,
        apportionTableData,
        setApportionTableData,
        documentTypeData,
        isDocumentTypeLoading,
    };

    const viewProps = {
        tableData: requestPayload?.apportionDetailsDto,
        styles,
        isLoading:isCreditDrawerDataLoading,
        activeKey,
        setActiveKey,
        formActionType,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFieldsChange={handleFormValueChange} onFinish={() => creditDebitNoteOnFinish()}>
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

export const ApportionDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(ApportionDetailsMasterMain);
