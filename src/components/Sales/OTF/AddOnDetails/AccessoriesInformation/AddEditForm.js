import React from 'react';
import { Input, Form, Col, Row, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const { TextArea } = Input;

function AddEditForm({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Part Number" name="partNumber" rules={[{ max: 6, message: 'Code must be 11 characters long.' }, validateRequiredInputField('part number'), validationFieldLetterAndNumber('part number')]}>
                        <Input.Search disabled={isBtnDisabled} placeholder={preparePlaceholderText('document code')} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Part Type" name="partType" rules={[validateRequiredInputField('part type')]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('part type')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Selling Price" name="sellingPrice" rules={[validateRequiredInputField('selling price')]}>
                        <Input disabled={isBtnDisabled} placeholder={preparePlaceholderText('selling price')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="MRP" name="mrp" rules={[validateRequiredInputField('mrp')]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('mrp')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Required Quantity" name="requiredQuantity" rules={[validateRequiredInputField('required quantity')]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('required quantity')} />
                    </Form.Item>
                </Col>

                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Form.Item label="Part Description" name="partDescription" rules={[validateRequiredInputField('part description')]}>
                        <TextArea
                            autoSize={{
                                minRows: 2,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={300}
                        />
                    </Form.Item>
                </Col>

                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
            </Row>
            {!isEditing && (
                <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" danger htmlType="submit">
                    Add
                </Button>
            )}
        </Form>
    );
}

export default AddEditForm;
