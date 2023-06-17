import { useState } from 'react';
import { Button, Form, message, Typography, Row, Col, Space, Select, Input, Divider, Checkbox } from 'antd';
import { BiLockAlt } from 'react-icons/bi';

import { validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, validatInstagramProfileUrl, validatFacebookProfileUrl, validatYoutubeProfileUrl, validattwitterProfileUrl } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import UploadUtils from './UploadUtils';

import { contactPurpose, title, gender } from 'constants/modules/CustomerMaster/individualProfile';
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
    const { isReadOnly = false, onFinish, form, setShowAddEditForm, isViewModeVisible } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileLoader, setmobileLoader] = useState(false);

    const disabledProps = { disabled: isReadOnly };

    const handleCancelFormEdit = () => {
        form.resetFields();
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
                    <Row>
                        <Typography.Text strong>Add New Contact</Typography.Text>
                    </Row>

                    <UploadUtils {...uploadProps} isViewModeVisible={isViewModeVisible} />

                    <Row gutter={[20, 0]}>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Purpose of Contact" name="purposeOfContact">
                                <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('purpose of contact')} {...disabledProps}>
                                    {contactPurpose?.map((item) => (
                                        <Option key={'ct' + item?.key} value={item.key}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Mobile Number" name="contactMobileNumber" rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]}>
                                <Input
                                    maxLength={10}
                                    onChange={handleNumberValidation}
                                    placeholder={preparePlaceholderText('mobile number')}
                                    allowClear
                                    enterButton="Send OTP"
                                    size="small"
                                    suffix={
                                        <>
                                            <Button loading={mobileLoader} onClick={showModal} style={{ marginRight: '-3px', borderColor: '#d9d9d9', color: '#B5B5B6' }}>
                                                Send OTP
                                            </Button>{' '}
                                            <ValidateMobileNumberModal {...modalProps} />
                                        </>
                                    }
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Alternate Mobile Number" name="alternativeMobileNumber">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('alternate mobile number')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Relation" name="relationwithCustomer">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('relation')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Gender" name="gender" rules={[validateRequiredSelectField('gender')]}>
                                <Select placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                    {gender?.map((item) => (
                                        <Option key={'ct' + item?.key} value={item.key}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Title" name="contactNameTitle" rules={[validateRequiredSelectField('title')]}>
                                <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('title')} {...disabledProps}>
                                    {title?.map((item) => (
                                        <Option key={'ct' + item?.key} value={item?.key}>
                                            {item?.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="First Name" name="contactNameFirstName" rules={[validateRequiredInputField('First Name')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Middle Name" name="contactNameMiddleName">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('middle name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Last/Surname" name="contactNameLastName">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="E-mail" name="contactEmail">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Alternate Email ID" name="alternativeEmail">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('alternate email id')} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Divider />

                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Facebook Link" name="facebook" rules={[validatFacebookProfileUrl('facebook')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('facebook link')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Twitter Link" name="twitter" rules={[validattwitterProfileUrl('twitter')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Instagram Link" name="instagram" rules={[validatInstagramProfileUrl('instagram')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('instagram link')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Youtube Channel" name="youtube" rules={[validatYoutubeProfileUrl('Pincode')]}>
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('youtube channel')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Form.Item label="Team BHP Link" name="teamBhp">
                                <Input className={style.inputBox} placeholder={preparePlaceholderText('team BHP link')} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item valuePropName="checked" name="defaultaddress">
                                <Checkbox>Mark As Default</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20} justify="left">
                        <Button htmlType="submit" type="primary">
                            Save
                        </Button>
                        <Button onClick={handleCancelFormEdit} danger>
                            Cancel
                        </Button>
                    </Row>
                </Space>
            </Form>
        </>
    );
};

export default AddEditForm;
