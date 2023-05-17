import { React } from 'react';

import { Col, Row, Form, Input, Checkbox } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetails';

const { TextArea } = Input;

// const onChange = (e) => {
//     console.log(`checked = ${e.target.checked}`);
// };
const apiKey = 'vipDealerInd';
const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    console.log('API Key:', apiKey);
    console.log('Checkbox value:', isChecked);
};

const { Search } = Input;

const AddEditFormMain = ({ isReadOnly }) => {
    const [form] = Form.useForm();

    return (
        <Form form={form} id="myForm" autoComplete="off" layout="vertical">
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Credit Limit" name="limitAmt">
                        <Input maxLength={50} placeholder={preparePlaceholderText('limit')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Credit Limit Days" name="limitDays">
                        <Input maxLength={50} placeholder={preparePlaceholderText('limit')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Outstanding Amount" name="outstandingAmt">
                        <Input maxLength={50} placeholder={preparePlaceholderText('amount')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Parts Discount %" name="partsDiscount">
                        <Input maxLength={50} placeholder={preparePlaceholderText('discount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Labour Discount %" name="laborDiscount">
                        <Input maxLength={50} placeholder={preparePlaceholderText('discount')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Remarks" name="remarks">
                        <TextArea rows={3} maxLength={250} placeholder={preparePlaceholderText('remark')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Checkbox onChange={handleCheckboxChange}>VIP Dealer</Checkbox>
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = AddEditFormMain;
