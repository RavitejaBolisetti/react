/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { React } from 'react';
import { Row, Col, Form, Input, Checkbox, Space, Card } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateNumberWithTwoDecimalPlaces, validationNumber, valueBetween0to100 } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { formData } = props;

    return (
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Card style={{ backgroundColor: '#F2F2F2' }}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.creditLimit')} name="creditAmount" initialValue={formData?.creditAmount} rules={[validateNumberWithTwoDecimalPlaces(translateContent('customerMaster.validation.creditLimit'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.limit'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.limitDays')} name="creditDays" initialValue={formData?.creditDays} rules={[validationNumber(translateContent('customerMaster.validation.limitDays'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.limit'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.amount')} initialValue={formData?.outstandingAmount} name="outstandingAmount" rules={[validateNumberWithTwoDecimalPlaces(translateContent('customerMaster.validation.amount'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.amount'))} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.partsDiscount')} name="partsDiscount" initialValue={formData?.partsDiscount} rules={[valueBetween0to100(translateContent('customerMaster.validation.partsDiscount'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.discount'))} maxLength={3} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.labourDiscount')} name="labourDiscount" initialValue={formData?.labourDiscount} rules={[valueBetween0to100(translateContent('customerMaster.validation.labourDiscount'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.discount'))} maxLength={3} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label={translateContent('customerMaster.label.remarks')} name="remarks" initialValue={formData?.remarks}>
                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.remarks'))} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.vipDealerInd} valuePropName="checked" name="vipDealerInd">
                            <Checkbox>{translateContent('customerMaster.label.dealer')}</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Space>
    );
};

export const AddEditForm = AddEditFormMain;
