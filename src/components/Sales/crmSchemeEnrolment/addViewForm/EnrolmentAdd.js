/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';

const { Search } = Input;

const EnrolmentAdd = (props) => {
    const { typeData, salesConsultantLov, onHandleRegistrationNumber } = props;

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Scheme Type" name="schemeType" rules={[validateRequiredInputField('Scheme Type')]}>
                        {customSelectBox({ data: typeData[PARAM_MASTER?.CRM_SCHEME_TYPE?.id], placeholder: preparePlaceholderSelect('Scheme Type') })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Vehicle Registration Number" name="vin" rules={[validateRequiredInputField('Vehicle Registration Number')]}>
                        <Search placeholder={preparePlaceholderText('Vehicle Registration Number')} allowClear onSearch={onHandleRegistrationNumber} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Booklet Number" name="bookletNumber">
                        {/* //rules={[validateRequiredInputField('Booklet Number')]} */}
                        <Input placeholder={preparePlaceholderText('Booklet Number')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label="Enrolled By" name="enrolledBy" rules={[validateRequiredInputField('Enrolled By')]}>
                        {customSelectBox({ data: salesConsultantLov, placeholder: preparePlaceholderSelect('Enrolled By') })}
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default EnrolmentAdd;
