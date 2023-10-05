/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Form, Row, Col, Select, Input } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validateMacId, duplicateValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';

const AddEditForm = (props) => {
    const { onSaveFormData, macIdform, setShowAddEditForm, setIsEditing, formActionType, handleFormValueChange, setIsAdding, macIdData } = props;
    const handleCancelFormEdit = () => {
        macIdform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const options = [
        {
            value: 'Web',
            label: 'Web',
        },
        {
            value: 'Mobile',
            label: 'Mobile',
        },
    ];

    return (
        <>
            <Form form={macIdform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Device Type" name="deviceType" rules={[validateRequiredSelectField('Device Type')]}>
                            <Select {...selectProps} placeholder={preparePlaceholderSelect('Device Type')} allowClear options={options}></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Device Id" name="macId" rules={[validateRequiredInputField('Device Id'), validateMacId('Device Id'), { validator: (_, value) => duplicateValidator(value, 'macId', macIdData) }]}>
                            <Input maxLength={25} placeholder={preparePlaceholderText('Device Id"')} allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item hidden initialValue={''} name="id">
                    <Input />
                </Form.Item>
                {!formActionType?.viewMode && (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles.buttonsGroup} ${styles.marB20}`}>
                            <Button onClick={onSaveFormData} type="primary">
                                Save
                            </Button>
                            <Button onClick={handleCancelFormEdit} danger>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default AddEditForm;
