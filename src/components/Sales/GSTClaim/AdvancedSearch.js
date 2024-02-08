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
    // const [claimStatus, setClaimStatus] = useState('PFG');
    const { setAdvanceSearchVisible, vehicleModelData, isModelDataLoading, claimStatus } = props;
    console.log('claimStatus', claimStatus);
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        rules,
        setrules,
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
                {/* for MNM User */}
                {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Zone" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('zone')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col> */}
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Area Office" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Area Office')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Dealer Name" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Dealer Name')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Financial Year" name="financialYear">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Financial Year')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                {/*  */}
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Financial Month" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Financial Month')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Claim Type" name="claimType">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Claim Type')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Claim Status" name="claimStatus">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Claim Status')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>


                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Claim from Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate')} name="fromDate" className={styles?.datePicker} rules={[{ required: rules?.fromdate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message1') }]}>
                        <DatePicker
                            placeholder={'Claim from Date' || preparePlaceholderSelect(translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate'))}
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
                    <Form.Item label={'Claim to Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate')} name="toDate" className={styles?.datePicker} rules={[{ required: rules?.todate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message2') }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect('Claim to Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate'))}
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
                {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Status" name="zone">
                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Status')}  loading={isModelDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Invoice from Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate')} name="fromDate" className={styles?.datePicker} rules={[{ required: rules?.fromdate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message1') }]}>
                        <DatePicker
                            placeholder={'Invoice from Date' || preparePlaceholderSelect(translateContent('vehicleReceiptChecklist.label.advanceFilter.fromDate'))}
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
                    <Form.Item label={'Invoice to Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate')} name="toDate" className={styles?.datePicker} rules={[{ required: rules?.todate, message: translateContent('vehicleReceiptChecklist.advanceFilter.message2') }]}>
                        <DatePicker
                            placeholder={preparePlaceholderSelect('Invoice to Date' || translateContent('vehicleReceiptChecklist.label.advanceFilter.toDate'))}
                            format={dateFormat}
                            className={styles.fullWidth}
                            disabledDate={(current) => current < advanceFilterForm?.getFieldValue('fromDate') || current > new Date()}
                            onChange={(event) => {
                                if (event && Object?.keys(event)?.length) setrules({ fromdate: true, todate: true });
                                if (!event && !advanceFilterForm?.getFieldValue('fromDate')) setrules({ fromdate: false, todate: false });
                            }}
                        />
                    </Form.Item>
                </Col> */}

                {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label={translateContent('global.label.status')} valuePropName="checked">
                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                    </Form.Item>
                </Col> */}
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
