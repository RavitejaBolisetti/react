/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Button, Switch, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';

import { duplicateValidator, validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';



function DocumentDetailsForm({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, finalFormdata, documentName, documentId,validFrom,validTo,documentstatus,documentmandatory,formData, editMode,selectedOrder, formActionType }) {
    const onFinishFailed = (err) => {
        console.error(err);
    };
    const documentNamedata = [
        { key: 1, value: 'Document 1' },
        { key: 2, value: 'Document 2' },
        { key: 3, value: 'Document 3' },
        { key: 4, value: 'Document 4' },
        { key: 4, value: 'Document 5' },
    ];
    
    const fieldNames = { value: 'value', key: 'value' };

  
    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    {/* <Form.Item label={translateContent('LoyaltySchemeMaster.label.documentName')} name="documentName" rules={[{ max: 50, message: translateContent('global.validation.mustBeLessCharactersLong').replace('{NAME}', translateContent('LoyaltySchemeMaster.label.documentName')).replace('{Length}', '50') }, validateRequiredInputField(translateContent('LoyaltySchemeMaster.label.documentName')), validateAlphanumericWithSpace(translateContent('LoyaltySchemeMaster.label.documentName')), 
                    // { validator: (rule, value) => duplicateValidator(value, 'document Name', finalFormdata?.DocumentDetails, documentName) }
                    ]}> */}
                     {/* <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('document Name')} /> */}

                     <Form.Item initialValue={selectedOrder?.documentName} label={translateContent('LoyaltySchemeMaster.label.documentName')} name="documentName">
                          {customSelectBox({ disabled: formActionType?.viewMode, disableOptionsKey: 'documentName', data: documentNamedata, fieldNames: fieldNames, placeholder: preparePlaceholderSelect(translateContent('LoyaltySchemeMaster.label.documentName')) })}   
                    </Form.Item>
                </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('LoyaltySchemeMaster.label.documentId')} name="documentId" >
                    
                    {/* // rules={[{ max: 3, message: translateContent('global.validation.mustBeCharactersLong').replace('{NAME}', 'code').replace('{Length}', '3') }, validateRequiredInputField(translateContent('LoyaltySchemeMaster.label.documentId')), validationFieldLetterAndNumber(translateContent('LoyaltySchemeMaster.label.documentId')), { validator: (rule, value) => duplicateValidator(value, 'documentId', finalFormdata?.DocumentDetails, documentId) }
                    // ]} */}
                    
                

                    <Input disabled={true} placeholder={preparePlaceholderText('document Id')}  />
                    </Form.Item>
                </Col>             
                                          
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('LoyaltySchemeMaster.label.validFrom')} initialValue={formattedCalendarDate(formData?.validFrom)} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.validFrom')),{ validator: (rule, value) => duplicateValidator(value, 'validFrom', finalFormdata?.DocumentDetails, validFrom) }]} name="validFrom">
                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.validFrom'))} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
            
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                       <Form.Item label={translateContent('LoyaltySchemeMaster.label.validTo')} initialValue={formattedCalendarDate(formData?.validTo)} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.validTo')),{ validator: (rule, value) => duplicateValidator(value, 'validTo', finalFormdata?.DocumentDetails, validTo) }]} name="validTo">
                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.validTo'))} disabled={editMode ? true : false} />
                    </Form.Item>
                </Col>
           

           
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="documentstatus" label={translateContent('LoyaltySchemeMaster.label.documentstatus')}>
                        <Switch checkedChildren={translateContent('LoyaltySchemeMaster.label.activesheme')} unCheckedChildren={translateContent('LoyaltySchemeMaster.label.inactivesheme')} onChange={(checked) => (checked ? 1 : 0)} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.documentstatus')),{ validator: (rule, value) => duplicateValidator(value, 'documentstatus', finalFormdata?.DocumentDetails, documentstatus) }]}/>


                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="documentmandatory" label={translateContent('LoyaltySchemeMaster.label.documentmandatory')}>
                        <Switch checkedChildren={translateContent('LoyaltySchemeMaster.label.documentyes')} unCheckedChildren={translateContent('LoyaltySchemeMaster.label.documentno')} onChange={(checked) => (checked ? 1 : 0)} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.documentmandatory')),{ validator: (rule, value) => duplicateValidator(value, 'documentmandatory', finalFormdata?.DocumentDetails, documentmandatory) }]}/>
                    </Form.Item>
                </Col>
            </Row>


            {!isEditing && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                        <Button onClick={onFinish} disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" >
                            {translateContent('global.buttons.save')}
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
}

export default DocumentDetailsForm;
