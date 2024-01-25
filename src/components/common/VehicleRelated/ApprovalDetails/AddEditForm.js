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
        { key: '1', value: 'Approved  1' },
        { key: '2', value: 'Rejected 2' },       
    ];
    

    return (
        <>
         <Card>
            <Row gutter={20}>
    
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.approverName')} >
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.approverName'))} maxLength={50} {...disabledProps}/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.requestedon')} >
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.requestedon'))} maxLength={50} {...disabledProps}/>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item  label={(translateContent('partMaster.label.action'))} rules={[validateRequiredInputField(translateContent('partMaster.validation.action'))]} name="action">
                        {customSelectBox({data: Action, placeholder:preparePlaceholderSelect(translateContent('partMaster.placeholder.action')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.actionedon')} >
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.actionedon'))} maxLength={50} {...disabledProps}/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
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
