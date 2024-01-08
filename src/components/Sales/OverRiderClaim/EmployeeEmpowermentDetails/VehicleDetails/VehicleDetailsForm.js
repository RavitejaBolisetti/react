/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Button, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';

import { duplicateValidator, validateAlphanumericWithSpace, validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { dateFormat } from 'utils/formatDateTime';
import { UploadUtil } from 'utils/Upload';

const VehicleDetailsForm = ({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, formData, formActionType, chessisNoList }) => {
    const disabledProps = {disabled: true};

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const uploadProps = {

    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
             <Row gutter={20}>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="chessisNo" label={'Chessis No'} rules={[validateRequiredSelectField(translateContent('termConditionDealer.validation.productHierarchy'))]}>
                                {customSelectBox({ data: chessisNoList, placeholder: translateContent('termConditionDealer.placeholder.selectParameter'), fieldNames: { key: 'key', value: 'value' }, disabled: formActionType?.viewMode || isBtnDisabled })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="deliveryChallanNo" label={'Delivery Challan No'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Delivery Challan No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="deliveryChallanDate" label={'Delivery Challan Date'} initialValue={formData?.deliveryChallanDate}>
                            <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Delivery Challan Date')} style={{ width: '100%' }} {...disabledProps} />
                                {/* <Input placeholder={preparePlaceholderText('Delivery Challan Date')} maxLength={50} {...disabledProps} /> */}
                            </Form.Item>
                        </Col>
                        {/* upload document */}

                    </Row>
                    <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <UploadUtil {...uploadProps} handleFormValueChange={onFieldsChange} />
                    </Col>
                </Row>
            {!isEditing && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                        <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" onClick={onFinish}>
                            {translateContent('global.buttons.add')}
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
}

export default VehicleDetailsForm;
