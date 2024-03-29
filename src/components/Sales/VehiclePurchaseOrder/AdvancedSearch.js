/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Button, DatePicker, Input } from 'antd';

import { withModal } from 'components/withModal';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { customSelectBox } from 'utils/customSelectBox';
import { PURCHASE_ORDER_TYPE_STATUS } from 'constants/PurchaseOrderTypeStatus';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, typeData } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        handleCancelFilter,
    } = props;

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            current: 1,
            orderType: values?.orderType,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            purchaseOrderStatusCode: values?.status,
            purchaseOrderNumber: values?.purchaseOrderNumber?.trim(),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.orderType || PURCHASE_ORDER_TYPE_STATUS.AGAINSTSTOCK.key} label={translateContent('vehiclePurchaseOrder.label.orderType')} name="orderType" rules={[validateRequiredSelectField(translateContent('vehiclePurchaseOrder.validation.orderType'))]}>
                        <Select placeholder={preparePlaceholderSelect('')} fieldNames={{ label: 'value', value: 'key' }} options={typeData['PO_TYPE']} className={styles.headerSelectField} {...disabledProps}></Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.status} name="status" label={translateContent('vehiclePurchaseOrder.label.status')}>
                        {customSelectBox({ data: typeData['PO_STATS'] })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('vehiclePurchaseOrder.label.fromDate')} name="fromDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.toDate)} label={translateContent('vehiclePurchaseOrder.label.toDate')} name="toDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item name="purchaseOrderNumber" label={translateContent('vehiclePurchaseOrder.label.purchaseOrderNumber')} initialValue={filterString?.purchaseOrderNumber}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('vehiclePurchaseOrder.placeholder.purchaseOrderNumber'))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.alignRight}>
                    <Button onClick={handleCancelFilter} danger>
                        {translateContent('global.buttons.reset')}
                    </Button>
                    <Button htmlType="submit" type="primary" data-testid="searchButton" className={styles.marL10}>
                        {translateContent('global.buttons.search')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
