import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, Switch, DatePicker, Checkbox, Divider } from 'antd';
import { useEffect, useState } from 'react';
import Svg from 'assets/images/Filter.svg';

import { validateAadhar, validateDrivingLicenseNo, validateEmailField, validateGSTIN, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField, validatePanField, validateVoterId } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { gender, income, maritialStatus, memberShip, occupation, religion, title, tongue, vehicle } from 'constants/modules/CustomerMaster/individualProfile';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { BiLockAlt } from 'react-icons/bi';

import styles from 'components/common/Common.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { ViewDetail } from './ViewIndividualProfileDetails';
import { MarkAsDefaultModal } from './MarkAsDefaultModal';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { onCloseAction, isViewModeVisible } = props;
    const { isReadOnly = false } = props;
    const [individualForm] = Form.useForm();
    const [uploadCustomerForm] = Form.useForm();
    const [FinalFormData, setFinalFormData] = useState({
        individualForm: [],
        uploadCustomerForm: [],
    });
    const [individualFormValues, setIndividualFormValues] = useState();
    const [uploadCustomerFormValues, setUploadCustomerFormValues] = useState();
    const [done, setDone] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileLoader, setmobileLoader] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        setFinalFormData({ ...FinalFormData, individualForm: individualFormValues, uploadCustomerForm: uploadCustomerFormValues });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [done]);

    const [activeKey, setactiveKey] = useState([1]);

    const onFinish = () => {
        const individualFormValues = individualForm.getFieldsValue();

        const uploadCustomerFormValues = uploadCustomerForm.getFieldsValue();

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

    const handleCancel = () => {
        setIsModalOpen(false);
        setmobileLoader(false);
    };
    const handleNumberValidation = (event) => {
        const Mno = event.target.value;
        const regex = new RegExp('^([5-9]){1}([0-9]){9}$/');
        if (Mno?.length === 10 && regex.test(Mno)) {
            setmobileLoader(true);
            setTimeout(() => {
                setIsModalOpen(true);
            }, 1000);
        } else {
            setmobileLoader(false);
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

    const viewProps = {
        activeKey,
        onChange,
        styles,
    };
    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mobile Number Validation',
        closable: false,
        onCloseAction: handleCancel,
    };

    const disabledProps = { disabled: isReadOnly };
    return (
        <>
            {!isViewModeVisible ? (
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
                                        <div className={styles.alignUser}>
                                            <FaRegUserCircle className={styles.userCircle} />
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Individual Information
                                            </Text>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={individualForm} onFinishFailed={onFinishFailed}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.uploadContainer}>
                                                <Dragger {...uploadProps}>
                                                    <p className="ant-upload-drag-icon">
                                                        <img src={Svg} alt="" />
                                                    </p>
                                                    <p className={styles.uploadtext}>Upload Your Profile Picture</p>
                                                    <p>File type should be .png and .jpg and max file size to be 500kb</p>
                                                    <Button type="primary" style={{ marginLeft: '30px', marginTop: '16px' }}>
                                                        Upload File
                                                    </Button>
                                                </Dragger>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Title" name="title" rules={[validateRequiredSelectField('title')]}>
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
                                                <Form.Item label="Mobile Number" name="mobileNumber" rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]}>
                                                    {/* <Input value={null} className={styles.inputBox} placeholder={preparePlaceholderText('mobile number')} {...disabledProps} /> */}
                                                    <Input
                                                        maxLength={10}
                                                        onChange={handleNumberValidation}
                                                        placeholder={preparePlaceholderText('mobile number')}
                                                        allowClear
                                                        enterButton="Send OTP"
                                                        size="small"
                                                        suffix={
                                                            <>
                                                                <Button loading={mobileLoader} onClick={showModal} style={{ marginRight: '-3px', borderColor: '#d9d9d9', color: '#B5B5B6' }}>
                                                                    Send OTP
                                                                </Button>
                                                                <MarkAsDefaultModal {...modalProps} />
                                                            </>
                                                        }
                                                    />
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
                                                <Form.Item label="Whatsapp Number" name="whatsappNumber" rules={[validateRequiredSelectField('whatsapp number')[validateMobileNoField('whatsapp number')]]}>
                                                    <Input value={null} maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('whatsapp number')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Do you want to contacted over whatsapp?" name="whatsappCommunicationAllowed">
                                                    <Switch value={null} checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Email ID" name="email" rules={[validateEmailField('email')]}>
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
                                                <Form.Item label="Gender" name="gender" rules={[validateRequiredSelectField('gender')]}>
                                                    <Select value={null} placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                                        {gender?.map((item) => (
                                                            <Option value={item.key}>{item.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Maritial Status" name="martialStatus">
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
                                                <Form.Item label="PAN" name="panNumber" rules={[validatePanField('pan')]}>
                                                    <Input value={null} maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('pan')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Aadhar No." name="adharNumber" rules={[validateAadhar('aadhar')]}>
                                                    <Input value={null} maxLength={12} className={styles.inputBox} placeholder={preparePlaceholderText('aadhar number')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Voter ID" name="voterId" rules={[validateVoterId('voter id')]}>
                                                    <Input value={null} maxLength={10} className={styles.inputBox} placeholder={preparePlaceholderText('voter id')} {...disabledProps} />
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
                                                <Form.Item label="Driving License No" name="drivingLicenseNumber" rules={[validateDrivingLicenseNo('driving license no ')]}>
                                                    <Input value={null} maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('driving license no')} {...disabledProps} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="GSTIN" name="gstin" rules={[validateGSTIN('gstin')]}>
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
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
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
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Key Account details
                                            </Text>
                                        </div>
                                    }
                                    key="3"
                                >
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={uploadCustomerForm}>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Code" name="accountCode" initialValue={'CFG464787'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter account code')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Name" name="accountName" initialValue={'Koncept'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Segement" name="accountSegement" initialValue={'Individual'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Client Name" name="clientName" initialValue={'Pal Singh'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} disabled />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Account Mapping Date" name="mapping date" initialValue={'12-11-2022'}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} disabled />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
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
                                        <div className={styles.alignUser}>
                                            <FaRegUserCircle className={styles.userCircle} />
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Authority Details (Who Knowns Whom)
                                            </Text>
                                        </div>
                                    }
                                    key="4"
                                >
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={uploadCustomerForm}>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Name of Person" name="personName">
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter name of person')}  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Position" name="position" >
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter position')}  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item label="Company Name" name="companyName" >
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter company name')}  />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Form.Item label="Remarks" name="remarks" >
                                                    <TextArea placeholder={preparePlaceholderText('remarks')} showCount maxLength={100} autoSize={{ minRows: 2, maxRows: 5 }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
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
                                        <div className={styles.alignUser}>
                                            <FaRegUserCircle className={styles.userCircle} />
                                            <Text style={{ marginTop: '4px', marginLeft: '8px' }} strong>
                                                Upload Customer Form
                                            </Text>
                                        </div>
                                    }
                                    key="5"
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
                                                <Dragger {...uploadProps} className={styles.uploadContainer}>
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
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};
export default AddEditForm;
