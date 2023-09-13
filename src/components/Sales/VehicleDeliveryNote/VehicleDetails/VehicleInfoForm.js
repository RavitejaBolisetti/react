/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Divider, Form, DatePicker, Input } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

const { Search } = Input;
const VehicleInfoForm = (props) => {
    const { receiptData, formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.searchVehicleNumber} label="Search Vehicle Registration No." name="searchVehicleNumber">
                        <Search placeholder={preparePlaceholderText('Search Vehicle Registration No.')} allowClear />
                    </Form.Item>
                </Col>
                <Divider />
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.vinNo} label="VIN No." name="vinNo">
                        <Input placeholder={preparePlaceholderText('VIN No.')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.engineNumber} label="Engine Number" name="engineNumber">
                        <Input placeholder={preparePlaceholderText('Engine Number')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.keyNumber} label="Key Number" name="keyNumber">
                        <Input placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.modelCode} label="Model Code" name="modelCode">
                        <Input placeholder={preparePlaceholderText('Model Code')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.modalDescription} label="Modal Description" name="modalDescription">
                        <Input placeholder={preparePlaceholderText('Modal Description')} disabled={true} />
                    </Form.Item>
                </Col>
                {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.modalColor} label="Modal Color" name="modalColor">
                        <Input placeholder={preparePlaceholderText('Modal Color')} disabled={true} />
                    </Form.Item>
                </Col> */}
            </Row>
        </>
    );
};

export default VehicleInfoForm;
