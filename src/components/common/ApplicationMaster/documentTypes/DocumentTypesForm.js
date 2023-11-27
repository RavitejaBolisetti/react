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
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

function DocumentTypesForm({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('applicationMaster.label.code')} name="documentTypeCode" rules={[{ max: 3, message: translateContent('global.validation.mustBeCharactersLong').replace('{NAME}', 'code').replace('{Length}', '3') }, validateRequiredInputField(translateContent('applicationMaster.label.code')), validationFieldLetterAndNumber(translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        <Input disabled={isBtnDisabled} placeholder={preparePlaceholderText('document code')} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={translateContent('applicationMaster.label.documentName')} name="documentTypeDescription" rules={[{ max: 50, message: translateContent('global.validation.mustBeLessCharactersLong').replace('{NAME}', translateContent('applicationMaster.label.documentName')).replace('{Length}', '50') }, validateRequiredInputField(translateContent('applicationMaster.label.documentName')), validateAlphanumericWithSpace(translateContent('applicationMaster.label.documentName')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeDescription', finalFormdata?.documentType, documentTypeDescription) }]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('document name')} />
                    </Form.Item>
                </Col>
            </Row>
            {!isEditing && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                        <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" htmlType="submit">
                            {translateContent('global.buttons.save')}
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
}

export default DocumentTypesForm;
