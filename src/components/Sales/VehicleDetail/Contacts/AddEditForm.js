/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Button, Form, Row, Col, Select, Input, TimePicker } from 'antd';

import { validateLettersWithWhitespaces, validateRequiredEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const AddEditForm = (props) => {
    const { onSaveFormData, contactform, setShowAddEditForm, setIsEditing, typeData, isEditing, formActionType, handleFormValueChange, setIsAdding } = props;
    const handleCancelFormEdit = () => {
        contactform.resetFields();
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

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('vehicleDetail.contacts.label.contactType')} name="contactType" rules={[validateRequiredSelectField(translateContent('vehicleDetail.contacts.label.contactType'))]}>
                            <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('vehicleDetail.contacts.label.contactType'))} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} allowClear options={typeData['VH_CONTACT_TYPE']}></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('vehicleDetail.contacts.label.preferredDayForContact')} name="preferredDayForContact" rules={[validateRequiredSelectField(translateContent('vehicleDetail.contacts.label.preferredDayForContact'))]}>
                            {customSelectBox({ data: typeData['VH_CONTACT_DAYS'], mode: 'multiple', placeholder: preparePlaceholderSelect(translateContent('vehicleDetail.contacts.label.preferredDayForContact')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('vehicleDetail.customerDetails.label.mobileNumber')} name="mobileNumber" rules={[validateRequiredInputField(translateContent('vehicleDetail.customerDetails.label.mobileNumber')), validateMobileNoField(translateContent('vehicleDetail.customerDetails.label.mobileNumber'))]}>
                            <Input maxLength={10} placeholder={preparePlaceholderSelect(translateContent('vehicleDetail.customerDetails.label.mobileNumber'))} allowClear size="small" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('vehicleDetail.contacts.label.name')} name="name" rules={[validateRequiredInputField(translateContent('vehicleDetail.contacts.label.name')), validateLettersWithWhitespaces(translateContent('vehicleDetail.contacts.label.name'))]}>
                            <Input placeholder={preparePlaceholderSelect(translateContent('vehicleDetail.contacts.label.name'))} disabled={isEditing} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('vehicleDetail.contacts.label.emailId')} initialValue={''} name="emailId" rules={[validateRequiredEmailField(translateContent('vehicleDetail.contacts.label.emailId'))]}>
                            <Input placeholder={preparePlaceholderSelect(translateContent('vehicleDetail.contacts.label.emailId'))} disabled={isEditing} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('vehicleDetail.contacts.label.preferredContactTime')} name={'preferredContactTime'} rules={[validateRequiredInputField(translateContent('vehicleDetail.contacts.label.preferredContactTime'))]}>
                            <TimePicker.RangePicker use12Hours size="small" format="h:mm A" />
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
