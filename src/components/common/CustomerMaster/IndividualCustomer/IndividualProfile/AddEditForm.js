import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, Switch, DatePicker, Empty, Progress, Checkbox, Divider } from 'antd';
import { useEffect, useState } from 'react';
import Svg from 'assets/images/Filter.svg';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { gender, income, maritialStatus, memberShip, occupation, religion, title, tongue, vehicle } from 'constants/modules/CustomerMaster/individualProfile';
import { withDrawer } from 'components/withDrawer';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';


import styles from 'components/common/Common.module.css';
import { FaRegUserCircle } from 'react-icons/fa';


const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { isReadOnly = false } = props;
    const [openAccordian, setOpenAccordian] = useState([1]);
    const [individualForm] = Form.useForm();
    const [uploadCustomerForm] = Form.useForm();
    const [FinalFormData, setFinalFormData] = useState({
        individualForm: [],
        uploadCustomerForm: [],
    });
    const [individualFormValues, setIndividualFormValues] = useState();
    const [uploadCustomerFormValues, setUploadCustomerFormValues] = useState();
    const [done, setDone] = useState();
    useEffect(() => {
        setFinalFormData({ ...FinalFormData, individualForm: individualFormValues, uploadCustomerForm: uploadCustomerFormValues });
    }, [done]);
    useEffect(() => {
        console.log('FinalFormData', FinalFormData);
    }, [FinalFormData]);

    const [activeKey, setactiveKey] = useState([1]);

    const [handleActive, sethandleActive] = useState();
    const handleFormValueChange = () => {};
    const handleFormFieldChange = () => {};
    const onFinish = () => {
        const individualFormValues = individualForm.getFieldsValue();

        const uploadCustomerFormValues = uploadCustomerForm.getFieldsValue();

        console.log('individualFormValues', individualFormValues, 'uploadCustomerFormValues', uploadCustomerFormValues);

        individualForm
            .validateFields()
            .then(() => {
                uploadCustomerForm
                    .validateFields()
                    .then(() => {
                        setIndividualFormValues(individualFormValues);
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
    const onFinishFailed = () => {
        individualForm.validateFields();
        uploadCustomerForm.validateFields();
    };
    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.filter((item) => {
                if (item != values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
        console.log('values', values);
    };

    const onFinishCustomerInformation = (values) => {
        setFinalFormData({ ...FinalFormData, individualForm: values });
    };
    const onFinishAuthorityDetails = (values) => {
        setFinalFormData({ ...FinalFormData, uploadCustomerForm: values });
    };


    const uploadProps = {
        name: 'file',
        multiple: true,
        action: '',
        onChange(info) {
            const { status } = info.file;
            //   if (status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            //   }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        // onDrop(e) {
        //   console.log('Dropped files', e.dataTransfer.files);
        // },
    };
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const disabledProps = { disabled: isReadOnly };
    return (
        <>
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
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text styles={{ paddingLeft: '10px', paddingTop: '3px' }} strong>
                                    Individual Information
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Divider />
                        <Form autoComplete="off" layout="vertical" form={individualForm}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Dragger
                                        {...uploadProps}
                                        styles={{
                                            marginBottom: '1.5rem',
                                            background: '#F2F2F2',
                                            border: '1px dashed #B5B5B5',
                                            borderRadius: '6px',
                                            minHeight: '172px',
                                            padding: '1rem 0 0 0',
                                        }}
                                    >
                                        <p className="ant-upload-drag-icon" styles={{ textAlign: 'center' }}>
                                            <img src={Svg} alt="" />
                                        </p>
                                        <p className="ant-upload-text" styles={{ textAlign: 'center', fontWeight: '600', fontSize: '14px', lineHeight: '23px', color: '#0B0B0C' }}>
                                            Upload Your Profile Picture
                                        </p>
                                        <p styles={{ textAlign: 'center', fontWeight: '500', fontSize: '12px', lineHeight: '20px', color: '#0B0B0C' }}>File type should be .png and .jpg and max file size to be 500kb</p>
                                        <Button danger styles={{ textAlign: 'center', marginTop: '5px', marginLeft: '25px' }}>
                                            Upload File
                                        </Button>
                                    </Dragger>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Title" name="title" rules={[validateRequiredSelectField('Title')]}>
                                        <Select intialValue={'Select'} placeholder={preparePlaceholderSelect('title')} {...disabledProps}>
                                            {title?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="First Name" name="firstName" rules={[validateRequiredSelectField('first name')]}>
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Middle Name" name="middleName">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('middle name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Last Name" name="lastName">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Mobile Number" name="mobileNumber" rules={[validateRequiredSelectField('Mobile Number')]}>
                                        {/* <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('mobile number')} {...disabledProps} /> */}
                                        <Input placeholder={preparePlaceholderText('mobile number')} allowClear enterButton="Send OTP" size="small" suffix={<Button styles={{ marginRight: '-3px', borderColor: '#B5B5B6', color: '#B5B5B6' }}>Send OTP</Button>} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Want to use Mobile no as whatsapp no?" name="wantWhtsappNo">
                                        <Switch value={null} checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Whatsapp Number" name="mobileNumber" rules={[validateRequiredSelectField('Last Name')]}>
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Do you want to contacted over whatsapp?" name="whatsappCommunicationAllowed">
                                        <Switch value={null} checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Email ID" name="email">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Date of Birth" name="dateOfBirth" rules={[validateRequiredInputField('date')]}>
                                        <DatePicker disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Gender" name="gender">
                                        <Select value={null} placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                            {gender?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Maritial Status" name="martialStatus" rules={[validateRequiredSelectField('maritial status')]}>
                                        <Select value={null} placeholder={preparePlaceholderSelect('maritial status')} {...disabledProps}>
                                            {maritialStatus?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Anniversary Date" name="weddingAnniversary">
                                        <DatePicker styles={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Occupation" name="occupation">
                                        <Select value={null} placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                            {occupation?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Annual Income" name="annualIncome">
                                        <Select value={null} placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
                                            {income?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="PAN" name="panNumber">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('pan')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Aadhar No." name="adharNumber">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('aadhar number')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Voter ID" name="voterId">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('voter id')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Vehicle Used" name="vehicleUsed">
                                        <Select value={null} placeholder={preparePlaceholderSelect('vehicle used')} {...disabledProps}>
                                            {vehicle?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Mother Tongue" name="preferredLanguage">
                                        <Select value={null} placeholder={preparePlaceholderSelect('mother tongue')} {...disabledProps}>
                                            {tongue?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Religion" name="religion">
                                        <Select value={null} placeholder={preparePlaceholderSelect('religion')} {...disabledProps}>
                                            {religion?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Membership Type" name="membershipType">
                                        <Select value={null} placeholder={preparePlaceholderSelect('membership type')} {...disabledProps}>
                                            {memberShip?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Driving License No" name="drivingLicenseNumber">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('driving license no')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="GSTIN" name="gstin">
                                        <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('gstin')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
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
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text styles={{ paddingLeft: '10px', paddingTop: '3px' }} strong>
                                    Social Profile
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Divider />
                        <Form autoComplete="off" layout="vertical" form={uploadCustomerForm}>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="M1-MMFSL" name="mmfsl">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Facebook Link" name="facebookId">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Twitter Link" name="twitterId">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Instagram Link" name="instagramId">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Youtube Channel" name="youtubeChannel">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Team BHP Link" name="teamBhp">
                                        <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
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
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text styles={{ paddingLeft: '10px', paddingTop: '3px' }} strong>
                                    Upload Customer Form
                                </Text>
                            </div>
                        }
                        key="3"
                    >
                        <Divider />
                        <Form autoComplete="off" layout="vertical">
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Checkbox value="sentOnMobile">I Consent to share my details with Mahindra & Mahindra. </Checkbox>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Dragger
                                        {...uploadProps}
                                        styles={{
                                            // margin: '1.5rem 0 0 0',
                                            background: '#F2F2F2',
                                            border: '1px dashed #B5B5B5',
                                            borderRadius: '6px',
                                            minHeight: '172px',
                                            padding: '1rem 0 0 0',
                                        }}
                                    >
                                        <p className="ant-upload-drag-icon" styles={{ textAlign: 'center' }}>
                                            <img src={Svg} alt="" />
                                        </p>
                                        <p className="ant-upload-text" styles={{ textAlign: 'center', fontWeight: '500', fontSize: '14px', lineHeight: '23px', color: '#0B0B0C' }}>
                                            Click or drop your file here to upload the signed and <br /> scanned customer form.
                                        </p>
                                        <p className="ant-upload-text" styles={{ textAlign: 'center', fontWeight: '400', fontSize: '12px', lineHeight: '23px', color: '#0B0B0C' }}>
                                            File type should be png, jpg or pdf and max file size to be 5Mb
                                        </p>
                                        <Button danger>Upload File</Button>
                                    </Dragger>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
                <Button type="primary" onClick={onFinish}>
                    Save & Proceed
                </Button>
            </Space>
        </>
    );
};
export default AddEditForm ;

