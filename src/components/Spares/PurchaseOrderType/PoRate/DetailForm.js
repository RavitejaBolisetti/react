/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Button } from 'antd';


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
                    <Form.Item label="Material Pricing Group" name="mahindraMake" rules={[validateRequiredInputField('Mahindra Make' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Mahindra Make' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                
                <Form.Item label="NDP %"  placeholder={preparePlaceholderSelect('Brand Spider Name' || translateContent('city.placeholder.country'))} >
                    <Input placeholder="NDP %"  />
                </Form.Item>
                {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Mahindra Modal : ' || translateContent('applicationMaster.label.code')} name="mahindraModel" rules={[validateRequiredInputField('Mahindra Modal' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Mahindra Modal' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col> */}
                {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Mahindra Varient : ' || translateContent('applicationMaster.label.code')} name="mahindraVarient" rules={[validateRequiredInputField('Mahindra Varient' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Mahindra Varient' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Competitor Make : ' || translateContent('applicationMaster.label.code')} name="competitorMake" rules={[validateRequiredInputField('Competitor Make' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Competitor Make' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Competitor Model : ' || translateContent('applicationMaster.label.code')} name="competitorModel" rules={[validateRequiredInputField('Competitor Modal' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Competitor Model' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={'Competitor Varient : ' || translateContent('applicationMaster.label.code')} name="competitorVarient" rules={[validateRequiredInputField('Competitor Varient' || translateContent('applicationMaster.label.code')), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        {customSelectBox({ data: dummyDataList, fieldNames, placeholder: preparePlaceholderSelect('Competitor Varient' || translateContent('applicationMaster.placeholder.accessibleLocation')) })}
                    </Form.Item>
                </Col> */}
                {!isEditing && (
               
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.marT20}>
                        <Button disabled={isBtnDisabled}  type="primary" onClick={onFinish}>
                            SAVE
                        </Button>
                    </Col>
               
            )}
            </Row>
            
        </Form>
    );
};

export default DetailForm;
