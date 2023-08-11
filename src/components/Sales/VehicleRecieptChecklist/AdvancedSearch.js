/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
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
    } = props;

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            model: values?.model,
            advanceFilter: true,
        });

        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        resetFields();
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
                    <Form.Item label="Receipt From Date" name="fromDate" className={styles?.datePicker} rules={[validateRequiredSelectField('From Date')]}>
                        <DatePicker placeholder={preparePlaceholderSelect('From Date')} format={dateFormat} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Receipt To Date" name="toDate" className={styles?.datePicker} rules={[validateRequiredSelectField('To Date')]}>
                        <DatePicker placeholder={preparePlaceholderSelect('To Date')} format={dateFormat} className={styles.fullWidth} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Model" name="model">
                        {customSelectBox({ data: vehicleModelData || [], placeholder: preparePlaceholderSelect('model'), fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, loading: isModelDataLoading })}
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
