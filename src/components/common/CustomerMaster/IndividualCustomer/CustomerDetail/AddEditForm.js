/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Col, Input, Form, Row, Select, Space, Typography, Card, Divider, Switch, Button, Empty, message } from 'antd';

import { FaRegUserCircle } from 'react-icons/fa';
import { CheckOutlined } from '@ant-design/icons';

import { validateEmailField, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';
import { useState } from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { FiTrash } from 'react-icons/fi';
import { BiLockAlt, BiTimeFive } from 'react-icons/bi';
import { ValidateMobileNumberModal } from './ValidateMobileNumberModal';
import { NameChangeHistory } from './NameChangeHistory';
import { ViewDetail } from './ViewDetail';

const { Text } = Typography;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { onCloseAction, form, isHtmltype, onChange, formActionType: { viewMode } = undefined, onFinish, onFinishFailed, configurableTypedata, formData, corporateLovData } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileLoader, setmobileLoader] = useState(false);
    const { buttonData, setButtonData } = props;
    const [isEnabled, setIsEnabled] = useState(false);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const Random = () => {
        return;
    };

    const handleToggle = () => {
        setIsEnabled(!isEnabled);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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
    const showUploadList = {
        showRemoveIcon: false,
        showPreviewIcon: true,
        showDownloadIcon: true,
        previewIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    };
    const uploadProps = {
        name: 'file',
        multiple: false,
        action: '',
        progress: { strokeWidth: 10 },
        success: { percent: 100 },

        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const viewProps = {
        isVisible: viewMode,
        formData,
        onChange,
        styles,
        onCloseAction,
    };
    const changeHistoryClose = () => {
        setIsHistoryVisible(false);
    };

    const changeHistoryProps = {
        isVisible: isHistoryVisible,
        onCloseAction: changeHistoryClose,
    };

    return (
        <Form id="form" onFinish={onFinish} form={form} autoComplete="off" layout="vertical" onFieldsChange={handleFormFieldChange} onValuesChange={handleFormValueChange} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                <Card
                                    header={
                                        <div className={styles.alignUser}>
                                            <FaRegUserCircle className={styles.userCircle} />
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Customer Information
                                            </Text>
                                            <Button htmlType="link">View History</Button>
                                        </div>
                                    }
                                >
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                                                <Input
                                                    placeholder={preparePlaceholderText('mobile number')}
                                                    maxLength={10}
                                                    onChange={handleNumberValidation}
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
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Customer Type" initialValue={formData?.customerType} name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                                                <Select placeholder="Select" loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CUST_TYPE']}></Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <div className={styles.cardInsideBox}>
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Text style={{ fontSize: '16px' }} strong>
                                                    Customer Name
                                                </Text>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                                                <Button type="link" icon={<BiTimeFive />}>
                                                    View History
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Divider />
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                <Form.Item label="Title" initialValue={formData?.titleCode} name="titleCode" data-testid="title" rules={[validateRequiredSelectField('title')]}>
                                                    <Select placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['TITLE']}></Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Form.Item label="First Name" initialValue={formData?.firstName} name="firstName" data-testid="firstName" rules={[validateRequiredInputField('first name')]}>
                                                    <Input placeholder={preparePlaceholderText('first name')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                                <Form.Item label="Middle Name" initialValue={formData?.middleName} name="middleName" data-testid="middleName">
                                                    <Input placeholder={preparePlaceholderText('middle name')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                                <Form.Item label="Last Name" initialValue={formData?.lastName} name="lastName" data-testid="lastName">
                                                    <Input placeholder={preparePlaceholderText('last name')} />
                                                </Form.Item>
                                            </Col>
                                            {true && (
                                                <>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.uploadDragger}>
                                                            <Dragger showUploadList={showUploadList} {...uploadProps}>
                                                                <Empty
                                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                                    imageStyle={{
                                                                        height: 100,
                                                                    }}
                                                                    description={
                                                                        <>
                                                                            <span>
                                                                                Click or drop your file here to upload the signed and <br />
                                                                                scanned customer form.
                                                                            </span>
                                                                            <span>
                                                                                <br />
                                                                                File type should be png, jpg or pdf and max file size to be 5Mb
                                                                            </span>
                                                                        </>
                                                                    }
                                                                />

                                                                <Button type="primary">Upload File</Button>
                                                            </Dragger>
                                                        </div>
                                                    </Col>
                                                    <Row gutter={20} style={{ marginTop: '10px', marginLeft: '3px' }}>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <Button type="primary" htmlType={isHtmltype ? 'submit' : 'button'} onClick={isHtmltype ? Random : onFinish} className={styles.floatRight}>
                                                                Save
                                                            </Button>
                                                        </Col>
                                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                            <Button danger>Cancel</Button>
                                                        </Col>
                                                    </Row>
                                                </>
                                            )}
                                        </Row>
                                    </div>
                                    <Divider />

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Email ID" initialValue={formData?.emailId} name="emailId" data-testid="emailId" rules={[validateEmailField('email id')]}>
                                                <Input placeholder={preparePlaceholderText('email id')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Do you want to contacted over whatsapp?" initialValue={formData?.contactOnWhatsAppAllowed} name="contactOnWhatsAppAllowed" data-testid="contactedOverWhatsapp">
                                                <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={handleToggle} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Want to use Mobile no as whatsapp no?" initialValue={formData?.contactAsMobileOnWhatApp} name="contactAsMobileOnWhatApp" data-testid="useMobileNumber">
                                                <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Whatsapp Number" initialValue={formData?.whatsAppNumber} name="whatsAppNumber" data-testid="whatsappNumber" rules={[validateMobileNoField('whatsapp number')]}>
                                                <Input placeholder={preparePlaceholderText('whatsapp number')} disabled={!isEnabled} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Type" initialValue={formData?.corporateType} name="corporateType" data-testid="corporateType">
                                                <Select placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_TYPE']} allowClear></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Name" initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                    {corporateLovData?.map((item) => (
                                                        <Option key={item?.key} value={item?.key}>
                                                            {item?.key}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.corporateCode} label="Corporate Code" name="corporateCode" data-testid="corporate code">
                                                <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Corporate Category" initialValue={formData?.corporateCategory} name="corporateCategory" data-testid="corporateCategory">
                                                <Select disabled={false} loading={false} placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['CORP_CATE']} allowClear></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Membership Type" initialValue={formData?.membershipType} name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                                                <Select disabled={false} loading={false} placeholder="Select" fieldNames={{ label: 'value', value: 'key' }} options={configurableTypedata['MEM_TYPE']} allowClear></Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Button htmlType="submit" danger>
                                            Submit
                                        </Button>
                                    </Row>
                                </Card>
                            </Space>
                        </Col>
                    </Row>
                    <NameChangeHistory {...changeHistoryProps} />
                </>
            )}
        </Form>
    );
};

export const AddEditForm = AddEditFormMain;
