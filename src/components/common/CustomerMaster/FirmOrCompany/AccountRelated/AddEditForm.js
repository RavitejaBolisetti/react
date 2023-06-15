import { React } from 'react';
import { Row, Col, Form, Input, Checkbox } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateNumberWithTwoDecimalPlaces, validationNumber, valueBetween0to100 } from 'utils/validation';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const [form] = Form.useForm();

    return (
        <>
            <Form form={form} id="myForm" autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Credit Limit" name="limitAmt" rules={[validateNumberWithTwoDecimalPlaces('credit limit amount')]}>
                            <Input placeholder={preparePlaceholderText('limit')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Credit Limit Days" name="limitDays" rules={[validationNumber('credit limit days')]}>
                            <Input placeholder={preparePlaceholderText('limit')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Outstanding Amount" name="outstandingAmt" rules={[validateNumberWithTwoDecimalPlaces('outstanding amount')]}>
                            <Input placeholder={preparePlaceholderText('amount')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Parts Discount %" name="partsDiscount" rules={[{ validator: (fieldData, value) => valueBetween0to100(value, 'parts discount') }]}>
                            <Input placeholder={preparePlaceholderText('discount')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Labour Discount %" name="laborDiscount" rules={[{ validator: (fieldData, value) => valueBetween0to100(value, 'labour discount') }]}>
                            <Input placeholder={preparePlaceholderText('discount')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item label="Remarks" name="remarks">
                            <TextArea rows={2} maxLength={250} placeholder={preparePlaceholderText('remark')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item valuePropName="checked" name="vipDealerInd">
                            <Checkbox>VIP Dealer</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
