import React from 'react';
import { Input, Form, Col, Row, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const { TextArea } = Input;

function AddEditForm({ onUpdate, onCancel, form, onFieldsChange, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const disableProp = { disabled: true };
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleOnSearch = (value) => {
        console.log('value', value);
        if (value?.length < 3) return;
        form.setFieldsValue({
            // partNumber: "qwert",
            partType: 'wert',
            sellingPrice: 'serg',
            mrp: 'wef',
            requiredQuantity: '12',
            partDescription: 'wertgtr32e',
        });
    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Part Number" name="partNumber" rules={[validateRequiredInputField('part number')]}>
                        <Input.Search onSearch={handleOnSearch} placeholder={preparePlaceholderText('part number')} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Part Type" name="partType">
                        <Input {...disableProp} placeholder={preparePlaceholderText('part type')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Selling Price" name="sellingPrice">
                        <Input {...disableProp} placeholder={preparePlaceholderText('selling price')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="MRP" name="mrp">
                        <Input {...disableProp} placeholder={preparePlaceholderText('mrp')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Required Quantity" name="requiredQuantity" rules={[validateRequiredInputField('required quantity')]}>
                        <Input placeholder={preparePlaceholderText('required quantity')} />
                    </Form.Item>
                </Col>

                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Form.Item label="Part Description" name="partDescription">
                        <TextArea {...disableProp} rows={4} showCount maxLength={300} />
                    </Form.Item>
                </Col>

                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
            </Row>
            {!isEditing ? (
                <Button disabled={isBtnDisabled} type="primary" danger htmlType="submit">
                    Add
                </Button>
            ) : (
                <Row gutter={20}>
                    <Button type="primary" onClick={onUpdate}>
                        Save
                    </Button>
                    <Button danger onClick={() => onCancel()}>
                        Cancel
                    </Button>
                </Row>
            )}
        </Form>
    );
}

export default AddEditForm;
