/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';

import styles from 'components/common/Common.module.css';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, receiptType, partySegmentType } = props;
    console.log('🚀 ~ file: AdvancedSearch.js:20 ~ AdvancedSearchFrom ~ receiptType:', receiptType);
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        handleResetFilter,
    } = props;

    useEffect(() => {
        resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            receiptType: values?.receiptType,
            partySegment: values?.partySegment,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const onFinishFailed = () => {
        return;
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.fromDate)} label="Receipt From Date" name="fromDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.toDate)} label="Receipt To Date" name="toDate" className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.receiptType} label="Receipt Type" name="receiptType">
                        <Select placeholder={preparePlaceholderSelect('Receipt Type')} fieldNames={{ label: 'value', value: 'key' }} options={receiptType} {...selectProps} className={styles.headerSelectField}></Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.partySegment} label="Party Segment" name="partySegment">
                        <Select placeholder={preparePlaceholderSelect('Party Segment')} fieldNames={{ label: 'value', value: 'key' }} options={partySegmentType} {...selectProps} className={styles.headerSelectField}></Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
                        Reset
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Apply
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
