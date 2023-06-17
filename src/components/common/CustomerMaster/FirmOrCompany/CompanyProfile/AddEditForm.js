import { React, useEffect, useState } from 'react';

import { Col, Input, Collapse, Row, Button, Space, Form, Select, Upload, message, Checkbox, Divider, Typography } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import style from 'components/common/Common.module.css';
import styles from 'components/Auth/Auth.module.css';

import Svg from 'assets/images/Filter.svg';
import { BiUserCircle } from 'react-icons/bi';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetails';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';
const { Text } = Typography;

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const expandIcon = ({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />);

const AddEditForm = ({ form, isVisible, onCloseAction, setisVisible, isViewModeVisible, isReadOnly, formData, setFormData, forceUpdate, setFormBtnDisable ,formActionType}) => {
    const [companyInfoform] = Form.useForm();
    const [uploadCustomerForm] = Form.useForm();
    const [done, setDone] = useState();
    const [activeKey, setactiveKey] = useState([1]);

    const [FinalFormData, setFinalFormData] = useState({
        companyInfoform: [],
        uploadCustomerForm: [],
    });

    const [companyInfoValues, setCompanyInfoValues] = useState();
    const [uploadCustomerFormValues, setUploadCustomerFormValues] = useState();

    useEffect(() => {
        setFinalFormData({ ...FinalFormData, companyInfoform: companyInfoValues, uploadCustomerForm: uploadCustomerFormValues });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(formActionType,'disabled={formActionType ')
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

    const onFinish = () => {
        const companyInfoValues = companyInfoform.getFieldsValue();

        const uploadCustomerFormValues = uploadCustomerForm.getFieldsValue();

        companyInfoform
            .validateFields()
            .then(() => {
                uploadCustomerForm
                    .validateFields()
                    .then(() => {
                        setCompanyInfoValues(companyInfoValues);
                        setUploadCustomerFormValues(uploadCustomerFormValues);
                        setDone(!done);
                    })
                    .catch(() => {
                        console.log('error');
                        setactiveKey([3]);
                    });
            })
            .catch(() => {
                setactiveKey([1]);
            });
    };

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        style,
    };
    return (
        <>
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
                                        <div className={styles.alignUser}>
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Company Information
                                            </Text>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Divider />

                                    <Form autoComplete="off" layout="vertical" form={companyInfoform}>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="PAN" initialValue={formData?.panNumber} name="panNumber">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('PAN')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="GSTIN" initialValue={formData?.gstinNumber} name="gstinNumber">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('GSTIN')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Usage/Application Categorization" name="categorization" initialValue={formData?.categorization}>
                                                    <Select maxLength={50} placeholder={preparePlaceholderText('Usage/Application Categorization')}>
                                                        <Option>Select</Option>
                                                    </Select>{' '}
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Usage/Application Sub-Category" name="category" initialValue={formData?.category}>
                                                    <Select maxLength={50} placeholder={preparePlaceholderText('Usage/Application Sub-Category')}>
                                                        <Option>Select</Option>
                                                    </Select>{' '}
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Customer Category" name="customer" initialValue={formData?.customer}>
                                                    <Select maxLength={50} placeholder={preparePlaceholderText('Customer Category')}>
                                                        <Option>Select</Option>
                                                    </Select>{' '}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Divider />
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Business Details" initialValue={formData?.business} name="business">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Business Details')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Vehicle Deployment Details" initialValue={formData?.vehicle} name="vehicle">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Vehicle Deployment Details')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Key Role Details" initialValue={formData?.keyRole} name="keyRole">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Key Role Details')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Major Route Details" initialValue={formData?.route} name="route">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Major Route Details')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>

                            <Collapse defaultActiveKey={['2']} expandIcon={expandIcon} expandIconPosition="end">
                                <Panel
                                    key="2"
                                    header={
                                        <>
                                            <div className={styles.alignUser}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Social Profiles
                                                </Text>
                                            </div>
                                        </>
                                    }
                                >
                                    <Divider />
                                    <Form form={form} layout="vertical">
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="M1-MMFSL" initialValue={formData?.m1mmfsl} name="m1mmfsl">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Facebook Link" initialValue={formData?.facebookId} name="facebookId">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Twitter Link" initialValue={formData?.twitterId} name="twitterId">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey={['2']} expandIcon={expandIcon} expandIconPosition="end">
                                <Panel
                                    key="2"
                                    header={
                                        <>
                                            <div className={styles.alignUser}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Key Account details
                                                </Text>
                                            </div>
                                        </>
                                    }
                                >
                                    <Divider />
                                    <Form form={form} layout="vertical">
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Code" initialValue={formData?.accountCode} name="accountCode">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Code')} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Name" initialValue={formData?.accountName} name="accountName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Name')} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Segment" initialValue={formData?.segment} name="segment">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Segment')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Client Name" initialValue={formData?.clientName} name="clientName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Client Name')} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Mapping Date" initialValue={formData?.mappingData} name="mappingData">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Account Mapping Date')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey={['2']} expandIcon={expandIcon} expandIconPosition="end">
                                <Panel
                                    key="2"
                                    header={
                                        <>
                                            <div className={styles.alignUser}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Authority Details(Who Knows Whom)
                                                </Text>
                                            </div>
                                        </>
                                    }
                                >
                                    <Divider />
                                    <Form form={form} layout="vertical">
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Name Of Person" initialValue={formData?.name} name="name">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Name Of Person')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Position" initialValue={formData?.position} name="position">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Position')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Company Name" initialValue={formData?.companyName} name="companyName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Company Name')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Form.Item label="Remarks" initialValue={formData?.remarks} name="remarks">
                                                    <TextArea placeholder={preparePlaceholderText('Remarks')} showCount maxLength={100} autoSize={{ minRows: 2, maxRows: 5 }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>
                            <Collapse
                                defaultActiveKey={['3']}
                                expandIcon={() => {
                                    if (activeKey.includes(3)) {
                                        return <MinusOutlined className={style.iconsColor} />;
                                    } else {
                                        return <PlusOutlined className={style.iconsColor} />;
                                    }
                                }}
                                activeKey={activeKey}
                                onChange={() => onChange(3)}
                                expandIconPosition="end"
                            >
                                <Panel
                                    key="3"
                                    header={
                                        <>
                                            <div className={styles.alignUser}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Upload Customer Form
                                                </Text>
                                            </div>
                                        </>
                                    }
                                >
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={uploadCustomerForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Checkbox value="sentOnMobile">I Consent to share my details with Mahindra & Mahindra. </Checkbox>
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
                                    </Form>
                                </Panel>
                            </Collapse>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Button danger onClick={onCloseAction}>
                                        Cancel
                                    </Button>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Button type="primary" onClick={onFinish} className={styles.floatRight}>
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
        </>
    );
};

export default AddEditForm;
