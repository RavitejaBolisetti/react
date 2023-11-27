/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Row, Col, Form } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';

import { CreditDebitNoteFormButton } from '../CreditDebitFormButton';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('creditDebitNote.voucherDetails.heading.moduleTitle');

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchFinancialAccountList: financialAccountHeadDataActions.fetchList,
            listFinanceShowLoading: financialAccountHeadDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VoucherDetailsMasterMain = (props) => {
    const { formActionType, NEXT_ACTION, handleButtonClick } = props;
    const { showGlobalNotification, setRequestPayload, handleFormValueChange, requestPayload, fetchFinancialAccountList, listFinanceShowLoading, voucherTableData, setVoucherTableData } = props;

    const [form] = Form.useForm();
    const [activeKey, setActiveKey] = useState([]);
    const [openAccordian, setOpenAccordian] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(false);

    const handleCollapse = (key) => {
        if (key === 'voucher' && isReadOnly) return;
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const formProps = {
        ...props,
        styles,
        tableData: requestPayload?.voucherAccountHeadDetailsDto,
        fetchFinancialAccountList,
        listFinanceShowLoading,
        activeKey,
        setActiveKey,
        openAccordian,
        setOpenAccordian,
        handleCollapse,
        isReadOnly,
        setIsReadOnly,
        voucherTableData,
        setVoucherTableData,
    };

    const viewProps = {
        tableData: requestPayload?.voucherAccountHeadDetailsDto,
        styles,
        activeKey,
        setActiveKey,
        formActionType,
    };

    const onFinish = () => {
        if (voucherTableData.length === 0 && formActionType?.addMode) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: translateContent('creditDebitNote.voucherDetails.validation.atLeastOneVoucher') });
        } else {
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setRequestPayload({ ...requestPayload, voucherAccountHeadDetailsDto: voucherTableData });
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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

export const VoucherDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VoucherDetailsMasterMain);
