/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Form, Row, Col, Space, Select, Input } from 'antd';
import { validationFieldLetterAndNumber, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const AddEditForm = (props) => {
    const { onSaveFormData, macIdform, setShowAddEditForm, setIsEditing, formActionType, handleFormValueChange, setIsAdding } = props;
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
                <Space direction="vertical">
                    <Row gutter={[20, 0]}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Device Type" name="deviceType" rules={[validateRequiredSelectField('Device Type')]}>
                                <Select
                                    {...selectProps}
                                    placeholder={preparePlaceholderSelect('Device Type')}
                                    allowClear
                                    options={options}
                                    // fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement}  options={typeData['VH_CONTACT_TYPE']}
                                ></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Device Id" name="macId" rules={[validateRequiredInputField('Device Id"'), validationFieldLetterAndNumber('Device Id')]}>
                                <Input maxLength={10} placeholder={preparePlaceholderText('Device Id"')} allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item hidden initialValue={''} name="id">
                        <Input />
                    </Form.Item>
                    {!formActionType?.viewMode && (
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Button className={styles.marR20} onClick={onSaveFormData} type="primary">
                                    Save
                                </Button>
                                <Button className={styles.marB20} onClick={handleCancelFormEdit} danger>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Space>
            </Form>
        </>
    );
};

export default AddEditForm;
