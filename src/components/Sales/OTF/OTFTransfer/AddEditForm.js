/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, Upload, Button, Empty, message } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { convertDateTime } from 'utils/formatDateTime';

import Svg from 'assets/images/Filter.svg';
import { FiEye, FiTrash, FiDownload } from 'react-icons/fi';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;


const AddEditFormMain = (props) => {
    const { formData, isLoading, otfData, selectedOrder, salesConsultantLov, dealerLocations } = props;
    const { otfTransferForm, onFinishOTFTansfer } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleFormValueChange, typeData, userId, listShowLoading, showGlobalNotification   } = props;

    const [showStatus, setShowStatus] = useState('');

    useEffect(() => {
        if (showStatus.status === 'done') {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: `${showStatus.name + ' file uploaded successfully'}` });
        } else if (showStatus.status === 'error') {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Error' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStatus]);


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
                    <Descriptions.Item label="Order Status">{checkAndSetDefaultValue(selectedOrder?.orderStatus, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Form form={otfTransferForm} onFinish={onFinishOTFTansfer} layout="vertical" autocomplete="off" colon="false">
                <Form.Item name="id" initialValue={selectedOrder?.id} hidden={true} />
                <Form.Item name="otfNumber"  initialValue={selectedOrder?.otfNumber} hidden={true} />

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="otfTransferLocation" label="Transfer To Location" initialValue={formData?.otfTransferLocation} rules={[validateRequiredSelectField('Transfer To Location')]}>
                        <Select placeholder="Select" showSearch allowClear>
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
                            <Select
                                {...selectProps}
                                style={{
                                    width: '100%',
                                }} 
                                fieldNames={{ label: 'value', value: 'key' }}
                                options={typeData}
                                placeholder={preparePlaceholderSelect('Reason For Cancellation')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
