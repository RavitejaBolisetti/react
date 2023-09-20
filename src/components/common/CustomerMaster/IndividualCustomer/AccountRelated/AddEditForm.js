/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { React } from 'react';
import { Row, Col, Form, Input, Checkbox, Space, Card } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validationNumber, valueBetween0to100, validateNumberWithTwoDecimalPlaces } from 'utils/validation';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { formData } = props;
    return (
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Card style={{ backgroundColor: '#F2F2F2' }}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Credit Limit" name="creditAmount" initialValue={formData?.creditAmount} rules={[validateNumberWithTwoDecimalPlaces('credit limit')]}>
                            <Input placeholder={preparePlaceholderText('limit')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Credit Limit Days" name="creditDays" initialValue={formData?.creditDays} rules={[validationNumber('credit limit days')]}>
                            <Input placeholder={preparePlaceholderText('limit')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Outstanding Amount" initialValue={formData?.outstandingAmount} name="outstandingAmount" rules={[validateNumberWithTwoDecimalPlaces('outstanding amount')]}>
                            <Input placeholder={preparePlaceholderText('amount')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Parts Discount %" name="partsDiscount" initialValue={formData?.partsDiscount} rules={[valueBetween0to100('parts discount')]}>
                            <Input placeholder={preparePlaceholderText('discount')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Labour Discount %" name="labourDiscount" initialValue={formData?.labourDiscount} rules={[valueBetween0to100('labour discount')]}>
                            <Input placeholder={preparePlaceholderText('discount')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Remarks" name="remarks" initialValue={formData?.remarks}>
                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('remark')} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.vipDealerInd} valuePropName="checked" name="vipDealerInd">
                            <Checkbox>VIP Dealer</Checkbox>
                        </Form.Item>
                    </Col>
                </Row> */}
            </Card>
        </Space>
    );
};

export const AddEditForm = AddEditFormMain;
