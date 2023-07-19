/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Button, Form, Row, Col, Space, Select, Input, TimePicker } from 'antd';
import { validateLettersWithWhitespaces, validateRequiredEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const AddEditForm = (props) => {
    const { onSaveFormData, contactform, setShowAddEditForm, setIsEditing, typeData, formActionType, handleFormValueChange, setIsAdding } = props;
    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                <Space direction="vertical">
                    <Row gutter={[20, 0]}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Contact Type" name="contactType" rules={[validateRequiredSelectField('contact type')]}>
                                <Select placeholder={preparePlaceholderSelect('contact type')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} allowClear options={typeData['VH_CONTACT_TYPE']}></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8} className={styles.contactDays}>
                            <Form.Item label="Preferred Days For Contact" name="preferredDayForContact" rules={[validateRequiredSelectField('preferred days for contact')]}>
                                <Select mode="multiple" placeholder={preparePlaceholderSelect('preferred days for contact')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} allowClear options={typeData['VH_CONTACT_DAYS']}></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8} className={styles.inputWrapper}>
                            <Form.Item label="Mobile Number" name="mobileNumber" rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]}>
                                <Input maxLength={10} placeholder={preparePlaceholderText('mobile number')} allowClear size="small" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Name" name="name" rules={[validateRequiredInputField('Name'), validateLettersWithWhitespaces('Name')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('name')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="E-mail" initialValue={''} name="emailId" rules={[validateRequiredEmailField('E-mail')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('email id')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8} style={{ display: 'flex' }}>
                            <Form.Item label="Preferred Contact Time" name={'preferredContactTime'} rules={[validateRequiredInputField('contact time')]}>
                                <TimePicker.RangePicker use12Hours size="small" format="h:mm A" />
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
