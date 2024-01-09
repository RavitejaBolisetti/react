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
            formData: formatDate(values?.formData),
            toDate: formatDate(values?.toDate),
            advanceFilter: true,
        });

        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        resetFields();
        setrules({ formData: false, todate: false });
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
                    <Form.Item label="Area Office" name="areaOffice">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect('Area Office')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Dealer Name" name="dealerName">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect('Dealer Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Location Name" name="locationName">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect('Location Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Request Type" name="requestType">
                        <Select optionFilterProp="children" options={vehicleModelData || []} placeholder={preparePlaceholderSelect('request Type')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Request From Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.formData')} name="formData" className={styles?.datePicker} rules={[{ required: rules?.formData, message: translateContent('vehicleReceiptChecklist.advanceFilter.message1') }]}>
                        <DatePicker
                            placeholder={'Request From Date' || preparePlaceholderSelect(translateContent('vehicleReceiptChecklist.label.advanceFilter.formData'))}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current > new Date()}
                            onChange={(event) => {
                                advanceFilterForm.setFieldsValue({ toDate: undefined });
                                if (event && Object?.keys(event)?.length) setrules({ formData: true, todate: true });
                                else if (!event) setrules({ formData: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Request To Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate')} name="toDate" className={styles?.datePicker} rules={[{ required: rules?.todate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message2') }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect('Request To Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate'))}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current < advanceFilterForm?.getFieldValue('formData') || current > new Date()}
                            onChange={(event) => {
                                if (event && Object?.keys(event)?.length) setrules({ formData: true, todate: true });
                                if (!event && !advanceFilterForm?.getFieldValue('formData')) setrules({ formData: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
                {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={'Request ' + translateContent('designationMaster.label.status')}>
                        <Select optionFilterProp="children" options={statusFilter || []} placeholder={preparePlaceholderSelect('Request Status')} fieldNames={{ label: 'value', value: 'key' }} loading={isModelDataLoading} allowClear showSearch  />
                    </Form.Item>
                </Col> */}
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
