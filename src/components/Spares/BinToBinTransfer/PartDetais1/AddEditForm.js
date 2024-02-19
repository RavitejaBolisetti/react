/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Button, AutoComplete, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import { validateRequiredInputField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

const { Search } = Input;

const AddEditForm = ({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, formActionType, formData }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleOnSelect = () => {};
    const handleOnSearch = () => {};
    const handleOnClear = () => {};

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('Part No')} name="partNo">
                        <AutoComplete maxLength={6} options={[{ key: 'd1', value: 'd1' }]} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                            <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={translateContent('Part No')} type="text" allowClear disabled={formActionType?.addMode} />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('Part Descripton')} name="partDescription" rules={[validateRequiredInputField(translateContent('Part Descripton'))]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Part Descripton'))} />
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('Unit Of Measure')} name="unitOfMeasure" rules={[validateRequiredInputField(translateContent('Unit Of Measure'))]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Unit Of Measure'))} />
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('From Bin Store')} name="fromBinLocation" rules={[validateRequiredInputField(translateContent('From Bin Store'))]}>
                        {customSelectBox({ data: [{ key: 'l1', value: 'l1' }], placeholder: preparePlaceholderText('From Bin Store') })}
                    </Form.Item>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('From Bin Location')} name="fromBinLocation" rules={[validateRequiredInputField(translateContent('From Bin Location'))]}>
                        {customSelectBox({ data: [{ key: 'l1', value: 'l1' }], placeholder: preparePlaceholderText('From Bin Location') })}
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('From Bin Stock')} name="fromBinStock" rules={[validateRequiredInputField(translateContent('From Bin Stock'))]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('From Bin Stock'))} />
                    </Form.Item>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('Transfer Quantity')} name="transferQuantity">
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Transfer Quantity'))} />
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('To Bin Store')} name="toBinLocation" rules={[validateRequiredInputField(translateContent('To Bin Store'))]}>
                        {customSelectBox({ data: [{ key: 'l1', value: 'l1' }], placeholder: preparePlaceholderText('To Bin Store') })}
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('To Bin Location')} name="toBinLocation" rules={[validateRequiredInputField(translateContent('To Bin Location'))]}>
                        {customSelectBox({ data: [{ key: 'l1', value: 'l1' }], placeholder: preparePlaceholderText('To Bin Location') })}
                    </Form.Item>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('To Bin Stock')} name="toBinStock" rules={[validateRequiredInputField(translateContent('To Bin Stock'))]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('To Bin Stock'))} />
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('Mark bin location as default')}  labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="defaultBinLocation">
                        <Checkbox></Checkbox>
                    </Form.Item>
                </Col>
            </Row>
            {!isEditing && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                        <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" onClick={onFinish}>
                            {translateContent('global.buttons.add')}
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
};

export default AddEditForm;
