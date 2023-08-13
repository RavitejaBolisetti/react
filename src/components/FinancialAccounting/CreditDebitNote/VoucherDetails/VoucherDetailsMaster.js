/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';

import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';

import styles from 'components/common/Common.module.css';
import { CreditDebitNoteFormButton } from '../CreditDebitFormButton';

import { vehicleCustomerDetailsDataAction } from 'store/actions/data/vehicle/customerDetails';
import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Voucher and Party Details';

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
    const { formActionType, NEXT_ACTION, handleButtonClick, onFinishFailed } = props;
    const { showGlobalNotification, requestPayload, setRequestPayload, handleFormValueChange, creditDebitData, fetchFinancialAccountList, listFinanceShowLoading, voucherTableData, setVoucherTableData } = props;

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
        tableData: creditDebitData?.voucherAccountHeadDetailsDto,
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
        tableData: creditDebitData?.voucherAccountHeadDetailsDto,
        styles,
        activeKey,
        setActiveKey,
        formActionType,
    };

    const onFinish = () => {
        if (voucherTableData.length === 0 && formActionType?.addMode) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please add atleast one voucher record' });
        } else {
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setRequestPayload({ ...requestPayload, voucherAccountHeadDetailsDto: voucherTableData });
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
