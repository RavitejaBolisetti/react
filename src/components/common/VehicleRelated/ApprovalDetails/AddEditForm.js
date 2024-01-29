/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, TextArea,Divider, Card, Space } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from 'assets/sass/app.module.scss';


const AddEditFormMain = (props) => {
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: true };
    const { TextArea } = Input;
   
    const Action = [
        { key: '1', value: 'Approved' },
        { key: '2', value: 'Rejected' },       
    ];
    

    return (
        <>
         <Card>
            <Row gutter={20}>    

            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Form.Item label={translateContent('vehicleRelated.label.requesttype')}>
                            <Input value={'Change Registration No.'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.requesttype'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.dealerBranch')}>
                            <Input value={'Dealer Branch'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.dealerBranch'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.requestId')}>
                            <Input value={'RE3421342'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.requestId'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>

                              <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.requestDate')}>
                            <Input value={'28/01/24'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.requestDate'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.registrationNo')}>
                            <Input value={'23154654'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.registrationNo'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.chassisNo')}>
                            <Input value={'Chassis No'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.chassisNo'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>

                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.customerId')}>
                            <Input value={'Customer ID'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.customerId'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.customerName')}>
                            <Input value={'Customer Name'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.customerName'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item label={translateContent('vehicleRelated.label.newregistrationNo')}>
                            <Input value={'ER234567832'} placeholder={preparePlaceholderText(translateContent('vehicleRelated.placeholder.newregistrationNo'))} maxLength={50} {...disabledProps} />
                        </Form.Item>
                        </Col>

                        
                  <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item  label={(translateContent('vehicleRelated.label.action'))} rules={[validateRequiredInputField(translateContent('vehicleRelated.validation.action'))]} name="action">
                        {customSelectBox({data: Action, placeholder:preparePlaceholderSelect(translateContent('vehicleRelated.placeholder.action')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
             
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                <Form.Item label={(translateContent('partMaster.label.remarks'))}>
                    <TextArea placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.remarks'))} maxLength={300} />
                    </Form.Item>
                </Col>
            </Row>
            </Card>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
