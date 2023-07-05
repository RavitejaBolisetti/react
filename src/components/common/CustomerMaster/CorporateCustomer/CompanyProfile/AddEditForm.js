/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { React, useEffect, useState } from 'react';
import { Col, Input, Collapse, Row, Button, Space, Form, Select, Upload, message, Checkbox, Divider, Typography, Card } from 'antd';

import { validateRequiredInputField, validateLettersWithWhitespaces, validatePanField, validateGSTIN, validatFacebookProfileUrl, validattwitterProfileUrl } from 'utils/validation';

import Svg from 'assets/images/Filter.svg';
import { FiDownload, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { appCategoryData, userId, formData, form, handleOnClick } = props;
    const { uploadListShowLoading, uploadFile, setUploadedFile, setAppCustomerCategory, setAppSubCategory, customerCategory, setCustomerCategory, viewDocument } = props;

    const [activeKey, setactiveKey] = useState([1]);

    useEffect(() => {
        form.setFieldsValue({
            ...formData,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

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

    const onDrop = (e) => {
        // console.log('Dropped files', e.dataTransfer.files);
    };

    const uploadProps = {
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            previewIcon: <FiDownload onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },

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
            setIsLoading: uploadListShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadFile(requestData);
    };

    const handleAppCategoryChange = (value) => {
        setAppCustomerCategory(value);
    };

    const handleAppSubCategoryChange = (value) => {
        setAppSubCategory(value);
    };

    const handleCategoryChange = (value) => {
        setCustomerCategory(value);
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} direction="vertical" size="middle" className={styles.accordianContainer}>
                        <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                            <Panel
                                header={
                                    <>
                                        <div className={styles.alignUser}>
                                            <div style={{ paddingLeft: '10px', paddingTop: '3px' }}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Company Information
                                                </Text>
                                            </div>
                                        </div>{' '}
                                    </>
                                }
                                key="1"
                            >
                                <Divider />

                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="PAN" initialValue={formData?.panNumber} name="panNumber" rules={[validatePanField('panNumber'), validateRequiredInputField('panNumber')]}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('PAN')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="GSTIN" initialValue={formData?.gstinNumber} name="gstin" rules={[validateGSTIN('gstin'), validateRequiredInputField('panNumber')]}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('GSTIN')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Usage/Application Categorization" initialValue={formData?.applicationCategorization} name="applicationCategorization">
                                            <Select maxLength={50} onChange={handleAppCategoryChange} placeholder={preparePlaceholderSelect('Usage/Application Categorization')}>
                                                {appCategoryData.APP_CAT?.map((item) => (
                                                    <Option key={'ap' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Usage/Application Sub-Category" initialValue={formData?.applicationSubCategory} name="applicationSubCategory">
                                            <Select maxLength={50} onChange={handleAppSubCategoryChange} placeholder={preparePlaceholderSelect('Usage/Application Sub-Category')}>
                                                {appCategoryData.APP_SUB_CAT?.map((item) => (
                                                    <Option key={'sc' + item.key} value={item.key}>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Customer Category" initialValue={formData?.customerCategory} name="customerCategory">
                                            <Select maxLength={50} onChange={handleCategoryChange} placeholder={preparePlaceholderSelect('Customer Category')}>
                                                {appCategoryData.CUS_CAT?.map((item) => (
                                                    <Option key={'ct' + item.key} value={item?.key}>
                                                        {item?.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {customerCategory === 'CUS_CAT_2' && (
                                    <>
                                        <Divider />
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Business Details" initialValue={formData?.businessDetails} name="businessDetails">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Business Details')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Vechicle Deployment Details" initialValue={formData?.vechileDeploymentDetails} name="vechileDeploymentDetails">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Vechicle Deployment Details')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Key Role Details" initialValue={formData?.keyRouteDetails} name="keyRoleDetails">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Key Role Details')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Major Route Details" initialValue={formData?.majorRouteDetails} name="majorRouteDetails">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Major Route Details')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                                {/* </Form> */}
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey={['2']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel
                                key="2"
                                header={
                                    <>
                                        <div className={styles.alignUser}>
                                            <div style={{ paddingLeft: '10px', paddingTop: '3px' }}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Social Profiles
                                                </Text>
                                            </div>
                                        </div>
                                    </>
                                }
                            >
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="M1-MMFSL" initialValue={formData?.m1mmfsl} name="mmfsl">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Facebook Link" initialValue={formData?.facebookLink} name="facebookLink" rules={[validatFacebookProfileUrl('facebookLink')]}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Twitter Link" initialValue={formData?.twitterLink} name="twitterLink" rules={[validattwitterProfileUrl('twitterLink')]}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* </Form> */}
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey={['3']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel
                                key="3"
                                header={
                                    <>
                                        <div className={styles.alignUser}>
                                            <div style={{ paddingLeft: '10px', paddingTop: '3px' }}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Key Account Details
                                                </Text>
                                            </div>
                                        </div>{' '}
                                    </>
                                }
                            >
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Code" initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountCode} name="accountCode">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Account Code')} disabled />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Name" initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountName} name="accountName">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Account Name')} disabled />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Segment" initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountSegment} name="accountSegment">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Account Segment')} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Client Name" initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountClientName} name="accountClientName">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Account Client Name')} disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Account Mapping Date" initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountMappingDate} name="accountMappingDate">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Account Mapping Date')} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* </Form> */}
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey={['4']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel
                                key="4"
                                header={
                                    <>
                                        <div className={styles.alignUser}>
                                            <div style={{ paddingLeft: '10px', paddingTop: '3px' }}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    {' '}
                                                    Authority Details(Who Knows Whom)
                                                </Text>
                                            </div>
                                        </div>
                                    </>
                                }
                            >
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Name Of Person" initialValue={formData?.authorityDetails && formData?.authorityDetails?.personName} name="personName" rules={[validateRequiredInputField('Person Name'), validateLettersWithWhitespaces('Person Name')]}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Name Of Person')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Position" initialValue={formData?.authorityDetails && formData?.authorityDetails?.postion} name="postion">
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Position')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Company Name" initialValue={formData?.authorityDetails && formData?.authorityDetails?.companyName} name="companyName" rules={[validateRequiredInputField('Company Name')]}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('Company Name')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Remarks" initialValue={formData?.authorityDetails && formData?.authorityDetails?.remarks} name="remarks">
                                            <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('Remarks')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* </Form> */}
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey={['5']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(5)} expandIconPosition="end">
                            <Panel
                                key="5"
                                header={
                                    <>
                                        <div className={styles.alignUser}>
                                            <div style={{ paddingLeft: '10px', paddingTop: '3px' }}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Upload Customer Form
                                                </Text>
                                            </div>
                                        </div>
                                    </>
                                }
                            >
                                <Divider />
                                <div className={styles.uploadContainer}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item initialValue={formData?.customerConsent} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="customerConsent">
                                                <Checkbox className={styles.registered}>I Consent to share my details with Mahindra & Mahindra. </Checkbox>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.uploadContainer}>
                                            <Dragger customRequest={handleUpload} {...uploadProps}>
                                                <p className="ant-upload-drag-icon" style={{ textAlign: 'center' }}>
                                                    <img src={Svg} alt="" />
                                                </p>

                                                <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '500', fontSize: '14px', lineHeight: '23px', color: '#0B0B0C' }}>
                                                    Click or drop your file here to upload the signed and <br />
                                                    scanned customer form.
                                                </p>

                                                <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '400', fontSize: '12px', lineHeight: '23px', color: '#0B0B0C' }}>
                                                    File type should be png, jpg or pdf and max file size to be 5Mb
                                                </p>
                                                <Button danger>Upload File</Button>
                                            </Dragger>
                                            {formData?.customerFormDocId && (
                                                <>
                                                    <Card className={styles.viewDocumentStrip} key={viewDocument?.fileName} title={viewDocument?.fileName} extra={<FiDownload />} onClick={handleOnClick}></Card>
                                                    <Form.Item hidden="true" label="Document" initialValue={formData?.customerFormDocId} name="customerFormDocId">
                                                        <Input maxLength={50} placeholder={preparePlaceholderText('Document')} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
