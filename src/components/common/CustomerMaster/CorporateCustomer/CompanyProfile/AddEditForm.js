/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { React, useEffect, useState } from 'react';
import { Col, Input, Collapse, Row, Button, Space, Form, Select, Upload, message, Checkbox, Divider, Card } from 'antd';
import { validateRequiredInputField, validateLettersWithWhitespaces, validatePanField, validateGSTIN, validatFacebookProfileUrl, validattwitterProfileUrl } from 'utils/validation';

import { FiDownload, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { convertToUpperCase } from 'utils/convertToUpperCase';
import { expandIcon } from 'utils/accordianExpandIcon';
import { UploadUtil } from 'utils/Upload';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { appCategoryData, userId, formData, form, handleOnClick } = props;
    const { handleFormValueChange, fileList, setFileList, uploadedFile, emptyList, setEmptyList, uploadedFileName, setUploadedFileName, uploadListShowLoading, uploadFile, setUploadedFile, setAppCustomerCategory, setAppSubCategory, customerCategory, setCustomerCategory, viewDocument } = props;

    const [activeKey, setactiveKey] = useState([1]);

    useEffect(() => {
        form.setFieldsValue({
            ...formData,
        });
        form.setFieldsValue({
            gstin: formData?.gstinNumber,
            personName: formData?.authorityDetails?.personName,
            postion: formData?.authorityDetails?.postion,
            companyName: formData?.authorityDetails?.companyName,
            remarks: formData?.authorityDetails?.remarks,
        });
        setCustomerCategory(formData?.customerCategory);
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

    const handleAppCategoryChange = (value) => {
        setAppCustomerCategory(value);
    };

    const handleAppSubCategoryChange = (value) => {
        setAppSubCategory(value);
    };

    const handleCategoryChange = (value) => {
        setCustomerCategory(value);
    };

    const consentFormProps = {
        isReplaceEnabled: false,
        fileList,
        setFileList,
        setUploadedFile,
        uploadedFile,
        emptyList,
        setEmptyList,
        uploadedFileName,
        setUploadedFileName,
        handleFormValueChange,

        uploadButtonName: 'Upload File',
        messageText: (
            <>
                Click or drop your file here to upload the signed and <br />
                scanned customer form
            </>
        ),
        validationText: <>File type should be png, jpg or pdf and max file size to be 5Mb</>,
        supportedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'],
        maxSize: 5,
        single: true,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} direction="vertical" size="middle" className={styles.accordianContainer}>
                        <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                            <Panel header="Company Information" key="1">
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="PAN" initialValue={formData?.panNumber} name="panNumber" rules={[validatePanField('pan'), validateRequiredInputField('pan')]}>
                                            <Input maxLength={50} onInput={convertToUpperCase} placeholder={preparePlaceholderText('PAN')} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="GSTIN" initialValue={formData?.gstinNumber} name="gstin" rules={[validateGSTIN('gstin'), validateRequiredInputField('gstin')]}>
                                            <Input maxLength={50} onInput={convertToUpperCase} placeholder={preparePlaceholderText('GSTIN')} />
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
                                                <Form.Item label="Vehicle Deployment Details" initialValue={formData?.vechileDeploymentDetails} name="vechileDeploymentDetails">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Vehicle Deployment Details')} />
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
                            <Panel key="2" header="Social Profiles">
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
                            <Panel key="3" header="Key Account Details">
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
                            <Panel key="4" header="Authority Details(Who Knows Whom)">
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

                        <Collapse defaultActiveKey={['5']} expandIcon={expandIcon} expandIconPosition="end">
                            <Panel key="5" header="Upload Customer Form">
                                <Divider />
                                <Space direction="vertical">
                                    <Form.Item initialValue={formData?.customerConsent} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="customerConsent">
                                        <Checkbox>I Consent to share my details with Mahindra & Mahindra. </Checkbox>
                                    </Form.Item>
                                    <UploadUtil key={2} {...consentFormProps} />
                                </Space>
                                {formData?.customerFormDocId && (
                                    <>
                                        <div className={styles.viewDrawerContainer}>
                                            <Card
                                                className={styles.viewDocumentStrip}
                                                key={viewDocument?.fileName}
                                                title={viewDocument?.fileName}
                                                extra={
                                                    <>
                                                        <FiDownload onClick={handleOnClick} />
                                                        {/* {!viewMode && <FiTrash onClick={() => deleteFile(uploadData)} />} */}
                                                    </>
                                                }
                                            ></Card>
                                        </div>
                                    </>
                                )}
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
