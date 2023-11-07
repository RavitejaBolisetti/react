/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { disableFutureDate } from 'utils/disableDate';
import { ModalButtons } from 'components/common/Button';
import { STOCK_TRANSFER } from 'constants/StockTransfer';

import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { validateRequiredSelectField, campareDate } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, searchList, indentLocationList } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        toggleButton,
        advanceFilterForm: { resetFields },
    } = props;

    const indentSaerchList = searchList?.filter((i) => {
        return i?.key.includes(toggleButton === STOCK_TRANSFER?.RAISED.key ? 'RAIS_TO' : 'REC_TO');
    });

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            current: 1,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            dealerLocation: values?.dealerLocation,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        advanceFilterForm.resetFields();
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: translateContent('stockTransferIndent.button.reset'),
        submitName: translateContent('stockTransferIndent.button.apply'),
        handleResetFilter,
    };

    const placeHold = {
        place: toggleButton === STOCK_TRANSFER?.RAISED.key ? 'Raised To' : 'Received From',
    };
    const labelData = {
        label: toggleButton === STOCK_TRANSFER?.RAISED.key ? 'Indent Raised To' : 'Indent Received From',
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.indent} label={translateContent('stockTransferIndent.label.indent')} name="indent">
                        {customSelectBox({ data: indentSaerchList, fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect(placeHold.place) })}
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.dealerLocation} {...labelData} name="dealerLocation">
                        {customSelectBox({ data: indentLocationList, fieldNames: { key: 'locationCode', value: 'dealerLocationName' }, placeholder: preparePlaceholderSelect(translateContent('stockTransferIndent.label.dealerLocation')) })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label={translateContent('stockTransferIndent.label.indentfromdate')} name="fromDate" rules={[validateRequiredSelectField(translateContent('stockTransferIndent.validation.indentFromDate'))]} className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} onChange={() => advanceFilterForm.setFieldsValue({ toDate: undefined })} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.toDate)} label={translateContent('stockTransferIndent.label.indentTodate')} name="toDate" rules={[validateRequiredSelectField(translateContent('stockTransferIndent.validation.indentToDate')), { validator: (_, value) => campareDate(value, advanceFilterForm.getFieldValue('fromDate')) }]} className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} disabledDate={disableFutureDate} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
