import { React, useEffect, useState } from 'react';

import { Col, Input, Collapse, Row, Button, Space, Form, Select, Upload, message, Checkbox, Divider } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import style from 'components/common/Common.module.css';
import styles from 'components/Auth/Auth.module.css';

import { MEMBERSHIP_TYPE } from './MembershipType';
import Svg from 'assets/images/Filter.svg';
import { BiUserCircle } from 'react-icons/bi';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetails';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

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
                                        <>
                                            <div className={style.alignUser}>
                                                <BiUserCircle className={style.userCircle} />
                                                <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Company Information</div>
                                            </div>{' '}
                                        </>
                                    }
                                    key="1"
                                >
                                    <Divider />

                                    <Form autoComplete="off" layout="vertical" form={companyInfoform}>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Firm/Company Name" initialValue={formData?.companyName} name="companyName" rules={[validateRequiredInputField('Firm/Company Name')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Name')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Parent Firm/Company Code" initialValue={formData?.companyCode} name="companyCode" rules={[validateRequiredInputField('Parent Firm/Company Code')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Code')} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Parent Firm/Company Name" initialValue={formData?.companyName} name="companyName">
                                                    <Input maxLength={50} disabled placeholder={preparePlaceholderText('Parent Concept')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

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

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Membership Type" name="membershipType" initialValue={formData?.membershipType} rules={[validateRequiredInputField('Membership Type')]}>
                                                    <Select maxLength={50} placeholder={preparePlaceholderText('Membership Type')}>
                                                        <Option>Select</Option>
                                                        <Option value={MEMBERSHIP_TYPE.GOLD.KEY}>{MEMBERSHIP_TYPE.GOLD.TITLE}</Option>
                                                        <Option value={MEMBERSHIP_TYPE.SILVER.KEY}>{MEMBERSHIP_TYPE.SILVER.TITLE}</Option>
                                                        <Option value={MEMBERSHIP_TYPE.PLATINUM.KEY}>{MEMBERSHIP_TYPE.PLATINUM.TITLE}</Option>
                                                        <Option value={MEMBERSHIP_TYPE.NEW_CUSTOMER.KEY}>{MEMBERSHIP_TYPE.NEW_CUSTOMER.TITLE}</Option>
                                                    </Select>{' '}
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
                                            <div className={style.alignUser}>
                                                <BiUserCircle className={style.userCircle} />
                                                <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Social Profiles</div>
                                            </div>{' '}
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
                                            <div className={style.alignUser}>
                                                <BiUserCircle className={style.userCircle} />
                                                <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Upload Customer Form</div>
                                            </div>{' '}
                                        </>
                                    }
                                >
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={uploadCustomerForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Checkbox value="sentOnMobile" className={styles.registered}>
                                                    I Consent to share my details with Mahindra & Mahindra.{' '}
                                                </Checkbox>
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
