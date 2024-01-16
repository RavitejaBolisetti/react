/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';

import { duplicateValidator, validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';

const dummyDataList = [
    {
        key: 'Qwer',
        value: 'Qwer',
    },
    {
        key: 'Qrty',
        value: 'Qrty',
    },
];

const fieldNames = { key: 'key', value: 'value' };

const DetailForm = ({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Dealer Name' || translateContent('applicationMaster.label.code')} name="dealerName" rules={[validateRequiredInputField('Dealer Name' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Dealer Name' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Dealer Code' || translateContent('applicationMaster.label.code')} name="dealerCode" rules={[validateRequiredInputField('Dealer Code' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Dealer Code' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Location' || translateContent('applicationMaster.label.code')} name="location" rules={[validateRequiredInputField('Location' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Location' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Make' || translateContent('applicationMaster.label.code')} name="make" rules={[validateRequiredInputField('Make' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Make' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Modal' || translateContent('applicationMaster.label.code')} name="model" rules={[validateRequiredInputField('Modal' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Modal' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Varient' || translateContent('applicationMaster.label.code')} name="varient" rules={[validateRequiredInputField('Varient' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect(' Varient' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Used Year' || translateContent('applicationMaster.label.code')} name="usedYear" rules={[validateRequiredInputField('Used Year' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Used Year' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'KM' || translateContent('applicationMaster.label.code')} name="km" rules={[validateRequiredInputField('KM' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentKMCode', finalFormdata?.documentKM) }]}>
                        <Input placeholder={preparePlaceholderText('KM')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'MFG Year' || translateContent('applicationMaster.label.code')} name="mfgYear" rules={[validateRequiredInputField('MFG Year' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('MFG Year' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Type' || translateContent('applicationMaster.label.code')} name="type" rules={[validateRequiredInputField('Type' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Type' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Latest Make' || translateContent('applicationMaster.label.code')} name="latestMake" rules={[validateRequiredInputField('Latest Make' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Latest Make' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Latest Model' || translateContent('applicationMaster.label.code')} name="latestModel" rules={[validateRequiredInputField('Latest Modal' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Latest Model' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Latest Varient' || translateContent('applicationMaster.label.code')} name="latestVarient" rules={[validateRequiredInputField('Latest Varient' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Latest Varient' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="exShowroomPrice" label={'Ex-Showroom Price'}>
                        <Input placeholder={preparePlaceholderText('Ex-Showroom Price')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="eachUsedVehPrie" label={'Each/Used Veh Price'}>
                        <Input placeholder={preparePlaceholderText('Each/used Veh Price')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="remarks" label={'Remarks'}>
                        <Input placeholder={preparePlaceholderText('Remarks')} maxLength={50} />
                    </Form.Item>
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
};

export default DetailForm;
