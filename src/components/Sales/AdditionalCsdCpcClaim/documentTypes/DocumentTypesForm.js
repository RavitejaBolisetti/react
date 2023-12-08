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

function DocumentTypesForm({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode, segmentData, modalData, modalGroupData }) {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Segment'||translateContent('applicationMaster.label.code')} name="segment" rules={[validateRequiredInputField(translateContent('applicationMaster.label.code')),  { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {/* <Input disabled={isBtnDisabled} placeholder={preparePlaceholderText('Segment')} /> */}
                        {customSelectBox({ data: segmentData, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.priceType')), disabled:isBtnDisabled})}

                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Modal Group'||translateContent('applicationMaster.label.documentName')} name="modalGroup" rules={[ validateRequiredInputField(translateContent('applicationMaster.label.documentName')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeDescription', finalFormdata?.documentType, documentTypeDescription) }]}>
                        {/* <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('Modal Group')} /> */}
                        {customSelectBox({ data:  modalGroupData, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.priceType')), disabled:isBtnDisabled})}

                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Modal'||translateContent('applicationMaster.label.documentName')} name="modal" rules={[ validateRequiredInputField(translateContent('applicationMaster.label.documentName')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeDescription', finalFormdata?.documentType, documentTypeDescription) }]}>
                        {/* <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('Modal')} /> */}
                        {customSelectBox({ data: modalData, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.priceType')), disabled:isBtnDisabled})}

                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={'Incentive Amount'||translateContent('applicationMaster.label.documentName')} name="incentiveAmount" rules={[ validateRequiredInputField(translateContent('applicationMaster.label.documentName')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeDescription', finalFormdata?.documentType, documentTypeDescription) }]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('Incentive Amount')} />
                    </Form.Item>
                </Col>
            </Row>
            {!isEditing && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                        <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" 
                        htmlType="submit"
                        >
                            {translateContent('global.buttons.add')}
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
}

export default DocumentTypesForm;
