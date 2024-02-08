/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Select, DatePicker, Switch } from 'antd';

import { withModal } from 'components/withModal';
import { prepareDatePickerText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat, formatDate } from 'utils/formatDateTime';
import { ModalButtons } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';

const statusList = [
    {
        key: 'All',
        value: 'All',
    },
    {
        key: 'Active',
        value: 'Active',
    },
    {
        key: 'Inactive',
        value: 'Inactive',
    },
];

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, vehicleModelData, isModelDataLoading } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        rules,
        setrules,
        statusFilter,
    } = props;

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            fromDate: formatDate(values?.fromDate),
            toDate: formatDate(values?.toDate),
            advanceFilter: true,
        });

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
        resetName: translateContent('global.buttons.reset'),
        submitName: translateContent('global.buttons.apply'),
        handleResetFilter,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Zone" name="zone">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect('zone')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Area Office" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Area Office')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Claim Type" name="claimType">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Claim Type')} fieldNames={{ label: 'value', value: 'key' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Dealer Name" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Dealer Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Scheme Valid From Date'} name="schemeValidFromDate" className={styles?.datePicker}>
                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Scheme Valid To Date'} name="schemeValidToDate" className={styles?.datePicker}>
                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item name="status" label={'Status'}>
                        <Switch checkedChildren={translateContent('global.label.yes')} unCheckedChildren={translateContent('global.label.no')} valuePropName="checked" />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
