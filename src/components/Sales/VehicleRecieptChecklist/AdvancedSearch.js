/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Form, Row, Select, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat, formatDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { ModalButtons } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';
import { validateRequiredSelectField } from 'utils/validation';

import styles from 'components/common/Common.module.css';

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, vehicleModelData, isModelDataLoading } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        rules,
        setrules,
    } = props;

    console.log('rules', rules);

    const onFinish = (values) => {
        if (values?.fromDate && values?.toDate && !values?.model) {
            setFilterString({
                ...filterString,
                fromDate: formatDate(values?.fromDate),
                toDate: formatDate(values?.toDate),
                advanceFilter: true,
            });
        } else if (values?.fromDate && values?.toDate && values?.model) {
            setFilterString({
                ...filterString,
                fromDate: formatDate(values?.fromDate),
                toDate: formatDate(values?.toDate),
                model: values?.model,
                advanceFilter: true,
            });
        } else {
            setFilterString({
                ...filterString,
                model: values?.model,
                advanceFilter: true,
            });
        }

        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        resetFields();
        setrules({ fromdate: false, todate: false });
    };

    const onFinishFailed = () => {
        return;
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Reset',
        submitName: 'Apply',
        handleResetFilter,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Receipt From Date" name="fromDate" className={styles?.datePicker} rules={[{ required: rules?.fromdate, message: 'Please select from date' }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect('From Date')}
                            format={dateFormat}
                            className={styles.fullWidth}
                            onChange={(event) => {
                                advanceFilterForm.setFieldsValue({ toDate: undefined });
                                if (event && Object?.keys(event)?.length) setrules({ fromdate: true, todate: true });
                                else if (!event) setrules({ fromdate: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Receipt To Date" name="toDate" className={styles?.datePicker} rules={[{ required: rules?.todate, message: 'Please select to date' }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect('To Date')}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current < advanceFilterForm?.getFieldValue('fromDate')}
                            onChange={(event) => {
                                if (event && Object?.keys(event)?.length) setrules({ fromdate: true, todate: true });
                                if (!event && !advanceFilterForm?.getFieldValue('fromDate')) setrules({ fromdate: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Model" name="model">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect('model')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
