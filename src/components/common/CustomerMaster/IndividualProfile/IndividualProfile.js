import { Button, Collapse, Form, Typography, Upload, message, Row, Col, Space, Select, Input, Switch, DatePicker, Empty, Progress, Checkbox, Divider } from 'antd';
import { useState } from 'react';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import Svg from 'assets/images/Filter.svg';

import style from '../../Common.module.css';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { InboxOutlined } from '@ant-design/icons';
import Search from 'antd/es/transfer/search';


const { Panel } = Collapse;
const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

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

const title = [
    {key:'Mr', name:'Mr.'},
    {key:'Mrs', name:'Mrs.'}
];

const gender = [
    {key:'Male', name:'Male'},
    {key:'Female', name:'Female'},
    {key:'Transgender', name:'Transgender'},
];
const maritialStatus=[
    {key:'Single', name:'Single'},
    {key:'Married', name:'Married'},

];
const vehicle = [
    {key:'driver', name:'Driver Driven'},
    {key:'self', name:'Self Driven'},
];
const occupation = [
    {key:'Business', name:'Business'},
    {key:'Agri-based', name:'Agri-based'},
    {key:'Business- SME', name:'Business- SME'},
    {key:'Housewife', name:'Housewife'},
    {key:'data', name:'Data not shared by Customer'},
    {key:'Private', name:'Salaried- Private'},
    {key:'Govt', name:'Salaried- Govt'},
    {key:'Self-Employed', name:'Self-Employed'},
    {key:'Student', name:'Student'},
]; 
const income = [
    {key:'oneLakh', name:'< 1 lakh'},
    {key:'twoLakh', name:'1-2 lakh'},
    {key:'fiveLakh', name:'2-5 lakh'},
    {key:'tenLakh', name:'5-10 lakh'},
    {key:'moreThanTen', name:'> 10 lakh'},
]; 
const tongue = [
    {key:'H', name:'Hindi'},
    {key:'E', name:'English'},
    {key:'T', name:'Tamil'},
    {key:'TL', name:'Telugu'},
    {key:'B', name:'Bengali'},
    {key:'K', name:'Kannad'},
    {key:'M', name:'Marathi'},
    {key:'ML', name:'Malyalam'},
    {key:'O', name:'Oriya'},
    
];
const religion = [
    {key:'Hindu', name:'Hindu'},
    {key:'sikh', name:'Sikh'},
    {key:'mus', name:'Muslim'},
    {key:'chris', name:'Christian'},
    {key:'par', name:'Parsi'},
];
const memberShip = [
    {key:'GLD', name:'Gold'},
    {key:'PLT', name:'Platinum'},
    {key:'SLR', name:'Silver'},
    {key:'NC', name:'New Customer'},
];

const IndividualProfileBase = (props) => {
    const { isReadOnly = false } = props;
    const [openAccordian, setOpenAccordian] = useState([1]);
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const disabledProps = { disabled: isReadOnly };
    return (
        <>
            <Space direction="vertical" size="small" className={style.accordianContainer}>
                <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} activeKey={openAccordian} expandIconPosition="end">
                    <Panel
                        header={
                            <>
                                <BiUserCircle />
                                Individual Information
                            </>
                        }
                        key="1"
                    >
                        <Divider />
                        <Form autoComplete="off">
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Dragger
                                        {...uploadProps}
                                        style={{
                                            marginBottom: '1.5rem',
                                            background: '#F2F2F2',
                                            border: '1px dashed #B5B5B5',
                                            borderRadius: '6px',
                                            minHeight: '172px',
                                            padding: '1rem 0 0 0',
                                        }}
                                    >
                                        <p className="ant-upload-drag-icon" style={{ textAlign: 'center' }}>
                                            <img src={Svg} alt="" />
                                        </p>
                                        <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '600', fontSize: '14px', lineHeight: '23px', color: '#0B0B0C' }}>
                                            Upload Your Profile Picture
                                        </p>
                                        <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '12px', lineHeight: '20px', color: '#0B0B0C' }}>File type should be .png and .jpg and max file size to be 5MB</p>
                                        <Button danger style={{ textAlign: 'center', marginTop: '5px', marginLeft:'25px' }}>
                                            Upload File
                                        </Button>
                                    </Dragger>
                                </Col>
                            </Row>
                        </Form>
                        <Form>
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
                                    <Form.Item label="First Name" name="firstName" rules={[validateRequiredSelectField('First Name')]}>
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Middle Name" name="middleName">
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('middle name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Last Name" name="lastName">
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Mobile Number" name="mobile" rules={[validateRequiredSelectField('Mobile Number')]}>
                                        {/* <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('mobile number')} {...disabledProps} /> */}
                                        <Input placeholder={preparePlaceholderText('mobile number')} allowClear enterButton="Send OTP" size="small" suffix={<Button style={{ marginRight: '-3px', borderColor: '#B5B5B6', color: '#B5B5B6' }}>Send OTP</Button>} />
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
                                    <Form.Item label="Whatsapp Number" name="whatsappNo" rules={[validateRequiredSelectField('Last Name')]}>
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Do you want to contacted over whatsapp?" name="overWhtsapp">
                                        <Switch value={null} checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Email ID" name="emailId">
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Date of Birth" name="" rules={[validateRequiredInputField('Number')]}>
                                        <DatePicker style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
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
                                    <Form.Item label="Maritial Status" name="maritialStatus" rules={[validateRequiredSelectField('maritial status')]}>
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
                                    <Form.Item label="Anniversary Date" name="anniversaryDate" rules={[validateRequiredInputField('Number')]}>
                                        <DatePicker style={{ display: 'auto', width: '100%' }} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Gender" name="occupation">
                                        <Select value={null} placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                            {occupation?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Annual Income" name="income">
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
                                    <Form.Item label="PAN" name="pan">
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('pan')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Aadhar No." name="aadharNo">
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('aadhar number')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Voter ID" name="voterId">
                                        <Input value={null} className={style.inputBox} placeholder={preparePlaceholderText('voter id')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Vehicle Used" name="vehicle">
                                        <Select value={null} placeholder={preparePlaceholderSelect('vehicle used')} {...disabledProps}>
                                            {vehicle?.map((item) => (
                                                <Option value={item.key}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Mother Tongue" name="motherTongue">
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
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>

                <Collapse expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} expandIconPosition="end">
                    <Panel
                        header={
                            <>
                                <BiUserCircle />
                                Social Profile
                            </>
                        }
                        key="2"
                    >
                        <Divider />
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="M1-MMFSL" name="mmfsl">
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                </Form.Item>
                            </Col>

                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Facebook Link" name="fb">
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                </Form.Item>
                            </Col>

                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Twitter Link" name="twitter">
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Instagram Link" name="insta">
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter id')} />
                                </Form.Item>
                            </Col>

                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Youtube Channel" name="youtube">
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter link')} />
                                </Form.Item>
                            </Col>

                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Team BHP Link" name="teamBhp">
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Enter Link')} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>

                <Collapse expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus /> : <AiOutlinePlus />)} expandIconPosition="end">
                    <Panel
                        header={
                            <>
                                <BiUserCircle />
                                Upload Customer Form
                            </>
                        }
                        key="3"
                    >
                        <Divider />
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Checkbox value="sentOnMobile">I Consent to share my details with Mahindra & Mahindra. </Checkbox>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Dragger
                                    {...uploadProps}
                                    style={{
                                        // margin: '1.5rem 0 0 0',
                                        background: '#F2F2F2',
                                        border: '1px dashed #B5B5B5',
                                        borderRadius: '6px',
                                        minHeight: '172px',
                                        padding: '1rem 0 0 0',
                                    }}
                                >
                                    <p className="ant-upload-drag-icon" style={{ textAlign: 'center' }}>
                                        <img src={Svg} alt="" />
                                    </p>
                                    <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '500', fontSize: '14px', lineHeight: '23px', color: '#0B0B0C' }}>
                                        Click or drop your file here to upload the signed and <br /> scanned customer form.
                                    </p>
                                    <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '400', fontSize: '12px', lineHeight: '23px', color: '#0B0B0C' }}>
                                        File type should be png, jpg or pdf and max file size to be 5Mb
                                    </p>
                                    <Button danger>Upload File</Button>
                                </Dragger>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </Space>
        </>
    );
};

export default IndividualProfileBase;
