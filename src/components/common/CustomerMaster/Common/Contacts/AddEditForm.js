/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { useState } from 'react';
import { Button, Form, message, Row, Col, Space, Select, Input, Divider, Checkbox } from 'antd';
import { BiLockAlt } from 'react-icons/bi';
import { CheckOutlined } from '@ant-design/icons';

import { validateLettersWithWhitespaces, validateEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, validatInstagramProfileUrl, validatFacebookProfileUrl, validatYoutubeProfileUrl, validattwitterProfileUrl } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import UploadUtils from './../UploadUtils';

import { ValidateMobileNumberModal } from './ValidateMobileNumberModal';

import style from '../../../Common.module.css';

const { Option } = Select;
const uploadProps = {
    name: 'file',
    multiple: true,
    action: '',
    uploadTitle: 'Upload Your Profile Picture',
    uploadDescription: 'File type should be .png and .jpg and max file size to be 5MB',
    uploadBtnName: 'Upload File',
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const AddEditForm = (props) => {
    const { isReadOnly = false, onFinish, form, setShowAddEditForm, isViewModeVisible, setIsEditing, typeData, formActionType } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileLoader, setmobileLoader] = useState(false);

    const disabledProps = { disabled: isReadOnly || formActionType?.viewMode };

    const handleCancelFormEdit = () => {
        form.resetFields();
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
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setmobileLoader(false);
    };
    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mobile Number Validation',
        closable: false,
        onCloseAction: handleCancel,
    };

    return (
        <>
            <Form form={form} autoComplete="off" onFinish={onFinish} layout="vertical">
                <Space direction="vertical">
                    {/* <Row>
                        <Typography.Text strong>Add New Contact</Typography.Text>
                    </Row> */}
                    <UploadUtils {...uploadProps} isViewModeVisible={isViewModeVisible} />
                    <Divider className={style.contactDivider} />
                    <Row gutter={[20, 0]}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Purpose of Contact" name="purposeOfContact">
                                <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('purpose of contact')} {...disabledProps} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                    {typeData?.PURPOSE?.map((item) => (
                                        <Option key={'ct' + item?.key} value={item?.key}>
                                            {item?.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Mobile Number" name="mobileNumber" rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]}>
                                <Input
                                    maxLength={10}
                                    onChange={handleNumberValidation}
                                    placeholder={preparePlaceholderText('mobile number')}
                                    allowClear
                                    // enterButton="Send OTP"
                                    size="small"
                                    suffix={
                                        <>
                                            {false ? (
                                                <Button loading={mobileLoader} onClick={showModal} type="link">
                                                    Validate
                                                </Button>
                                            ) : (
                                                <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold' }} />
                                            )}
                                            <ValidateMobileNumberModal {...modalProps} />
                                        </>
                                    }
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Alternate Mobile Number" name="alternativeMobileNumber" rules={[validateMobileNoField('alternate mobile number')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('alternate mobile number')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Relation" name="relationCode">
                                <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('purpose of contact')} {...disabledProps} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                    {typeData?.FAMLY_RELTN?.map((item) => (
                                        <Option key={'ct' + item?.key} value={item?.key}>
                                            {item?.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Gender" name="gender" rules={[validateRequiredSelectField('gender')]}>
                                <Select placeholder={preparePlaceholderSelect('gender')} {...disabledProps} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                    {typeData?.GENDER_CD?.map((item) => (
                                        <Option key={'ct' + item?.key} value={item.key}>
                                            {item?.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Title" name="title" rules={[validateRequiredSelectField('title')]}>
                                <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('title')} {...disabledProps} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                    {typeData?.TITLE?.map((item) => (
                                        <Option key={'ct' + item?.key} value={item?.key}>
                                            {item?.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="First Name" name="firstName" rules={[validateRequiredInputField('First Name'), validateLettersWithWhitespaces('First Name')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Middle Name" name="middleName">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('middle name')} rules={[validateLettersWithWhitespaces('middle name')]} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Last/Surname" name="lastName">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('last name')} rules={[validateLettersWithWhitespaces('last name')]} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="E-mail" name="contactEmailId" rules={[validateEmailField('E-mail')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={""} label="Alternate Email ID" name="alternateEmailId" rules={[validateEmailField('E-mail')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('alternate email id')} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Divider />

                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={""} label="Facebook Link" name="facebookId" rules={[validatFacebookProfileUrl('facebook')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('facebook link')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={""} label="Twitter Link" name="twitterId" rules={[validattwitterProfileUrl('twitter')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={""} label="Instagram Link" name="instagramId" rules={[validatInstagramProfileUrl('instagram')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('instagram link')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={""} label="Youtube Channel" name="youTubeChannel" rules={[validatYoutubeProfileUrl('Pincode')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('youtube channel')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={""} label="Team BHP Link" name="teamBhp">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('team BHP link')} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item valuePropName="checked" name="defaultContactIndicator">
                                <Checkbox>Mark As Default</Checkbox>
                            </Form.Item>
                        </Col>
                        <Form.Item hidden initialValue={'fb5b3d4c-05d3-46bd-be8f-4648b26cf588'} name="docId">
                            <Input />
                        </Form.Item>
                    </Row>
                    {!formActionType?.viewMode && (
                        <Space>
                            <Button onClick={onFinish} type="primary">
                                Save
                            </Button>
                            <Button onClick={handleCancelFormEdit} danger>
                                Cancel
                            </Button>
                        </Space>
                    )}
                </Space>
            </Form>
        </>
    );
};

export default AddEditForm;
