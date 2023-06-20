import { React, useEffect, useState } from 'react';

import { Col, Input, Collapse, Row, Button, Space, Form, Select, Upload, message, Checkbox, Divider, Typography } from 'antd';

import { validateRequiredInputField, validatePanField, validateGSTIN, validatFacebookProfileUrl, validattwitterProfileUrl } from 'utils/validation';
import style from 'components/common/Common.module.css';
import styles from 'components/Auth/Auth.module.css';

import Svg from 'assets/images/Filter.svg';
import { BiUserCircle } from 'react-icons/bi';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetails';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const expandIcon = ({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />);

const AddEditForm = ({ form, isVisible, onCloseAction, onFinish, onFinishFailed, appCategoryData, setisVisible, isViewModeVisible, isReadOnly, formData, setFormData, forceUpdate, setFormBtnDisable, formActionType, customerMasterBtnProps }) => {
    const [companyInfoform] = Form.useForm();
    const [uploadCustomerForm] = Form.useForm();
    const [socialProfileForm] = Form.useForm();
    const [keyDetailForm] = Form.useForm();
    const [authorityForm] = Form.useForm();

    const [done, setDone] = useState();
    const [activeKey, setactiveKey] = useState([1]);

    const [FinalFormData, setFinalFormData] = useState({
        // companyInfoform: [],
        // socialProfileForm: [],
        keyDetailForm: {
            accountCode: '',
            accountName: '',
        },
        authorityForm: {
            personName: '',
        },
        // uploadCustomerForm: [],
    });

    const [companyInfoValues, setCompanyInfoValues] = useState();
    const [uploadCustomerFormValues, setUploadCustomerFormValues] = useState();

    const [customerCategory, setCustomerCategory] = useState();

    useEffect(() => {
        setFinalFormData({ ...FinalFormData, keyAccountDetails: companyInfoValues, uploadCustomerForm: uploadCustomerFormValues });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [done]);

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
        console.log('values', values);
    };

    const handleCategoryChange = (value) => {
        setCustomerCategory(value);
    };

    const handleEdit = () => {
        // setIsViewModeVisible(false);
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

    const handleFormFieldChange = () => {
        // authorityForm.validateFields().then((values) => {
        //     const personName = values.personName;
        // });
        // setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        // isVisible: isViewModeVisible,
        formData,
        styles,
        activeKey,
        setactiveKey,
        onChange,
        style,
        handleEdit,
    };
    return (
        <>
            <Form autoComplete="off" form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} onFieldsChange={handleFormFieldChange}>
                {!formActionType?.viewMode ? (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space style={{ display: 'flex' }} direction="vertical" size="middle" className={style.accordianContainer}>
                                <Collapse
                                    defaultActiveKey={['1']}
                                    expandIcon={() => {
                                        if (activeKey.includes(1)) {
                                            return <MinusOutlined className={style.iconsColor} />;
                                        } else {
                                            return <PlusOutlined className={style.iconsColor} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onChange(1)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        header={
                                            <>
                                                <div className={style.alignUser}>
                                                    {/* <BiUserCircle className={style.userCircle} /> */}
                                                    <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Company Information</div>
                                                </div>{' '}
                                            </>
                                        }
                                        key="1"
                                    >
                                        <Divider />

                                        {/* <Form autoComplete="off" layout="vertical" form={companyInfoform}> */}

                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="PAN" initialValue={formData?.panNumber} name="panNumber" rules={[validatePanField('panNumber'), validateRequiredInputField('panNumber')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('PAN')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="GSTIN" initialValue={formData?.gstin} name="gstin" rules={[validateGSTIN('gstin'), validateRequiredInputField('panNumber')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('GSTIN')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Usage/Application Categorization" initialValue={formData?.applicationCategorization} name="applicationCategorization">
                                                    <Select maxLength={50} placeholder={preparePlaceholderText('Usage/Application Categorization')}>
                                                        {appCategoryData.APP_CAT?.map((item) => (
                                                            <Option key={'ct' + item.key} value={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>{' '}
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Usage/Application Sub-Category" initialValue={formData?.applicationSubCategory} name="applicationSubCategory">
                                                    <Select maxLength={50} placeholder={preparePlaceholderText('Usage/Application Sub-Category')}>
                                                        {appCategoryData.APP_SUB_CAT?.map((item) => (
                                                            <Option key={'ct' + item.key} value={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>{' '}
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Customer Category" initialValue={formData?.customerCategory} name="customerCategory">
                                                    <Select maxLength={50} onChange={handleCategoryChange} placeholder={preparePlaceholderText('Customer Category')}>
                                                        {appCategoryData.CUS_CAT?.map((item) => (
                                                            <Option key={'ct' + item.key} value={item.key}>
                                                                {item.value}
                                                            </Option>
                                                        ))}
                                                    </Select>{' '}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {customerCategory == 'CUS_CAT_2' && (
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
                                                        <Form.Item label="Key Role Details" initialValue={formData?.KeyRoleDetails} name="KeyRoleDetails">
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
                                                <div className={style.alignUser}>
                                                    {/* <BiUserCircle className={style.userCircle} /> */}
                                                    <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Social Profiles</div>
                                                </div>{' '}
                                            </>
                                        }
                                    >
                                        <Divider />
                                        {/* <Form form={socialProfileForm} layout="vertical"> */}
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="M1-MMFSL" initialValue={formData?.mmfsl} name="mmfsl">
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
                                                <div className={style.alignUser}>
                                                    {/* <BiUserCircle className={style.userCircle} /> */}
                                                    <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Key Account Details</div>
                                                </div>{' '}
                                            </>
                                        }
                                    >
                                        <Divider />
                                        {/* <Form form={keyDetailForm} layout="vertical" onFieldsChange={handleFormFieldChange}> */}
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Code" initialValue={formData?.accountCode} name="accountCode">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Code')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Name" initialValue={formData?.accountName} name="accountName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Name')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Segment" initialValue={formData?.accountSegment} name="accountSegment">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Segment')} disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Client Name" initialValue={formData?.accountClientName} name="accountClientName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Client Name')} disabled />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Mapping Date" initialValue={formData?.accountMappingDate} name="accountMappingDate">
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
                                                <div className={style.alignUser}>
                                                    {/* <BiUserCircle className={style.userCircle} /> */}
                                                    <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Authority Details(Who Knows Whom)</div>
                                                </div>{' '}
                                            </>
                                        }
                                    >
                                        <Divider />
                                        {/* <Form form={authorityForm} layout="vertical" onFieldsChange={handleFormFieldChange}> */}
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Name Of Person" initialValue={formData?.personName} name="personName" rules={[validateRequiredInputField('authorityRequest.personName')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Name Of Person')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Position" initialValue={formData?.postion} name="postion">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Position')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Company Name" initialValue={formData?.companyName} name="companyName" rules={[validateRequiredInputField('authorityRequest.companyName')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Company Name')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Form.Item label="Remarks" initialValue={formData?.authorityRequest.remarks} name="authorityRequest.remarks">
                                                    <TextArea maxLength={50} placeholder={preparePlaceholderText('Remarks')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* </Form> */}
                                    </Panel>
                                </Collapse>

                                <Collapse
                                    defaultActiveKey={['5']}
                                    expandIcon={() => {
                                        if (activeKey.includes(5)) {
                                            return <MinusOutlined className={style.iconsColor} />;
                                        } else {
                                            return <PlusOutlined className={style.iconsColor} />;
                                        }
                                    }}
                                    activeKey={activeKey}
                                    onChange={() => onChange(5)}
                                    expandIconPosition="end"
                                >
                                    <Panel
                                        key="5"
                                        header={
                                            <>
                                                <div className={style.alignUser}>
                                                    {/* <BiUserCircle className={style.userCircle} /> */}
                                                    <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Upload Customer Form</div>
                                                </div>{' '}
                                            </>
                                        }
                                    >
                                        <Divider />
                                        {/* <Form autoComplete="off" layout="vertical" form={uploadCustomerForm}> */}
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item initialValue={formData?.customerConsent} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="customerConsent">
                                                    <Checkbox className={styles.registered}>I Consent to share my details with Mahindra & Mahindra. </Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            {' '}
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.uploadContainer}>
                                                <Dragger {...uploadProps}>
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
                                            </Col>{' '}
                                        </Row>
                                        {/* </Form> */}
                                    </Panel>
                                </Collapse>

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Button danger onClick={onCloseAction}>
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Button type="primary" htmlType="submit" className={styles.floatRight}>
                                            Save & Proceed
                                        </Button>
                                    </Col>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                ) : (
                    <ViewDetail {...viewProps} />
                )}
            </Form>
        </>
    );
};

export default AddEditForm;
