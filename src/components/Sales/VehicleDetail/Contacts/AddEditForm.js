/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useState } from 'react';
import { Button, Form, Row, Col, Space, Select, Input, Divider, TimePicker, Checkbox } from 'antd';
import { BiLockAlt } from 'react-icons/bi';

import { validateLettersWithWhitespaces, validateEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, validatInstagramProfileUrl, validatFacebookProfileUrl, validatYoutubeProfileUrl, validattwitterProfileUrl } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { CUSTOMER_TYPE } from 'constants/CustomerType';

import style from '../../../common/Common.module.css';

const { Option } = Select;
const AddEditForm = (props) => {
    const { isReadOnly = false, onSaveFormData, contactform, setShowAddEditForm, isViewModeVisible, setIsEditing, typeData, customerType, setContinueWithOldMobNo, uploadImgDocId, formActionType, setUploadImgDocId, handleFormValueChange, setIsAdding } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileLoader, setmobileLoader] = useState(false);
    const [allowedTimingSave, setAllowedTimingSave] = useState(true);

    const disabledProps = { disabled: isReadOnly || formActionType?.viewMode };

    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    const handleNumberValidation = (event) => {
        const Mno = event.target.value;
        const regex = new RegExp('^([5-9]){1}([0-9]){9}$');
        if (Mno?.length === 10 && regex.test(Mno)) {
            setmobileLoader(true);
            setTimeout(() => {
                setIsModalOpen(true);
            }, 1000);
        } else {
            setmobileLoader(false);
        }
    };

    const contactType = [
        { value: 'Follow Up', label: 'Follow Up' },
        { value: 'User', label: 'User' },
    ];
    const days = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' },
    ];

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                <Space direction="vertical">
                    <Row gutter={[20, 0]}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Contact Type" name="contactType" rules={[validateRequiredSelectField('contact type')]}>
                                <Select
                                    placeholder={preparePlaceholderSelect('contact type')}
                                    // {...disabledProps} options={typeData['PURPOSE']} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                    allowClear
                                    options={contactType}
                                ></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Preferred Days For Contact" name="preferredDayForContact" rules={[validateRequiredSelectField('preferred days for contact')]}>
                                <Select
                                    mode="multiple"
                                    placeholder={preparePlaceholderSelect('preferred days for contact')}
                                    // {...disabledProps} options={typeData['PURPOSE']} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                    allowClear
                                    options={days}
                                ></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Mobile Number" name="mobileNumber" rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]}>
                                <Input maxLength={10} onChange={handleNumberValidation} placeholder={preparePlaceholderText('mobile number')} allowClear size="small" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Name" name="name" rules={[validateRequiredInputField('Name'), validateLettersWithWhitespaces('Name')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('name')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="E-mail" initialValue={''} name="emailId" rules={[validateEmailField('E-mail')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('email id')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Preferred Contact Time">
                                <Space>
                                    <Form.Item name={'preferredContactTimeFrom'} rules={[validateRequiredInputField('start time')]}>
                                        <TimePicker placeholder={'Start time*'} use12Hours size="small" format="h:mm A" />
                                    </Form.Item>
                                    <Button className={style.marB20} type="link" style={{ color: '#0b0b0c', pointerEvents: 'none' }}>
                                        -
                                    </Button>
                                    <Form.Item name={'preferredContactTimeTo'} rules={[validateRequiredInputField('end time')]}>
                                        <TimePicker placeholder={'End time*'} use12Hours size="small" format="h:mm A" />
                                    </Form.Item>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                    {!formActionType?.viewMode && (
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Button className={style.marR20} onClick={onSaveFormData} type="primary">
                                    Save
                                </Button>
                                <Button className={style.marB20} onClick={handleCancelFormEdit} ghost type="primary">
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
