import { Button, Form, Typography, Upload, message, Row, Col, Select, Input, Divider, Checkbox } from 'antd';
import Svg from 'assets/images/Filter.svg';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatInstagramProfileUrl, validatFacebookProfileUrl, validatYoutubeProfileUrl, validattwitterProfileUrl } from 'utils/validation';

import style from '../../../../../sass/drawer_two_pannel.scss';

import { contactPurpose, title, gender } from 'constants/modules/CustomerMaster/individualProfile';

const { Option } = Select;
const { Dragger } = Upload;

const uploadProps = {
    name: 'file',
    multiple: true,
    action: '',
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
    const { isReadOnly = false, onFinish, form } = props;
    const disabledProps = { disabled: isReadOnly };

    const handleResetForm = () => {
        form.resetFields();
    };

    return (
        <>
            <Form form={form} autoComplete="off" onFinish={onFinish} layout="vertical">
                <Row>
                    <Typography.Text strong>Add New Contact</Typography.Text>
                </Row>
                <Row gutter={20} style={{ marginBottom: '20px' }}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Dragger
                            {...uploadProps}
                            style={{
                                margin: '1.5rem 0 2px0 0',
                                background: '#F2F2F2',
                                border: '1px dashed #B5B5B5',
                                borderRadius: '6px',
                                minHeight: '172px',
                                padding: '1rem 0 0 0',
                            }}
                        >
                            <p className="ant-upload-drag-icon" style={{ textAlign: 'center' }}>
                                <img src={Svg} alt="" />
                            </p>
                            <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '600', fontSize: '18px', lineHeight: '23px', color: '#0B0B0C' }}>
                                Upload Your Profile Picture
                            </p>
                            <Typography.Text>File type should be .png and .jpg and max file size to be 5MB</Typography.Text>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: 'center' }}>
                                    <Button danger>Upload File</Button>
                                </Col>
                            </Row>
                        </Dragger>
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Purpose of Contact" name="purposeOfContact">
                            <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('purpose of contact')} {...disabledProps}>
                                {contactPurpose?.map((item) => (
                                    <Option key={'poc' + item?.key} value={item.key}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Mobile Number" name="contactMobileNumber">
                            <Input className={style.inputBox} suffix={<Button>Send OTP</Button>} placeholder={preparePlaceholderText('mobile number')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Alternate Mobile Number" name="alternativeMobileNumber">
                            <Input className={style.inputBox} placeholder={preparePlaceholderText('alternate mobile number')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Designation" name="designation">
                            <Input className={style.inputBox} placeholder={preparePlaceholderText('relation')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Gender" name="gender" rules={[validateRequiredSelectField('gender')]}>
                            <Select placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                {gender?.map((item) => (
                                    <Option key={'g' + item?.key} value={item.key}>
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
                                    <Option key={'title' + item?.key} value={item?.key}>
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
                </Row>

                <Divider />

                <Row gutter={20}>
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
                </Row>
                <Row>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item valuePropName="checked" name="defaultaddress">
                            <Checkbox>Mark As Default</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="left">
                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Button htmlType="submit" type="primary">
                            Save
                        </Button>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Button onClick={handleResetForm} danger>
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AddEditForm;
