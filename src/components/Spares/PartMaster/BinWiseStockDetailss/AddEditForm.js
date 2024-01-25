/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Select, Card, Descriptions, Button, TextArea, Checkbox, Typography, Upload, Input } from 'antd';

import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
//import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Text, Title } = Typography;
const { Dragger } = Upload;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, handleOnChange } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: true };
    const { TextArea } = Input;  
    return (
        <>
            <Row gutter={20}>

            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.store')} name="store" rules={[validateRequiredInputField(translateContent('partMaster.placeholder.store'))]}>
                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.store')), onChange: onHandleSelect })}
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.binLocation')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.binLocation'))} maxLength={50} />
                    </Form.Item>
                </Col>


                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.stockinhand')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.stockinhand'))} maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.allocatedstock')}>
                        <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.allocatedstock'))} maxLength={50} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('partMaster.label.remarks')} rules={[validateRequiredInputField(translateContent('partMaster.validation.partDescription'))]} name="remarks">
                        <TextArea placeholder={preparePlaceholderText(translateContent('partMaster.label.remarks'))} maxLength={300} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Form.Item name="active" label={translateContent('partMaster.placeholder.active')} valuePropName="checked">
                        <Checkbox onClick={handleOnChange}></Checkbox>
                    </Form.Item>
                </Col>
                            
            </Row>
        </>
    );
};

// export default AddEditFormMain;
export default AddEditFormMain;
