/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions } from 'antd';

import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { convertDateTime } from 'utils/formatDateTime';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, isLoading, selectedOrder, salesConsultantLov, dealerLocations } = props;
    const { otfTransferForm, onFinishOTFTansfer, handleOtfTransferLocationChange } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, typeData } = props;

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        onFinishOTFTansfer,
    };

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };

    return (
        <>
            <Card className={styles.ExchangeCard}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="OTF No.">{checkAndSetDefaultValue(selectedOrder?.otfNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="OTF Date">{checkAndSetDefaultValue(convertDateTime(selectedOrder?.otfDate, 'DD MMM YYYY'), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(selectedOrder?.customerName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(selectedOrder?.mobileNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model">{checkAndSetDefaultValue(selectedOrder?.model, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Order Status">{getStatus(selectedOrder?.orderStatus)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Form form={otfTransferForm} onFinish={onFinishOTFTansfer} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="otfTransferLocation" label="Transfer To Location" initialValue={formData?.otfTransferLocation} rules={[validateRequiredSelectField('Transfer To Location')]}>
                            <Select placeholder="Select" showSearch allowClear onChange={ handleOtfTransferLocationChange }>
                                {dealerLocations?.map((item) => (
                                    <Option value={item.locationId}>{item.dealerLocationName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="salesConsultant" label="Sales Consultant" initialValue={formData?.salesConsultant} rules={[validateRequiredSelectField('Sales Consultant')]}>
                            <Select placeholder="Select" showSearch allowClear>
                                {salesConsultantLov?.map((item) => (
                                    <Option value={item.key}>{item.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="transferReason" label="Reason For Transfer" initialValue={formData?.transferReason} rules={[validateRequiredSelectField('Reason For Transfer')]}>
                            <Select {...selectProps} fieldNames={{ label: 'value', value: 'key' }} options={typeData} placeholder={preparePlaceholderSelect('Reason For Cancellation')} />
                        </Form.Item>
                    </Col>
                </Row>
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
