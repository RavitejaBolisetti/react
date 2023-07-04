/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, DatePicker, Checkbox, Divider, Card } from 'antd';
import Svg from 'assets/images/Filter.svg';

import { validateAadhar, validateDrivingLicenseNo, validateGSTIN, validateRequiredInputField, validateRequiredSelectField, validatePanField, validateVoterId, validatFacebookProfileUrl, validatYoutubeProfileUrl, validattwitterProfileUrl, validatInstagramProfileUrl } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FiDownload } from 'react-icons/fi';

import styles from 'components/common/Common.module.css';
import ViewImageUtils from '../../Common/ViewImageUtils';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const { Dragger } = Upload;

const expandIcon = ({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />);
const AddEditFormMain = (props) => {
    const { formData, appCategoryData, userId, form, uploadDocumentFile, viewDocument, setUploadedFile, handleOnClickCustomerForm, listDocumentShowLoading, isViewDocumentLoading } = props;
    const { isReadOnly = false } = props;
    const [isRead, setIsRead] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [activeKey, setActiveKey] = useState([1]);

    useEffect(() => {
        setCustomer(formData?.customerCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.customerCategory]);

    useEffect(() => {
        form.setFieldsValue({
            ...formData,
        });
        form.setFieldsValue({
            companyName: formData?.authorityDetails?.companyName,
            postion: formData?.authorityDetails?.postion,
            personName: formData?.authorityDetails?.personName,
            remarks: formData?.authorityDetails?.remarks,
        });
        if (formData?.martialStatus === 'S') {
            setIsRead(true);
        } else {
            setIsRead(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onCustomerCategoryChange = (values) => {
        setCustomer(values);
    };

    const handleOnChange = (e) => {
        const values = e;
        if (values === 'S') {
            setIsRead(true);
            form.setFieldsValue({
                weddingAnniversary: null,
            });
        } else {
            setIsRead(false);
        }
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
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const onDrop = (e) => {
        // console.log('Dropped files', e.dataTransfer.files);
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        action: '',
        progress: { strokeWidth: 10 },
        success: { percent: 100 },
        onDrop,
        onChange: (info, event) => {
            const { status } = info.file;
            if (status === 'uploading') {
            } else if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
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

    const ImageProps = {
        viewDocument,
        handleUpload,
        uploadProps,
        formData,
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
                            <Panel header={<Text strong>Individual Information</Text>} key="1">
                                <div className={styles.headerBox}>
                                    <div className={styles.uploadDragger}>
                                        <ViewImageUtils isViewModeVisible={!isViewDocumentLoading} uploadImgTitle={'Profile Picture'} {...ImageProps} />
                                    </div>

                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Date of Birth" name="dateOfBirth">
                                                <DatePicker format="YYYY-MM-DD" disabled={isReadOnly} className={styles.datepicker} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Gender" name="gender" initialValue={formData?.gender} rules={[validateRequiredSelectField('gender')]}>
                                                <Select placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                                    {appCategoryData?.GENDER_CD?.map((item) => (
                                                        <Option key={'ct' + item.key} value={item.key}>
                                                            {item.value}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Maritial Status" initialValue={formData?.martialStatus} name="martialStatus">
                                                <Select placeholder={preparePlaceholderSelect('maritial status')} {...disabledProps} onChange={handleOnChange}>
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
                                            <Form.Item label=" Wedding Anniversary Date" name="weddingAnniversary">
                                                <DatePicker format="YYYY-MM-DD" className={styles.datepicker} disabled={isRead} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Occupation" initialValue={formData?.occuption} name="occuption">
                                                <Select placeholder={preparePlaceholderSelect('occupation')} {...disabledProps}>
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
                                                <Select placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
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
                                                <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('driving license no')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Aadhar No." name="adharNumber" initialValue={formData?.adharNumber} rules={[validateAadhar('aadhar'), validateRequiredInputField('aadhar')]}>
                                                <Input maxLength={12} className={styles.inputBox} placeholder={preparePlaceholderText('aadhar number')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Voter ID" name="voterId" initialValue={formData?.voterId} rules={[validateVoterId('voter id')]}>
                                                <Input maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('voter id')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Vehicle Used" initialValue={formData?.vehicleUsed} name="vehicleUsed">
                                                <Select placeholder={preparePlaceholderSelect('vehicle used')} {...disabledProps}>
                                                    {appCategoryData?.Vehicle_Used?.map((item) => (
                                                        <Option key={'ct' + item.key} value={item.key}>
                                                            {item.value}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Mother Tongue" initialValue={formData?.motherTongue} name="motherTongue">
                                                <Select placeholder={preparePlaceholderSelect('mother tongue')} {...disabledProps}>
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
                                                <Select placeholder={preparePlaceholderSelect('religion')} {...disabledProps}>
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
                                            <Form.Item label="PAN" name="panNumber" initialValue={formData?.panNumber} rules={[validatePanField('pan'), validateRequiredInputField('pan')]}>
                                                <Input maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('pan')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="GSTIN" name="gstin" initialValue={formData?.gstin} rules={[validateGSTIN('gstin'), validateRequiredInputField('gstin')]}>
                                                <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('gstin')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div className={styles.sectionborder}>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Usage/Application Categorization" initialValue={formData?.applicationCategorization} name="applicationCategorization">
                                                    <Select placeholder={preparePlaceholderSelect('usage/application category')} {...disabledProps}>
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
                                                    <Select placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
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
                                                    <Select placeholder={preparePlaceholderSelect('annual income')} {...disabledProps} onChange={onCustomerCategoryChange}>
                                                        {appCategoryData?.CUS_CAT?.map((item) => (
                                                            <Option key={'ct' + item.key} value={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>

                                    {customer === 'CUS_CAT_2' && (
                                        <>
                                            <Divider />
                                            <Row gutter={20}>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                    <Form.Item label="Business Details" initialValue={formData?.businessDetails} name="businessDetails">
                                                        <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('business details')} {...disabledProps} />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                    <Form.Item label="Vehicle Deployment Details" initialValue={formData?.vehicleDeploymentDetails} name="vechileDeploymentDetails">
                                                        <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('vehicle deployment details')} {...disabledProps} />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                    <Form.Item label="Key Role Details" initialValue={formData?.keyRoleDetails} name="keyRoleDetails">
                                                        <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('key role details')} {...disabledProps} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                    <Form.Item label="Major Route Details" initialValue={formData?.majorRouteDetails} name="majorRouteDetails">
                                                        <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('major route details')} {...disabledProps} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </div>
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey={['2']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel header={<Text strong>Social Profile</Text>} key="2">
                                <div className={styles.headerBox}>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="M1-MMFSL" initialValue={formData?.mmfsl} name="mmfsl">
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Facebook Link" initialValue={formData?.facebookLink} name="facebookLink" rules={[validatFacebookProfileUrl('facebookLink')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Twitter Link" initialValue={formData?.twitterLink} name="twitterLink" rules={[validattwitterProfileUrl('twitterLink')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Instagram Link" initialValue={formData?.instagramLink} name="instagramLink" rules={[validatInstagramProfileUrl('instagramLink')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Youtube Channel" initialValue={formData?.youtubeChannelLink} name="youtubeChannelLink" rules={[validatYoutubeProfileUrl('youtubeChannelLink')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Team BHP Link" initialValue={formData?.teamBhpLink} name="teamBhpLink">
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                        </Collapse>
                        <Collapse defaultActiveKey={['3']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel header={<Text strong>Key Account details</Text>} key="3">
                                <div className={styles.headerBox}>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Account Code" name="accountCode" initialValue={formData?.keyAccountDetails?.accountCode}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter account code')} disabled />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Account Name" name="accountName" initialValue={formData?.keyAccountDetails?.accountName}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Account Segement" name="accountSegment" initialValue={formData?.keyAccountDetails?.accountSegment}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} disabled />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Account Client Name" name="accountClientName" initialValue={formData?.keyAccountDetails?.accountClientName}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} disabled />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Account Mapping Date" name="accountMappingDate" initialValue={formData?.keyAccountDetails?.accountMappingDate}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                        </Collapse>
                        <Collapse defaultActiveKey={['4']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel header={<Text strong>Authority Details (Who Knowns Whom)</Text>} key="4">
                                <div className={styles.headerBox}>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Name of Person" initialValue={formData?.authorityDetails?.personName} name="personName" rules={[validateRequiredInputField('Name of Person')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter name of person')} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Position" initialValue={formData?.authorityDetails?.postion} name="postion">
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter position')} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Company Name" initialValue={formData?.authorityDetails?.companyName} name="companyName" rules={[validateRequiredInputField('Company Name')]}>
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Enter company name')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                            <Form.Item label="Remarks" initialValue={formData?.authorityDetails?.remarks} name="remarks">
                                                <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('Remarks')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey={['5']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel header={<Text strong>Upload Customer Form</Text>} key="5">
                                <>
                                    <div className={styles.marB20}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item initialValue={formData?.customerConsent} valuePropName="checked" name="customerConsent">
                                                    <Checkbox> I Consent to share my details with Mahindra & Mahindra</Checkbox>
                                                </Form.Item>
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
                                                    <Button {...disabledProps} type="primary" htmlType="submit" style={{ marginLeft: '30px', marginTop: '16px' }}>
                                                        Upload File
                                                    </Button>
                                                </Dragger>
                                            </Col>
                                        </Row>
                                    </div>
                                    {formData?.customerConsentForm && (
                                        <Row gutter={16}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Card className={styles.viewDocumentStrip} key={viewDocument?.fileName} title={viewDocument?.fileName} extra={<FiDownload />} onClick={handleOnClickCustomerForm}></Card>
                                            </Col>
                                        </Row>
                                    )}
                                </>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
