/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Select, DatePicker, Switch } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat, formatDate } from 'utils/formatDateTime';
import { ModalButtons } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

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
                    <Form.Item label={translateContent('overRiderClaim.label.zone')} name="zone">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.zone'))} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('overRiderClaim.label.areaOffice')} name="zone">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.areaOffice'))} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('overRiderClaim.label.dealerName')} name="zone">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.dealerName'))} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('overRiderClaim.label.locationName')} name="zone">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.locationName'))} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('overRiderClaim.label.claimFromDate') || translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate')} name="fromDate" className={styles?.datePicker} rules={[{ required: rules?.fromdate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message1') }]}>
                        <DatePicker
                            placeholder={translateContent('overRiderClaim.placeholder.claimFromDate') || preparePlaceholderSelect(translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate'))}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current > new Date()}
                            onChange={(event) => {
                                advanceFilterForm.setFieldsValue({ toDate: undefined });
                                if (event && Object?.keys(event)?.length) setrules({ fromdate: true, todate: true });
                                else if (!event) setrules({ fromdate: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('overRiderClaim.label.claimToDate') || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate')} name="toDate" className={styles?.datePicker} rules={[{ required: rules?.todate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message2') }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.claimToDate') || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate'))}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current < advanceFilterForm?.getFieldValue('fromDate') || current > new Date()}
                            onChange={(event) => {
                                if (event && Object?.keys(event)?.length) setrules({ fromdate: true, todate: true });
                                if (!event && !advanceFilterForm?.getFieldValue('fromDate')) setrules({ fromdate: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('overRiderClaim.label.claim') + translateContent('designationMaster.label.status')}>
                        <Select optionFilterProp="children" options={statusFilter || []} placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.claimStatus'))} fieldNames={{ label: 'value', value: 'key' }} loading={isModelDataLoading} allowClear showSearch />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
