/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, DatePicker, Checkbox, Empty, Divider } from 'antd';
import Svg from 'assets/images/Filter.svg';
import dayjs from 'dayjs';

import { validateAadhar, validateDrivingLicenseNo, validateGSTIN, validateRequiredInputField, validateRequiredSelectField, validatePanField, validateVoterId } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { religion, tongue, vehicle } from 'constants/modules/CustomerMaster/individualProfile';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';
import { FiTrash } from 'react-icons/fi';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const { Dragger } = Upload;

const AddEditFormMain = (props) => {
    const { formData, appCategoryData, userId, uploadDocumentFile, listDocumentShowLoading } = props;
    const { isReadOnly = false } = props;
    const [customer, setCustomer] = useState(false);

    const [activeKey, setactiveKey] = useState([1]);

    console.log('formData', formData);

    const onCustomerCategoryChange = (values) => {
        setCustomer(values);
    };
    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
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

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listDocumentShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadDocumentFile(requestData);
    };

    const showUploadList = {
        showRemoveIcon: false,
        showPreviewIcon: true,
        showDownloadIcon: true,
        previewIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    };

    const disabledProps = { disabled: isReadOnly };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space direction="vertical" size="small" className={styles.accordianContainer}>
                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(1)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(1)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                        Individual Information
                                    </Text>
                                }
                                key="1"
                            >
                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <div className={styles.uploadDragger}>
                                            <Dragger customRequest={handleUpload} {...uploadProps}>
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
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Date of Birth" initialValue={dayjs(formData?.dateOfBirth)} name="dateOfBirth" rules={[validateRequiredInputField('date')]}>
                                            <DatePicker format="DD-MM-YYYY" disabled={isReadOnly} className={styles.datepicker} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Gender" name="gender" initialValue={formData?.gender} rules={[validateRequiredSelectField('gender')]}>
                                            <Select value={null} placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                                {appCategoryData?.GENDER_CD?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Maritial Status" initialValue={formData?.maritialStatus} name="martialStatus">
                                            <Select value={null} placeholder={preparePlaceholderSelect('maritial status')} {...disabledProps}>
                                                {appCategoryData?.MARITAL_STATUS?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label=" Wedding Anniversary Date" initialValue={formData?.weddingAnniversary} name="weddingAnniversary">
                                            <DatePicker className={styles.datepicker} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Occupation" initialValue={formData?.occuption} name="occuption">
                                            <Select value={null} placeholder={preparePlaceholderSelect('occupation')} {...disabledProps}>
                                                {appCategoryData?.OCC_TYPE?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Annual Income" initialValue={formData?.annualIncome} name="annualIncome">
                                            <Select value={null} placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
                                                {appCategoryData?.Annual_Income?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Driving License No" name="drivingLicenseNumber" initialValue={formData?.drivingLicenseNumber} rules={[validateDrivingLicenseNo('driving license no ')]}>
                                            <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('driving license no')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Aadhar No." name="adharNumber" initialValue={formData?.adharNumber} rules={[validateAadhar('aadhar')]}>
                                            <Input value={null} maxLength={12} className={styles.inputBox} placeholder={preparePlaceholderText('aadhar number')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Voter ID" name="voterId" initialValue={formData?.voterId} rules={[validateVoterId('voter id')]}>
                                            <Input value={null} maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('voter id')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Vehicle Used" initialValue={formData?.vehicleUsed} name="vehicleUsed">
                                            <Select value={null} placeholder={preparePlaceholderSelect('vehicle used')} {...disabledProps}>
                                                {appCategoryData?.Vehicle_Used?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Mother Tongue" initialValue={formData?.preferredLamguage} name="preferredLanguage">
                                            <Select value={null} placeholder={preparePlaceholderSelect('mother tongue')} {...disabledProps}>
                                                {appCategoryData?.MOTHER_TOUNGE?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Religion" initialValue={formData?.religion} name="religion">
                                            <Select value={null} placeholder={preparePlaceholderSelect('religion')} {...disabledProps}>
                                                {appCategoryData?.RELGION?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="PAN" name="panNumber" initialValue={formData?.panNumber} rules={[validatePanField('pan')]}>
                                            <Input value={null} maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('pan')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="GSTIN" name="gstin" initialValue={formData?.gstin} rules={[validateGSTIN('gstin')]}>
                                            <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('gstin')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Usage/Application Categorization" initialValue={formData?.applicationcategorization} name="applicationCategorization">
                                            <Select value={null} placeholder={preparePlaceholderSelect('usage/application category')} {...disabledProps}>
                                                {appCategoryData?.APP_CAT?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Usage/Application Sub-Category" initialValue={formData?.applicationSubCategory} name="applicationSubCategory">
                                            <Select value={null} placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
                                                {appCategoryData?.APP_SUB_CAT?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Customer Category" initialValue={formData?.customerCategory} name="customerCategory">
                                            <Select value={null} placeholder={preparePlaceholderSelect('annual income')} {...disabledProps} onChange={onCustomerCategoryChange}>
                                                {appCategoryData?.CUS_CAT?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {customer === 'CUS_CAT_2' && (
                                    <>
                                        <Divider />
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Business Details" initialValue={formData?.businessDetails} name="businessDetails">
                                                    <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('business details')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Vehicle Deployment Details" initialValue={formData?.vehicleDeploymentDetails} name="vechileDeploymentDetails">
                                                    <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('vehicle deployment details')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Key Role Details" initialValue={formData?.keyRoleDetails} name="keyRoleDetails">
                                                    <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('key role details')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Major Route Details" initialValue={formData?.majorRouteDetails} name="majorRouteDetails">
                                                    <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('major route details')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Panel>
                        </Collapse>

                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(2)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(2)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                        Social Profile
                                    </Text>
                                }
                                key="2"
                            >
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="M1-MMFSL" initialValue={formData?.mmfsl} name="mmfsl">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Facebook Link" initialValue={formData?.facebookLink} name="facebookLink">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Twitter Link" initialValue={formData?.twitterLink} name="twitterLink">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Instagram Link" initialValue={formData?.instagramLink} name="instagramLink">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Youtube Channel" initialValue={formData?.youtubeChannelLink} name="youtubeChannelLink">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Team BHP Link" initialValue={formData?.teamBhpLink} name="teamBhpLink">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(3)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(3)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                        Key Account details
                                    </Text>
                                }
                                key="3"
                            >
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Code" name="accountCode" initialValue={formData?.accountCode}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter account code')} disabled />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Name" name="accountName" initialValue={formData?.accountName}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Segement" name="accountSegment" initialValue={formData?.accountSegment}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Client Name" name="accountClientName" initialValue={formData?.accountClientName}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} disabled />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Mapping Date" name="accountMappingDate" initialValue={formData?.accountMappingDate}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(4)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(4)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                        Authority Details (Who Knowns Whom)
                                    </Text>
                                }
                                key="4"
                            >
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Name of Person" initialValue={formData?.personName} name="personName">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter name of person')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Position" initialValue={formData?.position} name="position">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter position')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Company Name" initialValue={formData?.companyName} name="companyName">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter company name')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Remarks" initialValue={formData?.remarks} name="remarks">
                                            <TextArea placeholder={preparePlaceholderText('remarks')} showCount maxLength={100} autoSize={{ minRows: 1, maxRows: 1 }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>

                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(5)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(5)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                        Upload Customer Form
                                    </Text>
                                }
                                key="5"
                            >
                                <Form autoComplete="off" layout="vertical">
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Checkbox value="customerConsent" name="customerConsent">
                                                I Consent to share my details with Mahindra & Mahindra.{' '}
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Dragger {...uploadProps} customRequest={handleUpload} className={styles.uploadContainer}>
                                                <div>
                                                    <img src={Svg} alt="" />
                                                </div>
                                                <div className={styles.uploadtext}>
                                                    Click or drop your file here to upload the signed and <br /> scanned customer form.
                                                </div>
                                                <div>File type should be png, jpg or pdf and max file size to be 5Mb</div>
                                                <Button {...disabledProps} type="primary" style={{ marginLeft: '30px', marginTop: '16px' }}>
                                                    Upload File
                                                </Button>
                                            </Dragger>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
